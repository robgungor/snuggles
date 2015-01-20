// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/sharing.html",],

    function($, Backbone, Model, template){
        
        var Sharing = Backbone.View.extend({

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
           
           onEmailShareClick: function(e){
              console.log('on email shared');
           },

           shareFacebook: function(){
              console.log('share facebook');
           },

           shareTwitter: function(){
              console.log('shareTwitter');
           },

          shareEmail: function(){
            console.log('shareEmail');
          }

        });

        // Returns the View class
        return Sharing;

    }

);