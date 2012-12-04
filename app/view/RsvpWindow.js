Ext.define('ChicagoMeetup.view.RsvpWindow', {
    extend : 'Ext.window.Window',

    requires : [
        'Ext.grid.Panel'
    ],

    height : 300,
    width  : 300,
    modal  : true,
    title  : 'RSVPs for the selected Meetup',
    layout : 'fit',

    items : [
        {
            xtype   : 'grid',
            columns : [
                {
                    dataIndex : 'name',
                    text      : 'Member Name',
                    flex      : 1
                }
            ]
        }
    ]
});