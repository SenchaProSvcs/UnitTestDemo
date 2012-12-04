Ext.define('ChicagoMeetup.model.Rsvp', {
    extend : 'Ext.data.Model',
    fields : [
        {
            mapping : 'member.member_id',
            name    : 'id',
            type    : 'string'
        },
        {
            mapping : 'member.name',
            name    : 'name',
            type    : 'string'
        }
    ]
});