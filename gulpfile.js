var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var watch = require('gulp-watch');

var NUNJUCK_DIR = './src/**/*.nunjucks';
var SASS_DIR = './src/assets/scss/**/*.scss';
var SASS_DIST_DIR = './dist/assets/css';
var IMG_DIR = './src/assets/img/**/*';
var JS_DIR = './src/assets/js/**/*';

gulp.task('nunjucks', function () {
  return watch(NUNJUCK_DIR, { ignoreInitial: false }, function() {
    gulp.src('src/pages/**/*.+(html|nunjucks)')
      .pipe(nunjucksRender({
        path: 'src/templates',
        data: {
          asset_path: '/assets'
        },
        envOptions: {
          watch: true
        }
      }))
      .pipe(gulp.dest('dist'));
  });
});


// gulp.task('nunjucks', function () {
//   return gulp.src('src/pages/**/*.+(html|nunjucks)')
//     .pipe(nunjucksRender({
//       path: 'src/templates',
//       data: {
//         asset_path: '.'
//       },
//       envOptions: {
//         watch: true
//       }
//     }))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('sass', function () {
  return gulp.src(SASS_DIR)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(SASS_DIST_DIR));
});
 
gulp.task('img', function() {
  return gulp.src(IMG_DIR)
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('js', function() {
  return gulp.src(JS_DIR)
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('watch', function() {
  gulp.watch(SASS_DIR, ['sass']);
  gulp.watch(IMG_DIR, ['img']);
  gulp.watch(JS_DIR, ['js']);
});

gulp.task('build', ['watch', 'sass', 'img', 'js', 'nunjucks']);