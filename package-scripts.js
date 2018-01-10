const npsUtils = require('nps-utils');
const path = require('path');
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const concurrent = npsUtils.concurrent;

module.exports = {
	scripts: {
		build: {
			description: 'clean dist directory and run all builds',
			default: series(
				rimraf('dist'),
				rimraf('lib'),
				concurrent.nps('build.rollup', 'build.babel')
			),
			rollup: 'rollup --config',
			babel: 'babel src -d lib',
		},
		publish: {
			default: series(
				rimraf('examples/dist'),
				'webpack --progress -p',
				'cp examples/src/.gitignore examples/dist/.gitignore',
				'gh-pages -d examples/dist'
			),
		},
	},
};
