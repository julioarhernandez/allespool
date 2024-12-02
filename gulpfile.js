const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');
const browserSync = require('browser-sync').create();

// Load site configuration
function getSiteData() {
    return JSON.parse(fs.readFileSync('./src/data/site-config.json'));
}

// Browser Sync
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 3000,
        open: true,
        notify: false
    });
    done();
}

// Browser Sync Reload
function browserSyncReload(done) {
    browserSync.reload();
    done();
}

// HTML task
function html() {
    return gulp.src('src/templates/*.njk')
        .pipe(data(getSiteData))
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// Copy assets
function assets() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch('src/templates/**/*.njk', html);
    gulp.watch('src/data/*.json', html);
    gulp.watch('src/assets/**/*', assets);
}

exports.build = gulp.parallel(html, assets);
exports.serve = gulp.series(
    gulp.parallel(html, assets),
    browserSyncInit,
    watchFiles
);
exports.default = exports.serve; 