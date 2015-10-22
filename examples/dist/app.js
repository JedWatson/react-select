require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsCustomKeysField = require('./components/CustomKeysField');

var _componentsCustomKeysField2 = _interopRequireDefault(_componentsCustomKeysField);

var _componentsCustomRenderField = require('./components/CustomRenderField');

var _componentsCustomRenderField2 = _interopRequireDefault(_componentsCustomRenderField);

var _componentsDisabledUpsellOptions = require('./components/DisabledUpsellOptions');

var _componentsDisabledUpsellOptions2 = _interopRequireDefault(_componentsDisabledUpsellOptions);

var _componentsMultiSelectField = require('./components/MultiSelectField');

var _componentsMultiSelectField2 = _interopRequireDefault(_componentsMultiSelectField);

var _componentsRemoteSelectField = require('./components/RemoteSelectField');

var _componentsRemoteSelectField2 = _interopRequireDefault(_componentsRemoteSelectField);

var _componentsSelectedValuesField = require('./components/SelectedValuesField');

var _componentsSelectedValuesField2 = _interopRequireDefault(_componentsSelectedValuesField);

var _componentsStatesField = require('./components/StatesField');

var _componentsStatesField2 = _interopRequireDefault(_componentsStatesField);

var _componentsUsersField = require('./components/UsersField');

var _componentsUsersField2 = _interopRequireDefault(_componentsUsersField);

var _componentsValuesAsNumbersField = require('./components/ValuesAsNumbersField');

var _componentsValuesAsNumbersField2 = _interopRequireDefault(_componentsValuesAsNumbersField);

var _componentsCustomContainerField = require('./components/CustomContainerField');

var _componentsCustomContainerField2 = _interopRequireDefault(_componentsCustomContainerField);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];
var FLAVOURS_WITH_DISABLED_OPTION = FLAVOURS.slice(0);
FLAVOURS_WITH_DISABLED_OPTION.unshift({ label: 'Caramel (You don\'t like it, apparently)', value: 'caramel', disabled: true });

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsStatesField2['default'], { label: 'States', searchable: true }),
	_react2['default'].createElement(_componentsMultiSelectField2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement(_componentsUsersField2['default'], { label: 'Users (custom options/value)', hint: 'This example uses Gravatar to render user\'s image besides the value and the options' }),
	_react2['default'].createElement(_componentsValuesAsNumbersField2['default'], { label: 'Values as numbers' }),
	_react2['default'].createElement(_componentsCustomKeysField2['default'], { label: 'Custom object keys for options' }),
	_react2['default'].createElement(_componentsSelectedValuesField2['default'], { label: 'Clickable labels (labels as links)', options: FLAVOURS, hint: 'Open the console to see click behaviour (data/event)' }),
	_react2['default'].createElement(_componentsSelectedValuesField2['default'], { label: 'Disabled option', options: FLAVOURS_WITH_DISABLED_OPTION, hint: 'You savage! Caramel is the best...' }),
	_react2['default'].createElement(_componentsDisabledUpsellOptions2['default'], { label: 'Disabled option with a link' }),
	_react2['default'].createElement(_componentsSelectedValuesField2['default'], { label: 'Option Creation (tags mode)', options: FLAVOURS, allowCreate: true, hint: 'Enter a value that\'s NOT in the list, then hit return' }),
	_react2['default'].createElement(_componentsCustomRenderField2['default'], { label: 'Custom render options/values' }),
	_react2['default'].createElement(_componentsRemoteSelectField2['default'], { label: 'Remote Options', hint: 'Type anything in the remote example to asynchronously load options. Valid alternative results are "A", "AA", and "AB"' }),
	_react2['default'].createElement(_componentsCustomContainerField2['default'], { label: 'Custom Container' })
), document.getElementById('example'));

},{"./components/CustomContainerField":2,"./components/CustomKeysField":3,"./components/CustomRenderField":5,"./components/DisabledUpsellOptions":7,"./components/MultiSelectField":8,"./components/RemoteSelectField":9,"./components/SelectedValuesField":10,"./components/StatesField":11,"./components/UsersField":12,"./components/ValuesAsNumbersField":13,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:'
		};
	},
	getInitialState: function getInitialState() {
		return {
			selectValue: 'new-south-wales'
		};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue || null
		});
	},
	render: function render() {
		var ops = STATES['AU'];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(
				'div',
				{ className: 'scrollable-container' },
				_react2['default'].createElement(_reactSelect2['default'], { ref: 'select',
					options: ops,
					value: this.state.selectValue,
					onChange: this.updateValue,
					menuContainer: document.body }),
				_react2['default'].createElement(
					'p',
					{ className: 'hint' },
					'Hidden overflow',
					_react2['default'].createElement('br', null),
					'▼',
					_react2['default'].createElement('br', null),
					'▼',
					_react2['default'].createElement('br', null),
					'▼',
					_react2['default'].createElement('br', null),
					'▼'
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":14,"react":undefined,"react-select":undefined}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var CustomKeysField = _react2['default'].createClass({
	displayName: 'CustomKeysField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},

	getInitialState: function getInitialState() {
		return {
			options: [{ id: '1', name: 'One' }, { id: '2', name: 'Two' }, { id: '3', name: 'Three' }, { id: '4', name: 'Four' }],
			value: null,
			multi: false
		};
	},

	onChange: function onChange(value, values) {
		this.setState({
			value: value
		});
		logChange(value, values);
	},

	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},

	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				searchable: true,
				labelKey: 'name',
				valueKey: 'id',
				options: this.state.options,
				onChange: this.onChange,
				value: this.state.value,
				multi: this.state.multi
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				)
			)
		);
	}
});

module.exports = CustomKeysField;

},{"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var Option = _react2['default'].createClass({
	displayName: 'Option',

	propTypes: {
		addLabelText: _react2['default'].PropTypes.string,
		className: _react2['default'].PropTypes.string,
		mouseDown: _react2['default'].PropTypes.func,
		mouseEnter: _react2['default'].PropTypes.func,
		mouseLeave: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired,
		renderFunc: _react2['default'].PropTypes.func
	},
	render: function render() {
		var obj = this.props.option;
		var size = 15;
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseEnter: this.props.mouseEnter,
				onMouseLeave: this.props.mouseLeave,
				onMouseDown: this.props.mouseDown,
				onClick: this.props.mouseDown },
			_react2['default'].createElement(_reactGravatar2['default'], { email: obj.email, size: size, style: gravatarStyle }),
			obj.value
		);
	}
});

module.exports = Option;

},{"react":undefined,"react-gravatar":19}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var CustomRenderField = _react2['default'].createClass({
	displayName: 'CustomRenderField',
	propTypes: {
		delimiter: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string,
		multi: _react2['default'].PropTypes.bool
	},
	getInitialState: function getInitialState() {
		return {};
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			{ style: { color: option.hex } },
			option.label,
			' (',
			option.hex,
			')'
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.hex } },
			option.label
		);
	},
	render: function render() {
		var ops = [{ label: 'Red', value: 'red', hex: '#EC6230' }, { label: 'Green', value: 'green', hex: '#4ED84E' }, { label: 'Blue', value: 'blue', hex: '#6D97E2' }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				delimiter: this.props.delimiter,
				multi: this.state.multi,
				allowCreate: true,
				placeholder: 'Select your favourite',
				options: ops,
				optionRenderer: this.renderOption,
				valueRenderer: this.renderValue,
				onChange: logChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				)
			)
		);
	}
});

module.exports = CustomRenderField;

},{"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var SingleValue = _react2['default'].createClass({
	displayName: 'SingleValue',

	propTypes: {
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
		var obj = this.props.value;
		var size = 15;
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};

		return _react2['default'].createElement(
			'div',
			{ className: 'Select-placeholder' },
			obj ? _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(_reactGravatar2['default'], { email: obj.email, size: size, style: gravatarStyle }),
				obj.value
			) : this.props.placeholder
		);
	}
});

