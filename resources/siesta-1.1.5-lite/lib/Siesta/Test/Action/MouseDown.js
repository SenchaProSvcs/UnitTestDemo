/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.MouseDown
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action can be included in a `t.chain` call with "mouseDown" shortcut:

    t.chain(
        {
            action      : 'mouseDown',
            target      : someDOMElement,
            options     : { shiftKey : true } // Optionally hold shiftkey
        }
    )

This action will perform a {@link Siesta.Test.Browser#MouseDown MouseDown} on the provided {@link #target}. 

*/
Class('Siesta.Test.Action.MouseDown', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'mouseDown',

        /**
         * @cfg {Object} options
         *
         * Any options that will be used when simulating the event. For information about possible
         * config options, please see: https://developer.mozilla.org/en-US/docs/DOM/event.initMouseEvent
         */
        options : null
    },

    
    methods : {
        
        process : function () {
            // This method is synchronous
            this.test.mouseDown(this.getTarget(), this.options);

            setTimeout(this.next, 100);
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('mouseDown', Siesta.Test.Action.MouseDown)
Siesta.Test.ActionRegistry.registerAction('fingerDown', Siesta.Test.Action.MouseDown)
