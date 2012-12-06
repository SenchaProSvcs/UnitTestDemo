StartTest(function(t) {

    var tabPanel, upcomingEvents, pastEvents;

    t.chain(
        { waitFor : 500 }, //Allow time for the application to render
                           // also try to give the Meetup.com API time to return... see note below

        function(next) {
            //set references after rendering
            tabPanel =  Ext.ComponentQuery.query('tabpanel')[0];
            upcomingEvents = tabPanel.items.getAt(0);
            pastEvents = tabPanel.items.getAt(1);

            next();
        },

        function(next) {
            t.diag('Test that the upcoming event grid displays an RSVP popup when a row is double-clicked.');

            t.doubleClick(upcomingEvents.el.down('.x-grid-row').dom, function() {
                var win = Ext.ComponentQuery.query('rsvpwindow')[0];

                t.is(win.isHidden(), false, 'RsvpWindow should be visible.');
                win.close();

                next();
            });
        },

        function(next) {
            t.diag('Switch tabs');

            //click on the past events tab
            t.click(tabPanel.el.query('.x-tab')[1], next);
        },

        { waitFor : 500 }, //allow animation to complete

        function(next) {
            t.diag('Test that the past event grid displays an RSVP popup when a row is double-clicked.');

            t.doubleClick(pastEvents.el.down('.x-grid-row').dom, function() {
                var win = Ext.ComponentQuery.query('rsvpwindow')[0];

                t.is(win.isHidden(), false, 'RsvpWindow should be visible.');
                win.close();

                next();
            });
        }
    );

});