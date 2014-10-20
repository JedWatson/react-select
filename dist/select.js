require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _ = require('underscore');

function classes() {
	var rtn = [];
	for (var i = 0; i < arguments.length; i++) {
		if ('string' === typeof arguments[i]) {
			rtn.push(arguments[i]);
		} else if (_.isObject(arguments[i])) {
			_.each(arguments[i], function(val, key) {
				if (val) {
					rtn.push(key);
				}
			});
		}
	}
	return rtn.join(' ') || undefined;
}

module.exports = classes;
},{"underscore":undefined}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule copyProperties
 */

/**
 * Copy properties from one or more objects (up to 5) into the first object.
 * This is a shallow copy. It mutates the first object and also returns it.
 *
 * NOTE: `arguments` has a very significant performance penalty, which is why
 * we don't support unlimited arguments.
 */
function copyProperties(obj, a, b, c, d, e, f) {
  obj = obj || {};

  if ("production" !== process.env.NODE_ENV) {
    if (f) {
      throw new Error('Too many arguments passed to copyProperties');
    }
  }

  var args = [a, b, c, d, e];
  var ii = 0, v;
  while (args[ii]) {
    v = args[ii++];
    for (var k in v) {
      obj[k] = v[k];
    }

    // IE ignores toString in object iteration.. See:
    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
      obj.toString = v.toString;
    }
  }

  return obj;
}

module.exports = copyProperties;

}).call(this,require('_process'))
},{"_process":2}],4:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule emptyFunction
 */

var copyProperties = require("./copyProperties");

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

copyProperties(emptyFunction, {
  thatReturns: makeEmptyFunction,
  thatReturnsFalse: makeEmptyFunction(false),
  thatReturnsTrue: makeEmptyFunction(true),
  thatReturnsNull: makeEmptyFunction(null),
  thatReturnsThis: function() { return this; },
  thatReturnsArgument: function(arg) { return arg; }
});

