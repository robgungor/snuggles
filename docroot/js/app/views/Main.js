// MainView.js
// -------
define(["jquery", "backbone", "models/Main", "text!templates/main.html", "text!templates/video-preview.html", "utils/OC_Utils", "utils/OC_MessageSaver", "views/Sharing", "jqueryui"],

    function($, Backbone, Model, template, previewTemplate, OC_Utils, OC_MessageSaver, Sharing){
        
        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "main",
            sharing: null,
            // View constructor
            initialize: function() {
                this.model.set({'selectedVideo':'nutshell'});
                this.sharing = new Sharing({model:this.model});
                this.loadNameList();             
            },

            loadNameList: function(){
                var self = this;

                self.render();

                var data = [{id:'Robert',value:'Robert'},
                {id:'Rubin',value:'Rubin'},
                {id:'Rambit',value:'Rambit'},
                {id:'Rogan',value:'Rogan'},
                {id:'Rick',value:'Rick'}];                
                    
                    self.render();

                    $( "#vname" ).autocomplete({
                      source: data,
                      minLength: 0,
                      select: function( event, ui ) {
                        $('#vname').val(ui.item.value); 
                      }
                    });

                      return;

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

              'click .email': 'onEmailShareClick',
              'click .fb': 'onFbShareClick',
              'click .twitter': 'onTwitterShareClick',

              //'click .bubble':'onVideoSelectClick',              
              'mousedown .bubble':'onVideoSelectClick',   

              'orientationchange':'onOrientationChange'
            },            


            // Renders the view's template to the UI
            render: function() {
                
                // Setting the view's template using the template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                $('#video-preview').append(_.template(previewTemplate, this.model.toJSON()));

                // first time, show this
                $('.poster-image').css({opacity:1});
                $('#video-loading-spinner').hide();
                return this;
            },
            // on click of a thumbnail
            onVideoPreviewClick: function(e) {
                // prevent default actions
                e.preventDefault();

                // play video 
                this.playVideo();
            },

            // play video
            playVideo: function($parent) {                
                var self = this;

                // show loading state
                $('#video-loading-spinner').show();

                // we do this so we don't reference an old video that is still hanging
                $parent = $parent || self.$el;                
                // show the container of the player
                $parent.find("#video-container").addClass('active');
                
                var $video = $($parent.find("video#video-player").get(0));
                // on pause of video
                $video.on('pause', function(){self.onVideoPaused();});                
                // on end of video
                $video.on('ended', function(){self.onVideoEnded();});

                $video.on('playing', function(){
                   // hide loading state
                  $('#video-loading-spinner').fadeOut();
                });

                // play the video
                $video.get(0).play();
            },
            
            onVideoPaused: function(){              
                var video = $('.'+this.model.get('selectedVideo')).find("video#video-player").get(0);                
                // if we aren't in full screen, assume the video is ended... 
                if (!video.webkitDisplayingFullscreen) this.onVideoEnded(); 
            },

            onVideoEnded: function(){
              // show poster image/thumbnail
              $('.poster-image').css({opacity:1});
              $("#video-container").removeClass('active');
            },
            
            onVideoSelectClick: function(e) {
                e.preventDefault();
                $(document.body).addClass('postloaded');

                var self = this,
                    $currentVid = $($('.video-wrapper')[0]),
                    vidName = $(e.currentTarget).attr('data-video-name');

                // pause current video
                $("#video-player")[0].pause();
                // set the selected video name to the model
                this.model.set({'selectedVideo':vidName});
                // render the new video
                $('#video-preview').append(_.template(previewTemplate, this.model.toJSON()));
                
                var $nextVidWrap = $('.video-wrapper.'+vidName);        

                self.playVideo($nextVidWrap);   
                
                // wait for it to play, remove the previous
                $nextVidWrap.find('#video-player').on('playing', function(){$currentVid.remove();});

                // update video selection nav
                self.updateSelectedButton();
                     
            },

            updateSelectedButton: function(){
              var self = this;

              // deselect previous button
              $('#message-selection button.selected').removeClass('selected');
              // select current button
              $('button[data-video-name='+self.model.get('selectedVideo')+']').addClass('selected');
            },

            onEmailShareClick: function(e){              
              var self = this;              
              self.sharing.shareEmail();
            },

            onFbShareClick: function(e){
              var self = this;
              self.sharing.shareFacebook();
            },

            onTwitterShareClick: function(e){
              var self = this;        
              self.sharing.shareTwitter();
            },

            


        });

        // Returns the View class
        return View;

    }

);