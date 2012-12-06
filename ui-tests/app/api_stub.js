var stub = sinon.stub(Ext.data.JsonP, 'request', function (options) {

    //stub the JsonP response so our async calls succeed with testable data
    options.callback(true,
        {
            results : [
                {
                    //stub data for Event model
                    id          : 'id',
                    name        : 'Really Cool Event',
                    rsvpcount   : 99,
                    event_url   : 'http://sencha.com',
                    description : 'Awesome event. So awesome you will wish you came!',

                    //stub data for Rsvp model
                    member      : {
                        member_id : '',
                        name      : 'Foo Bar'
                    }
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