// Names.js
// --------


// Collection.js
// -------------
define(["jquery","backbone","models/Name",],

    function($, Backbone, Name) {

    var Names = Backbone.Collection.extend({
        
        model       : Name,
        apiBaseURL  : '',
        doorId      : '',

        initialize: function(models, options) {                    
            this.config = options.config;                
            this.fetch({dataType:'xml'});
        },

        url: function(){
            return '//'+ this.config.baseURL +"/" +this.config.appDirectory +"/xml/names.xml";
        },

        parse: function(data) {
            var parsed = [];
            
            $(data).find("name").each(function (index) {               
                var allNames = $(this).attr("allNames").split('|');
                var actualName = $(this).text();

                _.each(allNames, function(val){
                    console.log('going through all names: '+n);
                    parsed.push({
                        'name'    : actualName,
                        'spelling': val
                    });               
                })
                
            });

            return parsed;                  
        },

        getAudioByName: function(audioName){
            return this.findWhere({name: audioName});
            console.log(arr);
            return arr[0];
            this.models.find(function(model) { return model.get('name') == audioName; });
        }   


    });

    // Returns the Collection class
    return Names;

  }

);