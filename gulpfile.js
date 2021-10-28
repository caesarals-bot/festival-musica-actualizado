const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//image
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css( done) {
    
    //identificar el archivo .SCSS
    src('src/scss/**/*.scss')
        .pipe( plumber())
        .pipe( sass() )//Compilarlo
        .pipe( dest('build/css') )//Almacenarlo

    done();
}

function versionWebp(done) {
    
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones))
        .pipe( dest('build/img') )
    done()
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function dev(done) {
    
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, dev);