module.exports = SingleValue;

},{"react":undefined,"react-gravatar":19}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	onLabelClick: function onLabelClick(data, event) {
		console.log(data, event);
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			null,
			option.label,
			' ',
			option.link,
			' '
		);
	},
	render: function render() {
		var ops = [{ label: 'Basic customer support', value: 'basic' }, { label: 'Premium customer support', value: 'premium' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onOptionLabelClick: this.onLabelClick,
				placeholder: 'Select your support level',
				options: ops,
				optionRenderer: this.renderOption,
				onChange: logChange })
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value, values) {
		logChange('New value:', value, 'Values:', values);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ 'disabled': e.target.checked });
	},
	render: function render() {
		var ops = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: ops, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var RemoteSelectField = _react2['default'].createClass({
	displayName: 'RemoteSelectField',
	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	loadOptions: function loadOptions(input, callback) {
		input = input.toLowerCase();
		var rtn = {
			options: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }, { label: 'Three', value: 'three' }],
			complete: true
		};
		if (input.slice(0, 1) === 'a') {
			if (input.slice(0, 2) === 'ab') {
				rtn = {
					options: [{ label: 'AB', value: 'ab' }, { label: 'ABC', value: 'abc' }, { label: 'ABCD', value: 'abcd' }],
					complete: true
				};
			} else {
				rtn = {
					options: [{ label: 'A', value: 'a' }, { label: 'AA', value: 'aa' }, { label: 'AB', value: 'ab' }],
					complete: false
				};
			}
		} else if (!input.length) {
			rtn.complete = false;
		}

		setTimeout(function () {
			callback(null, rtn);
		}, 500);
	},
	renderHint: function renderHint() {
		if (!this.props.hint) return null;
		return _react2['default'].createElement(
			'div',
			{ className: 'hint' },
			this.props.hint
		);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { asyncOptions: this.loadOptions, className: 'remote-example' }),
			this.renderHint()
		);
	}
});

module.exports = RemoteSelectField;

},{"react":undefined,"react-select":undefined}],10:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var SelectedValuesField = _react2['default'].createClass({
	displayName: 'SelectedValuesField',
	propTypes: {
		allowCreate: _react2['default'].PropTypes.bool,
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string,
		options: _react2['default'].PropTypes.array
	},
	onLabelClick: function onLabelClick(data, event) {
		console.log(data, event);
	},
	renderHint: function renderHint() {
		if (!this.props.hint) return null;
		return _react2['default'].createElement(
			'div',
			{ className: 'hint' },
			this.props.hint
		);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				allowCreate: this.props.allowCreate,
				onOptionLabelClick: this.onLabelClick,
				value: this.props.options.slice(1, 3),
				multi: true,
				placeholder: 'Select your favourite(s)',
				options: this.props.options,
				onChange: logChange }),
			this.renderHint()
		);
	}
});

module.exports = SelectedValuesField;

},{"react":undefined,"react-select":undefined}],11:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');
var id = 0;

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			id: ++id,
			selectValue: 'new-south-wales'
		};
	},
	switchCountry: function switchCountry(e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		logChange('State changed to ' + newValue);
		this.setState({
			selectValue: newValue || null
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox: function toggleCheckbox(e) {
		var newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render: function render() {
		var ops = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', options: ops, disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
			_react2['default'].createElement(
				'div',
				{ style: { marginTop: 14 } },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: this.focusStateSelect },
					'Focus Select'
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'searchable', checked: this.state.searchable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Searchable'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'disabled', checked: this.state.disabled, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'AU', value: 'AU', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Australia'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'US', value: 'US', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'United States'
					)
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":14,"react":undefined,"react-select":undefined}],12:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CustomOption = require('./CustomOption');

var _CustomOption2 = _interopRequireDefault(_CustomOption);

var _CustomSingleValue = require('./CustomSingleValue');

var _CustomSingleValue2 = _interopRequireDefault(_CustomSingleValue);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var USERS = require('../data/users');

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	renderHint: function renderHint() {
		if (!this.props.hint) return null;
		return _react2['default'].createElement(
			'div',
			{ className: 'hint' },
			this.props.hint
		);
	},
	render: function render() {

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onOptionLabelClick: this.onLabelClick,
				placeholder: 'Select user',
				optionComponent: _CustomOption2['default'],
				singleValueComponent: _CustomSingleValue2['default'],
				options: USERS.users }),
			this.renderHint()
		);
	}
});

module.exports = UsersField;

},{"../data/users":15,"./CustomOption":4,"./CustomSingleValue":6,"react":undefined,"react-select":undefined}],13:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function logChange() {
	console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var ValuesAsNumbersField = _react2['default'].createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},

	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},

	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},

	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},

	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},

	onChange: function onChange(value, values) {
		this.setState({
			value: value
		});
		logChange(value, values);
	},

	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},

	render: function render() {

		var matchProp = 'any';

		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}

		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				searchable: true,
				matchProp: matchProp,
				matchPos: this.state.matchPos,
				options: this.state.options,
				onChange: this.onChange,
				value: this.state.value,
				multi: this.state.multi
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],14:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory' }, { value: 'new-south-wales', label: 'New South Wales' }, { value: 'victoria', label: 'Victoria' }, { value: 'queensland', label: 'Queensland' }, { value: 'western-australia', label: 'Western Australia' }, { value: 'south-australia', label: 'South Australia' }, { value: 'tasmania', label: 'Tasmania' }, { value: 'northern-territory', label: 'Northern Territory' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],15:[function(require,module,exports){
'use strict';

exports.users = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],16:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],17:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],18:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":16,"./encode":17}],19:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
var React, isRetina, md5, querystring;

React = require('react');

md5 = require('md5');

querystring = require('querystring');

isRetina = require('is-retina');

