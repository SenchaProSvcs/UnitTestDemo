/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Date

A mixin with the additinal assertions for dates. Being consumed by {@link Siesta.Test}

*/
Role('Siesta.Test.Date', {
    
    methods : {
        
        isDateEq: function (got, expectedDate, description) {
            this.isDateEqual.apply(this, arguments);
        },

        
        /**
         * This assertion passes when the 2 provided dates are equal and fails otherwise.
         * 
         * It has a synonym: `isDateEq`
         * 
         * @param {Date} got The 1st date to compare
         * @param {Date} expectedDate The 2nd date to compare
         * @param {String} description The description of the assertion
         */
        isDateEqual: function (got, expectedDate, description) {
            if (got - expectedDate === 0) {
                this.pass(description);
            } else {
                this.fail(description, {
                    assertionName   : 'isDateEqual',
                    
                    got         : got ? got.toString() : '',
                    gotDesc     : 'Got',
                    
                    need        : expectedDate.toString()
                });
            }
        }
    }
});
