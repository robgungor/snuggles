// Collection.js
// -------------
define(["jquery","backbone","models/Audio",],

	function($, Backbone, Audio) {

	var Audios = Backbone.Collection.extend({
		
		model 		: Audio,
		apiBaseURL	: '',
		doorId		: '',

		initialize: function(models, options) {      	
			this.doorId 	= options.doorId;
			this.apiBaseURL =  "//" + options.baseURL;

			this.fetch();
		},

		url: function(){
			return this.apiBaseURL+"/php/vhss_editors/getAudios/doorId="+this.doorId;
		},

		fetch: function (options) {	    
			options = options || {};
			options.dataType = "xml";

			return Backbone.Collection.prototype.fetch.call(this, options);
		},

		parse: function(data) {
			var parsed = [];
			var baseURL = $(data).find("AUDIOS").attr("BASEURL");
			$(data).find("AUDIO").each(function (index) {   
			console.log('creating audio: '+$(this).attr("NAME"));
			    parsed.push({
			    	'id'	: $(this).attr("ID"),
					'source': $(this).attr("URL"),				
					'type' 	: $(this).attr("TYPE"),
					'name' 	: $(this).attr("NAME"),					
					'url'	: baseURL+$(this).attr("URL")+".mp3"
				});           
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

	// Returns the Model class
	return Audios;

  }

);
