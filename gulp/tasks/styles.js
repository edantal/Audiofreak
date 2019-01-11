var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var normalize = require('node-normalize-scss');

var displayError = function(error) {
  // Initial building up of the error
  var errorString = '[' + error.plugin.error.bold + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
    errorString += ' in ' + error.fileName;

  if(error.lineNumber)
    errorString += ' on line ' + error.lineNumber.bold;

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
};

var onError = function(err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Basso"
  })(err);
  this.emit('end');
};

var sassOptions = {
  includePaths: normalize.includePaths,
  outputStyle: 'expanded'
};

var prefixerOptions = {
  browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari >= 7', 'IE 8-11'],
  cascade: false
};

// STYLES TASK
gulp.task('styles', function() {
  return gulp.src('./app/assets/sass/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(prefixerOptions))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./app/css'));
    /*
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./app/css'));
    */
});

gulp.task('sass-lint', function() {
  gulp.src('./app/assets/sass/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});