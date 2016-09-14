/// <reference path="lib/fbsdk.d.ts" />

const APP_ID: string = '159095714518707';
var facebookManager: FacebookManager;

$(document).ready(function () {
    facebookManager = new FacebookManager();
});

(function (d: any, s: any, id: any) {
    var js: any, fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

class FacebookManager {
    private sdk: FBSDK;

    public constructor() {
        console.log('Initializing FacebookManager');
        this.init();
    }

    private init(): void {
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
            this.sdk = FB;
        });

    }

    public checkLoginState(callback: FbStatusResponse) {
        console.log('checking facebook login status...');
        this.sdk.getLoginStatus(function (response: any) {
            if (response.status === 'connected') {
                callback.loggedIn();
            } else if (response.status === 'not_authorized') {
                callback.needsAuth();
            } else {
                callback.notLoggedIn();
            }
        });
    }
}

class FacebookError extends Error {
    constructor() {
        super('Could not connect.');
        this.name = 'FacebookError';
    }
}

interface FbStatusResponse {
    loggedIn(): void;
    needsAuth(): void;
    notLoggedIn(): void;
}