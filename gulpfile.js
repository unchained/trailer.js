const gulp = require('gulp');
const babel = require('gulp-babel');

const babelConfig = {
  presets: ['env'],
  plugins: [
    ['transform-es2015-modules-umd', {
      globals: {
        Trailer: 'trailer',
      },
    }],
    ['rename-assigned-properties', {
      renames: {
        global: {
          trailer: 'Trailer',
        },
      },
      process: 'post',
    }],
  ],
};

function compile() {
  return gulp.src('src/trailer.js')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('dist'));
}

function watch(done) {
  gulp.watch('src/**/*.js').on('all', gulp.series(compile));
  done();
}

gulp.task('build', gulp.series(compile));
gulp.task('develop', gulp.series(compile, watch));
gulp.task('default', gulp.series('develop'));

