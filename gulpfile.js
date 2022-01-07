//strictmodeでのjsファイルを実行
'use strict'
//moduleの追加
require('es6-promise').polyfill()
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const pug = require('gulp-pug')
const { series, task, src, dest, watch } = gulp

// in/output dir path
const cssSrcPath = './src/sass'
const cssDestPath = './css'
const jsSrcPath = './src/js'
const jsDestPath = './js'
const pugSrcPath = './src/pug'
const pugDestPath = './'

//taskの実行

task('sass', (done) => {
  console.log('-------sass開始-------')
  src(cssSrcPath + '/*.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
        compass: true,
      }).on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(dest(cssDestPath))
  done()
})
task('js', (done) => {
  console.log('-------js開始-------')
  src(jsSrcPath + '/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(dest(jsDestPath))
  done()
})
task('pug', (done) => {
  console.log('-------pug開始-------')
  src([`${pugSrcPath}/*.pug`, `!${pugSrcPath}/_*.pug`])
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest(pugDestPath))
  done()
})
task('watch', (done) => {
  console.log('watchの実行')
  watch(`${cssSrcPath}/*.scss`, task('sass'))
  watch(`${jsSrcPath}/*.js`, task('js'))
  watch(`${pugSrcPath}/*.pug`, task('pug'))
  done()
})
task('default', series('sass', 'js', 'pug'))
