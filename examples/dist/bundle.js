require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventOptionsKey = require('./eventOptionsKey');

var _eventOptionsKey2 = _interopRequireDefault(_eventOptionsKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TargetEventHandlers = function () {
  function TargetEventHandlers(target) {
    _classCallCheck(this, TargetEventHandlers);

    this.target = target;
    this.events = {};
  }

  _createClass(TargetEventHandlers, [{
    key: 'getEventHandlers',
    value: function () {
      function getEventHandlers(eventName, options) {
        var key = String(eventName) + ' ' + String((0, _eventOptionsKey2['default'])(options));

        if (!this.events[key]) {
          this.events[key] = {
            size: 0,
            index: 0,
            handlers: {},
            handleEvent: undefined
          };
        }
        return this.events[key];
      }

      return getEventHandlers;
    }()
  }, {
    key: 'handleEvent',
    value: function () {
      function handleEvent(eventName, options, event) {
        var _getEventHandlers = this.getEventHandlers(eventName, options),
            handlers = _getEventHandlers.handlers;

        Object.keys(handlers).forEach(function (index) {
          var handler = handlers[index];
          if (handler) {
            // We need to check for presence here because a handler function may
            // cause later handlers to get removed. This can happen if you for
            // instance have a waypoint that unmounts another waypoint as part of an
            // onEnter/onLeave handler.
            handler(event);
          }
        });
      }

      return handleEvent;
    }()
  }, {
    key: 'add',
    value: function () {
      function add(eventName, listener, options) {
        // options has already been normalized at this point.
        var eventHandlers = this.getEventHandlers(eventName, options);

        if (eventHandlers.size === 0) {
          eventHandlers.handleEvent = this.handleEvent.bind(this, eventName, options);

          this.target.addEventListener(eventName, eventHandlers.handleEvent, options);
        }

        eventHandlers.size += 1;
        eventHandlers.index += 1;
        eventHandlers.handlers[eventHandlers.index] = listener;

        return {
          target: this.target,
          eventName: eventName,
          options: options,
          index: eventHandlers.index
        };
      }

      return add;
    }()
  }, {
    key: 'delete',
    value: function () {
      function _delete(_ref) {
        var eventName = _ref.eventName,
            index = _ref.index,
            options = _ref.options;

        // options has already been normalized at this point.
        var eventHandlers = this.getEventHandlers(eventName, options);

        if (eventHandlers.size === 0) {
          // There are no matching event handlers, so no work to be done here.
          return;
        }

        if (eventHandlers.handlers[index]) {
          delete eventHandlers.handlers[index];
          eventHandlers.size -= 1;
        }

        if (eventHandlers.size === 0) {
          this.target.removeEventListener(eventName, eventHandlers.handleEvent, options);

          eventHandlers.handleEvent = undefined;
        }
      }

      return _delete;
    }()
  }]);

  return TargetEventHandlers;
}();

exports['default'] = TargetEventHandlers;
},{"./eventOptionsKey":4}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports['default'] = CAN_USE_DOM;
},{}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = canUsePassiveEventListeners;

var _canUseDOM = require('./canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Adapted from Modernizr
// https://github.com/Modernizr/Modernizr/blob/5eea7e2a/feature-detects/dom/passiveeventlisteners.js#L26-L35
function testPassiveEventListeners() {
  if (!_canUseDOM2['default']) {
    return false;
  }

  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function () {
        function get() {
          supportsPassiveOption = true;
        }

        return get;
      }()
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    // do nothing
  }

  return supportsPassiveOption;
}

var memoized = void 0;

function canUsePassiveEventListeners() {
  if (memoized === undefined) {
    memoized = testPassiveEventListeners();
  }
  return memoized;
}
},{"./canUseDOM":2}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = eventOptionsKey;
/* eslint-disable no-bitwise */

/**
 * Generate a unique key for any set of event options
 */
function eventOptionsKey(normalizedEventOptions) {
  if (!normalizedEventOptions) {
    return 0;
  }

  // If the browser does not support passive event listeners, the normalized
  // event options will be a boolean.
  if (normalizedEventOptions === true) {
    return 100;
  }

  // At this point, the browser supports passive event listeners, so we expect
  // the event options to be an object with possible properties of capture,
  // passive, and once.
  //
  // We want to consistently return the same value, regardless of the order of
  // these properties, so let's use binary maths to assign each property to a
  // bit, and then add those together (with an offset to account for the
  // booleans at the beginning of this function).
  var capture = normalizedEventOptions.capture << 0;
  var passive = normalizedEventOptions.passive << 1;
  var once = normalizedEventOptions.once << 2;
  return capture + passive + once;
}
},{}],5:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_HANDLERS_KEY = undefined;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;

var _normalizeEventOptions = require('./normalizeEventOptions');

var _normalizeEventOptions2 = _interopRequireDefault(_normalizeEventOptions);

var _TargetEventHandlers = require('./TargetEventHandlers');

var _TargetEventHandlers2 = _interopRequireDefault(_TargetEventHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Export to make testing possible.
var EVENT_HANDLERS_KEY = exports.EVENT_HANDLERS_KEY = '__consolidated_events_handlers__';

function addEventListener(target, eventName, listener, options) {
  if (!target[EVENT_HANDLERS_KEY]) {
    // eslint-disable-next-line no-param-reassign
    target[EVENT_HANDLERS_KEY] = new _TargetEventHandlers2['default'](target);
  }
  var normalizedEventOptions = (0, _normalizeEventOptions2['default'])(options);
  return target[EVENT_HANDLERS_KEY].add(eventName, listener, normalizedEventOptions);
}

function removeEventListener(eventHandle) {
  var target = eventHandle.target;

  // There can be a race condition where the target may no longer exist when
  // this function is called, e.g. when a React component is unmounting.
  // Guarding against this prevents the following error:
  //
  //   Cannot read property 'removeEventListener' of undefined

  if (target) {
    target[EVENT_HANDLERS_KEY]['delete'](eventHandle);
  }
}
},{"./TargetEventHandlers":1,"./normalizeEventOptions":6}],6:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = normalizeEventOptions;

var _canUsePassiveEventListeners = require('./canUsePassiveEventListeners');

var _canUsePassiveEventListeners2 = _interopRequireDefault(_canUsePassiveEventListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalizeEventOptions(eventOptions) {
  if (!eventOptions) {
    return undefined;
  }

  if (!(0, _canUsePassiveEventListeners2['default'])()) {
    // If the browser does not support the passive option, then it is expecting
    // a boolean for the options argument to specify whether it should use
    // capture or not. In more modern browsers, this is passed via the `capture`
    // option, so let's just hoist that value up.
    return !!eventOptions.capture;
  }

  return eventOptions;
}
},{"./canUsePassiveEventListeners":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _consolidatedEvents = require('consolidated-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITIONS = {
  above: 'above',
  inside: 'inside',
  below: 'below',
  invisible: 'invisible'
};

var defaultProps = {
  topOffset: '0px',
  bottomOffset: '0px',
  horizontal: false,
  onEnter: function onEnter() {},
  onLeave: function onLeave() {},
  onPositionChange: function onPositionChange() {},

  fireOnRapidScroll: true
};

function debugLog() {
  console.log(arguments); // eslint-disable-line no-console
}

/**
 * @param {object} bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @return {string} The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent. One of `POSITIONS.above`,
 *   `POSITIONS.below`, or `POSITIONS.inside`.
 */
function getCurrentPosition(bounds) {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return POSITIONS.invisible;
  }

  // top is within the viewport
  if (bounds.viewportTop <= bounds.waypointTop && bounds.waypointTop <= bounds.viewportBottom) {
    return POSITIONS.inside;
  }

  // bottom is within the viewport
  if (bounds.viewportTop <= bounds.waypointBottom && bounds.waypointBottom <= bounds.viewportBottom) {
    return POSITIONS.inside;
  }

  // top is above the viewport and bottom is below the viewport
  if (bounds.waypointTop <= bounds.viewportTop && bounds.viewportBottom <= bounds.waypointBottom) {
    return POSITIONS.inside;
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return POSITIONS.below;
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return POSITIONS.above;
  }

  return POSITIONS.invisible;
}

/**
 * Attempts to parse the offset provided as a prop as a pixel value. If
 * parsing fails, then `undefined` is returned. Three examples of values that
 * will be successfully parsed are:
 * `20`
 * "20px"
 * "20"
 *
 * @param {string|number} str A string of the form "{number}" or "{number}px",
 *   or just a number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was neither a number nor string ending in "px".
 */
function parseOffsetAsPixels(str) {
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    return parseFloat(str);
  } else if (str.slice(-2) === 'px') {
    return parseFloat(str.slice(0, -2));
  }
}

/**
 * Attempts to parse the offset provided as a prop as a percentage. For
 * instance, if the component has been provided with the string "20%" as
 * a value of one of the offset props. If the value matches, then it returns
 * a numeric version of the prop. For instance, "20%" would become `0.2`.
 * If `str` isn't a percentage, then `undefined` will be returned.
 *
 * @param {string} str The value of an offset prop to be converted to a
 *   number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was not a percentage.
 */
function parseOffsetAsPercentage(str) {
  if (str.slice(-1) === '%') {
    return parseFloat(str.slice(0, -1)) / 100;
  }
}

/**
 * @param {string|number} offset
 * @param {number} contextHeight
 * @return {number} A number representing `offset` converted into pixels.
 */
function computeOffsetPixels(offset, contextHeight) {
  var pixelOffset = parseOffsetAsPixels(offset);

  if (typeof pixelOffset === 'number') {
    return pixelOffset;
  }

  var percentOffset = parseOffsetAsPercentage(offset);
  if (typeof percentOffset === 'number') {
    return percentOffset * contextHeight;
  }
}

/**
 * When an element's type is a string, it represents a DOM node with that tag name
 * https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements
 *
 * @param {React.element} Component
 * @return {bool} Whether the component is a DOM Element
 */
function isDOMElement(Component) {
  return typeof Component.type === 'string';
}

/**
 * Raise an error if "children" isn't a single DOM Element
 *
 * @param {React.element|null} children
 * @return {undefined}
 */
function ensureChildrenIsSingleDOMElement(children) {
  if (children) {
    _react2.default.Children.only(children);

    if (!isDOMElement(children)) {
      throw new Error('You must wrap any Component Elements passed to Waypoint in a DOM Element (eg; a <div>).');
    }
  }
}

/**
 * Calls a function when you scroll to the element.
 */

