StartTest(function(t) {
    
    t.testExtJS(function (t) {
        var panel = new Ext.Panel({
            html : 'foo',
            title : 'bar'
        });

        t.firesOk(panel, 'render', 1, 0, function() {
            panel.render(Ext.getBody());
        }, 'firesOk reported correctly');

        t.willFireNTimes(panel, 'hide', 1, 'willFireNTimes reported correctly');
        t.willFireNTimes(panel, 'show', 1, 'willFireNTimes reported correctly');
        
        panel.hide();
        panel.show();
        
        var panel2 = new Ext.Panel({
            html    : 'foo',
            title   : 'bar'
        });
        
        t.waitForEvent(panel2, 'render', function () {
            t.ok(panel2.rendered, 'Panel is rendered')
        })
        
        panel2.render(Ext.getBody());
    });
});
