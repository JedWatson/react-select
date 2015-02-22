var browserify = require('browserify'),
	shim = require('browserify-shim'),
	chalk = require('chalk'),
	del = require('del'),
	gulp = require('gulp'),
	to5 = require('gulp-6to5'),
	bump = require('gulp-bump'),
	connect = require('gulp-connect'),
	deploy = require("gulp-gh-pages"),
	git = require("gulp-git"),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	streamify = require('gulp-streamify'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	merge = require('merge-stream'),
	to5ify = require('6to5ify'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify');


/**
 * Constants
 */

var SRC_PATH = 'src';
var LIB_PATH = 'lib';
var DIST_PATH = 'dist';

var PACKAGE_FILE = 'Select.js';
var PACKAGE_NAME = 'react-select';
var COMPONENT_NAME = 'Select';

var DEPENDENCIES = [
	'react',
	'react-input-autosize',
	'underscore'
];

var EXAMPLE_SRC_PATH = 'examples/src';
var EXAMPLE_DIST_PATH = 'examples/dist';

var EXAMPLE_APP = 'app.js';
var EXAMPLE_LESS = 'example.less';
var EXAMPLE_FILES = [
	'.gitignore',
	'index.html',
	'standalone.html'
];


/**
 * Bundle helpers
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


/**
 * Prepare task for examples
 */

gulp.task('prepare:examples', function(done) {
	del([EXAMPLE_DIST_PATH], done);
});


/**
 * Build example files
 */

function buildExampleFiles() {
	return gulp.src(EXAMPLE_FILES.map(function(i) { return EXAMPLE_SRC_PATH + '/' + i }))
		.pipe(gulp.dest(EXAMPLE_DIST_PATH))
		.pipe(connect.reload());
}

gulp.task('dev:build:example:files', buildExampleFiles);
gulp.task('build:example:files', ['prepare:examples'], buildExampleFiles);


/**
 * Build example css from less
 */

function buildExampleCSS() {
	return gulp.src(EXAMPLE_SRC_PATH + '/' + EXAMPLE_LESS)
		.pipe(less())
		.pipe(gulp.dest(EXAMPLE_DIST_PATH))
		.pipe(connect.reload());
}

gulp.task('dev:build:example:styles', buildExampleCSS);
gulp.task('build:example:styles', ['prepare:examples'], buildExampleCSS);


/**
 * Build example scripts
 * 
 * Returns a gulp task with watchify when in development mode
 */

function buildExampleScripts(dev) {
	
	var dest = EXAMPLE_DIST_PATH;
	
	var opts = dev ? watchify.args : {};
	opts.debug = dev ? true : false;
	opts.hasExports = true;
	
	return function() {
		
		var common = browserify(opts)
				.transform(to5ify),
			bundle = browserify(opts)
				.require('./' + SRC_PATH + '/' + PACKAGE_FILE, { expose: PACKAGE_NAME })
				.transform(to5ify),
			example = browserify(opts)
				.exclude(PACKAGE_NAME)
				.add('./' + EXAMPLE_SRC_PATH + '/' + EXAMPLE_APP)
				.transform(to5ify),
			standalone = browserify('./' + SRC_PATH + '/' + PACKAGE_FILE, { standalone: COMPONENT_NAME })
				.transform(to5ify)
				.transform(shim);
		
		DEPENDENCIES.forEach(function(pkg) {
			common.require(pkg);
			bundle.exclude(pkg);
			example.exclude(pkg);
			standalone.exclude(pkg);
		});
		
		if (dev) {
			watchBundle(common, 'common.js', dest);
			watchBundle(bundle, 'bundle.js', dest);
			watchBundle(example, 'app.js', dest);
			watchBundle(standalone, 'standalone.js', dest);
		}
		
		return merge(
			doBundle(common, 'common.js', dest),
			doBundle(bundle, 'bundle.js', dest),
			doBundle(example, 'app.js', dest),
			doBundle(standalone, 'standalone.js', dest)
		);
		
	}

};

gulp.task('dev:build:example:scripts', buildExampleScripts(true));
gulp.task('build:example:scripts', ['prepare:examples'], buildExampleScripts());


/**
 * Build examples
 */

gulp.task('build:examples', [
	'build:example:files',
	'build:example:styles',
	'build:example:scripts'
]);

gulp.task('watch:examples', [
	'dev:build:example:files',
	'dev:build:example:styles',
	'dev:build:example:scripts'
], function() {
	gulp.watch(EXAMPLE_FILES.map(function(i) { return EXAMPLE_SRC_PATH + '/' + i }), ['dev:build:example:files']);
	gulp.watch([EXAMPLE_SRC_PATH + '/' + EXAMPLE_LESS], ['dev:build:example:styles']);
});


/**
 * Serve task for local development
 */

gulp.task('dev:server', function() {
	connect.server({
		root: EXAMPLE_DIST_PATH,
		port: 8000,
		livereload: true
	});
});


/**
 * Development task
 */

gulp.task('dev', [
	'dev:server',
	'watch:examples'
]);


/**
 * Build lib
 */

gulp.task('prepare:lib', function(done) {
	del([LIB_PATH], done);
});

gulp.task('build:lib', ['prepare:lib'], function(done) {
	return gulp.src(SRC_PATH + '/**/*.js')
		.pipe(to5())
		.pipe(gulp.dest(LIB_PATH));
});


/**
 * Build dist
 */

gulp.task('prepare:dist', function(done) {
	del([DIST_PATH], done);
});

gulp.task('build:styles', ['prepare:dist'], function() {
	return gulp.src('less/default.less')
		.pipe(less())
		.pipe(gulp.dest('dist'));
});

gulp.task('build:scripts', ['prepare:dist'], function() {
	
	var standalone = browserify('./' + SRC_PATH + '/' + PACKAGE_FILE, {
			standalone: COMPONENT_NAME
		})
		.transform(to5ify)
		.transform(shim);
	
	DEPENDENCIES.forEach(function(pkg) {
		standalone.exclude(pkg);
	});
	
	return standalone.bundle()
		.on('error', function(e) {
			gutil.log('Browserify Error', e);
		})
		.pipe(source(PACKAGE_NAME + '.js'))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(rename(PACKAGE_NAME + '.min.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(DIST_PATH));
	
});

gulp.task('build', [
	'build:styles',
	'build:scripts',
	'build:examples',
	'build:lib'
]);


/**
 * Version bump tasks
 */

function getBumpTask(type) {
	return function() {
		return gulp.src(['./package.json', './bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump', getBumpTask('patch'));
gulp.task('bump:minor', getBumpTask('minor'));
gulp.task('bump:major', getBumpTask('major'));


/**
 * Git tag task
 * (version *must* be bumped first)
 */

gulp.task('publish:tag', function(done) {
	var pkg = require('./package.json');
	var v = 'v' + pkg.version;
	var message = 'Release ' + v;

	git.tag(v, message, function (err) {
		if (err) throw err;
		git.push('origin', v, function (err) {
			if (err) throw err;
			done();
		});
	});
});


/**
 * npm publish task
 * (version *must* be bumped first)
 */

gulp.task('publish:npm', function(done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});


/**
 * Deploy tasks
 */

gulp.task('publish:examples', ['build:examples'], function() {
	return gulp.src(EXAMPLE_DIST_PATH + '/**/*').pipe(deploy());
});

gulp.task('release', ['publish:tag', 'publish:npm', 'publish:examples']);
