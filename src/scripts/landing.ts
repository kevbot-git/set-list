/// <reference path="lib/jquery.d.ts" />
/// <reference path="lib/jqueryui.d.ts" />
/// <reference path="facebook.ts" />

var test: string = 'hello world';
console.log(test);

var headerTitle = $('header');

alert(APP_ID);

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

$('.login-link').click(function() {
    $('.login-container').effect('shake', {'distance': 5, 'times': 2});
    //checkLoginState();
});