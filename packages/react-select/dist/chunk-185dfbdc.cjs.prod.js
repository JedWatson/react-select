"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

var _objectWithoutProperties = _interopDefault(require("@babel/runtime/helpers/objectWithoutProperties")), _extends = _interopDefault(require("@babel/runtime/helpers/extends")), _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React), defaultProps = {
  defaultInputValue: "",
  defaultMenuIsOpen: !1,
  defaultValue: null
}, manageState = function(SelectComponent) {
  var _class, _temp;
  return _temp = _class = function(_Component) {
    function StateManager() {
      var _getPrototypeOf2, _this;
      _classCallCheck(this, StateManager);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateManager)).call.apply(_getPrototypeOf2, [ this ].concat(args))), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        inputValue: void 0 !== _this.props.inputValue ? _this.props.inputValue : _this.props.defaultInputValue,
        menuIsOpen: void 0 !== _this.props.menuIsOpen ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
        value: void 0 !== _this.props.value ? _this.props.value : _this.props.defaultValue
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function(value, actionMeta) {
        _this.callProp("onChange", value, actionMeta), _this.setState({
          value: value
        });
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputChange", function(value, actionMeta) {
        var newValue = _this.callProp("onInputChange", value, actionMeta);
        _this.setState({
          inputValue: void 0 !== newValue ? newValue : value
        });
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuOpen", function() {
        _this.callProp("onMenuOpen"), _this.setState({
          menuIsOpen: !0
        });
      }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuClose", function() {
        _this.callProp("onMenuClose"), _this.setState({
          menuIsOpen: !1
        });
      }), _this;
    }
    return _inherits(StateManager, _Component), _createClass(StateManager, [ {
      key: "focus",
      value: function() {
        this.select.focus();
      }
    }, {
      key: "blur",
      value: function() {
        this.select.blur();
      }
    }, {
      key: "getProp",
      value: function(key) {
        return void 0 !== this.props[key] ? this.props[key] : this.state[key];
      }
    }, {
      key: "callProp",
      value: function(name) {
        if ("function" == typeof this.props[name]) {
          for (var _this$props, _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
          return (_this$props = this.props)[name].apply(_this$props, args);
        }
      }
    }, {
      key: "render",
      value: function() {
        var _this2 = this, _this$props2 = this.props, props = (_this$props2.defaultInputValue, 
        _this$props2.defaultMenuIsOpen, _this$props2.defaultValue, _objectWithoutProperties(_this$props2, [ "defaultInputValue", "defaultMenuIsOpen", "defaultValue" ]));
        return React__default.createElement(SelectComponent, _extends({}, props, {
          ref: function(_ref) {
            _this2.select = _ref;
          },
          inputValue: this.getProp("inputValue"),
          menuIsOpen: this.getProp("menuIsOpen"),
          onChange: this.onChange,
          onInputChange: this.onInputChange,
          onMenuClose: this.onMenuClose,
          onMenuOpen: this.onMenuOpen,
          value: this.getProp("value")
        }));
      }
    } ]), StateManager;
  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps), _temp;
};

exports.manageState = manageState;
