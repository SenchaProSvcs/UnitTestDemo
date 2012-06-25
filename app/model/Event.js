Ext.define('ChicagoMeetup.model.Event', {
    extend : 'Ext.data.Model',

    fields : [
        {
            name    : 'id',
            type    : 'string',
            mapping : 'id'
        },
        {
            name    : 'name',
            type    : 'string',
            mapping : 'name'
        },
        {
            name       : 'date',
            type       : 'date',
            mapping    : 'time'
        },
        {
            name    : 'rsvps',
            type    : 'int',
            mapping : 'rsvpcount'
        },
        {
            name    : 'url',
            type    : 'string',
            mapping : 'event_url'
        },
        {
            name    : 'description',
            type    : 'string',
            mapping : 'description'
        }
    ]
});