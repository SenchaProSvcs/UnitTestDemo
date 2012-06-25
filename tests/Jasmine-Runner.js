FS = require('fs');
phantom.injectJs('Jasmine-Parser.js');

var url = 'file://' + FS.absolute('./spec-runner.html');
UnitTester.init(url);