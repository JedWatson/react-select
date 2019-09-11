"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

var _objectWithoutProperties = _interopDefault(require("@babel/runtime/helpers/objectWithoutProperties")), _extends = _interopDefault(require("@babel/runtime/helpers/extends")), _toConsumableArray = _interopDefault(require("@babel/runtime/helpers/toConsumableArray")), _objectSpread = _interopDefault(require("@babel/runtime/helpers/objectSpread")), _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), React = require("react"), React__default = _interopDefault(React), memoizeOne = _interopDefault(require("memoize-one")), core = require("@emotion/core"), reactDom = require("react-dom"), __chunk_1 = require("../../chunk-c9662232.cjs.prod.js"), __chunk_2 = require("../../chunk-5b70513c.cjs.prod.js"), _css = _interopDefault(require("@emotion/css")), diacritics = [ {
  base: "A",
  letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
}, {
  base: "AA",
  letters: /[\uA732]/g
}, {
  base: "AE",
  letters: /[\u00C6\u01FC\u01E2]/g
}, {
  base: "AO",
  letters: /[\uA734]/g
}, {
  base: "AU",
  letters: /[\uA736]/g
}, {
  base: "AV",
  letters: /[\uA738\uA73A]/g
}, {
  base: "AY",
  letters: /[\uA73C]/g
}, {
  base: "B",
  letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
}, {
  base: "C",
  letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
}, {
  base: "D",
  letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
}, {
  base: "DZ",
  letters: /[\u01F1\u01C4]/g
}, {
  base: "Dz",
  letters: /[\u01F2\u01C5]/g
}, {
  base: "E",
  letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
}, {
  base: "F",
  letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
}, {
  base: "G",
  letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
}, {
  base: "H",
  letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
}, {
  base: "I",
  letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
}, {
  base: "J",
  letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
}, {
  base: "K",
  letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
}, {
  base: "L",
  letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
}, {
  base: "LJ",
  letters: /[\u01C7]/g
}, {
  base: "Lj",
  letters: /[\u01C8]/g
}, {
  base: "M",
  letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
}, {
  base: "N",
  letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
}, {
  base: "NJ",
  letters: /[\u01CA]/g
}, {
  base: "Nj",
  letters: /[\u01CB]/g
}, {
  base: "O",
  letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
}, {
  base: "OI",
  letters: /[\u01A2]/g
}, {
  base: "OO",
  letters: /[\uA74E]/g
}, {
  base: "OU",
  letters: /[\u0222]/g
}, {
  base: "P",
  letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
}, {
  base: "Q",
  letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
}, {
  base: "R",
  letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
}, {
  base: "S",
  letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
}, {
  base: "T",
  letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
}, {
  base: "TZ",
  letters: /[\uA728]/g
}, {
  base: "U",
  letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
}, {
  base: "V",
  letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
}, {
  base: "VY",
  letters: /[\uA760]/g
}, {
  base: "W",
  letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
}, {
  base: "X",
  letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
}, {
  base: "Y",
  letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
}, {
  base: "Z",
  letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
}, {
  base: "a",
  letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
}, {
  base: "aa",
  letters: /[\uA733]/g
}, {
  base: "ae",
  letters: /[\u00E6\u01FD\u01E3]/g
}, {
  base: "ao",
  letters: /[\uA735]/g
}, {
  base: "au",
  letters: /[\uA737]/g
}, {
  base: "av",
  letters: /[\uA739\uA73B]/g
}, {
  base: "ay",
  letters: /[\uA73D]/g
}, {
  base: "b",
  letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
}, {
  base: "c",
  letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
}, {
  base: "d",
  letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
}, {
  base: "dz",
  letters: /[\u01F3\u01C6]/g
}, {
  base: "e",
  letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
}, {
  base: "f",
  letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
}, {
  base: "g",
  letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
}, {
  base: "h",
  letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
}, {
  base: "hv",
  letters: /[\u0195]/g
}, {
  base: "i",
  letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
}, {
  base: "j",
  letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
}, {
  base: "k",
  letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
}, {
  base: "l",
  letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
}, {
  base: "lj",
  letters: /[\u01C9]/g
}, {
  base: "m",
  letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
}, {
  base: "n",
  letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
}, {
  base: "nj",
  letters: /[\u01CC]/g
}, {
  base: "o",
  letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
}, {
  base: "oi",
  letters: /[\u01A3]/g
}, {
  base: "ou",
  letters: /[\u0223]/g
}, {
  base: "oo",
  letters: /[\uA74F]/g
}, {
  base: "p",
  letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
}, {
  base: "q",
  letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
}, {
  base: "r",
  letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
}, {
  base: "s",
  letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
}, {
  base: "t",
  letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
}, {
  base: "tz",
  letters: /[\uA729]/g
}, {
  base: "u",
  letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
}, {
  base: "v",
  letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
}, {
  base: "vy",
  letters: /[\uA761]/g
}, {
  base: "w",
  letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
}, {
  base: "x",
  letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
}, {
  base: "y",
  letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
}, {
  base: "z",
  letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
} ], stripDiacritics = function(str) {
  for (var i = 0; i < diacritics.length; i++) str = str.replace(diacritics[i].letters, diacritics[i].base);
  return str;
}, trimString = function(str) {
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
}, DummyInput = function(_Component) {
  function DummyInput() {
    return _classCallCheck(this, DummyInput), _possibleConstructorReturn(this, _getPrototypeOf(DummyInput).apply(this, arguments));
  }
  return _inherits(DummyInput, _Component), _createClass(DummyInput, [ {
    key: "render",
    value: function() {
      var _this$props = this.props, innerRef = (_this$props.in, _this$props.out, _this$props.onExited, 
      _this$props.appear, _this$props.enter, _this$props.exit, _this$props.innerRef), props = (_this$props.emotion, 
      _objectWithoutProperties(_this$props, [ "in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion" ]));
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
  } ]), DummyInput;
}(React.Component), NodeResolver = function(_Component) {
  function NodeResolver() {
    return _classCallCheck(this, NodeResolver), _possibleConstructorReturn(this, _getPrototypeOf(NodeResolver).apply(this, arguments));
  }
  return _inherits(NodeResolver, _Component), _createClass(NodeResolver, [ {
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

var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), activeScrollLocks = 0, ScrollLock = function(_Component) {
  function ScrollLock() {
    var _getPrototypeOf2, _this;
    _classCallCheck(this, ScrollLock);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollLock)).call.apply(_getPrototypeOf2, [ this ].concat(args))), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalStyles", {}), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listenerOptions", {
      capture: !1,
      passive: !1
    }), _this;
  }
  return _inherits(ScrollLock, _Component), _createClass(ScrollLock, [ {
    key: "componentDidMount",
    value: function() {
      var _this2 = this;
      if (canUseDOM) {
        var _this$props = this.props, accountForScrollbars = _this$props.accountForScrollbars, touchScrollTarget = _this$props.touchScrollTarget, target = document.body, targetStyle = target && target.style;
        if (accountForScrollbars && STYLE_KEYS.forEach(function(key) {
          var val = targetStyle && targetStyle[key];
          _this2.originalStyles[key] = val;
        }), accountForScrollbars && activeScrollLocks < 1) {
          var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0, clientWidth = document.body ? document.body.clientWidth : 0, adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
          Object.keys(LOCK_STYLES).forEach(function(key) {
            var val = LOCK_STYLES[key];
            targetStyle && (targetStyle[key] = val);
          }), targetStyle && (targetStyle.paddingRight = "".concat(adjustedPadding, "px"));
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
        activeScrollLocks = Math.max(activeScrollLocks - 1, 0), accountForScrollbars && activeScrollLocks < 1 && STYLE_KEYS.forEach(function(key) {
          var val = _this3.originalStyles[key];
          targetStyle && (targetStyle[key] = val);
        }), target && isTouchDevice() && (target.removeEventListener("touchmove", preventTouchMove, this.listenerOptions), 
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

_defineProperty(ScrollLock, "defaultProps", {
  accountForScrollbars: !0
});

var _ref$1 = {
  name: "1dsbpcp",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;"
}, ScrollBlock = function(_PureComponent) {
  function ScrollBlock() {
    var _getPrototypeOf2, _this;
    _classCallCheck(this, ScrollBlock);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollBlock)).call.apply(_getPrototypeOf2, [ this ].concat(args))), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      touchScrollTarget: null
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function(ref) {
      ref !== _this.state.touchScrollTarget && _this.setState({
        touchScrollTarget: ref
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurSelectInput", function() {
      document.activeElement && document.activeElement.blur();
    }), _this;
  }
  return _inherits(ScrollBlock, _PureComponent), _createClass(ScrollBlock, [ {
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
}(React.PureComponent), ScrollCaptor = function(_Component) {
  function ScrollCaptor() {
    var _getPrototypeOf2, _this;
    _classCallCheck(this, ScrollCaptor);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollCaptor)).call.apply(_getPrototypeOf2, [ this ].concat(args))), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBottom", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isTop", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "reachedOffset", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTarget", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "touchStart", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancelScroll", function(event) {
      event.preventDefault(), event.stopPropagation();
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEventDelta", function(event, delta) {
      var _this$props = _this.props, onBottomArrive = _this$props.onBottomArrive, onBottomLeave = _this$props.onBottomLeave, onTopArrive = _this$props.onTopArrive, onTopLeave = _this$props.onTopLeave, _this$props$scrollOff = _this$props.scrollOffset, scrollOffset = void 0 === _this$props$scrollOff ? 0 : _this$props$scrollOff, _this$scrollTarget = _this.scrollTarget, scrollTop = _this$scrollTarget.scrollTop, scrollHeight = _this$scrollTarget.scrollHeight, clientHeight = _this$scrollTarget.clientHeight, target = _this.scrollTarget, isDeltaPositive = delta > 0, availableScroll = scrollHeight - clientHeight - scrollTop, shouldCancelScroll = !1;
      availableScroll > delta && _this.isBottom && (onBottomLeave && onBottomLeave(event), 
      _this.isBottom = !1), isDeltaPositive && _this.isTop && (onTopLeave && onTopLeave(event), 
      _this.isTop = !1), availableScroll - scrollOffset > delta && _this.reachedOffset && (_this.reachedOffset = !1), 
      scrollOffset && isDeltaPositive && delta > availableScroll - scrollOffset && (!onBottomArrive || _this.isBottom || _this.reachedOffset || (onBottomArrive(event), 
      _this.reachedOffset = !0)), isDeltaPositive && delta > availableScroll ? (!onBottomArrive || _this.isBottom || scrollOffset || onBottomArrive(event), 
      target.scrollTop = scrollHeight, shouldCancelScroll = !0, _this.isBottom = !0) : !isDeltaPositive && -delta > scrollTop && (onTopArrive && !_this.isTop && onTopArrive(event), 
      target.scrollTop = 0, shouldCancelScroll = !0, _this.isTop = !0), shouldCancelScroll && _this.cancelScroll(event);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function(event) {
      _this.handleEventDelta(event, event.deltaY);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function(event) {
      _this.touchStart = event.changedTouches[0].clientY;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function(event) {
      var deltaY = _this.touchStart - event.changedTouches[0].clientY;
      _this.handleEventDelta(event, deltaY);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function(ref) {
      _this.scrollTarget = ref;
    }), _this;
  }
  return _inherits(ScrollCaptor, _Component), _createClass(ScrollCaptor, [ {
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
      el && (el.scrollHeight <= el.clientHeight || ("function" == typeof el.addEventListener && el.addEventListener("wheel", this.onWheel, !1), 
      "function" == typeof el.addEventListener && el.addEventListener("touchstart", this.onTouchStart, !1), 
      "function" == typeof el.addEventListener && el.addEventListener("touchmove", this.onTouchMove, !1)));
    }
  }, {
    key: "stopListening",
    value: function(el) {
      el.scrollHeight <= el.clientHeight || ("function" == typeof el.removeEventListener && el.removeEventListener("wheel", this.onWheel, !1), 
      "function" == typeof el.removeEventListener && el.removeEventListener("touchstart", this.onTouchStart, !1), 
      "function" == typeof el.removeEventListener && el.removeEventListener("touchmove", this.onTouchMove, !1));
    }
  }, {
    key: "render",
    value: function() {
      return React__default.createElement(NodeResolver, {
        innerRef: this.getScrollTarget
      }, this.props.children);
    }
  } ]), ScrollCaptor;
}(React.Component), ScrollCaptorSwitch = function(_Component2) {
  function ScrollCaptorSwitch() {
    return _classCallCheck(this, ScrollCaptorSwitch), _possibleConstructorReturn(this, _getPrototypeOf(ScrollCaptorSwitch).apply(this, arguments));
  }
  return _inherits(ScrollCaptorSwitch, _Component2), _createClass(ScrollCaptorSwitch, [ {
    key: "render",
    value: function() {
      var _this$props2 = this.props, isEnabled = _this$props2.isEnabled, props = _objectWithoutProperties(_this$props2, [ "isEnabled" ]);
      return isEnabled ? React__default.createElement(ScrollCaptor, props) : this.props.children;
    }
  } ]), ScrollCaptorSwitch;
}(React.Component);

_defineProperty(ScrollCaptorSwitch, "defaultProps", {
  isEnabled: !0
});

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
}, defaultStyles = {
  clearIndicator: __chunk_2.clearIndicatorCSS,
  container: __chunk_2.containerCSS,
  control: __chunk_2.css,
  dropdownIndicator: __chunk_2.dropdownIndicatorCSS,
  group: __chunk_2.groupCSS,
  groupHeading: __chunk_2.groupHeadingCSS,
  indicatorsContainer: __chunk_2.indicatorsContainerCSS,
  indicatorSeparator: __chunk_2.indicatorSeparatorCSS,
  input: __chunk_2.inputCSS,
  loadingIndicator: __chunk_2.loadingIndicatorCSS,
  loadingMessage: __chunk_2.loadingMessageCSS,
  menu: __chunk_2.menuCSS,
  menuList: __chunk_2.menuListCSS,
  menuPortal: __chunk_2.menuPortalCSS,
  multiValue: __chunk_2.multiValueCSS,
  multiValueLabel: __chunk_2.multiValueLabelCSS,
  multiValueRemove: __chunk_2.multiValueRemoveCSS,
  noOptionsMessage: __chunk_2.noOptionsMessageCSS,
  option: __chunk_2.optionCSS,
  placeholder: __chunk_2.placeholderCSS,
  singleValue: __chunk_2.css$1,
  valueContainer: __chunk_2.valueContainerCSS
};

function mergeStyles(source) {
  var target = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, styles = _objectSpread({}, source);
  return Object.keys(target).forEach(function(key) {
    source[key] ? styles[key] = function(rsCss, props) {
      return target[key](source[key](rsCss, props), props);
    } : styles[key] = target[key];
  }), styles;
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
}, defaultProps = {
  backspaceRemovesValue: !0,
  blurInputOnSelect: __chunk_1.isTouchCapable(),
  captureMenuScroll: !__chunk_1.isTouchCapable(),
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
  menuShouldScrollIntoView: !__chunk_1.isMobileDevice(),
  noOptionsMessage: function() {
    return "No options";
  },
  onMenuScrollToBottomOffset: 0,
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
  function Select(_props) {
    var _this;
    _classCallCheck(this, Select), _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props)), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
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
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockOptionHover", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isComposing", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFocusValueOnUpdate", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commonProps", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "components", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasGroups", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchX", 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchY", 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputIsHiddenAfterUpdate", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "instancePrefix", ""), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openAfterFocus", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToFocusedOptionOnUpdate", !1), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsDragging", void 0), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "controlRef", null), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getControlRef", function(ref) {
      _this.controlRef = ref;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusedOptionRef", null), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFocusedOptionRef", function(ref) {
      _this.focusedOptionRef = ref;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "menuListRef", null), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuListRef", function(ref) {
      _this.menuListRef = ref;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", null), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInputRef", function(ref) {
      _this.inputRef = ref;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function(components) {
      _this.components = __chunk_2.defaultComponents({
        components: components
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", _this.focusInput), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blur", _this.blurInput), 
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function(newValue, actionMeta) {
      var _this$props = _this.props, onChange = _this$props.onChange, name = _this$props.name;
      onChange(newValue, _objectSpread({}, actionMeta, {
        name: name
      }));
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function(newValue) {
      var action = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "set-value", option = arguments.length > 2 ? arguments[2] : void 0, _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti;
      _this.onInputChange("", {
        action: "set-value"
      }), closeMenuOnSelect && (_this.inputIsHiddenAfterUpdate = !isMulti, _this.onMenuClose()), 
      _this.clearFocusValueOnUpdate = !0, _this.onChange(newValue, {
        action: action,
        option: option
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function(newValue) {
      var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, selectValue = _this.state.selectValue;
      if (isMulti) if (_this.isOptionSelected(newValue, selectValue)) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue(selectValue.filter(function(i) {
          return _this.getOptionValue(i) !== candidate;
        }), "deselect-option", newValue), _this.announceAriaLiveSelection({
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
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeValue", function(removedValue) {
      var selectValue = _this.state.selectValue, candidate = _this.getOptionValue(removedValue), newValue = selectValue.filter(function(i) {
        return _this.getOptionValue(i) !== candidate;
      });
      _this.onChange(newValue.length ? newValue : null, {
        action: "remove-value",
        removedValue: removedValue
      }), _this.announceAriaLiveSelection({
        event: "remove-value",
        context: {
          value: removedValue ? _this.getOptionLabel(removedValue) : ""
        }
      }), _this.focusInput();
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function() {
      var isMulti = _this.props.isMulti;
      _this.onChange(isMulti ? [] : null, {
        action: "clear"
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popValue", function() {
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
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionLabel", function(data) {
      return _this.props.getOptionLabel(data);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionValue", function(data) {
      return _this.props.getOptionValue(data);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyles", function(key, props) {
      var base = defaultStyles[key](props);
      base.boxSizing = "border-box";
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementId", function(element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getActiveDescendentId", function() {
      var menuIsOpen = _this.props.menuIsOpen, _this$state = _this.state, menuOptions = _this$state.menuOptions, focusedOption = _this$state.focusedOption;
      if (focusedOption && menuIsOpen) {
        var index = menuOptions.focusable.indexOf(focusedOption), option = menuOptions.render[index];
        return option && option.key;
      }
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveSelection", function(_ref2) {
      var event = _ref2.event, context = _ref2.context;
      _this.setState({
        ariaLiveSelection: valueEventAriaMessage(event, context)
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveContext", function(_ref3) {
      var event = _ref3.event, context = _ref3.context;
      _this.setState({
        ariaLiveContext: instructionsAriaMessage(event, _objectSpread({}, context, {
          label: _this.props["aria-label"]
        }))
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseDown", function(event) {
      0 === event.button && (event.stopPropagation(), event.preventDefault(), _this.focusInput());
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseMove", function(event) {
      _this.blockOptionHover = !1;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlMouseDown", function(event) {
      var openMenuOnClick = _this.props.openMenuOnClick;
      _this.state.isFocused ? _this.props.menuIsOpen ? "INPUT" !== event.target.tagName && _this.onMenuClose() : openMenuOnClick && _this.openMenu("first") : (openMenuOnClick && (_this.openAfterFocus = !0), 
      _this.focusInput()), "INPUT" !== event.target.tagName && event.preventDefault();
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorMouseDown", function(event) {
      if (!(event && "mousedown" === event.type && 0 !== event.button || _this.props.isDisabled)) {
        var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
        _this.focusInput(), menuIsOpen ? (_this.inputIsHiddenAfterUpdate = !isMulti, _this.onMenuClose()) : _this.openMenu("first"), 
        event.preventDefault(), event.stopPropagation();
      }
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorMouseDown", function(event) {
      event && "mousedown" === event.type && 0 !== event.button || (_this.clearValue(), 
      event.stopPropagation(), _this.openAfterFocus = !1, "touchend" === event.type ? _this.focusInput() : setTimeout(function() {
        return _this.focusInput();
      }));
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function(event) {
      "boolean" == typeof _this.props.closeMenuOnScroll ? event.target instanceof HTMLElement && __chunk_1.isDocumentElement(event.target) && _this.props.onMenuClose() : "function" == typeof _this.props.closeMenuOnScroll && _this.props.closeMenuOnScroll(event) && _this.props.onMenuClose();
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionStart", function() {
      _this.isComposing = !0;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionEnd", function() {
      _this.isComposing = !1;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function(_ref4) {
      var touch = _ref4.touches.item(0);
      touch && (_this.initialTouchX = touch.clientX, _this.initialTouchY = touch.clientY, 
      _this.userIsDragging = !1);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function(_ref5) {
      var touch = _ref5.touches.item(0);
      if (touch) {
        var deltaX = Math.abs(touch.clientX - _this.initialTouchX), deltaY = Math.abs(touch.clientY - _this.initialTouchY);
        _this.userIsDragging = deltaX > 5 || deltaY > 5;
      }
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchEnd", function(event) {
      _this.userIsDragging || (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target) && _this.blurInput(), 
      _this.initialTouchX = 0, _this.initialTouchY = 0);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlTouchEnd", function(event) {
      _this.userIsDragging || _this.onControlMouseDown(event);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorTouchEnd", function(event) {
      _this.userIsDragging || _this.onClearIndicatorMouseDown(event);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorTouchEnd", function(event) {
      _this.userIsDragging || _this.onDropdownIndicatorMouseDown(event);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function(event) {
      var inputValue = event.currentTarget.value;
      _this.inputIsHiddenAfterUpdate = !1, _this.onInputChange(inputValue, {
        action: "input-change"
      }), _this.onMenuOpen();
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputFocus", function(event) {
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
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputBlur", function(event) {
      _this.menuListRef && _this.menuListRef.contains(document.activeElement) ? _this.inputRef.focus() : (_this.props.onBlur && _this.props.onBlur(event), 
      _this.onInputChange("", {
        action: "input-blur"
      }), _this.onMenuClose(), _this.setState({
        focusedValue: null,
        isFocused: !1
      }));
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOptionHover", function(focusedOption) {
      _this.blockOptionHover || _this.state.focusedOption === focusedOption || _this.setState({
        focusedOption: focusedOption
      });
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldHideSelectedOptions", function() {
      var _this$props6 = _this.props, hideSelectedOptions = _this$props6.hideSelectedOptions, isMulti = _this$props6.isMulti;
      return void 0 === hideSelectedOptions ? isMulti : hideSelectedOptions;
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function(event) {
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
    });
    var value = _props.value;
    _this.cacheComponents = memoizeOne(_this.cacheComponents, __chunk_2.exportedEqual).bind(_assertThisInitialized(_assertThisInitialized(_this))), 
    _this.cacheComponents(_props.components), _this.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId);
    var _selectValue = __chunk_1.cleanValue(value), _menuOptions = _props.menuIsOpen ? _this.buildMenuOptions(_props, _selectValue) : {
      render: [],
      focusable: []
    };
    return _this.state.menuOptions = _menuOptions, _this.state.selectValue = _selectValue, 
    _this;
  }
  return _inherits(Select, _Component), _createClass(Select, [ {
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
        var selectValue = __chunk_1.cleanValue(nextProps.value), menuOptions = nextProps.menuIsOpen ? this.buildMenuOptions(nextProps, selectValue) : {
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
      this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && __chunk_1.scrollIntoView(this.menuListRef, this.focusedOptionRef), 
      this.scrollToFocusedOptionOnUpdate = !1;
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, !0);
    }
  }, {
    key: "onMenuOpen",
    value: function() {
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
      var _this$state3 = this.state, menuOptions = _this$state3.menuOptions, selectValue = _this$state3.selectValue, isFocused = _this$state3.isFocused, isMulti = this.props.isMulti, openAtIndex = "first" === focusOption ? 0 : menuOptions.focusable.length - 1;
      if (!isMulti) {
        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
        selectedIndex > -1 && (openAtIndex = selectedIndex);
      }
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef), this.inputIsHiddenAfterUpdate = !1, 
      this.onMenuOpen(), this.setState({
        focusedValue: null,
        focusedOption: menuOptions.focusable[openAtIndex]
      }), this.announceAriaLiveContext({
        event: "menu"
      });
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
      var direction = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "first", pageSize = this.props.pageSize, _this$state5 = this.state, focusedOption = _this$state5.focusedOption, options = _this$state5.menuOptions.focusable;
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
      return this.props.theme ? "function" == typeof this.props.theme ? this.props.theme(defaultTheme) : _objectSpread({}, defaultTheme, this.props.theme) : defaultTheme;
    }
  }, {
    key: "getCommonProps",
    value: function() {
      var clearValue = this.clearValue, getStyles = this.getStyles, setValue = this.setValue, selectOption = this.selectOption, props = this.props, classNamePrefix = props.classNamePrefix, isMulti = props.isMulti, isRtl = props.isRtl, options = props.options, selectValue = this.state.selectValue, hasValue = this.hasValue();
      return {
        cx: __chunk_1.classNames.bind(null, classNamePrefix),
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
      var _this2 = this;
      if (selectValue.indexOf(option) > -1) return !0;
      if ("function" == typeof this.props.isOptionSelected) return this.props.isOptionSelected(option, selectValue);
      var candidate = this.getOptionValue(option);
      return selectValue.some(function(i) {
        return _this2.getOptionValue(i) === candidate;
      });
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
    key: "buildMenuOptions",
    value: function(props, selectValue) {
      var _this3 = this, _props$inputValue = props.inputValue, inputValue = void 0 === _props$inputValue ? "" : _props$inputValue, options = props.options, toOption = function(option, id) {
        var isDisabled = _this3.isOptionDisabled(option, selectValue), isSelected = _this3.isOptionSelected(option, selectValue), label = _this3.getOptionLabel(option), value = _this3.getOptionValue(option);
        if (!(_this3.shouldHideSelectedOptions() && isSelected || !_this3.filterOption({
          label: label,
          value: value,
          data: option
        }, inputValue))) {
          var onHover = isDisabled ? void 0 : function() {
            return _this3.onOptionHover(option);
          }, onSelect = isDisabled ? void 0 : function() {
            return _this3.selectOption(option);
          }, optionId = "".concat(_this3.getElementId("option"), "-").concat(id);
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
      return options.reduce(function(acc, item, itemIndex) {
        if (item.options) {
          _this3.hasGroups || (_this3.hasGroups = !0);
          var children = item.options.map(function(child, i) {
            var option = toOption(child, "".concat(itemIndex, "-").concat(i));
            return option && acc.focusable.push(child), option;
          }).filter(Boolean);
          if (children.length) {
            var groupId = "".concat(_this3.getElementId("group"), "-").concat(itemIndex);
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
      }, {
        render: [],
        focusable: []
      });
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
      var _this$props14 = this.props, isDisabled = _this$props14.isDisabled, isSearchable = _this$props14.isSearchable, inputId = _this$props14.inputId, inputValue = _this$props14.inputValue, tabIndex = _this$props14.tabIndex, Input = this.components.Input, inputIsHidden = this.state.inputIsHidden, id = inputId || this.getElementId("input");
      if (!isSearchable) return React__default.createElement(DummyInput, {
        id: id,
        innerRef: this.getInputRef,
        onBlur: this.onInputBlur,
        onChange: __chunk_1.noop,
        onFocus: this.onInputFocus,
        readOnly: !0,
        disabled: isDisabled,
        tabIndex: tabIndex,
        value: ""
      });
      var ariaAttributes = {
        "aria-autocomplete": "list",
        "aria-label": this.props["aria-label"],
        "aria-labelledby": this.props["aria-labelledby"]
      }, _this$commonProps = this.commonProps, cx = _this$commonProps.cx, theme = _this$commonProps.theme, selectProps = _this$commonProps.selectProps;
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
      if (isMulti) return selectValue.map(function(opt) {
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
      });
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
      var _this5 = this, _this$components3 = this.components, Group = _this$components3.Group, GroupHeading = _this$components3.GroupHeading, Menu = _this$components3.Menu, MenuList = _this$components3.MenuList, MenuPortal = _this$components3.MenuPortal, LoadingMessage = _this$components3.LoadingMessage, NoOptionsMessage = _this$components3.NoOptionsMessage, Option = _this$components3.Option, commonProps = this.commonProps, _this$state9 = this.state, focusedOption = _this$state9.focusedOption, menuOptions = _this$state9.menuOptions, _this$props18 = this.props, captureMenuScroll = _this$props18.captureMenuScroll, inputValue = _this$props18.inputValue, isLoading = _this$props18.isLoading, loadingMessage = _this$props18.loadingMessage, minMenuHeight = _this$props18.minMenuHeight, maxMenuHeight = _this$props18.maxMenuHeight, menuIsOpen = _this$props18.menuIsOpen, menuPlacement = _this$props18.menuPlacement, menuPosition = _this$props18.menuPosition, menuPortalTarget = _this$props18.menuPortalTarget, menuShouldBlockScroll = _this$props18.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView, noOptionsMessage = _this$props18.noOptionsMessage, onMenuScrollToTop = _this$props18.onMenuScrollToTop, onMenuScrollToBottom = _this$props18.onMenuScrollToBottom, onMenuScrollToBottomOffset = _this$props18.onMenuScrollToBottomOffset;
      if (!menuIsOpen) return null;
      var menuUI, render = function(props) {
        var isFocused = focusedOption === props.data;
        return props.innerRef = isFocused ? _this5.getFocusedOptionRef : void 0, React__default.createElement(Option, _extends({}, commonProps, props, {
          isFocused: isFocused
        }), _this5.formatOptionLabel(props.data, "menu"));
      };
      if (this.hasOptions()) menuUI = menuOptions.render.map(function(item) {
        if ("group" === item.type) {
          item.type;
          var group = _objectWithoutProperties(item, [ "type" ]), headingId = "".concat(item.key, "-heading");
          return React__default.createElement(Group, _extends({}, commonProps, group, {
            Heading: GroupHeading,
            headingProps: {
              id: headingId
            },
            label: _this5.formatGroupLabel(item.data)
          }), item.options.map(function(option) {
            return render(option);
          }));
        }
        if ("option" === item.type) return render(item);
      }); else if (isLoading) {
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
      }, menuElement = React__default.createElement(__chunk_2.MenuPlacer, _extends({}, commonProps, menuPlacementProps), function(_ref6) {
        var ref = _ref6.ref, _ref6$placerProps = _ref6.placerProps, placement = _ref6$placerProps.placement, maxHeight = _ref6$placerProps.maxHeight;
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
          onBottomArrive: onMenuScrollToBottom,
          scrollOffset: onMenuScrollToBottomOffset
        }, React__default.createElement(ScrollBlock, {
          isEnabled: menuShouldBlockScroll
        }, React__default.createElement(MenuList, _extends({}, commonProps, {
          innerRef: _this5.getMenuListRef,
          isLoading: isLoading,
          maxHeight: maxHeight
        }), menuUI))));
      });
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
            var value = selectValue.map(function(opt) {
              return _this6.getOptionValue(opt);
            }).join(delimiter);
            return React__default.createElement("input", {
              name: name,
              type: "hidden",
              value: value
            });
          }
          var input = selectValue.length > 0 ? selectValue.map(function(opt, i) {
            return React__default.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this6.getOptionValue(opt)
            });
          }) : React__default.createElement("input", {
            name: name,
            type: "hidden"
          });
          return React__default.createElement("div", null, input);
        }
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
        return React__default.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function() {
      return this.state.isFocused ? React__default.createElement(A11yText, {
        "aria-live": "polite"
      }, React__default.createElement("p", {
        id: "aria-selection-event"
      }, " ", this.state.ariaLiveSelection), React__default.createElement("p", {
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

_defineProperty(Select, "defaultProps", defaultProps), exports.Select = Select, 
exports.createFilter = createFilter, exports.defaultProps = defaultProps, exports.defaultTheme = defaultTheme, 
exports.mergeStyles = mergeStyles;
