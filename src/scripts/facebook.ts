/// <reference path="lib/fbsdk.d.ts" />

const APP_ID: string = '159095714518707';
var initialized: boolean = false;

console.log('test');

initFacebook();

function checkLoginState(): Object {
    console.log('Checking login state...');
    var r: Object;
    FB.getLoginStatus(function(response: Object) {
        r = response;
    });
    return r;
}

function initFacebook(): void {
    console.log('Initializing Facebook...');
    
    window.fbAsyncInit = function() {
        initialized = false;
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

(function (d: any, s: any, id: any) {
    var js: any, fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));