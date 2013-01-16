/**
 * @class LintRoller.util
 * @singleton
 *
 * Some additional utilities for cleaning up JavaScript lint.
 */
util = {

    /**
     * @private
     */
    init : function (parent) {
        this.parent = parent;
        return this;
    },


    /**
     * A utility that will eliminate all "Mixed spaces with tabs." warnings by replacing tab characters with spaces.
     *
     * @param {Object} config A configuration object
     * @param {Number} spacingChars The number of spaces to replace a tab
     */
    replaceTabsWithSpaces : function (config, spacingChars) {
        this.parent.initConfigs(config);
        this.parent.parseTree(config.filepaths);

        this.parent.log('\nFilesystem has been parsed. Looping through available files...', true);

        var msg = 'Mixed spaces and tabs.';
        var offendingFiles = this.locateOffenders(msg);

        //HOW MANY ERRORS?!?
        this.parent.log(
            'Found ' + offendingFiles.length +
                ' files matching the error "' + msg +
                '" between ' + this.parent.linters.length + ' linters.\n',
            true
        );

        if (offendingFiles.length === 0) {
            this.parent.log(
                'LintRoller has found 0 offending files. Your usage of tabs/spaces is acceptable!\n',
                true
            );

            process.exit(0);
        }

        try {
            this.fixOffendingFiles(offendingFiles, spacingChars);
        }
        catch (e) {
            this.parent.log(
                'An error has occurred: ' + e,
                true
            );

            process.exit(1);
        }

        this.parent.log(
            'LintRoller has attempted to replace all tabs with ' + spacingChars + ' spaces.\n',
            true
        );

        process.exit(0);
    },


    /**
     * @private
     */
    locateOffenders : function (msg) {
        var offendingFiles = [],
            linter, newFiles, i;

        //find offending files
        for (i = 0; i < this.parent.linters.length; i++) {
            linter = this.parent.linters[i];

            newFiles = this.findLintErrors(linter.lib, linter.options, msg);
            offendingFiles = offendingFiles.concat(newFiles);
        }

        return offendingFiles;
    },


    /**
     * @private
     */
    fixOffendingFiles : function(offendingFiles, spacingChars) {
        var i = 0,
            spaces = '',
            file, js;

        for (i; i<spacingChars; i++) {
            spaces += ' ';
        }

        for (i=0; i < offendingFiles.length; i++) {
            file = offendingFiles[i];
            js = this.parent.fs.readFileSync(file, 'utf8');

            js = js.replace(/\t/g, spaces);

            this.parent.fs.writeFileSync(file, js, 'utf8');
        }
    },


    /**
     * @private
     */
    findLintErrors : function (linter, options, msg) {
        var j = 0,
            offendingFiles = [],
            file, js;

        for (j; j < this.parent.files.length; j++) {

            file = this.parent.files[j];
            js = this.parent.fs.readFileSync(file, 'utf8');

            var i = 0,
                result = linter(js, options),
                totalErrors = linter.errors.length,
                error;

            if (!result) {
                for (i; i < totalErrors; i++) {
                    error = linter.errors[i];

                    if (error && error.reason === msg) {
                        offendingFiles.push(file);
                        break;
                    }
                }
            }
        }

        return offendingFiles;
    }

};

module.exports = util;