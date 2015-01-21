// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html", 'views/ShareTwitter'],

    function($, Backbone, Model, template, ShareTwitter){
        
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
           },

           shareTwitter: function(){              
              this.twitterShare.share();
           },

          shareEmail: function(){
            console.log('shareEmail');
          }

        });

        // Returns the View class
        return Sharing;

    }

);