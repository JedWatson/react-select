'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var SquareSource = {
  beginDrag: function beginDrag(props) {
    props.handleDrag(props.index);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var SquareValue = (function (_Component) {
  _inherits(SquareValue, _Component);

  function SquareValue(props) {
    _classCallCheck(this, SquareValue);

    _get(Object.getPrototypeOf(SquareValue.prototype), 'constructor', this).call(this, props);
    this.onRemove = this.onRemove.bind(this);
  }

  _createClass(SquareValue, [{
    key: 'onRemove',
    value: function onRemove(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onRemove(this.props.value, this.props.index);
    }
  }, {
    key: 'renderRemoveIcon',
    value: function renderRemoveIcon() {
      if (this.props.disabled || !this.props.onRemove) return;
      return _react2['default'].createElement(
        'span',
        { className: 'Select-value-icon',
          'aria-hidden': 'true',
          onMouseDown: this.onRemove,
          onTouchEnd: this.handleTouchEndRemove,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove },
        '×'
      );
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      var _this = this;

      var className = 'Select-value-label';
      return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
        'a',
        { className: className, onDoubleClick: function () {
            _this.props.onClick(_this.props.value);
          }, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
        this.props.children
      ) : _react2['default'].createElement(
        'span',
        { className: className, onClick: this.handleDrag, role: 'option', 'aria-selected': 'true', id: this.props.id },
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var connectDragSource = _props.connectDragSource;
      var isDragging = _props.isDragging;

      return connectDragSource(_react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('Select-value', this.props.value.className),
          style: this.props.value.style,
          title: this.props.value.title
        },
        this.renderRemoveIcon(),
        this.renderLabel()
      ));
    }
  }]);

  return SquareValue;
})(_react.Component);

SquareValue.propTypes = {
  connectDragSource: _react.PropTypes.func.isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  children: _react.PropTypes.node,
  disabled: _react.PropTypes.bool, // disabled prop passed to ReactSelect
  handleDrag: _react.PropTypes.func,
  id: _react.PropTypes.string, // Unique id for the value - used for aria
  index: _react.PropTypes.number, // Then index of the Value in list of components
  onClick: _react.PropTypes.func, // method to handle click on value label
  onRemove: _react.PropTypes.func, // method to handle removal of the value
  value: _react.PropTypes.object.isRequired };

// the option object for this value
exports['default'] = (0, _reactDnd.DragSource)('value', SquareSource, collect)(SquareValue);
module.exports = exports['default'];