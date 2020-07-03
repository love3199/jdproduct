//导入
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');

//创建任务
function fnCSS(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}
//js
function fnJS(){
    return gulp.src('./src/es6/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}
//img
function fnImg(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
//page
function fnHTML(){
    return gulp.src('./src/page/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
//转存
function fnCopy(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}
//监听
function fnWatch(){
    gulp.watch('./src/sass/*.scss',fnCSS);
    gulp.watch('./src/es6/*.js',fnJS);
    gulp.watch('./src/img/*',fnImg);
    gulp.watch('./src/page/*.html',fnHTML);
    gulp.watch('./src/index.html',fnCopy);
}
//三、导出模块
exports.css = fnCSS;
exports.js = fnJS;
exports.img = fnImg;
exports.html = fnHTML;
exports.copyIndex = fnCopy;
exports.default = fnWatch;