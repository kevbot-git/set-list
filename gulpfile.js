var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('built/styles'));
        //.pipe(browserSync.stream()));
});

gulp.task('jslib', function() {
    return gulp.src('src/scripts/lib/**/*.js')
        .pipe(gulp.dest('built/scripts/lib'))
});

gulp.task('typescript', ['jslib'], function () {
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

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('built'));
});

gulp.task('update', ['sass', 'scripts', 'html']);

gulp.task('serve', ['update'], function() {

    browserSync.init({
        server: "./built"
    });

    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.ts', ['scripts']);
    gulp.watch('src/scripts/lib/**/*.js', ['jslib']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['update']);