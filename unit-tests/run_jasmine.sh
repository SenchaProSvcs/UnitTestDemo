clear

### Check for errors; abandon the process if error exist
function checkError {
    if [[ $1 != 0 ]] ; then
        exit 99
    fi
}

echo "*** Jasmine Tests... ***"
phantomjs Jasmine-Runner.js
checkError $?

### Exit successfully
exit 0