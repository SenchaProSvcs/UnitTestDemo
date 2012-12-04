Ext.define('ChicagoMeetup.view.Events', {
    extend : 'Ext.grid.Panel',
    alias  : 'widget.chicago-events',

    requires : [
        'ChicagoMeetup.store.Events'
    ],

    initComponent : function () {
        var url = this.pastEvents ?
                  ChicagoMeetup.MeetupApiUtil.getPastEventsUrl() :
                  ChicagoMeetup.MeetupApiUtil.getUpcomingEventsUrl();

        Ext.applyIf(this, {
            columns : [
                {
                    dataIndex : 'date',
                    text      : 'Date',
                    width     : 200
                },
                {
                    dataIndex : 'name',
                    text      : 'Event Name',
                    flex      : 1
                },
                {
                    dataIndex : 'rsvps',
                    text      : 'RSVPs'
                },
                {
                    text      : 'URL',
                    dataIndex : 'url',
                    renderer  : this.linkRenderer
                }
            ],

            store : Ext.create('ChicagoMeetup.store.Events', {
                proxy : {
                    type             : 'jsonp',
                    url              : url,
                    autoAppendParams : false,
                    pageParam        : undefined,

                    reader : {
                        type : 'json',
                        root : 'results'
                    }
                }
            })
        });

        this.callParent(arguments);
    },

    linkRenderer : function (value) {
        return '<a href="' + value + '" target="_blank">Link...</a>';
    }

});