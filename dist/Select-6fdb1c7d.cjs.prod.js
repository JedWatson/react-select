"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

for (var _objectWithoutProperties = _interopDefault(require("@babel/runtime/helpers/objectWithoutProperties")), _extends = _interopDefault(require("@babel/runtime/helpers/extends")), _slicedToArray = _interopDefault(require("@babel/runtime/helpers/slicedToArray")), _toConsumableArray = _interopDefault(require("@babel/runtime/helpers/toConsumableArray")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), React = require("react"), React__default = _interopDefault(React), memoizeOne = _interopDefault(require("memoize-one")), core = require("@emotion/core"), reactDom = require("react-dom"), index = require("./index-4b3e5ea6.cjs.prod.js"), _css = _interopDefault(require("@emotion/css")), diacritics = [ {
  base: "A",
  letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
  base: "AA",
  letters: "Ꜳ"
}, {
  base: "AE",
  letters: "ÆǼǢ"
}, {
  base: "AO",
  letters: "Ꜵ"
}, {
  base: "AU",
  letters: "Ꜷ"
}, {
  base: "AV",
  letters: "ꜸꜺ"
}, {
  base: "AY",
  letters: "Ꜽ"
}, {
  base: "B",
  letters: "BⒷＢḂḄḆɃƂƁ"
}, {
  base: "C",
  letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
  base: "D",
  letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
}, {
  base: "DZ",
  letters: "ǱǄ"
}, {
  base: "Dz",
  letters: "ǲǅ"
}, {
  base: "E",
  letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
  base: "F",
  letters: "FⒻＦḞƑꝻ"
}, {
  base: "G",
  letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
  base: "H",
  letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
  base: "I",
  letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
  base: "J",
  letters: "JⒿＪĴɈ"
}, {
  base: "K",
  letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
  base: "L",
  letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
  base: "LJ",
  letters: "Ǉ"
}, {
  base: "Lj",
  letters: "ǈ"
}, {
  base: "M",
  letters: "MⓂＭḾṀṂⱮƜ"
}, {
  base: "N",
  letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
  base: "NJ",
  letters: "Ǌ"
}, {
  base: "Nj",
  letters: "ǋ"
}, {
  base: "O",
  letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
  base: "OI",
  letters: "Ƣ"
}, {
  base: "OO",
  letters: "Ꝏ"
}, {
  base: "OU",
  letters: "Ȣ"
}, {
  base: "P",
  letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
  base: "Q",
  letters: "QⓆＱꝖꝘɊ"
}, {
  base: "R",
  letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
  base: "S",
  letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
  base: "T",
  letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
  base: "TZ",
  letters: "Ꜩ"
}, {
  base: "U",
  letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
  base: "V",
  letters: "VⓋＶṼṾƲꝞɅ"
}, {
  base: "VY",
  letters: "Ꝡ"
}, {
  base: "W",
  letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
  base: "X",
  letters: "XⓍＸẊẌ"
}, {
  base: "Y",
  letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
  base: "Z",
  letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
  base: "a",
  letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
  base: "aa",
  letters: "ꜳ"
}, {
  base: "ae",
  letters: "æǽǣ"
}, {
  base: "ao",
  letters: "ꜵ"
}, {
  base: "au",
  letters: "ꜷ"
}, {
  base: "av",
  letters: "ꜹꜻ"
}, {
  base: "ay",
  letters: "ꜽ"
}, {
  base: "b",
  letters: "bⓑｂḃḅḇƀƃɓ"
}, {
  base: "c",
  letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
  base: "d",
  letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
  base: "dz",
  letters: "ǳǆ"
}, {
  base: "e",
  letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
  base: "f",
  letters: "fⓕｆḟƒꝼ"
}, {
  base: "g",
  letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
  base: "h",
  letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
  base: "hv",
  letters: "ƕ"
}, {
  base: "i",
  letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
  base: "j",
  letters: "jⓙｊĵǰɉ"
}, {
  base: "k",
  letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
  base: "l",
  letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
  base: "lj",
  letters: "ǉ"
}, {
  base: "m",
  letters: "mⓜｍḿṁṃɱɯ"
}, {
  base: "n",
  letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
  base: "nj",
  letters: "ǌ"
}, {
  base: "o",
  letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
  base: "oi",
  letters: "ƣ"
}, {
  base: "ou",
  letters: "ȣ"
}, {
  base: "oo",
  letters: "ꝏ"
}, {
  base: "p",
  letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
  base: "q",
  letters: "qⓠｑɋꝗꝙ"
}, {
  base: "r",
  letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
  base: "s",
  letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
  base: "t",
  letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
  base: "tz",
  letters: "ꜩ"
}, {
  base: "u",
  letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
  base: "v",
  letters: "vⓥｖṽṿʋꝟʌ"
}, {
  base: "vy",
  letters: "ꝡ"
}, {
  base: "w",
  letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
  base: "x",
  letters: "xⓧｘẋẍ"
}, {
  base: "y",
  letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
  base: "z",
  letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
} ], anyDiacritic = new RegExp("[" + diacritics.map((function(d) {
  return d.letters;
})).join("") + "]", "g"), diacriticToBase = {}, i = 0; i < diacritics.length; i++) for (var diacritic = diacritics[i], j = 0; j < diacritic.letters.length; j++) diacriticToBase[diacritic.letters[j]] = diacritic.base;

