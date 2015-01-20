// Collection.js
// -------------
define(["jquery","backbone","models/Audio", "utils/OC_Utils", "utils/OC_Parser"],

  function($, Backbone, Audio, OC_Utilities, OC_Parser) {

    // Creates a new Backbone Collection class object
    var Audios = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Audio,
      apiBaseURL: '',
      doorId: '',
      
      initialize: function(models, options) {
      	console.log(options);
	    this.doorId 	= options.doorId;
	    this.apiBaseURL = options.apiBaseURL;

	    this.fetch();
	  },

      url: function(){
      	return this.apiBaseURL+"/php/vhss_editors/getAudios/doorId="+this.doorId;
      },
      parse: function(response) {
      	console.log(response);
	    return response.results;

  //     	var audios = OC_Utilities.getUrl(this._api_base_url +"/php/vhss_editors/getAudios/doorId=" +this._wsSettings.doorId);
		// xml = OC_Parser.getXmlDoc(audios);
		// var audiosInfo = OC_Parser.getXmlNode(xml, "AUDIOS");
		// var audiosCount = Number(OC_Parser.getXmlNodeAttribute(audiosInfo, "NUM"));
		// var audiosBaseUrl = OC_Parser.getXmlNodeAttribute(audiosInfo, "BASEURL");
		

		// for(var i=0; i<audiosCount; i++){
		//   var tmp = OC_Parser.getXmlNode(xml, "AUDIO", i)
		//   if(tmp == null)
		// 	break;

		//   var audioid = OC_Parser.getXmlNodeAttribute(tmp, "ID");
		//   var audiosource = OC_Parser.getXmlNodeAttribute(tmp, "URL");
		//   var audiotype = OC_Parser.getXmlNodeAttribute(tmp, "TYPE");
		//   var audioname = OC_Parser.getXmlNodeAttribute(tmp, "NAME");
		//   this._audioNameToId[audioname] = String(audioid);
		//   this._audios[audioid] = audiosBaseUrl+String(audiosource)+".mp3";
  //         this._audioIdToName[audioid] = audioname;//isaac
      },
    

    });

    // Returns the Model class
    return Audios;

  }

);
