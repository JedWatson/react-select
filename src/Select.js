var _ = require('underscore'),
	React = require('react'),
	Input = require('react-input-autosize'),
	classes = require('classnames'),
	Value = require('./Value');

var requestId = 0;

var Select = React.createClass({
	
	displayName: 'Select',

	propTypes: {
		value: React.PropTypes.any,             // initial field value
		multi: React.PropTypes.bool,            // multi-value input
		options: React.PropTypes.array,         // array of options
		delimiter: React.PropTypes.string,      // delimiter to use to join multiple values
		asyncOptions: React.PropTypes.func,     // function to call to get options
		autoload: React.PropTypes.bool,         // whether to auto-load the default async options set
		placeholder: React.PropTypes.string,    // field placeholder, displayed when there's no value
		name: React.PropTypes.string,           // field name, for hidden <input /> tag
		onChange: React.PropTypes.func,         // onChange handler: function(newValue) {}
		className: React.PropTypes.string,      // className for the outer element
		filterOption: React.PropTypes.func,     // method to filter a single option: function(option, filterString)
		filterOptions: React.PropTypes.func,    // method to filter the options array: function([options], filterString, [values])
		matchPos: React.PropTypes.string,       // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string       // (any|label|value) which option property to filter on
	},
	
	getDefaultProps: function() {
		return {
			value: undefined,
			options: [],
			delimiter: ',',
			asyncOptions: undefined,
			autoload: true,
			placeholder: '',
			name: undefined,
			onChange: undefined,
			className: undefined,
			matchPos: 'any',
			matchProp: 'any'
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
	},
	
	componentWillUnmount: function() {
		clearTimeout(this._blurTimeout);
		clearTimeout(this._focusTimeout);
	},
	
	componentWillReceiveProps: function(newProps) {
		if (newProps.value !== this.state.value) {
			this.setState(this.getStateFromValue(newProps.value));
		}
		if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
			this.setState({
				options: newProps.options,
				filteredOptions: this.filterOptions(newProps.options)
			});
		}
	},
	
	componentDidUpdate: function() {
		if (this._focusAfterUpdate) {
			clearTimeout(this._blurTimeout);
			this._focusTimeout = setTimeout(function() {
				this.refs.input.focus();
				this._focusAfterUpdate = false;
			}.bind(this), 50);
		}
	},
	
	initValuesArray: function(values) {
		
		if (!Array.isArray(values)) {
			if ('string' === typeof values) {
				values = values.split(this.props.delimiter);
			} else {
				values = values ? [values] : []
			}
		};
		
		return values.map(function(val) {
			return ('string' === typeof val) ? val = _.findWhere(this.state.options, { value: val }) || { value: val, label: val } : val;
		}.bind(this));
		
	},
	
	getStateFromValue: function(value) {
		
		// reset internal filter string
		this._optionsFilterString = '';
		
		var values = this.initValuesArray(value),
			filteredOptions = this.filterOptions(this.state.options, values);
		
		return {
			value: values.map(function(v) { return v.value }).join(this.props.delimiter),
			values: values,
			inputValue: '',
			filteredOptions: filteredOptions,
			placeholder: !this.props.multi && values.length ? values[0].label : this.props.placeholder || 'Select...',
			focusedOption: !this.props.multi && values.length ? values[0] : filteredOptions[0]
		};
		
	},
	
	setValue: function(value) {
		this._focusAfterUpdate = true;
		var newState = this.getStateFromValue(value);
		newState.isOpen = false;
		this.fireChangeEvent(newState);
		this.setState(newState);
	},
	
	selectValue: function(value) {
		this[this.props.multi ? 'addValue' : 'setValue'](value);
	},
	
	addValue: function(value) {
		this.setValue(this.state.values.concat(value));
	},
	
	popValue: function() {
		this.setValue(_.initial(this.state.values));
	},
	
	removeValue: function(value) {
		this.setValue(_.without(this.state.values, value));
	},
	
	clearValue: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type == 'mousedown' && event.button !== 0) {
			return;
		}
		this.setValue(null);
	},
	
	resetValue: function() {
		this.setValue(this.state.value);
	},
	
	fireChangeEvent: function(newState) {
		if (newState.value !== this.state.value && this.props.onChange) {
			this.props.onChange(newState.value, newState.values);
		}
	},
	
	handleMouseDown: function(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event.type == 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		if (this.state.isFocused) {
			this.setState({
				isOpen: true
			});
		} else {
			this._openAfterFocus = true;
			this.refs.input.focus();
		}
	},
	
	handleInputFocus: function() {
		this.setState({
			isFocused: true,
			isOpen: this.state.isOpen || this._openAfterFocus
		});
		this._openAfterFocus = false;
	},
	
	handleInputBlur: function(event) {
		this._blurTimeout = setTimeout(function() {
			if (this._focusAfterUpdate) return;
			this.setState({
				isOpen: false,
				isFocused: false
			});
		}.bind(this), 50);
	},
	
	handleKeyDown: function(event) {
		
		switch (event.keyCode) {
			
			case 8: // backspace
				if (!this.state.inputValue) {
					this.popValue();
				}
				return;
			break;
			
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
			
			default: return;
		}
		
		event.preventDefault();
		
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
			});
		} else {
			var filteredOptions = this.filterOptions(this.state.options);
			this.setState({
				isOpen: true,
				inputValue: event.target.value,
				filteredOptions: filteredOptions,
				focusedOption: _.contains(filteredOptions, this.state.focusedOption) ? this.state.focusedOption : filteredOptions[0]
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
				var options = this._optionsCache[cacheKey].options;
				this.setState(_.extend({
					options: options,
					filteredOptions: this.filterOptions(options)
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
				options: data.options,
				filteredOptions: this.filterOptions(data.options)
			}, state));
			
		}.bind(this));
		
	},
	
	filterOptions: function(options, values) {
		var filterValue = this._optionsFilterString;
		var exclude = (values || this.state.values).map(function(i) {
			return i.value;
		});
		if (this.props.filterOptions) {
			return this.props.filterOptions.call(this, options, filterValue, exclude);
		} else {
			var filterOption = function(op) {
				if (this.props.multi && _.contains(exclude, op.value)) return false;
				if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
				return !filterValue || (this.props.matchPos === 'start') ? (
					(this.props.matchProp !== 'label' && op.value.toLowerCase().substr(0, filterValue.length) === filterValue) ||
					(this.props.matchProp !== 'value' && op.label.toLowerCase().substr(0, filterValue.length) === filterValue)
				) : (
					(this.props.matchProp !== 'label' && op.value.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) ||
					(this.props.matchProp !== 'value' && op.label.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0)
				);
			}
			return _.filter(options, filterOption, this);
		}
	},
	
	selectFocusedOption: function() {
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
		
		var ops = this.state.filteredOptions;
		
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
			});
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
		
		var ops = _.map(this.state.filteredOptions, function(op) {
			
			var optionClass = classes({
				'Select-option': true,
				'is-focused': focusedValue === op.value
			});
			
			var mouseEnter = this.focusOption.bind(this, op),
				mouseLeave = this.unfocusOption.bind(this, op),
				mouseDown = this.selectValue.bind(this, op);
			
			return <div key={'option-' + op.value} className={optionClass} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseDown={mouseDown}>{op.label}</div>;
			
		}, this);
		
		return ops.length ? ops : <div className="Select-noresults">No results found</div>;
		
	},
	
	render: function() {
		
		var selectClass = classes('Select', this.props.className, {
			'is-multi': this.props.multi,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'has-value': this.state.value
		});
		
		var value = [];
		
		if (this.props.multi) {
			this.state.values.forEach(function(val) {
				props = _.extend({
					key: val.value,
					onRemove: this.removeValue.bind(this, val)
				}, val);
				value.push(<Value {...props} />);
			}, this);
		}
		
		if (!this.state.inputValue && (!this.props.multi || !value.length)) {
			value.push(<div className="Select-placeholder" key="placeholder">{this.state.placeholder}</div>);
		}
		
		var loading = this.state.isLoading ? <span className="Select-loading" aria-hidden="true" /> : null;
		var clear = this.state.value ? <span className="Select-clear" aria-label="Clear value" onMouseDown={this.clearValue} dangerouslySetInnerHTML={{ __html: '&times;' }} /> : null;
		var menu = this.state.isOpen ? <div className="Select-menu">{this.buildMenu()}</div> : null;
		
		return (
			<div ref="wrapper" className={selectClass}>
				<input type="hidden" ref="value" name={this.props.name} value={this.state.value} />
				<div className="Select-control" ref="control" onKeyDown={this.handleKeyDown} onMouseDown={this.handleMouseDown}>
					{value}
					<Input className="Select-input" tabIndex={this.props.tabIndex} ref="input" value={this.state.inputValue} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} onChange={this.handleInputChange} minWidth="5" />
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
