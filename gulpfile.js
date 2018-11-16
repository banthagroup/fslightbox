var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');


gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('serve', function () {

    browserSync({
        server: 'src'
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch('src/js/**/*.js', ['reload']);
    gulp.watch('src/*.html', ['reload']);
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true}));
});

gulp.task('default', ['serve']);

