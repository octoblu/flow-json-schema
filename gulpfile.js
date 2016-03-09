var gulp        = require('gulp');
var clean       = require('gulp-clean');
var jsonCombine = require('gulp-jsoncombine');
var connect     = require('gulp-connect');
var cors        = require('cors');

gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false
  }).pipe(clean());
});

gulp.task('build', function() {
  return gulp.src('./tool-schemas/**/*.json').pipe(jsonCombine('schema-registry.json', function(data) {
    return new Buffer(JSON.stringify(data, null, 2));
  })).pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  return gulp.watch(['./tool-schemas/**/*.json'], ['build']);
});

gulp.task('server', function() {
  return connect.server({
    root: ['dist'],
    port: process.env.PORT || 1337,
    middleware: function() {
      return [cors()];
    }
  });
});

gulp.task('default', ['clean', 'build', 'watch', 'server']);
