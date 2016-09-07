/// <reference path="lib/fbsdk.d.ts" />
var APP_ID = '159095714518707';
var initialized = false;
console.log('test');
initFacebook();
function checkLoginState() {
    console.log('Checking login state...');
    var r;
    FB.getLoginStatus(function (response) {
        r = response;
    });
    return r;
}
function initFacebook() {
    console.log('Initializing Facebook...');
    initialized = false;
    window.fbAsyncInit = function () {
        FB.init({
            appId: APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v2.7' // use graph api version 2.7
        });
        initialized = true;
    };
    console.log(initialized);
    console.log(checkLoginState());
}
