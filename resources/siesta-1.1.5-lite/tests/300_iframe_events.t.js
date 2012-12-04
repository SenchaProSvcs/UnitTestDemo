StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Clicking on the elements inside of the iframe");
    
    t.testExtJS(function (t) {
        
        var iframe          = document.createElement('iframe')
        
        iframe.style.width  = '300px'
        iframe.style.height = '300px'
        iframe.src          = 'about:blank'
        
        var async           = t.beginAsync()
        
        var cont            = function () {
            t.endAsync(async)
            
            var iframeDoc       = iframe.contentWindow.document
            
            var div             = iframeDoc.createElement('div')
            
            div.setAttribute('style', 'width : 100px; height : 100px; left : 100px; top : 100px; position : absolute; border : 1px solid black')
            div.innerHTML       = '&nbsp;'
            
            var input           = iframeDoc.createElement('input')
            
            iframeDoc.body.appendChild(div)
            iframeDoc.body.appendChild(input)
            
            var counter         = 0
            
            div.onclick = function () {
                counter++
            }
            
            t.chain(
                {
                    action      : 'click',
                    target      : div
                },
                function (next) {
                    t.is(counter, 1, 'One click event detected')
                    
                    next()
                },
                {
                    action      : 'type',
                    target      : input,
                    text        : 'foobar'
                },
                function (next) {
                    t.is(input.value, 'foobar', 'Correct text typed in the input field')
                }
            )
        }
        
        if (iframe.attachEvent) 
            iframe.attachEvent('onload', cont)
        else
            iframe.onload = cont
            
        document.body.appendChild(iframe)
    });
});

