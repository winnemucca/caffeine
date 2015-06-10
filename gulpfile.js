var gulp = require('gulp'),
    connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

gulp.task('lint', function(){
  gulp.src(['./bin/*','./models/*','./public/javascripts/*','./routes/*','./app.js'])
    .pipe(jshint({strict:false}))
    .pipe(jshint.reporter('default'));
});

// gulp.task('connect', function() {
//   connect.server({
//     root: './app'
//   });
// });

gulp.task('start', function () {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

// Default Task
gulp.task('default', ['start', 'lint']);