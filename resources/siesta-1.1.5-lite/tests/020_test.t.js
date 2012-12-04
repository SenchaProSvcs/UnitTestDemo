StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Siesta.Test creation")
    
    t.testGeneric(
        {
            doNotTranslate : true
        }, 
        function (t) {
            t.diag('Diag message')
            
            t.pass('Pass description')
            t.fail('Fail description')
            
            t.ok(true, 'True is ok')
            t.is(null, undefined, 'Null is undefined')
            
            t.done()
        }, 
        function (test) {
            t.is(test.results.length, 5, '5 results were created')
            
            t.is(test.assertCount, 4, 'There was 4 assertions')
            
            t.isaOk(test.results[0], Siesta.Result.Diagnostic, 'Very 1st result is a diagnostic message')
            t.isaOk(test.results[1], Siesta.Result.Assertion, '2nd results is an assertion')
        }
    )
})