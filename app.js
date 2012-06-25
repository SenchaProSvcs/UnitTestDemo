Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    autoCreateViewport: true,
    name: 'ChicagoMeetup',

    requires : [
        'ChicagoMeetup.MeetupApiUtil'
    ]
});