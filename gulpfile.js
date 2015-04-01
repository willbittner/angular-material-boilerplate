var gulp = require( 'gulp' );
var sass = require( 'gulp-ruby-sass' );
var browserSync = require( 'browser-sync' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var merge = require( 'merge-stream' );
var gulpBowerFiles = require( 'gulp-bower-files' );
var reload = browserSync.reload;
gulp.task( 'sass', function () {
	return sass( 'src/scss/styles.scss' ).pipe( gulp.dest( 'dist/css' ) ).pipe( reload( {
		stream: true
	} ) );
} );
gulp.task( 'build', function () {
	var htmlg = gulp.src( 'src/**/*.html' ).pipe( gulp.dest( 'dist' ) );
	var cssg = gulp.src( 'src/css/**/*.css' ).pipe( gulp.dest( 'dist/css' ) );
	// This will output the non-minified version
	var js = gulp.src( 'src/scripts/**/*.js' )
		// This will output the non-minified version
		.pipe( gulp.dest( 'dist/scripts' ) )
		// This will minify and rename to foo.min.js
		.pipe( uglify() ).pipe( rename( {
			extname: '.min.js'
		} ) ).pipe( gulp.dest( 'dist/scripts' ) );
	return merge( htmlg, cssg, js );
} );
// watch files for changes and reload
gulp.task( "bower-files", function () {
	gulpBowerFiles().pipe( gulp.dest( "dist/lib" ) );
} );
gulp.task( 'default', [ 'build', 'sass', 'bower-files' ], function () {
	browserSync( {
		server: {
			baseDir: 'dist'
		}
	} );
	gulp.watch( 'src/scss/*.scss', [ 'sass' ] );
	gulp.watch( [ 'src/*.html', 'src/css/**/*.css', 'scripts/**/*.js' ], {
		cwd: 'dist'
	}, reload );
} );