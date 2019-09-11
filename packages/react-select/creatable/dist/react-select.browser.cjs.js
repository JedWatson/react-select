'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

require("@babel/runtime/helpers/objectWithoutProperties");

var _extends = _interopDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray = _interopDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread = _interopDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass = _interopDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits = _interopDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty"));

var React = require('react');

var React__default = _interopDefault(React);

require('memoize-one');

require('@emotion/core');

require('react-dom');

require('prop-types');

require("@babel/runtime/helpers/typeof");

require('raf');

var __chunk_1 = require('../../dist/chunk-c9662232.browser.cjs.js');

require('../../dist/chunk-c67d1d4f.browser.cjs.js');

var reactSelect = require('../../dist/base/dist/react-select-e9eaad0c.browser.cjs.js');

require('@emotion/css');

require("@babel/runtime/helpers/taggedTemplateLiteral");

require('react-input-autosize');

var __chunk_3 = require('../../dist/chunk-185dfbdc.browser.cjs.js');

var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(option.value).toLowerCase();
  var optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};

var defaultProps = _objectSpread({
  allowCreateWhileLoading: false,
  createOptionPosition: 'last'
}, builtins);

var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Creatable, _Component);

    function Creatable(props) {
      var _this;

      _classCallCheck(this, Creatable);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Creatable).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
        var _this$props = _this.props,
            getNewOptionData = _this$props.getNewOptionData,
            inputValue = _this$props.inputValue,
            isMulti = _this$props.isMulti,
            onChange = _this$props.onChange,
            onCreateOption = _this$props.onCreateOption,
            value = _this$props.value;

        if (actionMeta.action !== 'select-option') {
          return onChange(newValue, actionMeta);
        }

        var newOption = _this.state.newOption;
        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

        if (valueArray[valueArray.length - 1] === newOption) {
          if (onCreateOption) onCreateOption(inputValue);else {
            var newOptionData = getNewOptionData(inputValue, inputValue);
            var newActionMeta = {
              action: 'create-option'
            };

            if (isMulti) {
              onChange([].concat(_toConsumableArray(__chunk_1.cleanValue(value)), [newOptionData]), newActionMeta);
            } else {
              onChange(newOptionData, newActionMeta);
            }
          }
          return;
        }

        onChange(newValue, actionMeta);
      });

      var options = props.options || [];
      _this.state = {
        newOption: undefined,
        options: options
      };
      return _this;
    }

    _createClass(Creatable, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
            createOptionPosition = nextProps.createOptionPosition,
            formatCreateLabel = nextProps.formatCreateLabel,
            getNewOptionData = nextProps.getNewOptionData,
            inputValue = nextProps.inputValue,
            isLoading = nextProps.isLoading,
            isValidNewOption = nextProps.isValidNewOption,
            value = nextProps.value;
        var options = nextProps.options || [];
        var newOption = this.state.newOption;

        if (isValidNewOption(inputValue, __chunk_1.cleanValue(value), options)) {
          newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
        } else {
          newOption = undefined;
        }

        this.setState({
          newOption: newOption,
          options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(options)) : [].concat(_toConsumableArray(options), [newOption]) : options
        });
      }
    }, {
      key: "focus",
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: "blur",
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = _extends({}, this.props);

        var options = this.state.options;
        return React__default.createElement(SelectComponent, _extends({}, props, {
          ref: function ref(_ref) {
            _this2.select = _ref;
          },
          options: options,
          onChange: this.onChange
        }));
      }
    }]);

    return Creatable;
  }(React.Component), _defineProperty(_class, "defaultProps", defaultProps), _temp;
}; // TODO: do this in package entrypoint


var SelectCreatable = makeCreatableSelect(reactSelect.Select);

var Creatable = __chunk_3.manageState(SelectCreatable);

exports.default = Creatable;
exports.defaultProps = defaultProps;
exports.makeCreatableSelect = makeCreatableSelect;
