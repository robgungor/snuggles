// MobileInit.js
// -------------

// Include Mobile Specific JavaScript files here (or inside of your Mobile router)
require(["jquery", "backbone", "routers/MobileRouter", "jqueryui", "backbone.validateAll"],
  function($, Backbone, MobileRouter) {
  	
  	// hide landing
  	setTimeout(function(){
  		$('#landing').fadeOut();
  		$('main').fadeIn();
  	}, 1000);

    // Instantiates a new Mobile Router instance
    new MobileRouter();
  }

);