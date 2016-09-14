/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

// document assumed to be loaded at this point
var headerTitle = $('header');

$(document).ready(function() {
    facebookManager = new FacebookManager({
        onLoad() {
            console.log('Loaded!');
            facebookManager.checkLoginState({
                loggedIn(){ console.log('logged in'); },
                needsAuth(){ console.log('needs auth'); },
                notLoggedIn(){ console.log('not logged in'); }
            });
        }
    });
});

$(window).on('scroll', function() {
    var y: number = window.pageYOffset;
    var threshold: number = headerTitle.position().top + 20;
    var cutoff: number = headerTitle.height() + threshold  - 40;
    if(y <= threshold) {
        headerTitle.css('opacity', 1);
    } else if(y <= cutoff) {
        headerTitle.css('opacity', (cutoff - (y - threshold)) / cutoff);
    } else {
        headerTitle.css('opacity', 0);
    }
});

// $(window).on('load', function() {
//     console.log('facebookLoaded called');
//     $('.login-container').append('<p>Test</p>');
// });

$('.login-link').click(function() {
    $('.login-container').effect('shake', {'distance': 5, 'times': 2});
    //checkLoginState();
});