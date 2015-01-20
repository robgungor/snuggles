// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Settings = Backbone.Model.extend({

            config: null,
            
            // Model Constructor
            initialize: function(options) {
                this.config = options.config;

                this.fetch();
            },

            url: function(){
                return '//'+ this.config.baseURL +"/" +this.config.appDirectory +"/xml/settings.xml"
                return this.apiBaseURL+"/php/vhss_editors/getAudios/doorId="+this.doorId;
            },
            parse: function(data) {
            var parsed = [];
            console.log('settings data: ');
            consiole.log(data);
            $(data).find("AUDIO").each(function (index) {               
                parsed.push({
                    'id'    : $(this).attr("ID"),
                    'source': $(this).attr("URL"),              
                    'type'  : $(this).attr("TYPE"),
                    'name'  : $(this).attr("NAME"),                 
                    'url'   : baseURL+$(this).attr("URL")+".mp3"
                });           
            });

            return parsed;                  
        },

            // Default values for all of the Model attributes
            defaults: {               
            },
    
            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Settings;

    }

);
