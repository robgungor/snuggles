// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jqueryui", "backbone.validateAll"],
  function($, Backbone, MobileRouter) {
  	
  // for main bg    
    alert('mobile init');
    //$('#main-bg-container').css({'opacity':'1'});
    $('body').css({background:'url(img/common/main-bg.jpg) no-repeat', 'background-size':'cover', 'background-attachment':'fixed'});

    clearInterval(window.preloadTimer);

    document.getElementById("loading-bar-fill").style.width = '253px';
    setTimeout(function(){
      document.getElementById("loading-heart").style.opacity = '1';
    }, 300);
    
    // do this on timeout to add a pause for animation
    setTimeout(function(){

      $('main').fadeIn(0);
      $('main').css({'opacity':'1'});
      $('main').addClass('loaded');
      //fadeOut is overloading CPU I think
      $('#loading').css({'opacity':'0'});
      setTimeout(function(){ $('#loading').hide(); }, 400);

    }, 800);

    

    // Instantiates a new Mobile Router instance
    new MobileRouter();

    var loadJS =  function(file, callback) {
        
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = file;

      if (script.readyState) {  // IE
        script.onreadystatechange = function() {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {  // Other Browsers
        script.onload = function() {
          callback();
        };
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    };  


    // fb and twitter laoding
    window.twttr = (function (d,s,id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
      js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
    }(document, "script", "twitter-wjs"));

    twttr.ready(function (twttr) {
      twttr.events.bind('tweet', function(event) {
        if(window.postedToTwitter)
          postedToTwitter(event);
      });
    });

    //facebook api loading in... 
    (function(d, debug){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js#xfbml=1&appId=173540005994564";
      ref.parentNode.insertBefore(js, ref);

      js.onload = function(){
        console.log("FB LOADED");
          loadJS("//"+OC_CONFIG.baseURL+"/includes/facebookconnectV2.js", function(){
            fbcSwitchAlertMode();
            fbcVersion = 'v2.0';    
            fbcSetFormat('json')
              //fbcSetFlashObjectId('fbcReceiver');
            fbcInitialize();
          });
      }
    }(document, /*debug*/ false));

    
     /* ++++++++++++++++++++++++++++++++++++++++++++
      FACEBOOK TRACKING CODE +++++++++++++++++++++++ 
     +++++++++++++++++++++++++++++++++++++++++++++++ */
    // (function () {
    //         var _fbq = window._fbq || (window._fbq = []);
    //         if (!_fbq.loaded) {
    //             var fbds = document.createElement('script');
    //             fbds.async = true;
    //             fbds.src = '//connect.facebook.net/en_US/fbds.js';
    //             var s = document.getElementsByTagName('script')[0];
    //             s.parentNode.insertBefore(fbds, s);
    //             _fbq.loaded = true;
    //         }
    //     })();
  console.log('OC_CONFIG.fbcApplicationKey: '+OC_CONFIG.fbcAppKey);
   
    
  
    window.fbAsyncInit = function()
    {
        FB.init
        (
            {
                 appId: '173540005994564',
                 status: true,
                 cookie: true
            }
        );
    }
    var fbcLogin_cb;
    var ua = navigator.userAgent.toLowerCase();

    //call fbcLogin if the connectState is 0
    window.fbcReceiver = new function(){
      return {
        fbcSetConnectState: function(result){
          //console.log("fbcSetConnectState: " +result);
          if(result>0)
            fbcGetAccessToken();
        },
        fbcSetAccessToken: function(result){
          if(fbcLogin_cb !=null){
            fbcLogin_cb();
            fbcLogin_cb=null;
          }
          //console.log("fbcSetAccessToken: " +result);
        }
      }
    }

     
 

  }

);