// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html",],

    function($, Backbone, Model, template){
        
        var ShareTwitter = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: "sharing",

            // View constructor
            initialize: function() {
                console.log('this is sharing, bitch');
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
            
            setTwitterPost : function (mid, snapshot){
              var twitterUrl = "https://twitter.com/intent/tweet?";
              twitterUrl += "url=";
              twitterUrl += encodeURIComponent(OC.getMessageLink(mid));
              twitterUrl += "&text=";
              twitterUrl += encodeURIComponent(this._twitterPost.text);

              //$("#twitter_link").attr("href", twitterUrl);
              this._twitterPost.link=twitterUrl;
            },

            postToTwitter : function () {
              window.open(this._twitterPost.link, '_blank');
            },
            
            twLogin: function(cb) {
                var self = this;
                if (!cb) cb = self.twLoginCB;
                //window.open("//{baseURL}/api_misc/{doorId}/twitterApi.php?cb="+cb, "Sign in with Twitter", "width=500,height=400");
                window.open(self.model.config.get('curURL') + "/api_misc/{doorId}/twitterApi.php?cb=" + cb, "Sign in with Twitter", "width=500,height=400");
            },

            twLoginCB: function(response) {
                var self = this;
                if (twStatusCallback != null) {
                    twStatusCallback(response); //<== in custom_main.js
                } else {
                    if (response['error']) { //not logged in
                        console.log("error: " + response['error']);
                    } else { //Logged in
                        console.log(response);
                    }
                }
            },

            twUpdateProfileImage: function(imgsrc, cb) {
              var self = this;
              $.ajax({
                
                  url: self.model.config.get('curURL') + '/api_misc/{doorId}/twitterApi.php?f=UpdateProfileImage&image=' + encodeURIComponent(imgsrc), 
                  dataType: 'json',
                  success: function (result) {
                      if (cb) cb(result);
                      console.log(result);
                  }
                });
            },

            twUpdateStatus: function (status, imgsrc, cb) {
                var self = this;
                if (!imgsrc) imgsrc = "";

                $.ajax({
                
                  url: self.model.config.get('curURL')+'/api_misc/{doorId}/twitterApi.php?f=UpdateStatus&status=' + encodeURIComponent(status) + '&image=' + encodeURIComponent(imgsrc), 
                  dataType: 'json',
                  success: function (result) {
                    if (cb) cb(result);
                    console.log(result);
                  }
                });
            }

        });

        // Returns the View class
        return ShareTwitter;

    }

);