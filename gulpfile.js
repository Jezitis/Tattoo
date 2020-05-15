const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

const jsFiles = [
	'./src/js/libs/*.js',
	'./src/js/main.js',
]

function styles() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./build/css/'))
}

function scripts() {
	return gulp.src(jsFiles)
		.pipe(concat('all.js'))
		.pipe(terser())
		.pipe(gulp.dest('./build/js'))
}

function watch() {
	gulp.watch('./src/scss/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
}

function clean() {
	return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('default', gulp.series(clean, gulp.parallel(styles, scripts), 'watch'))
