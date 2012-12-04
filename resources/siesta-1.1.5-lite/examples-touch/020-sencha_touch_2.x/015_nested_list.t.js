StartTest(function (t) {
    t.diag('Testing a nested list');

    var data = {
        text : 'Groceries',
        items : [
            {
                text : 'Drinks',
                items : [
                    {
                        text : 'Water',
                        items : [
                            {
                                text : 'Sparkling',
                                leaf : true
                            },
                            {
                                text : 'Still',
                                leaf : true
                            }
                        ]
                    },
                    {
                        text : 'Coffee',
                        leaf : true
                    },
                    {
                        text : 'Espresso',
                        leaf : true
                    },
                    {
                        text : 'Redbull',
                        leaf : true
                    },
                    {
                        text : 'Coke',
                        leaf : true
                    },
                    {
                        text : 'Diet Coke',
                        leaf : true
                    }
                ]
            },
            {
                text : 'Fruit',
                items : [
                    {
                        text : 'Bananas',
                        leaf : true
                    },
                    {
                        text : 'Lemon',
                        leaf : true
                    }
                ]
            },
            {
                text : 'Snacks',
                items : [
                    {
                        text : 'Nuts',
                        leaf : true
                    },
                    {
                        text : 'Pretzels',
                        leaf : true
                    },
                    {
                        text : 'Wasabi Peas',
                        leaf : true
                    }
                ]
            }
        ]
    };

    Ext.define('ListItem', {
        extend : 'Ext.data.Model',
        config : {
            fields : [
                {
                    name : 'text',
                    type : 'string'
                }
            ]
        }
    });

    var store = Ext.create('Ext.data.TreeStore', {
        model : 'ListItem',
        defaultRootProperty : 'items',
        root : data
    });

    var nestedList = Ext.create('Ext.NestedList', {
        fullscreen : true,
        title : 'Groceries',
        displayField : 'text',
        store : store
    });

    t.waitForCQ("nestedlist[rendered=true]", function (lists) {
        var list = lists[0];
        var tapFirst = {
            action : 'tap',
            target : function () {
                return list.getActiveItem().element.down('.x-list-item')
            }
        };

        t.chain(
            tapFirst,
            { action : 'wait', delay : 500 },
            tapFirst,
            { action : 'wait', delay : 500 },
            tapFirst,
            { action : 'wait', delay : 500 },

            function (next) {
                var sel = list.getActiveItem().selected;
                t.is(sel.getCount(), 1, '1 item selected');
                t.is(sel.first().get('text'), 'Sparkling', 'Found Sparkling text on selected item');

                next()
            },

            { action : 'tap', target : '>>[ui=back]' },
            { action : 'tap', target : '>>[ui=back]' },

            function () {
                var sel = list.getActiveItem().selected;
                t.is(sel.getCount(), 0, 'No items selected');

                t.is(list.getTitle(), 'Groceries', 'Back to Groceries, where we started');
            }
        )
    });
});