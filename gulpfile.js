var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');

gulp.task('lint', function(){
  gulp.src(['./bin/*','./models/*','./public/javascripts/*','./routes/*','./app.js'])
    .pipe(jshint({strict:false}))
    .pipe(jshint.reporter('default'));
});

gulp.task('connect', function() {
  connect.server({
    root: './app'
  });
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
});




// Default Task
gulp.task('default', ['connect', 'lint']);