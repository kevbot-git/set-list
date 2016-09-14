/// <reference path="lib/fbsdk.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var APP_ID = '159095714518707';
var facebookManager;
$(document).ready(function () {
    facebookManager = new FacebookManager();
});
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var FacebookManager = (function () {
    function FacebookManager() {
        console.log('Initializing FacebookManager');
        this.init();
    }
    FacebookManager.prototype.init = function () {
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
    };
    FacebookManager.prototype.checkLoginState = function (callback) {
        console.log('checking facebook login status...');
        this.sdk.getLoginStatus(function (response) {
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
    };
    return FacebookManager;
}());
var FacebookError = (function (_super) {
    __extends(FacebookError, _super);
    function FacebookError() {
        _super.call(this, 'Could not connect.');
        this.name = 'FacebookError';
    }
    return FacebookError;
}(Error));
