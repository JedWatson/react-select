'use strict';

var ReactTools = require('react-tools');

exports.process = function(src) {
	return ReactTools.transform(src);
};
