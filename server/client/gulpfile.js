var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css')


var config = {
	clean: './app/*',
	build: {
		html: './app/',
		css: './app/css/',
		img: './app/img/',
		fonts: './app/fonts/'
	},
	src: {
		html: './src/**/*.html',
		css: './src/css/**/*.css',
		sass: './src/sass/**/*.sass',
		img: './src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	}
};

gulp.task('clean', function () {
    return gulp.src(config.clean, {read: false})
        .pipe(clean());
});

gulp.task('buildServer', function () {
	var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
	return gulp.src(path.resolve('./server/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./server')))
});

gulp.task('copyCss', function() {
	return gulp.src(path.resolve('./src/**/*.css'))
		.pipe(gulp.dest(path.resolve('./')));
});

gulp.task('buildSass', function () {
  return gulp.src('./src/sass/**/*.sass')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
	.pipe(cssmin())
	.pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build.css));
});

gulp.task('copyIndex', function() {
	return gulp.src(path.resolve('./src/*.html'))
		.pipe(gulp.dest(path.resolve('./app/')));
});
gulp.task('copyHtml', ['copyIndex'], function() {
	return gulp.src(path.resolve('./src/app/**/*.html'))
		.pipe(gulp.dest(path.resolve('./app/')));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['buildSass']);
});

gulp.task('buildCss', ['buildSass', 'copyCss']);

gulp.task('compile', function() {
	let tsProject = ts.createProject(path.resolve('./tsconfig.json'), {
    	typescript: require('typescript')
	});
	return gulp.src(path.resolve('./src/app/**/*.ts'))
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject))
		.js
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.resolve('./app')));
});

gulp.task('build', ['buildCss', 'copyHtml', 'compile']);

gulp.task('default', function(cb) {
	runSequence('clean', 
				'build', 
				cb);
});