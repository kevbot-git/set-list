/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

declare var facebookManager: FacebookManager;

$(document).ready(function() {
    facebookManager = new FacebookManager({
        onLoad() {
            console.log('Loaded!');
            facebookManager.checkLoginState({
                loggedIn(){ console.log('logged in'); },
                needsAuth(){ console.log('needs auth'); },
                notLoggedIn(){ console.log('not logged in'); }
            });
        }
    });
});