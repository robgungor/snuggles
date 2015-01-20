// Model.js
// --------
define(["jquery", "backbone","collections/Audios"],

    function($, Backbone, Audios) {

        // Creates a new Backbone Model class object
        var Main = Backbone.Model.extend({

            audios: null,
            config: null,
            // Model Constructor
            initialize: function(options) {                
                // loads in and parses list of audios from the server
                this.audios = new Audios([],options.config);
                this.config = options.config;
            },

            // Default values for all of the Model attributes
            defaults: {
                'selectedVideo':'super-snuggle',                
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Main;

    }

);
