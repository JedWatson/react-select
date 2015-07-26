/*
  This is the config file for the [Wallabyjs](http://wallabyjs.com) test runner
*/

var babel = require('babel');

module.exports = function (wallaby) {
	return {
		files: ['src/*.js', 'testHelpers/*.js'],
		tests: ['test/*-test.js' ],
		env: {
			type: 'node'
		},
		preprocessors: {
			'**/*.js': file => babel.transform(file.content, {sourceMap: true})
		}
	};
};
