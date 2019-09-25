import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const server = browserSync.create();

function buildCSS() {
    return (
        gulp.src('./src/scss/FsLightbox.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(rename('dist.min.css'))
            .pipe(gulp.dest('./src/css'))
    );
}

function serve(done) {
    server.init({ server: './' });
    done();
}

function watchFilesChanges(done) {
    gulp.watch("./src/**/*.js", gulp.series(reload));
    gulp.watch("./src/**/*.scss", gulp.series(reload));
    gulp.watch("./index.html", gulp.series(reload));
    done();
}

function reload(done) {
    server.reload();
    done();
}

const watch = gulp.series(serve, watchFilesChanges);
const production = gulp.series(buildCSS);

export { watch, production }

export default production;
