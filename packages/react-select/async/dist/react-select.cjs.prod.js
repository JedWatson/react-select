"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _objectWithoutProperties = _interopDefault(require("@babel/runtime/helpers/objectWithoutProperties")), _extends = _interopDefault(require("@babel/runtime/helpers/extends"));

require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/objectSpread");

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React);

require("memoize-one"), require("@emotion/core"), require("react-dom"), require("prop-types"), 
require("@babel/runtime/helpers/typeof"), require("raf");

var __chunk_1 = require("../../dist/chunk-c9662232.cjs.prod.js");

require("../../dist/chunk-5b70513c.cjs.prod.js");

var reactSelect = require("../../dist/base/dist/react-select-20b69c9f.cjs.prod.js");

require("@emotion/css"), require("@babel/runtime/helpers/taggedTemplateLiteral"), 
require("react-input-autosize");

var __chunk_3 = require("../../dist/chunk-185dfbdc.cjs.prod.js"), defaultProps = {
  cacheOptions: !1,
  defaultOptions: !1,
  filterOption: null
}, makeAsyncSelect = function(SelectComponent) {
  var _class, _temp;
  return _temp = _class = function(_Component) {
    function Async(props) {
      var _this;
      return _classCallCheck(this, Async), _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this)), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastRequest", void 0), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", !1), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsCache", {}), 
      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function(newValue, actionMeta) {
        var _this$props = _this.props, cacheOptions = _this$props.cacheOptions, onInputChange = _this$props.onInputChange, inputValue = __chunk_1.handleInputChange(newValue, actionMeta, onInputChange);
        if (!inputValue) return delete _this.lastRequest, void _this.setState({
          inputValue: "",
          loadedInputValue: "",
          loadedOptions: [],
          isLoading: !1,
          passEmptyOptions: !1
        });
        if (cacheOptions && _this.optionsCache[inputValue]) _this.setState({
          inputValue: inputValue,
          loadedInputValue: inputValue,
          loadedOptions: _this.optionsCache[inputValue],
          isLoading: !1,
          passEmptyOptions: !1
        }); else {
          var request = _this.lastRequest = {};
          _this.setState({
            inputValue: inputValue,
            isLoading: !0,
            passEmptyOptions: !_this.state.loadedInputValue
          }, function() {
            _this.loadOptions(inputValue, function(options) {
              _this.mounted && (options && (_this.optionsCache[inputValue] = options), request === _this.lastRequest && (delete _this.lastRequest, 
              _this.setState({
                isLoading: !1,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: !1
              })));
            });
          });
        }
        return inputValue;
      }), _this.state = {
        defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : void 0,
        inputValue: void 0 !== props.inputValue ? props.inputValue : "",
        isLoading: !0 === props.defaultOptions,
        loadedOptions: [],
        passEmptyOptions: !1
      }, _this;
    }
    return _inherits(Async, _Component), _createClass(Async, [ {
      key: "componentDidMount",
      value: function() {
        var _this2 = this;
        this.mounted = !0;
        var defaultOptions = this.props.defaultOptions, inputValue = this.state.inputValue;
        !0 === defaultOptions && this.loadOptions(inputValue, function(options) {
          if (_this2.mounted) {
            var isLoading = !!_this2.lastRequest;
            _this2.setState({
              defaultOptions: options || [],
              isLoading: isLoading
            });
          }
        });
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function(nextProps) {
        nextProps.cacheOptions !== this.props.cacheOptions && (this.optionsCache = {}), 
        nextProps.defaultOptions !== this.props.defaultOptions && this.setState({
          defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : void 0
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.mounted = !1;
      }
    }, {
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
      key: "loadOptions",
      value: function(inputValue, callback) {
        var loadOptions = this.props.loadOptions;
        if (!loadOptions) return callback();
        var loader = loadOptions(inputValue, callback);
        loader && "function" == typeof loader.then && loader.then(callback, function() {
          return callback();
        });
      }
    }, {
      key: "render",
      value: function() {
        var _this3 = this, _this$props2 = this.props, props = (_this$props2.loadOptions, 
        _objectWithoutProperties(_this$props2, [ "loadOptions" ])), _this$state = this.state, defaultOptions = _this$state.defaultOptions, inputValue = _this$state.inputValue, isLoading = _this$state.isLoading, loadedInputValue = _this$state.loadedInputValue, loadedOptions = _this$state.loadedOptions, options = _this$state.passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
        return React__default.createElement(SelectComponent, _extends({}, props, {
          ref: function(_ref) {
            _this3.select = _ref;
          },
          options: options,
          isLoading: isLoading,
          onInputChange: this.handleInputChange
        }));
      }
    } ]), Async;
  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps), _temp;
}, SelectState = __chunk_3.manageState(reactSelect.Select), Async = makeAsyncSelect(SelectState);

exports.default = Async, exports.defaultProps = defaultProps, exports.makeAsyncSelect = makeAsyncSelect;
