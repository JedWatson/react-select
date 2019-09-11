"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

var _objectWithoutProperties = _interopDefault(require("@babel/runtime/helpers/objectWithoutProperties")), _extends = _interopDefault(require("@babel/runtime/helpers/extends")), _objectSpread = _interopDefault(require("@babel/runtime/helpers/objectSpread")), _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React), core = require("@emotion/core"), reactDom = require("react-dom"), PropTypes = _interopDefault(require("prop-types")), _typeof = _interopDefault(require("@babel/runtime/helpers/typeof")), __chunk_1 = require("./chunk-c9662232.cjs.prod.js"), _css = _interopDefault(require("@emotion/css")), _taggedTemplateLiteral = _interopDefault(require("@babel/runtime/helpers/taggedTemplateLiteral")), AutosizeInput = _interopDefault(require("react-input-autosize"));

function getMenuPlacement(_ref) {
  var maxHeight = _ref.maxHeight, menuEl = _ref.menuEl, minHeight = _ref.minHeight, placement = _ref.placement, shouldScroll = _ref.shouldScroll, isFixedPosition = _ref.isFixedPosition, spacing = _ref.theme.spacing, scrollParent = __chunk_1.getScrollParent(menuEl), defaultState = {
    placement: "bottom",
    maxHeight: maxHeight
  };
  if (!menuEl || !menuEl.offsetParent) return defaultState;
  var scrollHeight = scrollParent.getBoundingClientRect().height, _menuEl$getBoundingCl = menuEl.getBoundingClientRect(), menuBottom = _menuEl$getBoundingCl.bottom, menuHeight = _menuEl$getBoundingCl.height, menuTop = _menuEl$getBoundingCl.top, containerTop = menuEl.offsetParent.getBoundingClientRect().top, viewHeight = window.innerHeight, scrollTop = __chunk_1.getScrollTop(scrollParent), marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10), marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10), viewSpaceAbove = containerTop - marginTop, viewSpaceBelow = viewHeight - menuTop, scrollSpaceAbove = viewSpaceAbove + scrollTop, scrollSpaceBelow = scrollHeight - scrollTop - menuTop, scrollDown = menuBottom - viewHeight + scrollTop + marginBottom, scrollUp = scrollTop + menuTop - marginTop;
  switch (placement) {
   case "auto":
   case "bottom":
    if (viewSpaceBelow >= menuHeight) return {
      placement: "bottom",
      maxHeight: maxHeight
    };
    if (scrollSpaceBelow >= menuHeight && !isFixedPosition) return shouldScroll && __chunk_1.animatedScrollTo(scrollParent, scrollDown, 160), 
    {
      placement: "bottom",
      maxHeight: maxHeight
    };
    if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) return shouldScroll && __chunk_1.animatedScrollTo(scrollParent, scrollDown, 160), 
    {
      placement: "bottom",
      maxHeight: isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom
    };
    if ("auto" === placement || isFixedPosition) {
      var _constrainedHeight = maxHeight, spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
      return spaceAbove >= minHeight && (_constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight)), 
      {
        placement: "top",
        maxHeight: _constrainedHeight
      };
    }
    if ("bottom" === placement) return __chunk_1.scrollTo(scrollParent, scrollDown), 
    {
      placement: "bottom",
      maxHeight: maxHeight
    };
    break;

   case "top":
    if (viewSpaceAbove >= menuHeight) return {
      placement: "top",
      maxHeight: maxHeight
    };
    if (scrollSpaceAbove >= menuHeight && !isFixedPosition) return shouldScroll && __chunk_1.animatedScrollTo(scrollParent, scrollUp, 160), 
    {
      placement: "top",
      maxHeight: maxHeight
    };
    if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
      var _constrainedHeight2 = maxHeight;
      return (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) && (_constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop), 
      shouldScroll && __chunk_1.animatedScrollTo(scrollParent, scrollUp, 160), {
        placement: "top",
        maxHeight: _constrainedHeight2
      };
    }
    return {
      placement: "bottom",
      maxHeight: maxHeight
    };

   default:
    throw new Error('Invalid placement provided "'.concat(placement, '".'));
  }
  return defaultState;
}

