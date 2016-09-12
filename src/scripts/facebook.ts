/// <reference path="lib/fbsdk.d.ts" />

const APP_ID: string = '159095714518707';
var fbInitialized: boolean = false;

declare var test1: string;

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
            loggedIn() {},
            needsAuth() {
                console.log('needs auth');
            },
            notLoggedIn() {
                console.log('not logged in');
            }
        });
    });
});

function checkLoginState(callback: FbStatusResponse) {
    console.log('checking facebook login status...');
    FB.getLoginStatus(function (response: any) {
        if (response.status === 'connected') {
            callback.loggedIn();
        } else if (response.status === 'not_authorized') {
            callback.needsAuth();
        } else {
            callback.notLoggedIn();
        }
    });
}

(function (d: any, s: any, id: any) {
    var js: any, fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

interface FbStatusResponse {
    loggedIn(): void;
    needsAuth(): void;
    notLoggedIn(): void;
}

// $(window).load(function() {
//     console.log('progress');
// });