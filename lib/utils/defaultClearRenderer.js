'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = clearRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function clearRenderer(_ref) {
	var cssPrefix = _ref.cssPrefix;

	return _react2['default'].createElement('span', {
		className: cssPrefix + '-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
}

;
module.exports = exports['default'];