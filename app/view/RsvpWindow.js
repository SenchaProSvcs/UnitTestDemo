Ext.define('ChicagoMeetup.view.RsvpWindow', {
    extend : 'Ext.window.Window',
    xtype  : 'rsvpwindow',

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
                },

                {
                    dataIndex : 'id',
                    text      : 'Photo',
                    width     : 100,
                    renderer  : function(value, meta, record, row, col, store, view) {
                        var member_photo = record.raw.member_photo;

                        if (member_photo) {
                            return '<img src="' + member_photo.thumb_link + '" style="width : 100px;" />';
                        }

                        return '';
                    }
                }
            ]
        }
    ]
});