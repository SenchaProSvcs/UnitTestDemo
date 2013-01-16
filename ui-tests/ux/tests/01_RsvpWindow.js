StartTest(function (t) {

    var defaultWin = Ext.create('ChicagoMeetup.view.RsvpWindow');

    //the grid's store is usually assigned in the controller... we'll do it manually in order to test the grid
    var store = Ext.create('ChicagoMeetup.store.Rsvps', {
        autoLoad : true,
        proxy    : {
            type             : 'jsonp',
            autoAppendParams : false,
            pageParam        : undefined,
            url              : 'http://sencha.com/dummy/url',

            reader : {
                type : 'json',
                root : 'results'
            }
        }
    });

    //manually assign the store to the grid
    //NOTE: the API is being mocked in /ui-tests/ux/api_stub.js
    var grid = defaultWin.down('grid');
    grid.reconfigure(store);

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
            t.diag('Test the grid\'s custom renderer.');
            next();
        },

        function (next) {
            //I know there are only 2 rows in this grid because I mocked the API
            var firstRow = Ext.get(grid.getView().getNode(0)),
                secondRow = Ext.get(grid.getView().getNode(1));

            var regExp = /^(<img)/g;
            var innerHtml = firstRow.query('.x-grid-cell-inner')[1].innerHTML;

            t.is(regExp.test(innerHtml), true, 'First row should contain an image in the second column');

            innerHtml = secondRow.query('.x-grid-cell-inner')[1].innerHTML;
            t.is(regExp.test(innerHtml), false, 'Second row should NOT contain an image in the second column');

            next();
        }
    );

});