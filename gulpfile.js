var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    qunit = require('gulp-qunit');

gulp.task('styles', function() {
    return gulp.src(['src/assets/styles/normalize.css', 'src/assets/styles/style.less'])
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/assets/styles/'));
});

gulp.task('scripts', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(browserify({insertGlobals : true}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('images', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('clean', function() {
    return gulp.src(['dist/assets/styles', 'dist/assets/scripts', 'dist/assets/graphics'], {read: false})
        .pipe(clean());
});

gulp.task('copy', function() {
    return gulp.src(['src/index.html', 'src/humans.txt', 'src/robots.txt', 'src/favicon.ico', 'src/crossdomain.xml', 'src/apple-touch-icon-precomposed.png'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-lib', function() {
    return gulp.src(['src/assets/libraries/**/*'])
        .pipe(gulp.dest('dist/assets/libraries/'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy-lib', 'copy');
});

gulp.task('connect', connect.server({
    root: ['dist'],
}));


gulp.task('watch', function() {
    gulp.watch('src/assets/styles/**/*.less', ['styles']);
    gulp.watch('src/assets/images/**/*', ['images']);
    gulp.watch('src/assets/scripts/**/*', ['scripts']);
    gulp.watch('src/assets/libraries/**/*', ['copy-lib']);
    gulp.watch('src/*', ['copy']);
});

gulp.task('dev', ['connect', 'watch']);
