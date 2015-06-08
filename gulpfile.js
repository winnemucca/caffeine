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

// Default Task
gulp.task('default', ['connect', 'lint']);