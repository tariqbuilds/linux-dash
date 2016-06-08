var g             = require('gulp')
var del           = require('del')
var concat        = require('gulp-concat')
var uglify        = require('gulp-uglify')
var cssmin        = require('gulp-cssmin')
var gutil         = require('gulp-util')
var ngAnnotate    = require('gulp-ng-annotate')
var templateCache = require('gulp-angular-templatecache')

/**
 * concat all js
 * minify concated js
 * cache angular templates
 * ==> linuxDash.min.js
 *
 * css minified
 * ===> linuxDash.min.css
 */

g.task('delete-existing-js-dist', function () {
  return del([ 'app/linuxDash.min.js' ])
})

g.task('generate-template-cache', function () {
  return g.src('src/**/*.html')
    .pipe(templateCache('templates.js', {
        module: 'linuxDash',
        standAlone: false,
        root: 'src/'
      }))
    .pipe(g.dest('temp/'))
})

g.task('generate-js-dist', [
  'delete-existing-js-dist',
  'generate-template-cache'
  ],
  function () {
    return g.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/smoothie/smoothie.js',
      'src/js/**/*.js',
      'temp/templates.js'
    ])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(concat('linuxDash.min.js'))
    .pipe(g.dest('app/'))
})

g.task('generate-css-dist', function () {
  return g.src([ 'src/main.css' ])
    .pipe(cssmin())
    .pipe(concat('linuxDash.min.css'))
    .pipe(g.dest('app/'))
})

g.task('build', [
  'generate-js-dist',
  'generate-css-dist'
])
