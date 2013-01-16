var ESPRIMA = require('esprima');

/**
 * @class LintRoller.linters.Esprima
 *
 * Created automatically if a { type : 'esprima' } config is passed to the linters array.
 */
var linter = {

    lib : ESPRIMA,

    /**
     * @cfg
     * An object containing lint validation options
     */
    options : {
        tolerant: true
    },

    /**
     * @private
     */
    applyLintOptions : function (options) {
        var i;

        if (!options) {
            return false;
        }

        for (i in options) {
            if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }
    },

    /**
     * @private
     */
    runLinter : function (parentModule) {
        var j = 0,
            errorList = ['=============== Running Esprima... ===============\n\n'],
            file, js;

        parentModule.log('Running Esprima against code...', false);

        for (j; j < parentModule.files.length; j++) {

            file = parentModule.files[j];
            js = parentModule.fs.readFileSync(file, 'utf8');

            var i = 0,
                result, totalErrors, error;

            try {
                result = ESPRIMA.parse(js, this.options);

                if (result.errors) {
                    totalErrors = result.errors.length;

                    for (i; i < totalErrors; i++) {
                        error = result.errors[i];

                        if (error) {
                            errorList.push(
                                file,
                                '    Line #: ' + error.lineNumber,
                                '    Char #: ' + error.column,
                                '    Reason: ' + error.message,
                                '',
                                ''
                            );

                            if (parentModule.stopOnFirstError) {
                                break;
                            }
                        }
                    }

                    if (parentModule.stopOnFirstError && errorList.length > 0) {
                        parentModule.announceErrors(errorList);
                    }
                }
            }
            catch (caughtError) {
                errorList.push(
                    file,
                    '    Line #: ' + caughtError.lineNumber,
                    '    Char #: ' + caughtError.column,
                    '    Reason: ' + caughtError.message,
                    '',
                    ''
                );

                if (parentModule.stopOnFirstError) {
                    parentModule.announceErrors(errorList);
                }
            }
        }

        return errorList;
    }

};

module.exports = linter;