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
  }

);