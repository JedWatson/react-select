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

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
var squareTarget = {
  drop: function drop(props) {
    props.handleDrop(props.index, props.value);
  }
};

var Square = (function (_Component) {
  _inherits(Square, _Component);

  function Square(props) {
    _classCallCheck(this, Square);

    _get(Object.getPrototypeOf(Square.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Square, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var x = _props.x;
      var y = _props.y;
      var connectDropTarget = _props.connectDropTarget;
      var isOver = _props.isOver;

      return connectDropTarget(_react2['default'].createElement(
        'div',
        { style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'inline',
            zIndex: 1
          } },
        this.props.children
      ));
    }
  }]);

  return Square;
})(_react.Component);

Square.propTypes = {
  index: _react.PropTypes.number.isRequired,
  isOver: _react.PropTypes.bool.isRequired,
  handleDrop: _react.PropTypes.func,
  value: _react.PropTypes.object
};
exports['default'] = (0, _reactDnd.DropTarget)('value', squareTarget, collect)(Square);
module.exports = exports['default'];