var stripDiacritics = function(str) {
  return str.replace(anyDiacritic, (function(match) {
    return diacriticToBase[match];
  }));
};

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
      _defineProperty(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

var trimString = function(str) {
  return str.replace(/^\s+|\s+$/g, "");
}, defaultStringify = function(option) {
  return "".concat(option.label, " ").concat(option.value);
}, createFilter = function(config) {
  return function(option, rawInput) {
    var _ignoreCase$ignoreAcc = _objectSpread({
      ignoreCase: !0,
      ignoreAccents: !0,
      stringify: defaultStringify,
      trim: !0,
      matchFrom: "any"
    }, config), ignoreCase = _ignoreCase$ignoreAcc.ignoreCase, ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents, stringify = _ignoreCase$ignoreAcc.stringify, trim = _ignoreCase$ignoreAcc.trim, matchFrom = _ignoreCase$ignoreAcc.matchFrom, input = trim ? trimString(rawInput) : rawInput, candidate = trim ? trimString(stringify(option)) : stringify(option);
    return ignoreCase && (input = input.toLowerCase(), candidate = candidate.toLowerCase()), 
    ignoreAccents && (input = stripDiacritics(input), candidate = stripDiacritics(candidate)), 
    "start" === matchFrom ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
}, _ref = {
  name: "1laao21-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;"
}, A11yText = function(props) {
  return core.jsx("span", _extends({
    css: _ref
  }, props));
};

function DummyInput(_ref) {
  _ref.in, _ref.out, _ref.onExited, _ref.appear, _ref.enter, _ref.exit;
  var innerRef = _ref.innerRef, props = (_ref.emotion, _objectWithoutProperties(_ref, [ "in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion" ]));
  return core.jsx("input", _extends({
    ref: innerRef
  }, props, {
    css: _css({
      label: "dummyInput",
      background: 0,
      border: 0,
      fontSize: "inherit",
      outline: 0,
      padding: 0,
      width: 1,
      color: "transparent",
      left: -100,
      opacity: 0,
      position: "relative",
      transform: "scale(0)"
    }, "")
  }));
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

var NodeResolver = function(_Component) {
  _inherits(NodeResolver, _Component);
  var _super = _createSuper(NodeResolver);
  function NodeResolver() {
    return _classCallCheck(this, NodeResolver), _super.apply(this, arguments);
  }
  return _createClass(NodeResolver, [ {
    key: "componentDidMount",
    value: function() {
      this.props.innerRef(reactDom.findDOMNode(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.props.innerRef(null);
    }
  }, {
    key: "render",
    value: function() {
      return this.props.children;
    }
  } ]), NodeResolver;
}(React.Component), STYLE_KEYS = [ "boxSizing", "height", "overflow", "paddingRight", "position" ], LOCK_STYLES = {
  boxSizing: "border-box",
  overflow: "hidden",
  position: "relative",
  height: "100%"
};

function preventTouchMove(e) {
  e.preventDefault();
}

function allowTouchMove(e) {
  e.stopPropagation();
}

function preventInertiaScroll() {
  var top = this.scrollTop, totalScroll = this.scrollHeight, currentScroll = top + this.offsetHeight;
  0 === top ? this.scrollTop = 1 : currentScroll === totalScroll && (this.scrollTop = top - 1);
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$1() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), activeScrollLocks = 0, ScrollLock = function(_Component) {
  _inherits(ScrollLock, _Component);
  var _super = _createSuper$1(ScrollLock);
  function ScrollLock() {
    var _this;
    _classCallCheck(this, ScrollLock);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return (_this = _super.call.apply(_super, [ this ].concat(args))).originalStyles = {}, 
    _this.listenerOptions = {
      capture: !1,
      passive: !1
    }, _this;
  }
  return _createClass(ScrollLock, [ {
    key: "componentDidMount",
    value: function() {
      var _this2 = this;
      if (canUseDOM) {
        var _this$props = this.props, accountForScrollbars = _this$props.accountForScrollbars, touchScrollTarget = _this$props.touchScrollTarget, target = document.body, targetStyle = target && target.style;
        if (accountForScrollbars && STYLE_KEYS.forEach((function(key) {
          var val = targetStyle && targetStyle[key];
          _this2.originalStyles[key] = val;
        })), accountForScrollbars && activeScrollLocks < 1) {
          var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0, clientWidth = document.body ? document.body.clientWidth : 0, adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
          Object.keys(LOCK_STYLES).forEach((function(key) {
            var val = LOCK_STYLES[key];
            targetStyle && (targetStyle[key] = val);
          })), targetStyle && (targetStyle.paddingRight = "".concat(adjustedPadding, "px"));
        }
        target && isTouchDevice() && (target.addEventListener("touchmove", preventTouchMove, this.listenerOptions), 
        touchScrollTarget && (touchScrollTarget.addEventListener("touchstart", preventInertiaScroll, this.listenerOptions), 
        touchScrollTarget.addEventListener("touchmove", allowTouchMove, this.listenerOptions))), 
        activeScrollLocks += 1;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      var _this3 = this;
      if (canUseDOM) {
        var _this$props2 = this.props, accountForScrollbars = _this$props2.accountForScrollbars, touchScrollTarget = _this$props2.touchScrollTarget, target = document.body, targetStyle = target && target.style;
        activeScrollLocks = Math.max(activeScrollLocks - 1, 0), accountForScrollbars && activeScrollLocks < 1 && STYLE_KEYS.forEach((function(key) {
          var val = _this3.originalStyles[key];
          targetStyle && (targetStyle[key] = val);
        })), target && isTouchDevice() && (target.removeEventListener("touchmove", preventTouchMove, this.listenerOptions), 
        touchScrollTarget && (touchScrollTarget.removeEventListener("touchstart", preventInertiaScroll, this.listenerOptions), 
        touchScrollTarget.removeEventListener("touchmove", allowTouchMove, this.listenerOptions)));
      }
    }
  }, {
    key: "render",
    value: function() {
      return null;
    }
  } ]), ScrollLock;
}(React.Component);

function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$2() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

ScrollLock.defaultProps = {
  accountForScrollbars: !0
};

var _ref$1 = {
  name: "1dsbpcp",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;"
}, ScrollBlock = function(_PureComponent) {
  _inherits(ScrollBlock, _PureComponent);
  var _super = _createSuper$2(ScrollBlock);
  function ScrollBlock() {
    var _this;
    _classCallCheck(this, ScrollBlock);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return (_this = _super.call.apply(_super, [ this ].concat(args))).state = {
      touchScrollTarget: null
    }, _this.getScrollTarget = function(ref) {
      ref !== _this.state.touchScrollTarget && _this.setState({
        touchScrollTarget: ref
      });
    }, _this.blurSelectInput = function() {
      document.activeElement && document.activeElement.blur();
    }, _this;
  }
  return _createClass(ScrollBlock, [ {
    key: "render",
    value: function() {
      var _this$props = this.props, children = _this$props.children, isEnabled = _this$props.isEnabled, touchScrollTarget = this.state.touchScrollTarget;
      return isEnabled ? core.jsx("div", null, core.jsx("div", {
        onClick: this.blurSelectInput,
        css: _ref$1
      }), core.jsx(NodeResolver, {
        innerRef: this.getScrollTarget
      }, children), touchScrollTarget ? core.jsx(ScrollLock, {
        touchScrollTarget: touchScrollTarget
      }) : null) : children;
    }
  } ]), ScrollBlock;
}(React.PureComponent);

function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$3() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

var ScrollCaptor = function(_Component) {
  _inherits(ScrollCaptor, _Component);
  var _super = _createSuper$3(ScrollCaptor);
  function ScrollCaptor() {
    var _this;
    _classCallCheck(this, ScrollCaptor);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return (_this = _super.call.apply(_super, [ this ].concat(args))).isBottom = !1, 
    _this.isTop = !1, _this.scrollTarget = void 0, _this.touchStart = void 0, _this.cancelScroll = function(event) {
      event.preventDefault(), event.stopPropagation();
    }, _this.handleEventDelta = function(event, delta) {
      var _this$props = _this.props, onBottomArrive = _this$props.onBottomArrive, onBottomLeave = _this$props.onBottomLeave, onTopArrive = _this$props.onTopArrive, onTopLeave = _this$props.onTopLeave, _this$scrollTarget = _this.scrollTarget, scrollTop = _this$scrollTarget.scrollTop, scrollHeight = _this$scrollTarget.scrollHeight, clientHeight = _this$scrollTarget.clientHeight, target = _this.scrollTarget, isDeltaPositive = delta > 0, availableScroll = scrollHeight - clientHeight - scrollTop, shouldCancelScroll = !1;
      availableScroll > delta && _this.isBottom && (onBottomLeave && onBottomLeave(event), 
      _this.isBottom = !1), isDeltaPositive && _this.isTop && (onTopLeave && onTopLeave(event), 
      _this.isTop = !1), isDeltaPositive && delta > availableScroll ? (onBottomArrive && !_this.isBottom && onBottomArrive(event), 
      target.scrollTop = scrollHeight, shouldCancelScroll = !0, _this.isBottom = !0) : !isDeltaPositive && -delta > scrollTop && (onTopArrive && !_this.isTop && onTopArrive(event), 
      target.scrollTop = 0, shouldCancelScroll = !0, _this.isTop = !0), shouldCancelScroll && _this.cancelScroll(event);
    }, _this.onWheel = function(event) {
      _this.handleEventDelta(event, event.deltaY);
    }, _this.onTouchStart = function(event) {
      _this.touchStart = event.changedTouches[0].clientY;
    }, _this.onTouchMove = function(event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;
      _this.handleEventDelta(event, deltaY);
    }, _this.getScrollTarget = function(ref) {
      _this.scrollTarget = ref;
    }, _this;
  }
  return _createClass(ScrollCaptor, [ {
    key: "componentDidMount",
    value: function() {
      this.startListening(this.scrollTarget);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListening(this.scrollTarget);
    }
  }, {
    key: "startListening",
    value: function(el) {
      el && ("function" == typeof el.addEventListener && el.addEventListener("wheel", this.onWheel, !1), 
      "function" == typeof el.addEventListener && el.addEventListener("touchstart", this.onTouchStart, !1), 
      "function" == typeof el.addEventListener && el.addEventListener("touchmove", this.onTouchMove, !1));
    }
  }, {
    key: "stopListening",
    value: function(el) {
      "function" == typeof el.removeEventListener && el.removeEventListener("wheel", this.onWheel, !1), 
      "function" == typeof el.removeEventListener && el.removeEventListener("touchstart", this.onTouchStart, !1), 
      "function" == typeof el.removeEventListener && el.removeEventListener("touchmove", this.onTouchMove, !1);
    }
  }, {
    key: "render",
    value: function() {
      return React__default.createElement(NodeResolver, {
        innerRef: this.getScrollTarget
      }, this.props.children);
    }
  } ]), ScrollCaptor;
}(React.Component);

function ScrollCaptorSwitch(_ref) {
  var _ref$isEnabled = _ref.isEnabled, isEnabled = void 0 === _ref$isEnabled || _ref$isEnabled, props = _objectWithoutProperties(_ref, [ "isEnabled" ]);
  return isEnabled ? React__default.createElement(ScrollCaptor, props) : props.children;
}

var instructionsAriaMessage = function(event) {
  var context = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, isSearchable = context.isSearchable, isMulti = context.isMulti, label = context.label, isDisabled = context.isDisabled;
  switch (event) {
   case "menu":
    return "Use Up and Down to choose options".concat(isDisabled ? "" : ", press Enter to select the currently focused option", ", press Escape to exit the menu, press Tab to select the option and exit the menu.");

   case "input":
    return "".concat(label || "Select", " is focused ").concat(isSearchable ? ",type to refine list" : "", ", press Down to open the menu, ").concat(isMulti ? " press left to focus selected values" : "");

   case "value":
    return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
  }
}, valueEventAriaMessage = function(event, context) {
  var value = context.value, isDisabled = context.isDisabled;
  if (value) switch (event) {
   case "deselect-option":
   case "pop-value":
   case "remove-value":
    return "option ".concat(value, ", deselected.");

   case "select-option":
    return "option ".concat(value, isDisabled ? " is disabled. Select another option." : ", selected.");
  }
}, valueFocusAriaMessage = function(_ref) {
  var focusedValue = _ref.focusedValue, getOptionLabel = _ref.getOptionLabel, selectValue = _ref.selectValue;
  return "value ".concat(getOptionLabel(focusedValue), " focused, ").concat(selectValue.indexOf(focusedValue) + 1, " of ").concat(selectValue.length, ".");
}, optionFocusAriaMessage = function(_ref2) {
  var focusedOption = _ref2.focusedOption, getOptionLabel = _ref2.getOptionLabel, options = _ref2.options;
  return "option ".concat(getOptionLabel(focusedOption), " focused").concat(focusedOption.isDisabled ? " disabled" : "", ", ").concat(options.indexOf(focusedOption) + 1, " of ").concat(options.length, ".");
}, resultsAriaMessage = function(_ref3) {
  var inputValue = _ref3.inputValue, screenReaderMessage = _ref3.screenReaderMessage;
  return "".concat(screenReaderMessage).concat(inputValue ? " for search term " + inputValue : "", ".");
}, formatGroupLabel = function(group) {
  return group.label;
}, getOptionLabel = function(option) {
  return option.label;
}, getOptionValue = function(option) {
  return option.value;
}, isOptionDisabled = function(option) {
  return !!option.isDisabled;
};

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach((function(key) {
      _defineProperty(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

var defaultStyles = {
  clearIndicator: index.clearIndicatorCSS,
  container: index.containerCSS,
  control: index.css,
  dropdownIndicator: index.dropdownIndicatorCSS,
  group: index.groupCSS,
  groupHeading: index.groupHeadingCSS,
  indicatorsContainer: index.indicatorsContainerCSS,
  indicatorSeparator: index.indicatorSeparatorCSS,
  input: index.inputCSS,
  loadingIndicator: index.loadingIndicatorCSS,
  loadingMessage: index.loadingMessageCSS,
  menu: index.menuCSS,
  menuList: index.menuListCSS,
  menuPortal: index.menuPortalCSS,
  multiValue: index.multiValueCSS,
  multiValueLabel: index.multiValueLabelCSS,
  multiValueRemove: index.multiValueRemoveCSS,
  noOptionsMessage: index.noOptionsMessageCSS,
  option: index.optionCSS,
  placeholder: index.placeholderCSS,
  singleValue: index.css$1,
  valueContainer: index.valueContainerCSS
};

function mergeStyles(source) {
  var target = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, styles = _objectSpread$1({}, source);
  return Object.keys(target).forEach((function(key) {
    source[key] ? styles[key] = function(rsCss, props) {
      return target[key](source[key](rsCss, props), props);
    } : styles[key] = target[key];
  })), styles;
}

var colors = {
  primary: "#2684FF",
  primary75: "#4C9AFF",
  primary50: "#B2D4FF",
  primary25: "#DEEBFF",
  danger: "#DE350B",
  dangerLight: "#FFBDAD",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)"
}, borderRadius = 4, baseUnit = 4, controlHeight = 38, menuGutter = 2 * baseUnit, spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
}, defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter((function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }))), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach((function(key) {
      _defineProperty(target, key, source[key]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach((function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    }));
  }
  return target;
}

function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
  return function() {
    var result, Super = _getPrototypeOf(Derived);
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$4() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), 
    !0;
  } catch (e) {
    return !1;
  }
}

var defaultProps = {
  backspaceRemovesValue: !0,
  blurInputOnSelect: index.isTouchCapable(),
  captureMenuScroll: !index.isTouchCapable(),
  closeMenuOnSelect: !0,
  closeMenuOnScroll: !1,
  components: {},
  controlShouldRenderValue: !0,
  escapeClearsValue: !1,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  isDisabled: !1,
  isLoading: !1,
  isMulti: !1,
  isRtl: !1,
  isSearchable: !0,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function() {
    return "Loading...";
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: !1,
  menuPlacement: "bottom",
  menuPosition: "absolute",
  menuShouldBlockScroll: !1,
  menuShouldScrollIntoView: !index.isMobileDevice(),
  noOptionsMessage: function() {
    return "No options";
  },
  openMenuOnFocus: !1,
  openMenuOnClick: !0,
  options: [],
  pageSize: 5,
  placeholder: "Select...",
  screenReaderStatus: function(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(1 !== count ? "s" : "", " available");
  },
  styles: {},
  tabIndex: "0",
  tabSelectsValue: !0
}, instanceId = 1, Select = function(_Component) {
  _inherits(Select, _Component);
  var _super = _createSuper$4(Select);
  function Select(_props) {
    var _this;
    _classCallCheck(this, Select), (_this = _super.call(this, _props)).state = {
      ariaLiveSelection: "",
      ariaLiveContext: "",
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: !1,
      isFocused: !1,
      menuOptions: {
        render: [],
        focusable: []
      },
      selectValue: []
    }, _this.blockOptionHover = !1, _this.isComposing = !1, _this.clearFocusValueOnUpdate = !1, 
    _this.commonProps = void 0, _this.components = void 0, _this.hasGroups = !1, _this.initialTouchX = 0, 
    _this.initialTouchY = 0, _this.inputIsHiddenAfterUpdate = void 0, _this.instancePrefix = "", 
    _this.openAfterFocus = !1, _this.scrollToFocusedOptionOnUpdate = !1, _this.userIsDragging = void 0, 
    _this.controlRef = null, _this.getControlRef = function(ref) {
      _this.controlRef = ref;
    }, _this.focusedOptionRef = null, _this.getFocusedOptionRef = function(ref) {
      _this.focusedOptionRef = ref;
    }, _this.menuListRef = null, _this.getMenuListRef = function(ref) {
      _this.menuListRef = ref;
    }, _this.inputRef = null, _this.getInputRef = function(ref) {
      _this.inputRef = ref;
    }, _this.cacheComponents = function(components) {
      _this.components = index.defaultComponents({
        components: components
      });
    }, _this.focus = _this.focusInput, _this.blur = _this.blurInput, _this.onChange = function(newValue, actionMeta) {
      var _this$props = _this.props, onChange = _this$props.onChange, name = _this$props.name;
      onChange(newValue, _objectSpread$2(_objectSpread$2({}, actionMeta), {}, {
        name: name
      }));
    }, _this.setValue = function(newValue) {
      var action = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "set-value", option = arguments.length > 2 ? arguments[2] : void 0, _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti;
      _this.onInputChange("", {
        action: "set-value"
      }), closeMenuOnSelect && (_this.inputIsHiddenAfterUpdate = !isMulti, _this.onMenuClose()), 
      _this.clearFocusValueOnUpdate = !0, _this.onChange(newValue, {
        action: action,
        option: option
      });
    }, _this.selectOption = function(newValue) {
      var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, selectValue = _this.state.selectValue;
      if (isMulti) if (_this.isOptionSelected(newValue, selectValue)) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue(selectValue.filter((function(i) {
          return _this.getOptionValue(i) !== candidate;
        })), "deselect-option", newValue), _this.announceAriaLiveSelection({
          event: "deselect-option",
          context: {
            value: _this.getOptionLabel(newValue)
          }
        });
      } else _this.isOptionDisabled(newValue, selectValue) ? _this.announceAriaLiveSelection({
        event: "select-option",
        context: {
          value: _this.getOptionLabel(newValue),
          isDisabled: !0
        }
      }) : (_this.setValue([].concat(_toConsumableArray(selectValue), [ newValue ]), "select-option", newValue), 
      _this.announceAriaLiveSelection({
        event: "select-option",
        context: {
          value: _this.getOptionLabel(newValue)
        }
      })); else _this.isOptionDisabled(newValue, selectValue) ? _this.announceAriaLiveSelection({
        event: "select-option",
        context: {
          value: _this.getOptionLabel(newValue),
          isDisabled: !0
        }
      }) : (_this.setValue(newValue, "select-option"), _this.announceAriaLiveSelection({
        event: "select-option",
        context: {
          value: _this.getOptionLabel(newValue)
        }
      }));
      blurInputOnSelect && _this.blurInput();
    }, _this.removeValue = function(removedValue) {
      var selectValue = _this.state.selectValue, candidate = _this.getOptionValue(removedValue), newValue = selectValue.filter((function(i) {
        return _this.getOptionValue(i) !== candidate;
      }));
      _this.onChange(newValue.length ? newValue : null, {
        action: "remove-value",
        removedValue: removedValue
      }), _this.announceAriaLiveSelection({
        event: "remove-value",
        context: {
          value: removedValue ? _this.getOptionLabel(removedValue) : ""
        }
      }), _this.focusInput();
    }, _this.clearValue = function() {
      var isMulti = _this.props.isMulti;
      _this.onChange(isMulti ? [] : null, {
        action: "clear"
      });
    }, _this.popValue = function() {
      var selectValue = _this.state.selectValue, lastSelectedValue = selectValue[selectValue.length - 1], newValue = selectValue.slice(0, selectValue.length - 1);
      _this.announceAriaLiveSelection({
        event: "pop-value",
        context: {
          value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ""
        }
      }), _this.onChange(newValue.length ? newValue : null, {
        action: "pop-value",
        removedValue: lastSelectedValue
      });
    }, _this.getOptionLabel = function(data) {
      return _this.props.getOptionLabel(data);
    }, _this.getOptionValue = function(data) {
      return _this.props.getOptionValue(data);
    }, _this.getStyles = function(key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = "border-box";
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    }, _this.getElementId = function(element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    }, _this.getActiveDescendentId = function() {
      var menuIsOpen = _this.props.menuIsOpen, _this$state = _this.state, menuOptions = _this$state.menuOptions, focusedOption = _this$state.focusedOption;
      if (focusedOption && menuIsOpen) {
        var index = menuOptions.focusable.indexOf(focusedOption), option = menuOptions.render[index];
        return option && option.key;
      }
    }, _this.announceAriaLiveSelection = function(_ref2) {
      var event = _ref2.event, context = _ref2.context;
      _this.setState({
        ariaLiveSelection: valueEventAriaMessage(event, context)
      });
    }, _this.announceAriaLiveContext = function(_ref3) {
      var event = _ref3.event, context = _ref3.context;
      _this.setState({
        ariaLiveContext: instructionsAriaMessage(event, _objectSpread$2(_objectSpread$2({}, context), {}, {
          label: _this.props["aria-label"]
        }))
      });
    }, _this.onMenuMouseDown = function(event) {
      0 === event.button && (event.stopPropagation(), event.preventDefault(), _this.focusInput());
    }, _this.onMenuMouseMove = function(event) {
      _this.blockOptionHover = !1;
    }, _this.onControlMouseDown = function(event) {
      var openMenuOnClick = _this.props.openMenuOnClick;
      _this.state.isFocused ? _this.props.menuIsOpen ? "INPUT" !== event.target.tagName && "TEXTAREA" !== event.target.tagName && _this.onMenuClose() : openMenuOnClick && _this.openMenu("first") : (openMenuOnClick && (_this.openAfterFocus = !0), 
      _this.focusInput()), "INPUT" !== event.target.tagName && "TEXTAREA" !== event.target.tagName && event.preventDefault();
    }, _this.onDropdownIndicatorMouseDown = function(event) {
      if (!(event && "mousedown" === event.type && 0 !== event.button || _this.props.isDisabled)) {
        var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
        _this.focusInput(), menuIsOpen ? (_this.inputIsHiddenAfterUpdate = !isMulti, _this.onMenuClose()) : _this.openMenu("first"), 
        event.preventDefault(), event.stopPropagation();
      }
    }, _this.onClearIndicatorMouseDown = function(event) {
      event && "mousedown" === event.type && 0 !== event.button || (_this.clearValue(), 
      event.stopPropagation(), _this.openAfterFocus = !1, "touchend" === event.type ? _this.focusInput() : setTimeout((function() {
        return _this.focusInput();
      })));
    }, _this.onScroll = function(event) {
      "boolean" == typeof _this.props.closeMenuOnScroll ? event.target instanceof HTMLElement && index.isDocumentElement(event.target) && _this.props.onMenuClose() : "function" == typeof _this.props.closeMenuOnScroll && _this.props.closeMenuOnScroll(event) && _this.props.onMenuClose();
    }, _this.onCompositionStart = function() {
      _this.isComposing = !0;
    }, _this.onCompositionEnd = function() {
      _this.isComposing = !1;
    }, _this.onTouchStart = function(_ref4) {
      var touches = _ref4.touches, touch = touches && touches.item(0);
      touch && (_this.initialTouchX = touch.clientX, _this.initialTouchY = touch.clientY, 
      _this.userIsDragging = !1);
    }, _this.onTouchMove = function(_ref5) {
      var touches = _ref5.touches, touch = touches && touches.item(0);
      if (touch) {
        var deltaX = Math.abs(touch.clientX - _this.initialTouchX), deltaY = Math.abs(touch.clientY - _this.initialTouchY);
        _this.userIsDragging = deltaX > 5 || deltaY > 5;
      }
    }, _this.onTouchEnd = function(event) {
      _this.userIsDragging || (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target) && _this.blurInput(), 
      _this.initialTouchX = 0, _this.initialTouchY = 0);
    }, _this.onControlTouchEnd = function(event) {
      _this.userIsDragging || _this.onControlMouseDown(event);
    }, _this.onClearIndicatorTouchEnd = function(event) {
      _this.userIsDragging || _this.onClearIndicatorMouseDown(event);
    }, _this.onDropdownIndicatorTouchEnd = function(event) {
      _this.userIsDragging || _this.onDropdownIndicatorMouseDown(event);
    }, _this.handleInputChange = function(event) {
      var inputValue = event.currentTarget.value;
      _this.inputIsHiddenAfterUpdate = !1, _this.onInputChange(inputValue, {
        action: "input-change"
      }), _this.props.menuIsOpen || _this.onMenuOpen();
    }, _this.onInputFocus = function(event) {
      var _this$props5 = _this.props, isSearchable = _this$props5.isSearchable, isMulti = _this$props5.isMulti;
      _this.props.onFocus && _this.props.onFocus(event), _this.inputIsHiddenAfterUpdate = !1, 
      _this.announceAriaLiveContext({
        event: "input",
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      }), _this.setState({
        isFocused: !0
      }), (_this.openAfterFocus || _this.props.openMenuOnFocus) && _this.openMenu("first"), 
      _this.openAfterFocus = !1;
    }, _this.onInputBlur = function(event) {
      _this.menuListRef && _this.menuListRef.contains(document.activeElement) ? _this.inputRef.focus() : (_this.props.onBlur && _this.props.onBlur(event), 
      _this.onInputChange("", {
        action: "input-blur"
      }), _this.onMenuClose(), _this.setState({
        focusedValue: null,
        isFocused: !1
      }));
    }, _this.onOptionHover = function(focusedOption) {
      _this.blockOptionHover || _this.state.focusedOption === focusedOption || _this.setState({
        focusedOption: focusedOption
      });
    }, _this.shouldHideSelectedOptions = function() {
      var _this$props6 = _this.props, hideSelectedOptions = _this$props6.hideSelectedOptions, isMulti = _this$props6.isMulti;
      return void 0 === hideSelectedOptions ? isMulti : hideSelectedOptions;
    }, _this.onKeyDown = function(event) {
      var _this$props7 = _this.props, isMulti = _this$props7.isMulti, backspaceRemovesValue = _this$props7.backspaceRemovesValue, escapeClearsValue = _this$props7.escapeClearsValue, inputValue = _this$props7.inputValue, isClearable = _this$props7.isClearable, isDisabled = _this$props7.isDisabled, menuIsOpen = _this$props7.menuIsOpen, onKeyDown = _this$props7.onKeyDown, tabSelectsValue = _this$props7.tabSelectsValue, openMenuOnFocus = _this$props7.openMenuOnFocus, _this$state2 = _this.state, focusedOption = _this$state2.focusedOption, focusedValue = _this$state2.focusedValue, selectValue = _this$state2.selectValue;
      if (!(isDisabled || "function" == typeof onKeyDown && (onKeyDown(event), event.defaultPrevented))) {
        switch (_this.blockOptionHover = !0, event.key) {
         case "ArrowLeft":
          if (!isMulti || inputValue) return;
          _this.focusValue("previous");
          break;

         case "ArrowRight":
          if (!isMulti || inputValue) return;
          _this.focusValue("next");
          break;

         case "Delete":
         case "Backspace":
          if (inputValue) return;
          if (focusedValue) _this.removeValue(focusedValue); else {
            if (!backspaceRemovesValue) return;
            isMulti ? _this.popValue() : isClearable && _this.clearValue();
          }
          break;

         case "Tab":
          if (_this.isComposing) return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) return;
          _this.selectOption(focusedOption);
          break;

         case "Enter":
          if (229 === event.keyCode) break;
          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;
            _this.selectOption(focusedOption);
            break;
          }
          return;

         case "Escape":
          menuIsOpen ? (_this.inputIsHiddenAfterUpdate = !1, _this.onInputChange("", {
            action: "menu-close"
          }), _this.onMenuClose()) : isClearable && escapeClearsValue && _this.clearValue();
          break;

         case " ":
          if (inputValue) return;
          if (!menuIsOpen) {
            _this.openMenu("first");
            break;
          }
          if (!focusedOption) return;
          _this.selectOption(focusedOption);
          break;

         case "ArrowUp":
          menuIsOpen ? _this.focusOption("up") : _this.openMenu("last");
          break;

         case "ArrowDown":
          menuIsOpen ? _this.focusOption("down") : _this.openMenu("first");
          break;

         case "PageUp":
          if (!menuIsOpen) return;
          _this.focusOption("pageup");
          break;

         case "PageDown":
          if (!menuIsOpen) return;
          _this.focusOption("pagedown");
          break;

         case "Home":
          if (!menuIsOpen) return;
          _this.focusOption("first");
          break;

         case "End":
          if (!menuIsOpen) return;
          _this.focusOption("last");
          break;

         default:
          return;
        }
        event.preventDefault();
      }
    }, _this.buildMenuOptions = function(props, selectValue) {
      var _props$inputValue = props.inputValue, inputValue = void 0 === _props$inputValue ? "" : _props$inputValue, options = props.options, toOption = function(option, id) {
        var isDisabled = _this.isOptionDisabled(option, selectValue), isSelected = _this.isOptionSelected(option, selectValue), label = _this.getOptionLabel(option), value = _this.getOptionValue(option);
        if (!(_this.shouldHideSelectedOptions() && isSelected || !_this.filterOption({
          label: label,
          value: value,
          data: option
        }, inputValue))) {
          var onHover = isDisabled ? void 0 : function() {
            return _this.onOptionHover(option);
          }, onSelect = isDisabled ? void 0 : function() {
            return _this.selectOption(option);
          }, optionId = "".concat(_this.getElementId("option"), "-").concat(id);
          return {
            innerProps: {
              id: optionId,
              onClick: onSelect,
              onMouseMove: onHover,
              onMouseOver: onHover,
              tabIndex: -1
            },
            data: option,
            isDisabled: isDisabled,
            isSelected: isSelected,
            key: optionId,
            label: label,
            type: "option",
            value: value
          };
        }
      };
      return options.reduce((function(acc, item, itemIndex) {
        if (item.options) {
          _this.hasGroups || (_this.hasGroups = !0);
          var children = item.options.map((function(child, i) {
            var option = toOption(child, "".concat(itemIndex, "-").concat(i));
            return option && acc.focusable.push(child), option;
          })).filter(Boolean);
          if (children.length) {
            var groupId = "".concat(_this.getElementId("group"), "-").concat(itemIndex);
            acc.render.push({
              type: "group",
              key: groupId,
              data: item,
              options: children
            });
          }
        } else {
          var option = toOption(item, "".concat(itemIndex));
          option && (acc.render.push(option), acc.focusable.push(item));
        }
        return acc;
      }), {
        render: [],
        focusable: []
      });
    };
    var _value = _props.value;
    _this.cacheComponents = memoizeOne(_this.cacheComponents, index.exportedEqual).bind(_assertThisInitialized(_this)), 
    _this.cacheComponents(_props.components), _this.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId);
    var _selectValue = index.cleanValue(_value);
    _this.buildMenuOptions = memoizeOne(_this.buildMenuOptions, (function(newArgs, lastArgs) {
      var _ref7 = _slicedToArray(newArgs, 2), newProps = _ref7[0], newSelectValue = _ref7[1], _ref9 = _slicedToArray(lastArgs, 2), lastProps = _ref9[0], lastSelectValue = _ref9[1];
      return index.exportedEqual(newSelectValue, lastSelectValue) && index.exportedEqual(newProps.inputValue, lastProps.inputValue) && index.exportedEqual(newProps.options, lastProps.options);
    })).bind(_assertThisInitialized(_this));
    var _menuOptions = _props.menuIsOpen ? _this.buildMenuOptions(_props, _selectValue) : {
      render: [],
      focusable: []
    };
    return _this.state.menuOptions = _menuOptions, _this.state.selectValue = _selectValue, 
    _this;
  }
  return _createClass(Select, [ {
    key: "componentDidMount",
    value: function() {
      this.startListeningComposition(), this.startListeningToTouch(), this.props.closeMenuOnScroll && document && document.addEventListener && document.addEventListener("scroll", this.onScroll, !0), 
      this.props.autoFocus && this.focusInput();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function(nextProps) {
      var _this$props8 = this.props, options = _this$props8.options, value = _this$props8.value, menuIsOpen = _this$props8.menuIsOpen, inputValue = _this$props8.inputValue;
      if (this.cacheComponents(nextProps.components), nextProps.value !== value || nextProps.options !== options || nextProps.menuIsOpen !== menuIsOpen || nextProps.inputValue !== inputValue) {
        var selectValue = index.cleanValue(nextProps.value), menuOptions = nextProps.menuIsOpen ? this.buildMenuOptions(nextProps, selectValue) : {
          render: [],
          focusable: []
        }, focusedValue = this.getNextFocusedValue(selectValue), focusedOption = this.getNextFocusedOption(menuOptions.focusable);
        this.setState({
          menuOptions: menuOptions,
          selectValue: selectValue,
          focusedOption: focusedOption,
          focusedValue: focusedValue
        });
      }
      null != this.inputIsHiddenAfterUpdate && (this.setState({
        inputIsHidden: this.inputIsHiddenAfterUpdate
      }), delete this.inputIsHiddenAfterUpdate);
    }
  }, {
    key: "componentDidUpdate",
    value: function(prevProps) {
      var _this$props9 = this.props, isDisabled = _this$props9.isDisabled, menuIsOpen = _this$props9.menuIsOpen, isFocused = this.state.isFocused;
      (isFocused && !isDisabled && prevProps.isDisabled || isFocused && menuIsOpen && !prevProps.menuIsOpen) && this.focusInput(), 
      this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && (index.scrollIntoView(this.menuListRef, this.focusedOptionRef), 
      this.scrollToFocusedOptionOnUpdate = !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, !0);
    }
  }, {
    key: "onMenuOpen",
    value: function() {
      var _this$props$value;
      this.props.keepCursorAtEnd && !this.props.isMulti && this.onInputChange(null === (_this$props$value = this.props.value) || void 0 === _this$props$value ? void 0 : _this$props$value.label, {
        action: "input-change"
      });
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function() {
      var _this$props10 = this.props, isSearchable = _this$props10.isSearchable, isMulti = _this$props10.isMulti;
      this.announceAriaLiveContext({
        event: "input",
        context: {
          isSearchable: isSearchable,
          isMulti: isMulti
        }
      }), this.onInputChange("", {
        action: "menu-close"
      }), this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }
  }, {
    key: "focusInput",
    value: function() {
      this.inputRef && this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function() {
      this.inputRef && this.inputRef.blur();
    }
  }, {
    key: "openMenu",
    value: function(focusOption) {
      var _this2 = this, _this$state3 = this.state, selectValue = _this$state3.selectValue, isFocused = _this$state3.isFocused, menuOptions = this.buildMenuOptions(this.props, selectValue), isMulti = this.props.isMulti, openAtIndex = "first" === focusOption ? 0 : menuOptions.focusable.length - 1;
      if (!isMulti) {
        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
        selectedIndex > -1 && (openAtIndex = selectedIndex);
      }
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef), this.inputIsHiddenAfterUpdate = !1, 
      this.setState({
        menuOptions: menuOptions,
        focusedValue: null,
        focusedOption: menuOptions.focusable[openAtIndex]
      }, (function() {
        _this2.onMenuOpen(), _this2.announceAriaLiveContext({
          event: "menu"
        });
      }));
    }
  }, {
    key: "focusValue",
    value: function(direction) {
      var _this$props11 = this.props, isMulti = _this$props11.isMulti, isSearchable = _this$props11.isSearchable, _this$state4 = this.state, selectValue = _this$state4.selectValue, focusedValue = _this$state4.focusedValue;
      if (isMulti) {
        this.setState({
          focusedOption: null
        });
        var focusedIndex = selectValue.indexOf(focusedValue);
        focusedValue || (focusedIndex = -1, this.announceAriaLiveContext({
          event: "value"
        }));
        var lastIndex = selectValue.length - 1, nextFocus = -1;
        if (selectValue.length) {
          switch (direction) {
           case "previous":
            nextFocus = 0 === focusedIndex ? 0 : -1 === focusedIndex ? lastIndex : focusedIndex - 1;
            break;

           case "next":
            focusedIndex > -1 && focusedIndex < lastIndex && (nextFocus = focusedIndex + 1);
          }
          -1 === nextFocus && this.announceAriaLiveContext({
            event: "input",
            context: {
              isSearchable: isSearchable,
              isMulti: isMulti
            }
          }), this.setState({
            inputIsHidden: -1 !== nextFocus,
            focusedValue: selectValue[nextFocus]
          });
        }
      }
    }
  }, {
    key: "focusOption",
    value: function() {
      var direction = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "first", pageSize = this.props.pageSize, _this$state5 = this.state, focusedOption = _this$state5.focusedOption, menuOptions = _this$state5.menuOptions, options = menuOptions.focusable;
      if (options.length) {
        var nextFocus = 0, focusedIndex = options.indexOf(focusedOption);
        focusedOption || (focusedIndex = -1, this.announceAriaLiveContext({
          event: "menu"
        })), "up" === direction ? nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1 : "down" === direction ? nextFocus = (focusedIndex + 1) % options.length : "pageup" === direction ? (nextFocus = focusedIndex - pageSize) < 0 && (nextFocus = 0) : "pagedown" === direction ? (nextFocus = focusedIndex + pageSize) > options.length - 1 && (nextFocus = options.length - 1) : "last" === direction && (nextFocus = options.length - 1), 
        this.scrollToFocusedOptionOnUpdate = !0, this.setState({
          focusedOption: options[nextFocus],
          focusedValue: null
        }), this.announceAriaLiveContext({
          event: "menu",
          context: {
            isDisabled: isOptionDisabled(options[nextFocus])
          }
        });
      }
    }
  }, {
    key: "getTheme",
    value: function() {
      return this.props.theme ? "function" == typeof this.props.theme ? this.props.theme(defaultTheme) : _objectSpread$2(_objectSpread$2({}, defaultTheme), this.props.theme) : defaultTheme;
    }
  }, {
    key: "getCommonProps",
    value: function() {
      var clearValue = this.clearValue, getStyles = this.getStyles, setValue = this.setValue, selectOption = this.selectOption, props = this.props, classNamePrefix = props.classNamePrefix, isMulti = props.isMulti, isRtl = props.isRtl, options = props.options, selectValue = this.state.selectValue, hasValue = this.hasValue();
      return {
        cx: index.classNames.bind(null, classNamePrefix),
        clearValue: clearValue,
        getStyles: getStyles,
        getValue: function() {
          return selectValue;
        },
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        setValue: setValue,
        selectProps: props,
        theme: this.getTheme()
      };
    }
  }, {
    key: "getNextFocusedValue",
    value: function(nextSelectValue) {
      if (this.clearFocusValueOnUpdate) return this.clearFocusValueOnUpdate = !1, null;
      var _this$state6 = this.state, focusedValue = _this$state6.focusedValue, lastFocusedIndex = _this$state6.selectValue.indexOf(focusedValue);
      if (lastFocusedIndex > -1) {
        if (nextSelectValue.indexOf(focusedValue) > -1) return focusedValue;
        if (lastFocusedIndex < nextSelectValue.length) return nextSelectValue[lastFocusedIndex];
      }
      return null;
    }
  }, {
    key: "getNextFocusedOption",
    value: function(options) {
      var lastFocusedOption = this.state.focusedOption;
      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
    }
  }, {
    key: "hasValue",
    value: function() {
      return this.state.selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function() {
      return !!this.state.menuOptions.render.length;
    }
  }, {
    key: "countOptions",
    value: function() {
      return this.state.menuOptions.focusable.length;
    }
  }, {
    key: "isClearable",
    value: function() {
      var _this$props12 = this.props, isClearable = _this$props12.isClearable, isMulti = _this$props12.isMulti;
      return void 0 === isClearable ? isMulti : isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function(option, selectValue) {
      return "function" == typeof this.props.isOptionDisabled && this.props.isOptionDisabled(option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function(option, selectValue) {
      var _this3 = this;
      if (selectValue.indexOf(option) > -1) return !0;
      if ("function" == typeof this.props.isOptionSelected) return this.props.isOptionSelected(option, selectValue);
      var candidate = this.getOptionValue(option);
      return selectValue.some((function(i) {
        return _this3.getOptionValue(i) === candidate;
      }));
    }
  }, {
    key: "filterOption",
    value: function(option, inputValue) {
      return !this.props.filterOption || this.props.filterOption(option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function(data, context) {
      if ("function" == typeof this.props.formatOptionLabel) {
        var inputValue = this.props.inputValue, selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: inputValue,
          selectValue: selectValue
        });
      }
      return this.getOptionLabel(data);
    }
  }, {
    key: "formatGroupLabel",
    value: function(data) {
      return this.props.formatGroupLabel(data);
    }
  }, {
    key: "startListeningComposition",
    value: function() {
      document && document.addEventListener && (document.addEventListener("compositionstart", this.onCompositionStart, !1), 
      document.addEventListener("compositionend", this.onCompositionEnd, !1));
    }
  }, {
    key: "stopListeningComposition",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("compositionstart", this.onCompositionStart), 
      document.removeEventListener("compositionend", this.onCompositionEnd));
    }
  }, {
    key: "startListeningToTouch",
    value: function() {
      document && document.addEventListener && (document.addEventListener("touchstart", this.onTouchStart, !1), 
      document.addEventListener("touchmove", this.onTouchMove, !1), document.addEventListener("touchend", this.onTouchEnd, !1));
    }
  }, {
    key: "stopListeningToTouch",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("touchstart", this.onTouchStart), 
      document.removeEventListener("touchmove", this.onTouchMove), document.removeEventListener("touchend", this.onTouchEnd));
    }
  }, {
    key: "constructAriaLiveMessage",
    value: function() {
      var _this$state7 = this.state, ariaLiveContext = _this$state7.ariaLiveContext, selectValue = _this$state7.selectValue, focusedValue = _this$state7.focusedValue, focusedOption = _this$state7.focusedOption, _this$props13 = this.props, options = _this$props13.options, menuIsOpen = _this$props13.menuIsOpen, inputValue = _this$props13.inputValue, screenReaderStatus = _this$props13.screenReaderStatus, focusedValueMsg = focusedValue ? valueFocusAriaMessage({
        focusedValue: focusedValue,
        getOptionLabel: this.getOptionLabel,
        selectValue: selectValue
      }) : "", focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
        focusedOption: focusedOption,
        getOptionLabel: this.getOptionLabel,
        options: options
      }) : "", resultsMsg = resultsAriaMessage({
        inputValue: inputValue,
        screenReaderMessage: screenReaderStatus({
          count: this.countOptions()
        })
      });
      return "".concat(focusedValueMsg, " ").concat(focusedOptionMsg, " ").concat(resultsMsg, " ").concat(ariaLiveContext);
    }
  }, {
    key: "renderInput",
    value: function() {
      var _this$props14 = this.props, isDisabled = _this$props14.isDisabled, isSearchable = _this$props14.isSearchable, inputId = _this$props14.inputId, inputValue = _this$props14.inputValue, tabIndex = _this$props14.tabIndex, form = _this$props14.form, Input = this.components.Input, inputIsHidden = this.state.inputIsHidden, id = inputId || this.getElementId("input"), ariaAttributes = {
        "aria-autocomplete": "list",
        "aria-label": this.props["aria-label"],
        "aria-labelledby": this.props["aria-labelledby"]
      };
      if (!isSearchable) return React__default.createElement(DummyInput, _extends({
        id: id,
        innerRef: this.getInputRef,
        onBlur: this.onInputBlur,
        onChange: index.noop,
        onFocus: this.onInputFocus,
        readOnly: !0,
        disabled: isDisabled,
        tabIndex: tabIndex,
        form: form,
        value: ""
      }, ariaAttributes));
      var _this$commonProps = this.commonProps, cx = _this$commonProps.cx, theme = _this$commonProps.theme, selectProps = _this$commonProps.selectProps;
      return React__default.createElement(Input, _extends({
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        cx: cx,
        getStyles: this.getStyles,
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        selectProps: selectProps,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        theme: theme,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function() {
      var _this4 = this, _this$components = this.components, MultiValue = _this$components.MultiValue, MultiValueContainer = _this$components.MultiValueContainer, MultiValueLabel = _this$components.MultiValueLabel, MultiValueRemove = _this$components.MultiValueRemove, SingleValue = _this$components.SingleValue, Placeholder = _this$components.Placeholder, commonProps = this.commonProps, _this$props15 = this.props, controlShouldRenderValue = _this$props15.controlShouldRenderValue, isDisabled = _this$props15.isDisabled, isMulti = _this$props15.isMulti, inputValue = _this$props15.inputValue, placeholder = _this$props15.placeholder, _this$state8 = this.state, selectValue = _this$state8.selectValue, focusedValue = _this$state8.focusedValue, isFocused = _this$state8.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) return inputValue ? null : React__default.createElement(Placeholder, _extends({}, commonProps, {
        key: "placeholder",
        isDisabled: isDisabled,
        isFocused: isFocused
      }), placeholder);
      if (isMulti) return selectValue.map((function(opt, index) {
        var isOptionFocused = opt === focusedValue;
        return React__default.createElement(MultiValue, _extends({}, commonProps, {
          components: {
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove
          },
          isFocused: isOptionFocused,
          isDisabled: isDisabled,
          key: _this4.getOptionValue(opt),
          index: index,
          removeProps: {
            onClick: function() {
              return _this4.removeValue(opt);
            },
            onTouchEnd: function() {
              return _this4.removeValue(opt);
            },
            onMouseDown: function(e) {
              e.preventDefault(), e.stopPropagation();
            }
          },
          data: opt
        }), _this4.formatOptionLabel(opt, "value"));
      }));
      if (inputValue) return null;
      var singleValue = selectValue[0];
      return React__default.createElement(SingleValue, _extends({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, "value"));
    }
  }, {
    key: "renderClearIndicator",
    value: function() {
      var ClearIndicator = this.components.ClearIndicator, commonProps = this.commonProps, _this$props16 = this.props, isDisabled = _this$props16.isDisabled, isLoading = _this$props16.isLoading, isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) return null;
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return React__default.createElement(ClearIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function() {
      var LoadingIndicator = this.components.LoadingIndicator, commonProps = this.commonProps, _this$props17 = this.props, isDisabled = _this$props17.isDisabled, isLoading = _this$props17.isLoading, isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      return React__default.createElement(LoadingIndicator, _extends({}, commonProps, {
        innerProps: {
          "aria-hidden": "true"
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function() {
      var _this$components2 = this.components, DropdownIndicator = _this$components2.DropdownIndicator, IndicatorSeparator = _this$components2.IndicatorSeparator;
      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps, isDisabled = this.props.isDisabled, isFocused = this.state.isFocused;
      return React__default.createElement(IndicatorSeparator, _extends({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function() {
      var DropdownIndicator = this.components.DropdownIndicator;
      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps, isDisabled = this.props.isDisabled, isFocused = this.state.isFocused, innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return React__default.createElement(DropdownIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function() {
      var _this5 = this, _this$components3 = this.components, Group = _this$components3.Group, GroupHeading = _this$components3.GroupHeading, Menu = _this$components3.Menu, MenuList = _this$components3.MenuList, MenuPortal = _this$components3.MenuPortal, LoadingMessage = _this$components3.LoadingMessage, NoOptionsMessage = _this$components3.NoOptionsMessage, Option = _this$components3.Option, commonProps = this.commonProps, _this$state9 = this.state, focusedOption = _this$state9.focusedOption, menuOptions = _this$state9.menuOptions, _this$props18 = this.props, captureMenuScroll = _this$props18.captureMenuScroll, inputValue = _this$props18.inputValue, isLoading = _this$props18.isLoading, loadingMessage = _this$props18.loadingMessage, minMenuHeight = _this$props18.minMenuHeight, maxMenuHeight = _this$props18.maxMenuHeight, menuIsOpen = _this$props18.menuIsOpen, menuPlacement = _this$props18.menuPlacement, menuPosition = _this$props18.menuPosition, menuPortalTarget = _this$props18.menuPortalTarget, menuShouldBlockScroll = _this$props18.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView, noOptionsMessage = _this$props18.noOptionsMessage, onMenuScrollToTop = _this$props18.onMenuScrollToTop, onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
      if (!menuIsOpen) return null;
      var menuUI, render = function(props) {
        var isFocused = focusedOption === props.data;
        return props.innerRef = isFocused ? _this5.getFocusedOptionRef : void 0, React__default.createElement(Option, _extends({}, commonProps, props, {
          isFocused: isFocused
        }), _this5.formatOptionLabel(props.data, "menu"));
      };
      if (this.hasOptions()) menuUI = menuOptions.render.map((function(item) {
        if ("group" === item.type) {
          item.type;
          var group = _objectWithoutProperties(item, [ "type" ]), headingId = "".concat(item.key, "-heading");
          return React__default.createElement(Group, _extends({}, commonProps, group, {
            Heading: GroupHeading,
            headingProps: {
              id: headingId
            },
            label: _this5.formatGroupLabel(item.data)
          }), item.options.map((function(option) {
            return render(option);
          })));
        }
        if ("option" === item.type) return render(item);
      })); else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (null === message) return null;
        menuUI = React__default.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });
        if (null === _message) return null;
        menuUI = React__default.createElement(NoOptionsMessage, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      }, menuElement = React__default.createElement(index.MenuPlacer, _extends({}, commonProps, menuPlacementProps), (function(_ref10) {
        var ref = _ref10.ref, _ref10$placerProps = _ref10.placerProps, placement = _ref10$placerProps.placement, maxHeight = _ref10$placerProps.maxHeight;
        return React__default.createElement(Menu, _extends({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this5.onMenuMouseDown,
            onMouseMove: _this5.onMenuMouseMove
          },
          isLoading: isLoading,
          placement: placement
        }), React__default.createElement(ScrollCaptorSwitch, {
          isEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom
        }, React__default.createElement(ScrollBlock, {
          isEnabled: menuShouldBlockScroll
        }, React__default.createElement(MenuList, _extends({}, commonProps, {
          innerRef: _this5.getMenuListRef,
          isLoading: isLoading,
          maxHeight: maxHeight
        }), menuUI))));
      }));
      return menuPortalTarget || "fixed" === menuPosition ? React__default.createElement(MenuPortal, _extends({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function() {
      var _this6 = this, _this$props19 = this.props, delimiter = _this$props19.delimiter, isDisabled = _this$props19.isDisabled, isMulti = _this$props19.isMulti, name = _this$props19.name, selectValue = this.state.selectValue;
      if (name && !isDisabled) {
        if (isMulti) {
          if (delimiter) {
            var value = selectValue.map((function(opt) {
              return _this6.getOptionValue(opt);
            })).join(delimiter);
            return React__default.createElement("input", {
              name: name,
              type: "hidden",
              value: value
            });
          }
          var input = selectValue.length > 0 ? selectValue.map((function(opt, i) {
            return React__default.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this6.getOptionValue(opt)
            });
          })) : React__default.createElement("input", {
            name: name,
            type: "hidden"
          });
          return React__default.createElement("div", null, input);
        }
        var _value2 = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
        return React__default.createElement("input", {
          name: name,
          type: "hidden",
          value: _value2
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function() {
      return this.state.isFocused ? React__default.createElement(A11yText, {
        "aria-live": "polite"
      }, React__default.createElement("span", {
        id: "aria-selection-event"
      }, " ", this.state.ariaLiveSelection), React__default.createElement("span", {
        id: "aria-context"
      }, " ", this.constructAriaLiveMessage())) : null;
    }
  }, {
    key: "render",
    value: function() {
      var _this$components4 = this.components, Control = _this$components4.Control, IndicatorsContainer = _this$components4.IndicatorsContainer, SelectContainer = _this$components4.SelectContainer, ValueContainer = _this$components4.ValueContainer, _this$props20 = this.props, className = _this$props20.className, id = _this$props20.id, isDisabled = _this$props20.isDisabled, menuIsOpen = _this$props20.menuIsOpen, isFocused = this.state.isFocused, commonProps = this.commonProps = this.getCommonProps();
      return React__default.createElement(SelectContainer, _extends({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), React__default.createElement(Control, _extends({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), React__default.createElement(ValueContainer, _extends({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), React__default.createElement(IndicatorsContainer, _extends({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  } ]), Select;
}(React.Component);

Select.defaultProps = defaultProps, exports.Select = Select, exports.createFilter = createFilter, 
exports.defaultProps = defaultProps, exports.defaultTheme = defaultTheme, exports.mergeStyles = mergeStyles;
