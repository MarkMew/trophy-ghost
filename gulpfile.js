'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');

gulp.task('sass', () => {
  return gulp.src('./dist/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./assets/css'));
});

gulp.task('browserify', () => {
  return browserify('./dist/js/app.js')
  .transform('babelify', {presets: ['env']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./assets/js'));
});

gulp.task('build', ['sass', 'browserify']);

gulp.task('watch', function() {
  gulp.watch('./dist/scss/**/*.scss', ['sass']);
  gulp.watch('./dist/js/**/*.js', ['browserify']);
});

gulp.task('default', ['build', 'watch']);
