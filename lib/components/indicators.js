'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIndicator = exports.loadingIndicatorCSS = exports.IndicatorSeparator = exports.indicatorSeparatorCSS = exports.ClearIndicator = exports.clearIndicatorCSS = exports.DropdownIndicator = exports.dropdownIndicatorCSS = exports.DownChevron = exports.CrossIcon = undefined;

var _emotion = require('emotion');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// ==============================
// Dropdown & Clear Icons
// ==============================

var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = _objectWithoutProperties(_ref, ['size']);

  return _react2.default.createElement('svg', _extends({
    height: size,
    width: size,
    viewBox: '0 0 20 20',
    'aria-hidden': 'true',
    focusable: 'false',
    className: /*#__PURE__*/ /*#__PURE__*/(0, _emotion.css)({
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0
    })
  }, props));
};

var CrossIcon = exports.CrossIcon = function CrossIcon(props) {
  return _react2.default.createElement(
    Svg,
    _extends({ size: 20 }, props),
    _react2.default.createElement('path', { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })
  );
};
var DownChevron = exports.DownChevron = function DownChevron(props) {
  return _react2.default.createElement(
    Svg,
    _extends({ size: 20 }, props),
    _react2.default.createElement('path', { d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' })
  );
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref2) {
  var isFocused = _ref2.isFocused,
      _ref2$theme = _ref2.theme,
      baseUnit = _ref2$theme.spacing.baseUnit,
      colors = _ref2$theme.colors;
  return {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',

    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  };
};

var dropdownIndicatorCSS = exports.dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = exports.DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return _react2.default.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/(0, _emotion.css)(getStyles('dropdownIndicator', props)), {
        'indicator': true,
        'dropdown-indicator': true
      }, className)
    }),
    children
  );
};
DropdownIndicator.defaultProps = {
  children: _react2.default.createElement(DownChevron, null)
};

var clearIndicatorCSS = exports.clearIndicatorCSS = baseCSS;
var ClearIndicator = exports.ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
      className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return _react2.default.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/(0, _emotion.css)(getStyles('clearIndicator', props)), {
        'indicator': true,
        'clear-indicator': true
      }, className)
    }),
    children
  );
};

ClearIndicator.defaultProps = {
  children: _react2.default.createElement(CrossIcon, null)
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = exports.indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
  var isDisabled = _ref3.isDisabled,
      _ref3$theme = _ref3.theme,
      baseUnit = _ref3$theme.spacing.baseUnit,
      colors = _ref3$theme.colors;
  return {
    alignSelf: 'stretch',
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2,
    width: 1
  };
};

var IndicatorSeparator = exports.IndicatorSeparator = function IndicatorSeparator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps;

  return _react2.default.createElement('span', _extends({}, innerProps, {
    className: cx( /*#__PURE__*/(0, _emotion.css)(getStyles('indicatorSeparator', props)), { 'indicator-separator': true }, className)
  }));
};

// ==============================
// Loading
// ==============================

var keyframesName = 'react-select-loading-indicator';

var loadingIndicatorCSS = exports.loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
  var isFocused = _ref4.isFocused,
      size = _ref4.size,
      _ref4$theme = _ref4.theme,
      colors = _ref4$theme.colors,
      baseUnit = _ref4$theme.spacing.baseUnit;
  return {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: 'flex',
    padding: baseUnit * 2,
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  };
};

var LoadingDot = function LoadingDot(_ref5) {
  var color = _ref5.color,
      delay = _ref5.delay,
      offset = _ref5.offset;
  return _react2.default.createElement('span', {
    className: (0, _emotion.css)({
      animationDuration: '1s',
      animationDelay: delay + 'ms',
      animationIterationCount: 'infinite',
      animationName: keyframesName,
      animationTimingFunction: 'ease-in-out',
      backgroundColor: color,
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    })
  });
};

// eslint-disable-next-line no-unused-expressions
(0, _emotion.injectGlobal)('@keyframes ', keyframesName, '{0%,80%,100%{opacity:0;}40%{opacity:1;}};');

var LoadingIndicator = exports.LoadingIndicator = function LoadingIndicator(props) {
  var className = props.className,
      cx = props.cx,
      getStyles = props.getStyles,
      innerProps = props.innerProps,
      isFocused = props.isFocused,
      isRtl = props.isRtl,
      colors = props.theme.colors;

  var color = isFocused ? colors.neutral80 : colors.neutral20;

  return _react2.default.createElement(
    'div',
    _extends({}, innerProps, {
      className: cx( /*#__PURE__*/(0, _emotion.css)(getStyles('loadingIndicator', props)), {
        'indicator': true,
        'loading-indicator': true
      }, className)
    }),
    _react2.default.createElement(LoadingDot, { color: color, delay: 0, offset: isRtl }),
    _react2.default.createElement(LoadingDot, { color: color, delay: 160, offset: true }),
    _react2.default.createElement(LoadingDot, { color: color, delay: 320, offset: !isRtl })
  );
};
LoadingIndicator.defaultProps = { size: 4 };