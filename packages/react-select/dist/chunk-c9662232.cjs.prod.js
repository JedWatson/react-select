"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

var _typeof = _interopDefault(require("@babel/runtime/helpers/typeof")), raf = _interopDefault(require("raf")), noop = function() {};

function applyPrefixToName(prefix, name) {
  return name ? "-" === name[0] ? prefix + name : prefix + "__" + name : prefix;
}

function classNames(prefix, state, className) {
  var arr = [ className ];
  if (state && prefix) for (var key in state) state.hasOwnProperty(key) && state[key] && arr.push("".concat(applyPrefixToName(prefix, key)));
  return arr.filter(function(i) {
    return i;
  }).map(function(i) {
    return String(i).trim();
  }).join(" ");
}

var cleanValue = function(value) {
  return Array.isArray(value) ? value.filter(Boolean) : "object" === _typeof(value) && null !== value ? [ value ] : [];
};

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var newValue = onInputChange(inputValue, actionMeta);
    if ("string" == typeof newValue) return newValue;
  }
  return inputValue;
}

function isDocumentElement(el) {
  return [ document.documentElement, document.body, window ].indexOf(el) > -1;
}

function getScrollTop(el) {
  return isDocumentElement(el) ? window.pageYOffset : el.scrollTop;
}

function scrollTo(el, top) {
  isDocumentElement(el) ? window.scrollTo(0, top) : el.scrollTop = top;
}

function getScrollParent(element) {
  var style = getComputedStyle(element), excludeStaticParent = "absolute" === style.position, overflowRx = /(auto|scroll)/, docEl = document.documentElement;
  if ("fixed" === style.position) return docEl;
  for (var parent = element; parent = parent.parentElement; ) if (style = getComputedStyle(parent), 
  (!excludeStaticParent || "static" !== style.position) && overflowRx.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  return docEl;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200, callback = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : noop, start = getScrollTop(element), change = to - start, increment = 10, currentTime = 0;
  !function animateScroll() {
    var val = easeOutCubic(currentTime += increment, start, change, duration);
    scrollTo(element, val), currentTime < duration ? raf(animateScroll) : callback(element);
  }();
}

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect(), focusedRect = focusedEl.getBoundingClientRect(), overScroll = focusedEl.offsetHeight / 3;
  focusedRect.bottom + overScroll > menuRect.bottom ? scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight)) : focusedRect.top - overScroll < menuRect.top && scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
}

function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

function isTouchCapable() {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch (e) {
    return !1;
  }
}

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return !1;
  }
}

exports.animatedScrollTo = animatedScrollTo, exports.classNames = classNames, exports.cleanValue = cleanValue, 
exports.getBoundingClientObj = getBoundingClientObj, exports.getScrollParent = getScrollParent, 
exports.getScrollTop = getScrollTop, exports.handleInputChange = handleInputChange, 
exports.isDocumentElement = isDocumentElement, exports.isMobileDevice = isMobileDevice, 
exports.isTouchCapable = isTouchCapable, exports.noop = noop, exports.scrollIntoView = scrollIntoView, 
exports.scrollTo = scrollTo;