module.exports = React.createClass({
  displayName: 'Gravatar',
  propTypes: {
    email: React.PropTypes.string,
    md5: React.PropTypes.string,
    size: React.PropTypes.number,
    rating: React.PropTypes.string,
    https: React.PropTypes.bool,
    "default": React.PropTypes.string,
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      size: 50,
      rating: 'g',
      https: false,
      "default": "retro",
      className: ""
    };
  },
  render: function() {
    var base, hash, query, src;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: isRetina() ? this.props.size * 2 : this.props.size,
      r: this.props.rating,
      d: this.props["default"]
    });
    if (this.props.md5) {
      hash = this.props.md5;
    } else if (this.props.email) {
      hash = md5(this.props.email);
    } else {
      console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
      return React.createElement("script", null);
    }
    src = base + hash + "?" + query;
    return React.createElement("img", React.__spread({}, this.props, {
      "className": "react-gravatar " + this.props.className,
      "src": src,
      "height": this.props.size,
      "width": this.props.size
    }));
  }
});

},{"is-retina":20,"md5":21,"querystring":18,"react":undefined}],20:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],21:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":22,"crypt":23,"is-buffer":24}],22:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],23:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],24:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(
    obj != null &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25lb3ppcm8vcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvVXNlcnMvbmVvemlyby9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29udGFpbmVyRmllbGQuanMiLCIvVXNlcnMvbmVvemlyby9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tS2V5c0ZpZWxkLmpzIiwiL1VzZXJzL25lb3ppcm8vcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0N1c3RvbU9wdGlvbi5qcyIsIi9Vc2Vycy9uZW96aXJvL3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21SZW5kZXJGaWVsZC5qcyIsIi9Vc2Vycy9uZW96aXJvL3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21TaW5nbGVWYWx1ZS5qcyIsIi9Vc2Vycy9uZW96aXJvL3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9EaXNhYmxlZFVwc2VsbE9wdGlvbnMuanMiLCIvVXNlcnMvbmVvemlyby9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTXVsdGlTZWxlY3RGaWVsZC5qcyIsIi9Vc2Vycy9uZW96aXJvL3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9SZW1vdGVTZWxlY3RGaWVsZC5qcyIsIi9Vc2Vycy9uZW96aXJvL3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9TZWxlY3RlZFZhbHVlc0ZpZWxkLmpzIiwiL1VzZXJzL25lb3ppcm8vcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL1N0YXRlc0ZpZWxkLmpzIiwiL1VzZXJzL25lb3ppcm8vcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL1VzZXJzRmllbGQuanMiLCIvVXNlcnMvbmVvemlyby9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvVmFsdWVzQXNOdW1iZXJzRmllbGQuanMiLCIvVXNlcnMvbmVvemlyby9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvc3RhdGVzLmpzIiwiL1VzZXJzL25lb3ppcm8vcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL3VzZXJzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWNvbXBvbmVudC1ndWxwLXRhc2tzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtZ3JhdmF0YXIvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvaXMtcmV0aW5hL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL25vZGVfbW9kdWxlcy9tZDUvbWQ1LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL25vZGVfbW9kdWxlcy9tZDUvbm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvbWQ1L25vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9ub2RlX21vZHVsZXMvbWQ1L25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDYixjQUFjOzs7O3lDQUVMLDhCQUE4Qjs7OzsyQ0FDNUIsZ0NBQWdDOzs7OytDQUM1QixvQ0FBb0M7Ozs7MENBQ3pDLCtCQUErQjs7OzsyQ0FDOUIsZ0NBQWdDOzs7OzZDQUM5QixrQ0FBa0M7Ozs7cUNBQzFDLDBCQUEwQjs7OztvQ0FDM0IseUJBQXlCOzs7OzhDQUNmLG1DQUFtQzs7Ozs4Q0FDbkMsbUNBQW1DOzs7O0FBRXBFLElBQUksUUFBUSxHQUFHLENBQ2QsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDMUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDdEMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDNUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUNyRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUM1QyxDQUFDO0FBQ0YsSUFBSSw2QkFBNkIsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSwwQ0FBMEMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFB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SSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUMxQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUN2QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUNuQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUNy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QUFDOzs7QUNKRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgQ3VzdG9tS2V5c0ZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21LZXlzRmllbGQnO1xuaW1wb3J0IEN1c3RvbVJlbmRlckZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21SZW5kZXJGaWVsZCc7XG5pbXBvcnQgRGlzYWJsZWRVcHNlbGxPcHRpb25zIGZyb20gJy4vY29tcG9uZW50cy9EaXNhYmxlZFVwc2VsbE9wdGlvbnMnO1xuaW1wb3J0IE11bHRpU2VsZWN0RmllbGQgZnJvbSAnLi9jb21wb25lbnRzL011bHRpU2VsZWN0RmllbGQnO1xuaW1wb3J0IFJlbW90ZVNlbGVjdEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9SZW1vdGVTZWxlY3RGaWVsZCc7XG5pbXBvcnQgU2VsZWN0ZWRWYWx1ZXNGaWVsZCBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0ZWRWYWx1ZXNGaWVsZCc7XG5pbXBvcnQgU3RhdGVzRmllbGQgZnJvbSAnLi9jb21wb25lbnRzL1N0YXRlc0ZpZWxkJztcbmltcG9ydCBVc2Vyc0ZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9Vc2Vyc0ZpZWxkJztcbmltcG9ydCBWYWx1ZXNBc051bWJlcnNGaWVsZCBmcm9tICcuL2NvbXBvbmVudHMvVmFsdWVzQXNOdW1iZXJzRmllbGQnO1xuaW1wb3J0IEN1c3RvbUNvbnRhaW5lckZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21Db250YWluZXJGaWVsZCc7XG5cbnZhciBGTEFWT1VSUyA9IFtcblx0eyBsYWJlbDogJ0Nob2NvbGF0ZScsIHZhbHVlOiAnY2hvY29sYXRlJyB9LFxuXHR7IGxhYmVsOiAnVmFuaWxsYScsIHZhbHVlOiAndmFuaWxsYScgfSxcblx0eyBsYWJlbDogJ1N0cmF3YmVycnknLCB2YWx1ZTogJ3N0cmF3YmVycnknIH0sXG5cdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHR7IGxhYmVsOiAnUGVwcGVybWludCcsIHZhbHVlOiAncGVwcGVybWludCcgfVxuXTtcbnZhciBGTEFWT1VSU19XSVRIX0RJU0FCTEVEX09QVElPTiA9IEZMQVZPVVJTLnNsaWNlKDApO1xuRkxBVk9VUlNfV0lUSF9ESVNBQkxFRF9PUFRJT04udW5zaGlmdCh7IGxhYmVsOiAnQ2FyYW1lbCAoWW91IGRvblxcJ3QgbGlrZSBpdCwgYXBwYXJlbnRseSknLCB2YWx1ZTogJ2NhcmFtZWwnLCBkaXNhYmxlZDogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gbG9nQ2hhbmdlKCkge1xuXHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBbXS5jb25jYXQoWydTZWxlY3QgdmFsdWUgY2hhbmdlZDonXSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFyZ3VtZW50cykpKTtcbn1cblxuUmVhY3RET00ucmVuZGVyKFxuXHQ8ZGl2PlxuXHRcdDxTdGF0ZXNGaWVsZCBsYWJlbD1cIlN0YXRlc1wiIHNlYXJjaGFibGUgLz5cblx0XHQ8TXVsdGlTZWxlY3RGaWVsZCBsYWJlbD1cIk11bHRpc2VsZWN0XCIvPlxuXHRcdDxVc2Vyc0ZpZWxkIGxhYmVsPVwiVXNlcnMgKGN1c3RvbSBvcHRpb25zL3ZhbHVlKVwiIGhpbnQ9XCJUaGlzIGV4YW1wbGUgdXNlcyBHcmF2YXRhciB0byByZW5kZXIgdXNlcidzIGltYWdlIGJlc2lkZXMgdGhlIHZhbHVlIGFuZCB0aGUgb3B0aW9uc1wiIC8+XG5cdFx0PFZhbHVlc0FzTnVtYmVyc0ZpZWxkIGxhYmVsPVwiVmFsdWVzIGFzIG51bWJlcnNcIiAvPlxuXHRcdDxDdXN0b21LZXlzRmllbGQgbGFiZWw9XCJDdXN0b20gb2JqZWN0IGtleXMgZm9yIG9wdGlvbnNcIiAvPlxuXHRcdDxTZWxlY3RlZFZhbHVlc0ZpZWxkIGxhYmVsPVwiQ2xpY2thYmxlIGxhYmVscyAobGFiZWxzIGFzIGxpbmtzKVwiIG9wdGlvbnM9e0ZMQVZPVVJTfSBoaW50PVwiT3BlbiB0aGUgY29uc29sZSB0byBzZWUgY2xpY2sgYmVoYXZpb3VyIChkYXRhL2V2ZW50KVwiIC8+XG5cdFx0PFNlbGVjdGVkVmFsdWVzRmllbGQgbGFiZWw9XCJEaXNhYmxlZCBvcHRpb25cIiBvcHRpb25zPXtGTEFWT1VSU19XSVRIX0RJU0FCTEVEX09QVElPTn0gaGludD1cIllvdSBzYXZhZ2UhIENhcmFtZWwgaXMgdGhlIGJlc3QuLi5cIiAvPlxuXHRcdDxEaXNhYmxlZFVwc2VsbE9wdGlvbnMgbGFiZWw9XCJEaXNhYmxlZCBvcHRpb24gd2l0aCBhIGxpbmtcIi8+XG5cdFx0PFNlbGVjdGVkVmFsdWVzRmllbGQgbGFiZWw9XCJPcHRpb24gQ3JlYXRpb24gKHRhZ3MgbW9kZSlcIiBvcHRpb25zPXtGTEFWT1VSU30gYWxsb3dDcmVhdGUgaGludD1cIkVudGVyIGEgdmFsdWUgdGhhdCdzIE5PVCBpbiB0aGUgbGlzdCwgdGhlbiBoaXQgcmV0dXJuXCIgLz5cblx0XHQ8Q3VzdG9tUmVuZGVyRmllbGQgbGFiZWw9XCJDdXN0b20gcmVuZGVyIG9wdGlvbnMvdmFsdWVzXCIgLz5cblx0XHQ8UmVtb3RlU2VsZWN0RmllbGQgbGFiZWw9XCJSZW1vdGUgT3B0aW9uc1wiIGhpbnQ9J1R5cGUgYW55dGhpbmcgaW4gdGhlIHJlbW90ZSBleGFtcGxlIHRvIGFzeW5jaHJvbm91c2x5IGxvYWQgb3B0aW9ucy4gVmFsaWQgYWx0ZXJuYXRpdmUgcmVzdWx0cyBhcmUgXCJBXCIsIFwiQUFcIiwgYW5kIFwiQUJcIicgLz5cblx0XHQ8Q3VzdG9tQ29udGFpbmVyRmllbGQgbGFiZWw9XCJDdXN0b20gQ29udGFpbmVyXCIvPlxuXHQ8L2Rpdj4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBTVEFURVMgPSByZXF1aXJlKCcuLi9kYXRhL3N0YXRlcycpO1xuXG5jb25zdCBTdGF0ZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdTdGF0ZXNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlYXJjaGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbDogJ1N0YXRlczonXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuICAgICAgc2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnXG4gICAgfTtcblx0fSxcblx0dXBkYXRlVmFsdWUgKG5ld1ZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWUgfHwgbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IG9wcyA9IFNUQVRFU1snQVUnXTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjcm9sbGFibGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdCAgICA8U2VsZWN0IHJlZj1cInNlbGVjdFwiXG4gICAgICAgICAgICAgIG9wdGlvbnM9e29wc31cbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfVxuICAgICAgICAgICAgICBtZW51Q29udGFpbmVyPXtkb2N1bWVudC5ib2R5fSAvPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJoaW50XCI+SGlkZGVuIG92ZXJmbG93PGJyLz7ilrw8YnIvPuKWvDxici8+4pa8PGJyLz7ilrw8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZXNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGxvZ0NoYW5nZSgpIHtcblx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgW10uY29uY2F0KFsnU2VsZWN0IHZhbHVlIGNoYW5nZWQ6J10sIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcmd1bWVudHMpKSk7XG59XG5cbnZhciBDdXN0b21LZXlzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ3VzdG9tS2V5c0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgaWQ6ICcxJywgbmFtZTogJ09uZScgfSxcblx0XHRcdFx0eyBpZDogJzInLCBuYW1lOiAnVHdvJyB9LFxuXHRcdFx0XHR7IGlkOiAnMycsIG5hbWU6ICdUaHJlZScgfSxcblx0XHRcdFx0eyBpZDogJzQnLCBuYW1lOiAnRm91cicgfVxuXHRcdFx0XSxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdFx0bXVsdGk6IGZhbHNlXG5cdFx0fTtcblx0fSxcblxuXHRvbkNoYW5nZSh2YWx1ZSwgdmFsdWVzKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9KTtcblx0XHRsb2dDaGFuZ2UodmFsdWUsIHZhbHVlcyk7XG5cdH0sXG5cblx0b25DaGFuZ2VNdWx0aShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0c2VhcmNoYWJsZVxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJpZFwiXG5cdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm11bHRpfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU11bHRpfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aS1TZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDdXN0b21LZXlzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdyYXZhdGFyIGZyb20gJ3JlYWN0LWdyYXZhdGFyJztcblxudmFyIE9wdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0YWRkTGFiZWxUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb3VzZURvd246IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG1vdXNlRW50ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG1vdXNlTGVhdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9wdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdHJlbmRlckZ1bmM6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG9iaiA9IHRoaXMucHJvcHMub3B0aW9uO1xuXHRcdHZhciBzaXplID0gMTU7XG5cdFx0dmFyIGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0b25Nb3VzZUVudGVyPXt0aGlzLnByb3BzLm1vdXNlRW50ZXJ9XG5cdFx0XHRcdG9uTW91c2VMZWF2ZT17dGhpcy5wcm9wcy5tb3VzZUxlYXZlfVxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5wcm9wcy5tb3VzZURvd259XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMubW91c2VEb3dufT5cblx0XHRcdFx0PEdyYXZhdGFyIGVtYWlsPXtvYmouZW1haWx9IHNpemU9e3NpemV9IHN0eWxlPXtncmF2YXRhclN0eWxlfSAvPlxuXHRcdFx0XHR7b2JqLnZhbHVlfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuZnVuY3Rpb24gbG9nQ2hhbmdlKCkge1xuXHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBbXS5jb25jYXQoWydTZWxlY3QgdmFsdWUgY2hhbmdlZDonXSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFyZ3VtZW50cykpKTtcbn1cblxudmFyIEN1c3RvbVJlbmRlckZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0N1c3RvbVJlbmRlckZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0ZGVsaW1pdGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG11bHRpOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdG9uQ2hhbmdlTXVsdGkoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXJPcHRpb24gKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3BhbiBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmhleCB9fT57b3B0aW9uLmxhYmVsfSAoe29wdGlvbi5oZXh9KTwvc3Bhbj47XG5cblx0fSxcblx0cmVuZGVyVmFsdWUgKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3Ryb25nIHN0eWxlPXt7IGNvbG9yOiBvcHRpb24uaGV4IH19PntvcHRpb24ubGFiZWx9PC9zdHJvbmc+O1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHMgPSBbXG5cdFx0XHR7IGxhYmVsOiAnUmVkJywgdmFsdWU6ICdyZWQnLCBoZXg6ICcjRUM2MjMwJyB9LFxuXHRcdFx0eyBsYWJlbDogJ0dyZWVuJywgdmFsdWU6ICdncmVlbicsIGhleDogJyM0RUQ4NEUnIH0sXG5cdFx0XHR7IGxhYmVsOiAnQmx1ZScsIHZhbHVlOiAnYmx1ZScsIGhleDogJyM2RDk3RTInIH1cblx0XHRdO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRkZWxpbWl0ZXI9e3RoaXMucHJvcHMuZGVsaW1pdGVyfVxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfVxuXHRcdFx0XHRcdGFsbG93Q3JlYXRlXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBmYXZvdXJpdGVcIlxuXHRcdFx0XHRcdG9wdGlvbnM9e29wc31cblx0XHRcdFx0XHRvcHRpb25SZW5kZXJlcj17dGhpcy5yZW5kZXJPcHRpb259XG5cdFx0XHRcdFx0dmFsdWVSZW5kZXJlcj17dGhpcy5yZW5kZXJWYWx1ZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17bG9nQ2hhbmdlfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNdWx0aX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGktU2VsZWN0PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tUmVuZGVyRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEdyYXZhdGFyIGZyb20gJ3JlYWN0LWdyYXZhdGFyJztcblxudmFyIFNpbmdsZVZhbHVlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvYmogPSB0aGlzLnByb3BzLnZhbHVlO1xuXHRcdHZhciBzaXplID0gMTU7XG5cdFx0dmFyIGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXBsYWNlaG9sZGVyXCI+XG5cdFx0XHRcdHtvYmogPyAoXG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxHcmF2YXRhciBlbWFpbD17b2JqLmVtYWlsfSBzaXplPXtzaXplfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0XHRcdHtvYmoudmFsdWV9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdCkgOiAoXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0PC9kaXY+XG5cdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZVZhbHVlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuZnVuY3Rpb24gbG9nQ2hhbmdlKCkge1xuXHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBbXS5jb25jYXQoWydTZWxlY3QgdmFsdWUgY2hhbmdlZDonXSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFyZ3VtZW50cykpKTtcbn1cblxudmFyIERpc2FibGVkVXBzZWxsT3B0aW9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdEaXNhYmxlZFVwc2VsbE9wdGlvbnMnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0b25MYWJlbENsaWNrOiBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcblx0XHRjb25zb2xlLmxvZyhkYXRhLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlckxpbms6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiA8YSBzdHlsZT17eyBtYXJnaW5MZWZ0OiA1IH19IGhyZWY9XCIvdXBncmFkZVwiIHRhcmdldD1cIl9ibGFua1wiPlVwZ3JhZGUgaGVyZSE8L2E+O1xuXHR9LFxuXHRyZW5kZXJPcHRpb246IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3Bhbj57b3B0aW9uLmxhYmVsfSB7b3B0aW9uLmxpbmt9IDwvc3Bhbj47XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdCYXNpYyBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdiYXNpYycgfSxcblx0XHRcdHsgbGFiZWw6ICdQcmVtaXVtIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3ByZW1pdW0nIH0sXG5cdFx0XHR7IGxhYmVsOiAnUHJvIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ3BybycsIGRpc2FibGVkOiB0cnVlLCBsaW5rOiB0aGlzLnJlbmRlckxpbmsoKSB9LFxuXHRcdF07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdG9uT3B0aW9uTGFiZWxDbGljaz17dGhpcy5vbkxhYmVsQ2xpY2t9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBzdXBwb3J0IGxldmVsXCJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHN9XG5cdFx0XHRcdFx0b3B0aW9uUmVuZGVyZXI9e3RoaXMucmVuZGVyT3B0aW9ufVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXtsb2dDaGFuZ2V9IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGlzYWJsZWRVcHNlbGxPcHRpb25zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuZnVuY3Rpb24gbG9nQ2hhbmdlKCkge1xuXHRjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBbXS5jb25jYXQoWydTZWxlY3QgdmFsdWUgY2hhbmdlZDonXSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFyZ3VtZW50cykpKTtcbn1cblxudmFyIE11bHRpU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnTXVsdGlTZWxlY3RGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHR2YWx1ZTogW11cblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RDaGFuZ2UgKHZhbHVlLCB2YWx1ZXMpIHtcblx0XHRsb2dDaGFuZ2UoJ05ldyB2YWx1ZTonLCB2YWx1ZSwgJ1ZhbHVlczonLCB2YWx1ZXMpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUgfSk7XG5cdH0sXG5cdHRvZ2dsZURpc2FibGVkIChlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7ICdkaXNhYmxlZCc6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG9wcyA9IFtcblx0XHRcdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0XHRcdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1N0cmF3YmVycnknLCB2YWx1ZTogJ3N0cmF3YmVycnknIH0sXG5cdFx0XHR7IGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcblx0XHRcdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1BlcHBlcm1pbnQnLCB2YWx1ZTogJ3BlcHBlcm1pbnQnIH1cblx0XHRdO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgbXVsdGkgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlbGVjdCB5b3VyIGZhdm91cml0ZShzKVwiIG9wdGlvbnM9e29wc30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0Q2hhbmdlfSAvPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVEaXNhYmxlZH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+RGlzYWJsZWQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aVNlbGVjdEZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIFJlbW90ZVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1JlbW90ZVNlbGVjdEZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0aGludDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0bG9hZE9wdGlvbnMgKGlucHV0LCBjYWxsYmFjaykge1xuXHRcdGlucHV0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcblx0XHR2YXIgcnRuID0ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IGxhYmVsOiAnT25lJywgdmFsdWU6ICdvbmUnIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdUd28nLCB2YWx1ZTogJ3R3bycgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1RocmVlJywgdmFsdWU6ICd0aHJlZScgfVxuXHRcdFx0XSxcblx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoaW5wdXQuc2xpY2UoMCwgMSkgPT09ICdhJykge1xuXHRcdFx0aWYgKGlucHV0LnNsaWNlKDAsIDIpID09PSAnYWInKSB7XG5cdFx0XHRcdHJ0biA9IHtcblx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQycsIHZhbHVlOiAnYWJjJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCQ0QnLCB2YWx1ZTogJ2FiY2QnIH1cblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRydG4gPSB7XG5cdFx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0EnLCB2YWx1ZTogJ2EnIH0sXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUEnLCB2YWx1ZTogJ2FhJyB9LFxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0FCJywgdmFsdWU6ICdhYicgfVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW5wdXQubGVuZ3RoKSB7XG5cdFx0XHRydG4uY29tcGxldGUgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgcnRuKTtcblx0XHR9LCA1MDApO1xuXHR9LFxuXHRyZW5kZXJIaW50ICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaGludCkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPnt0aGlzLnByb3BzLmhpbnR9PC9kaXY+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0IGFzeW5jT3B0aW9ucz17dGhpcy5sb2FkT3B0aW9uc30gY2xhc3NOYW1lPVwicmVtb3RlLWV4YW1wbGVcIiAvPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIaW50KCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZW1vdGVTZWxlY3RGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmZ1bmN0aW9uIGxvZ0NoYW5nZSgpIHtcblx0Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgW10uY29uY2F0KFsnU2VsZWN0IHZhbHVlIGNoYW5nZWQ6J10sIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcmd1bWVudHMpKSk7XG59XG5cbnZhciBTZWxlY3RlZFZhbHVlc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1NlbGVjdGVkVmFsdWVzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRhbGxvd0NyZWF0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aGludDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdH0sXG5cdG9uTGFiZWxDbGljayAoZGF0YSwgZXZlbnQpIHtcblx0XHRjb25zb2xlLmxvZyhkYXRhLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlckhpbnQgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5oaW50KSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+e3RoaXMucHJvcHMuaGludH08L2Rpdj5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRhbGxvd0NyZWF0ZT17dGhpcy5wcm9wcy5hbGxvd0NyZWF0ZX1cblx0XHRcdFx0XHRvbk9wdGlvbkxhYmVsQ2xpY2s9e3RoaXMub25MYWJlbENsaWNrfVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLm9wdGlvbnMuc2xpY2UoMSwzKX1cblx0XHRcdFx0XHRtdWx0aVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgZmF2b3VyaXRlKHMpXCJcblx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e2xvZ0NoYW5nZX0gLz5cblx0XHRcdFx0e3RoaXMucmVuZGVySGludCgpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0ZWRWYWx1ZXNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IFNUQVRFUyA9IHJlcXVpcmUoJy4uL2RhdGEvc3RhdGVzJyk7XG52YXIgaWQgPSAwO1xuXG5mdW5jdGlvbiBsb2dDaGFuZ2UoKSB7XG5cdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIFtdLmNvbmNhdChbJ1NlbGVjdCB2YWx1ZSBjaGFuZ2VkOiddLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJndW1lbnRzKSkpO1xufVxuXG52YXIgU3RhdGVzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnU3RhdGVzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFiZWw6ICdTdGF0ZXM6Jyxcblx0XHRcdHNlYXJjaGFibGU6IHRydWUsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y291bnRyeTogJ0FVJyxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdHNlYXJjaGFibGU6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdGlkOiArK2lkLFxuXHRcdFx0c2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnXG5cdFx0fTtcblx0fSxcblx0c3dpdGNoQ291bnRyeSAoZSkge1xuXHRcdHZhciBuZXdDb3VudHJ5ID0gZS50YXJnZXQudmFsdWU7XG5cdFx0Y29uc29sZS5sb2coJ0NvdW50cnkgY2hhbmdlZCB0byAnICsgbmV3Q291bnRyeSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjb3VudHJ5OiBuZXdDb3VudHJ5LFxuXHRcdFx0c2VsZWN0VmFsdWU6IG51bGxcblx0XHR9KTtcblx0fSxcblx0dXBkYXRlVmFsdWUgKG5ld1ZhbHVlKSB7XG5cdFx0bG9nQ2hhbmdlKCdTdGF0ZSBjaGFuZ2VkIHRvICcgKyBuZXdWYWx1ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWUgfHwgbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHRmb2N1c1N0YXRlU2VsZWN0ICgpIHtcblx0XHR0aGlzLnJlZnMuc3RhdGVTZWxlY3QuZm9jdXMoKTtcblx0fSxcblx0dG9nZ2xlQ2hlY2tib3ggKGUpIHtcblx0XHRsZXQgbmV3U3RhdGUgPSB7fTtcblx0XHRuZXdTdGF0ZVtlLnRhcmdldC5uYW1lXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG9wcyA9IFNUQVRFU1t0aGlzLnN0YXRlLmNvdW50cnldO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgcmVmPVwic3RhdGVTZWxlY3RcIiBvcHRpb25zPXtvcHN9IGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9IHNlYXJjaGFibGU9e3RoaXMuc3RhdGUuc2VhcmNoYWJsZX0gLz5cblxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogMTQgfX0+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5mb2N1c1N0YXRlU2VsZWN0fT5Gb2N1cyBTZWxlY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fT5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgbmFtZT1cInNlYXJjaGFibGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLnNlYXJjaGFibGV9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNlYXJjaGFibGU8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fT5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgbmFtZT1cImRpc2FibGVkXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+RGlzYWJsZWQ8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNvdW50cnkgPT09ICdBVSd9IHZhbHVlPVwiQVVcIiBvbkNoYW5nZT17dGhpcy5zd2l0Y2hDb3VudHJ5fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkF1c3RyYWxpYTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNvdW50cnkgPT09ICdVUyd9IHZhbHVlPVwiVVNcIiBvbkNoYW5nZT17dGhpcy5zd2l0Y2hDb3VudHJ5fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlVuaXRlZCBTdGF0ZXM8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlc0ZpZWxkO1xuIiwiaW1wb3J0IEdyYXZhdGFyT3B0aW9uIGZyb20gJy4vQ3VzdG9tT3B0aW9uJztcbmltcG9ydCBHcmF2YXRhclZhbHVlIGZyb20gJy4vQ3VzdG9tU2luZ2xlVmFsdWUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgVVNFUlMgPSByZXF1aXJlKCcuLi9kYXRhL3VzZXJzJyk7XG5cbnZhciBVc2Vyc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRoaW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRyZW5kZXJIaW50ICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaGludCkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPnt0aGlzLnByb3BzLmhpbnR9PC9kaXY+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRvbk9wdGlvbkxhYmVsQ2xpY2s9e3RoaXMub25MYWJlbENsaWNrfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2VsZWN0IHVzZXJcIlxuXHRcdFx0XHRcdG9wdGlvbkNvbXBvbmVudD17R3JhdmF0YXJPcHRpb259XG5cdFx0XHRcdFx0c2luZ2xlVmFsdWVDb21wb25lbnQ9e0dyYXZhdGFyVmFsdWV9XG5cdFx0XHRcdFx0b3B0aW9ucz17VVNFUlMudXNlcnN9Lz5cblx0XHRcdFx0e3RoaXMucmVuZGVySGludCgpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcnNGaWVsZDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5mdW5jdGlvbiBsb2dDaGFuZ2UoKSB7XG5cdGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIFtdLmNvbmNhdChbJ1NlbGVjdCB2YWx1ZSBjaGFuZ2VkOiddLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJndW1lbnRzKSkpO1xufVxuXG52YXIgVmFsdWVzQXNOdW1iZXJzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnVmFsdWVzQXNOdW1iZXJzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHR9LFxuXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0eyB2YWx1ZTogMTAsIGxhYmVsOiAnVGVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMSwgbGFiZWw6ICdFbGV2ZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDEyLCBsYWJlbDogJ1R3ZWx2ZScgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjMsIGxhYmVsOiAnVHdlbnR5LXRocmVlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyNCwgbGFiZWw6ICdUd2VudHktZm91cicgfVxuXHRcdFx0XSxcblx0XHRcdG1hdGNoUG9zOiAnYW55Jyxcblx0XHRcdG1hdGNoVmFsdWU6IHRydWUsXG5cdFx0XHRtYXRjaExhYmVsOiB0cnVlLFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0XHRtdWx0aTogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXG5cdG9uQ2hhbmdlTWF0Y2hTdGFydChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hQb3M6IGV2ZW50LnRhcmdldC5jaGVja2VkID8gJ3N0YXJ0JyA6ICdhbnknXG5cdFx0fSk7XG5cdH0sXG5cblx0b25DaGFuZ2VNYXRjaFZhbHVlKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaFZhbHVlOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXG5cdG9uQ2hhbmdlTWF0Y2hMYWJlbChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hMYWJlbDogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblxuXHRvbkNoYW5nZSh2YWx1ZSwgdmFsdWVzKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9KTtcblx0XHRsb2dDaGFuZ2UodmFsdWUsIHZhbHVlcyk7XG5cdH0sXG5cblx0b25DaGFuZ2VNdWx0aShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cblx0cmVuZGVyICgpIHtcblxuXHRcdHZhciBtYXRjaFByb3AgPSAnYW55JztcblxuXHRcdGlmICh0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgIXRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ2xhYmVsJztcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuc3RhdGUubWF0Y2hMYWJlbCAmJiB0aGlzLnN0YXRlLm1hdGNoVmFsdWUpIHtcblx0XHRcdG1hdGNoUHJvcCA9ICd2YWx1ZSc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdHNlYXJjaGFibGVcblx0XHRcdFx0XHRtYXRjaFByb3A9e21hdGNoUHJvcH1cblx0XHRcdFx0XHRtYXRjaFBvcz17dGhpcy5zdGF0ZS5tYXRjaFBvc31cblx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMuc3RhdGUubXVsdGl9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTXVsdGl9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk11bHRpLVNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoVmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hWYWx1ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggdmFsdWUgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoTGFiZWx9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hMYWJlbH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggbGFiZWwgb25seTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoUG9zID09PSAnc3RhcnQnfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoU3RhcnR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk9ubHkgaW5jbHVkZSBtYXRjaGVzIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmc8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZXNBc051bWJlcnNGaWVsZDtcbiIsImV4cG9ydHMuQVUgPSBbXG5cdHsgdmFsdWU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JywgbGFiZWw6ICdBdXN0cmFsaWFuIENhcGl0YWwgVGVycml0b3J5JyB9LFxuXHR7IHZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJywgbGFiZWw6ICdOZXcgU291dGggV2FsZXMnIH0sXG5cdHsgdmFsdWU6ICd2aWN0b3JpYScsIGxhYmVsOiAnVmljdG9yaWEnIH0sXG5cdHsgdmFsdWU6ICdxdWVlbnNsYW5kJywgbGFiZWw6ICdRdWVlbnNsYW5kJyB9LFxuXHR7IHZhbHVlOiAnd2VzdGVybi1hdXN0cmFsaWEnLCBsYWJlbDogJ1dlc3Rlcm4gQXVzdHJhbGlhJyB9LFxuXHR7IHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJywgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnIH0sXG5cdHsgdmFsdWU6ICd0YXNtYW5pYScsIGxhYmVsOiAnVGFzbWFuaWEnIH0sXG5cdHsgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknLCBsYWJlbDogJ05vcnRoZXJuIFRlcnJpdG9yeScgfVxuXTtcblxuZXhwb3J0cy5VUyA9IFtcbiAgICB7IHZhbHVlOiAnQUwnLCBsYWJlbDogJ0FsYWJhbWEnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuICAgIHsgdmFsdWU6ICdBSycsIGxhYmVsOiAnQWxhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdBUycsIGxhYmVsOiAnQW1lcmljYW4gU2Ftb2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FaJywgbGFiZWw6ICdBcml6b25hJyB9LFxuICAgIHsgdmFsdWU6ICdBUicsIGxhYmVsOiAnQXJrYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0NBJywgbGFiZWw6ICdDYWxpZm9ybmlhJyB9LFxuICAgIHsgdmFsdWU6ICdDTycsIGxhYmVsOiAnQ29sb3JhZG8nIH0sXG4gICAgeyB2YWx1ZTogJ0NUJywgbGFiZWw6ICdDb25uZWN0aWN1dCcgfSxcbiAgICB7IHZhbHVlOiAnREUnLCBsYWJlbDogJ0RlbGF3YXJlJyB9LFxuICAgIHsgdmFsdWU6ICdEQycsIGxhYmVsOiAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZNJywgbGFiZWw6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZMJywgbGFiZWw6ICdGbG9yaWRhJyB9LFxuICAgIHsgdmFsdWU6ICdHQScsIGxhYmVsOiAnR2VvcmdpYScgfSxcbiAgICB7IHZhbHVlOiAnR1UnLCBsYWJlbDogJ0d1YW0nIH0sXG4gICAgeyB2YWx1ZTogJ0hJJywgbGFiZWw6ICdIYXdhaWknIH0sXG4gICAgeyB2YWx1ZTogJ0lEJywgbGFiZWw6ICdJZGFobycgfSxcbiAgICB7IHZhbHVlOiAnSUwnLCBsYWJlbDogJ0lsbGlub2lzJyB9LFxuICAgIHsgdmFsdWU6ICdJTicsIGxhYmVsOiAnSW5kaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnSUEnLCBsYWJlbDogJ0lvd2EnIH0sXG4gICAgeyB2YWx1ZTogJ0tTJywgbGFiZWw6ICdLYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0tZJywgbGFiZWw6ICdLZW50dWNreScgfSxcbiAgICB7IHZhbHVlOiAnTEEnLCBsYWJlbDogJ0xvdWlzaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnTUUnLCBsYWJlbDogJ01haW5lJyB9LFxuICAgIHsgdmFsdWU6ICdNSCcsIGxhYmVsOiAnTWFyc2hhbGwgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnTUQnLCBsYWJlbDogJ01hcnlsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdNQScsIGxhYmVsOiAnTWFzc2FjaHVzZXR0cycgfSxcbiAgICB7IHZhbHVlOiAnTUknLCBsYWJlbDogJ01pY2hpZ2FuJyB9LFxuICAgIHsgdmFsdWU6ICdNTicsIGxhYmVsOiAnTWlubmVzb3RhJyB9LFxuICAgIHsgdmFsdWU6ICdNUycsIGxhYmVsOiAnTWlzc2lzc2lwcGknIH0sXG4gICAgeyB2YWx1ZTogJ01PJywgbGFiZWw6ICdNaXNzb3VyaScgfSxcbiAgICB7IHZhbHVlOiAnTVQnLCBsYWJlbDogJ01vbnRhbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05FJywgbGFiZWw6ICdOZWJyYXNrYScgfSxcbiAgICB7IHZhbHVlOiAnTlYnLCBsYWJlbDogJ05ldmFkYScgfSxcbiAgICB7IHZhbHVlOiAnTkgnLCBsYWJlbDogJ05ldyBIYW1wc2hpcmUnIH0sXG4gICAgeyB2YWx1ZTogJ05KJywgbGFiZWw6ICdOZXcgSmVyc2V5JyB9LFxuICAgIHsgdmFsdWU6ICdOTScsIGxhYmVsOiAnTmV3IE1leGljbycgfSxcbiAgICB7IHZhbHVlOiAnTlknLCBsYWJlbDogJ05ldyBZb3JrJyB9LFxuICAgIHsgdmFsdWU6ICdOQycsIGxhYmVsOiAnTm9ydGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05EJywgbGFiZWw6ICdOb3J0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01QJywgbGFiZWw6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ09IJywgbGFiZWw6ICdPaGlvJyB9LFxuICAgIHsgdmFsdWU6ICdPSycsIGxhYmVsOiAnT2tsYWhvbWEnIH0sXG4gICAgeyB2YWx1ZTogJ09SJywgbGFiZWw6ICdPcmVnb24nIH0sXG4gICAgeyB2YWx1ZTogJ1BXJywgbGFiZWw6ICdQYWxhdScgfSxcbiAgICB7IHZhbHVlOiAnUEEnLCBsYWJlbDogJ1Blbm5zeWx2YW5pYScgfSxcbiAgICB7IHZhbHVlOiAnUFInLCBsYWJlbDogJ1B1ZXJ0byBSaWNvJyB9LFxuICAgIHsgdmFsdWU6ICdSSScsIGxhYmVsOiAnUmhvZGUgSXNsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdTQycsIGxhYmVsOiAnU291dGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ1NEJywgbGFiZWw6ICdTb3V0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ1ROJywgbGFiZWw6ICdUZW5uZXNzZWUnIH0sXG4gICAgeyB2YWx1ZTogJ1RYJywgbGFiZWw6ICdUZXhhcycgfSxcbiAgICB7IHZhbHVlOiAnVVQnLCBsYWJlbDogJ1V0YWgnIH0sXG4gICAgeyB2YWx1ZTogJ1ZUJywgbGFiZWw6ICdWZXJtb250JyB9LFxuICAgIHsgdmFsdWU6ICdWSScsIGxhYmVsOiAnVmlyZ2luIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ1ZBJywgbGFiZWw6ICdWaXJnaW5pYScgfSxcbiAgICB7IHZhbHVlOiAnV0EnLCBsYWJlbDogJ1dhc2hpbmd0b24nIH0sXG4gICAgeyB2YWx1ZTogJ1dWJywgbGFiZWw6ICdXZXN0IFZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXSScsIGxhYmVsOiAnV2lzY29uc2luJyB9LFxuICAgIHsgdmFsdWU6ICdXWScsIGxhYmVsOiAnV3lvbWluZycgfVxuXTtcbiIsImV4cG9ydHMudXNlcnMgPSBbXG4gICAgeyB2YWx1ZTogJ0pvaG4gU21pdGgnLCBsYWJlbDogJ0pvaG4gU21pdGgnLCBlbWFpbDogJ2pvaG5Ac21pdGguY29tJyB9LFxuICAgIHsgdmFsdWU6ICdNZXJyeSBKYW5lJywgbGFiZWw6ICdNZXJyeSBKYW5lJywgZW1haWw6ICdtZXJyeUBqYW5lLmNvbScgfSxcbiAgICB7IHZhbHVlOiAnU3RhbiBIb3BlcicsIGxhYmVsOiAnU3RhbiBIb3BlcicsIGVtYWlsOiAnc3RhbkBob3Blci5jb20nIH1cbl07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS45LjNcbnZhciBSZWFjdCwgaXNSZXRpbmEsIG1kNSwgcXVlcnlzdHJpbmc7XG5cblJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxubWQ1ID0gcmVxdWlyZSgnbWQ1Jyk7XG5cbnF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuaXNSZXRpbmEgPSByZXF1aXJlKCdpcy1yZXRpbmEnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnR3JhdmF0YXInLFxuICBwcm9wVHlwZXM6IHtcbiAgICBlbWFpbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZDU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICByYXRpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaHR0cHM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIFwiZGVmYXVsdFwiOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICB9LFxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaXplOiA1MCxcbiAgICAgIHJhdGluZzogJ2cnLFxuICAgICAgaHR0cHM6IGZhbHNlLFxuICAgICAgXCJkZWZhdWx0XCI6IFwicmV0cm9cIixcbiAgICAgIGNsYXNzTmFtZTogXCJcIlxuICAgIH07XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJhc2UsIGhhc2gsIHF1ZXJ5LCBzcmM7XG4gICAgYmFzZSA9IHRoaXMucHJvcHMuaHR0cHMgPyBcImh0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvXCIgOiAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyc7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe1xuICAgICAgczogaXNSZXRpbmEoKSA/IHRoaXMucHJvcHMuc2l6ZSAqIDIgOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICByOiB0aGlzLnByb3BzLnJhdGluZyxcbiAgICAgIGQ6IHRoaXMucHJvcHNbXCJkZWZhdWx0XCJdXG4gICAgfSk7XG4gICAgaWYgKHRoaXMucHJvcHMubWQ1KSB7XG4gICAgICBoYXNoID0gdGhpcy5wcm9wcy5tZDU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVtYWlsKSB7XG4gICAgICBoYXNoID0gbWQ1KHRoaXMucHJvcHMuZW1haWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0dyYXZhdGFyIGltYWdlIGNhbiBub3QgYmUgZmV0Y2hlZC4gRWl0aGVyIHRoZSBcImVtYWlsXCIgb3IgXCJtZDVcIiBwcm9wIG11c3QgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgbnVsbCk7XG4gICAgfVxuICAgIHNyYyA9IGJhc2UgKyBoYXNoICsgXCI/XCIgKyBxdWVyeTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCBSZWFjdC5fX3NwcmVhZCh7fSwgdGhpcy5wcm9wcywge1xuICAgICAgXCJjbGFzc05hbWVcIjogXCJyZWFjdC1ncmF2YXRhciBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgXCJzcmNcIjogc3JjLFxuICAgICAgXCJoZWlnaHRcIjogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgXCJ3aWR0aFwiOiB0aGlzLnByb3BzLnNpemVcbiAgICB9KSk7XG4gIH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1lZGlhUXVlcnk7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgIG1lZGlhUXVlcnkgPSBcIigtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDUvNCksIChtaW4tcmVzb2x1dGlvbjogMS4yNWRwcHgpXCI7XG4gICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMS4yNSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShtZWRpYVF1ZXJ5KS5tYXRjaGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBjcnlwdCA9IHJlcXVpcmUoJ2NyeXB0JyksXHJcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcclxuICAgICAgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKSxcclxuICAgICAgYmluID0gcmVxdWlyZSgnY2hhcmVuYycpLmJpbixcclxuXHJcbiAgLy8gVGhlIGNvcmVcclxuICBtZDUgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XHJcbiAgICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpXHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RpbmcgPT09ICdiaW5hcnknKVxyXG4gICAgICAgIG1lc3NhZ2UgPSBiaW4uc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIG1lc3NhZ2UgPSB1dGY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICBlbHNlIGlmIChpc0J1ZmZlcihtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAvLyBlbHNlLCBhc3N1bWUgYnl0ZSBhcnJheSBhbHJlYWR5XHJcblxyXG4gICAgdmFyIG0gPSBjcnlwdC5ieXRlc1RvV29yZHMobWVzc2FnZSksXHJcbiAgICAgICAgbCA9IG1lc3NhZ2UubGVuZ3RoICogOCxcclxuICAgICAgICBhID0gIDE3MzI1ODQxOTMsXHJcbiAgICAgICAgYiA9IC0yNzE3MzM4NzksXHJcbiAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxyXG4gICAgICAgIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICAgIC8vIFN3YXAgZW5kaWFuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbVtpXSA9ICgobVtpXSA8PCAgOCkgfCAobVtpXSA+Pj4gMjQpKSAmIDB4MDBGRjAwRkYgfFxyXG4gICAgICAgICAgICAgKChtW2ldIDw8IDI0KSB8IChtW2ldID4+PiAgOCkpICYgMHhGRjAwRkYwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYWRkaW5nXHJcbiAgICBtW2wgPj4+IDVdIHw9IDB4ODAgPDwgKGwgJSAzMik7XHJcbiAgICBtWygoKGwgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbDtcclxuXHJcbiAgICAvLyBNZXRob2Qgc2hvcnRjdXRzXHJcbiAgICB2YXIgRkYgPSBtZDUuX2ZmLFxyXG4gICAgICAgIEdHID0gbWQ1Ll9nZyxcclxuICAgICAgICBISCA9IG1kNS5faGgsXHJcbiAgICAgICAgSUkgPSBtZDUuX2lpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHJcbiAgICAgIHZhciBhYSA9IGEsXHJcbiAgICAgICAgICBiYiA9IGIsXHJcbiAgICAgICAgICBjYyA9IGMsXHJcbiAgICAgICAgICBkZCA9IGQ7XHJcblxyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDcsIC02ODA4NzY5MzYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgNF0sICA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsxMl0sICA3LCAgMTgwNDYwMzY4Mik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgMV0sICA1LCAtMTY1Nzk2NTEwKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgNl0sICA5LCAtMTA2OTUwMTYzMik7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDVdLCAgNSwgLTcwMTU1ODY5MSk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTBdLCAgOSwgIDM4MDE2MDgzKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgOV0sICA1LCAgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxNF0sICA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKzEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgMl0sICA5LCAtNTE0MDM3ODQpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA1XSwgIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgMV0sICA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsxM10sICA0LCAgNjgxMjc5MTc0KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA5XSwgIDQsIC02NDAzNjQ0ODcpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgMF0sICA2LCAtMTk4NjMwODQ0KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDYsICAxODczMzEzMzU5KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDRdLCAgNiwgLTE0NTUyMzA3MCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgICAgYSA9IChhICsgYWEpID4+PiAwO1xyXG4gICAgICBiID0gKGIgKyBiYikgPj4+IDA7XHJcbiAgICAgIGMgPSAoYyArIGNjKSA+Pj4gMDtcclxuICAgICAgZCA9IChkICsgZGQpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjcnlwdC5lbmRpYW4oW2EsIGIsIGMsIGRdKTtcclxuICB9O1xyXG5cclxuICAvLyBBdXhpbGlhcnkgZnVuY3Rpb25zXHJcbiAgbWQ1Ll9mZiAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBjIHwgfmIgJiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9nZyAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBkIHwgYyAmIH5kKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9oaCAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faWkgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGFja2FnZSBwcml2YXRlIGJsb2Nrc2l6ZVxyXG4gIG1kNS5fYmxvY2tzaXplID0gMTY7XHJcbiAgbWQ1Ll9kaWdlc3RzaXplID0gMTY7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGlmKHR5cGVvZiBtZXNzYWdlID09ICd1bmRlZmluZWQnKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIGRpZ2VzdGJ5dGVzID0gY3J5cHQud29yZHNUb0J5dGVzKG1kNShtZXNzYWdlLCBvcHRpb25zKSk7XHJcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLmFzQnl0ZXMgPyBkaWdlc3RieXRlcyA6XHJcbiAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmFzU3RyaW5nID8gYmluLmJ5dGVzVG9TdHJpbmcoZGlnZXN0Ynl0ZXMpIDpcclxuICAgICAgICBjcnlwdC5ieXRlc1RvSGV4KGRpZ2VzdGJ5dGVzKTtcclxuICB9O1xyXG5cclxufSkoKTtcclxuIiwidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGJhc2U2NG1hcFxuICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG5cbiAgY3J5cHQgPSB7XG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gbGVmdFxuICAgIHJvdGw6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCBiKSB8IChuID4+PiAoMzIgLSBiKSk7XG4gICAgfSxcblxuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIHJpZ2h0XG4gICAgcm90cjogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcbiAgICB9LFxuXG4gICAgLy8gU3dhcCBiaWctZW5kaWFuIHRvIGxpdHRsZS1lbmRpYW4gYW5kIHZpY2UgdmVyc2FcbiAgICBlbmRpYW46IGZ1bmN0aW9uKG4pIHtcbiAgICAgIC8vIElmIG51bWJlciBnaXZlbiwgc3dhcCBlbmRpYW5cbiAgICAgIGlmIChuLmNvbnN0cnVjdG9yID09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gY3J5cHQucm90bChuLCA4KSAmIDB4MDBGRjAwRkYgfCBjcnlwdC5yb3RsKG4sIDI0KSAmIDB4RkYwMEZGMDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcbiAgICAgICAgbltpXSA9IGNyeXB0LmVuZGlhbihuW2ldKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG5cbiAgICAvLyBHZW5lcmF0ZSBhbiBhcnJheSBvZiBhbnkgbGVuZ3RoIG9mIHJhbmRvbSBieXRlc1xuICAgIHJhbmRvbUJ5dGVzOiBmdW5jdGlvbihuKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxuICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBiaWctZW5kaWFuIDMyLWJpdCB3b3Jkc1xuICAgIGJ5dGVzVG9Xb3JkczogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXG4gICAgICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYmlnLWVuZGlhbiAzMi1iaXQgd29yZHMgdG8gYSBieXRlIGFycmF5XG4gICAgd29yZHNUb0J5dGVzOiBmdW5jdGlvbih3b3Jkcykge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxuICAgICAgICBieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gICAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgaGV4VG9CeXRlczogZnVuY3Rpb24oaGV4KSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBjID0gMDsgYyA8IGhleC5sZW5ndGg7IGMgKz0gMilcbiAgICAgICAgYnl0ZXMucHVzaChwYXJzZUludChoZXguc3Vic3RyKGMsIDIpLCAxNikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGJhc2UtNjQgc3RyaW5nXG4gICAgYnl0ZXNUb0Jhc2U2NDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGJhc2U2NCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGVzW2ldIDw8IDE2KSB8IChieXRlc1tpICsgMV0gPDwgOCkgfCBieXRlc1tpICsgMl07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgIGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXG4gICAgICAgICAgICBiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goJz0nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICAgIC8vIFJlbW92ZSBub24tYmFzZS02NCBjaGFyYWN0ZXJzXG4gICAgICBiYXNlNjQgPSBiYXNlNjQucmVwbGFjZSgvW15BLVowLTkrXFwvXS9pZywgJycpO1xuXG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDtcbiAgICAgICAgICBpbW9kNCA9ICsraSAlIDQpIHtcbiAgICAgICAgaWYgKGltb2Q0ID09IDApIGNvbnRpbnVlO1xuICAgICAgICBieXRlcy5wdXNoKCgoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpIC0gMSkpXG4gICAgICAgICAgICAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpXG4gICAgICAgICAgICB8IChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkpKSA+Pj4gKDYgLSBpbW9kNCAqIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gY3J5cHQ7XG59KSgpO1xuIiwiLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIEJ1ZmZlclxuICpcbiAqIEF1dGhvcjogICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogTGljZW5zZTogIE1JVFxuICpcbiAqIGBucG0gaW5zdGFsbCBpcy1idWZmZXJgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiAhIShcbiAgICBvYmogIT0gbnVsbCAmJlxuICAgIG9iai5jb25zdHJ1Y3RvciAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxuICApXG59XG4iXX0=
