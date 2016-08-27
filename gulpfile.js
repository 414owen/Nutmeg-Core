var gulp = require('gulp');
var DEST = 'dist';
var rename = require("gulp-rename");

/*

gulp.task('doc', function (cb) {
	var jsdoc = require('gulp-jsdoc3');
	var config = require('./jsdoc.json');
    gulp.src(['README.md', 'src/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

*/

gulp.task('closure-compiler', function() {
  var closureCompiler = require('gulp-closure-compiler');
  return gulp.src('src/nutmeg.js')
    .pipe(closureCompiler({
      compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
      fileName: 'nutmeg.closure.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify-compiler', function() {
	var uglify = require('gulp-uglify');
	gulp.src('src/*.js')
		.pipe(uglify({
            preserveComments:'some',
            maxLineLen: 80
        }))
		.pipe(rename('nutmeg.uglify.min.js'))
		.pipe(gulp.dest(DEST));
});

gulp.task('default', ['uglify-compiler', 'closure-compiler']);
