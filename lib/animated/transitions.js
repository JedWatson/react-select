'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collapse = exports.collapseDuration = exports.Fade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// ==============================
// Fade Transition
// ==============================

var Fade = function Fade(_ref) {
  var Tag = _ref.component,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? 1 : _ref$duration,
      inProp = _ref.in,
      onExited = _ref.onExited,
      props = _objectWithoutProperties(_ref, ['component', 'duration', 'in', 'onExited']);

  var transition = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: 'opacity ' + duration + 'ms' },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };

  return _react2.default.createElement(
    _reactTransitionGroup.Transition,
    { mountOnEnter: true, unmountOnExit: true, 'in': inProp, timeout: duration },
    function (state) {
      var innerProps = {
        style: _extends({}, transition[state])
      };
      return _react2.default.createElement(Tag, _extends({ innerProps: innerProps }, props));
    }
  );
};

// ==============================
// Collapse Transition
// ==============================

exports.Fade = Fade;
var collapseDuration = exports.collapseDuration = 260;

// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
var Collapse = exports.Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Collapse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call.apply(_ref2, [this].concat(args))), _this), _this.duration = collapseDuration, _this.state = { width: 'auto' }, _this.transition = {
      exiting: { width: 0, transition: 'width ' + _this.duration + 'ms ease-out' },
      exited: { width: 0 }
    }, _this.getWidth = function (ref) {
      if (ref && isNaN(_this.state.width)) {
        // cannot use `offsetWidth` because it is rounded
        var _ref$getBoundingClien = ref.getBoundingClientRect(),
            _width = _ref$getBoundingClien.width;

        _this.setState({ width: _width });
      }
    }, _this.getStyle = function (width) {
      return {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: width
      };
    }, _this.getTransition = function (state) {
      return _this.transition[state];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // width must be calculated; cannot transition from `undefined` to `number`


  // get base styles


  // get transition styles


  _createClass(Collapse, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          inProp = _props.in;
      var width = this.state.width;


      return _react2.default.createElement(
        _reactTransitionGroup.Transition,
        {
          enter: false,
          mountOnEnter: true,
          unmountOnExit: true,
          'in': inProp,
          timeout: this.duration
        },
        function (state) {
          var style = _extends({}, _this2.getStyle(width), _this2.getTransition(state));
          return _react2.default.createElement(
            'div',
            { ref: _this2.getWidth, style: style },
            children
          );
        }
      );
    }
  }]);

  return Collapse;
}(_react.Component);