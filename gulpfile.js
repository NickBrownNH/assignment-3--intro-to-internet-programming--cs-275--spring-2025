const { src, dest, series, watch } = require('gulp'),
    htmlCompressor = require('gulp-htmlmin'),
    htmlValidator = require('gulp-html');

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/`));
};

let validateHTML = () => {
    return src([`*.html`])
        .pipe(htmlValidator(undefined));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
