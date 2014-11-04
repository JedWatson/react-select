var del = require('del'),
	gulp = require('gulp'),
	connect = require('gulp-connect'),
	gutil = require('gulp-util'),
	less = require('gulp-less'),
	deploy = require("gulp-gh-pages"),
	browserify = require('browserify'),
	watchify = require('watchify'),
	reactify = require('reactify'),
	source = require('vinyl-source-stream'),
	merge = require('merge-stream'),
	chalk = require('chalk');

/**
 * Clean Everything
 */

gulp.task('clean', function(done) {
	del(['./examples/public/build'], done);
});

/**
 * Serve the examples
 */

gulp.task('serve', function() {
	connect.server({
		root: 'examples/public',
		port: 8000,
		livereload: true
	});
});

/**
 * Build Default theme from LESS
 */

gulp.task('less', function() {
	return gulp.src('less/default.less')
		.pipe(less())
		.pipe(gulp.dest('dist'));
});


/**
 * Build Examples
 */

function doBundle(target, name, dest) {
	return target.bundle()
		.on('error', function(e) {
			gutil.log('Browserify Error', e);
		})
		.pipe(source(name))
		.pipe(gulp.dest(dest))
		.pipe(connect.reload());
}

function watchBundle(target, name, dest) {
	return watchify(target)
		.on('update', function (scriptIds) {
			scriptIds = scriptIds
			.filter(function(i) { return i.substr(0,2) !== './' })
				.map(function(i) { return chalk.blue(i.replace(__dirname, '')) });
			if (scriptIds.length > 1) {
				gutil.log(scriptIds.length + ' Scripts updated:\n* ' + scriptIds.join('\n* ') + '\nrebuilding...');
			} else {
				gutil.log(scriptIds[0] + ' updated, rebuilding...');
			}
			doBundle(target, name, dest);
		})
		.on('time', function (time) {
			gutil.log(chalk.green(name + ' built in ' + (Math.round(time / 10) / 100) + 's'));
		});
}

function buildExamples(watch) {
	
	var opts = watch ? watchify.args : {};
	
	opts.debug = true;
	opts.hasExports = true;
	
	var dest = './examples/public/build';
	
	var common = browserify(opts)
		.require('react')
		.require('underscore');
	
	var select = browserify(opts)
		.exclude('react')
		.exclude('underscore')
		.require('./lib/Select.js', { expose: 'react-select' });

	var app = browserify(opts)
		.add('./examples/src/app.js')
		.exclude('react')
		.exclude('react-select')
		.transform(reactify);
	
	/*
	var standalone = browserify(opts)
		.exclude('react')
		.exclude('underscore')
		.add('./lib/Select.js', { expose: 'react-select' })
		.transform(reactify)
	*/
	
	if (watch) {
		watchBundle(app, 'app-bundle.js', dest);
		watchBundle(select, 'select-bundle.js', dest);
		// watchBundle(standalone, 'select-standalone.js', dest);
	}
	
	return merge(
		doBundle(common, 'global-bundle.js', dest),
		doBundle(select, 'select-bundle.js', dest),
		doBundle(app, 'app-bundle.js', dest)
		// doBundle(standalone, 'select-standalone.js', dest),
	);
	
}

gulp.task('build-example-css', function() {
	return gulp.src('examples/src/example.less')
		.pipe(less())
		.pipe(gulp.dest('./examples/public/build'))
		.pipe(connect.reload());
});

gulp.task('build-examples', ['build-example-css'], function() {
	return buildExamples();
});

gulp.task('watch-examples', ['build-example-css', 'serve'], function() {
	gulp.watch(['examples/src/example.less', 'less/**/*.less'], ['build-example-css']);
	return buildExamples(true);
});

gulp.task('build', function() {
	
	var dest = './dist';
	
	var select = browserify({
			hasExports: true
		})
		.exclude('react')
		.exclude('underscore')
		.require('./lib/Select.js', { expose: 'react-select' });
	
	return merge(
		doBundle(select, 'select.js', dest),
		gulp.src('less/default.less')
			.pipe(less())
			.pipe(gulp.dest(dest))
	);

});

gulp.task('deploy', ['build-examples'], function() {
	return gulp.src("examples/public/**/*")
		.pipe(deploy());
});


