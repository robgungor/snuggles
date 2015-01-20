// Model.js
// --------
define(["jquery", "backbone","collections/Audios", "models/Settings"],

    function($, Backbone, Audios, Settings) {

        // Creates a new Backbone Model class object
        var Main = Backbone.Model.extend({

            audios: null,
            config: null,
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
                //return "http://" +this._wsSettings.accURL +"/php/application_UI/doorId=" +this._wsSettings.doorId +"/clientId=" +this._wsSettings.clientId +"/?mId="+mid;
                var pickup_url=OC_Parser.getStrNodeValue(self._settingsText, "PICKUP_URL");
                return pickup_url +"?mId="+this.get('mId')+".3";
            }

        });

        // Returns the Model class
        return Main;

    }

);
