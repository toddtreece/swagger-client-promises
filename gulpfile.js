'use strict';

const gulp = require('gulp'),
      jshint = require('gulp-jshint');

gulp.task('lint', function() {

  var lint = jshint({
    "esnext": true,
    "curly": false,
    "eqeqeq": true,
    "immed": true,
    "latedef": "no",
    "newcap": false,
    "noarg": true,
    "sub": true,
    "undef": false,
    "unused": "var",
    "boss": true,
    "eqnull": true,
    "node": true,
    "-W086": true
  });

  return gulp.src([
    'index.js',
    'test/*.js'
  ]).pipe(lint).pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('default', ['lint']);
