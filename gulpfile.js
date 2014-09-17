var del = require('del'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	less = require('gulp-less'),
	deploy = require("gulp-gh-pages"),
	browserify = require('browserify'),
	shim = require('browserify-shim'),
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
		.pipe(gulp.dest(dest));
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
		.require('./lib/select.js', { expose: 'react-select' });
	
	/*
	var standalone = browserify(opts)
		.exclude('react')
		.exclude('underscore')
		.add('./lib/select.js', { expose: 'react-select' })
		.transform(reactify)
		.transform(shim)
	*/

	var app = browserify(opts)
		.add('./examples/src/app.js')
		.exclude('react')
		.exclude('react-select')
		.transform(reactify);
	
	var lessToCSS = gulp.src('examples/src/example.less')
		.pipe(less())
		.pipe(gulp.dest(dest));
	
	if (watch) {
		watchBundle(app, 'app-bundle.js', dest);
		watchBundle(select, 'select-bundle.js', dest);
		// watchBundle(standalone, 'select-standalone.js', dest);
		// TODO: Watch LESS
	}
	
	return merge(
		doBundle(common, 'global-bundle.js', dest),
		doBundle(select, 'select-bundle.js', dest),
		// doBundle(standalone, 'select-standalone.js', dest),
		doBundle(app, 'app-bundle.js', dest),
		lessToCSS
	);
	
}

gulp.task('build-examples', ['clean'], function() {
	return buildExamples();
});

gulp.task('watch-examples', ['clean'], function() {
	return buildExamples(true);
});

gulp.task('build', function() {
	
	var dest = './dist';
	
	var select = browserify({
			hasExports: true
		})
		.exclude('react')
		.exclude('underscore')
		.require('./lib/select.js', { expose: 'react-select' });
	
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


