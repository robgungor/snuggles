// LandingView.js
// -------
define(["jquery", "backbone", "models/App", "text!templates/sharing.html", 'views/ShareTwitter', 'views/ShareEmail', 'views/ShareFacebook', "utils/OC_Utils", "utils/OC_MessageSaver"],

    function($, Backbone, Model, template, ShareTwitter, ShareEmail, ShareFacebook, OC_Utils, OC_MessageSaver){
        
        var Sharing = Backbone.View.extend({

          // The DOM Element associated with this view
          //el: "sharing",
          twitterShare: null,
          emailShare: null,
          facebookShare: null,
          // View constructor
          initialize: function() {
              
              var self = this;

              self.twitterShare   = new ShareTwitter({model:self.model});
              self.emailShare     = new ShareEmail({model:self.model});
              self.facebookShare  = new ShareFacebook({model:self.model});
          },
            
          // View Event Handlers
          events: {           
          },            


          // Renders the view's template to the UI
          render: function() {
              
              // Setting the view's template using the template method
              this.template = _.template(template, {});

              // Dynamically updates the UI with the view's template
              this.$el.html(this.template);
            
              return this;
          },           
         
          shareFacebookInit: function(){
              var self = this;            
              // we'll go ahead and get the mID even though we won't use it yet
              //self.getMID();
             //self.facebookShare.start();
              self.getMID(self.facebookShare);
          },          
          
          shareTwitterInit: function(){
              var self = this;
              self.getMID(self.twitterShare);
          },
          
          shareEmailInit: function(){
              var self = this;
              self.getMID(self.emailShare);
          },
          
          getVideoLink: function(shareView){
              var self = this;
              var videoId = self.model.get('videoId');
              // videoLink has be

              var onGotVideoLink = function(link){
                if(shareView){
                  // we are sharing
                  self.getMID(shareView);
                }else{
                  // we are previewing
                  
                }
              }
              if( !OC_Utils.isUndefined(videoId) ) {
                onGotVideoLink(videoId);
              } else {

              }
          },

          getMID: function(shareView){
              var self = this;
              var mId = self.model.get('mId');              

              $('main').fadeOut();
              $('#main-loading-spinner').fadeIn(500);

              if( !OC_Utils.isUndefined(mId) ) {
                // if we have an mId, reuse it
                if(shareView) shareView.share.apply(shareView, [mId]);
              } else {
                  var onMessageSaveComplete = function(mId){
                    // set the mId to our model so it is not forgetten about                    
                    self.model.set({'mId': mId});  
                                    
                    // pass along to next step, use apply for scope and inheritance
                    if(shareView) shareView.share.apply(shareView, [mId]);
                  }
                  // save our message
                  OC_MessageSaver.saveMessage(self.model, {}, onMessageSaveComplete);
              }

          }

        });

        // Returns the View class
        return Sharing;

    }

);