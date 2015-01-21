// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html",],

    function($, Backbone, Model, template){
        
        var ShareTwitter = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "sharing",

            // View constructor
            initialize: function() {                
            },
            
            // View Event Handlers
            events: {
                'click #ok': 'onOKClick'             
            },            

            // Renders the view's template to the UI
            render: function() {
                
                this.$el = $('#sharing');
                // Setting the view's template using the template method
                this.template = _.template(template, {shareMethod:'Twitter'});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);
              
                return this;
            },
            
            onOKClick: function(e){
                e.preventDefault();
                this.postToTwitter();
            },

            share: function(){
                console.log("SHARING");

                this.render();                
                $('main').fadeOut();
                this.$el.fadeIn();
            },

            postToTwitter : function () {
              window.open(this.model.getTwitterLink(), '_blank');

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