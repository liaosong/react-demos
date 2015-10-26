import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import browserify from 'gulp-browserify';
import babelify from 'babelify';

const PATHS = {
  js: 'src/*/*.js',
  html: 'src/*/*.html',
  dist: 'examples',
  libjs: [
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js'
  ],
  libjs_dist: 'examples/lib',
};

gulp.task('copy', function(){
  gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.dist));

  gulp.src(PATHS.libjs)
  .pipe(gulp.dest(PATHS.libjs_dist));
});

gulp.task('compile-js', function(){
  return gulp.src(PATHS.js)
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
      extensions: ['.jsx'],
      transform: ['babelify']
    }))
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('watch', function(e){
  gulp.watch(PATHS.js, ['compile-js']);
  gulp.watch(PATHS.html, ['copy']);
});

gulp.task('default', [
  'copy',
  'compile-js',
  'watch'
]);