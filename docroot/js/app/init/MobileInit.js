// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jqueryui", "backbone.validateAll"],
  function($, Backbone, MobileRouter) {
  	// for main bg    
    
    $('#main-bg-container').css({'opacity':'1'});
  	
    // do this on timeout to add a pause for animation
  	setTimeout(function(){

      $('main').fadeIn(0);
      $('main').css({'opacity':'1'});
      
      //fadeOut is overloading CPU I think
      $('#landing').css({'opacity':'0'});
      setTimeout(function(){ $('#landing').hide(); }, 400);

  	}, 300);

    // FB.init({
    //     appId: _wsSettings.fbcApplicationKey,
    //     status: true,
    //     cookie: true
    // });

    // Instantiates a new Mobile Router instance
    new MobileRouter();

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

    // facebook api loading in... 
    (function(d, debug){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
      ref.parentNode.insertBefore(js, ref);
    }(document, /*debug*/ false));


    // window.fbAsyncInit = function()
    // {
    //     FB.init
    //     (
    //         {
    //              appId: OC_CONFIG.fbcApplicationKey,
    //              status: true,
    //              cookie: true
    //         }
    //     );
    // }
    // var fbcLogin_cb;
    // var ua = navigator.userAgent.toLowerCase();

    // //call fbcLogin if the connectState is 0
    // window.fbcReceiver = new function(){
    //   return {
    //     fbcSetConnectState: function(result){
    //       //console.log("fbcSetConnectState: " +result);
    //       if(result>0)
    //         fbcGetAccessToken();
    //     },
    //     fbcSetAccessToken: function(result){
    //       if(fbcLogin_cb !=null){
    //         fbcLogin_cb();
    //         fbcLogin_cb=null;
    //       }
    //       //console.log("fbcSetAccessToken: " +result);
    //     }
    //   }
    // }

    // $(function(){
    //   fbcSetFlashObjectId('fbcReceiver');
    //   fbcInitialize();
    // })

  }

);