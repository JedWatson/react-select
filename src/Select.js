var React = require('react');
var Input = require('react-input-autosize');
var classes = require('classnames');
var Value = require('./Value');

var requestId = 0;

var Select = React.createClass({

	displayName: 'Select',

	propTypes: {
		value: React.PropTypes.any,                // initial field value
		multi: React.PropTypes.bool,               // multi-value input
		disabled: React.PropTypes.bool,            // whether the Select is disabled or not
		options: React.PropTypes.array,            // array of options
		delimiter: React.PropTypes.string,         // delimiter to use to join multiple values
		asyncOptions: React.PropTypes.func,        // function to call to get options
		autoload: React.PropTypes.bool,            // whether to auto-load the default async options set
		placeholder: React.PropTypes.string,       // field placeholder, displayed when there's no value
		noResultsText: React.PropTypes.string,     // placeholder displayed when there are no matching search results
		clearable: React.PropTypes.bool,           // should it be possible to reset value
		clearValueText: React.PropTypes.string,    // title for the "clear" control
		clearAllText: React.PropTypes.string,      // title for the "clear" control when multi: true
		searchable: React.PropTypes.bool,          // whether to enable searching feature or not
		searchPromptText: React.PropTypes.string,  // label to prompt for search input
		name: React.PropTypes.string,              // field name, for hidden <input /> tag
		onChange: React.PropTypes.func,            // onChange handler: function(newValue) {}
		onFocus: React.PropTypes.func,             // onFocus handler: function(event) {}
		onBlur: React.PropTypes.func,              // onBlur handler: function(event) {}
		className: React.PropTypes.string,         // className for the outer element
		filterOption: React.PropTypes.func,        // method to filter a single option: function(option, filterString)
		filterOptions: React.PropTypes.func,       // method to filter the options array: function([options], filterString, [values])
		matchPos: React.PropTypes.string,          // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string,         // (any|label|value) which option property to filter on
		inputProps: React.PropTypes.object,        // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
		allowCreate: React.PropTypes.bool,         // wether to allow creation of new entries
		/*
		* Allow user to make option label clickable. When this handler is defined we should
		* wrap label into <a>label</a> tag.
		*
		* onOptionLabelClick handler: function (value, event) {}
		*
		*/
		onOptionLabelClick: React.PropTypes.func
	},

	getDefaultProps: function() {
		return {
			value: undefined,
			options: undefined,
			disabled: false,
			delimiter: ',',
			asyncOptions: undefined,
			autoload: true,
			placeholder: 'Select...',
			noResultsText: 'No results found',
			clearable: true,
			clearValueText: 'Clear value',
			clearAllText: 'Clear all',
			searchable: true,
			searchPromptText: 'Type to search',
			name: undefined,
			onChange: undefined,
			className: undefined,
			matchPos: 'any',
			matchProp: 'any',
			inputProps: {},
			allowCreate: false,

			onOptionLabelClick: undefined
		};
	},

	getInitialState: function() {
		return {
			/*
			 * set by getStateFromValue on componentWillMount:
			 * - value
			 * - values
			 * - filteredOptions
			 * - inputValue
			 * - placeholder
			 * - focusedOption
			*/
			options: this.props.options,
			isFocused: false,
			isOpen: false,
			isLoading: false
		};
	},

	componentWillMount: function() {
		this._optionsCache = {};
		this._optionsFilterString = '';
		this.setState(this.getStateFromValue(this.props.value));

		if (this.props.asyncOptions && this.props.autoload) {
			this.autoloadAsyncOptions();
		}

		var self = this;
		this._closeMenuIfClickedOutside = function(event) {
			if (!self.state.isOpen) {
				return;
			}
			var menuElem = self.refs.selectMenuContainer.getDOMNode();
			var controlElem = self.refs.control.getDOMNode();

			var eventOccuredOutsideMenu = self.clickedOutsideElement(menuElem, event);
			var eventOccuredOutsideControl = self.clickedOutsideElement(controlElem, event);

			// Hide dropdown menu if click occurred outside of menu
			if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
				self.setState({
					isOpen: false
				}, self._unbindCloseMenuIfClickedOutside);
			}
		};

		this._bindCloseMenuIfClickedOutside = function() {
			if (!document.addEventListener && document.attachEvent) {
				document.attachEvent('onclick', this._closeMenuIfClickedOutside);
			} else {
				document.addEventListener('click', this._closeMenuIfClickedOutside);
			}
		};

		this._unbindCloseMenuIfClickedOutside = function() {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('onclick', this._closeMenuIfClickedOutside);
			} else {
				document.removeEventListener('click', this._closeMenuIfClickedOutside);
			}
		};
	},

	componentWillUnmount: function() {
		clearTimeout(this._blurTimeout);
		clearTimeout(this._focusTimeout);

		if(this.state.isOpen) {
			this._unbindCloseMenuIfClickedOutside();
		}
	},

	componentWillReceiveProps: function(newProps) {
		if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
			this.setState({
				options: newProps.options,
				filteredOptions: this.filterOptions(newProps.options)
			});
		}
		if (newProps.value !== this.state.value) {
			this.setState(this.getStateFromValue(newProps.value, newProps.options));
		}
	},

	componentDidUpdate: function() {
		var self = this;

		if (!this.props.disabled && this._focusAfterUpdate) {
			clearTimeout(this._blurTimeout);

			this._focusTimeout = setTimeout(function() {
				self.getInputNode().focus();
				self._focusAfterUpdate = false;
			}, 50);
		}

		if (this._focusedOptionReveal) {
			if (this.refs.focused && this.refs.menu) {
				var focusedDOM = this.refs.focused.getDOMNode();
				var menuDOM = this.refs.menu.getDOMNode();
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();

				if (focusedRect.bottom > menuRect.bottom ||
					focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
				}
			}

			this._focusedOptionReveal = false;
		}
	},

	focus: function() {
		this.getInputNode().focus();
	},

	clickedOutsideElement: function(element, event) {
		var eventTarget = (event.target) ? event.target : event.srcElement;
		while (eventTarget != null) {
			if (eventTarget === element) return false;
			eventTarget = eventTarget.offsetParent;
		}
		return true;
	},

	getStateFromValue: function(value, options) {
		if (!options) {
			options = this.state.options;
		}

		// reset internal filter string
		this._optionsFilterString = '';

		var values = this.initValuesArray(value, options),
			filteredOptions = this.filterOptions(options, values);

		return {
			value: values.map(function(v) { return v.value; }).join(this.props.delimiter),
			values: values,
			inputValue: '',
			filteredOptions: filteredOptions,
			placeholder: !this.props.multi && values.length ? values[0].label : this.props.placeholder,
			focusedOption: !this.props.multi && values.length ? values[0] : filteredOptions[0]
		};
	},

	initValuesArray: function(values, options) {
		if (!Array.isArray(values)) {
			if (typeof values === 'string') {
				values = values.split(this.props.delimiter);
			} else {
				values = values ? [values] : [];
			}
		}

		return values.map(function(val) {
			if (typeof val === 'string') {
				for (var key in options) {
					if (options.hasOwnProperty(key) && options[key] && options[key].value === val) {
						return options[key];
					}
				}
				return { value: val, label: val };
			} else {
				return val;
			}
		});
	},

	setValue: function(value, focusAfterUpdate) {
		if (focusAfterUpdate || focusAfterUpdate === undefined) {
			this._focusAfterUpdate = true;
		}
		var newState = this.getStateFromValue(value);
		newState.isOpen = false;
		this.fireChangeEvent(newState);
		this.setState(newState);
	},

	selectValue: function(value) {
		if (!this.props.multi) {
			this.setValue(value);
		} else if (value) {
			this.addValue(value);
		}
		this._unbindCloseMenuIfClickedOutside();
	},

	addValue: function(value) {
		this.setValue(this.state.values.concat(value));
	},

	popValue: function() {
		this.setValue(this.state.values.slice(0, this.state.values.length - 1));
	},

	removeValue: function(valueToRemove) {
		this.setValue(this.state.values.filter(function(value) {
			return value !== valueToRemove;
		}));
	},

	clearValue: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		this.setValue(null);
	},

	resetValue: function() {
		this.setValue(this.state.value === '' ? null : this.state.value);
	},

	getInputNode: function () {
		var input = this.refs.input;
		return this.props.searchable ? input : input.getDOMNode();
	},

	fireChangeEvent: function(newState) {
		if (newState.value !== this.state.value && this.props.onChange) {
			this.props.onChange(newState.value, newState.values);
		}
	},

	handleMouseDown: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		event.stopPropagation();
		event.preventDefault();
		if (this.state.isFocused) {
			this.setState({
				isOpen: true
			}, this._bindCloseMenuIfClickedOutside);
		} else {
			this._openAfterFocus = true;
			this.getInputNode().focus();
		}
	},

	handleInputFocus: function(event) {
		var newIsOpen = this.state.isOpen || this._openAfterFocus;
		this.setState({
			isFocused: true,
			isOpen: newIsOpen
		}, function() {
			if(newIsOpen) {
				this._bindCloseMenuIfClickedOutside();
			}
			else {
				this._unbindCloseMenuIfClickedOutside();
			}
		});
		this._openAfterFocus = false;

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleInputBlur: function(event) {
		var self = this;

		this._blurTimeout = setTimeout(function() {
			if (self._focusAfterUpdate) return;

			self.setState({
				isFocused: false
			});
		}, 50);

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	},

	handleKeyDown: function(event) {
		if (this.state.disabled) return;

		switch (event.keyCode) {

			case 8: // backspace
				if (!this.state.inputValue) {
					this.popValue();
				}
			return;

			case 9: // tab
				if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
					return;
				}
				this.selectFocusedOption();
			break;

			case 13: // enter
				this.selectFocusedOption();
			break;

			case 27: // escape
				if (this.state.isOpen) {
					this.resetValue();
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

			case 188: // ,
				if (this.props.allowCreate) {
					event.preventDefault();
					event.stopPropagation();
					this.selectFocusedOption();
				};
			break;

			default: return;
		}

		event.preventDefault();
	},

	// Ensures that the currently focused option is available in filteredOptions.
	// If not, returns the first available option.
	_getNewFocusedOption: function(filteredOptions) {
		for (var key in filteredOptions) {
			if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
				return filteredOptions[key];
			}
		}
		return filteredOptions[0];
	},

	handleInputChange: function(event) {
		// assign an internal variable because we need to use
		// the latest value before setState() has completed.
		this._optionsFilterString = event.target.value;

		if (this.props.asyncOptions) {
			this.setState({
				isLoading: true,
				inputValue: event.target.value
			});
			this.loadAsyncOptions(event.target.value, {
				isLoading: false,
				isOpen: true
			}, this._bindCloseMenuIfClickedOutside);
		} else {
			var filteredOptions = this.filterOptions(this.state.options);
			this.setState({
				isOpen: true,
				inputValue: event.target.value,
				filteredOptions: filteredOptions,
				focusedOption: this._getNewFocusedOption(filteredOptions)
			}, this._bindCloseMenuIfClickedOutside);
		}
	},

	autoloadAsyncOptions: function() {
		var self = this;
		this.loadAsyncOptions('', {}, function () {
			// update with fetched but don't focus
			self.setValue(self.props.value, false);
		});
	},

	loadAsyncOptions: function(input, state, callback) {
		var thisRequestId = this._currentRequestId = requestId++;

		for (var i = 0; i <= input.length; i++) {
			var cacheKey = input.slice(0, i);
			if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
				var options = this._optionsCache[cacheKey].options;
				var filteredOptions = this.filterOptions(options);

				var newState = {
					options: options,
					filteredOptions: filteredOptions,
					focusedOption: this._getNewFocusedOption(filteredOptions)
				};
				for (var key in state) {
					if (state.hasOwnProperty(key)) {
						newState[key] = state[key];
					}
				}
				this.setState(newState);
				if(callback) callback({});
				return;
			}
		}

		var self = this;
		this.props.asyncOptions(input, function(err, data) {

			if (err) throw err;

			self._optionsCache[input] = data;

			if (thisRequestId !== self._currentRequestId) {
				return;
			}
			var filteredOptions = self.filterOptions(data.options);

			var newState = {
				options: data.options,
				filteredOptions: filteredOptions,
				focusedOption: self._getNewFocusedOption(filteredOptions)
			};
			for (var key in state) {
				if (state.hasOwnProperty(key)) {
					newState[key] = state[key];
				}
			}
			self.setState(newState);

			if(callback) callback({});

		});
	},

	filterOptions: function(options, values) {
		if (!this.props.searchable) {
			return options;
		}

		var filterValue = this._optionsFilterString;
		var exclude = (values || this.state.values).map(function(i) {
			return i.value;
		});
		if (this.props.filterOptions) {
			return this.props.filterOptions.call(this, options, filterValue, exclude);
		} else {
			var filterOption = function(op) {
				if (this.props.multi && exclude.indexOf(op.value) > -1) return false;
				if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
				var valueTest = String(op.value), labelTest = String(op.label);
				return !filterValue || (this.props.matchPos === 'start') ? (
					(this.props.matchProp !== 'label' && valueTest.toLowerCase().substr(0, filterValue.length) === filterValue) ||
					(this.props.matchProp !== 'value' && labelTest.toLowerCase().substr(0, filterValue.length) === filterValue)
				) : (
					(this.props.matchProp !== 'label' && valueTest.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) ||
					(this.props.matchProp !== 'value' && labelTest.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
				);
			};
			return (options || []).filter(filterOption, this);
		}
	},

	selectFocusedOption: function() {
		if (this.props.allowCreate && !this.state.focusedOption) {
			return this.selectValue(this.state.inputValue);
		};
		return this.selectValue(this.state.focusedOption);
	},

	focusOption: function(op) {
		this.setState({
			focusedOption: op
		});
	},

	focusNextOption: function() {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption: function() {
		this.focusAdjacentOption('previous');
	},

	focusAdjacentOption: function(dir) {
		this._focusedOptionReveal = true;

		var ops = this.state.filteredOptions;

		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
			}, this._bindCloseMenuIfClickedOutside);
			return;
		}

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

	unfocusOption: function(op) {
		if (this.state.focusedOption === op) {
			this.setState({
				focusedOption: null
			});
		}
	},

	buildMenu: function() {
		var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;

		if(this.state.filteredOptions.length > 0) {
			focusedValue = focusedValue == null ? this.state.filteredOptions[0] : focusedValue;
		}
		// Add the current value to the filtered options in last resort
		if (this.props.allowCreate && !this.state.filteredOptions.length) {
			var inputValue = this.state.inputValue;
			this.state.filteredOptions.push({
				value: inputValue,
				label: inputValue,
				create: true
			})
		};

		var ops = Object.keys(this.state.filteredOptions).map(function(key) {
			var op = this.state.filteredOptions[key];
			var isFocused = focusedValue === op.value;

			var optionClass = classes({
				'Select-option': true,
				'is-focused': isFocused,
				'is-disabled': op.disabled
			});

			var ref = isFocused ? 'focused' : null;

			var mouseEnter = this.focusOption.bind(this, op);
			var mouseLeave = this.unfocusOption.bind(this, op);
			var mouseDown = this.selectValue.bind(this, op);

			if (op.disabled) {
				return <div ref={ref} key={'option-' + op.value} className={optionClass}>{op.label}</div>;
			} else {
				return <div ref={ref} key={'option-' + op.value} className={optionClass} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseDown={mouseDown} onClick={mouseDown}>{ op.create ? "Add "+op.label+" ?" : op.label}</div>;
			}
		}, this);

		return ops.length ? ops : (
			<div className="Select-noresults">
				{this.props.asyncOptions && !this.state.inputValue ? this.props.searchPromptText : this.props.noResultsText}
			</div>
		);
	},

	handleOptionLabelClick: function (value, event) {
		var handler = this.props.onOptionLabelClick;

		if (handler) {
			handler(value, event);
		}
	},

	render: function() {
		var selectClass = classes('Select', this.props.className, {
			'is-multi': this.props.multi,
			'is-searchable': this.props.searchable,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'is-disabled': this.props.disabled,
			'has-value': this.state.value
		});

		var value = [];

		if (this.props.multi) {
			this.state.values.forEach(function(val) {
				var props = {
					key: val.value,
					optionLabelClick: !!this.props.onOptionLabelClick,
					onOptionLabelClick: this.handleOptionLabelClick.bind(this, val),
					onRemove: this.removeValue.bind(this, val)
				};
				for (var key in val) {
					if (val.hasOwnProperty(key)) {
						props[key] = val[key];
					}
				}
				value.push(<Value {...props} />);
			}, this);
		}

		if (this.props.disabled || (!this.state.inputValue && (!this.props.multi || !value.length))) {
			value.push(<div className="Select-placeholder" key="placeholder">{this.state.placeholder}</div>);
		}

		var loading = this.state.isLoading ? <span className="Select-loading" aria-hidden="true" /> : null;
		var clear = this.props.clearable && this.state.value && !this.props.disabled ? <span className="Select-clear" title={this.props.multi ? this.props.clearAllText : this.props.clearValueText} aria-label={this.props.multi ? this.props.clearAllText : this.props.clearValueText} onMouseDown={this.clearValue} onClick={this.clearValue} dangerouslySetInnerHTML={{ __html: '&times;' }} /> : null;

		var menu;
		var menuProps;
		if (this.state.isOpen) {
			menuProps = {
				ref: 'menu',
				className: 'Select-menu'
			};
			if (this.props.multi) {
				menuProps.onMouseDown = this.handleMouseDown;
			}
			menu = (
				<div ref="selectMenuContainer" className="Select-menu-outer">
					<div {...menuProps}>{this.buildMenu()}</div>
				</div>
			);
		}

		var input;
		var inputProps = {
			ref: 'input',
			className: 'Select-input',
			tabIndex: this.props.tabIndex || 0,
			onFocus: this.handleInputFocus,
			onBlur: this.handleInputBlur
		};
		for (var key in this.props.inputProps) {
			if (this.props.inputProps.hasOwnProperty(key)) {
				inputProps[key] = this.props.inputProps[key];
			}
		}

		if (this.props.searchable && !this.props.disabled) {
			input = <Input value={this.state.inputValue} onChange={this.handleInputChange} minWidth="5" {...inputProps} />;
		} else {
			input = <div {...inputProps}>&nbsp;</div>;
		}

		return (
			<div ref="wrapper" className={selectClass}>
				<input type="hidden" ref="value" name={this.props.name} value={this.state.value} disabled={this.props.disabled} />
				<div className="Select-control" ref="control" onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
					{value}
					{input}
					<span className="Select-arrow" />
					{loading}
					{clear}
				</div>
				{menu}
			</div>
		);
	}

});

module.exports = Select;
