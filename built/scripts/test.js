/// <reference path="lib/jquery.d.ts" />
var test = 'hello world';
console.log(test);
var headerTitle = $('header');
$(window).on('scroll', function () {
    var y = window.pageYOffset;
    var threshold = headerTitle.position().top;
    var cutoff = headerTitle.height() + threshold + 50;
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
