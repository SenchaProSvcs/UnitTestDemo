var config = {
    filepaths: [
		'assets/'
	],
	exclusions: [
		// ...
	],
	jsLint: './assets/jslint.js',
	lintOptions: {},
	verbose: false,
	stopOnFirstError: false,
	logFile: './error.log'
};

phantom.injectJs('PhantomLint.js');
PhantomLint.init(config);