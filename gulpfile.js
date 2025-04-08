const { src, dest, series, watch } = require('gulp'),
    htmlCompressor = require('gulp-htmlmin'),
    htmlValidator = require('gulp-html'),
    cssCompressor = require('gulp-csso');

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/`));
};

let validateHTML = () => {
    return src([`*.html`])
        .pipe(htmlValidator(undefined));
};

let compressCSS = () => {
    return src(`./styles/**/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressCSS = compressCSS;
