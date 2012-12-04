/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.Wait
@extends Siesta.Test.Action

This action can be included in the `t.chain` call with "wait" or "delay" shortcuts:

    t.chain(
        {
            action      : 'wait',   // or "delay"
            delay       : 1000      // 1 second
        }
    )

Alternatively, for convenience, this action can be included in the chain using "waitFor" config (the "action" property can be omitted):

    t.chain(
        {
            waitFor     : 'selector',           // or any other waitFor* method name
            args        : [ '.x-grid-row' ]     // an array of arguments for the specified method
        }
    )
    
    t.chain(
        {
            waitFor     : 'rowsVisible',        // or any other waitFor* method name
            args        : [ grid ]              // an array of arguments for the specified method
        }
    )
    
    t.chain(
        {
            waitFor     : 'waitForRowsVisible', // full method name is also ok
            args        : grid                  // a single value will be converted to array automatically
        }
    )
    
In the latter case, this action will perform a call to the one of the `waitFor*` methods of the test instance.
The name of the method is computed by prepending the uppercased value of `waitFor` config with the string "waitFor" 
(unless it doesn't already starts with "waitFor").
The arguments for method call can be provided as the "args" array. Any non-array value for "args" will be converted to an array with one element.

As a special case, the value of `waitFor` config can be a Number or Function - that will trigger the call to {@link Siesta.Test#waitFor} method with provided value:

    t.chain(
        {
            waitFor     : 500
        },
        // same as
        {
            waitFor     : '',
            args        : [ 500 ] 
        },
        {
            waitFor     : function () { return document.body.className.match(/someClass/) }
        }
    )

*/
Class('Siesta.Test.Action.Wait', {
    
    isa         : Siesta.Test.Action,
    
    has : {
        /**
         * @cfg {Number} delay
         * 
         * A number of milliseconds to wait before continuing.
         */
        delay           : 1000,
        
        /**
         * @cfg {Number} timeout
         * 
         * The maximum amount of time to wait for the condition to be fulfilled. Defaults to the {@link Siesta.Test.ExtJS#waitForTimeout} value. 
         */
        timeout         : null,

        /**
         * @cfg {Array} args
         * 
         * The array of arguments to pass to waitForXXX method. You should omit the 3 last parameters: callback, scope, timeout. Any non-array value will be converted to 
         * a single-value array. 
         */
        args            : null,

        /**
         * @cfg {String} waitFor
         * 
         * The name of the `waitFor` method to call. You can omit the leading "waitFor":
         * 

    t.chain(
        {
            waitFor     : 'selector',
            ...
        },
        // same as
        {
            waitFor     : 'waitForSelector',
            ...
        }
    )
         * 
         */
        waitFor         : null
    },

    
    methods : {
        
        process : function () {
            var waitFor     = this.waitFor;
            var test        = this.test

            if (test.typeOf(waitFor) === 'Number' || test.typeOf(waitFor) === 'Function') {
                // Caller supplied a function returning true when done waiting or
                // a number of milliseconds to wait for.
                this.args   = [ waitFor ];
                waitFor     = '';
            }
            
            if (waitFor == null) {
                this.args   = [ this.delay ];
                waitFor     = '';
            }
            
            if (this.test.typeOf(this.args) !== "Array") {
                this.args = [ this.args ];
            }

            // also allow full method names
            waitFor     = waitFor.replace(/^waitFor/, '')
            var methodName = 'waitFor' + Joose.S.uppercaseFirst(waitFor);
            
            if (!test[methodName]){
                throw 'Could not find a waitFor method named ' + methodName;
            }
            test[methodName].apply(test, this.args.concat(this.next, test, this.timeout || test.waitForTimeout));
        }
    }
});

Joose.A.each(['wait', 'delay'], function(name) {
    Siesta.Test.ActionRegistry.registerAction(name, Siesta.Test.Action.Wait);
});