Ext.define('ChicagoMeetup.controller.Event', {
    extend : 'Ext.app.Controller',

    requires : [
        'ChicagoMeetup.view.RsvpWindow',
        'ChicagoMeetup.store.Rsvps',
        'ChicagoMeetup.MeetupApiUtil'
    ],

    init : function () {
        this.control({

            'grid' : {
                'itemdblclick' : this.onGridRowDlbClick
            }

        });
    },

    onGridRowDlbClick : function (thisGrid, record, item, e, eopts) {
        var win = Ext.create('ChicagoMeetup.view.RsvpWindow', {
            title : 'RSPVs for: ' + record.get('name')
        });

        var store = Ext.create('ChicagoMeetup.store.Rsvps', {
            autoLoad : true,
            proxy    : {
                type             : 'jsonp',
                autoAppendParams : false,
                pageParam        : undefined,
                url              : ChicagoMeetup.MeetupApiUtil.getRsvpsUrl(record.get('id')),

                reader : {
                    type : 'json',
                    root : 'results'
                }
            }
        });

        var grid = win.down('grid');
        grid.reconfigure(store);

        win.show();
    }
});