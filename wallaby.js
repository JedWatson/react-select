var babel = require('babel');

module.exports = function (wallaby) {
	
	return {

		files: ['src/*.js', 'testHelpers/*.js'],

		tests: ['test/*-test.js' ],

		env: {
			type: 'node',
			runner: 'node'
		},

		preprocessors: {
			'**/*.js': file => babel.transform(file.content, {sourceMap: true})
		}
	};
};
