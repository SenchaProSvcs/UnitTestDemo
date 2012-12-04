/*

Siesta 1.1.5
Copyright(c) 2009-2012 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Harness.Browser.ExtJS
@extends Siesta.Harness.Browser 

Class, representing the browser harness. This class provides a web-based UI and defines some additional configuration options.

The default value of the `testClass` configuration option in this class is {@link Siesta.Test.ExtJS}, which inherits from 
{@link Siesta.Test.Browser} and contains various ExtJS-specific assertions. So, use this harness class, when testing an ExtJS application.

This file is for reference only, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.

Synopsys
========

    var Harness = Siesta.Harness.Browser.ExtJS;
    
    Harness.configure({
        title     : 'Awesome ExtJS Application Test Suite',
        
        transparentEx       : true,
        
        autoCheckGlobals    : true,
        expectedGlobals     : [
            'Ext',
            'Sch'
        ],
        
        preload : [
            "http://cdn.sencha.io/ext-4.0.2a/ext-all-debug.js",
            "../awesome-project-all.js",
            {
                text    : "console.log('preload completed')"
            }
        ]
    })
    
    
    Harness.start(
        // simple string - url relative to harness file
        'sanity.t.js',
        
        // test file descriptor with own configuration options
        {
            url     : 'basic.t.js',
            
            // replace `preload` option of harness
            preload : [
                "http://cdn.sencha.io/ext-4.0.6/ext-all-debug.js",
                "../awesome-project-all.js"
            ]
        },
        
        // groups ("folders") of test files (possibly with own options)
        {
            group       : 'Sanity',
            
            autoCheckGlobals    : false,
            
            items       : [
                'data/crud.t.js',
                ...
            ]
        },
        ...
    )


*/

Class('Siesta.Harness.Browser.ExtJS', {
    
    isa     : Siesta.Harness.Browser,
    
    // pure static class, no need to instantiate it
    my : {
        
        has     : {
            /**
             * @cfg {Class} testClass The test class which will be used for creating test instances, defaults to {@link Siesta.Test.ExtJS}.
             * You can subclass {@link Siesta.Test.ExtJS} and provide a new class. 
             * 
             * This option can be also specified in the test file descriptor. 
             */
            testClass           : Siesta.Test.ExtJS,
            
            /**
             * @cfg {Boolean} waitForExtReady
             * 
             * By default the `StartTest` function will be executed after `Ext.onReady`. Set to `false` to launch `StartTest` immediately.  
             * 
             * This option can be also specified in the test file descriptor. 
             */
            waitForExtReady     : true,
            
            /**
             * @cfg {Boolean} waitForAppReady
             * 
             * Setting this configuration option to "true" will cause Siesta to wait until the ExtJS MVC application on the test page will become ready,
             * before starting the test. More precisely it will wait till the first "launch" event from any instance of `Ext.app.Application` class on the page.
             *   
             * This option can (and probably should) be also specified in the test file descriptor. 
             */
            waitForAppReady     : false,
            

            /**
             * @cfg {Object} loaderPath
             * 
             * The path used to configure the Ext.Loader with, for dynamic loading of Ext JS classes.
             *
             * This option can be also specified in the test file descriptor. 
             */
            loaderPath          : null,
            
            extVersion              : null,

            /**
             * @cfg {Boolean} allowExtVersionChange
             * 
             * True to show a version picker to swiftly change which Ext JS version is used in the test suite.
             */
            allowExtVersionChange   : false,
            
            extVersionRegExp    : /ext(?:js)?-(\d\.\d+\.\d+.*?)\//
        },
        
        
        methods : {
            createViewport       : function(config) {
               return Ext.create("Siesta.Harness.Browser.UI.ExtViewport", config);
            },
            
            setup : function (callback) {
                if (this.allowExtVersionChange) this.extVersion     = this.findExtVersion()
                
                this.SUPER(callback)
            },
            
        
            getNewTestConfiguration : function (desc, scopeProvider, contentManager, options, runFunc) {
                var config          = this.SUPERARG(arguments)
                
                config.waitForExtReady  = this.getDescriptorConfig(desc, 'waitForExtReady')
                config.waitForAppReady  = this.getDescriptorConfig(desc, 'waitForAppReady')
                config.loaderPath       = this.getDescriptorConfig(desc, 'loaderPath')
                
                return config
            },
            
            
            setExtVersion : function (newVersion) {
                if (!this.allowExtVersionChange || newVersion == this.extVersion) return
                
                this.extVersion         = newVersion
                
                var me                  = this
                var allDescriptors      = this.flattenDescriptors(this.descriptors)
                var mainPreset          = this.mainPreset
                
                this.setExtVersionForPreset(mainPreset, newVersion)
                
                Joose.A.each(allDescriptors, function (desc) {
                    if (desc.preset != mainPreset) me.setExtVersionForPreset(desc.preset, newVersion)
                })
            },
            
            
            setExtVersionForPreset : function (preset, newVersion) {
                var me      = this
                
                preset.eachResource(function (resource) {
                    var url     = resource.url
                    
                    if (url && url.match(me.extVersionRegExp)) resource.url = url.replace(me.extVersionRegExp, 'ext-' + newVersion + '/')
                })
            },
            
            
            findExtVersion : function () {
                var me      = this
                
                var found
                
                this.mainPreset.eachResource(function (resource) {
                    var match   = me.extVersionRegExp.exec(resource.url)
                    
                    if (match) {
                        found   = match[ 1 ]
                        
                        return false
                    }
                })
                
                return found
            }
        }
    }
})


