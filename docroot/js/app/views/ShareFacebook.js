// LandingView.js
// -------
define(["jquery", "backbone", "models/App", "text!templates/share-facebook.html", "text!templates/friend.html", 'collections/Friends'],

    function($, Backbone, Model, template, friendTemplate, Friends){
        
        var ShareTwitter = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: "sharing",

            // View constructor
            initialize: function() {   
                var self = this;  
                
                //facebook api loading in... 
                self.loadSDK();
                this.render();      
            },
            
            // View Event Handlers
            events: {
                'click #sharing-nav .email': 'onEmailShareClick',
                'click .friend':'onFriendClick',
                'click #move-right':'onRightClick',
                'click #move-left':'onLeftClick'
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
            
            renderFriends: function() {
                var col = 0, row = 0, index = -1, prevCol;
                var $colEl = $('<div class="col"></div>');

                _.each(this.model.get('friends'), function(friend) {                    
                   var f = _.template(friendTemplate, friend.toJSON());                   
                   index++;
                   row = index % 5;
                   col = Math.floor(index / 5);
                   
                   if(col > prevCol) $colEl = $('<div class="col"></div>');
                   
                   prevCol = col;
                   console.log("index: "+index+"; col: "+col+" ; row: "+row);
                   
                   // Dynamically updates the UI with the view's template
                   $colEl.append(f);
                   $('#friend-container').append($colEl);
                })

                $('#friend-container').css({'width':col*293});
            },

            share: function(mId){
                var self = this;
                          
                
                // if(self.model.get('FBId') != undefined){
                //     self.getFriendsInfo();
                // } else {
                //     self.login();
                // }

                $('#main-loading-spinner').fadeOut(300);
                $('#sharing').fadeIn();

                //self.getConnectState();
            },
            
            onFriendClick: function(e) {                
                var self = this;
                var friendID = $(e.currentTarget).attr('data-id');
                self.postToFacebook(friendID);
            },

            onGotFriendsInfo : function(result){
                var self = this;
                
                this.model.set({'friends':new Friends().set(result)});
                self.renderFriends();
            },

            onOKClick : function(e){
                e.preventDefault();
                this.postToFacebook();

                $('.share-in').fadeOut();
                $('.share-result').fadeIn();
            },

            onOKAfterClick : function(e){
                e.preventDefault();
               
                this.$el.fadeOut(200);
                $('main').fadeIn();
            },

            onLeftClick : function(e){
                console.log('onLeftClick');
                var pageW = ($('.col').width()+25) *3;
                var targX = Math.min($('#friend-container').position().left + pageW, 0);
                $('#friend-container').animate({ 'left' : targX}, 500);
            },

            onRightClick : function(e){
                
                var pageW = ($('.col').width()+25) *3;
                console.log('onRightClick: '+pageW);
                var targX = Math.max($('#friend-container').position().left - pageW, -($('#friend-container').width()-pageW));
                console.log('targX: '+targX);
                $('#friend-container').animate({ 'left' :  targX}, 500);
            },

            shiftThumbs : function( e ) {
        
                // e.preventDefault();

                // var $button    = $(this),
                //     direction  = $button.attr('data-direction'),
                //     $container = $('#thumb-container'),
                //     $wrap      = $('#thumb-wrap'),
                //     targX     = 0,
                //     pageW     = Math.ceil($wrap.width())+16,
                //     perPage    = 4;

                // // the first thumb on the last page, the total-the remainder of the total divided by the amount per page, -1 for zero indexing
                // var lastPageIndex = Theater.getCurrentModel().content_total-1 -(perPage- ((Theater.getCurrentModel().content_total-1)% perPage));
                
                // // set our thumb index to go to
                // Theater.thumbPageIndex = direction === 'right' ? Math.min(Theater.thumbPageIndex + perPage, lastPageIndex) : Math.max(Theater.thumbPageIndex - perPage, 0);

                // // find our target via the thumb position
                // targX = -$($('#thumb-container').find('.card')[Theater.thumbPageIndex]).position().left;

                // Theater.thumbsTargetX = Math.ceil(targX);

                // // on complete update the arrows
                // $container.animate({ 'left' : Theater.thumbsTargetX }, 500);

                // Theater.updateThumbNavArrows();
            },


            postToFacebook : function (friendID) {
                var self = this;
                var obj = {
                    /*display: 'touch',*/
                    method: 'feed',
                    //link: this._fbPost.link,
                    link: "http://host-d.oddcast.com/fbrd.html?ocu=" +encodeURIComponent(self.model.getMessageLink()),
                    picture: self.model.settings.get('FACEBOOK_POST_IMAGE_URL'), 
                    name: self.model.settings.get('FACEBOOK_POST_NAME'), 
                    caption: self.model.settings.get('FACEBOOK_POST_CAPTION'), 
                    description: self.model.settings.get('FACEBOOK_POST_DESCRIPTION'),
                    to: friendID
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
            },

            //facebook api loading in... 
            loadSDK: function() {
                var self = this;
                
                (function(d, debug){
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement('script'); js.id = id; js.async = true;
                    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js#xfbml=1&appId="+self.model.config.fbcAppKey;
                    ref.parentNode.insertBefore(js, ref);

                }(document, /*debug*/ false));

                window.fbAsyncInit = function() { 
                   self.getConnectState();
                };
            },

            /*
            Function: fbcGetConnectState

            This is the initialization function and the first function to call before making any other calls. If FB object is not initialied, it is initialized first then login status is sent to the callback function fbcSetConnectState
            */
            getConnectState: function () {
                var self = this;                                
                
                FB.Event.subscribe('auth.login', function(response) {                    
                    //if (response.status == "connected") {   
                    if (response.authResponse && response.authResponse.userID != undefined) {
                        self.onConnected(response.authResponse.userID, response);
                    } else {
                        self.onNotConnected();
                    }
                });
                      
                FB.Event.subscribe('auth.logout', function(response) {
                    //fbcAlert("auth.logout:" +fbcArrayToXML(response));
                    self.onNotConnected();
                });
                  
                  
                 FB.Event.subscribe('edge.create', function(response) {
                    if(response){
                        // fbcAlert(response);
                        // fbcCallFlash("fbcSetUserLiked", response);  
                    }
                  });
                  
                FB.getLoginStatus(function(response) {                   
                  if (response.status == "connected") {   
                    self.onConnected(response.authResponse.userID, response);
                  } else {  
                    self.onNotConnected();
                  }
                }); 
                 
            },

            /*
            Function: onConnected

            This function is called when the user logs in to facebook. The callback function fbcSetConnectState is called with the userId of the logged in user
            */
            onConnected: function (user_id, response) {
                var self = this;
                
                self.model.set({'FBuserId':user_id});
                if (user_id == null || user_id == undefined) {
                }
                else {
                    self.model.set({'FBAccessToken':response.authResponse.accessToken});
                    self.getFriendsInfo();
                }
            },
     
            /*
            Function: fbcOnNotConnected

            This function is called when the user logs out or is not already logged in to facebook. The callback function fbcSetConnectState is called with the userId of 0.
            */
            onNotConnected: function() {
                this.userId = 0;    
                console.log('onNotConnected'); 
                this.login();       
            },

            /*
            Function: login

            This function pops-up the login window for facebook. If the user is already loggeg in it pop-up first and then close automatically. 
            If the application is not installed it will prompt for "Request for Permission" dialog. The default permissions will be over written
            if fbcRequiredApplicationPermissions is defined. fbcRequiredApplicationPermissions can be set from application attributes.
            */
            login: function() {
                //http://developers.facebook.com/docs/authentication/permissions
                var self = this;
                var strPermissions = "";
                //User related permissions  
                //user_about_me is appended at the end
                strPermissions+= "user_activities, user_birthday, user_education_history, user_events, user_groups, user_hometown,";
                strPermissions+= "user_interests, user_likes, user_location, user_notes, user_photo_video_tags, user_photos,";
                strPermissions+= "user_relationships, user_relationship_details, user_religion_politics, user_status, user_videos, user_website, user_work_history, ";
                strPermissions+= "read_stream, ";
                //strDefaultPermissions+= "user_checkins, user_online_presence, ";
                //strDefaultPermissions+= "email, read_friendlists, read_insights, read_mailbox, read_requests, xmpp_login, ads_management, ";
                        
                //Friends related permissions
                strPermissions+= "friends_about_me, friends_activities, friends_birthday, friends_education_history, friends_events, friends_groups, friends_hometown, ";
                strPermissions+= "friends_interests, friends_likes, friends_location, friends_notes, friends_photo_video_tags, friends_photos, ";
                strPermissions+= "friends_relationships, friends_relationship_details, friends_religion_politics, friends_status, friends_videos, friends_website, friends_work_history, ";
                //strDefaultPermissions+= "friends_checkins, friends_online_presence, ";
                strPermissions+= "user_about_me, publish_actions";                 
                            
                               
                FB.login(function(response) {
                if (response.status == "connected") {     
                    self.onConnected(response.authResponse.userID, response);
                  } else {
                    self.onNotConnected();
                  }
                }, {scope:strPermissions});

            },
     
            /*
            Function: fbcLogout

            Logs out the user from facebook.

            */
            logout: function() {
                FB.logout(function(response){});
            },

            /*
            Function: fbcGetAccessToken

            The access_token to make external calls on behalf of the user is sent to fbcSetAccessToken. If the user is not logged in, null access token is passed.
            */
            getAccessToken: function() {
                //console.log(fbcAccessToken);
            },

            /*
            Function: fbcGetFriendsInfo

            The user information for the logged in user's friends are sent to fbcSetFriendsInfo.
            fields: uid, name, pic_square, pic_big, current_location, hometown_location, sex, meeting_sex, relationship_status

            Parameters:
                
                bIncludeYourSelf - Boolean flag to include the logged in user in the result list. A positive value should include logged in user.
                nNumberOfFriends - Max number of friends to include in the result.
                
            Returns:
                
            See Also:

                <fbcGetUserInfo>
                <fbcProcessFqlRequest>  
                <fbcCallFlash>
            */
            getFriendsInfo: function (bIncludeYourSelf, nNumberOfFriends) {
                var self = this;
                var strQueryLimit = '';
                if(nNumberOfFriends!=undefined)
                    strQueryLimit = ' LIMIT ' +nNumberOfFriends;
                    
                var strFQLfields = "";
                strFQLfields += "uid, name, pic_square, pic_big, current_location, hometown_location, sex, meeting_sex, relationship_status ";
                
                //var strFQL = 'SELECT uid, name, pic_square, pic_big, current_location, sex, meeting_sex FROM user WHERE ( uid IN ';
                var strFQL = 'SELECT ' +strFQLfields +' FROM user WHERE ( uid IN ';
                strFQL += ' ( SELECT uid2 FROM friend WHERE uid1=\'' +self.model.get('FBuserId') +'\' )';
             
                if (bIncludeYourSelf != undefined && bIncludeYourSelf == true) {
                    strFQL += ' OR uid=\'' + fbcUserId + '\'';
                }
                
                strFQL += ' ) '; //end of user id restrictions
             
                strFQL += ' AND strlen(pic_square)>7  ';
                strFQL += ' AND strpos(name, "\'")<0  ';
                
                strFQL += ' AND (strlen(current_location)<1 OR (';      
                strFQL += '     strpos(current_location.city, "\'")<0  ';   
                strFQL += ' AND strpos(current_location.state, "\'")<0  ';
                strFQL += ' AND strpos(current_location.country, "\'")<0  ';
                strFQL += ' AND strpos(current_location.zip, "\'")<0  )) '; 
                
                strFQL += ' ORDER BY name DESC ' +strQueryLimit;
                                
                self.processFqlRequest(strFQL, function(result){ self.onGotFriendsInfo(result); });
            },




            /*
            Function: fbcProcessFqlRequest

            A wrapper function to make an FQL request to the facebook server. The result of the query is converted to XML and then passed to the specified function.
            If the result is not valid then fbcERRORRESPONSE is passed.

            Parameters:

                strFQL - FQL query string
                strCallBackName - The function name of the flash object to pass the query result.
                
            Returns:
                
            See Also:

                <fbcArrayToXML> 
                <fbcCallFlash>
            */
            processFqlRequest: function (strFQL, callback) {
                
                FB.api(
                {
                  method: 'fql.query',
                  query: strFQL
                },
                    function(result) {

                        callback(result);
                    }
                );
            }
        });

        // Returns the View class
        return ShareTwitter;

    }

);