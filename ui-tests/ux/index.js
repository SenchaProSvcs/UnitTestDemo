var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title     : 'Sencha UI Test Demo - UX/Component Tests',
    
    preload : [
        '../../resources/extjs-4.1.0/resources/css/ext-all.css',
        '../../resources/extjs-4.1.0/ext-all-debug.js'
    ]
});


Harness.start(
    {
        group       : 'Application Views',
        
        items       : [
            {
                title : 'RsvpWindow',
                url : 'tests/01_RsvpWindow.js',

                alsoPreload : [
                    '../../app/view/RsvpWindow.js',
                    '../../app/model/Rsvp.js',
                    '../../app/store/Rsvps.js',
                    '../../resources/sinon-1.5.2.js',
                    'api_stub.js'
                ]
            }
        ]
    }
);

