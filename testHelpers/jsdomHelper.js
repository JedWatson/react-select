
module.exports = function (html) {
	if (typeof document !== 'undefined') {
		return;
	}

	const JSDOM = require('jsdom').JSDOM;
	const jsdom = new JSDOM(html || '');

	global.document = jsdom.window.document;
	global.window = jsdom.window;
	global.navigator = {
		userAgent: 'JSDOM'
	};
};
