// MobileRouter.js
// ---------------
define(["jquery", "backbone", "models/App", "views/Landing", "collections/Collection"],
        
    function($, Backbone, AppModel, LandingView, Collection) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash bang on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page                
                new LandingView({model:new AppModel({config:OC_CONFIG})});

            }
    
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }

);