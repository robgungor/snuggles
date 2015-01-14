// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/main.html", "text!templates/video-preview.html", "jqueryui"],

    function($, Backbone, Model, template, previewTemplate){
        
        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "main",

            // View constructor
            initialize: function() {
                this.model.set({'selectedVideo':'super-snuggle'});
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
              'click .poster-image': 'onVideoPreviewClick',
              'click .bubble':'onVideoSelectClick',              
            },

            // Renders the view's template to the UI
            render: function() {
                console.log("RENDERED");
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                $('#video-preview').html(_.template(previewTemplate, this.model.toJSON()));
                // Maintains chainability
                return this;
            },

            onVideoPreviewClick: function(e) {
                e.preventDefault();
                                
                $("#video-container").addClass('active');
                document.getElementById("video-player").play();
            },

            playVideo: function() {
                $("#video-container").addClass('active');
                document.getElementById("video-player").play();
            },

            onVideoSelectClick: function(e) {
                e.preventDefault();
                
                var self = this,
                    $currentVid = $($('.video-wrapper')[0]),
                    vidName = $(e.currentTarget).attr('data-video-name');

                this.model.set({'selectedVideo':vidName});
                
                $('#video-preview').append(_.template(previewTemplate, this.model.toJSON()));
                
                var $nextVid = $('.'+vidName);
                var $poster = $nextVid.find('img');         
                $poster.hide(0);
                
                var $img = $nextVid.find('img').on('load', function(){                  
                  $poster.fadeIn(400, function(){
                      $currentVid.remove();
                      self.playVideo();                     
                  });
                });
                
                $('#message-selection button.selected').removeClass('selected');
                
                $(e.currentTarget).addClass('selected');                
            }

        });

        // Returns the View class
        return View;

    }

);