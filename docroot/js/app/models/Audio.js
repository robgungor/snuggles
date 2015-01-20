// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Audio = Backbone.Model.extend({

            audios: null,
            
            // Model Constructor
            initialize: function() {
                
            },

            // Default values for all of the Model attributes
            defaults: {               
            },

            parse: function(response, options) {
                console.log('PARSING AUDIO OBJ');
                console.log(response);
            },
            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Audio;

    }

);