function alignToControl(placement) {
  return placement ? {
    bottom: "top",
    top: "bottom"
  }[placement] : "bottom";
}

var coercePlacement = function(p) {
  return "auto" === p ? "bottom" : p;
}, menuCSS = function(_ref2) {
  var _ref3, placement = _ref2.placement, _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, spacing = _ref2$theme.spacing, colors = _ref2$theme.colors;
  return _defineProperty(_ref3 = {
    label: "menu"
  }, alignToControl(placement), "100%"), _defineProperty(_ref3, "backgroundColor", colors.neutral0), 
  _defineProperty(_ref3, "borderRadius", borderRadius), _defineProperty(_ref3, "boxShadow", "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)"), 
  _defineProperty(_ref3, "marginBottom", spacing.menuGutter), _defineProperty(_ref3, "marginTop", spacing.menuGutter), 
  _defineProperty(_ref3, "position", "absolute"), _defineProperty(_ref3, "width", "100%"), 
  _defineProperty(_ref3, "zIndex", 1), _ref3;
}, MenuPlacer = function(_Component) {
  function MenuPlacer() {
    var _getPrototypeOf2, _this;
    _classCallCheck(this, MenuPlacer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuPlacer)).call.apply(_getPrototypeOf2, [ this ].concat(args))), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      maxHeight: _this.props.maxMenuHeight,
      placement: null
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlacement", function(ref) {
      var _this$props = _this.props, minMenuHeight = _this$props.minMenuHeight, maxMenuHeight = _this$props.maxMenuHeight, menuPlacement = _this$props.menuPlacement, menuPosition = _this$props.menuPosition, menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView, theme = _this$props.theme, getPortalPlacement = _this.context.getPortalPlacement;
      if (ref) {
        var isFixedPosition = "fixed" === menuPosition, state = getMenuPlacement({
          maxHeight: maxMenuHeight,
          menuEl: ref,
          minHeight: minMenuHeight,
          placement: menuPlacement,
          shouldScroll: menuShouldScrollIntoView && !isFixedPosition,
          isFixedPosition: isFixedPosition,
          theme: theme
        });
        getPortalPlacement && getPortalPlacement(state), _this.setState(state);
      }
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUpdatedProps", function() {
      var menuPlacement = _this.props.menuPlacement, placement = _this.state.placement || coercePlacement(menuPlacement);
      return _objectSpread({}, _this.props, {
        placement: placement,
        maxHeight: _this.state.maxHeight
      });
    }), _this;
  }
  return _inherits(MenuPlacer, _Component), _createClass(MenuPlacer, [ {
    key: "render",
    value: function() {
      return (0, this.props.children)({
        ref: this.getPlacement,
        placerProps: this.getUpdatedProps()
      });
    }
  } ]), MenuPlacer;
}(React.Component);

_defineProperty(MenuPlacer, "contextTypes", {
  getPortalPlacement: PropTypes.func
});

var Menu = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerRef = props.innerRef, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("menu", props),
    className: cx({
      menu: !0
    }, className)
  }, innerProps, {
    ref: innerRef
  }), children);
}, menuListCSS = function(_ref4) {
  var maxHeight = _ref4.maxHeight, baseUnit = _ref4.theme.spacing.baseUnit;
  return {
    maxHeight: maxHeight,
    overflowY: "auto",
    paddingBottom: baseUnit,
    paddingTop: baseUnit,
    position: "relative",
    WebkitOverflowScrolling: "touch"
  };
}, MenuList = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, isMulti = props.isMulti, innerRef = props.innerRef;
  return core.jsx("div", {
    css: getStyles("menuList", props),
    className: cx({
      "menu-list": !0,
      "menu-list--is-multi": isMulti
    }, className),
    ref: innerRef
  }, children);
}, noticeCSS = function(_ref5) {
  var _ref5$theme = _ref5.theme, baseUnit = _ref5$theme.spacing.baseUnit;
  return {
    color: _ref5$theme.colors.neutral40,
    padding: "".concat(2 * baseUnit, "px ").concat(3 * baseUnit, "px"),
    textAlign: "center"
  };
}, noOptionsMessageCSS = noticeCSS, loadingMessageCSS = noticeCSS, NoOptionsMessage = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("noOptionsMessage", props),
    className: cx({
      "menu-notice": !0,
      "menu-notice--no-options": !0
    }, className)
  }, innerProps), children);
};

