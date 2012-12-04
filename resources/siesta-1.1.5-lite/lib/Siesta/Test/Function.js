/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Function

This is a mixin, with helper methods for testing functionality relating to DOM elements. This mixin is consumed by {@link Siesta.Test}

*/
Role('Siesta.Test.Function', {
    
    methods : {
         /**
         * This assertion passes if the function is called at least one time during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {String} desc The description of the assertion.
         */
        isCalled : function(fn, obj, desc) {
            this.isCalledNTimes(fn, obj, 1, desc, true);
        },

        /**
         * This assertion passes if the function is called exactly (n) times during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {Number} n The expected number of calls
         * @param {String} desc The description of the assertion.
         */
        isCalledNTimes : function(fn, obj, n, desc, isGreaterEqual) {
            var me      = this,
                prop    = typeof fn === "string" ? fn : me.getPropertyName(obj, fn);
            desc = desc ? (desc + ' ') : '';

            this.on('beforetestfinalizeearly', function () {
                if (counter === n || (isGreaterEqual && counter > n)) {
                    me.pass(desc || (prop + ' method was called exactly ' + n + ' times'));
                } else {
                    me.fail(desc || prop, {
                        assertionName       : 'isCalledNTimes ' + prop, 
                        got                 : counter, 
                        need                : n ,
                        needDesc            : ("Need " + (isGreaterEqual ? 'at least ' : 'exactly '))
                    });
                }
            });

            var counter = 0;
            fn = obj[prop];
            obj[prop] = function () { counter++; fn.apply(obj, arguments); };
        },

        /**
         * This assertion passes if the function is not called during the test life span.
         * 
         * @param {Function/String} fn The function itself or the name of the function on the host object (2nd argument)
         * @param {Object} host The "owner" of the method
         * @param {Number} n The expected number of calls
         * @param {String} desc The description of the assertion.
         */
        isntCalled : function(fn, obj, desc) {
            this.isCalledNTimes(fn, obj, 0, desc);
        },

        getPropertyName : function(host, obj) {
            for (var o in host) {
                if (host[o] === obj) return o;
            }
        }
    }
});
