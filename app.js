Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    autoCreateViewport: true,
    name: 'ChicagoMeetup',

    controllers : [
        'Event'
    ],

    requires : [
        'ChicagoMeetup.MeetupApiUtil'
    ]
});