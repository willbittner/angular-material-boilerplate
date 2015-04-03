var gulp = require( 'gulp' );
var sass = require( 'gulp-ruby-sass' );
var browserSync = require( 'browser-sync' );
var rename = require( 'gulp-rename' );
var merge = require( 'merge-stream' );
var mainBowerFiles = require( 'main-bower-files' );
var reload = browserSync.reload;
var LIVERELOAD_PORT = 35729;
var less = require( 'gulp-less' );
var livereload = require( 'gulp-livereload' );
gulp.task( 'build', function () {
	gulp.src( 'src/less/*.less' ).pipe( less() ).pipe( gulp.dest( 'src/css' ) ).pipe( livereload() );
	gulp.src( 'src/css/**/*.css' ).pipe( gulp.dest( 'dist/css' ) ).pipe( livereload() );
	gulp.src( 'src/**/*.html' ).pipe( gulp.dest( 'dist/' ) ).pipe( livereload() );
	gulp.src( 'src/scripts/**/*.js' ).pipe( gulp.dest( 'dist/scripts' ) ).pipe( livereload() );
	sass( 'src/scss/styles.scss' ).pipe( gulp.dest( 'dist/css' ) ).pipe( livereload() );
} );
// watch files for changes and reload
gulp.task( "bower-files", function () {
	gulp.src( mainBowerFiles() ).pipe( gulp.dest( "dist/lib" ) );
} );
gulp.task( 'default', [ 'bower-files', 'build' ], function () {
	browserSync( {
		server: {
			baseDir: 'dist'
		}
	} );
	gulp.watch( 'src/scss/*.scss', [ 'build' ] );
	gulp.watch( 'src/less/*.less', [ 'build' ] );
	gulp.watch( [ 'src/*.html', 'src/**/*.js' ], [ 'build' ] );
	livereload.listen( LIVERELOAD_PORT );
} );
