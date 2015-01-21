// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html",],

    function($, Backbone, Model, template){
        
        var ShareEmail = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: "sharing",

            // View constructor
            initialize: function() {                
            },
            
            // View Event Handlers
            events: {
                'click #sharing-nav .email': 'onEmailShareClick'             
            },            

            // Renders the view's template to the UI
            render: function() {
                
                // Setting the view's template using the template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);
              
                return this;
            },
            
            share: function(){
                //var here_link = "<a href='http://"+_wsSettings.baseURL +"/"+_wsSettings.appDirectory+"?mId="+isaac_mId+"'>here</a>";
                var here_link = "here (http://"+this.model.config.baseURL +"/"+this.model.config.appDirectory+"?mId="+this.model.get('mId')+")";
                
                var mail_href_msg = "mailto:?subject=You%E2%80%99ve Received a Valentine from Snuggle";
                mail_href_msg += "body=Hi%2C%0D%0A%0D%0ASomeone wants to make your holidays merry and bright!%0D%0A%0D%0A";
                mail_href_msg += "Click "+here_link+" to see your Note from the Nutcracker!%0D%0A%0D%0A";
                mail_href_msg += "Privacy Policy (http://content.oddcast.com/host/nutcracker/privacy.php)";
                
                window.location.href = mail_href_msg;
                //OC_ET.event("ce8");
                //isaac_share_after_event();
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
                xml += '      <from>\n';
                xml += '        <name>' +fromInfo[0] +'</name>\n';
                xml += '        <email>' +fromInfo[1] +'</email>\n';
                xml += '      </from>\n';
                xml += '      <body></body>\n';
                for(var i=0; i<toInfos.length; i++){
                  xml += '    <to>\n';
                  xml += '      <name>' +toInfos[i][0] +'</name>\n';
                  xml += '      <email>'+toInfos[i][1] +'</email>\n';
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

        });

        // Returns the View class
        return ShareEmail;

    }

);