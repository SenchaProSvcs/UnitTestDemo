/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Action.Role.HasTarget

This is a mixing, allowing the action to have "target" attribute, also aliased as "el". Target will be also passed
further on chain, as the argument after "next":

    t.chain(
        {
            action      : 'click',
            target      : buttonComp        
        },
        function (next, buttonComp) {
            // target is available as 2nd argument
        
            next()
        },
        {
            action      : 'click',
            target      : '>>button'        
        },
        function (next, buttonComp) {
            // various queries will be resolved down to Ext.Component instance or DOM element
        
            next()
        },
        ...
    )
    
If needed, this behavior can be disabled with {@link #passTargetToNext} option.

*/
Role('Siesta.Test.Action.Role.HasTarget', {
    
        
    has : {
        /**
         * @cfg {Siesta.Test.ActionTarget/Function} [target=undefined] 
         * 
         * A target for action. See {@link Siesta.Test.ActionTarget} for various values that can be provided.
         * 
         * **Important.** If the function is provided for this config, it will be called and returning value used as actual target. 
         * This is useful, since sometimes target for the action depends from the previous step and 
         * is not yet available during `t.chain` call. 
         * 
         * For example, you want to click on the button which opens a window and then click on something in the window. Compare:
         * 

    t.chain(
        // clicking on button opens the window
        {
            action      : 'click',
            target      : buttonComp        
        },
        // FRAGILE: `windowComp` could not be rendered yet - `buttonComp` is not yet clicked!
        {
            action      : 'click',
            target      : windowComp.el.down('.clickArea')  
        }
        
        // MORE ROBUST: taking the "el" right before this action starts
        {
            action      : 'click',
            target      : function () {
                return windowComp.el.down('.clickArea')
            } 
        }
    )
         * 
         * Target will be available in the next step as the 2nd argument. See {@link Siesta.Test.Action.Role.HasTarget}
         * 
         * This config option can also be provided as "el" 
         */
        target              : { required : false },
        
        normalizedTarget    : null,
        
        /**
         * @cfg {Object} el 
         * 
         * An alias for {@link #target} 
         */
        
        /**
         * @cfg {Boolean} passTargetToNext Whether to pass the target further on chain as the first argument
         */
        passTargetToNext    : true
    },
    
    
    after : {
        initialize : function () {
            if (!this.passTargetToNext) return
            
            var me          = this
            var prevNext    = this.next

//            // Needs to be 'resolved' at action instantiate time since the action may cause the selector not to be found 
//            // e.g. unchecking a checkbox
//            var realTarget  = me.test.normalizeActionTarget(me.getTarget());

            this.next       = function () {
                prevNext.call(this, me.normalizedTarget);
            }
        }
    },

    
    methods : {
        
        BUILD : function (config) {
            // allow "el" as synonym for "target"
            if (config.el && !config.target) config.target = config.el
            
            return config
        },
        

        getTarget : function () {
            if (this.__cachedTarget__) return this.__cachedTarget__
            
            var test        = this.test;
            var target      = this.target || test.getElementAtCursor();

            if (test.typeOf(target) === 'Function') target = target.call(test, this);
            
            this.normalizedTarget   = test.normalizeActionTarget(target)

            return this.__cachedTarget__   = target
        }
    }
});
