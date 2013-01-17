describe('ChicagoMeetup.MeetupApiUtil', function() {

    describe('getUsersUrl() method', function() {

        it('should be a function', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getUsersUrl).toEqual('function');
        });

        it('should return a string', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getUsersUrl()).toEqual('string');
        });

        it('should correctly encode the event ID', function() {
            var regExp = /event_id=12345/g;
            var eventId = 12345;
            var url = ChicagoMeetup.MeetupApiUtil.getUsersUrl(eventId);

            expect(regExp.test(url)).toEqual(true);
        });

    });

    describe('getPastEventsUrl() method', function() {

        it('should be a function', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getPastEventsUrl).toEqual('function');
        });

        it('should return a string', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getPastEventsUrl()).toEqual('string');
        });

    });

    describe('getUpcomingEventsUrl() method', function() {

        it('should be a function', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getUpcomingEventsUrl).toEqual('function');
        });

        it('should return a string', function() {
            expect(typeof ChicagoMeetup.MeetupApiUtil.getUpcomingEventsUrl()).toEqual('string');
        });

    });

});