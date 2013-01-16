var stub = sinon.stub(Ext.data.JsonP, 'request', function (options) {

    //stub the JsonP response so our async calls succeed with testable data
    options.callback(true,
        {
            results : [
                {
                    'member'       : {
                        'name'      : 'Arthur Kay',
                        'member_id' : 0
                    },
                    'member_photo' : {
                        'thumb_link' : 'http:\/\/photos4.meetupstatic.com/photos/member/2/f/1/4/thumb_29652052.jpeg'
                    }
                },

                {
                    'member'       : {
                        'name'      : 'Foo Bar',
                        'member_id' : 1
                    }
                    //Meetup.com does not always return the "member_photo" object
                }
            ]
        }
    );

    return {
        scope    : options.scope,
        success  : options.success,
        failure  : options.failure,
        callback : options.callback
    };
});