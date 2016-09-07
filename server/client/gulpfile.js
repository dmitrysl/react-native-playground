var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');

gulp.task('buildServer', function () {
	var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
	return gulp.src(path.resolve('./server/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./server')))
});

gulp.task('copyCss', function() {
	return gulp.src(path.resolve('./src/css/**/*.css'))
		.pipe(gulp.dest(path.resolve('./app/css')));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('buildCss', ['sass', 'copyCss']);

gulp.task('buildClient', ['buildCss'], function () {
	var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
	return gulp.src(path.resolve('./src/app/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./app')))
});

gulp.task('default', ['buildClient']);