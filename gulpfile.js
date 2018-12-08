var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglifyES = require('gulp-uglify-es').default;
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('serve', function () {

    browserSync({
        server: 'src'
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch('src/js/**/*.js', ['reload', 'js']);
    gulp.watch('src/*.html', ['reload']);
});


gulp.task('sass', function () {
    return gulp.src('src/scss/root.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('build-css',function () {
   return  gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('fslightbox.min.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('clone-css', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('fslightbox.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-js', function f() {
     return gulp.src('src/app.js')
        .pipe(uglifyES())
         .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('fslightbox.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('clone-js', function () {
    return gulp.src('src/app.js')
        .pipe(rename('fslightbox.js'))
        .pipe(gulp.dest('build'));
});


gulp.task('js', function () {
    browserify({
        entries: [
            'src/js/index.js',
            'src/js/renderDOM.js',
            'src/js/loadSource.js',
            'src/js/appendSource.js',
            'src/js/changeSlideByDragging.js',
            'src/js/toolbar.js'
        ],
        debug: true
    })
        .bundle()
        .on('error', function(err){
            // print the error (can replace with gulp-util)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log(err.message);
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // end this stream
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('src'))
});

gulp.task('default', ['serve']);
gulp.task('build', ['build-css', 'build-js', 'clone-css', 'clone-js']);

