var Harness = Siesta.Harness.Browser;

Harness.configure({
    title     : 'Sencha UI Test Demo - Application Tests',
    
    hostPageUrl: '../../index.html',

    preload : [
        '../../resources/sinon-1.5.2.js',
        'api_stub.js'
    ]
});


Harness.start(
    {
        group       : 'Basic application layout',
        
        items       : [
            {
                title : 'Test tabs for data in grids',
                url : 'tests/01_tabs.js'
            },
            {
                title : 'Test double-click functionality',
                url : 'tests/02_RsvpWindow.js'
            }
        ]
    }
);