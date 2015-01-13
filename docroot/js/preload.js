// Mobile/Desktop Detection script
(function(ua, w, d, undefined) {

        // App Environment
        // ---------------
        //  Tip: Set to true to turn on "production" mode
        var production = false,
          filesToLoad,

          //App Helper Methods
          Preloader = {
            // estimated amounts: helps with percentage of loading bar
            imagesEstimatedK: 513,
            cssEstimatedK: 22,
            jsEstimatedK: 180,
            jsPercentLoaded: 0,
            cssPercentLoaded: 0,
            imagesPercentLoaded: 0,
            totalEstimatedK: 0,

            initView: function() {
                var self = this;                                
                self.totalEstimatedK = self.imagesEstimatedK+self.cssEstimatedK+self.jsEstimatedK;
                self.percentShown = 0;
                self.percentLoaded = 0;
                self.timer = setInterval(function(){self.updatePercentageView();}, 300);
            },
            loadCSS: function(url, callback) {
              var self = this;
              
              var link = d.createElement("link");
              link.type = "text/css";
              link.rel = "stylesheet";
              link.href = url;
              d.getElementsByTagName("head")[0].appendChild(link);
              if(callback) {
                callback();
              }
            },
            loadJS: function(file, callback) {
              //TODO - handle an array instead of a file
              var script = d.createElement("script");
              script.type = "text/javascript";
              var self = this;
              
              if (script.readyState) {  // IE
                script.onreadystatechange = function() {
                  if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                    self.jsPercentLoaded = .3; // this initial load is very small...  bulk happens at require                   
                  }
                };
              } else {  // Other Browsers
                script.onload = function() {
                  callback();
                  self.jsPercentLoaded = .3; // this initial load is very small...  bulk happens at require
                };
              }
              if(((typeof file).toLowerCase()) === "object" && file["data-main"] !== undefined) {
                script.setAttribute("data-main", file["data-main"]);
                script.async = true;
                script.src = file.src;
              } else {
                script.src = file;
              }
              d.getElementsByTagName("head")[0].appendChild(script);
            },
            loadJavascripts: function(callback){
                var self = this,
                    filesToLoad = ['../img/main/video-placehold.jpg',
                                    '../img/main/button-email.png',
                                    '../img/main/input-bg.jpg'
                                    ],
                    filesTotal;
                                            
                var onJSLoaded = function (){
                    // remove the previous loaded image
                    filesToLoad = filesToLoad.slice(1, filesToLoad.length);
                    
                    var filesLeft = filesTotal-filesToLoad.length;                    
                    self.jsPercentLoaded = (filesLeft/filesTotal);
                   
                    if(imagesToLoad.length > 0) loadNextImage();
                    else callback();
                }

                var loadNext = function(){
                    self.loadJS(filesToLoad[0], onJSLoaded);
                };

                imagesTotal = imagesToLoad.length;
                loadNextImage();
            },  
            loadFiles: function(production, obj, callback) {
              var self = this;
              
              self.cssPercentLoaded = 1;

              if(production) {
                // Loads the production CSS file(s)
                self.loadCSS(obj["prod-css"], function() {
                  // If there are production JavaScript files to load
                  if(obj["prod-js"]) {
                    // Loads the correct initialization file (which includes Almond.js)
                    self.loadJS(obj["prod-js"], callback);
                  }
                });
              } else {
                // Loads the development CSS file(s)
                self.loadCSS(obj["dev-css"], function() {                 
                  // If there are development Javascript files to load
                  if(obj["dev-js"]) {                    
                    // Loads Require.js and tells Require.js to find the correct intialization file
                    self.loadJS(obj["dev-js"], callback);
                    //TODO
                    //self.loadJavascripts(callback);
                  }
                });
              }
            },
            loadImages: function(callback){
                var self = this,
                    imagesToLoad = ['../img/main/video-placehold.jpg',
                                    '../img/main/button-email.png',
                                    '../img/main/input-bg.jpg'
                                    ],
                    imagesTotal;
                                            
                    //if (window.devicePixelRatio == 2) {
                      //retina images
                      imagesToLoad.push.apply(imagesToLoad, 
                        [ '../img/main/share-a-snug-logo@2x.png',
                          '../img/main/bubble-button-bg@2x.png',
                          '../img/main/bubble-button-bg-active@2x.png',
                          '../img/main/button-email@2x.png',
                          '../img/main/button-email-active@2x.png',
                          '../img/main/button-fb@2x.png',
                          '../img/main/button-fb-active@2x.png',
                          '../img/main/bubble-button-long-bg@2x.png',
                          '../img/main/button-twitter@2x.png',
                          '../img/main/button-twitter-active@2x.png'
                        ]);

                    // } else{
                    //   imagesToLoad.push.apply(imagesToLoad, 
                    //     [ '../img/main/share-a-snug-logo.png',
                    //       '../img/main/customize-and-share.png',
                    //       '../img/main/bubble-button-bg.png',
                    //       '../img/main/bubble-button-long-bg.png',
                    //       '../img/main/button-fb.png',
                    //       '../img/main/button-twitter.png'                          
                    //     ]);
                    // }       

                var onImageLoaded = function (){
                    // remove the previous loaded image
                    imagesToLoad = imagesToLoad.slice(1, imagesToLoad.length);
                    
                    var imagesLeft = imagesTotal-imagesToLoad.length;                    
                    self.imagesPercentLoaded = (imagesLeft/imagesTotal);
                   
                    if(imagesToLoad.length > 0) loadNextImage();
                    else callback();
                }

                var loadNextImage = function(){
                    var img = new Image();
                    
                    // call the notify_complete function when the image has loaded
                    img.onload = onImageLoaded;

                    // load the image
                    img.src = imagesToLoad[0];                    
                };

                imagesTotal = imagesToLoad.length;
                loadNextImage();
            },  
            updatePercentageView: function(){
                var self = this;
                                
                var total = self.totalEstimatedK;
                self.percentLoaded = (self.jsPercentLoaded*(self.jsEstimatedK/total)) + (self.cssPercentLoaded*(self.cssEstimatedK/total)) + (self.imagesPercentLoaded*(self.imagesEstimatedK/total));
                // increment the percent shown, but do not exceed actual percent loaded
                self.percentShown = Math.max(self.percentShown+.01, self.percentLoaded);
                
                if(self.percentShown > 1 && self.percentLoaded < 1) self.percentShown = .1; // restart for very very slow connections 

                document.getElementById("loading-bar-fill").style.width = (self.percentShown*253)+'px';

                // all loaded
                if(self.percentLoaded >= 1 && self.percentShown >=.99) self.loaded();
            },
            loaded: function(){
                
                var self = this;

                clearInterval(self.timer);
                                    
                document.getElementById("loading-bar-fill").style.width = '253px';
                setTimeout(function(){
                  document.getElementById("loading-heart").style.opacity = '1';
                }, 300);
            }
                     
          };

          // Mobile/Tablet Logic
          //if((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {

            // Mobile/Tablet CSS and JavaScript files to load
            filesToLoad = {
              // CSS file that is loaded when in development mode
              "dev-css": "../css/app.css",
              // CSS file that is loaded when in production mode
              "prod-css": "../css/app.min.css",
              // Require.js configuration file that is loaded when in development mode
              "dev-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" },
              // JavaScript initialization file that is also loaded when in development mode
              "dev-init": "/js/app/init/MobileInit.js",
              // JavaScript file that is loaded when in production mode
              "prod-js": "/js/app/init/MobileInit.min.js",
            };

          //}

          // Desktop Logic
          // else {

          //   // Desktop CSS and JavaScript files to load
          //   filesToLoad = {
          //     // CSS file that is loaded when in development mode
          //     "dev-css": "../css/desktop.css",
          //     // CSS file that is loaded when in production mode
          //     "prod-css": "../css/desktop.min.css",
          //     // Require.js configuration file that is also loaded when in development mode
          //     "dev-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" },
          //     // JavaScript initialization file that is loaded when in development mode
          //     "dev-init": "/js/app/init/DesktopInit.js",
          //     // JavaScript file that is loaded when in production mode
          //     "prod-js": "/js/app/init/DesktopInit.min.js"
          //   };

          // }
          Preloader.initView();
          Preloader.loadFiles(production, filesToLoad, function() {
            
            
            if(!production && window.require) {
              Preloader.loadImages(function(){ 
                
                require([filesToLoad["dev-init"]], function(init){Preloader.loaded();});  
              });
                          
            }
          });

      })(navigator.userAgent || navigator.vendor || window.opera, window, document);