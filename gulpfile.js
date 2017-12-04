var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('webserver', function(){
    connect.server({
        root: 'app'
    });
});

gulp.task('prepareCustomCss', function(){
   gulp.src(['./app/**/*.css', '!./app/dist/**/'])
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
       .pipe(minifyCss())
       .pipe(concat('app.css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('prepareCustomJs', function(){
    gulp.src(['./app/**/*.js', '!./app/dist/**/'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('prepareVendorCss', function(){
   gulp.src([
       "./node_modules/bootstrap/dist/css/bootstrap.min.css",
       "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
       "./node_modules/font-awesome/css/font-awesome.min.css"
   ])
       .pipe(concat('vendor.css'))
       .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('prepareVendorJs', function(){
    gulp.src([
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('copyFonts', function(){
    gulp.src('./node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./app/dist/fonts'));
});

gulp.task('watchCss', function(){
    gulp.watch(['./app/**/*.css', '!./app/dist/**/'], ['prepareCustomCss'])
});

gulp.task('watchJs', function(){
    gulp.watch(['./app/**/*.js', '!./app/dist/**/'], ['prepareCustomJs'])
});

gulp.task('watch', ['watchCss', 'watchJs']);

gulp.task('default', ['prepareVendorCss', 'prepareVendorJs', 'copyFonts', 'prepareCustomCss', 'prepareCustomJs',
    'webserver', 'watch']);