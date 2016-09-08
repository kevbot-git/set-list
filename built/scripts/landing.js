/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />
// document assumed to be loaded at this point
var test1 = 'Successssss';
var headerTitle = $('header');
$(window).on('scroll', function () {
    var y = window.pageYOffset;
    var threshold = headerTitle.position().top + 20;
    var cutoff = headerTitle.height() + threshold - 40;
    if (y <= threshold) {
        headerTitle.css('opacity', 1);
    }
    else if (y <= cutoff) {
        headerTitle.css('opacity', (cutoff - (y - threshold)) / cutoff);
    }
    else {
        headerTitle.css('opacity', 0);
    }
});
$('.login-link').click(function () {
    $('.login-container').effect('shake', { 'distance': 5, 'times': 2 });
    //checkLoginState();
});
