var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title     : 'Sencha UI Test Demo - UX/Component Tests',
    
    preload : [
        '../../../extjs-4.1.0/resources/ext-/css/ext-all.css',
        '../../../extjs-4.1.0/ext-all-debug.js'
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
                    '../../../app/view/RsvpWindow.js'
                ]
            }
        ]
    }
);

