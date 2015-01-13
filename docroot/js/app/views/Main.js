// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/main.html", "jqueryui"],

    function($, Backbone, Model, template){
        
        var View = Backbone.View.extend({


            // The DOM Element associated with this view
            el: "main",

            // View constructor
            initialize: function() {
                console.log();

                // Calls the view's render method
                //this.render();  
                this.loadNameList();             
            },

            loadNameList: function(){
                var self = this;
                 $.ajax({
                  url: "xml/names.xml",
                  dataType: "xml",
                  success: function( xmlResponse ) {
                    var data = $( "name", xmlResponse ).map(function() {
                      return {
                        value: $( this ).text(),
                        id: $( this ).text()
                      };
                    }).get();
                    
                    self.render();

                    $( "#vname" ).autocomplete({
                      source: data,
                      minLength: 0,
                      select: function( event, ui ) {
                        $('#vname').val(ui.item.value); 
                      }
                    });
                  }
                });
            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {
                console.log("RENDERED");
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return View;

    }

);