NoOptionsMessage.defaultProps = {
  children: "No options"
};

var LoadingMessage = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("loadingMessage", props),
    className: cx({
      "menu-notice": !0,
      "menu-notice--loading": !0
    }, className)
  }, innerProps), children);
};

LoadingMessage.defaultProps = {
  children: "Loading..."
};

var menuPortalCSS = function(_ref6) {
  var rect = _ref6.rect, offset = _ref6.offset, position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
}, MenuPortal = function(_Component2) {
  function MenuPortal() {
    var _getPrototypeOf3, _this2;
    _classCallCheck(this, MenuPortal);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
    return _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPortal)).call.apply(_getPrototypeOf3, [ this ].concat(args))), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      placement: null
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getPortalPlacement", function(_ref7) {
      var placement = _ref7.placement;
      placement !== coercePlacement(_this2.props.menuPlacement) && _this2.setState({
        placement: placement
      });
    }), _this2;
  }
  return _inherits(MenuPortal, _Component2), _createClass(MenuPortal, [ {
    key: "getChildContext",
    value: function() {
      return {
        getPortalPlacement: this.getPortalPlacement
      };
    }
  }, {
    key: "render",
    value: function() {
      var _this$props2 = this.props, appendTo = _this$props2.appendTo, children = _this$props2.children, controlElement = _this$props2.controlElement, menuPlacement = _this$props2.menuPlacement, position = _this$props2.menuPosition, getStyles = _this$props2.getStyles, isFixed = "fixed" === position;
      if (!appendTo && !isFixed || !controlElement) return null;
      var placement = this.state.placement || coercePlacement(menuPlacement), rect = __chunk_1.getBoundingClientObj(controlElement), scrollDistance = isFixed ? 0 : window.pageYOffset, state = {
        offset: rect[placement] + scrollDistance,
        position: position,
        rect: rect
      }, menuWrapper = core.jsx("div", {
        css: getStyles("menuPortal", state)
      }, children);
      return appendTo ? reactDom.createPortal(menuWrapper, appendTo) : menuWrapper;
    }
  } ]), MenuPortal;
}(React.Component);

_defineProperty(MenuPortal, "childContextTypes", {
  getPortalPlacement: PropTypes.func
});

var isArray = Array.isArray, keyList = Object.keys, hasProp = Object.prototype.hasOwnProperty;

function equal(a, b) {
  if (a === b) return !0;
  if (a && b && "object" == _typeof(a) && "object" == _typeof(b)) {
    var i, length, key, arrA = isArray(a), arrB = isArray(b);
    if (arrA && arrB) {
      if ((length = a.length) != b.length) return !1;
      for (i = length; 0 != i--; ) if (!equal(a[i], b[i])) return !1;
      return !0;
    }
    if (arrA != arrB) return !1;
    var dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA != dateB) return !1;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return !1;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    if ((length = keys.length) !== keyList(b).length) return !1;
    for (i = length; 0 != i--; ) if (!hasProp.call(b, keys[i])) return !1;
    for (i = length; 0 != i--; ) if (!("_owner" === (key = keys[i]) && a.$$typeof || equal(a[key], b[key]))) return !1;
    return !0;
  }
  return a != a && b != b;
}

function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i)) return console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message), 
    !1;
    throw error;
  }
}

