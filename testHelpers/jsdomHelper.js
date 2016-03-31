
module.exports = function (html) {
	if (typeof document !== 'undefined') {
		return;
	}

	var jsdom = require('jsdom').jsdom;
	global.document = jsdom(html || '');
	global.window = global.document.defaultView;
	global.navigator = {
		userAgent: 'JSDOM'
	};

	// react-virtualized AutoSizer depends on getComputedStyle() and getBoundingClientRect().
	// jsdom doesn't return meanitnful values by default so we stub them out.
	global.getComputedStyle = function (element) {
		return {
      paddingBottom: 0,
			paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0
		};
	};
	const element = global.document.createElement('div');
	element.constructor.prototype.getBoundingClientRect = function () {
		return {
			width: 100,
			height: 200
		};
	};
};
