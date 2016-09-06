/// <reference path="lib/fbsdk.d.ts" />
var APP_ID = '159095714518707';
window.fbAsyncInit = function () {
    FB.init({
        appId: APP_ID,
        cookie: true,
        // the session
        xfbml: true,
        version: 'v2.7' // use graph api version 2.5
    });
};
