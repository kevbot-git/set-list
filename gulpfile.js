var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('built/styles')
        .pipe(browserSync.stream()));
});

gulp.task('typescript', function () {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true//,
            //out: 'output.js'
        }))
        .pipe(gulp.dest('built/scripts'));
});

gulp.task('javascript', ['typescript'], function () {
    return gulp.src('built/scripts/**/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(browserSync.stream());
});

gulp.task('scripts', ['javascript']); // Add other script operations

gulp.task('html', ['styles', 'scripts'], function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('built'));
});

gulp.task('update', ['html']);

gulp.task('serve', ['update'], function() {

    browserSync.init({
        server: "./built"
    });

    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['update']);