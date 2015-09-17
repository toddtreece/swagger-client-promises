'use strict';

const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      mocha = require('gulp-mocha');

gulp.task('lint', function() {

  const lint = jshint({
    "esnext": true,
    "curly": false,
    "eqeqeq": true,
    "immed": true,
    "latedef": "no",
    "newcap": false,
    "noarg": true,
    "sub": true,
    "undef": true,
    "unused": "var",
    "boss": true,
    "eqnull": true,
    "node": true,
    "-W086": true
  });

  return gulp.src([
    'index.js'
  ]).pipe(lint).pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('test', function() {

  return gulp.src('test/*.js', {read: false})
    .pipe(mocha())
    .once('error', function(err) {
      console.error(err.toString());
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });

});

gulp.task('default', ['lint', 'test']);
