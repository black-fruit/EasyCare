const gulp  = require('gulp');
const gulpSequence = require('gulp-sequence');
const terser = require('gulp-terser');
const rename = require("gulp-rename");
const del = require('del');

gulp.task('compress:src', () => {
  return gulp.src(['src/base/*.js', 'src/components/**/*.js', 'src/tools/*.js', 'src/windows/*.js'], { base: './src' })
    .pipe(terser({
      keep_classnames: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress:entry', () => {
  return gulp.src(['./main.src.js'], { base: './' })
    .pipe(terser({}))
    .pipe(rename(function (path) {
      path.dirname = ".";
      path.basename = "main";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('clean', async () => {
  await del(['main.src.js', 'src']);
});

gulp.task('default', (cb) => {
	gulpSequence(
    'compress:src',
    'compress:entry',
    'clean',
		cb
	)
});