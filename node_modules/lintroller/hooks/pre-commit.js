var LintRoller = require('../src/lintroller');

var config = {
    verbose          : false,
    stopOnFirstError : false,

    //recursively include JS files in these folders
    filepaths  : [
        '../'
    ],

    //but ignore anything in these folders
    exclusions : [
        '../node_modules/',
        '../assets/',
        '../docs/'
    ],

    linters : [
        {
            type : 'jsLint'
        },
        {
            type : 'jsHint'
        },
        {
            type : 'esprima'
        }
    ]
};

try {
    LintRoller.init(config);
}
catch (e) {
    console.log('\nAn error has been caught:\n\n');
    console.log(e);
    process.exit(1);
}