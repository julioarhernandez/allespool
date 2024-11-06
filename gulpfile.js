const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');

// Load site configuration
function getSiteData() {
    return JSON.parse(fs.readFileSync('./src/data/site-config.json'));
}

// HTML task
function html() {
    return gulp.src('src/templates/*.njk')
        .pipe(data(getSiteData))
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('dist'));
}

// Watch files
function watchFiles() {
    gulp.watch('src/templates/**/*.njk', html);
    gulp.watch('src/data/*.json', html);
}

exports.build = html;
exports.watch = watchFiles;
exports.default = gulp.series(html, watchFiles); 