var Waypoint = function (_React$Component) {
  _inherits(Waypoint, _React$Component);

  function Waypoint(props) {
    _classCallCheck(this, Waypoint);

    var _this = _possibleConstructorReturn(this, (Waypoint.__proto__ || Object.getPrototypeOf(Waypoint)).call(this, props));

    _this.refElement = function (e) {
      return _this._ref = e;
    };
    return _this;
  }

  _createClass(Waypoint, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      ensureChildrenIsSingleDOMElement(this.props.children);

      if (this.props.scrollableParent) {
        // eslint-disable-line react/prop-types
        throw new Error('The `scrollableParent` prop has changed name to `scrollableAncestor`.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!Waypoint.getWindow()) {
        return;
      }

      this._handleScroll = this._handleScroll.bind(this);
      this.scrollableAncestor = this._findScrollableAncestor();

      if (this.props.debug) {
        debugLog('scrollableAncestor', this.scrollableAncestor);
      }

      this.scrollEventListenerHandle = (0, _consolidatedEvents.addEventListener)(this.scrollableAncestor, 'scroll', this._handleScroll, { passive: true });

      this.resizeEventListenerHandle = (0, _consolidatedEvents.addEventListener)(window, 'resize', this._handleScroll, { passive: true });

      // this._ref may occasionally not be set at this time. To help ensure that
      // this works smoothly, we want to delay the initial execution until the
      // next tick.
      this.initialTimeout = setTimeout(function () {
        _this2._handleScroll(null);
      }, 0);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      ensureChildrenIsSingleDOMElement(nextProps.children);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!Waypoint.getWindow()) {
        return;
      }

      // The element may have moved.
      this._handleScroll(null);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!Waypoint.getWindow()) {
        return;
      }

      (0, _consolidatedEvents.removeEventListener)(this.scrollEventListenerHandle);
      (0, _consolidatedEvents.removeEventListener)(this.resizeEventListenerHandle);

      clearTimeout(this.initialTimeout);
    }

    /**
     * Traverses up the DOM to find an ancestor container which has an overflow
     * style that allows for scrolling.
     *
     * @return {Object} the closest ancestor element with an overflow style that
     *   allows for scrolling. If none is found, the `window` object is returned
     *   as a fallback.
     */

  }, {
    key: '_findScrollableAncestor',
    value: function _findScrollableAncestor() {
      if (this.props.scrollableAncestor) {
        return this.props.scrollableAncestor;
      }

      var node = this._ref;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document) {
          // This particular node does not have a computed style.
          continue;
        }

        if (node === document.documentElement) {
          // This particular node does not have a scroll bar, it uses the window.
          continue;
        }

        var style = window.getComputedStyle(node);
        var overflowDirec = this.props.horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y');
        var overflow = overflowDirec || style.getPropertyValue('overflow');

        if (overflow === 'auto' || overflow === 'scroll') {
          return node;
        }
      }

      // A scrollable ancestor element was not found, which means that we need to
      // do stuff on window.
      return window;
    }

    /**
     * @param {Object} event the native scroll event coming from the scrollable
     *   ancestor, or resize event coming from the window. Will be undefined if
     *   called by a React lifecyle method
     */

  }, {
    key: '_handleScroll',
    value: function _handleScroll(event) {
      if (!this._ref) {
        // There's a chance we end up here after the component has been unmounted.
        return;
      }

      var bounds = this._getBounds();
      var currentPosition = getCurrentPosition(bounds);
      var previousPosition = this._previousPosition;

      if (this.props.debug) {
        debugLog('currentPosition', currentPosition);
        debugLog('previousPosition', previousPosition);
      }

      // Save previous position as early as possible to prevent cycles
      this._previousPosition = currentPosition;

      if (previousPosition === currentPosition) {
        // No change since last trigger
        return;
      }

      var callbackArg = {
        currentPosition: currentPosition,
        previousPosition: previousPosition,
        event: event,
        waypointTop: bounds.waypointTop,
        waypointBottom: bounds.waypointBottom,
        viewportTop: bounds.viewportTop,
        viewportBottom: bounds.viewportBottom
      };
      this.props.onPositionChange.call(this, callbackArg);

      if (currentPosition === POSITIONS.inside) {
        this.props.onEnter.call(this, callbackArg);
      } else if (previousPosition === POSITIONS.inside) {
        this.props.onLeave.call(this, callbackArg);
      }

      var isRapidScrollDown = previousPosition === POSITIONS.below && currentPosition === POSITIONS.above;
      var isRapidScrollUp = previousPosition === POSITIONS.above && currentPosition === POSITIONS.below;

      if (this.props.fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
        // If the scroll event isn't fired often enough to occur while the
        // waypoint was visible, we trigger both callbacks anyway.
        this.props.onEnter.call(this, {
          currentPosition: POSITIONS.inside,
          previousPosition: previousPosition,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
        this.props.onLeave.call(this, {
          currentPosition: currentPosition,
          previousPosition: POSITIONS.inside,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
      }
    }
  }, {
    key: '_getBounds',
    value: function _getBounds() {
      var horizontal = this.props.horizontal;

      var _ref$getBoundingClien = this._ref.getBoundingClientRect();

      var left = _ref$getBoundingClien.left;
      var top = _ref$getBoundingClien.top;
      var right = _ref$getBoundingClien.right;
      var bottom = _ref$getBoundingClien.bottom;

      var waypointTop = horizontal ? left : top;
      var waypointBottom = horizontal ? right : bottom;

      var contextHeight = void 0;
      var contextScrollTop = void 0;
      if (this.scrollableAncestor === window) {
        contextHeight = horizontal ? window.innerWidth : window.innerHeight;
        contextScrollTop = 0;
      } else {
        contextHeight = horizontal ? this.scrollableAncestor.offsetWidth : this.scrollableAncestor.offsetHeight;
        contextScrollTop = horizontal ? this.scrollableAncestor.getBoundingClientRect().left : this.scrollableAncestor.getBoundingClientRect().top;
      }

      if (this.props.debug) {
        debugLog('waypoint top', waypointTop);
        debugLog('waypoint bottom', waypointBottom);
        debugLog('scrollableAncestor height', contextHeight);
        debugLog('scrollableAncestor scrollTop', contextScrollTop);
      }

      var _props = this.props;
      var bottomOffset = _props.bottomOffset;
      var topOffset = _props.topOffset;

      var topOffsetPx = computeOffsetPixels(topOffset, contextHeight);
      var bottomOffsetPx = computeOffsetPixels(bottomOffset, contextHeight);
      var contextBottom = contextScrollTop + contextHeight;

      return {
        waypointTop: waypointTop,
        waypointBottom: waypointBottom,
        viewportTop: contextScrollTop + topOffsetPx,
        viewportBottom: contextBottom - bottomOffsetPx
      };
    }

    /**
     * @return {Object}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;


      if (!children) {
        // We need an element that we can locate in the DOM to determine where it is
        // rendered relative to the top of its context.
        return _react2.default.createElement('span', { ref: this.refElement, style: { fontSize: 0 } });
      }

      var ref = function ref(node) {
        _this3.refElement(node);
        if (children.ref) {
          children.ref(node);
        }
      };

      return _react2.default.cloneElement(children, { ref: ref });
    }
  }]);

  return Waypoint;
}(_react2.default.Component);

exports.default = Waypoint;


Waypoint.propTypes = {
  children: _react.PropTypes.element,
  debug: _react.PropTypes.bool,
  onEnter: _react.PropTypes.func,
  onLeave: _react.PropTypes.func,
  onPositionChange: _react.PropTypes.func,
  fireOnRapidScroll: _react.PropTypes.bool,
  scrollableAncestor: _react.PropTypes.any,
  horizontal: _react.PropTypes.bool,

  // `topOffset` can either be a number, in which case its a distance from the
  // top of the container in pixels, or a string value. Valid string values are
  // of the form "20px", which is parsed as pixels, or "20%", which is parsed
  // as a percentage of the height of the containing element.
  // For instance, if you pass "-20%", and the containing element is 100px tall,
  // then the waypoint will be triggered when it has been scrolled 20px beyond
  // the top of the containing element.
  topOffset: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),

  // `bottomOffset` is like `topOffset`, but for the bottom of the container.
  bottomOffset: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

Waypoint.above = POSITIONS.above;
Waypoint.below = POSITIONS.below;
Waypoint.inside = POSITIONS.inside;
Waypoint.invisible = POSITIONS.invisible;
Waypoint.getWindow = function () {
  if (typeof window !== 'undefined') {
    return window;
  }
};
Waypoint.defaultProps = defaultProps;
Waypoint.displayName = 'Waypoint';
module.exports = exports['default'];
},{"consolidated-events":5,"react":undefined}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsStripDiacritics = require('./utils/stripDiacritics');

var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var _reactWaypoint = require('react-waypoint');

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

var propTypes = {
	autoload: _react2['default'].PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: _react2['default'].PropTypes.any, // object to use to cache results; set to null/false to disable caching
	children: _react2['default'].PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: _react2['default'].PropTypes.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: _react2['default'].PropTypes.bool, // perform case-insensitive filtering; defaults to true
	loadingPlaceholder: _react2['default'].PropTypes.oneOfType([// replaces the placeholder while options are loading
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	loadOptions: _react2['default'].PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	options: _react.PropTypes.array.isRequired, // array of options
	placeholder: _react2['default'].PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	noResultsText: _react2['default'].PropTypes.oneOfType([// field noResultsText, displayed when no options come back from the server
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
	searchPromptText: _react2['default'].PropTypes.oneOfType([// label to prompt for search input
	_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
	onInputChange: _react2['default'].PropTypes.func, // optional for keeping track of what is being typed
	value: _react2['default'].PropTypes.any };

// initial field value
var defaultCache = {};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = (function (_Component) {
	_inherits(Async, _Component);

	function Async(props, context) {
		_classCallCheck(this, Async);

		_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			isLoading: false,
			isLoadingNext: false,
			options: props.options,
			total: 0
		};

		this._onInputChange = this._onInputChange.bind(this);
		this.handleLoadNextOptions = this.handleLoadNextOptions.bind(this);
	}

	_createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;

			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			var _this = this;

			var propertiesToSync = ['options'];
			propertiesToSync.forEach(function (prop) {
				if (_this.props[prop] !== nextProps[prop]) {
					_this.setState(_defineProperty({}, prop, nextProps[prop]));
				}
			});
		}
	}, {
		key: 'clearOptions',
		value: function clearOptions() {
			this.setState({ options: [], total: 0 });
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var skip = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (!skip && cache && cache.hasOwnProperty(inputValue)) {
				var data = cache[inputValue];

				this.setState({
					options: data.options,
					total: data.total
				});

				return;
			}

			var callback = function callback(error, data) {
				if (callback === _this2._callback) {
					_this2._callback = null;

					var options = data && data.options || [];

					if (skip) {
						options = [].concat(_toConsumableArray(_this2.state.options), _toConsumableArray(options));
					}

					var total = data && data.total || options.length;

					if (cache) {
						// cache[inputValue] = options;
						cache[inputValue] = {
							options: options,
							total: total
						};
					}

					_this2.setState({
						isLoading: false,
						isLoadingNext: false,
						options: options,
						total: total
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback, skip);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					// isLoading: true,
					isLoading: !skip,
					isLoadingNext: !!skip
				});
			}

			return inputValue;
		}
	}, {
		key: '_onInputChange',
		value: function _onInputChange(inputValue) {
			var _props = this.props;
			var ignoreAccents = _props.ignoreAccents;
			var ignoreCase = _props.ignoreCase;
			var onInputChange = _props.onInputChange;

			if (ignoreAccents) {
				inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
			}

			if (ignoreCase) {
				inputValue = inputValue.toLowerCase();
			}

			if (onInputChange) {
				onInputChange(inputValue);
			}

			return this.loadOptions(inputValue);
		}
	}, {
		key: 'inputValue',
		value: function inputValue() {
			if (this.select) {
				return this.select.state.inputValue;
			}
			return '';
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props;
			var loadingPlaceholder = _props2.loadingPlaceholder;
			var noResultsText = _props2.noResultsText;
			var searchPromptText = _props2.searchPromptText;
			var isLoading = this.state.isLoading;

			var inputValue = this.inputValue();

			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'handleLoadNextOptions',
		value: function handleLoadNextOptions() {
			this.loadOptions(this.inputValue(), this.state.options.length);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props;
			var children = _props3.children;
			var loadingPlaceholder = _props3.loadingPlaceholder;
			var placeholder = _props3.placeholder;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;
			var total = _state.total;
			var isLoadingNext = _state.isLoadingNext;

			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				},
				onChange: function onChange(newValues) {
					if (_this3.props.multi && _this3.props.value && newValues.length > _this3.props.value.length) {
						_this3.clearOptions();
					}
					_this3.props.onChange(newValues);
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this._onInputChange,
				menuRenderer: function menuRenderer(props) {
					return _react2['default'].createElement(
						'div',
						null,
						(0, _utilsDefaultMenuRenderer2['default'])(props),
						options.length < total && _react2['default'].createElement(_reactWaypoint2['default'], { onEnter: _this3.handleLoadNextOptions }),
						isLoadingNext && _react2['default'].createElement(
							'div',
							{ className: 'Select-loading-next-options' },
							_react2['default'].createElement(
								'span',
								{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
								_react2['default'].createElement('span', { className: 'Select-loading' })
							)
						)
					);
				}
			}));
		}
	}]);

	return Async;
})(_react.Component);

exports['default'] = Async;

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

function defaultChildren(props) {
	return _react2['default'].createElement(_Select2['default'], props);
};
module.exports = exports['default'];

},{"./Select":"react-select","./utils/defaultMenuRenderer":16,"./utils/stripDiacritics":17,"react":undefined,"react-waypoint":7}],9:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function reduce(obj) {
	var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	return Object.keys(obj).reduce(function (props, key) {
		var value = obj[key];
		if (value !== undefined) props[key] = value;
		return props;
	}, props);
}

var AsyncCreatable = _react2['default'].createClass({
	displayName: 'AsyncCreatableSelect',

	render: function render() {
		var _this = this;

		return _react2['default'].createElement(
			_Select2['default'].Async,
			this.props,
			function (asyncProps) {
				return _react2['default'].createElement(
					_Select2['default'].Creatable,
					_this.props,
					function (creatableProps) {
						return _react2['default'].createElement(_Select2['default'], _extends({}, reduce(asyncProps, reduce(creatableProps, {})), {
							onInputChange: function (input) {
								creatableProps.onInputChange(input);
								return asyncProps.onInputChange(input);
							},
							ref: function (ref) {
								creatableProps.ref(ref);
								asyncProps.ref(ref);
							}
						}));
					}
				);
			}
		);
	}
});

module.exports = AsyncCreatable;

},{"./Select":"react-select","react":undefined}],10:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var Creatable = _react2['default'].createClass({
	displayName: 'CreatableSelect',

	propTypes: {
		// Child function responsible for creating the inner Select component
		// This component can be used to compose HOCs (eg Creatable and Async)
		// (props: Object): PropTypes.element
		children: _react2['default'].PropTypes.func,

		// See Select.propTypes.filterOptions
		filterOptions: _react2['default'].PropTypes.any,

		// Searches for any matching option within the set of options.
		// This function prevents duplicate options from being created.
		// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
		isOptionUnique: _react2['default'].PropTypes.func,

		// Determines if the current input text represents a valid option.
		// ({ label: string }): boolean
		isValidNewOption: _react2['default'].PropTypes.func,

		// See Select.propTypes.menuRenderer
		menuRenderer: _react2['default'].PropTypes.any,

		// Factory to create new option.
		// ({ label: string, labelKey: string, valueKey: string }): Object
		newOptionCreator: _react2['default'].PropTypes.func,

		// input change handler: function (inputValue) {}
		onInputChange: _react2['default'].PropTypes.func,

		// input keyDown handler: function (event) {}
		onInputKeyDown: _react2['default'].PropTypes.func,

		// new option click handler: function (option) {}
		onNewOptionClick: _react2['default'].PropTypes.func,

		// See Select.propTypes.options
		options: _react2['default'].PropTypes.array,

		// Creates prompt/placeholder option text.
		// (filterText: string): string
		promptTextCreator: _react2['default'].PropTypes.func,

		// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
		shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
	},

	// Default prop methods
	statics: {
		isOptionUnique: isOptionUnique,
		isValidNewOption: isValidNewOption,
		newOptionCreator: newOptionCreator,
		promptTextCreator: promptTextCreator,
		shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
	},

	getDefaultProps: function getDefaultProps() {
		return {
			filterOptions: _utilsDefaultFilterOptions2['default'],
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			menuRenderer: _utilsDefaultMenuRenderer2['default'],
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		};
	},

	createNewOption: function createNewOption() {
		var _props = this.props;
		var isValidNewOption = _props.isValidNewOption;
		var newOptionCreator = _props.newOptionCreator;
		var onNewOptionClick = _props.onNewOptionClick;
		var _props$options = _props.options;
		var options = _props$options === undefined ? [] : _props$options;
		var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;

		if (isValidNewOption({ label: this.inputValue })) {
			var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
			var _isOptionUnique = this.isOptionUnique({ option: option });

			// Don't add the same option twice.
			if (_isOptionUnique) {
				if (onNewOptionClick) {
					onNewOptionClick(option);
				} else {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		}
	},

	filterOptions: function filterOptions() {
		var _props2 = this.props;
		var filterOptions = _props2.filterOptions;
		var isValidNewOption = _props2.isValidNewOption;
		var options = _props2.options;
		var promptTextCreator = _props2.promptTextCreator;

		// TRICKY Check currently selected options as well.
		// Don't display a create-prompt for a value that's selected.
		// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
		var excludeOptions = arguments[2] || [];

		var filteredOptions = filterOptions.apply(undefined, arguments) || [];

		if (isValidNewOption({ label: this.inputValue })) {
			var _newOptionCreator = this.props.newOptionCreator;

			var option = _newOptionCreator({
				label: this.inputValue,
				labelKey: this.labelKey,
				valueKey: this.valueKey
			});

			// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
			// For multi-selects, this would remove it from the filtered list.
			var _isOptionUnique2 = this.isOptionUnique({
				option: option,
				options: excludeOptions.concat(filteredOptions)
			});

			if (_isOptionUnique2) {
				var _prompt = promptTextCreator(this.inputValue);

				this._createPlaceholderOption = _newOptionCreator({
					label: _prompt,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	},

	isOptionUnique: function isOptionUnique(_ref2) {
		var option = _ref2.option;
		var options = _ref2.options;
		var isOptionUnique = this.props.isOptionUnique;

		options = options || this.select.filterOptions();

		return isOptionUnique({
			labelKey: this.labelKey,
			option: option,
			options: options,
			valueKey: this.valueKey
		});
	},

	menuRenderer: function menuRenderer(params) {
		var menuRenderer = this.props.menuRenderer;

		return menuRenderer(_extends({}, params, {
			onSelect: this.onOptionSelect,
			selectValue: this.onOptionSelect
		}));
	},

	onInputChange: function onInputChange(input) {
		var onInputChange = this.props.onInputChange;

		if (onInputChange) {
			onInputChange(input);
		}

		// This value may be needed in between Select mounts (when this.select is null)
		this.inputValue = input;
	},

	onInputKeyDown: function onInputKeyDown(event) {
		var _props3 = this.props;
		var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;
		var onInputKeyDown = _props3.onInputKeyDown;

		var focusedOption = this.select.getFocusedOption();

		if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		} else if (onInputKeyDown) {
			onInputKeyDown(event);
		}
	},

	onOptionSelect: function onOptionSelect(option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	},

	render: function render() {
		var _this = this;

		var _props4 = this.props;
		var newOptionCreator = _props4.newOptionCreator;
		var shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption;

		var restProps = _objectWithoutProperties(_props4, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

		var children = this.props.children;

		// We can't use destructuring default values to set the children,
		// because it won't apply work if `children` is null. A falsy check is
		// more reliable in real world use-cases.
		if (!children) {
			children = defaultChildren;
		}

		var props = _extends({}, restProps, {
			allowCreate: true,
			filterOptions: this.filterOptions,
			menuRenderer: this.menuRenderer,
			onInputChange: this.onInputChange,
			onInputKeyDown: this.onInputKeyDown,
			ref: function ref(_ref) {
				_this.select = _ref;

				// These values may be needed in between Select mounts (when this.select is null)
				if (_ref) {
					_this.labelKey = _ref.props.labelKey;
					_this.valueKey = _ref.props.valueKey;
				}
			}
		});

		return children(props);
	}
});

function defaultChildren(props) {
	return _react2['default'].createElement(_Select2['default'], props);
};

function isOptionUnique(_ref3) {
	var option = _ref3.option;
	var options = _ref3.options;
	var labelKey = _ref3.labelKey;
	var valueKey = _ref3.valueKey;

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

function isValidNewOption(_ref4) {
	var label = _ref4.label;

	return !!label;
};

function newOptionCreator(_ref5) {
	var label = _ref5.label;
	var labelKey = _ref5.labelKey;
	var valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';
	return option;
};

function promptTextCreator(label) {
	return 'Create option "' + label + '"';
}

function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
	}

	return false;
};

module.exports = Creatable;

},{"./Select":"react-select","./utils/defaultFilterOptions":15,"./utils/defaultMenuRenderer":16,"react":undefined}],11:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Option = _react2['default'].createClass({
	displayName: 'Option',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string, // className (based on mouse position)
		instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
		isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
		isFocused: _react2['default'].PropTypes.bool, // the option is focused
		isSelected: _react2['default'].PropTypes.bool, // the option is selected
		onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
		onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
		onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
		option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
		optionIndex: _react2['default'].PropTypes.number },
	// index of the option, used to generate unique ids for aria
	blockEvent: function blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},

	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},

	handleMouseEnter: function handleMouseEnter(event) {
		this.onFocus(event);
	},

	handleMouseMove: function handleMouseMove(event) {
		this.onFocus(event);
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	onFocus: function onFocus(event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	},
	render: function render() {
		var _props = this.props;
		var option = _props.option;
		var instancePrefix = _props.instancePrefix;
		var optionIndex = _props.optionIndex;

		var className = (0, _classnames2['default'])(this.props.className, option.className);

		return option.disabled ? _react2['default'].createElement(
			'div',
			{ className: className,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			this.props.children
		) : _react2['default'].createElement(
			'div',
			{ className: className,
				style: option.style,
				role: 'option',
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEnd,
				id: instancePrefix + '-option-' + optionIndex,
				title: option.title },
			this.props.children
		);
	}
});

module.exports = Option;

},{"classnames":undefined,"react":undefined}],12:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Value = _react2['default'].createClass({

	displayName: 'Value',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
		id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
		onClick: _react2['default'].PropTypes.func, // method to handle click on value label
		onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
		value: _react2['default'].PropTypes.object.isRequired },

	// the option object for this value
	handleMouseDown: function handleMouseDown(event) {
		if (event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		if (this.props.onClick) {
			event.stopPropagation();
			this.props.onClick(this.props.value, event);
			return;
		}
		if (this.props.value.href) {
			event.stopPropagation();
		}
	},

	onRemove: function onRemove(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	handleTouchEndRemove: function handleTouchEndRemove(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.onRemove(event);
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	renderRemoveIcon: function renderRemoveIcon() {
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
	},

	renderLabel: function renderLabel() {
		var className = 'Select-value-label';
		return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
			'a',
			{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
			this.props.children
		) : _react2['default'].createElement(
			'span',
			{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
			this.props.children
		);
	},

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
				style: this.props.value.style,
				title: this.props.value.title
			},
			this.renderRemoveIcon(),
			this.renderLabel()
		);
	}

});

module.exports = Value;

},{"classnames":undefined,"react":undefined}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = arrowRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return _react2["default"].createElement("span", {
		className: "Select-arrow",
		onMouseDown: onMouseDown
	});
}

;
module.exports = exports["default"];

},{"react":undefined}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = clearRenderer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function clearRenderer() {
	return _react2['default'].createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
}

;
module.exports = exports['default'];

},{"react":undefined}],15:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stripDiacritics = require('./stripDiacritics');

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function filterOptions(options, filterValue, excludeOptions, props) {
	var _this = this;

	if (props.ignoreAccents) {
		filterValue = (0, _stripDiacritics2['default'])(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
		if (!filterValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);
		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2['default'])(valueTest);
			if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2['default'])(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
}

module.exports = filterOptions;

},{"./stripDiacritics":17}],16:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption;
	var instancePrefix = _ref.instancePrefix;
	var labelKey = _ref.labelKey;
	var onFocus = _ref.onFocus;
	var onSelect = _ref.onSelect;
	var optionClassName = _ref.optionClassName;
	var optionComponent = _ref.optionComponent;
	var optionRenderer = _ref.optionRenderer;
	var options = _ref.options;
	var valueArray = _ref.valueArray;
	var valueKey = _ref.valueKey;
	var onOptionRef = _ref.onOptionRef;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.indexOf(option) > -1;
		var isFocused = option === focusedOption;
		var optionClass = (0, _classnames2['default'])(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return _react2['default'].createElement(
			Option,
			{
				className: optionClass,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function (ref) {
					onOptionRef(ref, isFocused);
				}
			},
			optionRenderer(option, i)
		);
	});
}

module.exports = menuRenderer;

},{"classnames":undefined,"react":undefined}],17:[function(require,module,exports){
'use strict';

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

module.exports = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

},{}],"react-select":[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDefaultArrowRenderer = require('./utils/defaultArrowRenderer');

var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var _utilsDefaultClearRenderer = require('./utils/defaultClearRenderer');

var _utilsDefaultClearRenderer2 = _interopRequireDefault(_utilsDefaultClearRenderer);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _AsyncCreatable = require('./AsyncCreatable');

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _Creatable = require('./Creatable');

var _Creatable2 = _interopRequireDefault(_Creatable);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

function stringifyValue(value) {
	var valueType = typeof value;
	if (valueType === 'string') {
		return value;
	} else if (valueType === 'object') {
		return JSON.stringify(value);
	} else if (valueType === 'number' || valueType === 'boolean') {
		return String(value);
	} else {
		return '';
	}
}

var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

var instanceId = 1;

var Select = _react2['default'].createClass({

	displayName: 'Select',

	propTypes: {
		addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
		'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
		'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
		arrowRenderer: _react2['default'].PropTypes.func, // Create drop-down caret element
		autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
		autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
		autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
		backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
		backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
		className: _react2['default'].PropTypes.string, // className for the outer element
		clearAllText: stringOrNode, // title for the "clear" control when multi: true
		clearRenderer: _react2['default'].PropTypes.func, // create clearable x element
		clearValueText: stringOrNode, // title for the "clear" control
		clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
		deleteRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
		delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
		disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
		escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
		filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
		filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
		ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
		ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
		inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
		inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
		instanceId: _react2['default'].PropTypes.string, // set the components instanceId
		isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
		joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
		labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
		matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
		menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
		menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
		menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
		menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
		multi: _react2['default'].PropTypes.bool, // multi-value input
		name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
		noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
		onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
		onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
		onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
		onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
		onCloseResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared when menu is closed through the arrow
		onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
		onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
		onInputKeyDown: _react2['default'].PropTypes.func, // input keyDown handler: function (event) {}
		onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
		onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
		onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
		openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
		openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
		optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
		optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
		optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
		options: _react2['default'].PropTypes.array, // array of options
		pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
		placeholder: stringOrNode, // field placeholder, displayed when there's no value
		required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
		resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
		scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
		searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
		simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
		style: _react2['default'].PropTypes.object, // optional style to apply to the control
		tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
		tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
		value: _react2['default'].PropTypes.any, // initial field value
		valueComponent: _react2['default'].PropTypes.func, // value component to render
		valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
		valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
		wrapperStyle: _react2['default'].PropTypes.object },

	// optional style to apply to the component wrapper
	statics: { Async: _Async2['default'], AsyncCreatable: _AsyncCreatable2['default'], Creatable: _Creatable2['default'] },

	getDefaultProps: function getDefaultProps() {
		return {
			addLabelText: 'Add "{label}"?',
			arrowRenderer: _utilsDefaultArrowRenderer2['default'],
			autosize: true,
			backspaceRemoves: true,
			backspaceToRemoveMessage: 'Press backspace to remove {label}',
			clearable: true,
			clearAllText: 'Clear all',
			clearRenderer: _utilsDefaultClearRenderer2['default'],
			clearValueText: 'Clear value',
			deleteRemoves: true,
			delimiter: ',',
			disabled: false,
			escapeClearsValue: true,
			filterOptions: _utilsDefaultFilterOptions2['default'],
			ignoreAccents: true,
			ignoreCase: true,
			inputProps: {},
			isLoading: false,
			joinValues: false,
			labelKey: 'label',
			matchPos: 'any',
			matchProp: 'any',
			menuBuffer: 0,
			menuRenderer: _utilsDefaultMenuRenderer2['default'],
			multi: false,
			noResultsText: 'No results found',
			onBlurResetsInput: true,
			onCloseResetsInput: true,
			openAfterFocus: false,
			optionComponent: _Option2['default'],
			pageSize: 5,
			placeholder: 'Select...',
			required: false,
			scrollMenuIntoView: true,
			searchable: true,
			simpleValue: false,
			tabSelectsValue: true,
			valueComponent: _Value2['default'],
			valueKey: 'value'
		};
	},

	getInitialState: function getInitialState() {
		return {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
	},

	componentWillMount: function componentWillMount() {
		this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
		var valueArray = this.getValueArray(this.props.value);

		if (this.props.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], this.props.multi)
			});
		}
	},

	componentDidMount: function componentDidMount() {
		if (this.props.autofocus) {
			this.focus();
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var valueArray = this.getValueArray(nextProps.value, nextProps);

		if (nextProps.required) {
			this.setState({
				required: this.handleRequired(valueArray[0], nextProps.multi)
			});
		}
	},

	componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
		if (nextState.isOpen !== this.state.isOpen) {
			this.toggleTouchOutsideEvent(nextState.isOpen);
			var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
			handler && handler();
		}
	},

	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		// focus to the selected option
		if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
			var focusedOptionNode = _reactDom2['default'].findDOMNode(this.focused);
			var menuNode = _reactDom2['default'].findDOMNode(this.menu);
			menuNode.scrollTop = focusedOptionNode.offsetTop;
			this.hasScrolledToOption = true;
		} else if (!this.state.isOpen) {
			this.hasScrolledToOption = false;
		}

		if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
			this._scrollToFocusedOptionOnUpdate = false;
			var focusedDOM = _reactDom2['default'].findDOMNode(this.focused);
			var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
			var focusedRect = focusedDOM.getBoundingClientRect();
			var menuRect = menuDOM.getBoundingClientRect();
			if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
				menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
			}
		}
		if (this.props.scrollMenuIntoView && this.menuContainer) {
			var menuContainerRect = this.menuContainer.getBoundingClientRect();
			if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
				window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
			}
		}
		if (prevProps.disabled !== this.props.disabled) {
			this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
			this.closeMenu();
		}
	},

	componentWillUnmount: function componentWillUnmount() {
		if (!document.removeEventListener && document.detachEvent) {
			document.detachEvent('ontouchstart', this.handleTouchOutside);
		} else {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		}
	},

	toggleTouchOutsideEvent: function toggleTouchOutsideEvent(enabled) {
		if (enabled) {
			if (!document.addEventListener && document.attachEvent) {
				document.attachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.addEventListener('touchstart', this.handleTouchOutside);
			}
		} else {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		}
	},

	handleTouchOutside: function handleTouchOutside(event) {
		// handle touch outside on ios to dismiss menu
		if (this.wrapper && !this.wrapper.contains(event.target)) {
			this.closeMenu();
		}
	},

	focus: function focus() {
		if (!this.input) return;
		this.input.focus();

		if (this.props.openAfterFocus) {
			this.setState({
				isOpen: true
			});
		}
	},

	blurInput: function blurInput() {
		if (!this.input) return;
		this.input.blur();
	},

	handleTouchMove: function handleTouchMove(event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	},

	handleTouchStart: function handleTouchStart(event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	},

	handleTouchEnd: function handleTouchEnd(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Fire the mouse events
		this.handleMouseDown(event);
	},

	handleTouchEndClearValue: function handleTouchEndClearValue(event) {
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		// Clear the value
		this.clearValue(event);
	},

	handleMouseDown: function handleMouseDown(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, toggle the menu
		if (!this.props.searchable) {
			this.focus();
			return this.setState({
				isOpen: !this.state.isOpen
			});
		}

		if (this.state.isFocused) {
			// On iOS, we can get into a state where we think the input is focused but it isn't really,
			// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
			// Call focus() again here to be safe.
			this.focus();

			var input = this.input;
			if (typeof input.getInput === 'function') {
				// Get the actual DOM input if the ref is an <AutosizeInput /> component
				input = input.getInput();
			}

			// clears the value so that the cursor will be at the end of input when the component re-renders
			input.value = '';

			// if the input is focused, ensure the menu is open
			this.setState({
				isOpen: true,
				isPseudoFocused: false
			});
		} else {
			// otherwise, focus the input and open the menu
			this._openAfterFocus = this.props.openOnFocus;
			this.focus();
		}
	},

	handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		// If the menu isn't open, let the event bubble to the main handleMouseDown
		if (!this.state.isOpen) {
			return;
		}
		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();
		// close the menu
		this.closeMenu();
	},

	handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();

		this._openAfterFocus = true;
		this.focus();
	},

	closeMenu: function closeMenu() {
		if (this.props.onCloseResetsInput) {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: ''
			});
		} else {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: this.state.inputValue
			});
		}
		this.hasScrolledToOption = false;
	},

	handleInputFocus: function handleInputFocus(event) {
		if (this.props.disabled) return;
		var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
		this.setState({
			isFocused: true,
			isOpen: isOpen
		});
		this._openAfterFocus = false;
	},

	handleInputBlur: function handleInputBlur(event) {
		// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
		if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			this.focus();
			return;
		}

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		var onBlurredState = {
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false
		};
		if (this.props.onBlurResetsInput) {
			onBlurredState.inputValue = '';
		}
		this.setState(onBlurredState);
	},

	handleInputChange: function handleInputChange(event) {
		var newInputValue = event.target.value;

		if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
			var nextState = this.props.onInputChange(newInputValue);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null && typeof nextState !== 'object') {
				newInputValue = '' + nextState;
			}
		}

		this.setState({
			isOpen: true,
			isPseudoFocused: false,
			inputValue: newInputValue
		});
	},

	handleKeyDown: function handleKeyDown(event) {
		if (this.props.disabled) return;

		if (typeof this.props.onInputKeyDown === 'function') {
			this.props.onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {
			case 8:
				// backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			case 9:
				// tab
				if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
					return;
				}
				this.selectFocusedOption();
				return;
			case 13:
				// enter
				if (!this.state.isOpen) return;
				event.stopPropagation();
				this.selectFocusedOption();
				break;
			case 27:
				// escape
				if (this.state.isOpen) {
					this.closeMenu();
					event.stopPropagation();
				} else if (this.props.clearable && this.props.escapeClearsValue) {
					this.clearValue(event);
					event.stopPropagation();
				}
				break;
			case 38:
				// up
				this.focusPreviousOption();
				break;
			case 40:
				// down
				this.focusNextOption();
				break;
			case 33:
				// page up
				this.focusPageUpOption();
				break;
			case 34:
				// page down
				this.focusPageDownOption();
				break;
			case 35:
				// end key
				if (event.shiftKey) {
					return;
				}
				this.focusEndOption();
				break;
			case 36:
				// home key
				if (event.shiftKey) {
					return;
				}
				this.focusStartOption();
				break;
			case 46:
				// backspace
				if (!this.state.inputValue && this.props.deleteRemoves) {
					event.preventDefault();
					this.popValue();
				}
				return;
			default:
				return;
		}
		event.preventDefault();
	},

	handleValueClick: function handleValueClick(option, event) {
		if (!this.props.onValueClick) return;
		this.props.onValueClick(option, event);
	},

	handleMenuScroll: function handleMenuScroll(event) {
		if (!this.props.onMenuScrollToBottom) return;
		var target = event.target;

		if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
			this.props.onMenuScrollToBottom();
		}
	},

	handleRequired: function handleRequired(value, multi) {
		if (!value) return true;
		return multi ? value.length === 0 : Object.keys(value).length === 0;
	},

	getOptionLabel: function getOptionLabel(op) {
		return op[this.props.labelKey];
	},

	/**
  * Turns a value into an array from the given options
  * @param	{String|Number|Array}	value		- the value of the select input
  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
  * @returns	{Array}	the value of the select represented in an array
  */
	getValueArray: function getValueArray(value, nextProps) {
		var _this = this;

		/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
		var props = typeof nextProps === 'object' ? nextProps : this.props;
		if (props.multi) {
			if (typeof value === 'string') value = value.split(props.delimiter);
			if (!Array.isArray(value)) {
				if (value === null || value === undefined) return [];
				value = [value];
			}
			return value.map(function (value) {
				return _this.expandValue(value, props);
			}).filter(function (i) {
				return i;
			});
		}
		var expandedValue = this.expandValue(value, props);
		return expandedValue ? [expandedValue] : [];
	},

	/**
  * Retrieve a value from the given options and valueKey
  * @param	{String|Number|Array}	value	- the selected value(s)
  * @param	{Object}		props	- the Select component's props (or nextProps)
  */
	expandValue: function expandValue(value, props) {
		var valueType = typeof value;
		if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
		var options = props.options;
		var valueKey = props.valueKey;

		if (!options) return;
		for (var i = 0; i < options.length; i++) {
			if (options[i][valueKey] === value) return options[i];
		}
	},

	setValue: function setValue(value) {
		var _this2 = this;

		if (this.props.autoBlur) {
			this.blurInput();
		}
		if (!this.props.onChange) return;
		if (this.props.required) {
			var required = this.handleRequired(value, this.props.multi);
			this.setState({ required: required });
		}
		if (this.props.simpleValue && value) {
			value = this.props.multi ? value.map(function (i) {
				return i[_this2.props.valueKey];
			}).join(this.props.delimiter) : value[this.props.valueKey];
		}
		this.props.onChange(value);
	},

	selectValue: function selectValue(value) {
		var _this3 = this;

		//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
		this.hasScrolledToOption = false;
		if (this.props.multi) {
			this.setState({
				inputValue: '',
				focusedIndex: null
			}, function () {
				_this3.addValue(value);
			});
		} else {
			this.setState({
				isOpen: false,
				inputValue: '',
				isPseudoFocused: this.state.isFocused
			}, function () {
				_this3.setValue(value);
			});
		}
	},

	addValue: function addValue(value) {
		var valueArray = this.getValueArray(this.props.value);
		var visibleOptions = this._visibleOptions.filter(function (val) {
			return !val.disabled;
		});
		var lastValueIndex = visibleOptions.indexOf(value);
		this.setValue(valueArray.concat(value));
		if (visibleOptions.length - 1 === lastValueIndex) {
			// the last option was selected; focus the second-last one
			this.focusOption(visibleOptions[lastValueIndex - 1]);
		} else if (visibleOptions.length > lastValueIndex) {
			// focus the option below the selected one
			this.focusOption(visibleOptions[lastValueIndex + 1]);
		}
	},

	popValue: function popValue() {
		var valueArray = this.getValueArray(this.props.value);
		if (!valueArray.length) return;
		if (valueArray[valueArray.length - 1].clearableValue === false) return;
		this.setValue(valueArray.slice(0, valueArray.length - 1));
	},

	removeValue: function removeValue(value) {
		var valueArray = this.getValueArray(this.props.value);
		this.setValue(valueArray.filter(function (i) {
			return i !== value;
		}));
		this.focus();
	},

	clearValue: function clearValue(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(this.getResetValue());
		this.setState({
			isOpen: false,
			inputValue: ''
		}, this.focus);
	},

	getResetValue: function getResetValue() {
		if (this.props.resetValue !== undefined) {
			return this.props.resetValue;
		} else if (this.props.multi) {
			return [];
		} else {
			return null;
		}
	},

	focusOption: function focusOption(option) {
		this.setState({
			focusedOption: option
		});
	},

	focusNextOption: function focusNextOption() {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption: function focusPreviousOption() {
		this.focusAdjacentOption('previous');
	},

	focusPageUpOption: function focusPageUpOption() {
		this.focusAdjacentOption('page_up');
	},

	focusPageDownOption: function focusPageDownOption() {
		this.focusAdjacentOption('page_down');
	},

	focusStartOption: function focusStartOption() {
		this.focusAdjacentOption('start');
	},

	focusEndOption: function focusEndOption() {
		this.focusAdjacentOption('end');
	},

	focusAdjacentOption: function focusAdjacentOption(dir) {
		var options = this._visibleOptions.map(function (option, index) {
			return { option: option, index: index };
		}).filter(function (option) {
			return !option.option.disabled;
		});
		this._scrollToFocusedOptionOnUpdate = true;
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
			});
			return;
		}
		if (!options.length) return;
		var focusedIndex = -1;
		for (var i = 0; i < options.length; i++) {
			if (this._focusedOption === options[i].option) {
				focusedIndex = i;
				break;
			}
		}
		if (dir === 'next' && focusedIndex !== -1) {
			focusedIndex = (focusedIndex + 1) % options.length;
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedIndex = focusedIndex - 1;
			} else {
				focusedIndex = options.length - 1;
			}
		} else if (dir === 'start') {
			focusedIndex = 0;
		} else if (dir === 'end') {
			focusedIndex = options.length - 1;
		} else if (dir === 'page_up') {
			var potentialIndex = focusedIndex - this.props.pageSize;
			if (potentialIndex < 0) {
				focusedIndex = 0;
			} else {
				focusedIndex = potentialIndex;
			}
		} else if (dir === 'page_down') {
			var potentialIndex = focusedIndex + this.props.pageSize;
			if (potentialIndex > options.length - 1) {
				focusedIndex = options.length - 1;
			} else {
				focusedIndex = potentialIndex;
			}
		}

		if (focusedIndex === -1) {
			focusedIndex = 0;
		}

		this.setState({
			focusedIndex: options[focusedIndex].index,
			focusedOption: options[focusedIndex].option
		});
	},

	getFocusedOption: function getFocusedOption() {
		return this._focusedOption;
	},

	getInputValue: function getInputValue() {
		return this.state.inputValue;
	},

	selectFocusedOption: function selectFocusedOption() {
		if (this._focusedOption) {
			return this.selectValue(this._focusedOption);
		}
	},

	renderLoading: function renderLoading() {
		if (!this.props.isLoading) return;
		return _react2['default'].createElement(
			'span',
			{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
			_react2['default'].createElement('span', { className: 'Select-loading' })
		);
	},

	renderValue: function renderValue(valueArray, isOpen) {
		var _this4 = this;

		var renderLabel = this.props.valueRenderer || this.getOptionLabel;
		var ValueComponent = this.props.valueComponent;
		if (!valueArray.length) {
			return !this.state.inputValue ? _react2['default'].createElement(
				'div',
				{ className: 'Select-placeholder' },
				this.props.placeholder
			) : null;
		}
		var onClick = this.props.onValueClick ? this.handleValueClick : null;
		if (this.props.multi) {
			return valueArray.map(function (value, i) {
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: _this4._instancePrefix + '-value-' + i,
						instancePrefix: _this4._instancePrefix,
						disabled: _this4.props.disabled || value.clearableValue === false,
						key: 'value-' + i + '-' + value[_this4.props.valueKey],
						onClick: onClick,
						onRemove: _this4.removeValue,
						value: value
					},
					renderLabel(value, i),
					_react2['default'].createElement(
						'span',
						{ className: 'Select-aria-only' },
						' '
					)
				);
			});
		} else if (!this.state.inputValue) {
			if (isOpen) onClick = null;
			return _react2['default'].createElement(
				ValueComponent,
				{
					id: this._instancePrefix + '-value-item',
					disabled: this.props.disabled,
					instancePrefix: this._instancePrefix,
					onClick: onClick,
					value: valueArray[0]
				},
				renderLabel(valueArray[0])
			);
		}
	},

	renderInput: function renderInput(valueArray, focusedOptionIndex) {
		var _classNames,
		    _this5 = this;

		var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
		var isOpen = !!this.state.isOpen;

		var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

		// TODO: Check how this project includes Object.assign()
		var inputProps = _extends({}, this.props.inputProps, {
			role: 'combobox',
			'aria-expanded': '' + isOpen,
			'aria-owns': ariaOwns,
			'aria-haspopup': '' + isOpen,
			'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
			'aria-labelledby': this.props['aria-labelledby'],
			'aria-label': this.props['aria-label'],
			className: className,
			tabIndex: this.props.tabIndex,
			onBlur: this.handleInputBlur,
			onChange: this.handleInputChange,
			onFocus: this.handleInputFocus,
			ref: function ref(_ref) {
				return _this5.input = _ref;
			},
			required: this.state.required,
			value: this.state.inputValue
		});

		if (this.props.inputRenderer) {
			return this.props.inputRenderer(inputProps);
		}

		if (this.props.disabled || !this.props.searchable) {
			var _props$inputProps = this.props.inputProps;
			var inputClassName = _props$inputProps.inputClassName;

			var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

			return _react2['default'].createElement('div', _extends({}, divProps, {
				role: 'combobox',
				'aria-expanded': isOpen,
				'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				className: className,
				tabIndex: this.props.tabIndex || 0,
				onBlur: this.handleInputBlur,
				onFocus: this.handleInputFocus,
				ref: function (ref) {
					return _this5.input = ref;
				},
				'aria-readonly': '' + !!this.props.disabled,
				style: { border: 0, width: 1, display: 'inline-block' } }));
		}

		if (this.props.autosize) {
			return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5' }));
		}
		return _react2['default'].createElement(
			'div',
			{ className: className },
			_react2['default'].createElement('input', inputProps)
		);
	},

	renderClear: function renderClear() {
		if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
		var clear = this.props.clearRenderer();

		return _react2['default'].createElement(
			'span',
			{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
				onMouseDown: this.clearValue,
				onTouchStart: this.handleTouchStart,
				onTouchMove: this.handleTouchMove,
				onTouchEnd: this.handleTouchEndClearValue
			},
			clear
		);
	},

	renderArrow: function renderArrow() {
		var onMouseDown = this.handleMouseDownOnArrow;
		var isOpen = this.state.isOpen;
		var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

		return _react2['default'].createElement(
			'span',
			{
				className: 'Select-arrow-zone',
				onMouseDown: onMouseDown
			},
			arrow
		);
	},

	filterOptions: function filterOptions(excludeOptions) {
		var filterValue = this.state.inputValue;
		var options = this.props.options || [];
		if (this.props.filterOptions) {
			// Maintain backwards compatibility with boolean attribute
			var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

			return filterOptions(options, filterValue, excludeOptions, {
				filterOption: this.props.filterOption,
				ignoreAccents: this.props.ignoreAccents,
				ignoreCase: this.props.ignoreCase,
				labelKey: this.props.labelKey,
				matchPos: this.props.matchPos,
				matchProp: this.props.matchProp,
				valueKey: this.props.valueKey
			});
		} else {
			return options;
		}
	},

	onOptionRef: function onOptionRef(ref, isFocused) {
		if (isFocused) {
			this.focused = ref;
		}
	},

	renderMenu: function renderMenu(options, valueArray, focusedOption) {
		if (options && options.length) {
			return this.props.menuRenderer({
				focusedOption: focusedOption,
				focusOption: this.focusOption,
				instancePrefix: this._instancePrefix,
				labelKey: this.props.labelKey,
				onFocus: this.focusOption,
				onSelect: this.selectValue,
				optionClassName: this.props.optionClassName,
				optionComponent: this.props.optionComponent,
				optionRenderer: this.props.optionRenderer || this.getOptionLabel,
				options: options,
				selectValue: this.selectValue,
				valueArray: valueArray,
				valueKey: this.props.valueKey,
				onOptionRef: this.onOptionRef
			});
		} else if (this.props.noResultsText) {
			return _react2['default'].createElement(
				'div',
				{ className: 'Select-noresults' },
				this.props.noResultsText
			);
		} else {
			return null;
		}
	},

	renderHiddenField: function renderHiddenField(valueArray) {
		var _this6 = this;

		if (!this.props.name) return;
		if (this.props.joinValues) {
			var value = valueArray.map(function (i) {
				return stringifyValue(i[_this6.props.valueKey]);
			}).join(this.props.delimiter);
			return _react2['default'].createElement('input', {
				type: 'hidden',
				ref: function (ref) {
					return _this6.value = ref;
				},
				name: this.props.name,
				value: value,
				disabled: this.props.disabled });
		}
		return valueArray.map(function (item, index) {
			return _react2['default'].createElement('input', { key: 'hidden.' + index,
				type: 'hidden',
				ref: 'value' + index,
				name: _this6.props.name,
				value: stringifyValue(item[_this6.props.valueKey]),
				disabled: _this6.props.disabled });
		});
	},

	getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
		var options = this._visibleOptions;
		if (!options.length) return null;

		var focusedOption = this.state.focusedOption || selectedOption;
		if (focusedOption && !focusedOption.disabled) {
			var focusedOptionIndex = options.indexOf(focusedOption);
			if (focusedOptionIndex !== -1) {
				return focusedOptionIndex;
			}
		}

		for (var i = 0; i < options.length; i++) {
			if (!options[i].disabled) return i;
		}
		return null;
	},

	renderOuter: function renderOuter(options, valueArray, focusedOption) {
		var _this7 = this;

		var menu = this.renderMenu(options, valueArray, focusedOption);
		if (!menu) {
			return null;
		}

		return _react2['default'].createElement(
			'div',
			{ ref: function (ref) {
					return _this7.menuContainer = ref;
				}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
			_react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this7.menu = ref;
					}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
					style: this.props.menuStyle,
					onScroll: this.handleMenuScroll,
					onMouseDown: this.handleMouseDownOnMenu },
				menu
			)
		);
	},

	render: function render() {
		var _this8 = this;

		var valueArray = this.getValueArray(this.props.value);
		var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
		var isOpen = this.state.isOpen;
		if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
		var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

		var focusedOption = null;
		if (focusedOptionIndex !== null) {
			focusedOption = this._focusedOption = options[focusedOptionIndex];
		} else {
			focusedOption = this._focusedOption = null;
		}
		var className = (0, _classnames2['default'])('Select', this.props.className, {
			'Select--multi': this.props.multi,
			'Select--single': !this.props.multi,
			'is-disabled': this.props.disabled,
			'is-focused': this.state.isFocused,
			'is-loading': this.props.isLoading,
			'is-open': isOpen,
			'is-pseudo-focused': this.state.isPseudoFocused,
			'is-searchable': this.props.searchable,
			'has-value': valueArray.length
		});

		var removeMessage = null;
		if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
			removeMessage = _react2['default'].createElement(
				'span',
				{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
				this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
			);
		}

		return _react2['default'].createElement(
			'div',
			{ ref: function (ref) {
					return _this8.wrapper = ref;
				},
				className: className,
				style: this.props.wrapperStyle },
			this.renderHiddenField(valueArray),
			_react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this8.control = ref;
					},
					className: 'Select-control',
					style: this.props.style,
					onKeyDown: this.handleKeyDown,
					onMouseDown: this.handleMouseDown,
					onTouchEnd: this.handleTouchEnd,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove
				},
				_react2['default'].createElement(
					'span',
					{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
					this.renderValue(valueArray, isOpen),
					this.renderInput(valueArray, focusedOptionIndex)
				),
				removeMessage,
				this.renderLoading(),
				this.renderClear(),
				this.renderArrow()
			),
			isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
		);
	}

});