var containerCSS = function(_ref) {
  var isDisabled = _ref.isDisabled;
  return {
    label: "container",
    direction: _ref.isRtl ? "rtl" : null,
    pointerEvents: isDisabled ? "none" : null,
    position: "relative"
  };
}, SelectContainer = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps, isDisabled = props.isDisabled, isRtl = props.isRtl;
  return core.jsx("div", _extends({
    css: getStyles("container", props),
    className: cx({
      "--is-disabled": isDisabled,
      "--is-rtl": isRtl
    }, className)
  }, innerProps), children);
}, valueContainerCSS = function(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    padding: "".concat(spacing.baseUnit / 2, "px ").concat(2 * spacing.baseUnit, "px"),
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden"
  };
}, ValueContainer = function(_Component) {
  function ValueContainer() {
    return _classCallCheck(this, ValueContainer), _possibleConstructorReturn(this, _getPrototypeOf(ValueContainer).apply(this, arguments));
  }
  return _inherits(ValueContainer, _Component), _createClass(ValueContainer, [ {
    key: "render",
    value: function() {
      var _this$props = this.props, children = _this$props.children, className = _this$props.className, cx = _this$props.cx, isMulti = _this$props.isMulti, getStyles = _this$props.getStyles, hasValue = _this$props.hasValue;
      return core.jsx("div", {
        css: getStyles("valueContainer", this.props),
        className: cx({
          "value-container": !0,
          "value-container--is-multi": isMulti,
          "value-container--has-value": hasValue
        }, className)
      }, children);
    }
  } ]), ValueContainer;
}(React.Component), indicatorsContainerCSS = function() {
  return {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexShrink: 0
  };
}, IndicatorsContainer = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles;
  return core.jsx("div", {
    css: getStyles("indicatorsContainer", props),
    className: cx({
      indicators: !0
    }, className)
  }, children);
};

function _templateObject() {
  var data = _taggedTemplateLiteral([ "\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n" ]);
  return _templateObject = function() {
    return data;
  }, data;
}

