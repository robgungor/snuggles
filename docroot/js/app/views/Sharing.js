// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html", 'views/ShareTwitter', "utils/OC_Utils", "utils/OC_MessageSaver"],

    function($, Backbone, Model, template, ShareTwitter, OC_Utils, OC_MessageSaver){
        
        var Sharing = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: "sharing",
            twitterShare: null,

            // View constructor
            initialize: function() {
                
                var self = this;

                self.twitterShare = new ShareTwitter({model:self.model});

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
           
           onEmailShareClick: function(e){
              console.log('on email shared');
           },

           shareFacebook: function(){
              console.log('share facebook');
              var self = this;
              //self.getMID( self.fbShare.share );
           },

           shareTwitter: function(){     
           
              var self = this;
              self.getMID( function(){self.twitterShare.share();} );
           },

          shareEmail: function(){
            console.log('shareEmail');
            // for email we always will generate a new mId
          },

          getMID: function(callback){
              var self = this;
              var mId = self.model.get('mId');
              
              if( !OC_Utils.isUndefined(mId) ) {
                // if we have an mId, reuse it
                callback(mId);
              } else {
                  var onMessageSaveComplete = function(mId){
                    // set the mId to our model so it is not forgetten about                    
                    self.model.set({'mId': mId});                    
                    // pass along to next step
                    callback(mId);
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