module.exports = emptyFunction;

},{"./copyProperties":3}],"react-select":[function(require,module,exports){
/** @jsx React.DOM */

var _ = require('underscore'),
	React = require('react'),
	classes = require('./classes');

var logEvent = function(msg) {
	console.log(msg);
};

// comment out this line to debug the control state
logEvent = require('react/lib/emptyFunction');

var requestId = 0;

var Select = React.createClass({
	
	displayName: 'Select',
	
	getDefaultProps: function() {
		return {
			autoload: true
		};
	},
	
	getInitialState: function() {
		return {
			value: this.props.value,
			inputValue: '',
			placeholder: '',
			options: this.props.options || [],
			focusedOption: null,
			isFocused: false,
			isOpen: false,
			isLoading: false
		};
	},
	
	componentWillMount: function() {
		
		this._optionsCache = {};
		this.setState(this.getStateFromValue(this.state.value));
		
		if (this.props.asyncOptions && this.props.autoload) {
			this.autoloadAsyncOptions();
		}
		
	},
	
	componentWillUnmount: function() {
		clearTimeout(this.blurTimer);
	},
	
	getStateFromValue: function(value) {
		var selectedOption = ('string' === typeof value) ? _.findWhere(this.state.options, { value: value }) : value;
		return selectedOption ? {
			value: selectedOption.value,
			inputValue: selectedOption.label,
			placeholder: selectedOption.label,
			focusedOption: selectedOption
		} : {
			value: '',
			inputValue: '',
			placeholder: this.props.placeholder || 'Select...',
			focusedOption: null
		};
	},
	
	handleKeyDown: function(event) {
		
		logEvent('Key down: ' + event.keyCode);
		
		switch (event.keyCode) {
			
			case 9: // tab
				if (event.shiftKey || !this.state.isOpen) {
					return;
				}
				this.selectFocusedOption();
			break;
			
			case 13: // enter
				this.selectFocusedOption();
			break;
			
			case 27: // escape
				if (this.state.isOpen) {
					this.closeOnEscape();
				} else {
					this.clearValue();
				}
			break;
			
			case 38: // up
				this.focusPreviousOption();
			break;
			
			case 40: // down
				this.focusNextOption();
			break;
			
			default: return;
		}
		
		event.preventDefault();
	},
	
	handleMouseDown: function() {
		logEvent('click: control');
		if (this.state.isOpen) {
			this.setState({
				isOpen: false
			});
			this._controlIsFocused = true;
			this.refs.control.getDOMNode().focus();
			clearTimeout(this.blurTimer);
		} else {
			this.setState({
				isOpen: true,
				inputValue: ''
			});
			if (!this._inputIsFocused) {
				this.refs.input.getDOMNode().focus();
			}
		}
	},
	
	handleFocus: function() {
		if (this._controlIsFocused) return;
		logEvent('focus: control');
		this._controlIsFocused = true;
		clearTimeout(this.blurTimer);
		setTimeout(function() {
			if (!this._inputIsFocused) {
				this.refs.input.getDOMNode().focus();
			}
		}.bind(this), 0);
		this.setState({
			isFocused: true
		});
	},
	
	handleBlur: function(event) {
		if (!this._controlIsFocused) return;
		this._controlIsFocused = false;
		clearTimeout(this.blurTimer);
		this.blurTimer = setTimeout(function() {
			logEvent('blur: control');
			var blurState = this.getStateFromValue(this.state.value);
			blurState.isFocused = false;
			blurState.isOpen = false;
			if (this.isMounted()) {
				this.setState(blurState);
			}
		}.bind(this), 100);
	},
	
	handleInputMouseDown: function(event) {
		if (this._inputIsFocused) {
			logEvent('click: input');
			event.stopPropagation();
		}
	},
	
	handleInputFocus: function(event) {
		logEvent('focus: input');
		clearTimeout(this.blurTimer);
		this._inputIsFocused = true;
	},
	
	handleInputBlur: function(event) {
		logEvent('blur: input');
		this._inputIsFocused = false;
	},
	
	handleInputChange: function(event) {
		if (this.props.asyncOptions) {
			this.setState({
				isLoading: true,
				inputValue: event.target.value
			});
			this.loadAsyncOptions(event.target.value, {
				isLoading: false,
				isOpen: true
			});
		} else {
			this.setState({
				isOpen: true,
				inputValue: event.target.value
			});
		}
	},
	
	autoloadAsyncOptions: function() {
		this.loadAsyncOptions('', {}, function() {});
	},
	
	loadAsyncOptions: function(input, state) {
		
		for (var i = 0; i <= input.length; i++) {
			var cacheKey = input.slice(0, i);
			if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
				this.setState(_.extend({
					options: this._optionsCache[cacheKey].options
				}, state));
				return;
			}
		}
		
		var thisRequestId = this._currentRequestId = requestId++;
		
		this.props.asyncOptions(input, function(err, data) {
			
			this._optionsCache[input] = data;
			
			if (thisRequestId !== this._currentRequestId) {
				return;
			}
			
			this.setState(_.extend({
				options: data.options
			}, state));
			
		}.bind(this));
		
	},
	
	filterOptions: function() {
		return _.filter(this.state.options, this.filterOption, this);
	},
	
	filterOption: function(op) {
		return (
			!this.state.inputValue
			|| op.value.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
			|| op.label.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) >= 0
		);
	},
	
	selectOption: function(option) {
		this.setValue(option);
		this.refs.control.getDOMNode().focus();
	},
	
	setValue: function(option) {
		var newState = this.getStateFromValue(option);
		newState.isOpen = false;
		this.setState(newState);
	},
	
	selectFocusedOption: function() {
		return this.setValue(this.state.focusedOption);
	},
	
	clearValue: function(event) {
		logEvent('clear value');
		this.setValue(null);
	},
	
	closeOnEscape: function() {
		this.setValue(this.state.value);
	},
	
	focusOption: function(op) {
		this.setState({
			focusedOption: op
		});
	},
	
	unfocusOption: function(op) {
		if (this.state.focusedOption === op) {
			this.setState({
				focusedOption: null
			});
		}
	},
	
	focusNextOption: function() {
		this.focusAdjacentOption('next');
	},
	
	focusPreviousOption: function() {
		this.focusAdjacentOption('previous');
	},
	
	focusAdjacentOption: function(dir) {
		
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: ''
			});
			return;
		}
		
		var ops = this.filterOptions();
		
		if (!ops.length) {
			return;
		}
		
		var focusedIndex = -1;
		
		for (var i = 0; i < ops.length; i++) {
			if (this.state.focusedOption === ops[i]) {
				focusedIndex = i;
				break;
			}
		}
		
		var focusedOption = ops[0];
		
		if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
			focusedOption = ops[focusedIndex + 1];
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedOption = ops[focusedIndex - 1];
			} else {
				focusedOption = ops[ops.length - 1];
			}
		}
		
		this.setState({
			focusedOption: focusedOption
		});
		
	},
	
	buildMenu: function() {
		
		var ops = _.map(this.filterOptions(), function(op) {
			
			var optionClass = classes({
				'Select-option': true,
				'is-focused': this.state.focusedOption === op
			});
			
			var mouseEnter = this.focusOption.bind(this, op),
				mouseLeave = this.unfocusOption.bind(this, op),
				mouseDown = this.selectOption.bind(this, op);
			
			return React.DOM.div({
				key: 'option-' + op.value,
				className: optionClass,
				onMouseEnter: mouseEnter,
				onMouseLeave: mouseLeave,
				onMouseDown: mouseDown
			}, op.label);
			
		}, this);
		
		return ops.length ? ops : React.DOM.div({ className: "Select-noresults" }, "No results found");
		
	},
	
	render: function() {
		
		logEvent('render');
		
		var menu = this.state.isOpen ? React.DOM.div({ className: "Select-menu" }, this.buildMenu()) : null;
		var loading = this.state.isLoading ? React.DOM.span({ className: "Select-loading" }) : null;
		var clear = this.state.value ? React.DOM.span({ className: "Select-clear", onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;' } }) : null;
		
		var selectClass = classes('Select', {
			'is-multi': this.props.multi,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'has-value': this.state.value
		});
		
		return React.DOM.div({ className: selectClass }, 
			React.DOM.input({ type: "hidden", ref: "value", name: this.props.name, value: this.state.value }), 
			React.DOM.div({ className: "Select-control", tabIndex: "-1", ref: "control", onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onFocus: this.handleFocus, onBlur: this.handleBlur }, 
				React.DOM.input({ className: "Select-input", placeholder: this.state.placeholder, ref: "input", onMouseDown: this.handleInputMouseDown, value: this.state.inputValue, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange }), 
				React.DOM.span({ className: "Select-arrow" }),
				loading,
				clear
			),
			menu
		);
	}
	
});

module.exports = Select;

},{"./classes":1,"react":undefined,"react/lib/emptyFunction":4,"underscore":undefined}]},{},[]);
