var JSLINT = require('jslint');

/**
 * @class LintRoller.linters.JSLint
 *
 * Created automatically if a { type : 'jsLint' } config is passed to the linters array.
 */
var linter = {

    /**
     * @property
     * JSLint
     */
    lib : JSLINT,

    /**
     * @cfg
     * An object containing lint validation options
     */
    options : {
        nomen    : true, //if names may have dangling _
        plusplus : true, //if increment/decrement should be allowed
        sloppy   : true, //if the 'use strict'; pragma is optional
        vars     : true, //if multiple var statements per function should be allowed
        white    : true, //if sloppy whitespace is tolerated
        undef    : true, //if variables can be declared out of order,
        node     : true, //if Node.js globals should be predefined
        browser  : true, //if the standard browser globals should be predefined
        stupid   : true  //if really stupid practices are tolerated... namely blocking synchronous operations
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
            errorList = ['=============== Running JSLint... ===============\n\n'],
            file, js;

        parentModule.log('Running JSLint against code...', false);

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