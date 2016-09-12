/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

$(document).ready(function() {
    checkLoginState({
        loggedIn(){ console.log('logged in'); },
        needsAuth(){ console.log('needs auth'); },
        notLoggedIn(){ console.log('not logged in'); }
    });
});