/// <reference path="lib/fbsdk.d.ts" />
var APP_ID = '159095714518707';
var fbInitialized = false;
$(document).ready(function () {
    $.ajaxSetup({ cache: true });
    console.log('Initializing Facebook...');
    $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v2.7' // use graph api version 2.7
        });
        console.log('Done.');
        console.log(test1);
        checkLoginState({
            needsAuth: function () {
                console.log('needs auth');
            },
            notLoggedIn: function () {
                console.log('not logged in');
            }
        });
    });
});
function checkLoginState(callback) {
    console.log('checking facebook login status...');
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            callback.loggedIn();
        }
        else if (response.status === 'not_authorized') {
            callback.needsAuth();
        }
        else {
            callback.notLoggedIn();
        }
    });
}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// $(window).load(function() {
//     console.log('progress');
// }); 
