/// <reference path="lib/fbsdk.d.ts" />

const APP_ID: string = '159095714518707';

window.fbAsyncInit = function() {
    FB.init({
        appId: APP_ID,
        cookie: true,  // enable cookies to allow the server to access 
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.7' // use graph api version 2.5
    });
};