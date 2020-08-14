import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

function buildCSS() {
    return (
        gulp.src('./src/scss/index.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(rename('index.css'))
            .pipe(gulp.dest('./src/css'))
    );
}

const production = gulp.series(buildCSS);

export {
    production
}

export default production;
