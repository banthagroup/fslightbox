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


/* ******** */
/* CSS Task */
/* ******** */
const sassTask = () => {
    return gulp.src('src/scss/FsLightbox.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
}

const buildCSSTask = () => {
    return  gulp.src('src/scss/FsLightbox.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('fslightbox.min.css'))
        .pipe(gulp.dest('build'));
}

const cloneCSSTask = () => {
    return gulp.src('src/scss/FsLightbox.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('fslightbox.css'))
        .pipe(gulp.dest('build'));
}

/* ******* */
/* JS Task */
/* ******* */
const buildJSTask = () => {
    return gulp.src('src/app.js')
        .pipe(uglifyES())
         .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('fslightbox.min.js'))
        .pipe(gulp.dest('build'));
}

const cloneJSTask = () => {
    return gulp.src('src/app.js')
        .pipe(rename('fslightbox.js'))
        .pipe(gulp.dest('build'));
}

const jsTask = () => {
    return browserify({
        entries: [
            'src/js/index.js',
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
    .pipe(gulp.dest('src'));
}

/* *********** */
/* Server Task */
/* *********** */
const reload = (done) => {
    browserSync.reload();
    done();
}

const start = () => {
    browserSync({
        server: 'src'
    });
    
    gulp.watch("src/scss/**/*.scss", sassTask);
    gulp.watch('src/js/**/*.js', gulp.series([jsTask, reload]));
    gulp.watch('src/*.html', reload);
}


/* ********* */
/* GULP Task */
/* ********* */
// Default task : use it using `$ gulp`
gulp.task('default', gulp.series([start], done => {
    done();
}))

// Build task : use it using `$ gulp build`
gulp.task('build', gulp.series([buildCSSTask, buildJSTask, cloneCSSTask, cloneJSTask], done => {
    done();
}));