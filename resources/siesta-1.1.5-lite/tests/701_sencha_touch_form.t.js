StartTest(function(t) {
    var nameFld = new Ext.field.Text({
        name: 'name',
        label: 'Name',
        labelWidth: '52%'
    });

    Ext.Viewport.add({
        xtype: 'formpanel',
        items: [ nameFld ]
    });

    t.chain(
        { action : 'click', target : nameFld },
        { action : 'type',  target : nameFld, text : 'foo' },

        function(next) {
            t.is(nameFld.getValue(), 'foo', 'Found foo');
        }
    );
});