exports['default'] = Select;
module.exports = exports['default'];

},{"./Async":8,"./AsyncCreatable":9,"./Creatable":10,"./Option":11,"./Value":12,"./utils/defaultArrowRenderer":13,"./utils/defaultClearRenderer":14,"./utils/defaultFilterOptions":15,"./utils/defaultMenuRenderer":16,"classnames":undefined,"react":undefined,"react-dom":undefined,"react-input-autosize":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29uc29saWRhdGVkLWV2ZW50cy9saWIvVGFyZ2V0RXZlbnRIYW5kbGVycy5qcyIsIm5vZGVfbW9kdWxlcy9jb25zb2xpZGF0ZWQtZXZlbnRzL2xpYi9jYW5Vc2VET00uanMiLCJub2RlX21vZHVsZXMvY29uc29saWRhdGVkLWV2ZW50cy9saWIvY2FuVXNlUGFzc2l2ZUV2ZW50TGlzdGVuZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NvbnNvbGlkYXRlZC1ldmVudHMvbGliL2V2ZW50T3B0aW9uc0tleS5qcyIsIm5vZGVfbW9kdWxlcy9jb25zb2xpZGF0ZWQtZXZlbnRzL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb25zb2xpZGF0ZWQtZXZlbnRzL2xpYi9ub3JtYWxpemVFdmVudE9wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtd2F5cG9pbnQvYnVpbGQvd2F5cG9pbnQuanMiLCIvaG9tZS9yb21hbi93d3cvcmVhY3Qtc2VsZWN0L3NyYy9Bc3luYy5qcyIsIi9ob21lL3JvbWFuL3d3dy9yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jQ3JlYXRhYmxlLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvQ3JlYXRhYmxlLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvT3B0aW9uLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvVmFsdWUuanMiLCIvaG9tZS9yb21hbi93d3cvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlci5qcyIsIi9ob21lL3JvbWFuL3d3dy9yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMuanMiLCIvaG9tZS9yb21hbi93d3cvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvc3RyaXBEaWFjcml0aWNzLmpzIiwiL2hvbWUvcm9tYW4vd3d3L3JlYWN0LXNlbGVjdC9zcmMvU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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SUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsSUFBSSxFQUFFLGFBQWEsQ0FBQyxHQUFHLElBQUk7R0FDM0YsQ0FDTDtFQUNGOztDQUVELENBQUMsQ0FBQzs7cUJBRVksTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2V2ZW50T3B0aW9uc0tleSA9IHJlcXVpcmUoJy4vZXZlbnRPcHRpb25zS2V5Jyk7XG5cbnZhciBfZXZlbnRPcHRpb25zS2V5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50T3B0aW9uc0tleSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFRhcmdldEV2ZW50SGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRhcmdldEV2ZW50SGFuZGxlcnModGFyZ2V0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRhcmdldEV2ZW50SGFuZGxlcnMpO1xuXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUYXJnZXRFdmVudEhhbmRsZXJzLCBbe1xuICAgIGtleTogJ2dldEV2ZW50SGFuZGxlcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBnZXRFdmVudEhhbmRsZXJzKGV2ZW50TmFtZSwgb3B0aW9ucykge1xuICAgICAgICB2YXIga2V5ID0gU3RyaW5nKGV2ZW50TmFtZSkgKyAnICcgKyBTdHJpbmcoKDAsIF9ldmVudE9wdGlvbnNLZXkyWydkZWZhdWx0J10pKG9wdGlvbnMpKTtcblxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzW2tleV0pIHtcbiAgICAgICAgICB0aGlzLmV2ZW50c1trZXldID0ge1xuICAgICAgICAgICAgc2l6ZTogMCxcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgaGFuZGxlcnM6IHt9LFxuICAgICAgICAgICAgaGFuZGxlRXZlbnQ6IHVuZGVmaW5lZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRFdmVudEhhbmRsZXJzO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlRXZlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBoYW5kbGVFdmVudChldmVudE5hbWUsIG9wdGlvbnMsIGV2ZW50KSB7XG4gICAgICAgIHZhciBfZ2V0RXZlbnRIYW5kbGVycyA9IHRoaXMuZ2V0RXZlbnRIYW5kbGVycyhldmVudE5hbWUsIG9wdGlvbnMpLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSBfZ2V0RXZlbnRIYW5kbGVycy5oYW5kbGVycztcblxuICAgICAgICBPYmplY3Qua2V5cyhoYW5kbGVycykuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJzW2luZGV4XTtcbiAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBmb3IgcHJlc2VuY2UgaGVyZSBiZWNhdXNlIGEgaGFuZGxlciBmdW5jdGlvbiBtYXlcbiAgICAgICAgICAgIC8vIGNhdXNlIGxhdGVyIGhhbmRsZXJzIHRvIGdldCByZW1vdmVkLiBUaGlzIGNhbiBoYXBwZW4gaWYgeW91IGZvclxuICAgICAgICAgICAgLy8gaW5zdGFuY2UgaGF2ZSBhIHdheXBvaW50IHRoYXQgdW5tb3VudHMgYW5vdGhlciB3YXlwb2ludCBhcyBwYXJ0IG9mIGFuXG4gICAgICAgICAgICAvLyBvbkVudGVyL29uTGVhdmUgaGFuZGxlci5cbiAgICAgICAgICAgIGhhbmRsZXIoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoYW5kbGVFdmVudDtcbiAgICB9KClcbiAgfSwge1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGFkZChldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIG9wdGlvbnMgaGFzIGFscmVhZHkgYmVlbiBub3JtYWxpemVkIGF0IHRoaXMgcG9pbnQuXG4gICAgICAgIHZhciBldmVudEhhbmRsZXJzID0gdGhpcy5nZXRFdmVudEhhbmRsZXJzKGV2ZW50TmFtZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKGV2ZW50SGFuZGxlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIGV2ZW50SGFuZGxlcnMuaGFuZGxlRXZlbnQgPSB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgZXZlbnROYW1lLCBvcHRpb25zKTtcblxuICAgICAgICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXJzLmhhbmRsZUV2ZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc2l6ZSArPSAxO1xuICAgICAgICBldmVudEhhbmRsZXJzLmluZGV4ICs9IDE7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuaGFuZGxlcnNbZXZlbnRIYW5kbGVycy5pbmRleF0gPSBsaXN0ZW5lcjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICBpbmRleDogZXZlbnRIYW5kbGVycy5pbmRleFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWRkO1xuICAgIH0oKVxuICB9LCB7XG4gICAga2V5OiAnZGVsZXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gX2RlbGV0ZShfcmVmKSB7XG4gICAgICAgIHZhciBldmVudE5hbWUgPSBfcmVmLmV2ZW50TmFtZSxcbiAgICAgICAgICAgIGluZGV4ID0gX3JlZi5pbmRleCxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG5cbiAgICAgICAgLy8gb3B0aW9ucyBoYXMgYWxyZWFkeSBiZWVuIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludC5cbiAgICAgICAgdmFyIGV2ZW50SGFuZGxlcnMgPSB0aGlzLmdldEV2ZW50SGFuZGxlcnMoZXZlbnROYW1lLCBvcHRpb25zKTtcblxuICAgICAgICBpZiAoZXZlbnRIYW5kbGVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIG1hdGNoaW5nIGV2ZW50IGhhbmRsZXJzLCBzbyBubyB3b3JrIHRvIGJlIGRvbmUgaGVyZS5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRIYW5kbGVycy5oYW5kbGVyc1tpbmRleF0pIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRIYW5kbGVycy5oYW5kbGVyc1tpbmRleF07XG4gICAgICAgICAgZXZlbnRIYW5kbGVycy5zaXplIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRIYW5kbGVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcnMuaGFuZGxlRXZlbnQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgZXZlbnRIYW5kbGVycy5oYW5kbGVFdmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2RlbGV0ZTtcbiAgICB9KClcbiAgfV0pO1xuXG4gIHJldHVybiBUYXJnZXRFdmVudEhhbmRsZXJzO1xufSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUYXJnZXRFdmVudEhhbmRsZXJzOyIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgQ0FOX1VTRV9ET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDQU5fVVNFX0RPTTsiLCJPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY2FuVXNlUGFzc2l2ZUV2ZW50TGlzdGVuZXJzO1xuXG52YXIgX2NhblVzZURPTSA9IHJlcXVpcmUoJy4vY2FuVXNlRE9NJyk7XG5cbnZhciBfY2FuVXNlRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhblVzZURPTSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLy8gQWRhcHRlZCBmcm9tIE1vZGVybml6clxuLy8gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi81ZWVhN2UyYS9mZWF0dXJlLWRldGVjdHMvZG9tL3Bhc3NpdmVldmVudGxpc3RlbmVycy5qcyNMMjYtTDM1XG5mdW5jdGlvbiB0ZXN0UGFzc2l2ZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAoIV9jYW5Vc2VET00yWydkZWZhdWx0J10pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgc3VwcG9ydHNQYXNzaXZlT3B0aW9uID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICBzdXBwb3J0c1Bhc3NpdmVPcHRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdldDtcbiAgICAgIH0oKVxuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlT3B0aW9uO1xufVxuXG52YXIgbWVtb2l6ZWQgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIGNhblVzZVBhc3NpdmVFdmVudExpc3RlbmVycygpIHtcbiAgaWYgKG1lbW9pemVkID09PSB1bmRlZmluZWQpIHtcbiAgICBtZW1vaXplZCA9IHRlc3RQYXNzaXZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuICByZXR1cm4gbWVtb2l6ZWQ7XG59IiwiT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZXZlbnRPcHRpb25zS2V5O1xuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIGtleSBmb3IgYW55IHNldCBvZiBldmVudCBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGV2ZW50T3B0aW9uc0tleShub3JtYWxpemVkRXZlbnRPcHRpb25zKSB7XG4gIGlmICghbm9ybWFsaXplZEV2ZW50T3B0aW9ucykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLy8gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgdGhlIG5vcm1hbGl6ZWRcbiAgLy8gZXZlbnQgb3B0aW9ucyB3aWxsIGJlIGEgYm9vbGVhbi5cbiAgaWYgKG5vcm1hbGl6ZWRFdmVudE9wdGlvbnMgPT09IHRydWUpIHtcbiAgICByZXR1cm4gMTAwO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIHNvIHdlIGV4cGVjdFxuICAvLyB0aGUgZXZlbnQgb3B0aW9ucyB0byBiZSBhbiBvYmplY3Qgd2l0aCBwb3NzaWJsZSBwcm9wZXJ0aWVzIG9mIGNhcHR1cmUsXG4gIC8vIHBhc3NpdmUsIGFuZCBvbmNlLlxuICAvL1xuICAvLyBXZSB3YW50IHRvIGNvbnNpc3RlbnRseSByZXR1cm4gdGhlIHNhbWUgdmFsdWUsIHJlZ2FyZGxlc3Mgb2YgdGhlIG9yZGVyIG9mXG4gIC8vIHRoZXNlIHByb3BlcnRpZXMsIHNvIGxldCdzIHVzZSBiaW5hcnkgbWF0aHMgdG8gYXNzaWduIGVhY2ggcHJvcGVydHkgdG8gYVxuICAvLyBiaXQsIGFuZCB0aGVuIGFkZCB0aG9zZSB0b2dldGhlciAod2l0aCBhbiBvZmZzZXQgdG8gYWNjb3VudCBmb3IgdGhlXG4gIC8vIGJvb2xlYW5zIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBmdW5jdGlvbikuXG4gIHZhciBjYXB0dXJlID0gbm9ybWFsaXplZEV2ZW50T3B0aW9ucy5jYXB0dXJlIDw8IDA7XG4gIHZhciBwYXNzaXZlID0gbm9ybWFsaXplZEV2ZW50T3B0aW9ucy5wYXNzaXZlIDw8IDE7XG4gIHZhciBvbmNlID0gbm9ybWFsaXplZEV2ZW50T3B0aW9ucy5vbmNlIDw8IDI7XG4gIHJldHVybiBjYXB0dXJlICsgcGFzc2l2ZSArIG9uY2U7XG59IiwiT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRVZFTlRfSEFORExFUlNfS0VZID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbnZhciBfbm9ybWFsaXplRXZlbnRPcHRpb25zID0gcmVxdWlyZSgnLi9ub3JtYWxpemVFdmVudE9wdGlvbnMnKTtcblxudmFyIF9ub3JtYWxpemVFdmVudE9wdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9ybWFsaXplRXZlbnRPcHRpb25zKTtcblxudmFyIF9UYXJnZXRFdmVudEhhbmRsZXJzID0gcmVxdWlyZSgnLi9UYXJnZXRFdmVudEhhbmRsZXJzJyk7XG5cbnZhciBfVGFyZ2V0RXZlbnRIYW5kbGVyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UYXJnZXRFdmVudEhhbmRsZXJzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vLyBFeHBvcnQgdG8gbWFrZSB0ZXN0aW5nIHBvc3NpYmxlLlxudmFyIEVWRU5UX0hBTkRMRVJTX0tFWSA9IGV4cG9ydHMuRVZFTlRfSEFORExFUlNfS0VZID0gJ19fY29uc29saWRhdGVkX2V2ZW50c19oYW5kbGVyc19fJztcblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgaWYgKCF0YXJnZXRbRVZFTlRfSEFORExFUlNfS0VZXSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRhcmdldFtFVkVOVF9IQU5ETEVSU19LRVldID0gbmV3IF9UYXJnZXRFdmVudEhhbmRsZXJzMlsnZGVmYXVsdCddKHRhcmdldCk7XG4gIH1cbiAgdmFyIG5vcm1hbGl6ZWRFdmVudE9wdGlvbnMgPSAoMCwgX25vcm1hbGl6ZUV2ZW50T3B0aW9uczJbJ2RlZmF1bHQnXSkob3B0aW9ucyk7XG4gIHJldHVybiB0YXJnZXRbRVZFTlRfSEFORExFUlNfS0VZXS5hZGQoZXZlbnROYW1lLCBsaXN0ZW5lciwgbm9ybWFsaXplZEV2ZW50T3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRIYW5kbGUpIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50SGFuZGxlLnRhcmdldDtcblxuICAvLyBUaGVyZSBjYW4gYmUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSB0aGUgdGFyZ2V0IG1heSBubyBsb25nZXIgZXhpc3Qgd2hlblxuICAvLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCwgZS5nLiB3aGVuIGEgUmVhY3QgY29tcG9uZW50IGlzIHVubW91bnRpbmcuXG4gIC8vIEd1YXJkaW5nIGFnYWluc3QgdGhpcyBwcmV2ZW50cyB0aGUgZm9sbG93aW5nIGVycm9yOlxuICAvL1xuICAvLyAgIENhbm5vdCByZWFkIHByb3BlcnR5ICdyZW1vdmVFdmVudExpc3RlbmVyJyBvZiB1bmRlZmluZWRcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0W0VWRU5UX0hBTkRMRVJTX0tFWV1bJ2RlbGV0ZSddKGV2ZW50SGFuZGxlKTtcbiAgfVxufSIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBub3JtYWxpemVFdmVudE9wdGlvbnM7XG5cbnZhciBfY2FuVXNlUGFzc2l2ZUV2ZW50TGlzdGVuZXJzID0gcmVxdWlyZSgnLi9jYW5Vc2VQYXNzaXZlRXZlbnRMaXN0ZW5lcnMnKTtcblxudmFyIF9jYW5Vc2VQYXNzaXZlRXZlbnRMaXN0ZW5lcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FuVXNlUGFzc2l2ZUV2ZW50TGlzdGVuZXJzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBub3JtYWxpemVFdmVudE9wdGlvbnMoZXZlbnRPcHRpb25zKSB7XG4gIGlmICghZXZlbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghKDAsIF9jYW5Vc2VQYXNzaXZlRXZlbnRMaXN0ZW5lcnMyWydkZWZhdWx0J10pKCkpIHtcbiAgICAvLyBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBwYXNzaXZlIG9wdGlvbiwgdGhlbiBpdCBpcyBleHBlY3RpbmdcbiAgICAvLyBhIGJvb2xlYW4gZm9yIHRoZSBvcHRpb25zIGFyZ3VtZW50IHRvIHNwZWNpZnkgd2hldGhlciBpdCBzaG91bGQgdXNlXG4gICAgLy8gY2FwdHVyZSBvciBub3QuIEluIG1vcmUgbW9kZXJuIGJyb3dzZXJzLCB0aGlzIGlzIHBhc3NlZCB2aWEgdGhlIGBjYXB0dXJlYFxuICAgIC8vIG9wdGlvbiwgc28gbGV0J3MganVzdCBob2lzdCB0aGF0IHZhbHVlIHVwLlxuICAgIHJldHVybiAhIWV2ZW50T3B0aW9ucy5jYXB0dXJlO1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50T3B0aW9ucztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jb25zb2xpZGF0ZWRFdmVudHMgPSByZXF1aXJlKCdjb25zb2xpZGF0ZWQtZXZlbnRzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFBPU0lUSU9OUyA9IHtcbiAgYWJvdmU6ICdhYm92ZScsXG4gIGluc2lkZTogJ2luc2lkZScsXG4gIGJlbG93OiAnYmVsb3cnLFxuICBpbnZpc2libGU6ICdpbnZpc2libGUnXG59O1xuXG52YXIgZGVmYXVsdFByb3BzID0ge1xuICB0b3BPZmZzZXQ6ICcwcHgnLFxuICBib3R0b21PZmZzZXQ6ICcwcHgnLFxuICBob3Jpem9udGFsOiBmYWxzZSxcbiAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHt9LFxuICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge30sXG4gIG9uUG9zaXRpb25DaGFuZ2U6IGZ1bmN0aW9uIG9uUG9zaXRpb25DaGFuZ2UoKSB7fSxcblxuICBmaXJlT25SYXBpZFNjcm9sbDogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZGVidWdMb2coKSB7XG4gIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBib3VuZHMgQW4gb2JqZWN0IHdpdGggYm91bmRzIGRhdGEgZm9yIHRoZSB3YXlwb2ludCBhbmRcbiAqICAgc2Nyb2xsYWJsZSBwYXJlbnRcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHdheXBvaW50IGluIHJlbGF0aW9uIHRvIHRoZVxuICogICB2aXNpYmxlIHBvcnRpb24gb2YgdGhlIHNjcm9sbGFibGUgcGFyZW50LiBPbmUgb2YgYFBPU0lUSU9OUy5hYm92ZWAsXG4gKiAgIGBQT1NJVElPTlMuYmVsb3dgLCBvciBgUE9TSVRJT05TLmluc2lkZWAuXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRQb3NpdGlvbihib3VuZHMpIHtcbiAgaWYgKGJvdW5kcy52aWV3cG9ydEJvdHRvbSAtIGJvdW5kcy52aWV3cG9ydFRvcCA9PT0gMCkge1xuICAgIHJldHVybiBQT1NJVElPTlMuaW52aXNpYmxlO1xuICB9XG5cbiAgLy8gdG9wIGlzIHdpdGhpbiB0aGUgdmlld3BvcnRcbiAgaWYgKGJvdW5kcy52aWV3cG9ydFRvcCA8PSBib3VuZHMud2F5cG9pbnRUb3AgJiYgYm91bmRzLndheXBvaW50VG9wIDw9IGJvdW5kcy52aWV3cG9ydEJvdHRvbSkge1xuICAgIHJldHVybiBQT1NJVElPTlMuaW5zaWRlO1xuICB9XG5cbiAgLy8gYm90dG9tIGlzIHdpdGhpbiB0aGUgdmlld3BvcnRcbiAgaWYgKGJvdW5kcy52aWV3cG9ydFRvcCA8PSBib3VuZHMud2F5cG9pbnRCb3R0b20gJiYgYm91bmRzLndheXBvaW50Qm90dG9tIDw9IGJvdW5kcy52aWV3cG9ydEJvdHRvbSkge1xuICAgIHJldHVybiBQT1NJVElPTlMuaW5zaWRlO1xuICB9XG5cbiAgLy8gdG9wIGlzIGFib3ZlIHRoZSB2aWV3cG9ydCBhbmQgYm90dG9tIGlzIGJlbG93IHRoZSB2aWV3cG9ydFxuICBpZiAoYm91bmRzLndheXBvaW50VG9wIDw9IGJvdW5kcy52aWV3cG9ydFRvcCAmJiBib3VuZHMudmlld3BvcnRCb3R0b20gPD0gYm91bmRzLndheXBvaW50Qm90dG9tKSB7XG4gICAgcmV0dXJuIFBPU0lUSU9OUy5pbnNpZGU7XG4gIH1cblxuICBpZiAoYm91bmRzLnZpZXdwb3J0Qm90dG9tIDwgYm91bmRzLndheXBvaW50VG9wKSB7XG4gICAgcmV0dXJuIFBPU0lUSU9OUy5iZWxvdztcbiAgfVxuXG4gIGlmIChib3VuZHMud2F5cG9pbnRUb3AgPCBib3VuZHMudmlld3BvcnRUb3ApIHtcbiAgICByZXR1cm4gUE9TSVRJT05TLmFib3ZlO1xuICB9XG5cbiAgcmV0dXJuIFBPU0lUSU9OUy5pbnZpc2libGU7XG59XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gcGFyc2UgdGhlIG9mZnNldCBwcm92aWRlZCBhcyBhIHByb3AgYXMgYSBwaXhlbCB2YWx1ZS4gSWZcbiAqIHBhcnNpbmcgZmFpbHMsIHRoZW4gYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuIFRocmVlIGV4YW1wbGVzIG9mIHZhbHVlcyB0aGF0XG4gKiB3aWxsIGJlIHN1Y2Nlc3NmdWxseSBwYXJzZWQgYXJlOlxuICogYDIwYFxuICogXCIyMHB4XCJcbiAqIFwiMjBcIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gc3RyIEEgc3RyaW5nIG9mIHRoZSBmb3JtIFwie251bWJlcn1cIiBvciBcIntudW1iZXJ9cHhcIixcbiAqICAgb3IganVzdCBhIG51bWJlci5cbiAqIEByZXR1cm4ge251bWJlcnx1bmRlZmluZWR9IFRoZSBudW1lcmljIHZlcnNpb24gb2YgYHN0cmAuIFVuZGVmaW5lZCBpZiBgc3RyYFxuICogICB3YXMgbmVpdGhlciBhIG51bWJlciBub3Igc3RyaW5nIGVuZGluZyBpbiBcInB4XCIuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlT2Zmc2V0QXNQaXhlbHMoc3RyKSB7XG4gIGlmICghaXNOYU4ocGFyc2VGbG9hdChzdHIpKSAmJiBpc0Zpbml0ZShzdHIpKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgfSBlbHNlIGlmIChzdHIuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyLnNsaWNlKDAsIC0yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBwYXJzZSB0aGUgb2Zmc2V0IHByb3ZpZGVkIGFzIGEgcHJvcCBhcyBhIHBlcmNlbnRhZ2UuIEZvclxuICogaW5zdGFuY2UsIGlmIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gcHJvdmlkZWQgd2l0aCB0aGUgc3RyaW5nIFwiMjAlXCIgYXNcbiAqIGEgdmFsdWUgb2Ygb25lIG9mIHRoZSBvZmZzZXQgcHJvcHMuIElmIHRoZSB2YWx1ZSBtYXRjaGVzLCB0aGVuIGl0IHJldHVybnNcbiAqIGEgbnVtZXJpYyB2ZXJzaW9uIG9mIHRoZSBwcm9wLiBGb3IgaW5zdGFuY2UsIFwiMjAlXCIgd291bGQgYmVjb21lIGAwLjJgLlxuICogSWYgYHN0cmAgaXNuJ3QgYSBwZXJjZW50YWdlLCB0aGVuIGB1bmRlZmluZWRgIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgdmFsdWUgb2YgYW4gb2Zmc2V0IHByb3AgdG8gYmUgY29udmVydGVkIHRvIGFcbiAqICAgbnVtYmVyLlxuICogQHJldHVybiB7bnVtYmVyfHVuZGVmaW5lZH0gVGhlIG51bWVyaWMgdmVyc2lvbiBvZiBgc3RyYC4gVW5kZWZpbmVkIGlmIGBzdHJgXG4gKiAgIHdhcyBub3QgYSBwZXJjZW50YWdlLlxuICovXG5mdW5jdGlvbiBwYXJzZU9mZnNldEFzUGVyY2VudGFnZShzdHIpIHtcbiAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICclJykge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHN0ci5zbGljZSgwLCAtMSkpIC8gMTAwO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb250ZXh0SGVpZ2h0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIHJlcHJlc2VudGluZyBgb2Zmc2V0YCBjb252ZXJ0ZWQgaW50byBwaXhlbHMuXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVPZmZzZXRQaXhlbHMob2Zmc2V0LCBjb250ZXh0SGVpZ2h0KSB7XG4gIHZhciBwaXhlbE9mZnNldCA9IHBhcnNlT2Zmc2V0QXNQaXhlbHMob2Zmc2V0KTtcblxuICBpZiAodHlwZW9mIHBpeGVsT2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBwaXhlbE9mZnNldDtcbiAgfVxuXG4gIHZhciBwZXJjZW50T2Zmc2V0ID0gcGFyc2VPZmZzZXRBc1BlcmNlbnRhZ2Uob2Zmc2V0KTtcbiAgaWYgKHR5cGVvZiBwZXJjZW50T2Zmc2V0ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBwZXJjZW50T2Zmc2V0ICogY29udGV4dEhlaWdodDtcbiAgfVxufVxuXG4vKipcbiAqIFdoZW4gYW4gZWxlbWVudCdzIHR5cGUgaXMgYSBzdHJpbmcsIGl0IHJlcHJlc2VudHMgYSBET00gbm9kZSB3aXRoIHRoYXQgdGFnIG5hbWVcbiAqIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2Jsb2cvMjAxNS8xMi8xOC9yZWFjdC1jb21wb25lbnRzLWVsZW1lbnRzLWFuZC1pbnN0YW5jZXMuaHRtbCNkb20tZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge1JlYWN0LmVsZW1lbnR9IENvbXBvbmVudFxuICogQHJldHVybiB7Ym9vbH0gV2hldGhlciB0aGUgY29tcG9uZW50IGlzIGEgRE9NIEVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gaXNET01FbGVtZW50KENvbXBvbmVudCkge1xuICByZXR1cm4gdHlwZW9mIENvbXBvbmVudC50eXBlID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBSYWlzZSBhbiBlcnJvciBpZiBcImNoaWxkcmVuXCIgaXNuJ3QgYSBzaW5nbGUgRE9NIEVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1JlYWN0LmVsZW1lbnR8bnVsbH0gY2hpbGRyZW5cbiAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gZW5zdXJlQ2hpbGRyZW5Jc1NpbmdsZURPTUVsZW1lbnQoY2hpbGRyZW4pIHtcbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuXG4gICAgaWYgKCFpc0RPTUVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHdyYXAgYW55IENvbXBvbmVudCBFbGVtZW50cyBwYXNzZWQgdG8gV2F5cG9pbnQgaW4gYSBET00gRWxlbWVudCAoZWc7IGEgPGRpdj4pLicpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENhbGxzIGEgZnVuY3Rpb24gd2hlbiB5b3Ugc2Nyb2xsIHRvIHRoZSBlbGVtZW50LlxuICovXG5cbnZhciBXYXlwb2ludCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhXYXlwb2ludCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gV2F5cG9pbnQocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2F5cG9pbnQpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFdheXBvaW50Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F5cG9pbnQpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5yZWZFbGVtZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBfdGhpcy5fcmVmID0gZTtcbiAgICB9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhXYXlwb2ludCwgW3tcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICBlbnN1cmVDaGlsZHJlbklzU2luZ2xlRE9NRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuKTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMuc2Nyb2xsYWJsZVBhcmVudCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYHNjcm9sbGFibGVQYXJlbnRgIHByb3AgaGFzIGNoYW5nZWQgbmFtZSB0byBgc2Nyb2xsYWJsZUFuY2VzdG9yYC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICghV2F5cG9pbnQuZ2V0V2luZG93KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9oYW5kbGVTY3JvbGwgPSB0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUFuY2VzdG9yID0gdGhpcy5fZmluZFNjcm9sbGFibGVBbmNlc3RvcigpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5kZWJ1Zykge1xuICAgICAgICBkZWJ1Z0xvZygnc2Nyb2xsYWJsZUFuY2VzdG9yJywgdGhpcy5zY3JvbGxhYmxlQW5jZXN0b3IpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50TGlzdGVuZXJIYW5kbGUgPSAoMCwgX2NvbnNvbGlkYXRlZEV2ZW50cy5hZGRFdmVudExpc3RlbmVyKSh0aGlzLnNjcm9sbGFibGVBbmNlc3RvciwgJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZVNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgICB0aGlzLnJlc2l6ZUV2ZW50TGlzdGVuZXJIYW5kbGUgPSAoMCwgX2NvbnNvbGlkYXRlZEV2ZW50cy5hZGRFdmVudExpc3RlbmVyKSh3aW5kb3csICdyZXNpemUnLCB0aGlzLl9oYW5kbGVTY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgICAgLy8gdGhpcy5fcmVmIG1heSBvY2Nhc2lvbmFsbHkgbm90IGJlIHNldCBhdCB0aGlzIHRpbWUuIFRvIGhlbHAgZW5zdXJlIHRoYXRcbiAgICAgIC8vIHRoaXMgd29ya3Mgc21vb3RobHksIHdlIHdhbnQgdG8gZGVsYXkgdGhlIGluaXRpYWwgZXhlY3V0aW9uIHVudGlsIHRoZVxuICAgICAgLy8gbmV4dCB0aWNrLlxuICAgICAgdGhpcy5pbml0aWFsVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuX2hhbmRsZVNjcm9sbChudWxsKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgZW5zdXJlQ2hpbGRyZW5Jc1NpbmdsZURPTUVsZW1lbnQobmV4dFByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICBpZiAoIVdheXBvaW50LmdldFdpbmRvdygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGVsZW1lbnQgbWF5IGhhdmUgbW92ZWQuXG4gICAgICB0aGlzLl9oYW5kbGVTY3JvbGwobnVsbCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICghV2F5cG9pbnQuZ2V0V2luZG93KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAoMCwgX2NvbnNvbGlkYXRlZEV2ZW50cy5yZW1vdmVFdmVudExpc3RlbmVyKSh0aGlzLnNjcm9sbEV2ZW50TGlzdGVuZXJIYW5kbGUpO1xuICAgICAgKDAsIF9jb25zb2xpZGF0ZWRFdmVudHMucmVtb3ZlRXZlbnRMaXN0ZW5lcikodGhpcy5yZXNpemVFdmVudExpc3RlbmVySGFuZGxlKTtcblxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5pdGlhbFRpbWVvdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYXZlcnNlcyB1cCB0aGUgRE9NIHRvIGZpbmQgYW4gYW5jZXN0b3IgY29udGFpbmVyIHdoaWNoIGhhcyBhbiBvdmVyZmxvd1xuICAgICAqIHN0eWxlIHRoYXQgYWxsb3dzIGZvciBzY3JvbGxpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBjbG9zZXN0IGFuY2VzdG9yIGVsZW1lbnQgd2l0aCBhbiBvdmVyZmxvdyBzdHlsZSB0aGF0XG4gICAgICogICBhbGxvd3MgZm9yIHNjcm9sbGluZy4gSWYgbm9uZSBpcyBmb3VuZCwgdGhlIGB3aW5kb3dgIG9iamVjdCBpcyByZXR1cm5lZFxuICAgICAqICAgYXMgYSBmYWxsYmFjay5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2ZpbmRTY3JvbGxhYmxlQW5jZXN0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZmluZFNjcm9sbGFibGVBbmNlc3RvcigpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLnNjcm9sbGFibGVBbmNlc3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zY3JvbGxhYmxlQW5jZXN0b3I7XG4gICAgICB9XG5cbiAgICAgIHZhciBub2RlID0gdGhpcy5fcmVmO1xuXG4gICAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgLy8gVGhpcyBwYXJ0aWN1bGFyIG5vZGUgZG9lcyBub3QgaGF2ZSBhIGNvbXB1dGVkIHN0eWxlLlxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgIC8vIFRoaXMgcGFydGljdWxhciBub2RlIGRvZXMgbm90IGhhdmUgYSBzY3JvbGwgYmFyLCBpdCB1c2VzIHRoZSB3aW5kb3cuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgdmFyIG92ZXJmbG93RGlyZWMgPSB0aGlzLnByb3BzLmhvcml6b250YWwgPyBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdvdmVyZmxvdy14JykgOiBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdvdmVyZmxvdy15Jyk7XG4gICAgICAgIHZhciBvdmVyZmxvdyA9IG92ZXJmbG93RGlyZWMgfHwgc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnb3ZlcmZsb3cnKTtcblxuICAgICAgICBpZiAob3ZlcmZsb3cgPT09ICdhdXRvJyB8fCBvdmVyZmxvdyA9PT0gJ3Njcm9sbCcpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBIHNjcm9sbGFibGUgYW5jZXN0b3IgZWxlbWVudCB3YXMgbm90IGZvdW5kLCB3aGljaCBtZWFucyB0aGF0IHdlIG5lZWQgdG9cbiAgICAgIC8vIGRvIHN0dWZmIG9uIHdpbmRvdy5cbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBuYXRpdmUgc2Nyb2xsIGV2ZW50IGNvbWluZyBmcm9tIHRoZSBzY3JvbGxhYmxlXG4gICAgICogICBhbmNlc3Rvciwgb3IgcmVzaXplIGV2ZW50IGNvbWluZyBmcm9tIHRoZSB3aW5kb3cuIFdpbGwgYmUgdW5kZWZpbmVkIGlmXG4gICAgICogICBjYWxsZWQgYnkgYSBSZWFjdCBsaWZlY3lsZSBtZXRob2RcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2hhbmRsZVNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVTY3JvbGwoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5fcmVmKSB7XG4gICAgICAgIC8vIFRoZXJlJ3MgYSBjaGFuY2Ugd2UgZW5kIHVwIGhlcmUgYWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB1bm1vdW50ZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuX2dldEJvdW5kcygpO1xuICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IGdldEN1cnJlbnRQb3NpdGlvbihib3VuZHMpO1xuICAgICAgdmFyIHByZXZpb3VzUG9zaXRpb24gPSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5kZWJ1Zykge1xuICAgICAgICBkZWJ1Z0xvZygnY3VycmVudFBvc2l0aW9uJywgY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgZGVidWdMb2coJ3ByZXZpb3VzUG9zaXRpb24nLCBwcmV2aW91c1Bvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2F2ZSBwcmV2aW91cyBwb3NpdGlvbiBhcyBlYXJseSBhcyBwb3NzaWJsZSB0byBwcmV2ZW50IGN5Y2xlc1xuICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcblxuICAgICAgaWYgKHByZXZpb3VzUG9zaXRpb24gPT09IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAvLyBObyBjaGFuZ2Ugc2luY2UgbGFzdCB0cmlnZ2VyXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGxiYWNrQXJnID0ge1xuICAgICAgICBjdXJyZW50UG9zaXRpb246IGN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgcHJldmlvdXNQb3NpdGlvbjogcHJldmlvdXNQb3NpdGlvbixcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB3YXlwb2ludFRvcDogYm91bmRzLndheXBvaW50VG9wLFxuICAgICAgICB3YXlwb2ludEJvdHRvbTogYm91bmRzLndheXBvaW50Qm90dG9tLFxuICAgICAgICB2aWV3cG9ydFRvcDogYm91bmRzLnZpZXdwb3J0VG9wLFxuICAgICAgICB2aWV3cG9ydEJvdHRvbTogYm91bmRzLnZpZXdwb3J0Qm90dG9tXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9wcy5vblBvc2l0aW9uQ2hhbmdlLmNhbGwodGhpcywgY2FsbGJhY2tBcmcpO1xuXG4gICAgICBpZiAoY3VycmVudFBvc2l0aW9uID09PSBQT1NJVElPTlMuaW5zaWRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25FbnRlci5jYWxsKHRoaXMsIGNhbGxiYWNrQXJnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNQb3NpdGlvbiA9PT0gUE9TSVRJT05TLmluc2lkZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uTGVhdmUuY2FsbCh0aGlzLCBjYWxsYmFja0FyZyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpc1JhcGlkU2Nyb2xsRG93biA9IHByZXZpb3VzUG9zaXRpb24gPT09IFBPU0lUSU9OUy5iZWxvdyAmJiBjdXJyZW50UG9zaXRpb24gPT09IFBPU0lUSU9OUy5hYm92ZTtcbiAgICAgIHZhciBpc1JhcGlkU2Nyb2xsVXAgPSBwcmV2aW91c1Bvc2l0aW9uID09PSBQT1NJVElPTlMuYWJvdmUgJiYgY3VycmVudFBvc2l0aW9uID09PSBQT1NJVElPTlMuYmVsb3c7XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmZpcmVPblJhcGlkU2Nyb2xsICYmIChpc1JhcGlkU2Nyb2xsRG93biB8fCBpc1JhcGlkU2Nyb2xsVXApKSB7XG4gICAgICAgIC8vIElmIHRoZSBzY3JvbGwgZXZlbnQgaXNuJ3QgZmlyZWQgb2Z0ZW4gZW5vdWdoIHRvIG9jY3VyIHdoaWxlIHRoZVxuICAgICAgICAvLyB3YXlwb2ludCB3YXMgdmlzaWJsZSwgd2UgdHJpZ2dlciBib3RoIGNhbGxiYWNrcyBhbnl3YXkuXG4gICAgICAgIHRoaXMucHJvcHMub25FbnRlci5jYWxsKHRoaXMsIHtcbiAgICAgICAgICBjdXJyZW50UG9zaXRpb246IFBPU0lUSU9OUy5pbnNpZGUsXG4gICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjogcHJldmlvdXNQb3NpdGlvbixcbiAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgd2F5cG9pbnRUb3A6IGJvdW5kcy53YXlwb2ludFRvcCxcbiAgICAgICAgICB3YXlwb2ludEJvdHRvbTogYm91bmRzLndheXBvaW50Qm90dG9tLFxuICAgICAgICAgIHZpZXdwb3J0VG9wOiBib3VuZHMudmlld3BvcnRUb3AsXG4gICAgICAgICAgdmlld3BvcnRCb3R0b206IGJvdW5kcy52aWV3cG9ydEJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkxlYXZlLmNhbGwodGhpcywge1xuICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uLFxuICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IFBPU0lUSU9OUy5pbnNpZGUsXG4gICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgIHdheXBvaW50VG9wOiBib3VuZHMud2F5cG9pbnRUb3AsXG4gICAgICAgICAgd2F5cG9pbnRCb3R0b206IGJvdW5kcy53YXlwb2ludEJvdHRvbSxcbiAgICAgICAgICB2aWV3cG9ydFRvcDogYm91bmRzLnZpZXdwb3J0VG9wLFxuICAgICAgICAgIHZpZXdwb3J0Qm90dG9tOiBib3VuZHMudmlld3BvcnRCb3R0b21cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldEJvdW5kcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRCb3VuZHMoKSB7XG4gICAgICB2YXIgaG9yaXpvbnRhbCA9IHRoaXMucHJvcHMuaG9yaXpvbnRhbDtcblxuICAgICAgdmFyIF9yZWYkZ2V0Qm91bmRpbmdDbGllbiA9IHRoaXMuX3JlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgdmFyIGxlZnQgPSBfcmVmJGdldEJvdW5kaW5nQ2xpZW4ubGVmdDtcbiAgICAgIHZhciB0b3AgPSBfcmVmJGdldEJvdW5kaW5nQ2xpZW4udG9wO1xuICAgICAgdmFyIHJpZ2h0ID0gX3JlZiRnZXRCb3VuZGluZ0NsaWVuLnJpZ2h0O1xuICAgICAgdmFyIGJvdHRvbSA9IF9yZWYkZ2V0Qm91bmRpbmdDbGllbi5ib3R0b207XG5cbiAgICAgIHZhciB3YXlwb2ludFRvcCA9IGhvcml6b250YWwgPyBsZWZ0IDogdG9wO1xuICAgICAgdmFyIHdheXBvaW50Qm90dG9tID0gaG9yaXpvbnRhbCA/IHJpZ2h0IDogYm90dG9tO1xuXG4gICAgICB2YXIgY29udGV4dEhlaWdodCA9IHZvaWQgMDtcbiAgICAgIHZhciBjb250ZXh0U2Nyb2xsVG9wID0gdm9pZCAwO1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUFuY2VzdG9yID09PSB3aW5kb3cpIHtcbiAgICAgICAgY29udGV4dEhlaWdodCA9IGhvcml6b250YWwgPyB3aW5kb3cuaW5uZXJXaWR0aCA6IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29udGV4dFNjcm9sbFRvcCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0SGVpZ2h0ID0gaG9yaXpvbnRhbCA/IHRoaXMuc2Nyb2xsYWJsZUFuY2VzdG9yLm9mZnNldFdpZHRoIDogdGhpcy5zY3JvbGxhYmxlQW5jZXN0b3Iub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb250ZXh0U2Nyb2xsVG9wID0gaG9yaXpvbnRhbCA/IHRoaXMuc2Nyb2xsYWJsZUFuY2VzdG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgOiB0aGlzLnNjcm9sbGFibGVBbmNlc3Rvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmRlYnVnKSB7XG4gICAgICAgIGRlYnVnTG9nKCd3YXlwb2ludCB0b3AnLCB3YXlwb2ludFRvcCk7XG4gICAgICAgIGRlYnVnTG9nKCd3YXlwb2ludCBib3R0b20nLCB3YXlwb2ludEJvdHRvbSk7XG4gICAgICAgIGRlYnVnTG9nKCdzY3JvbGxhYmxlQW5jZXN0b3IgaGVpZ2h0JywgY29udGV4dEhlaWdodCk7XG4gICAgICAgIGRlYnVnTG9nKCdzY3JvbGxhYmxlQW5jZXN0b3Igc2Nyb2xsVG9wJywgY29udGV4dFNjcm9sbFRvcCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGJvdHRvbU9mZnNldCA9IF9wcm9wcy5ib3R0b21PZmZzZXQ7XG4gICAgICB2YXIgdG9wT2Zmc2V0ID0gX3Byb3BzLnRvcE9mZnNldDtcblxuICAgICAgdmFyIHRvcE9mZnNldFB4ID0gY29tcHV0ZU9mZnNldFBpeGVscyh0b3BPZmZzZXQsIGNvbnRleHRIZWlnaHQpO1xuICAgICAgdmFyIGJvdHRvbU9mZnNldFB4ID0gY29tcHV0ZU9mZnNldFBpeGVscyhib3R0b21PZmZzZXQsIGNvbnRleHRIZWlnaHQpO1xuICAgICAgdmFyIGNvbnRleHRCb3R0b20gPSBjb250ZXh0U2Nyb2xsVG9wICsgY29udGV4dEhlaWdodDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2F5cG9pbnRUb3A6IHdheXBvaW50VG9wLFxuICAgICAgICB3YXlwb2ludEJvdHRvbTogd2F5cG9pbnRCb3R0b20sXG4gICAgICAgIHZpZXdwb3J0VG9wOiBjb250ZXh0U2Nyb2xsVG9wICsgdG9wT2Zmc2V0UHgsXG4gICAgICAgIHZpZXdwb3J0Qm90dG9tOiBjb250ZXh0Qm90dG9tIC0gYm90dG9tT2Zmc2V0UHhcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuXG4gICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgYW4gZWxlbWVudCB0aGF0IHdlIGNhbiBsb2NhdGUgaW4gdGhlIERPTSB0byBkZXRlcm1pbmUgd2hlcmUgaXQgaXNcbiAgICAgICAgLy8gcmVuZGVyZWQgcmVsYXRpdmUgdG8gdGhlIHRvcCBvZiBpdHMgY29udGV4dC5cbiAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyByZWY6IHRoaXMucmVmRWxlbWVudCwgc3R5bGU6IHsgZm9udFNpemU6IDAgfSB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlZiA9IGZ1bmN0aW9uIHJlZihub2RlKSB7XG4gICAgICAgIF90aGlzMy5yZWZFbGVtZW50KG5vZGUpO1xuICAgICAgICBpZiAoY2hpbGRyZW4ucmVmKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucmVmKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgeyByZWY6IHJlZiB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gV2F5cG9pbnQ7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBXYXlwb2ludDtcblxuXG5XYXlwb2ludC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQsXG4gIGRlYnVnOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIG9uRW50ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgb25MZWF2ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBvblBvc2l0aW9uQ2hhbmdlOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGZpcmVPblJhcGlkU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gIHNjcm9sbGFibGVBbmNlc3RvcjogX3JlYWN0LlByb3BUeXBlcy5hbnksXG4gIGhvcml6b250YWw6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvLyBgdG9wT2Zmc2V0YCBjYW4gZWl0aGVyIGJlIGEgbnVtYmVyLCBpbiB3aGljaCBjYXNlIGl0cyBhIGRpc3RhbmNlIGZyb20gdGhlXG4gIC8vIHRvcCBvZiB0aGUgY29udGFpbmVyIGluIHBpeGVscywgb3IgYSBzdHJpbmcgdmFsdWUuIFZhbGlkIHN0cmluZyB2YWx1ZXMgYXJlXG4gIC8vIG9mIHRoZSBmb3JtIFwiMjBweFwiLCB3aGljaCBpcyBwYXJzZWQgYXMgcGl4ZWxzLCBvciBcIjIwJVwiLCB3aGljaCBpcyBwYXJzZWRcbiAgLy8gYXMgYSBwZXJjZW50YWdlIG9mIHRoZSBoZWlnaHQgb2YgdGhlIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgLy8gRm9yIGluc3RhbmNlLCBpZiB5b3UgcGFzcyBcIi0yMCVcIiwgYW5kIHRoZSBjb250YWluaW5nIGVsZW1lbnQgaXMgMTAwcHggdGFsbCxcbiAgLy8gdGhlbiB0aGUgd2F5cG9pbnQgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBpdCBoYXMgYmVlbiBzY3JvbGxlZCAyMHB4IGJleW9uZFxuICAvLyB0aGUgdG9wIG9mIHRoZSBjb250YWluaW5nIGVsZW1lbnQuXG4gIHRvcE9mZnNldDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcl0pLFxuXG4gIC8vIGBib3R0b21PZmZzZXRgIGlzIGxpa2UgYHRvcE9mZnNldGAsIGJ1dCBmb3IgdGhlIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyLlxuICBib3R0b21PZmZzZXQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLnN0cmluZywgX3JlYWN0LlByb3BUeXBlcy5udW1iZXJdKVxufTtcblxuV2F5cG9pbnQuYWJvdmUgPSBQT1NJVElPTlMuYWJvdmU7XG5XYXlwb2ludC5iZWxvdyA9IFBPU0lUSU9OUy5iZWxvdztcbldheXBvaW50Lmluc2lkZSA9IFBPU0lUSU9OUy5pbnNpZGU7XG5XYXlwb2ludC5pbnZpc2libGUgPSBQT1NJVElPTlMuaW52aXNpYmxlO1xuV2F5cG9pbnQuZ2V0V2luZG93ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG59O1xuV2F5cG9pbnQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuV2F5cG9pbnQuZGlzcGxheU5hbWUgPSAnV2F5cG9pbnQnO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgc3RyaXBEaWFjcml0aWNzIGZyb20gJy4vdXRpbHMvc3RyaXBEaWFjcml0aWNzJztcbmltcG9ydCBtZW51UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyJztcbmltcG9ydCBXYXlwb2ludCBmcm9tICdyZWFjdC13YXlwb2ludCc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcblx0YXV0b2xvYWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYGxvYWRPcHRpb25zYCBwcm9wIG9uLW1vdW50OyBkZWZhdWx0cyB0byB0cnVlXG5cdGNhY2hlOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3QgdG8gdXNlIHRvIGNhY2hlIHJlc3VsdHM7IHNldCB0byBudWxsL2ZhbHNlIHRvIGRpc2FibGUgY2FjaGluZ1xuXHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgICAgICAgLy8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50OyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG5cdGlnbm9yZUFjY2VudHM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGlnbm9yZUNhc2U6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbICAvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdGxvYWRPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAgICAvLyBjYWxsYmFjayB0byBsb2FkIG9wdGlvbnMgYXN5bmNocm9ub3VzbHk7IChpbnB1dFZhbHVlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6ID9Qcm9taXNlXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgICAgICAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZSAoc2hhcmVkIHdpdGggU2VsZWN0KVxuXHRcdFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UmVhY3QuUHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG5vUmVzdWx0c1RleHQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAgICAvLyBmaWVsZCBub1Jlc3VsdHNUZXh0LCBkaXNwbGF5ZWQgd2hlbiBubyBvcHRpb25zIGNvbWUgYmFjayBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFJlYWN0LlByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRzZWFyY2hQcm9tcHRUZXh0OiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgLy8gbGFiZWwgdG8gcHJvbXB0IGZvciBzZWFyY2ggaW5wdXRcblx0XHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFJlYWN0LlByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRvbklucHV0Q2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb3B0aW9uYWwgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygd2hhdCBpcyBiZWluZyB0eXBlZFxuXHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxufTtcblxuY29uc3QgZGVmYXVsdENhY2hlID0ge307XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcblx0YXV0b2xvYWQ6IHRydWUsXG5cdGNhY2hlOiBkZWZhdWx0Q2FjaGUsXG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4sXG5cdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRvcHRpb25zOiBbXSxcblx0c2VhcmNoUHJvbXB0VGV4dDogJ1R5cGUgdG8gc2VhcmNoJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0c3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG5cdFx0dGhpcy5fY2FjaGUgPSBwcm9wcy5jYWNoZSA9PT0gZGVmYXVsdENhY2hlID8ge30gOiBwcm9wcy5jYWNoZTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0aXNMb2FkaW5nTmV4dDogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBwcm9wcy5vcHRpb25zLFxuXHRcdFx0dG90YWw6IDBcblx0XHR9O1xuXG5cdFx0dGhpcy5fb25JbnB1dENoYW5nZSA9IHRoaXMuX29uSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUxvYWROZXh0T3B0aW9ucyA9IHRoaXMuaGFuZGxlTG9hZE5leHRPcHRpb25zLmJpbmQodGhpcyk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0Y29uc3QgeyBhdXRvbG9hZCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChhdXRvbG9hZCkge1xuXHRcdFx0dGhpcy5sb2FkT3B0aW9ucygnJyk7XG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcblx0XHRjb25zdCBwcm9wZXJ0aWVzVG9TeW5jID0gWydvcHRpb25zJ107XG5cdFx0cHJvcGVydGllc1RvU3luYy5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5wcm9wc1twcm9wXSAhPT0gbmV4dFByb3BzW3Byb3BdKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFtwcm9wXTogbmV4dFByb3BzW3Byb3BdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJPcHRpb25zKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBvcHRpb25zOiBbXSwgdG90YWw6IDAgfSk7XG5cdH1cblxuXHRsb2FkT3B0aW9ucyAoaW5wdXRWYWx1ZSwgc2tpcCA9IDApIHtcblx0XHRjb25zdCB7IGxvYWRPcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IGNhY2hlID0gdGhpcy5fY2FjaGU7XG5cblx0XHRpZiAoXG5cdFx0XHQhc2tpcCAmJlxuXHRcdFx0Y2FjaGUgJiZcblx0XHRcdGNhY2hlLmhhc093blByb3BlcnR5KGlucHV0VmFsdWUpXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBkYXRhID0gY2FjaGVbaW5wdXRWYWx1ZV07XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRvcHRpb25zOiBkYXRhLm9wdGlvbnMsXG5cdFx0XHRcdHRvdGFsOiBkYXRhLnRvdGFsXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNhbGxiYWNrID0gKGVycm9yLCBkYXRhKSA9PiB7XG5cdFx0XHRpZiAoY2FsbGJhY2sgPT09IHRoaXMuX2NhbGxiYWNrKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IGRhdGEgJiYgZGF0YS5vcHRpb25zIHx8IFtdO1xuXG5cdFx0XHRcdGlmIChza2lwKSB7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IFsuLi50aGlzLnN0YXRlLm9wdGlvbnMsIC4uLm9wdGlvbnNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdG90YWwgPSBkYXRhICYmIGRhdGEudG90YWwgfHwgb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKGNhY2hlKSB7XG5cdFx0XHRcdFx0Ly8gY2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuXHRcdFx0XHRcdGNhY2hlW2lucHV0VmFsdWVdID0ge1xuXHRcdFx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0XHRcdHRvdGFsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRcdFx0aXNMb2FkaW5nTmV4dDogZmFsc2UsXG5cdFx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0XHR0b3RhbFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gSWdub3JlIGFsbCBidXQgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3Rcblx0XHR0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0Y29uc3QgcHJvbWlzZSA9IGxvYWRPcHRpb25zKGlucHV0VmFsdWUsIGNhbGxiYWNrLCBza2lwKTtcblx0XHRpZiAocHJvbWlzZSkge1xuXHRcdFx0cHJvbWlzZS50aGVuKFxuXHRcdFx0XHQoZGF0YSkgPT4gY2FsbGJhY2sobnVsbCwgZGF0YSksXG5cdFx0XHRcdChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdHRoaXMuX2NhbGxiYWNrICYmXG5cdFx0XHQhdGhpcy5zdGF0ZS5pc0xvYWRpbmdcblx0XHQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHQvLyBpc0xvYWRpbmc6IHRydWUsXG5cdFx0XHRcdGlzTG9hZGluZzogIXNraXAsXG5cdFx0XHRcdGlzTG9hZGluZ05leHQ6ICEhc2tpcCxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dFZhbHVlO1xuXHR9XG5cblx0X29uSW5wdXRDaGFuZ2UgKGlucHV0VmFsdWUpIHtcblx0XHRjb25zdCB7IGlnbm9yZUFjY2VudHMsIGlnbm9yZUNhc2UsIG9uSW5wdXRDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoaWdub3JlQWNjZW50cykge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAoaWdub3JlQ2FzZSkge1xuXHRcdFx0aW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0b25JbnB1dENoYW5nZShpbnB1dFZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5sb2FkT3B0aW9ucyhpbnB1dFZhbHVlKTtcblx0fVxuXG5cdGlucHV0VmFsdWUoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3Quc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bm9SZXN1bHRzVGV4dCgpIHtcblx0XHRjb25zdCB7IGxvYWRpbmdQbGFjZWhvbGRlciwgbm9SZXN1bHRzVGV4dCwgc2VhcmNoUHJvbXB0VGV4dCB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGlzTG9hZGluZyB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0VmFsdWUoKTtcblxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdHJldHVybiBsb2FkaW5nUGxhY2Vob2xkZXI7XG5cdFx0fVxuXHRcdGlmIChpbnB1dFZhbHVlICYmIG5vUmVzdWx0c1RleHQpIHtcblx0XHRcdHJldHVybiBub1Jlc3VsdHNUZXh0O1xuXHRcdH1cblx0XHRyZXR1cm4gc2VhcmNoUHJvbXB0VGV4dDtcblx0fVxuXG5cdGZvY3VzICgpIHtcblx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHR9XG5cblx0aGFuZGxlTG9hZE5leHRPcHRpb25zKCkge1xuXHRcdHRoaXMubG9hZE9wdGlvbnModGhpcy5pbnB1dFZhbHVlKCksIHRoaXMuc3RhdGUub3B0aW9ucy5sZW5ndGgpO1xuXHR9XG5cblx0cmVuZGVyICgpIHtcblx0XHRjb25zdCB7IGNoaWxkcmVuLCBsb2FkaW5nUGxhY2Vob2xkZXIsIHBsYWNlaG9sZGVyIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHsgaXNMb2FkaW5nLCBvcHRpb25zLCB0b3RhbCwgaXNMb2FkaW5nTmV4dCB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGNvbnN0IHByb3BzID0ge1xuXHRcdFx0bm9SZXN1bHRzVGV4dDogdGhpcy5ub1Jlc3VsdHNUZXh0KCksXG5cdFx0XHRwbGFjZWhvbGRlcjogaXNMb2FkaW5nID8gbG9hZGluZ1BsYWNlaG9sZGVyIDogcGxhY2Vob2xkZXIsXG5cdFx0XHRvcHRpb25zOiAoaXNMb2FkaW5nICYmIGxvYWRpbmdQbGFjZWhvbGRlcikgPyBbXSA6IG9wdGlvbnMsXG5cdFx0XHRyZWY6IChyZWYpID0+ICh0aGlzLnNlbGVjdCA9IHJlZiksXG5cdFx0XHRvbkNoYW5nZTogKG5ld1ZhbHVlcykgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiB0aGlzLnByb3BzLnZhbHVlICYmIChuZXdWYWx1ZXMubGVuZ3RoID4gdGhpcy5wcm9wcy52YWx1ZS5sZW5ndGgpKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGVhck9wdGlvbnMoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKG5ld1ZhbHVlcyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBjaGlsZHJlbih7XG5cdFx0XHQuLi50aGlzLnByb3BzLFxuXHRcdFx0Li4ucHJvcHMsXG5cdFx0XHRpc0xvYWRpbmcsXG5cdFx0XHRvbklucHV0Q2hhbmdlOiB0aGlzLl9vbklucHV0Q2hhbmdlLFxuXHRcdFx0bWVudVJlbmRlcmVyOiAocHJvcHMpID0+IDxkaXY+XG5cdFx0XHRcdHttZW51UmVuZGVyZXIocHJvcHMpfVxuXHRcdFx0XHR7b3B0aW9ucy5sZW5ndGggPCB0b3RhbCAmJiA8V2F5cG9pbnQgb25FbnRlcj17dGhpcy5oYW5kbGVMb2FkTmV4dE9wdGlvbnN9Lz59XG5cdFx0XHRcdHtpc0xvYWRpbmdOZXh0ICYmIDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmctbmV4dC1vcHRpb25zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmctem9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmdcIiAvPlxuXHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+fVxuXHRcdFx0PC9kaXY+XG5cdFx0fSk7XG5cdH1cbn1cblxuQXN5bmMucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuQXN5bmMuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4gKHByb3BzKSB7XG5cdHJldHVybiAoXG5cdFx0PFNlbGVjdCB7Li4ucHJvcHN9IC8+XG5cdCk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuXG5mdW5jdGlvbiByZWR1Y2Uob2JqLCBwcm9wcyA9IHt9KXtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgLnJlZHVjZSgocHJvcHMsIGtleSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHByb3BzW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gcHJvcHM7XG4gIH0sIHByb3BzKTtcbn1cblxuY29uc3QgQXN5bmNDcmVhdGFibGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQXN5bmNDcmVhdGFibGVTZWxlY3QnLFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxTZWxlY3QuQXN5bmMgey4uLnRoaXMucHJvcHN9PlxuXHRcdFx0XHR7KGFzeW5jUHJvcHMpID0+IChcblx0XHRcdFx0XHQ8U2VsZWN0LkNyZWF0YWJsZSB7Li4udGhpcy5wcm9wc30+XG5cdFx0XHRcdFx0XHR7KGNyZWF0YWJsZVByb3BzKSA9PiAoXG5cdFx0XHRcdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRcdFx0XHR7Li4ucmVkdWNlKGFzeW5jUHJvcHMsIHJlZHVjZShjcmVhdGFibGVQcm9wcywge30pKX1cblx0XHRcdFx0XHRcdFx0XHRvbklucHV0Q2hhbmdlPXsoaW5wdXQpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0YWJsZVByb3BzLm9uSW5wdXRDaGFuZ2UoaW5wdXQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGFzeW5jUHJvcHMub25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRyZWY9eyhyZWYpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0YWJsZVByb3BzLnJlZihyZWYpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YXN5bmNQcm9wcy5yZWYocmVmKTtcblx0XHRcdFx0XHRcdFx0XHR9fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0KX1cblx0XHRcdFx0XHQ8L1NlbGVjdC5DcmVhdGFibGU+XG5cdFx0XHRcdCl9XG5cdFx0XHQ8L1NlbGVjdC5Bc3luYz5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3luY0NyZWF0YWJsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vU2VsZWN0JztcbmltcG9ydCBkZWZhdWx0RmlsdGVyT3B0aW9ucyBmcm9tICcuL3V0aWxzL2RlZmF1bHRGaWx0ZXJPcHRpb25zJztcbmltcG9ydCBkZWZhdWx0TWVudVJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdE1lbnVSZW5kZXJlcic7XG5cbmNvbnN0IENyZWF0YWJsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDcmVhdGFibGVTZWxlY3QnLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdC8vIENoaWxkIGZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgaW5uZXIgU2VsZWN0IGNvbXBvbmVudFxuXHRcdC8vIFRoaXMgY29tcG9uZW50IGNhbiBiZSB1c2VkIHRvIGNvbXBvc2UgSE9DcyAoZWcgQ3JlYXRhYmxlIGFuZCBBc3luYylcblx0XHQvLyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMuZmlsdGVyT3B0aW9uc1xuXHRcdGZpbHRlck9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hbnksXG5cblx0XHQvLyBTZWFyY2hlcyBmb3IgYW55IG1hdGNoaW5nIG9wdGlvbiB3aXRoaW4gdGhlIHNldCBvZiBvcHRpb25zLlxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gcHJldmVudHMgZHVwbGljYXRlIG9wdGlvbnMgZnJvbSBiZWluZyBjcmVhdGVkLlxuXHRcdC8vICh7IG9wdGlvbjogT2JqZWN0LCBvcHRpb25zOiBBcnJheSwgbGFiZWxLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZyB9KTogYm9vbGVhblxuXHRcdGlzT3B0aW9uVW5pcXVlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuXHQgICAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgY3VycmVudCBpbnB1dCB0ZXh0IHJlcHJlc2VudHMgYSB2YWxpZCBvcHRpb24uXG5cdCAgICAvLyAoeyBsYWJlbDogc3RyaW5nIH0pOiBib29sZWFuXG5cdCAgICBpc1ZhbGlkTmV3T3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm1lbnVSZW5kZXJlclxuXHRcdG1lbnVSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmFueSxcblxuXHQgICAgLy8gRmFjdG9yeSB0byBjcmVhdGUgbmV3IG9wdGlvbi5cblx0ICAgIC8vICh7IGxhYmVsOiBzdHJpbmcsIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IE9iamVjdFxuXHRcdG5ld09wdGlvbkNyZWF0b3I6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gaW5wdXQgY2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7fVxuXHRcdG9uSW5wdXRDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25JbnB1dEtleURvd246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gbmV3IG9wdGlvbiBjbGljayBoYW5kbGVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRcdG9uTmV3T3B0aW9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMub3B0aW9uc1xuXHRcdG9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcblxuXHQgICAgLy8gQ3JlYXRlcyBwcm9tcHQvcGxhY2Vob2xkZXIgb3B0aW9uIHRleHQuXG5cdCAgICAvLyAoZmlsdGVyVGV4dDogc3RyaW5nKTogc3RyaW5nXG5cdFx0cHJvbXB0VGV4dENyZWF0b3I6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0Ly8gRGVjaWRlcyBpZiBhIGtleURvd24gZXZlbnQgKGVnIGl0cyBga2V5Q29kZWApIHNob3VsZCByZXN1bHQgaW4gdGhlIGNyZWF0aW9uIG9mIGEgbmV3IG9wdGlvbi5cblx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHR9LFxuXG5cdC8vIERlZmF1bHQgcHJvcCBtZXRob2RzXG5cdHN0YXRpY3M6IHtcblx0XHRpc09wdGlvblVuaXF1ZSxcblx0XHRpc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0cHJvbXB0VGV4dENyZWF0b3IsXG5cdFx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uXG5cdH0sXG5cblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZmlsdGVyT3B0aW9uczogZGVmYXVsdEZpbHRlck9wdGlvbnMsXG5cdFx0XHRpc09wdGlvblVuaXF1ZSxcblx0XHRcdGlzVmFsaWROZXdPcHRpb24sXG5cdFx0XHRtZW51UmVuZGVyZXI6IGRlZmF1bHRNZW51UmVuZGVyZXIsXG5cdFx0XHRuZXdPcHRpb25DcmVhdG9yLFxuXHRcdFx0cHJvbXB0VGV4dENyZWF0b3IsXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sXG5cdFx0fTtcblx0fSxcblxuXHRjcmVhdGVOZXdPcHRpb24gKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdGlzVmFsaWROZXdPcHRpb24sXG5cdFx0XHRuZXdPcHRpb25DcmVhdG9yLFxuXHRcdFx0b25OZXdPcHRpb25DbGljayxcblx0XHRcdG9wdGlvbnMgPSBbXSxcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvblxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRjb25zdCBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSwgbGFiZWxLZXk6IHRoaXMubGFiZWxLZXksIHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5IH0pO1xuXHRcdFx0Y29uc3QgaXNPcHRpb25VbmlxdWUgPSB0aGlzLmlzT3B0aW9uVW5pcXVlKHsgb3B0aW9uIH0pO1xuXG5cdFx0XHQvLyBEb24ndCBhZGQgdGhlIHNhbWUgb3B0aW9uIHR3aWNlLlxuXHRcdFx0aWYgKGlzT3B0aW9uVW5pcXVlKSB7XG5cdFx0XHRcdGlmIChvbk5ld09wdGlvbkNsaWNrKSB7XG5cdFx0XHRcdFx0b25OZXdPcHRpb25DbGljayhvcHRpb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9wdGlvbnMudW5zaGlmdChvcHRpb24pO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXJPcHRpb25zICguLi5wYXJhbXMpIHtcblx0XHRjb25zdCB7IGZpbHRlck9wdGlvbnMsIGlzVmFsaWROZXdPcHRpb24sIG9wdGlvbnMsIHByb21wdFRleHRDcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Ly8gVFJJQ0tZIENoZWNrIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25zIGFzIHdlbGwuXG5cdFx0Ly8gRG9uJ3QgZGlzcGxheSBhIGNyZWF0ZS1wcm9tcHQgZm9yIGEgdmFsdWUgdGhhdCdzIHNlbGVjdGVkLlxuXHRcdC8vIFRoaXMgY292ZXJzIGFzeW5jIGVkZ2UtY2FzZXMgd2hlcmUgYSBuZXdseS1jcmVhdGVkIE9wdGlvbiBpc24ndCB5ZXQgaW4gdGhlIGFzeW5jLWxvYWRlZCBhcnJheS5cblx0XHRjb25zdCBleGNsdWRlT3B0aW9ucyA9IHBhcmFtc1syXSB8fCBbXTtcblxuXHRcdGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IGZpbHRlck9wdGlvbnMoLi4ucGFyYW1zKSB8fCBbXTtcblxuXHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xuXHRcdFx0Y29uc3QgeyBuZXdPcHRpb25DcmVhdG9yIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0XHRjb25zdCBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0bGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSxcblx0XHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gVFJJQ0tZIENvbXBhcmUgdG8gYWxsIG9wdGlvbnMgKG5vdCBqdXN0IGZpbHRlcmVkIG9wdGlvbnMpIGluIGNhc2Ugb3B0aW9uIGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWQpLlxuXHRcdFx0Ly8gRm9yIG11bHRpLXNlbGVjdHMsIHRoaXMgd291bGQgcmVtb3ZlIGl0IGZyb20gdGhlIGZpbHRlcmVkIGxpc3QuXG5cdFx0XHRjb25zdCBpc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0XHRvcHRpb24sXG5cdFx0XHRcdG9wdGlvbnM6IGV4Y2x1ZGVPcHRpb25zLmNvbmNhdChmaWx0ZXJlZE9wdGlvbnMpXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGlzT3B0aW9uVW5pcXVlKSB7XG5cdFx0XHRcdGNvbnN0IHByb21wdCA9IHByb21wdFRleHRDcmVhdG9yKHRoaXMuaW5wdXRWYWx1ZSk7XG5cblx0XHRcdFx0dGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0XHRsYWJlbDogcHJvbXB0LFxuXHRcdFx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZpbHRlcmVkT3B0aW9ucy51bnNoaWZ0KHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xuXHR9LFxuXG5cdGlzT3B0aW9uVW5pcXVlICh7XG5cdFx0b3B0aW9uLFxuXHRcdG9wdGlvbnNcblx0fSkge1xuXHRcdGNvbnN0IHsgaXNPcHRpb25VbmlxdWUgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLnNlbGVjdC5maWx0ZXJPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRvcHRpb24sXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHR9KTtcblx0fSxcblxuXHRtZW51UmVuZGVyZXIgKHBhcmFtcykge1xuXHRcdGNvbnN0IHsgbWVudVJlbmRlcmVyIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0cmV0dXJuIG1lbnVSZW5kZXJlcih7XG5cdFx0XHQuLi5wYXJhbXMsXG5cdFx0XHRvblNlbGVjdDogdGhpcy5vbk9wdGlvblNlbGVjdCxcblx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLm9uT3B0aW9uU2VsZWN0XG5cdFx0fSk7XG5cdH0sXG5cblx0b25JbnB1dENoYW5nZSAoaW5wdXQpIHtcblx0XHRjb25zdCB7IG9uSW5wdXRDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0b25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyB2YWx1ZSBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXHRcdHRoaXMuaW5wdXRWYWx1ZSA9IGlucHV0O1xuXHR9LFxuXG5cdG9uSW5wdXRLZXlEb3duIChldmVudCkge1xuXHRcdGNvbnN0IHsgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLCBvbklucHV0S2V5RG93biB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBmb2N1c2VkT3B0aW9uID0gdGhpcy5zZWxlY3QuZ2V0Rm9jdXNlZE9wdGlvbigpO1xuXG5cdFx0aWYgKFxuXHRcdFx0Zm9jdXNlZE9wdGlvbiAmJlxuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gJiZcblx0XHRcdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbih7IGtleUNvZGU6IGV2ZW50LmtleUNvZGUgfSlcblx0XHQpIHtcblx0XHRcdHRoaXMuY3JlYXRlTmV3T3B0aW9uKCk7XG5cblx0XHRcdC8vIFByZXZlbnQgZGVjb3JhdGVkIFNlbGVjdCBmcm9tIGRvaW5nIGFueXRoaW5nIGFkZGl0aW9uYWwgd2l0aCB0aGlzIGtleURvd24gZXZlbnRcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSBlbHNlIGlmIChvbklucHV0S2V5RG93bikge1xuXHRcdFx0b25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdH1cblx0fSxcblxuXHRvbk9wdGlvblNlbGVjdCAob3B0aW9uLCBldmVudCkge1xuXHRcdGlmIChvcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5zZWxlY3RWYWx1ZShvcHRpb24pO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sXG5cdFx0XHQuLi5yZXN0UHJvcHNcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGxldCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0Ly8gV2UgY2FuJ3QgdXNlIGRlc3RydWN0dXJpbmcgZGVmYXVsdCB2YWx1ZXMgdG8gc2V0IHRoZSBjaGlsZHJlbixcblx0XHQvLyBiZWNhdXNlIGl0IHdvbid0IGFwcGx5IHdvcmsgaWYgYGNoaWxkcmVuYCBpcyBudWxsLiBBIGZhbHN5IGNoZWNrIGlzXG5cdFx0Ly8gbW9yZSByZWxpYWJsZSBpbiByZWFsIHdvcmxkIHVzZS1jYXNlcy5cblx0XHRpZiAoIWNoaWxkcmVuKSB7XG5cdFx0XHRjaGlsZHJlbiA9IGRlZmF1bHRDaGlsZHJlbjtcblx0XHR9XG5cblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdC4uLnJlc3RQcm9wcyxcblx0XHRcdGFsbG93Q3JlYXRlOiB0cnVlLFxuXHRcdFx0ZmlsdGVyT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zLFxuXHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcblx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcblx0XHRcdG9uSW5wdXRLZXlEb3duOiB0aGlzLm9uSW5wdXRLZXlEb3duLFxuXHRcdFx0cmVmOiAocmVmKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ID0gcmVmO1xuXG5cdFx0XHRcdC8vIFRoZXNlIHZhbHVlcyBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXHRcdFx0XHRpZiAocmVmKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbEtleSA9IHJlZi5wcm9wcy5sYWJlbEtleTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlS2V5ID0gcmVmLnByb3BzLnZhbHVlS2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBjaGlsZHJlbihwcm9wcyk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4gKHByb3BzKSB7XG5cdHJldHVybiAoXG5cdFx0PFNlbGVjdCB7Li4ucHJvcHN9IC8+XG5cdCk7XG59O1xuXG5mdW5jdGlvbiBpc09wdGlvblVuaXF1ZSAoeyBvcHRpb24sIG9wdGlvbnMsIGxhYmVsS2V5LCB2YWx1ZUtleSB9KSB7XG5cdHJldHVybiBvcHRpb25zXG5cdFx0LmZpbHRlcigoZXhpc3RpbmdPcHRpb24pID0+XG5cdFx0XHRleGlzdGluZ09wdGlvbltsYWJlbEtleV0gPT09IG9wdGlvbltsYWJlbEtleV0gfHxcblx0XHRcdGV4aXN0aW5nT3B0aW9uW3ZhbHVlS2V5XSA9PT0gb3B0aW9uW3ZhbHVlS2V5XVxuXHRcdClcblx0XHQubGVuZ3RoID09PSAwO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbiAoeyBsYWJlbCB9KSB7XG5cdHJldHVybiAhIWxhYmVsO1xufTtcblxuZnVuY3Rpb24gbmV3T3B0aW9uQ3JlYXRvciAoeyBsYWJlbCwgbGFiZWxLZXksIHZhbHVlS2V5IH0pIHtcblx0Y29uc3Qgb3B0aW9uID0ge307XG5cdG9wdGlvblt2YWx1ZUtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbltsYWJlbEtleV0gPSBsYWJlbDtcbiBcdG9wdGlvbi5jbGFzc05hbWUgPSAnU2VsZWN0LWNyZWF0ZS1vcHRpb24tcGxhY2Vob2xkZXInO1xuIFx0cmV0dXJuIG9wdGlvbjtcbn07XG5cbmZ1bmN0aW9uIHByb21wdFRleHRDcmVhdG9yIChsYWJlbCkge1xuXHRyZXR1cm4gYENyZWF0ZSBvcHRpb24gXCIke2xhYmVsfVwiYDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uICh7IGtleUNvZGUgfSkge1xuXHRzd2l0Y2ggKGtleUNvZGUpIHtcblx0XHRjYXNlIDk6ICAgLy8gVEFCXG5cdFx0Y2FzZSAxMzogIC8vIEVOVEVSXG5cdFx0Y2FzZSAxODg6IC8vIENPTU1BXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3JlYXRhYmxlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBPcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdFx0aW5zdGFuY2VQcmVmaXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgIC8vIHVuaXF1ZSBwcmVmaXggZm9yIHRoZSBpZHMgKHVzZWQgZm9yIGFyaWEpXG5cdFx0aXNEaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXG5cdFx0aXNGb2N1c2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGZvY3VzZWRcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWRcblx0XHRvbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VFbnRlciBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRcdG9uVW5mb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUxlYXZlIG9uIG9wdGlvbiBlbGVtZW50XG5cdFx0b3B0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsICAgICAvLyBvYmplY3QgdGhhdCBpcyBiYXNlIGZvciB0aGF0IG9wdGlvblxuXHRcdG9wdGlvbkluZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG5cdH0sXG5cdGJsb2NrRXZlbnQgKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRW50ZXIgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZChldmVudCl7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZih0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hNb3ZlIChldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH0sXG5cblx0b25Gb2N1cyAoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIHsgb3B0aW9uLCBpbnN0YW5jZVByZWZpeCwgb3B0aW9uSW5kZXggfSA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIG9wdGlvbi5jbGFzc05hbWUpO1xuXG5cdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmJsb2NrRXZlbnR9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuYmxvY2tFdmVudH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KSA6IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdHN0eWxlPXtvcHRpb24uc3R5bGV9XG5cdFx0XHRcdHJvbGU9XCJvcHRpb25cIlxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG5cdFx0XHRcdG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVNb3VzZUVudGVyfVxuXHRcdFx0XHRvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZU1vdmV9XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdGlkPXtpbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBvcHRpb25JbmRleH1cblx0XHRcdFx0dGl0bGU9e29wdGlvbi50aXRsZX0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBWYWx1ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlJyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG5cdFx0ZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgIC8vIGRpc2FibGVkIHByb3AgcGFzc2VkIHRvIFJlYWN0U2VsZWN0XG5cdFx0aWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgICAgICAgIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIHZhbHVlIC0gdXNlZCBmb3IgYXJpYVxuXHRcdG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIHZhbHVlIGxhYmVsXG5cdFx0b25SZW1vdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgcmVtb3ZhbCBvZiB0aGUgdmFsdWVcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLCAgICAgLy8gdGhlIG9wdGlvbiBvYmplY3QgZm9yIHRoaXMgdmFsdWVcblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlLCBldmVudCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLmhyZWYpIHtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblxuXHRvblJlbW92ZSAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy52YWx1ZSk7XG5cdH0sXG5cblx0aGFuZGxlVG91Y2hFbmRSZW1vdmUgKGV2ZW50KXtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuXHRcdHRoaXMub25SZW1vdmUoZXZlbnQpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9LFxuXG5cdHJlbmRlclJlbW92ZUljb24gKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLm9uUmVtb3ZlKSByZXR1cm47XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZS1pY29uXCJcblx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMub25SZW1vdmV9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmV9XG5cdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRvblRvdWNoTW92ZT17dGhpcy5oYW5kbGVUb3VjaE1vdmV9PlxuXHRcdFx0XHQmdGltZXM7XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJMYWJlbCAoKSB7XG5cdFx0bGV0IGNsYXNzTmFtZSA9ICdTZWxlY3QtdmFsdWUtbGFiZWwnO1xuXHRcdHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2sgfHwgdGhpcy5wcm9wcy52YWx1ZS5ocmVmID8gKFxuXHRcdFx0PGEgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGhyZWY9e3RoaXMucHJvcHMudmFsdWUuaHJlZn0gdGFyZ2V0PXt0aGlzLnByb3BzLnZhbHVlLnRhcmdldH0gb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufSBvblRvdWNoRW5kPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9hPlxuXHRcdCkgOiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gcm9sZT1cIm9wdGlvblwiIGFyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCIgaWQ9e3RoaXMucHJvcHMuaWR9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTZWxlY3QtdmFsdWUnLCB0aGlzLnByb3BzLnZhbHVlLmNsYXNzTmFtZSl9XG5cdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnZhbHVlLnN0eWxlfVxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy52YWx1ZS50aXRsZX1cblx0XHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJSZW1vdmVJY29uKCl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckxhYmVsKCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyb3dSZW5kZXJlciAoeyBvbk1vdXNlRG93biB9KSB7XG5cdHJldHVybiAoXG5cdFx0PHNwYW5cblx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvd1wiXG5cdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG5cdFx0Lz5cblx0KTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGVhclJlbmRlcmVyICgpIHtcblx0cmV0dXJuIChcblx0XHQ8c3BhblxuXHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWNsZWFyXCJcblx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogJyZ0aW1lczsnIH19XG5cdFx0Lz5cblx0KTtcbn07XG4iLCJpbXBvcnQgc3RyaXBEaWFjcml0aWNzIGZyb20gJy4vc3RyaXBEaWFjcml0aWNzJztcblxuZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyAob3B0aW9ucywgZmlsdGVyVmFsdWUsIGV4Y2x1ZGVPcHRpb25zLCBwcm9wcykge1xuXHRpZiAocHJvcHMuaWdub3JlQWNjZW50cykge1xuXHRcdGZpbHRlclZhbHVlID0gc3RyaXBEaWFjcml0aWNzKGZpbHRlclZhbHVlKTtcblx0fVxuXG5cdGlmIChwcm9wcy5pZ25vcmVDYXNlKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblx0aWYgKGV4Y2x1ZGVPcHRpb25zKSBleGNsdWRlT3B0aW9ucyA9IGV4Y2x1ZGVPcHRpb25zLm1hcChpID0+IGlbcHJvcHMudmFsdWVLZXldKTtcblxuXHRyZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcblx0XHRpZiAoZXhjbHVkZU9wdGlvbnMgJiYgZXhjbHVkZU9wdGlvbnMuaW5kZXhPZihvcHRpb25bcHJvcHMudmFsdWVLZXldKSA+IC0xKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYgKHByb3BzLmZpbHRlck9wdGlvbikgcmV0dXJuIHByb3BzLmZpbHRlck9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbiwgZmlsdGVyVmFsdWUpO1xuXHRcdGlmICghZmlsdGVyVmFsdWUpIHJldHVybiB0cnVlO1xuXHRcdHZhciB2YWx1ZVRlc3QgPSBTdHJpbmcob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSk7XG5cdFx0dmFyIGxhYmVsVGVzdCA9IFN0cmluZyhvcHRpb25bcHJvcHMubGFiZWxLZXldKTtcblx0XHRpZiAocHJvcHMuaWdub3JlQWNjZW50cykge1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gc3RyaXBEaWFjcml0aWNzKHZhbHVlVGVzdCk7XG5cdFx0XHRpZiAocHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnKSBsYWJlbFRlc3QgPSBzdHJpcERpYWNyaXRpY3MobGFiZWxUZXN0KTtcblx0XHR9XG5cdFx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHZhbHVlVGVzdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gbGFiZWxUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHJldHVybiBwcm9wcy5tYXRjaFBvcyA9PT0gJ3N0YXJ0JyA/IChcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSlcblx0XHQpIDogKFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMCkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApXG5cdFx0KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyT3B0aW9ucztcbiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gbWVudVJlbmRlcmVyICh7XG5cdGZvY3VzZWRPcHRpb24sXG5cdGluc3RhbmNlUHJlZml4LFxuXHRsYWJlbEtleSxcblx0b25Gb2N1cyxcblx0b25TZWxlY3QsXG5cdG9wdGlvbkNsYXNzTmFtZSxcblx0b3B0aW9uQ29tcG9uZW50LFxuXHRvcHRpb25SZW5kZXJlcixcblx0b3B0aW9ucyxcblx0dmFsdWVBcnJheSxcblx0dmFsdWVLZXksXG5cdG9uT3B0aW9uUmVmXG59KSB7XG5cdGxldCBPcHRpb24gPSBvcHRpb25Db21wb25lbnQ7XG5cblx0cmV0dXJuIG9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IHtcblx0XHRsZXQgaXNTZWxlY3RlZCA9IHZhbHVlQXJyYXkgJiYgdmFsdWVBcnJheS5pbmRleE9mKG9wdGlvbikgPiAtMTtcblx0XHRsZXQgaXNGb2N1c2VkID0gb3B0aW9uID09PSBmb2N1c2VkT3B0aW9uO1xuXHRcdGxldCBvcHRpb25DbGFzcyA9IGNsYXNzTmFtZXMob3B0aW9uQ2xhc3NOYW1lLCB7XG5cdFx0XHQnU2VsZWN0LW9wdGlvbic6IHRydWUsXG5cdFx0XHQnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLFxuXHRcdFx0J2lzLWZvY3VzZWQnOiBpc0ZvY3VzZWQsXG5cdFx0XHQnaXMtZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWQsXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PE9wdGlvblxuXHRcdFx0XHRjbGFzc05hbWU9e29wdGlvbkNsYXNzfVxuXHRcdFx0XHRpbnN0YW5jZVByZWZpeD17aW5zdGFuY2VQcmVmaXh9XG5cdFx0XHRcdGlzRGlzYWJsZWQ9e29wdGlvbi5kaXNhYmxlZH1cblx0XHRcdFx0aXNGb2N1c2VkPXtpc0ZvY3VzZWR9XG5cdFx0XHRcdGlzU2VsZWN0ZWQ9e2lzU2VsZWN0ZWR9XG5cdFx0XHRcdGtleT17YG9wdGlvbi0ke2l9LSR7b3B0aW9uW3ZhbHVlS2V5XX1gfVxuXHRcdFx0XHRvbkZvY3VzPXtvbkZvY3VzfVxuXHRcdFx0XHRvblNlbGVjdD17b25TZWxlY3R9XG5cdFx0XHRcdG9wdGlvbj17b3B0aW9ufVxuXHRcdFx0XHRvcHRpb25JbmRleD17aX1cblx0XHRcdFx0cmVmPXtyZWYgPT4geyBvbk9wdGlvblJlZihyZWYsIGlzRm9jdXNlZCk7IH19XG5cdFx0XHQ+XG5cdFx0XHRcdHtvcHRpb25SZW5kZXJlcihvcHRpb24sIGkpfVxuXHRcdFx0PC9PcHRpb24+XG5cdFx0KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVudVJlbmRlcmVyO1xuIiwidmFyIG1hcCA9IFtcblx0eyAnYmFzZSc6J0EnLCAnbGV0dGVycyc6L1tcXHUwMDQxXFx1MjRCNlxcdUZGMjFcXHUwMEMwXFx1MDBDMVxcdTAwQzJcXHUxRUE2XFx1MUVBNFxcdTFFQUFcXHUxRUE4XFx1MDBDM1xcdTAxMDBcXHUwMTAyXFx1MUVCMFxcdTFFQUVcXHUxRUI0XFx1MUVCMlxcdTAyMjZcXHUwMUUwXFx1MDBDNFxcdTAxREVcXHUxRUEyXFx1MDBDNVxcdTAxRkFcXHUwMUNEXFx1MDIwMFxcdTAyMDJcXHUxRUEwXFx1MUVBQ1xcdTFFQjZcXHUxRTAwXFx1MDEwNFxcdTAyM0FcXHUyQzZGXS9nIH0sXG5cdHsgJ2Jhc2UnOidBQScsJ2xldHRlcnMnOi9bXFx1QTczMl0vZyB9LFxuXHR7ICdiYXNlJzonQUUnLCdsZXR0ZXJzJzovW1xcdTAwQzZcXHUwMUZDXFx1MDFFMl0vZyB9LFxuXHR7ICdiYXNlJzonQU8nLCdsZXR0ZXJzJzovW1xcdUE3MzRdL2cgfSxcblx0eyAnYmFzZSc6J0FVJywnbGV0dGVycyc6L1tcXHVBNzM2XS9nIH0sXG5cdHsgJ2Jhc2UnOidBVicsJ2xldHRlcnMnOi9bXFx1QTczOFxcdUE3M0FdL2cgfSxcblx0eyAnYmFzZSc6J0FZJywnbGV0dGVycyc6L1tcXHVBNzNDXS9nIH0sXG5cdHsgJ2Jhc2UnOidCJywgJ2xldHRlcnMnOi9bXFx1MDA0MlxcdTI0QjdcXHVGRjIyXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MDI0M1xcdTAxODJcXHUwMTgxXS9nIH0sXG5cdHsgJ2Jhc2UnOidDJywgJ2xldHRlcnMnOi9bXFx1MDA0M1xcdTI0QjhcXHVGRjIzXFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAwQzdcXHUxRTA4XFx1MDE4N1xcdTAyM0JcXHVBNzNFXS9nIH0sXG5cdHsgJ2Jhc2UnOidEJywgJ2xldHRlcnMnOi9bXFx1MDA0NFxcdTI0QjlcXHVGRjI0XFx1MUUwQVxcdTAxMEVcXHUxRTBDXFx1MUUxMFxcdTFFMTJcXHUxRTBFXFx1MDExMFxcdTAxOEJcXHUwMThBXFx1MDE4OVxcdUE3NzldL2cgfSxcblx0eyAnYmFzZSc6J0RaJywnbGV0dGVycyc6L1tcXHUwMUYxXFx1MDFDNF0vZyB9LFxuXHR7ICdiYXNlJzonRHonLCdsZXR0ZXJzJzovW1xcdTAxRjJcXHUwMUM1XS9nIH0sXG5cdHsgJ2Jhc2UnOidFJywgJ2xldHRlcnMnOi9bXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFXS9nIH0sXG5cdHsgJ2Jhc2UnOidGJywgJ2xldHRlcnMnOi9bXFx1MDA0NlxcdTI0QkJcXHVGRjI2XFx1MUUxRVxcdTAxOTFcXHVBNzdCXS9nIH0sXG5cdHsgJ2Jhc2UnOidHJywgJ2xldHRlcnMnOi9bXFx1MDA0N1xcdTI0QkNcXHVGRjI3XFx1MDFGNFxcdTAxMUNcXHUxRTIwXFx1MDExRVxcdTAxMjBcXHUwMUU2XFx1MDEyMlxcdTAxRTRcXHUwMTkzXFx1QTdBMFxcdUE3N0RcXHVBNzdFXS9nIH0sXG5cdHsgJ2Jhc2UnOidIJywgJ2xldHRlcnMnOi9bXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OERdL2cgfSxcblx0eyAnYmFzZSc6J0knLCAnbGV0dGVycyc6L1tcXHUwMDQ5XFx1MjRCRVxcdUZGMjlcXHUwMENDXFx1MDBDRFxcdTAwQ0VcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTMwXFx1MDBDRlxcdTFFMkVcXHUxRUM4XFx1MDFDRlxcdTAyMDhcXHUwMjBBXFx1MUVDQVxcdTAxMkVcXHUxRTJDXFx1MDE5N10vZyB9LFxuXHR7ICdiYXNlJzonSicsICdsZXR0ZXJzJzovW1xcdTAwNEFcXHUyNEJGXFx1RkYyQVxcdTAxMzRcXHUwMjQ4XS9nIH0sXG5cdHsgJ2Jhc2UnOidLJywgJ2xldHRlcnMnOi9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2cgfSxcblx0eyAnYmFzZSc6J0wnLCAnbGV0dGVycyc6L1tcXHUwMDRDXFx1MjRDMVxcdUZGMkNcXHUwMTNGXFx1MDEzOVxcdTAxM0RcXHUxRTM2XFx1MUUzOFxcdTAxM0JcXHUxRTNDXFx1MUUzQVxcdTAxNDFcXHUwMjNEXFx1MkM2MlxcdTJDNjBcXHVBNzQ4XFx1QTc0NlxcdUE3ODBdL2cgfSxcblx0eyAnYmFzZSc6J0xKJywnbGV0dGVycyc6L1tcXHUwMUM3XS9nIH0sXG5cdHsgJ2Jhc2UnOidMaicsJ2xldHRlcnMnOi9bXFx1MDFDOF0vZyB9LFxuXHR7ICdiYXNlJzonTScsICdsZXR0ZXJzJzovW1xcdTAwNERcXHUyNEMyXFx1RkYyRFxcdTFFM0VcXHUxRTQwXFx1MUU0MlxcdTJDNkVcXHUwMTlDXS9nIH0sXG5cdHsgJ2Jhc2UnOidOJywgJ2xldHRlcnMnOi9bXFx1MDA0RVxcdTI0QzNcXHVGRjJFXFx1MDFGOFxcdTAxNDNcXHUwMEQxXFx1MUU0NFxcdTAxNDdcXHUxRTQ2XFx1MDE0NVxcdTFFNEFcXHUxRTQ4XFx1MDIyMFxcdTAxOURcXHVBNzkwXFx1QTdBNF0vZyB9LFxuXHR7ICdiYXNlJzonTkonLCdsZXR0ZXJzJzovW1xcdTAxQ0FdL2cgfSxcblx0eyAnYmFzZSc6J05qJywnbGV0dGVycyc6L1tcXHUwMUNCXS9nIH0sXG5cdHsgJ2Jhc2UnOidPJywgJ2xldHRlcnMnOi9bXFx1MDA0RlxcdTI0QzRcXHVGRjJGXFx1MDBEMlxcdTAwRDNcXHUwMEQ0XFx1MUVEMlxcdTFFRDBcXHUxRUQ2XFx1MUVENFxcdTAwRDVcXHUxRTRDXFx1MDIyQ1xcdTFFNEVcXHUwMTRDXFx1MUU1MFxcdTFFNTJcXHUwMTRFXFx1MDIyRVxcdTAyMzBcXHUwMEQ2XFx1MDIyQVxcdTFFQ0VcXHUwMTUwXFx1MDFEMVxcdTAyMENcXHUwMjBFXFx1MDFBMFxcdTFFRENcXHUxRURBXFx1MUVFMFxcdTFFREVcXHUxRUUyXFx1MUVDQ1xcdTFFRDhcXHUwMUVBXFx1MDFFQ1xcdTAwRDhcXHUwMUZFXFx1MDE4NlxcdTAxOUZcXHVBNzRBXFx1QTc0Q10vZyB9LFxuXHR7ICdiYXNlJzonT0knLCdsZXR0ZXJzJzovW1xcdTAxQTJdL2cgfSxcblx0eyAnYmFzZSc6J09PJywnbGV0dGVycyc6L1tcXHVBNzRFXS9nIH0sXG5cdHsgJ2Jhc2UnOidPVScsJ2xldHRlcnMnOi9bXFx1MDIyMl0vZyB9LFxuXHR7ICdiYXNlJzonUCcsICdsZXR0ZXJzJzovW1xcdTAwNTBcXHUyNEM1XFx1RkYzMFxcdTFFNTRcXHUxRTU2XFx1MDFBNFxcdTJDNjNcXHVBNzUwXFx1QTc1MlxcdUE3NTRdL2cgfSxcblx0eyAnYmFzZSc6J1EnLCAnbGV0dGVycyc6L1tcXHUwMDUxXFx1MjRDNlxcdUZGMzFcXHVBNzU2XFx1QTc1OFxcdTAyNEFdL2cgfSxcblx0eyAnYmFzZSc6J1InLCAnbGV0dGVycyc6L1tcXHUwMDUyXFx1MjRDN1xcdUZGMzJcXHUwMTU0XFx1MUU1OFxcdTAxNThcXHUwMjEwXFx1MDIxMlxcdTFFNUFcXHUxRTVDXFx1MDE1NlxcdTFFNUVcXHUwMjRDXFx1MkM2NFxcdUE3NUFcXHVBN0E2XFx1QTc4Ml0vZyB9LFxuXHR7ICdiYXNlJzonUycsICdsZXR0ZXJzJzovW1xcdTAwNTNcXHUyNEM4XFx1RkYzM1xcdTFFOUVcXHUwMTVBXFx1MUU2NFxcdTAxNUNcXHUxRTYwXFx1MDE2MFxcdTFFNjZcXHUxRTYyXFx1MUU2OFxcdTAyMThcXHUwMTVFXFx1MkM3RVxcdUE3QThcXHVBNzg0XS9nIH0sXG5cdHsgJ2Jhc2UnOidUJywgJ2xldHRlcnMnOi9bXFx1MDA1NFxcdTI0QzlcXHVGRjM0XFx1MUU2QVxcdTAxNjRcXHUxRTZDXFx1MDIxQVxcdTAxNjJcXHUxRTcwXFx1MUU2RVxcdTAxNjZcXHUwMUFDXFx1MDFBRVxcdTAyM0VcXHVBNzg2XS9nIH0sXG5cdHsgJ2Jhc2UnOidUWicsJ2xldHRlcnMnOi9bXFx1QTcyOF0vZyB9LFxuXHR7ICdiYXNlJzonVScsICdsZXR0ZXJzJzovW1xcdTAwNTVcXHUyNENBXFx1RkYzNVxcdTAwRDlcXHUwMERBXFx1MDBEQlxcdTAxNjhcXHUxRTc4XFx1MDE2QVxcdTFFN0FcXHUwMTZDXFx1MDBEQ1xcdTAxREJcXHUwMUQ3XFx1MDFENVxcdTAxRDlcXHUxRUU2XFx1MDE2RVxcdTAxNzBcXHUwMUQzXFx1MDIxNFxcdTAyMTZcXHUwMUFGXFx1MUVFQVxcdTFFRThcXHUxRUVFXFx1MUVFQ1xcdTFFRjBcXHUxRUU0XFx1MUU3MlxcdTAxNzJcXHUxRTc2XFx1MUU3NFxcdTAyNDRdL2cgfSxcblx0eyAnYmFzZSc6J1YnLCAnbGV0dGVycyc6L1tcXHUwMDU2XFx1MjRDQlxcdUZGMzZcXHUxRTdDXFx1MUU3RVxcdTAxQjJcXHVBNzVFXFx1MDI0NV0vZyB9LFxuXHR7ICdiYXNlJzonVlknLCdsZXR0ZXJzJzovW1xcdUE3NjBdL2cgfSxcblx0eyAnYmFzZSc6J1cnLCAnbGV0dGVycyc6L1tcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyXS9nIH0sXG5cdHsgJ2Jhc2UnOidYJywgJ2xldHRlcnMnOi9bXFx1MDA1OFxcdTI0Q0RcXHVGRjM4XFx1MUU4QVxcdTFFOENdL2cgfSxcblx0eyAnYmFzZSc6J1knLCAnbGV0dGVycyc6L1tcXHUwMDU5XFx1MjRDRVxcdUZGMzlcXHUxRUYyXFx1MDBERFxcdTAxNzZcXHUxRUY4XFx1MDIzMlxcdTFFOEVcXHUwMTc4XFx1MUVGNlxcdTFFRjRcXHUwMUIzXFx1MDI0RVxcdTFFRkVdL2cgfSxcblx0eyAnYmFzZSc6J1onLCAnbGV0dGVycyc6L1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZyB9LFxuXHR7ICdiYXNlJzonYScsICdsZXR0ZXJzJzovW1xcdTAwNjFcXHUyNEQwXFx1RkY0MVxcdTFFOUFcXHUwMEUwXFx1MDBFMVxcdTAwRTJcXHUxRUE3XFx1MUVBNVxcdTFFQUJcXHUxRUE5XFx1MDBFM1xcdTAxMDFcXHUwMTAzXFx1MUVCMVxcdTFFQUZcXHUxRUI1XFx1MUVCM1xcdTAyMjdcXHUwMUUxXFx1MDBFNFxcdTAxREZcXHUxRUEzXFx1MDBFNVxcdTAxRkJcXHUwMUNFXFx1MDIwMVxcdTAyMDNcXHUxRUExXFx1MUVBRFxcdTFFQjdcXHUxRTAxXFx1MDEwNVxcdTJDNjVcXHUwMjUwXS9nIH0sXG5cdHsgJ2Jhc2UnOidhYScsJ2xldHRlcnMnOi9bXFx1QTczM10vZyB9LFxuXHR7ICdiYXNlJzonYWUnLCdsZXR0ZXJzJzovW1xcdTAwRTZcXHUwMUZEXFx1MDFFM10vZyB9LFxuXHR7ICdiYXNlJzonYW8nLCdsZXR0ZXJzJzovW1xcdUE3MzVdL2cgfSxcblx0eyAnYmFzZSc6J2F1JywnbGV0dGVycyc6L1tcXHVBNzM3XS9nIH0sXG5cdHsgJ2Jhc2UnOidhdicsJ2xldHRlcnMnOi9bXFx1QTczOVxcdUE3M0JdL2cgfSxcblx0eyAnYmFzZSc6J2F5JywnbGV0dGVycyc6L1tcXHVBNzNEXS9nIH0sXG5cdHsgJ2Jhc2UnOidiJywgJ2xldHRlcnMnOi9bXFx1MDA2MlxcdTI0RDFcXHVGRjQyXFx1MUUwM1xcdTFFMDVcXHUxRTA3XFx1MDE4MFxcdTAxODNcXHUwMjUzXS9nIH0sXG5cdHsgJ2Jhc2UnOidjJywgJ2xldHRlcnMnOi9bXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NF0vZyB9LFxuXHR7ICdiYXNlJzonZCcsICdsZXR0ZXJzJzovW1xcdTAwNjRcXHUyNEQzXFx1RkY0NFxcdTFFMEJcXHUwMTBGXFx1MUUwRFxcdTFFMTFcXHUxRTEzXFx1MUUwRlxcdTAxMTFcXHUwMThDXFx1MDI1NlxcdTAyNTdcXHVBNzdBXS9nIH0sXG5cdHsgJ2Jhc2UnOidkeicsJ2xldHRlcnMnOi9bXFx1MDFGM1xcdTAxQzZdL2cgfSxcblx0eyAnYmFzZSc6J2UnLCAnbGV0dGVycyc6L1tcXHUwMDY1XFx1MjRENFxcdUZGNDVcXHUwMEU4XFx1MDBFOVxcdTAwRUFcXHUxRUMxXFx1MUVCRlxcdTFFQzVcXHUxRUMzXFx1MUVCRFxcdTAxMTNcXHUxRTE1XFx1MUUxN1xcdTAxMTVcXHUwMTE3XFx1MDBFQlxcdTFFQkJcXHUwMTFCXFx1MDIwNVxcdTAyMDdcXHUxRUI5XFx1MUVDN1xcdTAyMjlcXHUxRTFEXFx1MDExOVxcdTFFMTlcXHUxRTFCXFx1MDI0N1xcdTAyNUJcXHUwMUREXS9nIH0sXG5cdHsgJ2Jhc2UnOidmJywgJ2xldHRlcnMnOi9bXFx1MDA2NlxcdTI0RDVcXHVGRjQ2XFx1MUUxRlxcdTAxOTJcXHVBNzdDXS9nIH0sXG5cdHsgJ2Jhc2UnOidnJywgJ2xldHRlcnMnOi9bXFx1MDA2N1xcdTI0RDZcXHVGRjQ3XFx1MDFGNVxcdTAxMURcXHUxRTIxXFx1MDExRlxcdTAxMjFcXHUwMUU3XFx1MDEyM1xcdTAxRTVcXHUwMjYwXFx1QTdBMVxcdTFENzlcXHVBNzdGXS9nIH0sXG5cdHsgJ2Jhc2UnOidoJywgJ2xldHRlcnMnOi9bXFx1MDA2OFxcdTI0RDdcXHVGRjQ4XFx1MDEyNVxcdTFFMjNcXHUxRTI3XFx1MDIxRlxcdTFFMjVcXHUxRTI5XFx1MUUyQlxcdTFFOTZcXHUwMTI3XFx1MkM2OFxcdTJDNzZcXHUwMjY1XS9nIH0sXG5cdHsgJ2Jhc2UnOidodicsJ2xldHRlcnMnOi9bXFx1MDE5NV0vZyB9LFxuXHR7ICdiYXNlJzonaScsICdsZXR0ZXJzJzovW1xcdTAwNjlcXHUyNEQ4XFx1RkY0OVxcdTAwRUNcXHUwMEVEXFx1MDBFRVxcdTAxMjlcXHUwMTJCXFx1MDEyRFxcdTAwRUZcXHUxRTJGXFx1MUVDOVxcdTAxRDBcXHUwMjA5XFx1MDIwQlxcdTFFQ0JcXHUwMTJGXFx1MUUyRFxcdTAyNjhcXHUwMTMxXS9nIH0sXG5cdHsgJ2Jhc2UnOidqJywgJ2xldHRlcnMnOi9bXFx1MDA2QVxcdTI0RDlcXHVGRjRBXFx1MDEzNVxcdTAxRjBcXHUwMjQ5XS9nIH0sXG5cdHsgJ2Jhc2UnOidrJywgJ2xldHRlcnMnOi9bXFx1MDA2QlxcdTI0REFcXHVGRjRCXFx1MUUzMVxcdTAxRTlcXHUxRTMzXFx1MDEzN1xcdTFFMzVcXHUwMTk5XFx1MkM2QVxcdUE3NDFcXHVBNzQzXFx1QTc0NVxcdUE3QTNdL2cgfSxcblx0eyAnYmFzZSc6J2wnLCAnbGV0dGVycyc6L1tcXHUwMDZDXFx1MjREQlxcdUZGNENcXHUwMTQwXFx1MDEzQVxcdTAxM0VcXHUxRTM3XFx1MUUzOVxcdTAxM0NcXHUxRTNEXFx1MUUzQlxcdTAxN0ZcXHUwMTQyXFx1MDE5QVxcdTAyNkJcXHUyQzYxXFx1QTc0OVxcdUE3ODFcXHVBNzQ3XS9nIH0sXG5cdHsgJ2Jhc2UnOidsaicsJ2xldHRlcnMnOi9bXFx1MDFDOV0vZyB9LFxuXHR7ICdiYXNlJzonbScsICdsZXR0ZXJzJzovW1xcdTAwNkRcXHUyNERDXFx1RkY0RFxcdTFFM0ZcXHUxRTQxXFx1MUU0M1xcdTAyNzFcXHUwMjZGXS9nIH0sXG5cdHsgJ2Jhc2UnOiduJywgJ2xldHRlcnMnOi9bXFx1MDA2RVxcdTI0RERcXHVGRjRFXFx1MDFGOVxcdTAxNDRcXHUwMEYxXFx1MUU0NVxcdTAxNDhcXHUxRTQ3XFx1MDE0NlxcdTFFNEJcXHUxRTQ5XFx1MDE5RVxcdTAyNzJcXHUwMTQ5XFx1QTc5MVxcdUE3QTVdL2cgfSxcblx0eyAnYmFzZSc6J25qJywnbGV0dGVycyc6L1tcXHUwMUNDXS9nIH0sXG5cdHsgJ2Jhc2UnOidvJywgJ2xldHRlcnMnOi9bXFx1MDA2RlxcdTI0REVcXHVGRjRGXFx1MDBGMlxcdTAwRjNcXHUwMEY0XFx1MUVEM1xcdTFFRDFcXHUxRUQ3XFx1MUVENVxcdTAwRjVcXHUxRTREXFx1MDIyRFxcdTFFNEZcXHUwMTREXFx1MUU1MVxcdTFFNTNcXHUwMTRGXFx1MDIyRlxcdTAyMzFcXHUwMEY2XFx1MDIyQlxcdTFFQ0ZcXHUwMTUxXFx1MDFEMlxcdTAyMERcXHUwMjBGXFx1MDFBMVxcdTFFRERcXHUxRURCXFx1MUVFMVxcdTFFREZcXHUxRUUzXFx1MUVDRFxcdTFFRDlcXHUwMUVCXFx1MDFFRFxcdTAwRjhcXHUwMUZGXFx1MDI1NFxcdUE3NEJcXHVBNzREXFx1MDI3NV0vZyB9LFxuXHR7ICdiYXNlJzonb2knLCdsZXR0ZXJzJzovW1xcdTAxQTNdL2cgfSxcblx0eyAnYmFzZSc6J291JywnbGV0dGVycyc6L1tcXHUwMjIzXS9nIH0sXG5cdHsgJ2Jhc2UnOidvbycsJ2xldHRlcnMnOi9bXFx1QTc0Rl0vZyB9LFxuXHR7ICdiYXNlJzoncCcsICdsZXR0ZXJzJzovW1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTVdL2cgfSxcblx0eyAnYmFzZSc6J3EnLCAnbGV0dGVycyc6L1tcXHUwMDcxXFx1MjRFMFxcdUZGNTFcXHUwMjRCXFx1QTc1N1xcdUE3NTldL2cgfSxcblx0eyAnYmFzZSc6J3InLCAnbGV0dGVycyc6L1tcXHUwMDcyXFx1MjRFMVxcdUZGNTJcXHUwMTU1XFx1MUU1OVxcdTAxNTlcXHUwMjExXFx1MDIxM1xcdTFFNUJcXHUxRTVEXFx1MDE1N1xcdTFFNUZcXHUwMjREXFx1MDI3RFxcdUE3NUJcXHVBN0E3XFx1QTc4M10vZyB9LFxuXHR7ICdiYXNlJzoncycsICdsZXR0ZXJzJzovW1xcdTAwNzNcXHUyNEUyXFx1RkY1M1xcdTAwREZcXHUwMTVCXFx1MUU2NVxcdTAxNURcXHUxRTYxXFx1MDE2MVxcdTFFNjdcXHUxRTYzXFx1MUU2OVxcdTAyMTlcXHUwMTVGXFx1MDIzRlxcdUE3QTlcXHVBNzg1XFx1MUU5Ql0vZyB9LFxuXHR7ICdiYXNlJzondCcsICdsZXR0ZXJzJzovW1xcdTAwNzRcXHUyNEUzXFx1RkY1NFxcdTFFNkJcXHUxRTk3XFx1MDE2NVxcdTFFNkRcXHUwMjFCXFx1MDE2M1xcdTFFNzFcXHUxRTZGXFx1MDE2N1xcdTAxQURcXHUwMjg4XFx1MkM2NlxcdUE3ODddL2cgfSxcblx0eyAnYmFzZSc6J3R6JywnbGV0dGVycyc6L1tcXHVBNzI5XS9nIH0sXG5cdHsgJ2Jhc2UnOid1JywgJ2xldHRlcnMnOi9bXFx1MDA3NVxcdTI0RTRcXHVGRjU1XFx1MDBGOVxcdTAwRkFcXHUwMEZCXFx1MDE2OVxcdTFFNzlcXHUwMTZCXFx1MUU3QlxcdTAxNkRcXHUwMEZDXFx1MDFEQ1xcdTAxRDhcXHUwMUQ2XFx1MDFEQVxcdTFFRTdcXHUwMTZGXFx1MDE3MVxcdTAxRDRcXHUwMjE1XFx1MDIxN1xcdTAxQjBcXHUxRUVCXFx1MUVFOVxcdTFFRUZcXHUxRUVEXFx1MUVGMVxcdTFFRTVcXHUxRTczXFx1MDE3M1xcdTFFNzdcXHUxRTc1XFx1MDI4OV0vZyB9LFxuXHR7ICdiYXNlJzondicsICdsZXR0ZXJzJzovW1xcdTAwNzZcXHUyNEU1XFx1RkY1NlxcdTFFN0RcXHUxRTdGXFx1MDI4QlxcdUE3NUZcXHUwMjhDXS9nIH0sXG5cdHsgJ2Jhc2UnOid2eScsJ2xldHRlcnMnOi9bXFx1QTc2MV0vZyB9LFxuXHR7ICdiYXNlJzondycsICdsZXR0ZXJzJzovW1xcdTAwNzdcXHUyNEU2XFx1RkY1N1xcdTFFODFcXHUxRTgzXFx1MDE3NVxcdTFFODdcXHUxRTg1XFx1MUU5OFxcdTFFODlcXHUyQzczXS9nIH0sXG5cdHsgJ2Jhc2UnOid4JywgJ2xldHRlcnMnOi9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2cgfSxcblx0eyAnYmFzZSc6J3knLCAnbGV0dGVycyc6L1tcXHUwMDc5XFx1MjRFOFxcdUZGNTlcXHUxRUYzXFx1MDBGRFxcdTAxNzdcXHUxRUY5XFx1MDIzM1xcdTFFOEZcXHUwMEZGXFx1MUVGN1xcdTFFOTlcXHUxRUY1XFx1MDFCNFxcdTAyNEZcXHUxRUZGXS9nIH0sXG5cdHsgJ2Jhc2UnOid6JywgJ2xldHRlcnMnOi9bXFx1MDA3QVxcdTI0RTlcXHVGRjVBXFx1MDE3QVxcdTFFOTFcXHUwMTdDXFx1MDE3RVxcdTFFOTNcXHUxRTk1XFx1MDFCNlxcdTAyMjVcXHUwMjQwXFx1MkM2Q1xcdUE3NjNdL2cgfSxcbl07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaXBEaWFjcml0aWNzIChzdHIpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKyspIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZShtYXBbaV0ubGV0dGVycywgbWFwW2ldLmJhc2UpO1xuXHR9XG5cdHJldHVybiBzdHI7XG59O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9yZWFjdC1zZWxlY3RcbiovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBdXRvc2l6ZUlucHV0IGZyb20gJ3JlYWN0LWlucHV0LWF1dG9zaXplJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgZGVmYXVsdEFycm93UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlcic7XG5pbXBvcnQgZGVmYXVsdEZpbHRlck9wdGlvbnMgZnJvbSAnLi91dGlscy9kZWZhdWx0RmlsdGVyT3B0aW9ucyc7XG5pbXBvcnQgZGVmYXVsdE1lbnVSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRNZW51UmVuZGVyZXInO1xuaW1wb3J0IGRlZmF1bHRDbGVhclJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdENsZWFyUmVuZGVyZXInO1xuXG5pbXBvcnQgQXN5bmMgZnJvbSAnLi9Bc3luYyc7XG5pbXBvcnQgQXN5bmNDcmVhdGFibGUgZnJvbSAnLi9Bc3luY0NyZWF0YWJsZSc7XG5pbXBvcnQgQ3JlYXRhYmxlIGZyb20gJy4vQ3JlYXRhYmxlJztcbmltcG9ydCBPcHRpb24gZnJvbSAnLi9PcHRpb24nO1xuaW1wb3J0IFZhbHVlIGZyb20gJy4vVmFsdWUnO1xuXG5mdW5jdGlvbiBzdHJpbmdpZnlWYWx1ZSAodmFsdWUpIHtcblx0Y29uc3QgdmFsdWVUeXBlID0gdHlwZW9mIHZhbHVlO1xuXHRpZiAodmFsdWVUeXBlID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0fSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdudW1iZXInIHx8IHZhbHVlVHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0cmV0dXJuIFN0cmluZyh2YWx1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG59XG5cbmNvbnN0IHN0cmluZ09yTm9kZSA9IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuXHRSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRSZWFjdC5Qcm9wVHlwZXMubm9kZVxuXSk7XG5cbmxldCBpbnN0YW5jZUlkID0gMTtcblxuY29uc3QgU2VsZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnU2VsZWN0JyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHRhZGRMYWJlbFRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHlvdSB3YW50IHRvIGFkZCBhIGxhYmVsIG9uIGEgbXVsdGktdmFsdWUgaW5wdXRcblx0XHQnYXJpYS1sYWJlbCc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgIC8vIEFyaWEgbGFiZWwgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHRcdGFycm93UmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFx0XHRcdFx0Ly8gQ3JlYXRlIGRyb3AtZG93biBjYXJldCBlbGVtZW50XG5cdFx0YXV0b0JsdXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGJsdXIgdGhlIGNvbXBvbmVudCB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRcdGF1dG9mb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcblx0XHRhdXRvc2l6ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gZW5hYmxlIGF1dG9zaXppbmcgb3Igbm90XG5cdFx0YmFja3NwYWNlUmVtb3ZlczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxuXHRcdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgIC8vIE1lc3NhZ2UgdG8gdXNlIGZvciBzY3JlZW5yZWFkZXJzIHRvIHByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSAtIHtsYWJlbH0gaXMgcmVwbGFjZWQgd2l0aCB0aGUgaXRlbSBsYWJlbFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gY2xhc3NOYW1lIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHRcdGNsZWFyQWxsVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbCB3aGVuIG11bHRpOiB0cnVlXG5cdFx0Y2xlYXJSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBjcmVhdGUgY2xlYXJhYmxlIHggZWxlbWVudFxuXHRcdGNsZWFyVmFsdWVUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbFxuXHRcdGNsZWFyYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG5cdFx0ZGVsZXRlUmVtb3ZlczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxuXHRcdGRlbGltaXRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gZGVsaW1pdGVyIHRvIHVzZSB0byBqb2luIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhlIGhpZGRlbiBmaWVsZCB2YWx1ZVxuXHRcdGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGRpc2FibGVkIG9yIG5vdFxuXHRcdGVzY2FwZUNsZWFyc1ZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgLy8gd2hldGhlciBlc2NhcGUgY2xlYXJzIHRoZSB2YWx1ZSB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxuXHRcdGZpbHRlck9wdGlvbjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb24gKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuXHRcdGZpbHRlck9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgLy8gYm9vbGVhbiB0byBlbmFibGUgZGVmYXVsdCBmaWx0ZXJpbmcgb3IgZnVuY3Rpb24gdG8gZmlsdGVyIHRoZSBvcHRpb25zIGFycmF5IChbb3B0aW9uc10sIGZpbHRlclN0cmluZywgW3ZhbHVlc10pXG5cdFx0aWdub3JlQWNjZW50czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmdcblx0XHRpZ25vcmVDYXNlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIHdoZXRoZXIgdG8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZ1xuXHRcdGlucHV0UHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgLy8gY3VzdG9tIGF0dHJpYnV0ZXMgZm9yIHRoZSBJbnB1dFxuXHRcdGlucHV0UmVuZGVyZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gcmV0dXJucyBhIGN1c3RvbSBpbnB1dCBjb21wb25lbnRcblx0XHRpbnN0YW5jZUlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgIC8vIHNldCB0aGUgY29tcG9uZW50cyBpbnN0YW5jZUlkXG5cdFx0aXNMb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgbG9hZGluZyBleHRlcm5hbGx5IG9yIG5vdCAoc3VjaCBhcyBvcHRpb25zIGJlaW5nIGxvYWRlZClcblx0XHRqb2luVmFsdWVzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcblx0XHRsYWJlbEtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdFx0bWF0Y2hQb3M6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyAoYW55fHN0YXJ0KSBtYXRjaCB0aGUgc3RhcnQgb3IgZW50aXJlIHN0cmluZyB3aGVuIGZpbHRlcmluZ1xuXHRcdG1hdGNoUHJvcDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gKGFueXxsYWJlbHx2YWx1ZSkgd2hpY2ggb3B0aW9uIHByb3BlcnR5IHRvIGZpbHRlciBvblxuXHRcdG1lbnVCdWZmZXI6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgLy8gb3B0aW9uYWwgYnVmZmVyIChpbiBweCkgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgbWVudVxuXHRcdG1lbnVDb250YWluZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnUgY29udGFpbmVyXG5cdFx0bWVudVJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG5cdFx0bWVudVN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAgICAgICAgICAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudVxuXHRcdG11bHRpOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAgLy8gbXVsdGktdmFsdWUgaW5wdXRcblx0XHRuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIGhpZGRlbiA8aW5wdXQgLz4gdGFnIHdpdGggdGhpcyBmaWVsZCBuYW1lIGZvciBodG1sIGZvcm1zXG5cdFx0bm9SZXN1bHRzVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hpbmcgc2VhcmNoIHJlc3VsdHNcblx0XHRvbkJsdXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG9uQmx1ciBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25CbHVyUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gYmx1clxuXHRcdG9uQ2hhbmdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRcdG9uQ2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0XHRvbkNsb3NlUmVzZXRzSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFx0XHQvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgd2hlbiBtZW51IGlzIGNsb3NlZCB0aHJvdWdoIHRoZSBhcnJvd1xuXHRcdG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgLy8gb25Gb2N1cyBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25JbnB1dENoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBvbklucHV0Q2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChpbnB1dFZhbHVlKSB7fVxuXHRcdG9uSW5wdXRLZXlEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdFx0b25NZW51U2Nyb2xsVG9Cb3R0b206IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b207IGNhbiBiZSB1c2VkIHRvIHBhZ2luYXRlIG9wdGlvbnNcblx0XHRvbk9wZW46IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgb3BlbmVkXG5cdFx0b25WYWx1ZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cblx0XHRvcGVuQWZ0ZXJGb2N1czogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIG9wZW5pbmcgZHJvcGRvd24gd2hlbiBmb2N1c2VkXG5cdFx0b3Blbk9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAvLyBhbHdheXMgb3BlbiBvcHRpb25zIG1lbnUgb24gZm9jdXNcblx0XHRvcHRpb25DbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgIC8vIGFkZGl0aW9uYWwgY2xhc3MoZXMpIHRvIGFwcGx5IHRvIHRoZSA8T3B0aW9uIC8+IGVsZW1lbnRzXG5cdFx0b3B0aW9uQ29tcG9uZW50OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAvLyBvcHRpb24gY29tcG9uZW50IHRvIHJlbmRlciBpbiBkcm9wZG93blxuXHRcdG9wdGlvblJlbmRlcmVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgLy8gb3B0aW9uUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdFx0b3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdFx0cGFnZVNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsICAgICAgICAgICAvLyBudW1iZXIgb2YgZW50cmllcyB0byBwYWdlIHdoZW4gdXNpbmcgcGFnZSB1cC9kb3duIGtleXNcblx0XHRwbGFjZWhvbGRlcjogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgICAgIC8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlXG5cdFx0cmVxdWlyZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxuXHRcdHJlc2V0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5hbnksICAgICAgICAgICAgLy8gdmFsdWUgdG8gdXNlIHdoZW4geW91IGNsZWFyIHRoZSBjb250cm9sXG5cdFx0c2Nyb2xsTWVudUludG9WaWV3OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgICAvLyBib29sZWFuIHRvIGVuYWJsZSB0aGUgdmlld3BvcnQgdG8gc2hpZnQgc28gdGhhdCB0aGUgZnVsbCBtZW51IGZ1bGx5IHZpc2libGUgd2hlbiBlbmdhZ2VkXG5cdFx0c2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3Rcblx0XHRzaW1wbGVWYWx1ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIHBhc3MgdGhlIHZhbHVlIHRvIG9uQ2hhbmdlIGFzIGEgc2ltcGxlIHZhbHVlIChsZWdhY3kgcHJlIDEuMCBtb2RlKSwgZGVmYXVsdHMgdG8gZmFsc2Vcblx0XHRzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBjb250cm9sXG5cdFx0dGFiSW5kZXg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcblx0XHR0YWJTZWxlY3RzVmFsdWU6IFJlYWN0LlByb3BUeXBlcy5ib29sLCAgICAgIC8vIHdoZXRoZXIgdG8gdHJlYXQgdGFiYmluZyBvdXQgd2hpbGUgZm9jdXNlZCB0byBiZSB2YWx1ZSBzZWxlY3Rpb25cblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgIC8vIGluaXRpYWwgZmllbGQgdmFsdWVcblx0XHR2YWx1ZUNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIHZhbHVlIGNvbXBvbmVudCB0byByZW5kZXJcblx0XHR2YWx1ZUtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdFx0dmFsdWVSZW5kZXJlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyB2YWx1ZVJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRcdHdyYXBwZXJTdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3cmFwcGVyXG5cdH0sXG5cblx0c3RhdGljczogeyBBc3luYywgQXN5bmNDcmVhdGFibGUsIENyZWF0YWJsZSB9LFxuXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFkZExhYmVsVGV4dDogJ0FkZCBcIntsYWJlbH1cIj8nLFxuXHRcdFx0YXJyb3dSZW5kZXJlcjogZGVmYXVsdEFycm93UmVuZGVyZXIsXG5cdFx0XHRhdXRvc2l6ZTogdHJ1ZSxcblx0XHRcdGJhY2tzcGFjZVJlbW92ZXM6IHRydWUsXG5cdFx0XHRiYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2U6ICdQcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHtsYWJlbH0nLFxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxuXHRcdFx0Y2xlYXJBbGxUZXh0OiAnQ2xlYXIgYWxsJyxcblx0XHRcdGNsZWFyUmVuZGVyZXI6IGRlZmF1bHRDbGVhclJlbmRlcmVyLFxuXHRcdFx0Y2xlYXJWYWx1ZVRleHQ6ICdDbGVhciB2YWx1ZScsXG5cdFx0XHRkZWxldGVSZW1vdmVzOiB0cnVlLFxuXHRcdFx0ZGVsaW1pdGVyOiAnLCcsXG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRlc2NhcGVDbGVhcnNWYWx1ZTogdHJ1ZSxcblx0XHRcdGZpbHRlck9wdGlvbnM6IGRlZmF1bHRGaWx0ZXJPcHRpb25zLFxuXHRcdFx0aWdub3JlQWNjZW50czogdHJ1ZSxcblx0XHRcdGlnbm9yZUNhc2U6IHRydWUsXG5cdFx0XHRpbnB1dFByb3BzOiB7fSxcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRqb2luVmFsdWVzOiBmYWxzZSxcblx0XHRcdGxhYmVsS2V5OiAnbGFiZWwnLFxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxuXHRcdFx0bWF0Y2hQcm9wOiAnYW55Jyxcblx0XHRcdG1lbnVCdWZmZXI6IDAsXG5cdFx0XHRtZW51UmVuZGVyZXI6IGRlZmF1bHRNZW51UmVuZGVyZXIsXG5cdFx0XHRtdWx0aTogZmFsc2UsXG5cdFx0XHRub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG5cdFx0XHRvbkJsdXJSZXNldHNJbnB1dDogdHJ1ZSxcblx0XHRcdG9uQ2xvc2VSZXNldHNJbnB1dDogdHJ1ZSxcblx0XHRcdG9wZW5BZnRlckZvY3VzOiBmYWxzZSxcblx0XHRcdG9wdGlvbkNvbXBvbmVudDogT3B0aW9uLFxuXHRcdFx0cGFnZVNpemU6IDUsXG5cdFx0XHRwbGFjZWhvbGRlcjogJ1NlbGVjdC4uLicsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2UsXG5cdFx0XHRzY3JvbGxNZW51SW50b1ZpZXc6IHRydWUsXG5cdFx0XHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRcdFx0c2ltcGxlVmFsdWU6IGZhbHNlLFxuXHRcdFx0dGFiU2VsZWN0c1ZhbHVlOiB0cnVlLFxuXHRcdFx0dmFsdWVDb21wb25lbnQ6IFZhbHVlLFxuXHRcdFx0dmFsdWVLZXk6ICd2YWx1ZScsXG5cdFx0fTtcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcblx0XHR9O1xuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAodGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCkgKyAnLSc7XG5cdFx0Y29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSksXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRjb25zdCB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KG5leHRQcm9wcy52YWx1ZSwgbmV4dFByb3BzKTtcblxuXHRcdGlmIChuZXh0UHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRyZXF1aXJlZDogdGhpcy5oYW5kbGVSZXF1aXJlZCh2YWx1ZUFycmF5WzBdLCBuZXh0UHJvcHMubXVsdGkpLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxVcGRhdGUgKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0aWYgKG5leHRTdGF0ZS5pc09wZW4gIT09IHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50KG5leHRTdGF0ZS5pc09wZW4pO1xuXHRcdFx0Y29uc3QgaGFuZGxlciA9IG5leHRTdGF0ZS5pc09wZW4gPyBuZXh0UHJvcHMub25PcGVuIDogbmV4dFByb3BzLm9uQ2xvc2U7XG5cdFx0XHRoYW5kbGVyICYmIGhhbmRsZXIoKTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuXHRcdC8vIGZvY3VzIHRvIHRoZSBzZWxlY3RlZCBvcHRpb25cblx0XHRpZiAodGhpcy5tZW51ICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uKSB7XG5cdFx0XHRsZXQgZm9jdXNlZE9wdGlvbk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmZvY3VzZWQpO1xuXHRcdFx0bGV0IG1lbnVOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5tZW51KTtcblx0XHRcdG1lbnVOb2RlLnNjcm9sbFRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcblx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IHRydWU7XG5cdFx0fSBlbHNlIGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSAmJiB0aGlzLmZvY3VzZWQgJiYgdGhpcy5tZW51KSB7XG5cdFx0XHR0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGZvY3VzZWRET00gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmZvY3VzZWQpO1xuXHRcdFx0dmFyIG1lbnVET00gPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xuXHRcdFx0dmFyIGZvY3VzZWRSZWN0ID0gZm9jdXNlZERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdHZhciBtZW51UmVjdCA9IG1lbnVET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAoZm9jdXNlZFJlY3QuYm90dG9tID4gbWVudVJlY3QuYm90dG9tIHx8IGZvY3VzZWRSZWN0LnRvcCA8IG1lbnVSZWN0LnRvcCkge1xuXHRcdFx0XHRtZW51RE9NLnNjcm9sbFRvcCA9IChmb2N1c2VkRE9NLm9mZnNldFRvcCArIGZvY3VzZWRET00uY2xpZW50SGVpZ2h0IC0gbWVudURPTS5vZmZzZXRIZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5zY3JvbGxNZW51SW50b1ZpZXcgJiYgdGhpcy5tZW51Q29udGFpbmVyKSB7XG5cdFx0XHR2YXIgbWVudUNvbnRhaW5lclJlY3QgPSB0aGlzLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0IDwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyKSB7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIgLSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocHJldlByb3BzLmRpc2FibGVkICE9PSB0aGlzLnByb3BzLmRpc2FibGVkKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgaXNGb2N1c2VkOiBmYWxzZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXHRcdGlmICghZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5kZXRhY2hFdmVudCkge1xuXHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHR9XG5cdH0sXG5cblx0dG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQgKGVuYWJsZWQpIHtcblx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0aWYgKCFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRcdGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhhbmRsZVRvdWNoT3V0c2lkZSAoZXZlbnQpIHtcblx0XHQvLyBoYW5kbGUgdG91Y2ggb3V0c2lkZSBvbiBpb3MgdG8gZGlzbWlzcyBtZW51XG5cdFx0aWYgKHRoaXMud3JhcHBlciAmJiAhdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0fVxuXHR9LFxuXG5cdGZvY3VzICgpIHtcblx0XHRpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcblx0XHR0aGlzLmlucHV0LmZvY3VzKCk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5vcGVuQWZ0ZXJGb2N1cykge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRibHVySW5wdXQgKCkge1xuXHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdHRoaXMuaW5wdXQuYmx1cigpO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9LFxuXG5cdGhhbmRsZVRvdWNoRW5kIChldmVudCkge1xuXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdC8vIEZpcmUgdGhlIG1vdXNlIGV2ZW50c1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUgKGV2ZW50KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gQ2xlYXIgdGhlIHZhbHVlXG5cdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIGZvciB0aGUgbm9uLXNlYXJjaGFibGUgc2VsZWN0LCB0b2dnbGUgdGhlIG1lbnVcblx0XHRpZiAoIXRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46ICF0aGlzLnN0YXRlLmlzT3Blbixcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnN0YXRlLmlzRm9jdXNlZCkge1xuXHRcdFx0Ly8gT24gaU9TLCB3ZSBjYW4gZ2V0IGludG8gYSBzdGF0ZSB3aGVyZSB3ZSB0aGluayB0aGUgaW5wdXQgaXMgZm9jdXNlZCBidXQgaXQgaXNuJ3QgcmVhbGx5LFxuXHRcdFx0Ly8gc2luY2UgaU9TIGlnbm9yZXMgcHJvZ3JhbW1hdGljIGNhbGxzIHRvIGlucHV0LmZvY3VzKCkgdGhhdCB3ZXJlbid0IHRyaWdnZXJlZCBieSBhIGNsaWNrIGV2ZW50LlxuXHRcdFx0Ly8gQ2FsbCBmb2N1cygpIGFnYWluIGhlcmUgdG8gYmUgc2FmZS5cblx0XHRcdHRoaXMuZm9jdXMoKTtcblxuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcblx0XHRcdGlmICh0eXBlb2YgaW5wdXQuZ2V0SW5wdXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ly8gR2V0IHRoZSBhY3R1YWwgRE9NIGlucHV0IGlmIHRoZSByZWYgaXMgYW4gPEF1dG9zaXplSW5wdXQgLz4gY29tcG9uZW50XG5cdFx0XHRcdGlucHV0ID0gaW5wdXQuZ2V0SW5wdXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2xlYXJzIHRoZSB2YWx1ZSBzbyB0aGF0IHRoZSBjdXJzb3Igd2lsbCBiZSBhdCB0aGUgZW5kIG9mIGlucHV0IHdoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXG5cdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0XHQvLyBpZiB0aGUgaW5wdXQgaXMgZm9jdXNlZCwgZW5zdXJlIHRoZSBtZW51IGlzIG9wZW5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gb3RoZXJ3aXNlLCBmb2N1cyB0aGUgaW5wdXQgYW5kIG9wZW4gdGhlIG1lbnVcblx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdGhpcy5wcm9wcy5vcGVuT25Gb2N1cztcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9XG5cdH0sXG5cblx0aGFuZGxlTW91c2VEb3duT25BcnJvdyAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXG5cdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIGNsb3NlIHRoZSBtZW51XG5cdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZURvd25Pbk1lbnUgKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG5cdFx0dGhpcy5mb2N1cygpO1xuXHR9LFxuXG5cdGNsb3NlTWVudSAoKSB7XG5cdFx0aWYodGhpcy5wcm9wcy5vbkNsb3NlUmVzZXRzSW5wdXQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJ1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0fSxcblxuXHRoYW5kbGVJbnB1dEZvY3VzIChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cdFx0dmFyIGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuIHx8IHRoaXMuX29wZW5BZnRlckZvY3VzIHx8IHRoaXMucHJvcHMub3Blbk9uRm9jdXM7XG5cdFx0aWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkZvY3VzKGV2ZW50KTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXG5cdFx0XHRpc09wZW46IGlzT3BlblxuXHRcdH0pO1xuXHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG5cdH0sXG5cblx0aGFuZGxlSW5wdXRCbHVyIChldmVudCkge1xuXHRcdC8vIFRoZSBjaGVjayBmb3IgbWVudS5jb250YWlucyhhY3RpdmVFbGVtZW50KSBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCBJRTExJ3Mgc2Nyb2xsYmFyIGZyb20gY2xvc2luZyB0aGUgbWVudSBpbiBjZXJ0YWluIGNvbnRleHRzLlxuXHRcdGlmICh0aGlzLm1lbnUgJiYgKHRoaXMubWVudSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCB0aGlzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG5cdFx0fVxuXHRcdHZhciBvbkJsdXJyZWRTdGF0ZSA9IHtcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XG5cdFx0XHRvbkJsdXJyZWRTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUob25CbHVycmVkU3RhdGUpO1xuXHR9LFxuXG5cdGhhbmRsZUlucHV0Q2hhbmdlIChldmVudCkge1xuXHRcdGxldCBuZXdJbnB1dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlICYmIHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xuXHRcdFx0bGV0IG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShuZXdJbnB1dFZhbHVlKTtcblx0XHRcdC8vIE5vdGU6ICE9IHVzZWQgZGVsaWJlcmF0ZWx5IGhlcmUgdG8gY2F0Y2ggdW5kZWZpbmVkIGFuZCBudWxsXG5cdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgdHlwZW9mIG5leHRTdGF0ZSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bmV3SW5wdXRWYWx1ZSA9ICcnICsgbmV4dFN0YXRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlucHV0VmFsdWU6IG5ld0lucHV0VmFsdWUsXG5cdFx0fSk7XG5cdH0sXG5cblx0aGFuZGxlS2V5RG93biAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duKGV2ZW50KTtcblx0XHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgODogLy8gYmFja3NwYWNlXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0XHRjYXNlIDk6IC8vIHRhYlxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIXRoaXMuc3RhdGUuaXNPcGVuIHx8ICF0aGlzLnByb3BzLnRhYlNlbGVjdHNWYWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdHJldHVybjtcblx0XHRcdGNhc2UgMTM6IC8vIGVudGVyXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHJldHVybjtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI3OiAvLyBlc2NhcGVcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmNsZWFyYWJsZSAmJiB0aGlzLnByb3BzLmVzY2FwZUNsZWFyc1ZhbHVlKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM4OiAvLyB1cFxuXHRcdFx0XHR0aGlzLmZvY3VzUHJldmlvdXNPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSA0MDogLy8gZG93blxuXHRcdFx0XHR0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDMzOiAvLyBwYWdlIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQYWdlVXBPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzNDogLy8gcGFnZSBkb3duXG5cdFx0XHRcdHRoaXMuZm9jdXNQYWdlRG93bk9wdGlvbigpO1xuXHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM1OiAvLyBlbmQga2V5XG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZvY3VzRW5kT3B0aW9uKCk7XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzY6IC8vIGhvbWUga2V5XG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZvY3VzU3RhcnRPcHRpb24oKTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSA0NjogLy8gYmFja3NwYWNlXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuZGVsZXRlUmVtb3Zlcykge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0XHRkZWZhdWx0OiByZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdH0sXG5cblx0aGFuZGxlVmFsdWVDbGljayAob3B0aW9uLCBldmVudCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2spIHJldHVybjtcblx0XHR0aGlzLnByb3BzLm9uVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KTtcblx0fSxcblxuXHRoYW5kbGVNZW51U2Nyb2xsIChldmVudCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSkgcmV0dXJuO1xuXHRcdGxldCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cdFx0aWYgKHRhcmdldC5zY3JvbGxIZWlnaHQgPiB0YXJnZXQub2Zmc2V0SGVpZ2h0ICYmICEodGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5vZmZzZXRIZWlnaHQgLSB0YXJnZXQuc2Nyb2xsVG9wKSkge1xuXHRcdFx0dGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSgpO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVSZXF1aXJlZCAodmFsdWUsIG11bHRpKSB7XG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIChtdWx0aSA/IHZhbHVlLmxlbmd0aCA9PT0gMCA6IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApO1xuXHR9LFxuXG5cdGdldE9wdGlvbkxhYmVsIChvcCkge1xuXHRcdHJldHVybiBvcFt0aGlzLnByb3BzLmxhYmVsS2V5XTtcblx0fSxcblxuXHQvKipcblx0ICogVHVybnMgYSB2YWx1ZSBpbnRvIGFuIGFycmF5IGZyb20gdGhlIGdpdmVuIG9wdGlvbnNcblx0ICogQHBhcmFtXHR7U3RyaW5nfE51bWJlcnxBcnJheX1cdHZhbHVlXHRcdC0gdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgaW5wdXRcblx0ICogQHBhcmFtXHR7T2JqZWN0fVx0XHRuZXh0UHJvcHNcdC0gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBuZXh0UHJvcHMgc28gdGhlIHJldHVybmVkIGFycmF5IHVzZXMgdGhlIGxhdGVzdCBjb25maWd1cmF0aW9uXG5cdCAqIEByZXR1cm5zXHR7QXJyYXl9XHR0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCByZXByZXNlbnRlZCBpbiBhbiBhcnJheVxuXHQgKi9cblx0Z2V0VmFsdWVBcnJheSAodmFsdWUsIG5leHRQcm9wcykge1xuXHRcdC8qKiBzdXBwb3J0IG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYG5leHRQcm9wc2Agc28gYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNgIHVwZGF0ZXMgd2lsbCBmdW5jdGlvbiBhcyBleHBlY3RlZCAqL1xuXHRcdGNvbnN0IHByb3BzID0gdHlwZW9mIG5leHRQcm9wcyA9PT0gJ29iamVjdCcgPyBuZXh0UHJvcHMgOiB0aGlzLnByb3BzO1xuXHRcdGlmIChwcm9wcy5tdWx0aSkge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlID0gdmFsdWUuc3BsaXQocHJvcHMuZGVsaW1pdGVyKTtcblx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcblx0XHRcdFx0dmFsdWUgPSBbdmFsdWVdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlLm1hcCh2YWx1ZSA9PiB0aGlzLmV4cGFuZFZhbHVlKHZhbHVlLCBwcm9wcykpLmZpbHRlcihpID0+IGkpO1xuXHRcdH1cblx0XHR2YXIgZXhwYW5kZWRWYWx1ZSA9IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKTtcblx0XHRyZXR1cm4gZXhwYW5kZWRWYWx1ZSA/IFtleHBhbmRlZFZhbHVlXSA6IFtdO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSBhIHZhbHVlIGZyb20gdGhlIGdpdmVuIG9wdGlvbnMgYW5kIHZhbHVlS2V5XG5cdCAqIEBwYXJhbVx0e1N0cmluZ3xOdW1iZXJ8QXJyYXl9XHR2YWx1ZVx0LSB0aGUgc2VsZWN0ZWQgdmFsdWUocylcblx0ICogQHBhcmFtXHR7T2JqZWN0fVx0XHRwcm9wc1x0LSB0aGUgU2VsZWN0IGNvbXBvbmVudCdzIHByb3BzIChvciBuZXh0UHJvcHMpXG5cdCAqL1xuXHRleHBhbmRWYWx1ZSAodmFsdWUsIHByb3BzKSB7XG5cdFx0Y29uc3QgdmFsdWVUeXBlID0gdHlwZW9mIHZhbHVlO1xuXHRcdGlmICh2YWx1ZVR5cGUgIT09ICdzdHJpbmcnICYmIHZhbHVlVHlwZSAhPT0gJ251bWJlcicgJiYgdmFsdWVUeXBlICE9PSAnYm9vbGVhbicpIHJldHVybiB2YWx1ZTtcblx0XHRsZXQgeyBvcHRpb25zLCB2YWx1ZUtleSB9ID0gcHJvcHM7XG5cdFx0aWYgKCFvcHRpb25zKSByZXR1cm47XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAob3B0aW9uc1tpXVt2YWx1ZUtleV0gPT09IHZhbHVlKSByZXR1cm4gb3B0aW9uc1tpXTtcblx0XHR9XG5cdH0sXG5cblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuYXV0b0JsdXIpe1xuXHRcdFx0dGhpcy5ibHVySW5wdXQoKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uQ2hhbmdlKSByZXR1cm47XG5cdFx0aWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdGNvbnN0IHJlcXVpcmVkID0gdGhpcy5oYW5kbGVSZXF1aXJlZCh2YWx1ZSwgdGhpcy5wcm9wcy5tdWx0aSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgcmVxdWlyZWQgfSk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnNpbXBsZVZhbHVlICYmIHZhbHVlKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXMucHJvcHMubXVsdGkgPyB2YWx1ZS5tYXAoaSA9PiBpW3RoaXMucHJvcHMudmFsdWVLZXldKS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKSA6IHZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcblx0fSxcblxuXHRzZWxlY3RWYWx1ZSAodmFsdWUpIHtcblx0XHQvL05PVEU6IHVwZGF0ZSB2YWx1ZSBpbiB0aGUgY2FsbGJhY2sgdG8gbWFrZSBzdXJlIHRoZSBpbnB1dCB2YWx1ZSBpcyBlbXB0eSBzbyB0aGF0IHRoZXJlIGFyZSBubyBzdHlsaW5nIGlzc3VlcyAoQ2hyb21lIGhhZCBpc3N1ZSBvdGhlcndpc2UpXG5cdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdFx0Zm9jdXNlZEluZGV4OiBudWxsXG5cdFx0XHR9LCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuYWRkVmFsdWUodmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCxcblx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sXG5cblx0YWRkVmFsdWUgKHZhbHVlKSB7XG5cdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0Y29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucy5maWx0ZXIodmFsID0+ICF2YWwuZGlzYWJsZWQpO1xuXHRcdGNvbnN0IGxhc3RWYWx1ZUluZGV4ID0gdmlzaWJsZU9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmNvbmNhdCh2YWx1ZSkpO1xuXHRcdGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggLSAxID09PSBsYXN0VmFsdWVJbmRleCkge1xuXHRcdFx0Ly8gdGhlIGxhc3Qgb3B0aW9uIHdhcyBzZWxlY3RlZDsgZm9jdXMgdGhlIHNlY29uZC1sYXN0IG9uZVxuXHRcdFx0dGhpcy5mb2N1c09wdGlvbih2aXNpYmxlT3B0aW9uc1tsYXN0VmFsdWVJbmRleCAtIDFdKTtcblx0XHR9IGVsc2UgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA+IGxhc3RWYWx1ZUluZGV4KSB7XG5cdFx0XHQvLyBmb2N1cyB0aGUgb3B0aW9uIGJlbG93IHRoZSBzZWxlY3RlZCBvbmVcblx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggKyAxXSk7XG5cdFx0fVxuXHR9LFxuXG5cdHBvcFZhbHVlICgpIHtcblx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSByZXR1cm47XG5cdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGgtMV0uY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlKSByZXR1cm47XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LnNsaWNlKDAsIHZhbHVlQXJyYXkubGVuZ3RoIC0gMSkpO1xuXHR9LFxuXG5cdHJlbW92ZVZhbHVlICh2YWx1ZSkge1xuXHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5maWx0ZXIoaSA9PiBpICE9PSB2YWx1ZSkpO1xuXHRcdHRoaXMuZm9jdXMoKTtcblx0fSxcblxuXHRjbGVhclZhbHVlIChldmVudCkge1xuXHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHQvLyBidXR0b24sIGlnbm9yZSBpdC5cblx0XHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLmdldFJlc2V0VmFsdWUoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0fSwgdGhpcy5mb2N1cyk7XG5cdH0sXG5cblx0Z2V0UmVzZXRWYWx1ZSAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMucmVzZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5yZXNldFZhbHVlO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0Zm9jdXNPcHRpb24gKG9wdGlvbikge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3B0aW9uXG5cdFx0fSk7XG5cdH0sXG5cblx0Zm9jdXNOZXh0T3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ25leHQnKTtcblx0fSxcblxuXHRmb2N1c1ByZXZpb3VzT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG5cdH0sXG5cblx0Zm9jdXNQYWdlVXBPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV91cCcpO1xuXHR9LFxuXG5cdGZvY3VzUGFnZURvd25PcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV9kb3duJyk7XG5cdH0sXG5cblx0Zm9jdXNTdGFydE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdzdGFydCcpO1xuXHR9LFxuXG5cdGZvY3VzRW5kT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ2VuZCcpO1xuXHR9LFxuXG5cdGZvY3VzQWRqYWNlbnRPcHRpb24gKGRpcikge1xuXHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnNcblx0XHRcdC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+ICh7IG9wdGlvbiwgaW5kZXggfSkpXG5cdFx0XHQuZmlsdGVyKG9wdGlvbiA9PiAhb3B0aW9uLm9wdGlvbi5kaXNhYmxlZCk7XG5cdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuXHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiB0aGlzLl9mb2N1c2VkT3B0aW9uIHx8IChvcHRpb25zLmxlbmd0aCA/IG9wdGlvbnNbZGlyID09PSAnbmV4dCcgPyAwIDogb3B0aW9ucy5sZW5ndGggLSAxXS5vcHRpb24gOiBudWxsKVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcblx0XHR2YXIgZm9jdXNlZEluZGV4ID0gLTE7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gaTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChkaXIgPT09ICduZXh0JyAmJiBmb2N1c2VkSW5kZXggIT09IC0xICkge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gKGZvY3VzZWRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGg7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcblx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGZvY3VzZWRJbmRleCAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdzdGFydCcpIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdlbmQnKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX3VwJykge1xuXHRcdFx0dmFyIHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4IC0gdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdGlmIChwb3RlbnRpYWxJbmRleCA8IDApIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IHBvdGVudGlhbEluZGV4O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV9kb3duJykge1xuXHRcdFx0dmFyIHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4ICsgdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdGlmIChwb3RlbnRpYWxJbmRleCA+IG9wdGlvbnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRJbmRleDogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLmluZGV4LFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLm9wdGlvblxuXHRcdH0pO1xuXHR9LFxuXG5cdGdldEZvY3VzZWRPcHRpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9mb2N1c2VkT3B0aW9uO1xuXHR9LFxuXG5cdGdldElucHV0VmFsdWUgKCkge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdH0sXG5cblx0c2VsZWN0Rm9jdXNlZE9wdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdFZhbHVlKHRoaXMuX2ZvY3VzZWRPcHRpb24pO1xuXHRcdH1cblx0fSxcblxuXHRyZW5kZXJMb2FkaW5nICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nLXpvbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LWxvYWRpbmdcIiAvPlxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyVmFsdWUgKHZhbHVlQXJyYXksIGlzT3Blbikge1xuXHRcdGxldCByZW5kZXJMYWJlbCA9IHRoaXMucHJvcHMudmFsdWVSZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsO1xuXHRcdGxldCBWYWx1ZUNvbXBvbmVudCA9IHRoaXMucHJvcHMudmFsdWVDb21wb25lbnQ7XG5cdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuICF0aGlzLnN0YXRlLmlucHV0VmFsdWUgPyA8ZGl2IGNsYXNzTmFtZT1cIlNlbGVjdC1wbGFjZWhvbGRlclwiPnt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfTwvZGl2PiA6IG51bGw7XG5cdFx0fVxuXHRcdGxldCBvbkNsaWNrID0gdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sgPyB0aGlzLmhhbmRsZVZhbHVlQ2xpY2sgOiBudWxsO1xuXHRcdGlmICh0aGlzLnByb3BzLm11bHRpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoKHZhbHVlLCBpKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFZhbHVlQ29tcG9uZW50XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLScgKyBpfVxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e3RoaXMuX2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWQgfHwgdmFsdWUuY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlfVxuXHRcdFx0XHRcdFx0a2V5PXtgdmFsdWUtJHtpfS0ke3ZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldfWB9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0XHRcdFx0b25SZW1vdmU9e3RoaXMucmVtb3ZlVmFsdWV9XG5cdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0e3JlbmRlckxhYmVsKHZhbHVlLCBpKX1cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1hcmlhLW9ubHlcIj4mbmJzcDs8L3NwYW4+XG5cdFx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkge1xuXHRcdFx0aWYgKGlzT3Blbikgb25DbGljayA9IG51bGw7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8VmFsdWVDb21wb25lbnRcblx0XHRcdFx0XHRpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLWl0ZW0nfVxuXHRcdFx0XHRcdGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdGluc3RhbmNlUHJlZml4PXt0aGlzLl9pbnN0YW5jZVByZWZpeH1cblx0XHRcdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZUFycmF5WzBdfVxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e3JlbmRlckxhYmVsKHZhbHVlQXJyYXlbMF0pfVxuXHRcdFx0XHQ8L1ZhbHVlQ29tcG9uZW50PlxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVySW5wdXQgKHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCkge1xuXHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCdTZWxlY3QtaW5wdXQnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKTtcblx0XHRjb25zdCBpc09wZW4gPSAhIXRoaXMuc3RhdGUuaXNPcGVuO1xuXG5cdFx0Y29uc3QgYXJpYU93bnMgPSBjbGFzc05hbWVzKHtcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXG5cdFx0XHRbdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZSddOiB0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdCYmICF0aGlzLnByb3BzLmRpc2FibGVkXG5cdFx0XHRcdCYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkXG5cdFx0XHRcdCYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHR9KTtcblxuXHRcdC8vIFRPRE86IENoZWNrIGhvdyB0aGlzIHByb2plY3QgaW5jbHVkZXMgT2JqZWN0LmFzc2lnbigpXG5cdFx0Y29uc3QgaW5wdXRQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuaW5wdXRQcm9wcywge1xuXHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG5cdFx0XHQnYXJpYS1vd25zJzogYXJpYU93bnMsXG5cdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10sXG5cdFx0XHQnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcblx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0dGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXgsXG5cdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG5cdFx0XHRvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG5cdFx0XHRyZWY6IHJlZiA9PiB0aGlzLmlucHV0ID0gcmVmLFxuXHRcdFx0cmVxdWlyZWQ6IHRoaXMuc3RhdGUucmVxdWlyZWQsXG5cdFx0XHR2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlXG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKGlucHV0UHJvcHMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdGNvbnN0IHsgaW5wdXRDbGFzc05hbWUsIC4uLmRpdlByb3BzIH0gPSB0aGlzLnByb3BzLmlucHV0UHJvcHM7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0ey4uLmRpdlByb3BzfVxuXHRcdFx0XHRcdHJvbGU9XCJjb21ib2JveFwiXG5cdFx0XHRcdFx0YXJpYS1leHBhbmRlZD17aXNPcGVufVxuXHRcdFx0XHRcdGFyaWEtb3ducz17aXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnIDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ31cblx0XHRcdFx0XHRhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2lzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0dGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXggfHwgMH1cblx0XHRcdFx0XHRvbkJsdXI9e3RoaXMuaGFuZGxlSW5wdXRCbHVyfVxuXHRcdFx0XHRcdG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLmlucHV0ID0gcmVmfVxuXHRcdFx0XHRcdGFyaWEtcmVhZG9ubHk9eycnICsgISF0aGlzLnByb3BzLmRpc2FibGVkfVxuXHRcdFx0XHRcdHN0eWxlPXt7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6J2lubGluZS1ibG9jaycgfX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hdXRvc2l6ZSkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEF1dG9zaXplSW5wdXQgey4uLmlucHV0UHJvcHN9IG1pbldpZHRoPVwiNVwiIC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfT5cblx0XHRcdFx0PGlucHV0IHsuLi5pbnB1dFByb3BzfSAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJDbGVhciAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmNsZWFyYWJsZSB8fCAoIXRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy52YWx1ZSA9PT0gMCkgfHwgKHRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMucHJvcHMudmFsdWUubGVuZ3RoKSB8fCB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0Y29uc3QgY2xlYXIgPSB0aGlzLnByb3BzLmNsZWFyUmVuZGVyZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXItem9uZVwiIHRpdGxlPXt0aGlzLnByb3BzLm11bHRpID8gdGhpcy5wcm9wcy5jbGVhckFsbFRleHQgOiB0aGlzLnByb3BzLmNsZWFyVmFsdWVUZXh0fVxuXHRcdFx0XHRhcmlhLWxhYmVsPXt0aGlzLnByb3BzLm11bHRpID8gdGhpcy5wcm9wcy5jbGVhckFsbFRleHQgOiB0aGlzLnByb3BzLmNsZWFyVmFsdWVUZXh0fVxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5jbGVhclZhbHVlfVxuXHRcdFx0XHRvblRvdWNoU3RhcnQ9e3RoaXMuaGFuZGxlVG91Y2hTdGFydH1cblx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kQ2xlYXJWYWx1ZX1cblx0XHRcdD5cblx0XHRcdFx0e2NsZWFyfVxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQXJyb3cgKCkge1xuXHRcdGNvbnN0IG9uTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd25PbkFycm93O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuO1xuXHRcdGNvbnN0IGFycm93ID0gdGhpcy5wcm9wcy5hcnJvd1JlbmRlcmVyKHsgb25Nb3VzZURvd24sIGlzT3BlbiB9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhblxuXHRcdFx0XHRjbGFzc05hbWU9XCJTZWxlY3QtYXJyb3ctem9uZVwiXG5cdFx0XHRcdG9uTW91c2VEb3duPXtvbk1vdXNlRG93bn1cblx0XHRcdD5cblx0XHRcdFx0e2Fycm93fVxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH0sXG5cblx0ZmlsdGVyT3B0aW9ucyAoZXhjbHVkZU9wdGlvbnMpIHtcblx0XHR2YXIgZmlsdGVyVmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnMgfHwgW107XG5cdFx0aWYgKHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucykge1xuXHRcdFx0Ly8gTWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBib29sZWFuIGF0dHJpYnV0ZVxuXHRcdFx0Y29uc3QgZmlsdGVyT3B0aW9ucyA9IHR5cGVvZiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgPT09ICdmdW5jdGlvbidcblx0XHRcdFx0PyB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnNcblx0XHRcdFx0OiBkZWZhdWx0RmlsdGVyT3B0aW9ucztcblxuXHRcdFx0cmV0dXJuIGZpbHRlck9wdGlvbnMoXG5cdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdGZpbHRlclZhbHVlLFxuXHRcdFx0XHRleGNsdWRlT3B0aW9ucyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpbHRlck9wdGlvbjogdGhpcy5wcm9wcy5maWx0ZXJPcHRpb24sXG5cdFx0XHRcdFx0aWdub3JlQWNjZW50czogdGhpcy5wcm9wcy5pZ25vcmVBY2NlbnRzLFxuXHRcdFx0XHRcdGlnbm9yZUNhc2U6IHRoaXMucHJvcHMuaWdub3JlQ2FzZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0XHRtYXRjaFBvczogdGhpcy5wcm9wcy5tYXRjaFBvcyxcblx0XHRcdFx0XHRtYXRjaFByb3A6IHRoaXMucHJvcHMubWF0Y2hQcm9wLFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5LFxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9XG5cdH0sXG5cblx0b25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpIHtcblx0XHRpZiAoaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLmZvY3VzZWQgPSByZWY7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlck1lbnUgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMubWVudVJlbmRlcmVyKHtcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbixcblx0XHRcdFx0Zm9jdXNPcHRpb246IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdGluc3RhbmNlUHJlZml4OiB0aGlzLl9pbnN0YW5jZVByZWZpeCxcblx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXG5cdFx0XHRcdG9uRm9jdXM6IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdG9uU2VsZWN0OiB0aGlzLnNlbGVjdFZhbHVlLFxuXHRcdFx0XHRvcHRpb25DbGFzc05hbWU6IHRoaXMucHJvcHMub3B0aW9uQ2xhc3NOYW1lLFxuXHRcdFx0XHRvcHRpb25Db21wb25lbnQ6IHRoaXMucHJvcHMub3B0aW9uQ29tcG9uZW50LFxuXHRcdFx0XHRvcHRpb25SZW5kZXJlcjogdGhpcy5wcm9wcy5vcHRpb25SZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsLFxuXHRcdFx0XHRvcHRpb25zLFxuXHRcdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5zZWxlY3RWYWx1ZSxcblx0XHRcdFx0dmFsdWVBcnJheSxcblx0XHRcdFx0dmFsdWVLZXk6IHRoaXMucHJvcHMudmFsdWVLZXksXG5cdFx0XHRcdG9uT3B0aW9uUmVmOiB0aGlzLm9uT3B0aW9uUmVmLFxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLm5vUmVzdWx0c1RleHQpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LW5vcmVzdWx0c1wiPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLm5vUmVzdWx0c1RleHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlckhpZGRlbkZpZWxkICh2YWx1ZUFycmF5KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm5hbWUpIHJldHVybjtcblx0XHRpZiAodGhpcy5wcm9wcy5qb2luVmFsdWVzKSB7XG5cdFx0XHRsZXQgdmFsdWUgPSB2YWx1ZUFycmF5Lm1hcChpID0+IHN0cmluZ2lmeVZhbHVlKGlbdGhpcy5wcm9wcy52YWx1ZUtleV0pKS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKTtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdHR5cGU9XCJoaWRkZW5cIlxuXHRcdFx0XHRcdHJlZj17cmVmID0+IHRoaXMudmFsdWUgPSByZWZ9XG5cdFx0XHRcdFx0bmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH0gLz5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcblx0XHRcdDxpbnB1dCBrZXk9eydoaWRkZW4uJyArIGluZGV4fVxuXHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcblx0XHRcdFx0cmVmPXsndmFsdWUnICsgaW5kZXh9XG5cdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cblx0XHRcdFx0dmFsdWU9e3N0cmluZ2lmeVZhbHVlKGl0ZW1bdGhpcy5wcm9wcy52YWx1ZUtleV0pfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH0gLz5cblx0XHQpKTtcblx0fSxcblxuXHRnZXRGb2N1c2FibGVPcHRpb25JbmRleCAoc2VsZWN0ZWRPcHRpb24pIHtcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zO1xuXHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG5cdFx0bGV0IGZvY3VzZWRPcHRpb24gPSB0aGlzLnN0YXRlLmZvY3VzZWRPcHRpb24gfHwgc2VsZWN0ZWRPcHRpb247XG5cdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgIWZvY3VzZWRPcHRpb24uZGlzYWJsZWQpIHtcblx0XHRcdGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IG9wdGlvbnMuaW5kZXhPZihmb2N1c2VkT3B0aW9uKTtcblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uSW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdHJldHVybiBmb2N1c2VkT3B0aW9uSW5kZXg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIW9wdGlvbnNbaV0uZGlzYWJsZWQpIHJldHVybiBpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHRyZW5kZXJPdXRlciAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xuXHRcdGxldCBtZW51ID0gdGhpcy5yZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pO1xuXHRcdGlmICghbWVudSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy5tZW51Q29udGFpbmVyID0gcmVmfSBjbGFzc05hbWU9XCJTZWxlY3QtbWVudS1vdXRlclwiIHN0eWxlPXt0aGlzLnByb3BzLm1lbnVDb250YWluZXJTdHlsZX0+XG5cdFx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy5tZW51ID0gcmVmfSByb2xlPVwibGlzdGJveFwiIGNsYXNzTmFtZT1cIlNlbGVjdC1tZW51XCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1saXN0J31cblx0XHRcdFx0XHRcdCBzdHlsZT17dGhpcy5wcm9wcy5tZW51U3R5bGV9XG5cdFx0XHRcdFx0XHQgb25TY3JvbGw9e3RoaXMuaGFuZGxlTWVudVNjcm9sbH1cblx0XHRcdFx0XHRcdCBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnV9PlxuXHRcdFx0XHRcdHttZW51fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblx0XHRsZXQgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zID0gdGhpcy5maWx0ZXJPcHRpb25zKHRoaXMucHJvcHMubXVsdGkgPyB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSkgOiBudWxsKTtcblx0XHRsZXQgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIW9wdGlvbnMubGVuZ3RoICYmIHZhbHVlQXJyYXkubGVuZ3RoICYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIGlzT3BlbiA9IGZhbHNlO1xuXHRcdGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgodmFsdWVBcnJheVswXSk7XG5cblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IG51bGw7XG5cdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25zW2ZvY3VzZWRPcHRpb25JbmRleF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHR9XG5cdFx0bGV0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG5cdFx0XHQnU2VsZWN0LS1tdWx0aSc6IHRoaXMucHJvcHMubXVsdGksXG5cdFx0XHQnU2VsZWN0LS1zaW5nbGUnOiAhdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdpcy1kaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHQnaXMtZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnByb3BzLmlzTG9hZGluZyxcblx0XHRcdCdpcy1vcGVuJzogaXNPcGVuLFxuXHRcdFx0J2lzLXBzZXVkby1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdFx0XHQnaXMtc2VhcmNoYWJsZSc6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdCdoYXMtdmFsdWUnOiB2YWx1ZUFycmF5Lmxlbmd0aCxcblx0XHR9KTtcblxuXHRcdGxldCByZW1vdmVNZXNzYWdlID0gbnVsbDtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJlxuXHRcdFx0IXRoaXMucHJvcHMuZGlzYWJsZWQgJiZcblx0XHRcdHZhbHVlQXJyYXkubGVuZ3RoICYmXG5cdFx0XHQhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmXG5cdFx0XHR0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJlxuXHRcdFx0dGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRyZW1vdmVNZXNzYWdlID0gKFxuXHRcdFx0XHQ8c3BhbiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZSd9IGNsYXNzTmFtZT1cIlNlbGVjdC1hcmlhLW9ubHlcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5iYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2UucmVwbGFjZSgne2xhYmVsfScsIHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXVt0aGlzLnByb3BzLmxhYmVsS2V5XSl9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXtyZWYgPT4gdGhpcy53cmFwcGVyID0gcmVmfVxuXHRcdFx0XHQgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdCBzdHlsZT17dGhpcy5wcm9wcy53cmFwcGVyU3R5bGV9PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KX1cblx0XHRcdFx0PGRpdiByZWY9e3JlZiA9PiB0aGlzLmNvbnRyb2wgPSByZWZ9XG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiU2VsZWN0LWNvbnRyb2xcIlxuXHRcdFx0XHRcdHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuXHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0XHRvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1tdWx0aS12YWx1ZS13cmFwcGVyXCIgaWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZSd9PlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyVmFsdWUodmFsdWVBcnJheSwgaXNPcGVuKX1cblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCl9XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdHtyZW1vdmVNZXNzYWdlfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckxvYWRpbmcoKX1cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDbGVhcigpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckFycm93KCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7aXNPcGVuID8gdGhpcy5yZW5kZXJPdXRlcihvcHRpb25zLCAhdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlQXJyYXkgOiBudWxsLCBmb2N1c2VkT3B0aW9uKSA6IG51bGx9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7XG4iXX0=
