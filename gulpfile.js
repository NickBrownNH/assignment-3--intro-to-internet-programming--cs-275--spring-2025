const { src, dest, series, watch } = require('gulp'),
    htmlCompressor = require('gulp-htmlmin'),
    htmlValidator = require('gulp-html'),
    cssCompressor = require('gulp-csso'),
    cssValidator = require('gulp-stylelint');

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

let lintCSS = () => {
    return src(`styles/**/*.css`)
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressCSS = compressCSS;
exports.lintCSS = lintCSS;
