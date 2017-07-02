
module.exports = function (html) {
	if (typeof document !== 'undefined') {
		return;
	}

	const JSDOM = require('jsdom').JSDOM;
	const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

	global.window = dom.window;
	global.document = dom.window.document;
	global.navigator = {
		userAgent: 'JSDOM'
	};
};
