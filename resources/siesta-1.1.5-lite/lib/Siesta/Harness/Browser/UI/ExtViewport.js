/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.ExtViewport', {

    extend          : 'Siesta.Harness.Browser.UI.Viewport',
    
    headerClass     : 'Siesta.Harness.Browser.UI.ExtHeader',
    
    
    setOption : function (name, value) {
        switch (name) {
            case 'extVersion'   : return this.harness.setExtVersion(value)
            
            default             : return this.callParent(arguments)
        }
    }
//    ,
//    
//    
//    getState : function () {
//        var state       = this.callParent()
//        
//        var extVersion  = this.getOption('extVersion')
//        
//        if (extVersion && this.getOption('allowExtVersionChange')) state.extVersion = extVersion
//        
//        return state
//    } 
})
//eof Siesta.Harness.Browser.UI.ExtViewport
