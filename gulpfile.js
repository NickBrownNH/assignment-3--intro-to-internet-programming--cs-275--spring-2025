const { src, dest, series, watch } = require('gulp'),
    htmlCompressor = require('gulp-htmlmin');

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/`));
};

exports.compressHTML = compressHTML;
