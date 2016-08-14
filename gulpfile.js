var gulp = require('gulp');
var DEST = 'dist/';

gulp.task('doc', function (cb) {
	var jsdoc = require('gulp-jsdoc3');
	var config = require('./jsdoc.json');
    gulp.src(['README.md', './src/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('closure-compile', function () {
	var closureCompiler = require('gulp-closure-compiler');
    return gulp.src('src/*.js')
	    .pipe(closureCompiler({
	        compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
	        fileName: 'nutmeg.js',
	        compilerFlags: {
		        closure_entry_point: 'src/nutmeg.js',
		        compilation_level: 'SIMPLE_OPTIMIZATIONS',
		        define: [],
		        externs: [],
		        only_closure_dependencies: true,
		        // .call is super important, otherwise Closure Library will not work in strict mode. 
		        output_wrapper: '(function(){%output%}).call(window);',
		        warning_level: 'VERBOSE'
		    }
	    }))
	    .pipe(gulp.dest(DEST));
});

gulp.task('default', ['closure-compile']);
gulp.task('all', ['doc', 'closure-compile'])