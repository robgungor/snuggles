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
                
                // Setting the view's template using the template method
                this.template = _.template(template, {shareMethod:'Facebook'});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);
              
                return this;
            },
            
            share: function(){
               
            },
            postToFacebook : function () {
                var obj = {
                    /*display: 'touch',*/
                    method: 'feed',
                    //link: this._fbPost.link,
                    link: "http://host-d.oddcast.com/fbrd.html?ocu=" +encodeURIComponent(this._fbPost.link),
                    picture: this._fbPost.picture, 
                    name: this._fbPost.name, 
                    caption: this._fbPost.caption, 
                    description: this._fbPost.description
                };
                FB.ui(obj, function(event){
                    OC_ET.event("edfbc");
                    if(window.postedToFacebook)
                        postedToFacebook(event);
                });
            },
            start: function(){

            }
           

        });

        // Returns the View class
        return ShareTwitter;

    }

);