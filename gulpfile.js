const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator = require(`gulp-html`),
    cssCompressor = require(`gulp-clean-css`),
    cssValidator = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

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
    return src(`styles/*.css`)
        .pipe(cssCompressor({
            compatibility: `ie8`,
            keepSpecialComments : 0,
            target: `Resources`,
            relativeTo: ``
        }))
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

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .on(`error`, (err) => {
            console.error(`Babel error:`, err);
        })
        .pipe(dest(`./temp/scripts`))
        .on(`end`, () => {
            console.log(`Transpilation complete. Files saved to ./temp/scripts`);
        });
};

let transpileJSForProd = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!prod/**`,
        `!prod`,
        `!README.md`,
        `!gulpfile.js`,
        `!package-lock.json`,
        `!package.json`,
        `!node_modules/`,
        `!node_modules/**`,
        `!scripts/**/*.js`,
        `!scripts/*.js`,
        `!scripts/.gitignore`,
        `!styles/`,
        `!styles/**/*`,
        `!*.html`,
        `!.babelrc`,
        `!.editorconfig`,
        `!.gitignore`,
        `!.stylelintrc.json`,
        `!.eslintrc`
    ], { dot: true })
        .pipe(dest(`prod`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: `default`,
        server: {
            baseDir: [
                `temp`,
                `./`
            ]
        }
    });

    watch(`scripts/*.js`, series(lintJS, transpileJS))
        .on(`change`, reload);

    watch(`styles/**/*.css`, lintCSS)
        .on(`change`, reload);

    watch(`*.html`, validateHTML)
        .on(`change`, reload);
};

async function clean() {
    const { deleteAsync } = await import(`del`);
    let fs = require(`fs`),
        foldersToDelete = [`./temp`, `prod`];

    for (let folder of foldersToDelete) {
        try {
            fs.accessSync(folder, fs.F_OK);
            process.stdout.write(`\n\tThe ${folder} directory was found and will be deleted.\n`);
        } catch (e) {
            process.stdout.write(`\n\tThe ${folder} directory does NOT exist or is NOT accessible.\n`);
            continue;
        }

        await deleteAsync(folder);
    }

    process.stdout.write(`\n`);
}



exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressCSS = compressCSS;
exports.lintCSS = lintCSS;
exports.transpileJS = transpileJS;
exports.transpileJSForProd = transpileJSForProd;
exports.lintJS = lintJS;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.serve = serve;
exports.clean = clean;
exports.build = series(
    clean,
    compressHTML,
    compressCSS,
    transpileJSForProd,
    copyUnprocessedAssetsForProd
);
exports.default = serve;
