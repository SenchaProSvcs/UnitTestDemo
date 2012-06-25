Ext.define('ChicagoMeetup.store.Events', {
    extend : 'Ext.data.Store',

    requires : [
        'ChicagoMeetup.MeetupApiUtil',
        'ChicagoMeetup.model.Event'
    ],

    storeId  : 'EventStore',
    autoLoad : true,
    model    : 'ChicagoMeetup.model.Event'

});