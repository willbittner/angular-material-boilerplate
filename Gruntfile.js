// Generated on 2015-03-31 using
// generator-webapp 0.5.1
( function () {
	"use strict";
	// this function is strict...
}() );
var watchFiles = {
	clientJS: 'src/js/*.js',
	clientViews: 'public/index.html',
	clientCSS: 'src/**/*.css'
};
module.exports = function ( grunt ) {
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		watch: {
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: [ 'jshint' ],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: [ 'csslint' ],
				options: {
					livereload: true
				}
			}
		},
		wiredep: {
			task: {
				src: [ watchFiles.clientJS, watchFiles.clientViews, watchFiles.clientCSS ]
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat( watchFiles.serverJS ),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': watchFiles.clientCSS
				}
			},
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': watchFiles.clientJS
				}
			}
		},
		concurrent: {
			default: [ 'express', 'watch', 'open' ],
			debug: [ 'express', 'watch', 'open' ],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: [ 'public' ], // Replace with the directory you want the files served from
					// Make sure you don't use `.` or `..` in the path as Express
					// is likely to return 403 Forbidden responses if you do
					// http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
					livereload: true
				}
			}
		},
		// grunt-watch will monitor the projects files
		// grunt-open will open your browser at the project's URL
		open: {
			all: {
				// Gets the port from the connect configuration
				path: 'http://localhost:<%= express.all.options.port%>'
			}
		}
		// Creates the `server` task
	} );
	require( 'load-grunt-tasks' )( grunt );
	// Making grunt default to force in order not to break the project.
	grunt.option( 'force', true );
	// A Task for loading the configuration object
	// grunt.task.registerTask( 'loadConfig', 'Task that loads the config into a grunt option.', function () {
	// 	var init = require( './config/init' )();
	// 	var config = require( './config/config' );
	// 	grunt.config.set( 'applicationJavaScriptFiles', config.assets.js );
	// 	grunt.config.set( 'applicationCSSFiles', config.assets.css );
	// } );
	// Default task(s).
	grunt.registerTask( 'default', [ 'lint', 'concurrent:default' ] );
	// Debug task.
	grunt.registerTask( 'debug', [ 'lint', 'concurrent:debug' ] );
	// Secure task(s).
	grunt.registerTask( 'secure', [ 'env:secure', 'lint', 'concurrent:default' ] );
	// Lint task(s).
	grunt.registerTask( 'lint', [ 'jshint', 'csslint' ] );
	// Build task(s).
	grunt.registerTask( 'build', [ 'lint', 'ngAnnotate', 'uglify', 'cssmin', 'open' ] );
	// Test task.
	grunt.registerTask( 'test', [ 'env:test', 'mochaTest', 'karma:unit' ] );
};