Ext.define('ChicagoMeetup.view.Viewport', {
    extend : 'Ext.container.Viewport',

    requires : [
        'ChicagoMeetup.view.Events'
    ],

    items : [
        {
            xtype  : 'tabpanel',
            region : 'center',

            title : 'Sencha Chicago Meetup Group',

            items : [
                {
                    xtype : 'chicago-events',
                    title : 'Upcoming Events'
                },
                {
                    xtype      : 'chicago-events',
                    pastEvents : true,
                    title      : 'Past Events'
                }
            ]

        }
    ]
});