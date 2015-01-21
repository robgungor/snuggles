// Model.js
// --------
define(["jquery", "backbone","collections/Audios", "models/Settings"],

    function($, Backbone, Audios, Settings) {

        // Creates a new Backbone Model class object
        var Main = Backbone.Model.extend({

            audios: null,
            config: null,
            settings: null,
            // Model Constructor
            initialize: function(options) {                
                // loads in and parses list of audios from the server
                this.audios = new Audios([],options.config);
                this.settings = new Settings({config:options.config});
                this.config = options.config;
            },

            // Default values for all of the Model attributes
            defaults: {
                'selectedVideo':'super-snuggle',                
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            getMessageLink: function (){                                
                return this.settings.get('PICKUP_URL') +"?mId="+this.get('mId')+".3";
            },

            getTwitterLink: function(){
                var self = this;

                var url = "https://twitter.com/intent/tweet?";
                url += "url=";
                url += encodeURIComponent( self.getMessageLink( self.get('mId') ) );
                url += "&text=";
                url += encodeURIComponent( self.settings.get('TWITTER_DEFAULT_TEXT') );
                
                return url;              
            }

        });

        // Returns the Model class
        return Main;

    }

);
