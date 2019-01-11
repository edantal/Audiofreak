var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

// WATCH TASK
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/*.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/sass/**/*.scss', function() {
    gulp.start('cssInject');
  });

  watch('./app/assets/js/**/*.js', function() {
    gulp.start('jsInject');
  });
});

// CSS INJECT
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/css/style.css')
    .pipe(browserSync.stream());
});

// SCRIPTS INJECT
gulp.task('jsInject', ['scripts'], function() {
  browserSync.reload();
});