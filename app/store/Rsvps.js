Ext.define('ChicagoMeetup.store.Rsvps', {
    extend : 'Ext.data.Store',

    requires : [
        'ChicagoMeetup.model.Rsvp'
    ],

    storeId  : 'RsvpStore',
    model    : 'ChicagoMeetup.model.Rsvp'

});