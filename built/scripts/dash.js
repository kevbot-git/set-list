/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />
$(document).ready(function () {
    facebookManager = new FacebookManager({
        onLoad: function () {
            console.log('Loaded!');
            facebookManager.checkLoginState({
                loggedIn: function () { console.log('logged in'); },
                needsAuth: function () { console.log('needs auth'); },
                notLoggedIn: function () { console.log('not logged in'); }
            });
        }
    });
});
