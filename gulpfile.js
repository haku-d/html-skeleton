var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var watch = require('gulp-watch');

gulp.task('nunjucks', function () {
  return watch('src/**/*.nunjucks', { ignoreInitial: false }, function() {
    gulp.src('src/pages/**/*.+(html|nunjucks)')
      .pipe(nunjucksRender({
        path: 'src/templates',
        data: {
          asset_path: '.'
        },
        envOptions: {
          watch: true
        }
      }))
      .pipe(gulp.dest('dist'));
  });

});
