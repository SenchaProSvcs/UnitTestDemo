StartTest(function(t) {

    var tabPanel, upcomingEvents, pastEvents;

    t.chain(
        { waitFor : 500 }, //Allow time for the application to render

        function(next) {
            t.diag('Test that UI has two tabs, both grids.');
            tabPanel =  Ext.ComponentQuery.query('tabpanel')[0];

            t.is(tabPanel.items.items.length, 2, 'Two tabs should exist in the UI');

            upcomingEvents = tabPanel.items.getAt(0);
            t.is(upcomingEvents.getXType(), 'chicago-events', 'First tab should be a grid, the "chicago-events" view.');


            pastEvents = tabPanel.items.getAt(1);
            t.is(pastEvents.getXType(), 'chicago-events', 'Second tab should be a grid, the "chicago-events" view.');

            next();
        },

        { waitFor : 500 }, //try to give the Meetup.com API time to return... see note below

        function(next) {
            t.diag('Test that each grid contains data.');
            t.diag('NOTE: WE SHOULD BE MOCKING THE API HERE... SEE BLOG ARTICLE FOR DETAILS');

            t.isGreater(upcomingEvents.getStore().getCount(), 0, 'Should be more than zero upcoming events');
            t.isGreater(pastEvents.getStore().getCount(), 0, 'Should be more than zero past events');

            next();
        }
    );

});