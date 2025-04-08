const { src, dest, series, watch } = require('gulp'),
    htmlCompressor = require('gulp-htmlmin'),
    htmlValidator = require('gulp-html'),
    cssCompressor = require('gulp-csso'),
    cssValidator = require('gulp-stylelint'),
    babel = require('gulp-babel'),
    jsCompressor = require('gulp-uglify');

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

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .on(`error`, (err) => {
            console.error(`Babel error:`, err);
        })
        .pipe(dest(`./temp/js`))
        .on(`end`, () => {
            console.log(`Transpilation complete. Files saved to ./temp/js`);
        });
};

let transpileJSForProd = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};


exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressCSS = compressCSS;
exports.lintCSS = lintCSS;
exports.transpileJS = transpileJS;
exports.transpileJSForProd = transpileJSForProd;
