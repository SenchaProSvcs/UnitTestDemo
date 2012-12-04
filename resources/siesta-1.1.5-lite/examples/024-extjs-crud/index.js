var Harness = Siesta.Harness.Browser.ExtJS

Harness.configure({
    title     : 'Awesome Test Suite',
    
    preload : [
        "http://cdn.sencha.io/ext-4.1.0-gpl/resources/css/ext-all.css",
        "http://cdn.sencha.io/ext-4.1.0-gpl/ext-all-debug.js"
    ]
})


Harness.start(
    '010_crud.t.js'
)

