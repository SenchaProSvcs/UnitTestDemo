StartTest(function (t) {

    var defaultWin = Ext.create('ChicagoMeetup.view.RsvpWindow', {
        //default configs
    });

    var customWin = Ext.create('ChicagoMeetup.view.RsvpWindow', {
        modal  : false,
        title  : 'Foobar Window',
        height : 400,
        width  : 200,
        layout : 'card'
    });

    t.chain(
        function (next) {
            t.diag('Show the RvpWindow on the screen.');
            defaultWin.show();

            next();
        },

        { waitFor : 250 }, //allow time for any animations to complete

        function (next) {
            t.is(defaultWin.isHidden(), false, 'RsvpWindow should be visible');
            next();
        },

        function (next) {
            t.diag('Test the view\'s default configuration.');
            next();
        },

        function (next) {
            t.is(defaultWin.modal, true, 'RsvpWindow should be modal.');
            t.is(defaultWin.title, 'RSVPs for the selected Meetup', 'RsvpWindow should have a title of "RSVPs for the selected Meetup".');
            t.is(defaultWin.getHeight(), 300, 'RsvpWindow should be 300px tall.');
            t.is(defaultWin.getWidth(), 300, 'RsvpWindow should be 300px wide.');
            t.is(defaultWin.getLayout().type, 'fit', 'RsvpWindow should have "fit" layout.');

            t.diag('Remove the default RvpWindow.');
            defaultWin.hide();
            defaultWin.destroy();

            next();
        },

        function (next) {
            t.diag('Show the customized RvpWindow on the screen.');
            customWin.show();

            next();
        },

        { waitFor : 250 }, //allow time for any animations to complete

        function (next) {
            t.diag('Test the view\'s custom configuration.');

            t.is(customWin.modal, false, 'RsvpWindow should be modal.');
            t.is(customWin.title, 'Foobar Window', 'RsvpWindow should have a title of "Foobar Window".');
            t.is(customWin.getHeight(), 400, 'RsvpWindow should be 300px tall.');
            t.is(customWin.getWidth(), 200, 'RsvpWindow should be 300px wide.');
            t.is(customWin.getLayout().type, 'card', 'RsvpWindow should have "card" layout.');

            t.diag('Remove the custom RvpWindow.');
            customWin.hide();
            customWin.destroy();

            next();
        }
    );

});