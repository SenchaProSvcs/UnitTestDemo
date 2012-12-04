var Harness = Siesta.Harness.Browser;

Harness.configure({
    title     : 'Sencha UI Test Demo - Application Tests',
    
    hostPageUrl: '../../index.html'
});


Harness.start(
    {
        group       : 'Basic application layout',
        
        items       : [
            {
                title : 'Test tabs for data in grids',
                url : 'tests/01_tabs.js'
            }
        ]
    }
);