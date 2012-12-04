phantom.injectJs('../resources/PhantomLint/PhantomLint.js');
PhantomLint.init({
    filepaths : [
        '../app/'
    ],
    jsLint   : '../resources/PhantomLint/assets/jslint.js',
    logFile   : '_lint-errors.txt'
});