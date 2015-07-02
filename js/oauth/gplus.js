(function($) {

    $.gplus = {
        
        /**
         * var @string
         */
        afterSignIn: '',
        
        /**
         * var @string
         */
        afterDisconnect: '',
        
        parameters: {
            clientid:               "331226159896-c14jr3dlqdi68b9mnqa498g8nu1rophs.apps.googleusercontent.com",
            cookiepolicy:           "single_host_origin",
            requestvisibleactions:  "http://schemas.google.com/AddActivity",
            scope:                  "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
            immediate:              true
        },
        
        /**
         * Load script
         */
        load: function() {
            // Load the SDK for Google+
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/client:plusone.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();                       
        },
        
        /**
         * Initialize manually
         */
        initialize: function(action) {
            if(action !== undefined) {
                $.gplus.parameters.callback = '';
                $.gplus.parameters.callback = function(authResult){
                    $.gplus.onSignInCallback(authResult, action);
                };                            
                gapi.auth.signIn($.gplus.parameters);              
            }
        },
        
        /**
         * On load
         */
        onSignInCallback: function(authResult, action) {
            console.log('G+ onSignInCallback');
            var userIsLoggedInToASingleGplusAccount = (authResult.status.method === "AUTO" && authResult.num_sessions === 1), userFinishedInteractingWithGplusPopup = authResult.status.method === "PROMPT", userIsLoggedInAndHasAuthorizedOurApp = authResult.status.signed_in;
            if (userIsLoggedInToASingleGplusAccount || userFinishedInteractingWithGplusPopup) {
                if (userIsLoggedInAndHasAuthorizedOurApp) {                    
                    if(action !== undefined && authResult.access_token) {                         
                        var callback = new Function(action+'()');
                        callback();
                    }                    
                }
            }                    
        },
                                
        /**
         * Calls the OAuth2 endpoint to disconnect the app for the user.
         */
        disconnect: function(action) {                         
            gapi.auth.authorize({client_id: $.gplus.parameters.clientid, scope: $.gplus.parameters.scope, immediate: true}, function(r){
                $.ajax({
                    type: 'GET',
                    url: 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token,
                    async: false,
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function(result) {
                        if(action !== undefined || action !== '') {
                            action(result);
                        }
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            });
        },
               
        /**
         * Gets the currently signed in user's profile data.
         */
        profile: function(result) { 
            var loaded = 1;
            gapi.client.load('plus', 'v1', function() {
                var request = gapi.client.plus.people.get({'userId': 'me'});
                request.execute(function(profile) {                                                              
                    if(loaded == 1) {
                        result(profile);
                    }
                    loaded++;                    
                });                
            });            
        },
        
        /**
         * Gets the age range.
         */
        age: function(result) { 
            var loaded = 1;
            gapi.client.load('plus', 'v1', function() {
                var request = gapi.client.plus.people.get({'userId': 'me'});
                request.execute(function(profile) {                                                              
                    if(loaded == 1) {
                        result(profile.ageRange);                        
                    }
                    loaded++;                    
                });                
            });            
        }
        
    };
    
    $.gplus.load();
    
})(jQuery);