clear

### Check for errors; abandon the process if error exist
function checkError {
    if [[ $1 != 0 ]] ; then
        exit 99
    fi
}

echo "*** PhantomLint on /app/... ***"
phantomjs JSLint-Runner.js
checkError $?

### Exit successfully
exit 0