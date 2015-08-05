/*
  This is the config file for the [Wallabyjs](http://wallabyjs.com) test runner
*/

var babel = require('babel');

module.exports = function (wallaby) { // eslint-disable-line no-unused-vars
	return {
		files: ['src/*.js', 'testHelpers/*.js'],
		tests: ['test/*-test.js' ],
		env: {
			type: 'node',
			runner: 'node'
		},
		preprocessors: {
			'**/*.js': file => babel.transform(file.content, { sourceMap: true })
		}
	};
};