var _ref2 = {
  name: "19bqh2r",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;"
}, Svg = function(_ref) {
  var size = _ref.size, props = _objectWithoutProperties(_ref, [ "size" ]);
  return core.jsx("svg", _extends({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
}, CrossIcon = function(props) {
  return core.jsx(Svg, _extends({
    size: 20
  }, props), core.jsx("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
}, DownChevron = function(props) {
  return core.jsx(Svg, _extends({
    size: 20
  }, props), core.jsx("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}, baseCSS = function(_ref3) {
  var isFocused = _ref3.isFocused, _ref3$theme = _ref3.theme, baseUnit = _ref3$theme.spacing.baseUnit, colors = _ref3$theme.colors;
  return {
    label: "indicatorContainer",
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: "flex",
    padding: 2 * baseUnit,
    transition: "color 150ms",
    ":hover": {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  };
}, dropdownIndicatorCSS = baseCSS, DropdownIndicator = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("div", _extends({}, innerProps, {
    css: getStyles("dropdownIndicator", props),
    className: cx({
      indicator: !0,
      "dropdown-indicator": !0
    }, className)
  }), children || core.jsx(DownChevron, null));
}, clearIndicatorCSS = baseCSS, ClearIndicator = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("div", _extends({}, innerProps, {
    css: getStyles("clearIndicator", props),
    className: cx({
      indicator: !0,
      "clear-indicator": !0
    }, className)
  }), children || core.jsx(CrossIcon, null));
}, indicatorSeparatorCSS = function(_ref4) {
  var isDisabled = _ref4.isDisabled, _ref4$theme = _ref4.theme, baseUnit = _ref4$theme.spacing.baseUnit, colors = _ref4$theme.colors;
  return {
    label: "indicatorSeparator",
    alignSelf: "stretch",
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: 2 * baseUnit,
    marginTop: 2 * baseUnit,
    width: 1
  };
}, IndicatorSeparator = function(props) {
  var className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("span", _extends({}, innerProps, {
    css: getStyles("indicatorSeparator", props),
    className: cx({
      "indicator-separator": !0
    }, className)
  }));
}, loadingDotAnimations = core.keyframes(_templateObject()), loadingIndicatorCSS = function(_ref5) {
  var isFocused = _ref5.isFocused, size = _ref5.size, _ref5$theme = _ref5.theme, colors = _ref5$theme.colors, baseUnit = _ref5$theme.spacing.baseUnit;
  return {
    label: "loadingIndicator",
    color: isFocused ? colors.neutral60 : colors.neutral20,
    display: "flex",
    padding: 2 * baseUnit,
    transition: "color 150ms",
    alignSelf: "center",
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: "center",
    verticalAlign: "middle"
  };
}, LoadingDot = function(_ref6) {
  var delay = _ref6.delay, offset = _ref6.offset;
  return core.jsx("span", {
    css: _css({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: "currentColor",
      borderRadius: "1em",
      display: "inline-block",
      marginLeft: offset ? "1em" : null,
      height: "1em",
      verticalAlign: "top",
      width: "1em"
    }, "")
  });
}, LoadingIndicator = function(props) {
  var className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps, isRtl = props.isRtl;
  return core.jsx("div", _extends({}, innerProps, {
    css: getStyles("loadingIndicator", props),
    className: cx({
      indicator: !0,
      "loading-indicator": !0
    }, className)
  }), core.jsx(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), core.jsx(LoadingDot, {
    delay: 160,
    offset: !0
  }), core.jsx(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};

LoadingIndicator.defaultProps = {
  size: 4
};

var css = function(_ref) {
  var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, _ref$theme = _ref.theme, colors = _ref$theme.colors, borderRadius = _ref$theme.borderRadius, spacing = _ref$theme.spacing;
  return {
    label: "control",
    alignItems: "center",
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : null,
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: spacing.controlHeight,
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms",
    "&:hover": {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
}, Control = function(props) {
  var children = props.children, cx = props.cx, getStyles = props.getStyles, className = props.className, isDisabled = props.isDisabled, isFocused = props.isFocused, innerRef = props.innerRef, innerProps = props.innerProps, menuIsOpen = props.menuIsOpen;
  return core.jsx("div", _extends({
    ref: innerRef,
    css: getStyles("control", props),
    className: cx({
      control: !0,
      "control--is-disabled": isDisabled,
      "control--is-focused": isFocused,
      "control--menu-is-open": menuIsOpen
    }, className)
  }, innerProps), children);
}, groupCSS = function(_ref) {
  var spacing = _ref.theme.spacing;
  return {
    paddingBottom: 2 * spacing.baseUnit,
    paddingTop: 2 * spacing.baseUnit
  };
}, Group = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, Heading = props.Heading, headingProps = props.headingProps, label = props.label, theme = props.theme, selectProps = props.selectProps;
  return core.jsx("div", {
    css: getStyles("group", props),
    className: cx({
      group: !0
    }, className)
  }, core.jsx(Heading, _extends({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    cx: cx
  }), label), core.jsx("div", null, children));
}, groupHeadingCSS = function(_ref2) {
  var spacing = _ref2.theme.spacing;
  return {
    label: "group",
    color: "#999",
    cursor: "default",
    display: "block",
    fontSize: "75%",
    fontWeight: "500",
    marginBottom: "0.25em",
    paddingLeft: 3 * spacing.baseUnit,
    paddingRight: 3 * spacing.baseUnit,
    textTransform: "uppercase"
  };
}, GroupHeading = function(props) {
  var className = props.className, cx = props.cx, getStyles = props.getStyles, theme = props.theme, cleanProps = (props.selectProps, 
  _objectWithoutProperties(props, [ "className", "cx", "getStyles", "theme", "selectProps" ]));
  return core.jsx("div", _extends({
    css: getStyles("groupHeading", _objectSpread({
      theme: theme
    }, cleanProps)),
    className: cx({
      "group-heading": !0
    }, className)
  }, cleanProps));
}, inputCSS = function(_ref) {
  var isDisabled = _ref.isDisabled, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
  return {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    visibility: isDisabled ? "hidden" : "visible",
    color: colors.neutral80
  };
}, inputStyle = function(isHidden) {
  return {
    label: "input",
    background: 0,
    border: 0,
    fontSize: "inherit",
    opacity: isHidden ? 0 : 1,
    outline: 0,
    padding: 0,
    color: "inherit"
  };
}, Input = function(_ref2) {
  var className = _ref2.className, cx = _ref2.cx, getStyles = _ref2.getStyles, innerRef = _ref2.innerRef, isHidden = _ref2.isHidden, isDisabled = _ref2.isDisabled, theme = _ref2.theme, props = (_ref2.selectProps, 
  _objectWithoutProperties(_ref2, [ "className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps" ]));
  return core.jsx("div", {
    css: getStyles("input", _objectSpread({
      theme: theme
    }, props))
  }, core.jsx(AutosizeInput, _extends({
    className: cx({
      input: !0
    }, className),
    inputRef: innerRef,
    inputStyle: inputStyle(isHidden),
    disabled: isDisabled
  }, props)));
}, multiValueCSS = function(_ref) {
  var _ref$theme = _ref.theme, spacing = _ref$theme.spacing, borderRadius = _ref$theme.borderRadius;
  return {
    label: "multiValue",
    backgroundColor: _ref$theme.colors.neutral10,
    borderRadius: borderRadius / 2,
    display: "flex",
    margin: spacing.baseUnit / 2,
    minWidth: 0
  };
}, multiValueLabelCSS = function(_ref2) {
  var _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, colors = _ref2$theme.colors, cropWithEllipsis = _ref2.cropWithEllipsis;
  return {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: "85%",
    overflow: "hidden",
    padding: 3,
    paddingLeft: 6,
    textOverflow: cropWithEllipsis ? "ellipsis" : null,
    whiteSpace: "nowrap"
  };
}, multiValueRemoveCSS = function(_ref3) {
  var _ref3$theme = _ref3.theme, spacing = _ref3$theme.spacing, borderRadius = _ref3$theme.borderRadius, colors = _ref3$theme.colors;
  return {
    alignItems: "center",
    borderRadius: borderRadius / 2,
    backgroundColor: _ref3.isFocused && colors.dangerLight,
    display: "flex",
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ":hover": {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  };
}, MultiValueGeneric = function(_ref4) {
  var children = _ref4.children, innerProps = _ref4.innerProps;
  return core.jsx("div", innerProps, children);
}, MultiValueContainer = MultiValueGeneric, MultiValueLabel = MultiValueGeneric, MultiValueRemove = function(_Component) {
  function MultiValueRemove() {
    return _classCallCheck(this, MultiValueRemove), _possibleConstructorReturn(this, _getPrototypeOf(MultiValueRemove).apply(this, arguments));
  }
  return _inherits(MultiValueRemove, _Component), _createClass(MultiValueRemove, [ {
    key: "render",
    value: function() {
      var _this$props = this.props, children = _this$props.children, innerProps = _this$props.innerProps;
      return core.jsx("div", innerProps, children || core.jsx(CrossIcon, {
        size: 14
      }));
    }
  } ]), MultiValueRemove;
}(React.Component), MultiValue = function(_Component2) {
  function MultiValue() {
    return _classCallCheck(this, MultiValue), _possibleConstructorReturn(this, _getPrototypeOf(MultiValue).apply(this, arguments));
  }
  return _inherits(MultiValue, _Component2), _createClass(MultiValue, [ {
    key: "render",
    value: function() {
      var _this = this, _this$props2 = this.props, children = _this$props2.children, className = _this$props2.className, components = _this$props2.components, cx = _this$props2.cx, data = _this$props2.data, getStyles = _this$props2.getStyles, innerProps = _this$props2.innerProps, isDisabled = _this$props2.isDisabled, removeProps = _this$props2.removeProps, selectProps = _this$props2.selectProps, Container = components.Container, Label = components.Label, Remove = components.Remove;
      return core.jsx(core.ClassNames, null, function(_ref5) {
        var css = _ref5.css, emotionCx = _ref5.cx;
        return core.jsx(Container, {
          data: data,
          innerProps: _objectSpread({}, innerProps, {
            className: emotionCx(css(getStyles("multiValue", _this.props)), cx({
              "multi-value": !0,
              "multi-value--is-disabled": isDisabled
            }, className))
          }),
          selectProps: selectProps
        }, core.jsx(Label, {
          data: data,
          innerProps: {
            className: emotionCx(css(getStyles("multiValueLabel", _this.props)), cx({
              "multi-value__label": !0
            }, className))
          },
          selectProps: selectProps
        }, children), core.jsx(Remove, {
          data: data,
          innerProps: _objectSpread({
            className: emotionCx(css(getStyles("multiValueRemove", _this.props)), cx({
              "multi-value__remove": !0
            }, className))
          }, removeProps),
          selectProps: selectProps
        }));
      });
    }
  } ]), MultiValue;
}(React.Component);

_defineProperty(MultiValue, "defaultProps", {
  cropWithEllipsis: !0
});

var optionCSS = function(_ref) {
  var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, isSelected = _ref.isSelected, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
  return {
    label: "option",
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : "transparent",
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : "inherit",
    cursor: "default",
    display: "block",
    fontSize: "inherit",
    padding: "".concat(2 * spacing.baseUnit, "px ").concat(3 * spacing.baseUnit, "px"),
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    ":active": {
      backgroundColor: !isDisabled && (isSelected ? colors.primary : colors.primary50)
    }
  };
}, Option = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, isDisabled = props.isDisabled, isFocused = props.isFocused, isSelected = props.isSelected, innerRef = props.innerRef, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("option", props),
    className: cx({
      option: !0,
      "option--is-disabled": isDisabled,
      "option--is-focused": isFocused,
      "option--is-selected": isSelected
    }, className),
    ref: innerRef
  }, innerProps), children);
}, placeholderCSS = function(_ref) {
  var _ref$theme = _ref.theme, spacing = _ref$theme.spacing;
  return {
    label: "placeholder",
    color: _ref$theme.colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  };
}, Placeholder = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("placeholder", props),
    className: cx({
      placeholder: !0
    }, className)
  }, innerProps), children);
}, css$1 = function(_ref) {
  var isDisabled = _ref.isDisabled, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
  return {
    label: "singleValue",
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2,
    maxWidth: "calc(100% - ".concat(2 * spacing.baseUnit, "px)"),
    overflow: "hidden",
    position: "absolute",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    top: "50%",
    transform: "translateY(-50%)"
  };
}, SingleValue = function(props) {
  var children = props.children, className = props.className, cx = props.cx, getStyles = props.getStyles, isDisabled = props.isDisabled, innerProps = props.innerProps;
  return core.jsx("div", _extends({
    css: getStyles("singleValue", props),
    className: cx({
      "single-value": !0,
      "single-value--is-disabled": isDisabled
    }, className)
  }, innerProps), children);
}, components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
}, defaultComponents = function(props) {
  return _objectSpread({}, components, props.components);
};

exports.MenuPlacer = MenuPlacer, exports.clearIndicatorCSS = clearIndicatorCSS, 
exports.components = components, exports.containerCSS = containerCSS, exports.css = css, 
exports.css$1 = css$1, exports.defaultComponents = defaultComponents, exports.dropdownIndicatorCSS = dropdownIndicatorCSS, 
exports.exportedEqual = exportedEqual, exports.groupCSS = groupCSS, exports.groupHeadingCSS = groupHeadingCSS, 
exports.indicatorSeparatorCSS = indicatorSeparatorCSS, exports.indicatorsContainerCSS = indicatorsContainerCSS, 
exports.inputCSS = inputCSS, exports.loadingIndicatorCSS = loadingIndicatorCSS, 
exports.loadingMessageCSS = loadingMessageCSS, exports.menuCSS = menuCSS, exports.menuListCSS = menuListCSS, 
exports.menuPortalCSS = menuPortalCSS, exports.multiValueCSS = multiValueCSS, exports.multiValueLabelCSS = multiValueLabelCSS, 
exports.multiValueRemoveCSS = multiValueRemoveCSS, exports.noOptionsMessageCSS = noOptionsMessageCSS, 
exports.optionCSS = optionCSS, exports.placeholderCSS = placeholderCSS, exports.valueContainerCSS = valueContainerCSS;
