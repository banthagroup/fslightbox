var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

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


gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('src'));
});

gulp.task('default', ['serve']);

