/// <reference path="lib/jquery.d.ts" />
var test: string = 'hello world';
console.log(test);

var headerTitle = $('header');

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