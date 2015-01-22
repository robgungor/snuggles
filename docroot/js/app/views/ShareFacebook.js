// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html",],

    function($, Backbone, Model, template){
        
        var ShareTwitter = Backbone.View.extend({

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
                
               var self = this;

                self.$el = $('#sharing');
                // Setting the view's template using the template method
                self.template = _.template(template, {shareMethod:'Facebook'});

                // Dynamically updates the UI with the view's template
                self.$el.html(self.template);

                $('.share-result').hide();
                

                $('#ok').on("click", function(e){
                    self.onOKClick(e);
                });

                $('#ok-after').on("click", function(e){
                    self.onOKAfterClick(e);
                });
              
                return this;
            },
            
            share: function(mId){

                this.render();                
                
                $('#main-loading-spinner').fadeOut(300);
                $('#sharing').fadeIn();

                
            },

            onOKClick: function(e){
                e.preventDefault();
                this.postToFacebook();

                $('.share-in').fadeOut();
                $('.share-result').fadeIn();
            },

            onOKAfterClick: function(e){
                e.preventDefault();
               
                this.$el.fadeOut(200);
                $('main').fadeIn();
            },

            postToFacebook : function () {
                var self = this;
                var obj = {
                    /*display: 'touch',*/
                    method: 'feed',
                    //link: this._fbPost.link,
                    link: "http://host-d.oddcast.com/fbrd.html?ocu=" +encodeURIComponent(self.model.getMessageLink()),
                    picture: self.model.settings.get('FACEBOOK_POST_IMAGE_URL'), 
                    name: self.model.settings.get('FACEBOOK_POST_NAME'), 
                    caption: self.model.settings.get('FACEBOOK_POST_CAPTION'), 
                    description: self.model.settings.get('FACEBOOK_POST_DESCRIPTION')
                };
                FB.ui(obj, function(event){
                    OC_ET.event("edfbc");
                    if(window.postedToFacebook){
                        self.onPostedToFacebook(event);
                    }
                        
                });
            },

            onPostedToFacebook: function(event){
                $('.share-in').fadeOut();
                $('.share-result').fadeIn();
            }

        });

        // Returns the View class
        return ShareTwitter;

    }

);