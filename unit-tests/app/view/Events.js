describe('ChicagoMeetup.view.Events', function() {

    //reusable scoped variable
    var eventGrid = null;

    //setup/teardown
    beforeEach(function() {
        //create a fresh grid for every test to avoid test pollution
        eventGrid = Ext.create('ChicagoMeetup.view.Events', {
            renderTo : 'test' //see spec-runner.html to see where this is defined
        });
    });

    afterEach(function() {
        //destroy the grid after every test so we don't pollute the environment
        eventGrid.destroy();
    });

    it('should inherit from Ext.grid.Panel', function() {
        expect(eventGrid.isXType('grid')).toEqual(true);
    });

    it('should have a "url" property automatically assigned to its proxy', function() {
        expect(typeof eventGrid.getStore().getProxy().url).toEqual('string');
    });

    it('should have a different "url" property automatically assigned to its proxy if "pastEvents" equals true', function() {
        expect(typeof eventGrid.getStore().getProxy().url).toEqual('string');

        var secondTestGrid = Ext.create('ChicagoMeetup.view.Events', { pastEvents : true });
        expect(typeof secondTestGrid.getStore().getProxy().url).toEqual('string');
        expect(eventGrid.getStore().getProxy().url !== secondTestGrid.getStore().getProxy().url).toEqual(true);

        //be sure to destroy any arbitrary elements so we don't pollute the environment!
        secondTestGrid.destroy();
    });

    describe('internal methods', function() {

        describe('linkRenderer() method', function() {

            it('should return a string (HTML link snippet)', function() {
                var testUrl = 'http://www.sencha.com';

                expect(typeof eventGrid.linkRenderer).toEqual('function');
                expect(typeof eventGrid.linkRenderer(testUrl)).toEqual('function'); //THIS SHOULD FAIL! We should have written toEqual('string')

                //more robust regular expression check to ensure this is *actually* an HTML link tag, correctly formatted
                var linkHtml = eventGrid.linkRenderer(testUrl);
                var regExp = /^(<a.*?>)Link...(<\/a>)$/;
                expect(regExp.test(linkHtml)).toEqual(true);
            });

        });

    });

});