var JSHINT = require('jshint').JSHINT;

/**
 * @class LintRoller.linters.JSHint
 *
 * Created automatically if a { type : 'jsHint' } config is passed to the linters array.
 */
var linter = {

    /**
     * @property
     * JSHint
     */
    lib : JSHINT,

    /**
     * @cfg
     * An object containing lint validation options
     */
    options : {

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
            errorList = ['=============== Running JSHint... ===============\n\n'],
            file, js;

        parentModule.log('Running JSHint against code...', false);

        for (j; j < parentModule.files.length; j++) {

            file = parentModule.files[j];
            js = parentModule.fs.readFileSync(file, 'utf8');

            var i = 0,
                result = this.lib(js, this.options),
                totalErrors = this.lib.errors.length,
                error;

            if (!result) {
                for (i; i < totalErrors; i++) {
                    error = this.lib.errors[i];

                    if (error) {
                        errorList.push(
                            file,
                            '    Line #: ' + error.line,
                            '    Char #: ' + error.character,
                            '    Reason: ' + error.reason,
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

        return errorList;
    }

};

module.exports = linter;