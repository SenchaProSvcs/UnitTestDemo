/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.MoveCursorTo
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action can be included in the `t.chain` call with "moveCursorTo" shortcut:

    t.chain(
        {
            action      : 'moveCursorTo',
            target      : someDOMElement
        }
    )

This action will perform a {@link Siesta.Test.Simulate.Mouse#moveCursorTo moveCursorTo} on the provided {@link #target}. 

*/
Class('Siesta.Test.Action.MoveCursorTo', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'moveMouseTo',
        target              : { required : true }
    },

    
    methods : {
        
        process : function () {
            this.test.moveMouseTo(this.getTarget(), this.next)
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('moveCursorTo', Siesta.Test.Action.MoveCursorTo)
Siesta.Test.ActionRegistry.registerAction('moveMouseTo', Siesta.Test.Action.MoveMouseTo)
Siesta.Test.ActionRegistry.registerAction('moveFingerTo', Siesta.Test.Action.MoveMouseTo)
