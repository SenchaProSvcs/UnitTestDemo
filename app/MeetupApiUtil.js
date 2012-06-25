Ext.define('ChicagoMeetup.MeetupApiUtil', {
    singleton : true,

    /**
     *
     */
    apiKey : '26707c51352322312176e2f42502d3c',

    /**
     *
     */
    groupId : 'Chicago-Sencha-User-Group',

    /**
     *
     * @param eventId
     * @return {String}
     */
    getUsersUrl : function (eventId) {
        var queryString = Ext.Object.toQueryString({
            sign     : true,
            key      : this.apiKey,
            event_id : eventId,
            order    : 'event',
            rsvp     : 'yes',
            format   : 'json',
            page     : 200
        });

        return 'http://api.meetup.com/2/rsvps?' + queryString;
    },

    /* JSLint should tell us it doesn't like this method... */
    dummyMethod : function() {
        var test = 0;

        if (test) { return true; }
        else { return false; } // <-- specifically this line...
    },

    /**
     *
     * @return {String}
     */
    getPastEventsUrl : function () {
        var queryString = Ext.Object.toQueryString({
            sign          : true,
            key           : this.apiKey,
            group_urlname : this.groupId,
            format        : 'json',
            page          : 200,
            before        : '-1d',
            after         : '-12m'
        });

        return 'http://api.meetup.com/events?' + queryString;
    },

    /**
     *
     * @return {String}
     */
    getUpcomingEventsUrl : function () {
        var queryString = Ext.Object.toQueryString({
            sign          : true,
            key           : this.apiKey,
            group_urlname : this.groupId,
            format        : 'json',
            page          : 200,
            before : '12m'
        });

        return 'http://api.meetup.com/events?' + queryString;
    }
});