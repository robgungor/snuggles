define(['backbone', 'underscore', 'utils/OC_Utils', 'utils/OC_Parser'], 
	function(Backbone, _, OC_Utilities, OC_Parser) {
//********************************************************************************
//START OC
//********************************************************************************
	var OC_MessageSaver = {
		_api_base_url: '',	
		_wsSettings: {
			doorId	: 1281,
			clientId: 360,
			topicId: 0
		},
	    //NOTE saveMessage
		saveMessage : function (model, extraData, callback){
			_wsSettings = _wsSettings || {
				doorId	: 1281,
				clientId: 360,
				topicId: 0
			}
			var audio = model.audios.getAudioByName(model.get('selectedVideo'));
	        // var tmp_videoName = isaac_selected_video_name;
	        // var isaac_audio_id = OC._audioNameToId[tmp_videoName];
	        // var isaac_audio_path = OC._audios[ OC._audioNameToId[tmp_videoName] ];
			
			var strExtraData = "";
			for (var prop in extraData) {
				strExtraData += prop +"=" +encodeURIComponent(extraData[prop]) +"&amp;";
			}
		  
			xml = "";
			xml += '<player>\n';
			xml += '  <params>\n';
			xml += '    <door>'	 + model.config.doorId   +'</door>\n';
			xml += '    <client>'+ model.config.clientId +'</client>\n';
			xml += '    <topic>' + model.config.topicId  +'</topic>\n';
			xml += '    <mode>embed</mode>\n';
			xml += '    <appType>workshop</appType>\n';
			xml += '  </params>\n';
			xml += '  <assets>\n';
	        
	//		xml += '    <video tempid="'+videoId1+'" name="" length="25" vidid="0">' +videoSrc1 +'</video>\n';
	//		xml += '    <video tempid="'+videoId2+'" name="" length="25" vidid="0">' +videoSrc2 +'</video>\n';
	//		xml += '    <bg tempid="'+bgId+'" name="">' +bgSrc +'</bg>\n';
	        xml += '    <avatar modelId="28370" tempid="1" type="2D" is3d="0">oh/28370/0/74453/0/0/0/0/0/0/0/0/ohv2.swf?cs=</avatar>\n'; //isaac
	///        xml += '    <bg id="56849" name="1x1">http://content-vd.oddcast.com/ccs6/customhost/1253/bg/1358553887449755.jpg</bg>\n'; //isaac
	        xml += '    <audio type="prerec" id="'+audio.get('id')+'" name="'+audio.get('name')+'">'+audio.get('url')+'</audio>\n';//isaac
	        
			xml += '  </assets>\n';
			xml += '  <scenes>\n';
			xml += '    <scene>\n';
	        
	//		xml += '      <video>\n';
	//		xml += '        <tempid>' +videoId1 +'</tempid>\n';
	//		xml += '        <tempid>' +videoId2 +'</tempid>\n';
	//		xml += '      </video>\n';
	//		xml += '      <bg>\n';
	//		xml += '        <tempid>' +bgId +'</tempid>\n';
	//		xml += '      </bg>\n';
	//		xml += '      <id>1</id>\n';
	        xml += '      <fb_scene_id>null</fb_scene_id>\n';       //isaac
	        xml += '      <avatar>\n';                              //isaac
	        xml += '        <tempid>1</tempid>\n';                  //isaac
	        xml += '        <x>0.00</x>\n';                         //isaac
	        xml += '        <y>0.00</y>\n';                         //isaac
	        xml += '        <scale>100.00</scale>\n';               //isaac
	        xml += '      </avatar>\n';                             //isaac
	        xml += '      <audio><id>'+isaac_audio_id+'</id></audio>\n';         //isaac
	///        xml += '      <bg><id>56849</id></bg>\n';               //isaac
	        xml += '      <id>1</id>\n';                            //isaac
	        
			xml += '    </scene>\n';
			xml += '  </scenes>\n';
			xml += '  <extradata>bgPos=0%2E0%2C0%2E0%2C1%2E000%2C0%2E0</extradata>\n'; //' +strExtraData +'
			xml += '</player>\n';

			var tmp;
			OC_Utilities.getUrl(model.config.baseURL +"/api/saveWorkshopData.php?rand=" +Math.random(), {xmlData: xml}, true, function(tmp){
				//for testting purpose ===> http://host-vd.oddcast.com/php/api/playScene/doorId=1217/clientId=217/mId=<mId>
				tmp = OC_Parser.getXmlDoc(tmp);
				tmp = OC_Parser.getXmlNode(tmp, 'MESSAGE');
				if(tmp){
				     tmp = OC_Parser.getXmlNodeAttribute(tmp, 'MID');
				}
				callback(tmp);
			});
		},
	    
	    
		emailMessage : function (mid, fromInfo, toInfos, extradata, cb){
			var strExtraData = "";
			for (var prop in extradata) {
				strExtraData += prop +"=" +encodeURIComponent(extradata[prop]) +"&amp;";
			}
		  
			xml = "";
			xml += '<player>\n';
			xml += '  <params>\n';
			xml += '    <door>' +this._wsSettings.doorId +'</door>\n';
			xml += '    <client>' +this._wsSettings.clientId +'</client>\n';
			xml += '    <topic>' +this._wsSettings.topicId +'</topic>\n';
			xml += '    <mode>email</mode>\n';
			xml += '    <appType>workshop</appType>\n';
			xml += '    <mid>'+mid+'</mid>\n';
			xml += '  </params>\n';

		  
			xml += '  <message>\n';
			xml += '    	<from>\n';
			xml += '    		<name>' +fromInfo[0] +'</name>\n';
			xml += '    		<email>' +fromInfo[1] +'</email>\n';
			xml += '    	</from>\n';
			xml += '    	<body></body>\n';
			for(var i=0; i<toInfos.length; i++){
				xml += '    <to>\n';
				xml += '    	<name>' +toInfos[i][0] +'</name>\n';
				xml += '    	<email>'+toInfos[i][1] +'</email>\n';
				xml += '    </to>\n';
			}
			xml += '  </message>\n';

			xml += '  <extradata>' +strExtraData +'</extradata>\n';
			xml += '</player>\n';
			var tmp;
			OC_Utilities.getUrl(this._api_base_url +"/api/sendMessage.php?rand=" +Math.random(), {xmlData: xml}, true, function(tmp){
				tmp = OC_Parser.getXmlDoc(tmp);
				tmp = OC_Parser.getXmlNode(tmp, 'MESSAGE');
				if(tmp){
					tmp = OC_Parser.getXmlNodeAttribute(tmp, 'MID');
				}
				cb(tmp);
			});
		}

		getExtraDataFromPlayScene : function (mid){
			try{
				var tmp = OC_Utilities.getUrl(this._api_base_url +"/php/api/playScene/doorId="  +this._wsSettings.doorId +"/clientId=" +this._wsSettings.clientId +"/mId=" +mid+"?rand=" +Math.random());
				tmp = OC_Parser.getXmlDoc(tmp);
				tmp = OC_Parser.getXmlNode(tmp, 'extradata');
				tmp = OC_Parser.getXmlNodeValue(tmp);
				if(tmp==null){
					//matt temp use for deugging purpose
					tmp="msg%3DI%20march%20to%20support%20awareness%26chptr%3D5%26hr%3D1%26hrc%3D15128939%26otft%3D1%26clr%3D13937030%26bgPos%3D0%2C0%2C1%2C0%26fn%3DDebug%20N%26bgid%3D51336%26%3D";
					//return null;
				}
				tmp = decodeURIComponent(tmp);
				var extradata = {};
				var vars = tmp.split('&');
				for (var i = 0; i < vars.length; i++) {
					 var pair = vars[i].split('=');
					 extradata[pair[0]] = decodeURIComponent(pair[1]);
				}
				return extradata;
			}catch(e){
				errorCaught(e, mid);
				return null;
			} 
		}
	}
  return OC_MessageSaver;
});