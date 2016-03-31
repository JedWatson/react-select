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

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsCities = require('./components/Cities');

var _componentsCities2 = _interopRequireDefault(_componentsCities);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsCities2['default'], { label: 'Cities', searchable: true }),
	_react2['default'].createElement(_componentsStates2['default'], { label: 'States', searchable: true }),
	_react2['default'].createElement(_componentsMultiselect2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement(_componentsContributors2['default'], { label: 'Contributors (Async)' }),
	_react2['default'].createElement(_componentsNumericSelect2['default'], { label: 'Numeric Values' }),
	_react2['default'].createElement(_componentsCustomRender2['default'], { label: 'Custom Render Methods' }),
	_react2['default'].createElement(_componentsCustomComponents2['default'], { label: 'Custom Placeholder, Option and Value Components' })
), document.getElementById('example'));
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Cities":2,"./components/Contributors":3,"./components/CustomComponents":4,"./components/CustomRender":5,"./components/Multiselect":6,"./components/NumericSelect":7,"./components/States":8,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

var DATA = require('../data/cities');

var OPTION_HEIGHT = 35;
var MAX_OPTIONS_HEIGHT = 200;

var CitiesField = _react2['default'].createClass({
	displayName: 'CitiesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'Cities:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
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
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
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
	renderMenu: function renderMenu(_ref) {
		var focusedOption = _ref.focusedOption;
		var focusOption = _ref.focusOption;
		var options = _ref.options;
		var selectValue = _ref.selectValue;
		var valueArray = _ref.valueArray;

		var focusedOptionIndex = options.indexOf(focusedOption);
		var height = Math.min(MAX_OPTIONS_HEIGHT, options.length * OPTION_HEIGHT);

		return _react2['default'].createElement(
			_reactVirtualized.AutoSizer,
			{ disableHeight: true },
			function (_ref2) {
				var width = _ref2.width;
				return _react2['default'].createElement(_reactVirtualized.VirtualScroll, {
					ref: 'VirtualScroll',
					height: height,
					rowHeight: OPTION_HEIGHT,
					rowRenderer: function (index) {
						return _react2['default'].createElement(
							'div',
							{
								onMouseOver: function () {
									return focusOption(options[index]);
								},
								onClick: function () {
									return selectValue(options[index]);
								},
								style: {
									backgroundColor: options[index] === focusedOption ? '#eee' : '#fff',
									height: OPTION_HEIGHT,
									display: 'flex',
									alignItems: 'center',
									padding: '0 .5rem'
								}
							},
							options[index].name
						);
					},
					rowsCount: options.length,
					scrollToIndex: focusedOptionIndex,
					width: width
				});
			}
		);
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'World\'s Largest Cities'
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect',
				autofocus: true,
				options: options,
				simpleValue: true,
				clearable: this.state.clearable,
				name: 'selected-state',
				disabled: this.state.disabled,
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: this.state.searchable,
				labelKey: 'name',
				valueKey: 'name',
				renderMenu: this.renderMenu
			})
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":9,"react":undefined,"react-select":undefined,"react-virtualized":49}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = _react2['default'].createClass({
	displayName: 'Contributors',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
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
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":10,"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = _react2['default'].createClass({
	displayName: 'GravatarOption',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string,
		isDisabled: _react2['default'].PropTypes.bool,
		isFocused: _react2['default'].PropTypes.bool,
		isSelected: _react2['default'].PropTypes.bool,
		onFocus: _react2['default'].PropTypes.func,
		onSelect: _react2['default'].PropTypes.func,
		onUnfocus: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	handleMouseLeave: function handleMouseLeave(event) {
		this.props.onUnfocus(this.props.option, event);
	},
	render: function render() {
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
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onMouseLeave: this.handleMouseLeave,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = _react2['default'].createClass({
	displayName: 'GravatarValue',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
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
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

module.exports = UsersField;

},{"../data/users":12,"react":undefined,"react-gravatar":28,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		console.log('Support level selected:', value.label);
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
			{ style: { color: option.color } },
			option.label,
			' ',
			option.link
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				placeholder: 'Select your support level',
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
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
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
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
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

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
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
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
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
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
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
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
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
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
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
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
		var options = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', autofocus: true, options: options, simpleValue: true, clearable: this.state.clearable, name: 'selected-state', disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
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
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'clearable', checked: this.state.clearable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Clearable'
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

},{"../data/states":11,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],10:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],11:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],12:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],16:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":15}],17:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],18:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"charenc":13,"crypt":14,"is-buffer":18}],21:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))

},{"_process":22}],22:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

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
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":23,"./encode":24}],26:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"performance-now":21}],27:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":51}],28:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
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
      "default": "retro"
    };
  },
  render: function() {
    var base, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: this.props.size,
      r: this.props.rating,
      d: this.props["default"]
    });
    retinaQuery = querystring.stringify({
      s: this.props.size * 2,
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
    retinaSrc = base + hash + "?" + retinaQuery;
    modernBrowser = true;
    if (typeof window !== "undefined" && window !== null) {
      modernBrowser = 'srcset' in document.createElement('img');
    }
    if (!modernBrowser && isRetina()) {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": retinaSrc,
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    } else {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": src,
        "srcSet": retinaSrc + " 2x",
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    }
  }
});

},{"is-retina":19,"md5":20,"querystring":25,"react":undefined}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */

var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrowKeyStepper).call(this, props, context));

    _this.state = {
      scrollToColumn: 0,
      scrollToRow: 0
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(ArrowKeyStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var _state = this.state;
      var scrollToColumn = _state.scrollToColumn;
      var scrollToRow = _state.scrollToRow;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onKeyDown: this._onKeyDown
        },
        children({
          onSectionRendered: this._onSectionRendered,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var rowsCount = _props2.rowsCount;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.min(this._rowStopIndex + 1, rowsCount - 1)
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.max(this._columnStartIndex - 1, 0)
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.min(this._columnStopIndex + 1, columnsCount - 1)
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.max(this._rowStartIndex - 1, 0)
          });
          break;
      }
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref) {
      var columnStartIndex = _ref.columnStartIndex;
      var columnStopIndex = _ref.columnStopIndex;
      var rowStartIndex = _ref.rowStartIndex;
      var rowStopIndex = _ref.rowStopIndex;

      this._columnStartIndex = columnStartIndex;
      this._columnStopIndex = columnStopIndex;
      this._rowStartIndex = rowStartIndex;
      this._rowStopIndex = rowStopIndex;
    }
  }]);

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnsCount: _react.PropTypes.number.isRequired,
  rowsCount: _react.PropTypes.number.isRequired
};
exports.default = ArrowKeyStepper;
},{"react":undefined,"react-addons-shallow-compare":27}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowKeyStepper = exports.default = undefined;

var _ArrowKeyStepper2 = require('./ArrowKeyStepper');

var _ArrowKeyStepper3 = _interopRequireDefault(_ArrowKeyStepper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArrowKeyStepper3.default;
exports.ArrowKeyStepper = _ArrowKeyStepper3.default;
},{"./ArrowKeyStepper":29}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator component that automatically adjusts the width and height of a single child.
 * Child component should not be declared as a child but should rather be specified by a `ChildComponent` property.
 * All other properties will be passed through to the child component.
 */

var AutoSizer = function (_Component) {
  _inherits(AutoSizer, _Component);

  function AutoSizer(props) {
    _classCallCheck(this, AutoSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSizer).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  _createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = require('../vendor/detectElementResize');
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var disableHeight = _props.disableHeight;
      var disableWidth = _props.disableWidth;
      var _state = this.state;
      var height = _state.height;
      var width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };

      if (!disableHeight) {
        outerStyle.height = 0;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: this._setRef,
          onScroll: this._onScroll,
          style: outerStyle
        },
        children({ height: height, width: width })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var onResize = this.props.onResize;

      var _parentNode$getBoundi = this._parentNode.getBoundingClientRect();

      var height = _parentNode$getBoundi.height;
      var width = _parentNode$getBoundi.width;


      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10);
      var paddingRight = parseInt(style.paddingRight, 10);
      var paddingTop = parseInt(style.paddingTop, 10);
      var paddingBottom = parseInt(style.paddingBottom, 10);

      this.setState({
        height: height - paddingTop - paddingBottom,
        width: width - paddingLeft - paddingRight
      });

      onResize({ height: height, width: width });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // Prevent detectElementResize library from being triggered by this scroll event.
      event.stopPropagation();
    }
  }, {
    key: '_setRef',
    value: function _setRef(autoSizer) {
      // In case the component has been unmounted
      this._parentNode = autoSizer && autoSizer.parentNode;
    }
  }]);

  return AutoSizer;
}(_react.Component);

AutoSizer.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, width }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Disable dynamic :height property */
  disableHeight: _react.PropTypes.bool,

  /** Disable dynamic :width property */
  disableWidth: _react.PropTypes.bool,

  /** Callback to be invoked on-resize: ({ height, width }) */
  onResize: _react.PropTypes.func.isRequired
};
AutoSizer.defaultProps = {
  onResize: function onResize() {}
};
exports.default = AutoSizer;

},{"../vendor/detectElementResize":50,"react":undefined,"react-addons-shallow-compare":27}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = exports.default = undefined;

var _AutoSizer2 = require('./AutoSizer');

var _AutoSizer3 = _interopRequireDefault(_AutoSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AutoSizer3.default;
exports.AutoSizer = _AutoSizer3.default;
},{"./AutoSizer":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */

var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnSizer).call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(ColumnSizer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var columnMaxWidth = _props.columnMaxWidth;
      var columnMinWidth = _props.columnMinWidth;
      var columnsCount = _props.columnsCount;
      var width = _props.width;


      if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnsCount !== prevProps.columnsCount || width !== prevProps.width) {
        if (this._registeredChild) {
          this._registeredChild.recomputeGridSize();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var columnMaxWidth = _props2.columnMaxWidth;
      var columnMinWidth = _props2.columnMinWidth;
      var columnsCount = _props2.columnsCount;
      var width = _props2.width;


      var safeColumnMinWidth = columnMinWidth || 1;

      var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

      var columnWidth = width / columnsCount;
      columnWidth = Math.max(safeColumnMinWidth, columnWidth);
      columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
      columnWidth = Math.floor(columnWidth);

      var adjustedWidth = Math.min(width, columnWidth * columnsCount);

      return children({
        adjustedWidth: adjustedWidth,
        getColumnWidth: function getColumnWidth() {
          return columnWidth;
        },
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(child) {
      if (child !== null && !(child instanceof _Grid2.default)) {
        throw Error('Unexpected child type registered; only Grid children are supported.');
      }

      this._registeredChild = child;

      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  }]);

  return ColumnSizer;
}(_react.Component);

ColumnSizer.propTypes = {
  /**
   * Function respondible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or FlexTable child */
  columnsCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or FlexTable child */
  width: _react.PropTypes.number.isRequired
};
exports.default = ColumnSizer;
},{"../Grid":42,"react":undefined,"react-addons-shallow-compare":27}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSizer = exports.default = undefined;

var _ColumnSizer2 = require('./ColumnSizer');

var _ColumnSizer3 = _interopRequireDefault(_ColumnSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColumnSizer3.default;
exports.ColumnSizer = _ColumnSizer3.default;
},{"./ColumnSizer":33}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellRenderer = defaultCellRenderer;
exports.defaultCellDataGetter = defaultCellDataGetter;
exports.defaultHeaderRenderer = defaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SortIndicator = require('./SortIndicator');

var _SortIndicator2 = _interopRequireDefault(_SortIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
function defaultCellRenderer(cellData, cellDataKey, rowData, rowIndex, columnData) {
  if (cellData === null || cellData === undefined) {
    return '';
  } else {
    return String(cellData);
  }
}

/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
function defaultCellDataGetter(dataKey, rowData, columnData) {
  if (rowData.get instanceof Function) {
    return rowData.get(dataKey);
  } else {
    return rowData[dataKey];
  }
}

/**
 * Default table header renderer.
 */
function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var disableSort = _ref.disableSort;
  var label = _ref.label;
  var sortBy = _ref.sortBy;
  var sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [_react2.default.createElement(
    'div',
    {
      className: 'FlexTable__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(_react2.default.createElement(_SortIndicator2.default, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}

/**
 * Describes the header and cell contents of a table column.
 */

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  cellDataGetter: defaultCellDataGetter,
  cellRenderer: defaultCellRenderer,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: defaultHeaderRenderer
};
Column.propTypes = {
  /** Optional CSS class to apply to cell */
  cellClassName: _react.PropTypes.string,

  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * (dataKey: string, rowData: any): any
   */
  cellDataGetter: _react.PropTypes.func,

  /**
   * Callback responsible for rendering a cell's contents.
   * (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any): element
   */
  cellRenderer: _react.PropTypes.func,

  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _react.PropTypes.object,

  /** Uniquely identifies the row-data attribute correspnding to this cell */
  dataKey: _react.PropTypes.any.isRequired,

  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _react.PropTypes.bool,

  /** Flex grow style; defaults to 0 */
  flexGrow: _react.PropTypes.number,

  /** Flex shrink style; defaults to 1 */
  flexShrink: _react.PropTypes.number,

  /** Optional CSS class to apply to this column's header */
  headerClassName: _react.PropTypes.string,

  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: string, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _react.PropTypes.func.isRequired,

  /** Header label for this column */
  label: _react.PropTypes.string,

  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _react.PropTypes.number,

  /** Minimum width of column. */
  minWidth: _react.PropTypes.number,

  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _react.PropTypes.number.isRequired
};
exports.default = Column;
},{"./SortIndicator":38,"react":undefined}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlexColumn = require('./FlexColumn');

var _FlexColumn2 = _interopRequireDefault(_FlexColumn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */

var FlexTable = function (_Component) {
  _inherits(FlexTable, _Component);

  function FlexTable(props) {
    _classCallCheck(this, FlexTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlexTable).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._createRow = _this._createRow.bind(_this);
    return _this;
  }

  /**
   * See Grid#recomputeGridSize
   */


  _createClass(FlexTable, [{
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowClassName = _props.rowClassName;
      var rowHeight = _props.rowHeight;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      // This row-renderer wrapper function is necessary in order to trigger re-render when the
      // sort-by or sort-direction have changed (else Grid will not see any props changes)
      var rowRenderer = function rowRenderer(index) {
        return _this2._createRow(index);
      };

      var rowClass = rowClassName instanceof Function ? rowClassName(-1) : rowClassName;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('FlexTable', className)
        },
        !disableHeader && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('FlexTable__headerRow', rowClass),
            style: {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            }
          },
          this._getRenderedHeaderRow()
        ),
        _react2.default.createElement(_Grid2.default, {
          ref: 'Grid',
          className: 'FlexTable__Grid',
          columnWidth: width,
          columnsCount: 1,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: function onScroll(_ref) {
            var clientHeight = _ref.clientHeight;
            var scrollHeight = _ref.scrollHeight;
            var scrollTop = _ref.scrollTop;
            return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
          },
          onSectionRendered: function onSectionRendered(_ref2) {
            var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
            var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
            var rowStartIndex = _ref2.rowStartIndex;
            var rowStopIndex = _ref2.rowStopIndex;
            return onRowsRendered({
              overscanStartIndex: rowOverscanStartIndex,
              overscanStopIndex: rowOverscanStopIndex,
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          overscanRowsCount: overscanRowsCount,
          renderCell: function renderCell(_ref3) {
            var columnIndex = _ref3.columnIndex;
            var rowIndex = _ref3.rowIndex;
            return rowRenderer(rowIndex);
          },
          rowHeight: rowHeight,
          rowsCount: rowsCount,
          scrollToRow: scrollToIndex,
          scrollTop: scrollTop,
          width: width
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(column, columnIndex, rowData, rowIndex) {
      var _column$props = column.props;
      var cellClassName = _column$props.cellClassName;
      var cellDataGetter = _column$props.cellDataGetter;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;
      var cellRenderer = _column$props.cellRenderer;

      var cellData = cellDataGetter(dataKey, rowData, columnData);
      var renderedCell = cellRenderer(cellData, dataKey, rowData, rowIndex, columnData);

      var style = this._getFlexStyleForColumn(column);

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: (0, _classnames2.default)('FlexTable__rowColumn', cellClassName),
          style: style
        },
        _react2.default.createElement(
          'div',
          {
            className: 'FlexTable__truncatedColumnText',
            title: title
          },
          renderedCell
        )
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(column, columnIndex) {
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = (0, _classnames2.default)('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column);

      // If this is a sortable header, clicking it should update the table data's sorting.
      var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;
      var onClick = function onClick() {
        sortEnabled && sort(dataKey, newSortDirection);
        onHeaderClick(dataKey, columnData);
      };

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      return _react2.default.createElement(
        'div',
        {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style,
          onClick: onClick
        },
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(rowIndex) {
      var _this3 = this;

      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName(rowIndex) : rowClassName;

      var renderedRow = _react2.default.Children.map(children, function (column, columnIndex) {
        return _this3._createColumn(column, columnIndex, rowGetter(rowIndex), rowIndex);
      });

      return _react2.default.createElement(
        'div',
        {
          key: rowIndex,
          className: (0, _classnames2.default)('FlexTable__row', rowClass),
          onClick: function onClick() {
            return onRowClick(rowIndex);
          },
          style: {
            height: this._getRowHeight(rowIndex),
            paddingRight: scrollbarWidth
          }
        },
        renderedRow
      );
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      };

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : children;

      return _react2.default.Children.map(items, function (column, index) {
        return _this4._createHeader(column, index);
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight(rowIndex) : rowHeight;
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = (0, _reactDom.findDOMNode)(this.refs.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);

  return FlexTable;
}(_react.Component);

FlexTable.propTypes = {
  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = _react2.default.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== _FlexColumn2.default) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: _react.PropTypes.bool,

  /** Optional CSS class to apply to all column headers */
  headerClassName: _react.PropTypes.string,

  /** Fixed height of header row */
  headerHeight: _react.PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * (dataKey: string): void
  */
  onHeaderClick: _react.PropTypes.func,

  /**
   * Callback invoked when a user clicks on a table row.
   * (rowIndex: number): void
   */
  onRowClick: _react.PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: (rowIndex: number): string
   */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * (index: number): any
   */
  rowGetter: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * (dataKey: string, sortDirection: SortDirection): void
   */
  sort: _react.PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: _react.PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC]),

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  headerHeight: 0,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onHeaderClick: function onHeaderClick() {
    return null;
  },
  onRowClick: function onRowClick() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = FlexTable;
},{"../Grid":42,"./FlexColumn":35,"./SortDirection":37,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":27,"react-dom":undefined}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC'
};

exports.default = SortDirection;
},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator(_ref) {
  var sortDirection = _ref.sortDirection;

  var classNames = (0, _classnames2.default)('FlexTable__sortableHeaderIcon', {
    'FlexTable__sortableHeaderIcon--ASC': sortDirection === _SortDirection2.default.ASC,
    'FlexTable__sortableHeaderIcon--DESC': sortDirection === _SortDirection2.default.DESC
  });

  return _react2.default.createElement(
    'svg',
    {
      className: classNames,
      width: 18,
      height: 18,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    sortDirection === _SortDirection2.default.ASC ? _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }) : _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
  );
}
SortIndicator.propTypes = {
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC])
};
},{"./SortDirection":37,"classnames":undefined,"react":undefined}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.SortDirection = exports.FlexColumn = exports.FlexTable = exports.default = undefined;

var _FlexTable2 = require('./FlexTable');

var _FlexTable3 = _interopRequireDefault(_FlexTable2);

var _FlexColumn2 = require('./FlexColumn');

var _FlexColumn3 = _interopRequireDefault(_FlexColumn2);

var _SortDirection2 = require('./SortDirection');

var _SortDirection3 = _interopRequireDefault(_SortDirection2);

var _SortIndicator2 = require('./SortIndicator');

var _SortIndicator3 = _interopRequireDefault(_SortIndicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlexTable3.default;
exports.FlexTable = _FlexTable3.default;
exports.FlexColumn = _FlexColumn3.default;
exports.SortDirection = _SortDirection3.default;
exports.SortIndicator = _SortIndicator3.default;
},{"./FlexColumn":35,"./FlexTable":36,"./SortDirection":37,"./SortIndicator":38}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridUtils = require('./GridUtils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props, context) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props, context));

    _this.state = {
      computeGridMetadataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes onSectionRendered callback only when start/stop row or column indices change
    _this._onGridRenderedMemoizer = (0, _GridUtils.createCallbackMemoizer)();
    _this._onScrollMemoizer = (0, _GridUtils.createCallbackMemoizer)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._computeGridMetadata = _this._computeGridMetadata.bind(_this);
    _this._invokeOnGridRenderedHelper = _this._invokeOnGridRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollLeftForScrollToColumn = _this._updateScrollLeftForScrollToColumn.bind(_this);
    _this._updateScrollTopForScrollToRow = _this._updateScrollTopForScrollToRow.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of row heights and column widths.
   * This function should be called if dynamic column or row sizes have changed but nothing else has.
   * Since Grid only receives :columnsCount and :rowsCount it has no way of detecting when the underlying data changes.
   */


  _createClass(Grid, [{
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      this.setState({
        computeGridMetadataOnNextUpdate: true
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var scrollLeft = _props.scrollLeft;
      var scrollToColumn = _props.scrollToColumn;
      var scrollTop = _props.scrollTop;
      var scrollToRow = _props.scrollToRow;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      if (scrollToColumn >= 0 || scrollToRow >= 0) {
        this._updateScrollLeftForScrollToColumn();
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._getTotalColumnsWidth(),
        totalRowsHeight: this._getTotalRowsHeight()
      });
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var columnWidth = _props2.columnWidth;
      var height = _props2.height;
      var rowHeight = _props2.rowHeight;
      var rowsCount = _props2.rowsCount;
      var scrollToColumn = _props2.scrollToColumn;
      var scrollToRow = _props2.scrollToRow;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this.refs.scrollingContainer.scrollLeft) {
          this.refs.scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this.refs.scrollingContainer.scrollTop) {
          this.refs.scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: columnsCount,
        cellMetadata: this._columnMetadata,
        cellSize: columnWidth,
        previousCellsCount: prevProps.columnsCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.updateScrollIndexHelper)({
        cellsCount: rowsCount,
        cellMetadata: this._rowMetadata,
        cellSize: rowHeight,
        previousCellsCount: prevProps.rowsCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: this._updateScrollTopForScrollToRow
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._computeGridMetadata(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.columnsCount === 0 && nextState.scrollLeft !== 0 || nextProps.rowsCount === 0 && nextState.scrollTop !== 0) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.columnsCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: this._computeGridMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.columnsCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: this._updateScrollLeftForScrollToColumn
      });
      (0, _GridUtils.computeCellMetadataAndUpdateScrollOffsetHelper)({
        cellsCount: this.props.rowsCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: this._computeGridMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.rowsCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: this._updateScrollTopForScrollToRow
      });

      this.setState({
        computeGridMetadataOnNextUpdate: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var className = _props3.className;
      var columnsCount = _props3.columnsCount;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var overscanColumnsCount = _props3.overscanColumnsCount;
      var overscanRowsCount = _props3.overscanRowsCount;
      var renderCell = _props3.renderCell;
      var rowsCount = _props3.rowsCount;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: columnsCount,
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft
        });

        var visibleRowIndices = (0, _GridUtils.getVisibleCellIndices)({
          cellsCount: rowsCount,
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: columnsCount,
          overscanCellsCount: overscanColumnsCount,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _GridUtils.getOverscanIndices)({
          cellsCount: rowsCount,
          overscanCellsCount: overscanRowsCount,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        for (var rowIndex = this._rowStartIndex; rowIndex <= this._rowStopIndex; rowIndex++) {
          var rowDatum = this._rowMetadata[rowIndex];

          for (var columnIndex = this._columnStartIndex; columnIndex <= this._columnStopIndex; columnIndex++) {
            var columnDatum = this._columnMetadata[columnIndex];
            var renderedCell = renderCell({ columnIndex: columnIndex, rowIndex: rowIndex });
            var key = rowIndex + '-' + columnIndex;

            // any other falsey value will be rendered
            // as a text node by React
            if (renderedCell == null || renderedCell === false) {
              continue;
            }

            var child = _react2.default.createElement(
              'div',
              {
                key: key,
                className: 'Grid__cell',
                style: {
                  height: this._getRowHeight(rowIndex),
                  left: columnDatum.offset + 'px',
                  top: rowDatum.offset + 'px',
                  width: this._getColumnWidth(columnIndex)
                }
              },
              renderedCell
            );

            childrenToDisplay.push(child);
          }
        }
      }

      var gridStyle = {
        height: height,
        width: width
      };

      var totalColumnsWidth = this._getTotalColumnsWidth();
      var totalRowsHeight = this._getTotalRowsHeight();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalColumnsWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      if (totalRowsHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          tabIndex: 0,
          style: gridStyle
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Grid__innerScrollContainer',
            style: {
              width: totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              pointerEvents: isScrolling ? 'none' : 'auto'
            }
          },
          childrenToDisplay
        ),
        childrenToDisplay.length === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_computeGridMetadata',
    value: function _computeGridMetadata(props) {
      var columnsCount = props.columnsCount;
      var columnWidth = props.columnWidth;
      var rowHeight = props.rowHeight;
      var rowsCount = props.rowsCount;


      this._columnMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: columnsCount,
        size: columnWidth
      });
      this._rowMetadata = (0, _GridUtils.initCellMetadata)({
        cellsCount: rowsCount,
        size: rowHeight
      });
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this2 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this2._disablePointerEventsTimeoutId = null;
        _this2.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_getColumnWidth',
    value: function _getColumnWidth(index) {
      var columnWidth = this.props.columnWidth;


      return columnWidth instanceof Function ? columnWidth(index) : columnWidth;
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(index) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight(index) : rowHeight;
    }
  }, {
    key: '_getTotalColumnsWidth',
    value: function _getTotalColumnsWidth() {
      if (this._columnMetadata.length === 0) {
        return 0;
      }

      var datum = this._columnMetadata[this._columnMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_getTotalRowsHeight',
    value: function _getTotalRowsHeight() {
      if (this._rowMetadata.length === 0) {
        return 0;
      }

      var datum = this._rowMetadata[this._rowMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_invokeOnGridRenderedHelper',
    value: function _invokeOnGridRenderedHelper() {
      var onSectionRendered = this.props.onSectionRendered;


      this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: this._columnStartIndex,
          columnOverscanStopIndex: this._columnStopIndex,
          columnStartIndex: this._renderedColumnStartIndex,
          columnStopIndex: this._renderedColumnStopIndex,
          rowOverscanStartIndex: this._rowStartIndex,
          rowOverscanStopIndex: this._rowStopIndex,
          rowStartIndex: this._renderedRowStartIndex,
          rowStopIndex: this._renderedRowStopIndex
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalColumnsWidth = _ref.totalColumnsWidth;
      var totalRowsHeight = _ref.totalRowsHeight;
      var _props4 = this.props;
      var height = _props4.height;
      var onScroll = _props4.onScroll;
      var width = _props4.width;


      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;

          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this3 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this3._setNextStateAnimationFrameId = null;
        _this3.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref3) {
      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn(scrollToColumnOverride) {
      var scrollToColumn = scrollToColumnOverride != null ? scrollToColumnOverride : this.props.scrollToColumn;

      var width = this.props.width;
      var scrollLeft = this.state.scrollLeft;


      if (scrollToColumn >= 0) {
        var calculatedScrollLeft = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: scrollToColumn
        });

        if (scrollLeft !== calculatedScrollLeft) {
          this._setScrollPosition({
            scrollLeft: calculatedScrollLeft
          });
        }
      }
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow(scrollToRowOverride) {
      var scrollToRow = scrollToRowOverride != null ? scrollToRowOverride : this.props.scrollToRow;

      var height = this.props.height;
      var scrollTop = this.state.scrollTop;


      if (scrollToRow >= 0) {
        var calculatedScrollTop = (0, _GridUtils.getUpdatedOffsetForIndex)({
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: scrollToRow
        });

        if (scrollTop !== calculatedScrollTop) {
          this._setScrollPosition({
            scrollTop: calculatedScrollTop
          });
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this.refs.scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props5 = this.props;
      var height = _props5.height;
      var width = _props5.width;

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._getTotalRowsHeight();
      var totalColumnsWidth = this._getTotalColumnsWidth();
      var scrollLeft = Math.min(totalColumnsWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalRowsHeight - height + scrollbarSize, event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({ scrollLeft: scrollLeft, scrollTop: scrollTop, totalColumnsWidth: totalColumnsWidth, totalRowsHeight: totalRowsHeight });
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  /**
   * Optional custom CSS class name to attach to root Grid element.
   */
  className: _react.PropTypes.string,

  /**
   * Number of columns in grid.
   */
  columnsCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed column width (number) or a function that returns the width of a column given its index.
   * Should implement the following interface: (index: number): number
   */
  columnWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Height of Grid; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :columnsCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnsCount: _react.PropTypes.number.isRequired,

  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  renderCell: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Number of rows in grid.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Horizontal offset. */
  scrollLeft: _react.PropTypes.number,

  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow: _react.PropTypes.number,

  /**
   * Width of Grid; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
Grid.defaultProps = {
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  overscanColumnsCount: 0,
  overscanRowsCount: 10
};
exports.default = Grid;
},{"./GridUtils":41,"classnames":undefined,"dom-helpers/util/scrollbarSize":16,"raf":26,"react":undefined,"react-addons-shallow-compare":27}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeCellMetadataAndUpdateScrollOffsetHelper = computeCellMetadataAndUpdateScrollOffsetHelper;
exports.createCallbackMemoizer = createCallbackMemoizer;
exports.findNearestCell = findNearestCell;
exports.getOverscanIndices = getOverscanIndices;
exports.getUpdatedOffsetForIndex = getUpdatedOffsetForIndex;
exports.getVisibleCellIndices = getVisibleCellIndices;
exports.initCellMetadata = initCellMetadata;
exports.updateScrollIndexHelper = updateScrollIndexHelper;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param computeMetadataCallback Method to invoke if cell metadata should be recalculated
 * @param computeMetadataCallbackProps Parameters to pass to :computeMetadataCallback
 * @param computeMetadataOnNextUpdate Flag specifying that metadata should be recalculated
 * @param nextCellsCount Newly updated number of rows or columns in the current axis
 * @param nextCellsSize Newly updated width or height of cells for the current axis
 * @param nextScrollToIndex Newly updated scroll-to-index
 * @param scrollToIndex Scroll-to-index
 * @param updateScrollOffsetForScrollToIndex Callback to invoke if the scroll position should be recalculated
 */
function computeCellMetadataAndUpdateScrollOffsetHelper(_ref) {
  var cellsCount = _ref.cellsCount;
  var cellSize = _ref.cellSize;
  var computeMetadataCallback = _ref.computeMetadataCallback;
  var computeMetadataCallbackProps = _ref.computeMetadataCallbackProps;
  var computeMetadataOnNextUpdate = _ref.computeMetadataOnNextUpdate;
  var nextCellsCount = _ref.nextCellsCount;
  var nextCellSize = _ref.nextCellSize;
  var nextScrollToIndex = _ref.nextScrollToIndex;
  var scrollToIndex = _ref.scrollToIndex;
  var updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (computeMetadataOnNextUpdate || cellsCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}

/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref2) {
    var callback = _ref2.callback;
    var indices = _ref2.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      return indices[key] >= 0;
    });
    var indexChanged = keys.some(function (key) {
      return cachedIndices[key] !== indices[key];
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}

/**
 * Binary search function inspired by react-infinite.
 */
function findNearestCell(_ref3) {
  var cellMetadata = _ref3.cellMetadata;
  var mode = _ref3.mode;
  var offset = _ref3.offset;

  var high = cellMetadata.length - 1;
  var low = 0;
  var middle = undefined;
  var currentOffset = undefined;

  // TODO Add better guards here against NaN offset

  while (low <= high) {
    middle = low + Math.floor((high - low) / 2);
    currentOffset = cellMetadata[middle].offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (mode === findNearestCell.EQUAL_OR_LOWER && low > 0) {
    return low - 1;
  } else if (mode === findNearestCell.EQUAL_OR_HIGHER && high < cellMetadata.length - 1) {
    return high + 1;
  }
}

findNearestCell.EQUAL_OR_LOWER = 1;
findNearestCell.EQUAL_OR_HIGHER = 2;

function getOverscanIndices(_ref4) {
  var cellsCount = _ref4.cellsCount;
  var overscanCellsCount = _ref4.overscanCellsCount;
  var startIndex = _ref4.startIndex;
  var stopIndex = _ref4.stopIndex;

  return {
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellsCount - 1, stopIndex + overscanCellsCount)
  };
}

/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @param targetIndex Index of target cell
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref5) {
  var cellMetadata = _ref5.cellMetadata;
  var containerSize = _ref5.containerSize;
  var currentOffset = _ref5.currentOffset;
  var targetIndex = _ref5.targetIndex;

  if (cellMetadata.length === 0) {
    return 0;
  }

  targetIndex = Math.max(0, Math.min(cellMetadata.length - 1, targetIndex));

  var datum = cellMetadata[targetIndex];
  var maxOffset = datum.offset;
  var minOffset = maxOffset - containerSize + datum.size;
  var newOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  return newOffset;
}

/**
 * Determines the range of cells to display for a given offset in order to fill the specified container.
 *
 * @param cellsCount Total number of cells.
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return An object containing :start and :stop attributes, each specifying a cell index
 */
function getVisibleCellIndices(_ref6) {
  var cellsCount = _ref6.cellsCount;
  var cellMetadata = _ref6.cellMetadata;
  var containerSize = _ref6.containerSize;
  var currentOffset = _ref6.currentOffset;

  if (cellsCount === 0) {
    return {};
  }

  // TODO Add better guards here against NaN offset

  var lastDatum = cellMetadata[cellMetadata.length - 1];
  var totalCellSize = lastDatum.offset + lastDatum.size;

  // Ensure offset is within reasonable bounds
  currentOffset = Math.max(0, Math.min(totalCellSize - containerSize, currentOffset));

  var maxOffset = Math.min(totalCellSize, currentOffset + containerSize);

  var start = findNearestCell({
    cellMetadata: cellMetadata,
    mode: findNearestCell.EQUAL_OR_LOWER,
    offset: currentOffset
  });

  var datum = cellMetadata[start];
  currentOffset = datum.offset + datum.size;

  var stop = start;

  while (currentOffset < maxOffset && stop < cellsCount - 1) {
    stop++;

    currentOffset += cellMetadata[stop].size;
  }

  return {
    start: start,
    stop: stop
  };
}

/**
 * Initializes metadata for an axis and its cells.
 * This data is used to determine which cells are visible given a container size and scroll position.
 *
 * @param cellsCount Total number of cells.
 * @param size Either a fixed size or a function that returns the size for a given given an index.
 * @return Object mapping cell index to cell metadata (size, offset)
 */
function initCellMetadata(_ref7) {
  var cellsCount = _ref7.cellsCount;
  var size = _ref7.size;

  var sizeGetter = size instanceof Function ? size : function (index) {
    return size;
  };

  var cellMetadata = [];
  var offset = 0;

  for (var i = 0; i < cellsCount; i++) {
    var _size = sizeGetter(i);

    if (_size == null || isNaN(_size)) {
      throw Error('Invalid size returned for cell ' + i + ' of value ' + _size);
    }

    cellMetadata[i] = {
      size: _size,
      offset: offset
    };

    offset += _size;
  }

  return cellMetadata;
}

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param cellsCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an optional scroll-to-index override
 */
function updateScrollIndexHelper(_ref8) {
  var cellMetadata = _ref8.cellMetadata;
  var cellsCount = _ref8.cellsCount;
  var cellSize = _ref8.cellSize;
  var previousCellsCount = _ref8.previousCellsCount;
  var previousCellSize = _ref8.previousCellSize;
  var previousScrollToIndex = _ref8.previousScrollToIndex;
  var previousSize = _ref8.previousSize;
  var scrollOffset = _ref8.scrollOffset;
  var scrollToIndex = _ref8.scrollToIndex;
  var size = _ref8.size;
  var updateScrollIndexCallback = _ref8.updateScrollIndexCallback;

  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellsCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback();

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && (size < previousSize || cellsCount < previousCellsCount)) {
      var calculatedScrollOffset = getUpdatedOffsetForIndex({
        cellMetadata: cellMetadata,
        containerSize: size,
        currentOffset: scrollOffset,
        targetIndex: cellsCount - 1
      });

      // Only adjust the scroll position if we've scrolled below the last set of rows.
      if (calculatedScrollOffset < scrollOffset) {
        updateScrollIndexCallback(cellsCount - 1);
      }
    }
}

},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.default = undefined;

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Grid3.default;
exports.Grid = _Grid3.default;
},{"./Grid":40}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isRangeVisible = isRangeVisible;
exports.scanForUnloadedRanges = scanForUnloadedRanges;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher-order component that manages lazy-loading for "infinite" data.
 * This component decorates a virtual component and just-in-time prefetches rows as a user scrolls.
 * It is intended as a convenience component; fork it if you'd like finer-grained control over data-loading.
 */

var InfiniteLoader = function (_Component) {
  _inherits(InfiniteLoader, _Component);

  function InfiniteLoader(props, context) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteLoader).call(this, props, context));

    _this._onRowsRendered = _this._onRowsRendered.bind(_this);
    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        onRowsRendered: this._onRowsRendered,
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onRowsRendered',
    value: function _onRowsRendered(_ref) {
      var _this2 = this;

      var startIndex = _ref.startIndex;
      var stopIndex = _ref.stopIndex;
      var _props = this.props;
      var isRowLoaded = _props.isRowLoaded;
      var loadMoreRows = _props.loadMoreRows;
      var rowsCount = _props.rowsCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowsCount, stopIndex + threshold)
      });

      unloadedRanges.forEach(function (unloadedRange) {
        var promise = loadMoreRows(unloadedRange);
        if (promise) {
          promise.then(function () {
            // Refresh the visible rows if any of them have just been loaded.
            // Otherwise they will remain in their unloaded visual state.
            if (isRangeVisible({
              lastRenderedStartIndex: _this2._lastRenderedStartIndex,
              lastRenderedStopIndex: _this2._lastRenderedStopIndex,
              startIndex: unloadedRange.startIndex,
              stopIndex: unloadedRange.stopIndex
            })) {
              if (_this2._registeredChild) {
                _this2._registeredChild.forceUpdate();
              }
            }
          });
        }
      });
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(registeredChild) {
      this._registeredChild = registeredChild;
    }
  }]);

  return InfiniteLoader;
}(_react.Component);

/**
 * Determines if the specified start/stop range is visible based on the most recently rendered range.
 */


InfiniteLoader.propTypes = {
  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ onRowsRendered, registerChild }) => PropTypes.element
   *
   * The specified :onRowsRendered function should be passed through to the child's :onRowsRendered property.
   * The :registerChild callback should be set as the virtualized component's :ref.
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Function responsible for tracking the loaded state of each row.
   * It should implement the following signature: (index: number): boolean
   */
  isRowLoaded: _react.PropTypes.func.isRequired,

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should implement the following signature: ({ startIndex, stopIndex }): Promise
   * The returned Promise should be resolved once row data has finished loading.
   * It will be used to determine when to refresh the list with the newly-loaded data.
   * This callback may be called multiple times in reaction to a single scroll event.
   */
  loadMoreRows: _react.PropTypes.func.isRequired,

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /**
   * Threshold at which to pre-fetch data.
   * A threshold X means that data will start loading when a user scrolls within X rows.
   * This value defaults to 15.
   */
  threshold: _react.PropTypes.number.isRequired
};
InfiniteLoader.defaultProps = {
  rowsCount: 0,
  threshold: 15
};
exports.default = InfiniteLoader;
function isRangeVisible(_ref2) {
  var lastRenderedStartIndex = _ref2.lastRenderedStartIndex;
  var lastRenderedStopIndex = _ref2.lastRenderedStopIndex;
  var startIndex = _ref2.startIndex;
  var stopIndex = _ref2.stopIndex;

  return !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);
}

/**
 * Returns all of the ranges within a larger range that contain unloaded rows.
 */
function scanForUnloadedRanges(_ref3) {
  var isRowLoaded = _ref3.isRowLoaded;
  var startIndex = _ref3.startIndex;
  var stopIndex = _ref3.stopIndex;

  var unloadedRanges = [];
  var rangeStartIndex = null;
  var rangeStopIndex = null;

  for (var i = startIndex; i <= stopIndex; i++) {
    var loaded = isRowLoaded(i);

    if (!loaded) {
      rangeStopIndex = i;
      if (rangeStartIndex === null) {
        rangeStartIndex = i;
      }
    } else if (rangeStopIndex !== null) {
      unloadedRanges.push({
        startIndex: rangeStartIndex,
        stopIndex: rangeStopIndex
      });

      rangeStartIndex = rangeStopIndex = null;
    }
  }

  if (rangeStopIndex !== null) {
    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  return unloadedRanges;
}
},{"react":undefined,"react-addons-shallow-compare":27}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteLoader = exports.default = undefined;

var _InfiniteLoader2 = require('./InfiniteLoader');

var _InfiniteLoader3 = _interopRequireDefault(_InfiniteLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InfiniteLoader3.default;
exports.InfiniteLoader = _InfiniteLoader3.default;
},{"./InfiniteLoader":43}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */

var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollSync).call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollSync, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var clientHeight = _state.clientHeight;
      var clientWidth = _state.clientWidth;
      var scrollHeight = _state.scrollHeight;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;
      var scrollWidth = _state.scrollWidth;


      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight;
      var clientWidth = _ref.clientWidth;
      var scrollHeight = _ref.scrollHeight;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var scrollWidth = _ref.scrollWidth;

      this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
    }
  }]);

  return ScrollSync;
}(_react.Component);

ScrollSync.propTypes = {
  /**
   * Function respondible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
};
exports.default = ScrollSync;
},{"react":undefined,"react-addons-shallow-compare":27}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSync = exports.default = undefined;

var _ScrollSync2 = require('./ScrollSync');

var _ScrollSync3 = _interopRequireDefault(_ScrollSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollSync3.default;
exports.ScrollSync = _ScrollSync3.default;
},{"./ScrollSync":45}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  _createClass(VirtualScroll, [{
    key: 'recomputeRowHeights',


    /**
     * See Grid#recomputeGridSize
     */
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, {
        ref: 'Grid',
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function renderCell(_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = VirtualScroll;
},{"../Grid":42,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":27}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualScroll = exports.default = undefined;

var _VirtualScroll2 = require('./VirtualScroll');

var _VirtualScroll3 = _interopRequireDefault(_VirtualScroll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualScroll3.default;
exports.VirtualScroll = _VirtualScroll3.default;
},{"./VirtualScroll":47}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrowKeyStepper = require('./ArrowKeyStepper');

Object.defineProperty(exports, 'ArrowKeyStepper', {
  enumerable: true,
  get: function get() {
    return _ArrowKeyStepper.ArrowKeyStepper;
  }
});

var _AutoSizer = require('./AutoSizer');

Object.defineProperty(exports, 'AutoSizer', {
  enumerable: true,
  get: function get() {
    return _AutoSizer.AutoSizer;
  }
});

var _ColumnSizer = require('./ColumnSizer');

Object.defineProperty(exports, 'ColumnSizer', {
  enumerable: true,
  get: function get() {
    return _ColumnSizer.ColumnSizer;
  }
});

var _FlexTable = require('./FlexTable');

Object.defineProperty(exports, 'FlexTable', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexTable;
  }
});
Object.defineProperty(exports, 'FlexColumn', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexColumn;
  }
});
Object.defineProperty(exports, 'SortDirection', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortDirection;
  }
});
Object.defineProperty(exports, 'SortIndicator', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortIndicator;
  }
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _Grid.Grid;
  }
});

var _InfiniteLoader = require('./InfiniteLoader');

Object.defineProperty(exports, 'InfiniteLoader', {
  enumerable: true,
  get: function get() {
    return _InfiniteLoader.InfiniteLoader;
  }
});

var _ScrollSync = require('./ScrollSync');

Object.defineProperty(exports, 'ScrollSync', {
  enumerable: true,
  get: function get() {
    return _ScrollSync.ScrollSync;
  }
});

var _VirtualScroll = require('./VirtualScroll');

Object.defineProperty(exports, 'VirtualScroll', {
  enumerable: true,
  get: function get() {
    return _VirtualScroll.VirtualScroll;
  }
});
},{"./ArrowKeyStepper":30,"./AutoSizer":32,"./ColumnSizer":34,"./FlexTable":39,"./Grid":42,"./InfiniteLoader":44,"./ScrollSync":46,"./VirtualScroll":48}],50:[function(require,module,exports){
'use strict';

/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
var _window;
if (typeof window !== 'undefined') {
  _window = window;
} else if (typeof self !== 'undefined') {
  _window = self;
} else {
  _window = undefined;
}

var attachEvent = typeof document !== 'undefined' && document.attachEvent;
var stylesCreated = false;

if (!attachEvent) {
  var requestFrame = function () {
    var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
      return _window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  var resetTriggers = function resetTriggers(element) {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };

  var checkTriggers = function checkTriggers(element) {
    return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
  };

  var scrollListener = function scrollListener(e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  };

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

var createStyles = function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  if (attachEvent) element.attachEvent('onresize', fn);else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) element.detachEvent('onresize', fn);else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

module.exports = {
  addResizeListener: addResizeListener,
  removeResizeListener: removeResizeListener
};
},{}],51:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":17}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJpYW52YXVnaG4vRG9jdW1lbnRzL2dpdC9yZWFjdC1zZWxlY3QtYnZhdWdobi9leGFtcGxlcy9zcmMvYXBwLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ2l0aWVzLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ29udHJpYnV0b3JzLmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0N1c3RvbVJlbmRlci5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL011bHRpc2VsZWN0LmpzIiwiL1VzZXJzL2JyaWFudmF1Z2huL0RvY3VtZW50cy9naXQvcmVhY3Qtc2VsZWN0LWJ2YXVnaG4vZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdC5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL1N0YXRlcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL2NpdGllcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL2NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL3N0YXRlcy5qcyIsIi9Vc2Vycy9icmlhbnZhdWdobi9Eb2N1bWVudHMvZ2l0L3JlYWN0LXNlbGVjdC1idmF1Z2huL2V4YW1wbGVzL3NyYy9kYXRhL3VzZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9kb20taGVscGVycy91dGlsL2luRE9NLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCJub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLXJldGluYS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tZDUvbWQ1LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZvcm1hbmNlLW5vdy9saWIvcGVyZm9ybWFuY2Utbm93LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwibm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BcnJvd0tleVN0ZXBwZXIvQXJyb3dLZXlTdGVwcGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXV0b1NpemVyL0F1dG9TaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbHVtblNpemVyL0NvbHVtblNpemVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sdW1uU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvRmxleENvbHVtbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9GbGV4VGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvU29ydERpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9Tb3J0SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvSW5maW5pdGVMb2FkZXIvSW5maW5pdGVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9JbmZpbml0ZUxvYWRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvU2Nyb2xsU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL1ZpcnR1YWxTY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy92ZW5kb3IvZGV0ZWN0RWxlbWVudFJlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvc2hhbGxvd0NvbXBhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDYixjQUFjOzs7O3NDQUVSLDJCQUEyQjs7OzswQ0FDdkIsK0JBQStCOzs7O3NDQUNuQywyQkFBMkI7Ozs7cUNBQzVCLDBCQUEwQjs7Ozt1Q0FDeEIsNEJBQTRCOzs7O2dDQUNuQyxxQkFBcUI7Ozs7Z0NBQ3JCLHFCQUFxQjs7OztBQUV4QyxzQkFBUyxNQUFNLENBQ2Q7OztDQUNDLGtFQUFRLEtBQUssRUFBQyxRQUFR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VUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZ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QUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFDM0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFB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RSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFDNUIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxFQUN2QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUMxQixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxFQUMxQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUMzQixFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsRUFDN0IsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsRUFDOUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUN6QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFDNUIsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsRUFDL0IsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsRUFDbEMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFDM0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDZixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLEVBQ3RDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUMzQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVB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Q0FBQyxFQUFFLEdBQUcsQ0FDVCxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQ2pELEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDeEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDckMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxFQUM5QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFLEVBQ3hELEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFDMUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDckMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcnlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBlc2xpbnQgcmVhY3QvcHJvcC10eXBlczogMCAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmltcG9ydCBDb250cmlidXRvcnMgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycyc7XG5pbXBvcnQgQ3VzdG9tQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cyc7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21SZW5kZXInO1xuaW1wb3J0IE11bHRpc2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9NdWx0aXNlbGVjdCc7XG5pbXBvcnQgTnVtZXJpY1NlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdCc7XG5pbXBvcnQgQ2l0aWVzIGZyb20gJy4vY29tcG9uZW50cy9DaXRpZXMnO1xuaW1wb3J0IFN0YXRlcyBmcm9tICcuL2NvbXBvbmVudHMvU3RhdGVzJztcblxuUmVhY3RET00ucmVuZGVyKFxuXHQ8ZGl2PlxuXHRcdDxDaXRpZXMgbGFiZWw9XCJDaXRpZXNcIiBzZWFyY2hhYmxlIC8+XG5cdFx0PFN0YXRlcyBsYWJlbD1cIlN0YXRlc1wiIHNlYXJjaGFibGUgLz5cblx0XHQ8TXVsdGlzZWxlY3QgbGFiZWw9XCJNdWx0aXNlbGVjdFwiIC8+XG5cdFx0PENvbnRyaWJ1dG9ycyBsYWJlbD1cIkNvbnRyaWJ1dG9ycyAoQXN5bmMpXCIgLz5cblx0XHQ8TnVtZXJpY1NlbGVjdCBsYWJlbD1cIk51bWVyaWMgVmFsdWVzXCIgLz5cblx0XHQ8Q3VzdG9tUmVuZGVyIGxhYmVsPVwiQ3VzdG9tIFJlbmRlciBNZXRob2RzXCIvPlxuXHRcdDxDdXN0b21Db21wb25lbnRzIGxhYmVsPVwiQ3VzdG9tIFBsYWNlaG9sZGVyLCBPcHRpb24gYW5kIFZhbHVlIENvbXBvbmVudHNcIiAvPlxuXHRcdHsvKlxuXHRcdDxTZWxlY3RlZFZhbHVlc0ZpZWxkIGxhYmVsPVwiT3B0aW9uIENyZWF0aW9uICh0YWdzIG1vZGUpXCIgb3B0aW9ucz17RkxBVk9VUlN9IGFsbG93Q3JlYXRlIGhpbnQ9XCJFbnRlciBhIHZhbHVlIHRoYXQncyBOT1QgaW4gdGhlIGxpc3QsIHRoZW4gaGl0IHJldHVyblwiIC8+XG5cdFx0Ki99XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBBdXRvU2l6ZXIsIFZpcnR1YWxTY3JvbGwgfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZCc7XG5cbmNvbnN0IERBVEEgPSByZXF1aXJlKCcuLi9kYXRhL2NpdGllcycpO1xuXG5jb25zdCBPUFRJT05fSEVJR0hUID0gMzU7XG5jb25zdCBNQVhfT1BUSU9OU19IRUlHSFQgPSAyMDA7XG5cbnZhciBDaXRpZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDaXRpZXNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlYXJjaGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbDogJ0NpdGllczonLFxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb3VudHJ5OiAnQVUnLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0c2VhcmNoYWJsZTogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuXHRcdFx0c2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnLFxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxuXHRcdH07XG5cdH0sXG5cdHN3aXRjaENvdW50cnkgKGUpIHtcblx0XHR2YXIgbmV3Q291bnRyeSA9IGUudGFyZ2V0LnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKCdDb3VudHJ5IGNoYW5nZWQgdG8gJyArIG5ld0NvdW50cnkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y291bnRyeTogbmV3Q291bnRyeSxcblx0XHRcdHNlbGVjdFZhbHVlOiBudWxsXG5cdFx0fSk7XG5cdH0sXG5cdHVwZGF0ZVZhbHVlIChuZXdWYWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdTdGF0ZSBjaGFuZ2VkIHRvICcgKyBuZXdWYWx1ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWVcblx0XHR9KTtcblx0fSxcblx0Zm9jdXNTdGF0ZVNlbGVjdCAoKSB7XG5cdFx0dGhpcy5yZWZzLnN0YXRlU2VsZWN0LmZvY3VzKCk7XG5cdH0sXG5cdHRvZ2dsZUNoZWNrYm94IChlKSB7XG5cdFx0bGV0IG5ld1N0YXRlID0ge307XG5cdFx0bmV3U3RhdGVbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuXHR9LFxuXHRyZW5kZXJNZW51KHsgZm9jdXNlZE9wdGlvbiwgZm9jdXNPcHRpb24sIG9wdGlvbnMsIHNlbGVjdFZhbHVlLCB2YWx1ZUFycmF5IH0pIHtcblx0XHRjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSBvcHRpb25zLmluZGV4T2YoZm9jdXNlZE9wdGlvbik7XG5cdFx0Y29uc3QgaGVpZ2h0ID0gTWF0aC5taW4oTUFYX09QVElPTlNfSEVJR0hULCBvcHRpb25zLmxlbmd0aCAqIE9QVElPTl9IRUlHSFQpO1xuXG5cdFx0cmV0dXJuIChcbiAgICAgIDxBdXRvU2l6ZXIgZGlzYWJsZUhlaWdodD5cbiAgICAgICAgeyh7IHdpZHRoIH0pID0+IChcbiAgICAgICAgICA8VmlydHVhbFNjcm9sbFxuICAgICAgICAgICAgcmVmPVwiVmlydHVhbFNjcm9sbFwiXG4gICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICAgIHJvd0hlaWdodD17T1BUSU9OX0hFSUdIVH1cbiAgICAgICAgICAgIHJvd1JlbmRlcmVyPXsoaW5kZXgpID0+IChcbiAgICAgICAgICAgIFx0PGRpdlxuICAgICAgICAgICAgXHRcdG9uTW91c2VPdmVyPXsoKSA9PiBmb2N1c09wdGlvbihvcHRpb25zW2luZGV4XSl9XG4gICAgICAgICAgICBcdFx0b25DbGljaz17KCkgPT4gc2VsZWN0VmFsdWUob3B0aW9uc1tpbmRleF0pfVxuICAgICAgICAgICAgXHRcdHN0eWxlPXt7XG4gICAgICAgICAgICBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnNbaW5kZXhdID09PSBmb2N1c2VkT3B0aW9uID8gJyNlZWUnIDogJyNmZmYnLFxuICAgICAgICAgICAgXHRcdFx0aGVpZ2h0OiBPUFRJT05fSEVJR0hULFxuICAgICAgICAgICAgXHRcdFx0ZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgXHRcdFx0YWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBcdFx0XHRwYWRkaW5nOiAnMCAuNXJlbSdcbiAgICAgICAgICAgIFx0XHR9fVxuICAgICAgICAgICAgXHQ+XG4gICAgICAgICAgICBcdFx0e29wdGlvbnNbaW5kZXhdLm5hbWV9XG4gICAgICAgICAgICBcdDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHJvd3NDb3VudD17b3B0aW9ucy5sZW5ndGh9XG4gICAgICAgICAgICBzY3JvbGxUb0luZGV4PXtmb2N1c2VkT3B0aW9uSW5kZXh9XG4gICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvQXV0b1NpemVyPlxuXHRcdCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSBEQVRBLkNJVElFUztcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj5Xb3JsZCdzIExhcmdlc3QgQ2l0aWVzPC9oMz5cblx0XHRcdFx0PFNlbGVjdCByZWY9XCJzdGF0ZVNlbGVjdFwiXG5cdFx0XHRcdFx0YXV0b2ZvY3VzXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdGNsZWFyYWJsZT17dGhpcy5zdGF0ZS5jbGVhcmFibGV9XG5cdFx0XHRcdFx0bmFtZT1cInNlbGVjdGVkLXN0YXRlXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX1cblx0XHRcdFx0XHRzZWFyY2hhYmxlPXt0aGlzLnN0YXRlLnNlYXJjaGFibGV9XG5cdFx0XHRcdFx0bGFiZWxLZXk9XCJuYW1lXCJcblx0XHRcdFx0XHR2YWx1ZUtleT1cIm5hbWVcIlxuXHRcdFx0XHRcdHJlbmRlck1lbnU9e3RoaXMucmVuZGVyTWVudX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2l0aWVzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBDT05UUklCVVRPUlMgPSByZXF1aXJlKCcuLi9kYXRhL2NvbnRyaWJ1dG9ycycpO1xuY29uc3QgTUFYX0NPTlRSSUJVVE9SUyA9IDY7XG5jb25zdCBBU1lOQ19ERUxBWSA9IDUwMDtcblxuY29uc3QgQ29udHJpYnV0b3JzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0NvbnRyaWJ1dG9ycycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHRcdHZhbHVlOiBbQ09OVFJJQlVUT1JTWzBdXSxcblx0XHR9O1xuXHR9LFxuXHRvbkNoYW5nZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9NdWx0aSAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHRcdHZhbHVlOiBbdGhpcy5zdGF0ZS52YWx1ZV0sXG5cdFx0fSk7XG5cdH0sXG5cdHN3aXRjaFRvU2luZ2xlICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlWzBdLFxuXHRcdH0pO1xuXHR9LFxuXHRnZXRDb250cmlidXRvcnMgKGlucHV0LCBjYWxsYmFjaykge1xuXHRcdGlucHV0ID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcblx0XHR2YXIgb3B0aW9ucyA9IENPTlRSSUJVVE9SUy5maWx0ZXIoaSA9PiB7XG5cdFx0XHRyZXR1cm4gaS5naXRodWIuc3Vic3RyKDAsIGlucHV0Lmxlbmd0aCkgPT09IGlucHV0O1xuXHRcdH0pO1xuXHRcdHZhciBkYXRhID0ge1xuXHRcdFx0b3B0aW9uczogb3B0aW9ucy5zbGljZSgwLCBNQVhfQ09OVFJJQlVUT1JTKSxcblx0XHRcdGNvbXBsZXRlOiBvcHRpb25zLmxlbmd0aCA8PSBNQVhfQ09OVFJJQlVUT1JTLFxuXHRcdH07XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuXHRcdH0sIEFTWU5DX0RFTEFZKTtcblx0fSxcblx0Z290b0NvbnRyaWJ1dG9yICh2YWx1ZSwgZXZlbnQpIHtcblx0XHR3aW5kb3cub3BlbignaHR0cHM6Ly9naXRodWIuY29tLycgKyB2YWx1ZS5naXRodWIpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QuQXN5bmMgbXVsdGk9e3RoaXMuc3RhdGUubXVsdGl9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gb25WYWx1ZUNsaWNrPXt0aGlzLmdvdG9Db250cmlidXRvcn0gdmFsdWVLZXk9XCJnaXRodWJcIiBsYWJlbEtleT1cIm5hbWVcIiBsb2FkT3B0aW9ucz17dGhpcy5nZXRDb250cmlidXRvcnN9IC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm11bHRpfSBvbkNoYW5nZT17dGhpcy5zd2l0Y2hUb011bHRpfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk11bHRpc2VsZWN0PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9eyF0aGlzLnN0YXRlLm11bHRpfSBvbkNoYW5nZT17dGhpcy5zd2l0Y2hUb1NpbmdsZX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5TaW5nbGUgVmFsdWU8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZXhhbXBsZSBpbXBsZW1lbnRzIGN1c3RvbSBsYWJlbCBhbmQgdmFsdWUgcHJvcGVydGllcywgYXN5bmMgb3B0aW9ucyBhbmQgb3BlbnMgdGhlIGdpdGh1YiBwcm9maWxlcyBpbiBhIG5ldyB3aW5kb3cgd2hlbiB2YWx1ZXMgYXJlIGNsaWNrZWQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyaWJ1dG9ycztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgR3JhdmF0YXIgZnJvbSAncmVhY3QtZ3JhdmF0YXInO1xuXG5jb25zdCBVU0VSUyA9IHJlcXVpcmUoJy4uL2RhdGEvdXNlcnMnKTtcbmNvbnN0IEdSQVZBVEFSX1NJWkUgPSAxNTtcblxuY29uc3QgR3JhdmF0YXJPcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMubm9kZSxcblx0XHRjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aXNEaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0aXNGb2N1c2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRpc1NlbGVjdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRvbkZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvblNlbGVjdDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0b25VbmZvY3VzOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvcHRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0fSxcblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZUVudGVyIChldmVudCkge1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuaXNGb2N1c2VkKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy5vbkZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdGhhbmRsZU1vdXNlTGVhdmUgKGV2ZW50KSB7XG5cdFx0dGhpcy5wcm9wcy5vblVuZm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRsZXQgZ3JhdmF0YXJTdHlsZSA9IHtcblx0XHRcdGJvcmRlclJhZGl1czogMyxcblx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0bWFyZ2luUmlnaHQ6IDEwLFxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0XHR0b3A6IC0yLFxuXHRcdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXG5cdFx0fTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfVxuXHRcdFx0XHRvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG5cdFx0XHRcdG9uTW91c2VFbnRlcj17dGhpcy5oYW5kbGVNb3VzZUVudGVyfVxuXHRcdFx0XHRvbk1vdXNlTW92ZT17dGhpcy5oYW5kbGVNb3VzZU1vdmV9XG5cdFx0XHRcdG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfVxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy5vcHRpb24udGl0bGV9PlxuXHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMub3B0aW9uLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgR3JhdmF0YXJWYWx1ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlXCIgdGl0bGU9e3RoaXMucHJvcHMudmFsdWUudGl0bGV9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtbGFiZWxcIj5cblx0XHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMudmFsdWUuZW1haWx9IHNpemU9e0dSQVZBVEFSX1NJWkV9IHN0eWxlPXtncmF2YXRhclN0eWxlfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgVXNlcnNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0aGludDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgcGxhY2Vob2xkZXIgPSA8c3Bhbj4mIzk3ODY7IFNlbGVjdCBVc2VyPC9zcGFuPjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ9e0dyYXZhdGFyT3B0aW9ufVxuXHRcdFx0XHRcdG9wdGlvbnM9e1VTRVJTfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZUNvbXBvbmVudD17R3JhdmF0YXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5cblx0XHRcdFx0XHRUaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gT3B0aW9uIGFuZCBWYWx1ZSBjb21wb25lbnRzIHRvIHJlbmRlciBhIEdyYXZhdGFyIGltYWdlIGZvciBlYWNoIHVzZXIgYmFzZWQgb24gdGhlaXIgZW1haWwuXG5cdFx0XHRcdFx0SXQgYWxzbyBkZW1vbnN0cmF0ZXMgcmVuZGVyaW5nIEhUTUwgZWxlbWVudHMgYXMgdGhlIHBsYWNlaG9sZGVyLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG52YXIgRGlzYWJsZWRVcHNlbGxPcHRpb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0Rpc2FibGVkVXBzZWxsT3B0aW9ucycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdTdXBwb3J0IGxldmVsIHNlbGVjdGVkOicsIHZhbHVlLmxhYmVsKTtcblx0fSxcblx0cmVuZGVyTGluazogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIDxhIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDUgfX0gaHJlZj1cIi91cGdyYWRlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VXBncmFkZSBoZXJlITwvYT47XG5cdH0sXG5cdHJlbmRlck9wdGlvbjogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBvcHRpb24uY29sb3IgfX0+e29wdGlvbi5sYWJlbH0ge29wdGlvbi5saW5rfTwvc3Bhbj47XG5cdH0sXG5cdHJlbmRlclZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gPHN0cm9uZyBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmNvbG9yIH19PntvcHRpb24ubGFiZWx9PC9zdHJvbmc+O1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHRpb25zID0gW1xuXHRcdFx0eyBsYWJlbDogJ0Jhc2ljIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ2Jhc2ljJywgY29sb3I6ICcjRTMxODY0JyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ByZW1pdW0gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJlbWl1bScsIGNvbG9yOiAnIzYyMTZBMycgfSxcblx0XHRcdHsgbGFiZWw6ICdQcm8gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJvJywgZGlzYWJsZWQ6IHRydWUsIGxpbms6IHRoaXMucmVuZGVyTGluaygpIH0sXG5cdFx0XTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBzdXBwb3J0IGxldmVsXCJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyPXt0aGlzLnJlbmRlck9wdGlvbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZVJlbmRlcmVyPXt0aGlzLnJlbmRlclZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZGVtb25zdGF0ZXMgY3VzdG9tIHJlbmRlciBtZXRob2RzIGFuZCBsaW5rcyBpbiBkaXNhYmxlZCBvcHRpb25zPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGlzYWJsZWRVcHNlbGxPcHRpb25zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgRkxBVk9VUlMgPSBbXG5cdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0eyBsYWJlbDogJ1ZhbmlsbGEnLCB2YWx1ZTogJ3ZhbmlsbGEnIH0sXG5cdHsgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9LFxuXHR7IGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcblx0eyBsYWJlbDogJ0Nvb2tpZXMgYW5kIENyZWFtJywgdmFsdWU6ICdjb29raWVzY3JlYW0nIH0sXG5cdHsgbGFiZWw6ICdQZXBwZXJtaW50JywgdmFsdWU6ICdwZXBwZXJtaW50JyB9LFxuXTtcblxuY29uc3QgV0hZX1dPVUxEX1lPVSA9IFtcblx0eyBsYWJlbDogJ0Nob2NvbGF0ZSAoYXJlIHlvdSBjcmF6eT8pJywgdmFsdWU6ICdjaG9jb2xhdGUnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuXS5jb25jYXQoRkxBVk9VUlMuc2xpY2UoMSkpO1xuXG52YXIgTXVsdGlTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdNdWx0aVNlbGVjdEZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdGNyYXp5OiBmYWxzZSxcblx0XHRcdG9wdGlvbnM6IEZMQVZPVVJTLFxuXHRcdFx0dmFsdWU6IFtdLFxuXHRcdH07XG5cdH0sXG5cdGhhbmRsZVNlbGVjdENoYW5nZSAodmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnWW91XFwndmUgc2VsZWN0ZWQ6JywgdmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0dG9nZ2xlRGlzYWJsZWQgKGUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGlzYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG5cdH0sXG5cdHRvZ2dsZUNob2NvbGF0ZSAoZSkge1xuXHRcdGxldCBjcmF6eSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjcmF6eTogY3JhenksXG5cdFx0XHRvcHRpb25zOiBjcmF6eSA/IFdIWV9XT1VMRF9ZT1UgOiBGTEFWT1VSUyxcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0IG11bHRpIHNpbXBsZVZhbHVlIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gcGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBmYXZvdXJpdGUocylcIiBvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdENoYW5nZX0gLz5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlRGlzYWJsZWR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkRpc2FibGUgdGhlIGNvbnRyb2w8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jcmF6eX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hvY29sYXRlfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5JIGRvbid0IGxpa2UgQ2hvY29sYXRlIChkaXNhYmxlZCB0aGUgb3B0aW9uKTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpU2VsZWN0RmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG52YXIgVmFsdWVzQXNOdW1iZXJzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnVmFsdWVzQXNOdW1iZXJzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHsgdmFsdWU6IDEwLCBsYWJlbDogJ1RlbicgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTEsIGxhYmVsOiAnRWxldmVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMiwgbGFiZWw6ICdUd2VsdmUnIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDIzLCBsYWJlbDogJ1R3ZW50eS10aHJlZScgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjQsIGxhYmVsOiAnVHdlbnR5LWZvdXInIH1cblx0XHRcdF0sXG5cdFx0XHRtYXRjaFBvczogJ2FueScsXG5cdFx0XHRtYXRjaFZhbHVlOiB0cnVlLFxuXHRcdFx0bWF0Y2hMYWJlbDogdHJ1ZSxcblx0XHRcdHZhbHVlOiBudWxsLFxuXHRcdFx0bXVsdGk6IGZhbHNlXG5cdFx0fTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaFN0YXJ0KGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaFBvczogZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyAnc3RhcnQnIDogJ2FueSdcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaFZhbHVlKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaFZhbHVlOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoTGFiZWwoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoTGFiZWw6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdOdW1lcmljIFNlbGVjdCB2YWx1ZSBjaGFuZ2VkIHRvJywgdmFsdWUpO1xuXHR9LFxuXHRvbkNoYW5nZU11bHRpKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtdWx0aTogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgbWF0Y2hQcm9wID0gJ2FueSc7XG5cdFx0aWYgKHRoaXMuc3RhdGUubWF0Y2hMYWJlbCAmJiAhdGhpcy5zdGF0ZS5tYXRjaFZhbHVlKSB7XG5cdFx0XHRtYXRjaFByb3AgPSAnbGFiZWwnO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuc3RhdGUubWF0Y2hMYWJlbCAmJiB0aGlzLnN0YXRlLm1hdGNoVmFsdWUpIHtcblx0XHRcdG1hdGNoUHJvcCA9ICd2YWx1ZSc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRtYXRjaFBvcz17dGhpcy5zdGF0ZS5tYXRjaFBvc31cblx0XHRcdFx0XHRtYXRjaFByb3A9e21hdGNoUHJvcH1cblx0XHRcdFx0XHRtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9XG5cdFx0XHRcdFx0c2ltcGxlVmFsdWVcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNdWx0aX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGktU2VsZWN0PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hWYWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaFZhbHVlfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NYXRjaCB2YWx1ZSBvbmx5PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hMYWJlbH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaExhYmVsfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NYXRjaCBsYWJlbCBvbmx5PC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hQb3MgPT09ICdzdGFydCd9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hTdGFydH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+T25seSBpbmNsdWRlIG1hdGNoZXMgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZzwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIHVzZXMgc2ltcGxlIG51bWVyaWMgdmFsdWVzPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZXNBc051bWJlcnNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IFNUQVRFUyA9IHJlcXVpcmUoJy4uL2RhdGEvc3RhdGVzJyk7XG5cbnZhciBTdGF0ZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdTdGF0ZXNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlYXJjaGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbDogJ1N0YXRlczonLFxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb3VudHJ5OiAnQVUnLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0c2VhcmNoYWJsZTogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuXHRcdFx0c2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnLFxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxuXHRcdH07XG5cdH0sXG5cdHN3aXRjaENvdW50cnkgKGUpIHtcblx0XHR2YXIgbmV3Q291bnRyeSA9IGUudGFyZ2V0LnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKCdDb3VudHJ5IGNoYW5nZWQgdG8gJyArIG5ld0NvdW50cnkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y291bnRyeTogbmV3Q291bnRyeSxcblx0XHRcdHNlbGVjdFZhbHVlOiBudWxsXG5cdFx0fSk7XG5cdH0sXG5cdHVwZGF0ZVZhbHVlIChuZXdWYWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdTdGF0ZSBjaGFuZ2VkIHRvICcgKyBuZXdWYWx1ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWVcblx0XHR9KTtcblx0fSxcblx0Zm9jdXNTdGF0ZVNlbGVjdCAoKSB7XG5cdFx0dGhpcy5yZWZzLnN0YXRlU2VsZWN0LmZvY3VzKCk7XG5cdH0sXG5cdHRvZ2dsZUNoZWNrYm94IChlKSB7XG5cdFx0bGV0IG5ld1N0YXRlID0ge307XG5cdFx0bmV3U3RhdGVbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHRpb25zID0gU1RBVEVTW3RoaXMuc3RhdGUuY291bnRyeV07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdCByZWY9XCJzdGF0ZVNlbGVjdFwiIGF1dG9mb2N1cyBvcHRpb25zPXtvcHRpb25zfSBzaW1wbGVWYWx1ZSBjbGVhcmFibGU9e3RoaXMuc3RhdGUuY2xlYXJhYmxlfSBuYW1lPVwic2VsZWN0ZWQtc3RhdGVcIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfSBzZWFyY2hhYmxlPXt0aGlzLnN0YXRlLnNlYXJjaGFibGV9IC8+XG5cblx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IDE0IH19PlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuZm9jdXNTdGF0ZVNlbGVjdH0+Rm9jdXMgU2VsZWN0PC9idXR0b24+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJzZWFyY2hhYmxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5zZWFyY2hhYmxlfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5TZWFyY2hhYmxlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJkaXNhYmxlZFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkRpc2FibGVkPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJjbGVhcmFibGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNsZWFyYWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+Q2xlYXJhYmxlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jb3VudHJ5ID09PSAnQVUnfSB2YWx1ZT1cIkFVXCIgb25DaGFuZ2U9e3RoaXMuc3dpdGNoQ291bnRyeX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5BdXN0cmFsaWE8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jb3VudHJ5ID09PSAnVVMnfSB2YWx1ZT1cIlVTXCIgb25DaGFuZ2U9e3RoaXMuc3dpdGNoQ291bnRyeX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5Vbml0ZWQgU3RhdGVzPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZXNGaWVsZDtcbiIsImV4cG9ydHMuQ0lUSUVTID0gW1xuICB7IG5hbWU6ICdBYmlsZW5lJyB9LFxuICB7IG5hbWU6ICdBZGRpc29uJyB9LFxuICB7IG5hbWU6ICdBa3JvbicgfSxcbiAgeyBuYW1lOiAnQWxhbWVkYScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxidXF1ZXJxdWUnIH0sXG4gIHsgbmFtZTogJ0FsZXhhbmRyaWEnIH0sXG4gIHsgbmFtZTogJ0FsZXhhbmRyaWEnIH0sXG4gIHsgbmFtZTogJ0FsaGFtYnJhJyB9LFxuICB7IG5hbWU6ICdBbGlzbyBWaWVqbycgfSxcbiAgeyBuYW1lOiAnQWxsZW4nIH0sXG4gIHsgbmFtZTogJ0FsbGVudG93bicgfSxcbiAgeyBuYW1lOiAnQWxwaGFyZXR0YScgfSxcbiAgeyBuYW1lOiAnQWx0YW1vbnRlIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0FsdG9vbmEnIH0sXG4gIHsgbmFtZTogJ0FtYXJpbGxvJyB9LFxuICB7IG5hbWU6ICdBbWVzJyB9LFxuICB7IG5hbWU6ICdBbmFoZWltJyB9LFxuICB7IG5hbWU6ICdBbmNob3JhZ2UnIH0sXG4gIHsgbmFtZTogJ0FuZGVyc29uJyB9LFxuICB7IG5hbWU6ICdBbmtlbnknIH0sXG4gIHsgbmFtZTogJ0FubiBBcmJvcicgfSxcbiAgeyBuYW1lOiAnQW5uYXBvbGlzJyB9LFxuICB7IG5hbWU6ICdBbnRpb2NoJyB9LFxuICB7IG5hbWU6ICdBcGFjaGUgSnVuY3Rpb24nIH0sXG4gIHsgbmFtZTogJ0FwZXgnIH0sXG4gIHsgbmFtZTogJ0Fwb3BrYScgfSxcbiAgeyBuYW1lOiAnQXBwbGUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdBcHBsZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0FwcGxldG9uJyB9LFxuICB7IG5hbWU6ICdBcmNhZGlhJyB9LFxuICB7IG5hbWU6ICdBcmxpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0FybGluZ3RvbiBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdBcnZhZGEnIH0sXG4gIHsgbmFtZTogJ0FzaGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnQXRoZW5zLUNsYXJrZSBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0F0bGFudGEnIH0sXG4gIHsgbmFtZTogJ0F0bGFudGljIENpdHknIH0sXG4gIHsgbmFtZTogJ0F0dGxlYm9ybycgfSxcbiAgeyBuYW1lOiAnQXVidXJuJyB9LFxuICB7IG5hbWU6ICdBdWJ1cm4nIH0sXG4gIHsgbmFtZTogJ0F1Z3VzdGEtUmljaG1vbmQgQ291bnR5JyB9LFxuICB7IG5hbWU6ICdBdXJvcmEnIH0sXG4gIHsgbmFtZTogJ0F1cm9yYScgfSxcbiAgeyBuYW1lOiAnQXVzdGluJyB9LFxuICB7IG5hbWU6ICdBdmVudHVyYScgfSxcbiAgeyBuYW1lOiAnQXZvbmRhbGUnIH0sXG4gIHsgbmFtZTogJ0F6dXNhJyB9LFxuICB7IG5hbWU6ICdCYWtlcnNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQmFsZHdpbiBQYXJrJyB9LFxuICB7IG5hbWU6ICdCYWx0aW1vcmUnIH0sXG4gIHsgbmFtZTogJ0Jhcm5zdGFibGUgVG93bicgfSxcbiAgeyBuYW1lOiAnQmFydGxldHQnIH0sXG4gIHsgbmFtZTogJ0JhcnRsZXR0JyB9LFxuICB7IG5hbWU6ICdCYXRvbiBSb3VnZScgfSxcbiAgeyBuYW1lOiAnQmF0dGxlIENyZWVrJyB9LFxuICB7IG5hbWU6ICdCYXlvbm5lJyB9LFxuICB7IG5hbWU6ICdCYXl0b3duJyB9LFxuICB7IG5hbWU6ICdCZWF1bW9udCcgfSxcbiAgeyBuYW1lOiAnQmVhdW1vbnQnIH0sXG4gIHsgbmFtZTogJ0JlYXZlcmNyZWVrJyB9LFxuICB7IG5hbWU6ICdCZWF2ZXJ0b24nIH0sXG4gIHsgbmFtZTogJ0JlZGZvcmQnIH0sXG4gIHsgbmFtZTogJ0JlbGwgR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnQmVsbGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnQmVsbGV2dWUnIH0sXG4gIHsgbmFtZTogJ0JlbGxldnVlJyB9LFxuICB7IG5hbWU6ICdCZWxsZmxvd2VyJyB9LFxuICB7IG5hbWU6ICdCZWxsaW5naGFtJyB9LFxuICB7IG5hbWU6ICdCZWxvaXQnIH0sXG4gIHsgbmFtZTogJ0JlbmQnIH0sXG4gIHsgbmFtZTogJ0JlbnRvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdCZXJrZWxleScgfSxcbiAgeyBuYW1lOiAnQmVyd3luJyB9LFxuICB7IG5hbWU6ICdCZXRobGVoZW0nIH0sXG4gIHsgbmFtZTogJ0JldmVybHknIH0sXG4gIHsgbmFtZTogJ0JpbGxpbmdzJyB9LFxuICB7IG5hbWU6ICdCaWxveGknIH0sXG4gIHsgbmFtZTogJ0JpbmdoYW10b24nIH0sXG4gIHsgbmFtZTogJ0Jpcm1pbmdoYW0nIH0sXG4gIHsgbmFtZTogJ0Jpc21hcmNrJyB9LFxuICB7IG5hbWU6ICdCbGFja3NidXJnJyB9LFxuICB7IG5hbWU6ICdCbGFpbmUnIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0JsdWUgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQm9jYSBSYXRvbicgfSxcbiAgeyBuYW1lOiAnQm9pc2UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQm9saW5nYnJvb2snIH0sXG4gIHsgbmFtZTogJ0Jvbml0YSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdCb3NzaWVyIENpdHknIH0sXG4gIHsgbmFtZTogJ0Jvc3RvbicgfSxcbiAgeyBuYW1lOiAnQm91bGRlcicgfSxcbiAgeyBuYW1lOiAnQm91bnRpZnVsJyB9LFxuICB7IG5hbWU6ICdCb3dpZScgfSxcbiAgeyBuYW1lOiAnQm93bGluZyBHcmVlbicgfSxcbiAgeyBuYW1lOiAnQm95bnRvbiBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnQm96ZW1hbicgfSxcbiAgeyBuYW1lOiAnQnJhZGVudG9uJyB9LFxuICB7IG5hbWU6ICdCcmVhJyB9LFxuICB7IG5hbWU6ICdCcmVtZXJ0b24nIH0sXG4gIHsgbmFtZTogJ0JyZW50d29vZCcgfSxcbiAgeyBuYW1lOiAnQnJlbnR3b29kJyB9LFxuICB7IG5hbWU6ICdCcmlkZ2Vwb3J0JyB9LFxuICB7IG5hbWU6ICdCcmlzdG9sJyB9LFxuICB7IG5hbWU6ICdCcm9ja3RvbicgfSxcbiAgeyBuYW1lOiAnQnJva2VuIEFycm93JyB9LFxuICB7IG5hbWU6ICdCcm9va2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdCcm9va2hhdmVuJyB9LFxuICB7IG5hbWU6ICdCcm9va2x5biBQYXJrJyB9LFxuICB7IG5hbWU6ICdCcm9vbWZpZWxkJyB9LFxuICB7IG5hbWU6ICdCcm93bnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQnJ5YW4nIH0sXG4gIHsgbmFtZTogJ0J1Y2tleWUnIH0sXG4gIHsgbmFtZTogJ0J1ZW5hIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0J1ZmZhbG8nIH0sXG4gIHsgbmFtZTogJ0J1ZmZhbG8gR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0J1bGxoZWFkIENpdHknIH0sXG4gIHsgbmFtZTogJ0J1cmJhbmsnIH0sXG4gIHsgbmFtZTogJ0J1cmllbicgfSxcbiAgeyBuYW1lOiAnQnVybGVzb24nIH0sXG4gIHsgbmFtZTogJ0J1cmxpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0J1cmxpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0J1cm5zdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NhbGR3ZWxsJyB9LFxuICB7IG5hbWU6ICdDYWxleGljbycgfSxcbiAgeyBuYW1lOiAnQ2FsdW1ldCBDaXR5JyB9LFxuICB7IG5hbWU6ICdDYW1hcmlsbG8nIH0sXG4gIHsgbmFtZTogJ0NhbWJyaWRnZScgfSxcbiAgeyBuYW1lOiAnQ2FtZGVuJyB9LFxuICB7IG5hbWU6ICdDYW1wYmVsbCcgfSxcbiAgeyBuYW1lOiAnQ2FudG9uJyB9LFxuICB7IG5hbWU6ICdDYXBlIENvcmFsJyB9LFxuICB7IG5hbWU6ICdDYXBlIEdpcmFyZGVhdScgfSxcbiAgeyBuYW1lOiAnQ2FybHNiYWQnIH0sXG4gIHsgbmFtZTogJ0Nhcm1lbCcgfSxcbiAgeyBuYW1lOiAnQ2Fyb2wgU3RyZWFtJyB9LFxuICB7IG5hbWU6ICdDYXJwZW50ZXJzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NhcnJvbGx0b24nIH0sXG4gIHsgbmFtZTogJ0NhcnNvbicgfSxcbiAgeyBuYW1lOiAnQ2Fyc29uIENpdHknIH0sXG4gIHsgbmFtZTogJ0NhcnknIH0sXG4gIHsgbmFtZTogJ0Nhc2EgR3JhbmRlJyB9LFxuICB7IG5hbWU6ICdDYXNwZXInIH0sXG4gIHsgbmFtZTogJ0Nhc3RsZSBSb2NrJyB9LFxuICB7IG5hbWU6ICdDYXRoZWRyYWwgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0NlZGFyIEhpbGwnIH0sXG4gIHsgbmFtZTogJ0NlZGFyIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0NlZGFyIFJhcGlkcycgfSxcbiAgeyBuYW1lOiAnQ2VudGVubmlhbCcgfSxcbiAgeyBuYW1lOiAnQ2VyZXMnIH0sXG4gIHsgbmFtZTogJ0NlcnJpdG9zJyB9LFxuICB7IG5hbWU6ICdDaGFtcGFpZ24nIH0sXG4gIHsgbmFtZTogJ0NoYW5kbGVyJyB9LFxuICB7IG5hbWU6ICdDaGFwZWwgSGlsbCcgfSxcbiAgeyBuYW1lOiAnQ2hhcmxlc3RvbicgfSxcbiAgeyBuYW1lOiAnQ2hhcmxlc3RvbicgfSxcbiAgeyBuYW1lOiAnQ2hhcmxvdHRlJyB9LFxuICB7IG5hbWU6ICdDaGFybG90dGVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NoYXR0YW5vb2dhJyB9LFxuICB7IG5hbWU6ICdDaGVsc2VhJyB9LFxuICB7IG5hbWU6ICdDaGVzYXBlYWtlJyB9LFxuICB7IG5hbWU6ICdDaGVzdGVyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0NoZXllbm5lJyB9LFxuICB7IG5hbWU6ICdDaGljYWdvJyB9LFxuICB7IG5hbWU6ICdDaGljbycgfSxcbiAgeyBuYW1lOiAnQ2hpY29wZWUnIH0sXG4gIHsgbmFtZTogJ0NoaW5vJyB9LFxuICB7IG5hbWU6ICdDaGlubyBIaWxscycgfSxcbiAgeyBuYW1lOiAnQ2h1bGEgVmlzdGEnIH0sXG4gIHsgbmFtZTogJ0NpY2VybycgfSxcbiAgeyBuYW1lOiAnQ2luY2lubmF0aScgfSxcbiAgeyBuYW1lOiAnQ2l0cnVzIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0NsYXJrc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDbGVhcndhdGVyJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCcgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0NsaWZ0b24nIH0sXG4gIHsgbmFtZTogJ0Nsb3ZpcycgfSxcbiAgeyBuYW1lOiAnQ2xvdmlzJyB9LFxuICB7IG5hbWU6ICdDb2FjaGVsbGEnIH0sXG4gIHsgbmFtZTogJ0NvY29udXQgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0NvZXVyIGRcXCdBbGVuZScgfSxcbiAgeyBuYW1lOiAnQ29sbGVnZSBTdGF0aW9uJyB9LFxuICB7IG5hbWU6ICdDb2xsaWVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NvbG9yYWRvIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0NvbHRvbicgfSxcbiAgeyBuYW1lOiAnQ29sdW1iaWEnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYmlhJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb21tZXJjZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdDb21wdG9uJyB9LFxuICB7IG5hbWU6ICdDb25jb3JkJyB9LFxuICB7IG5hbWU6ICdDb25jb3JkJyB9LFxuICB7IG5hbWU6ICdDb25jb3JkJyB9LFxuICB7IG5hbWU6ICdDb25yb2UnIH0sXG4gIHsgbmFtZTogJ0NvbndheScgfSxcbiAgeyBuYW1lOiAnQ29vbiBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0NvcHBlbGwnIH0sXG4gIHsgbmFtZTogJ0NvcmFsIEdhYmxlcycgfSxcbiAgeyBuYW1lOiAnQ29yYWwgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQ29yb25hJyB9LFxuICB7IG5hbWU6ICdDb3JwdXMgQ2hyaXN0aScgfSxcbiAgeyBuYW1lOiAnQ29ydmFsbGlzJyB9LFxuICB7IG5hbWU6ICdDb3N0YSBNZXNhJyB9LFxuICB7IG5hbWU6ICdDb3VuY2lsIEJsdWZmcycgfSxcbiAgeyBuYW1lOiAnQ292aW5hJyB9LFxuICB7IG5hbWU6ICdDb3Zpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0NyYW5zdG9uJyB9LFxuICB7IG5hbWU6ICdDcnlzdGFsIExha2UnIH0sXG4gIHsgbmFtZTogJ0N1bHZlciBDaXR5JyB9LFxuICB7IG5hbWU6ICdDdXBlcnRpbm8nIH0sXG4gIHsgbmFtZTogJ0N1dGxlciBCYXknIH0sXG4gIHsgbmFtZTogJ0N1eWFob2dhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdDeXByZXNzJyB9LFxuICB7IG5hbWU6ICdEYWxsYXMnIH0sXG4gIHsgbmFtZTogJ0RhbHkgQ2l0eScgfSxcbiAgeyBuYW1lOiAnRGFuYnVyeScgfSxcbiAgeyBuYW1lOiAnRGFudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0RhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEYXZlbnBvcnQnIH0sXG4gIHsgbmFtZTogJ0RhdmllJyB9LFxuICB7IG5hbWU6ICdEYXZpcycgfSxcbiAgeyBuYW1lOiAnRGF5dG9uJyB9LFxuICB7IG5hbWU6ICdEYXl0b25hIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZUthbGInIH0sXG4gIHsgbmFtZTogJ0RlU290bycgfSxcbiAgeyBuYW1lOiAnRGVhcmJvcm4nIH0sXG4gIHsgbmFtZTogJ0RlYXJib3JuIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0RlY2F0dXInIH0sXG4gIHsgbmFtZTogJ0RlY2F0dXInIH0sXG4gIHsgbmFtZTogJ0RlZXJmaWVsZCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVsYW5vJyB9LFxuICB7IG5hbWU6ICdEZWxyYXkgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlbHRvbmEnIH0sXG4gIHsgbmFtZTogJ0RlbnRvbicgfSxcbiAgeyBuYW1lOiAnRGVudmVyJyB9LFxuICB7IG5hbWU6ICdEZXMgTW9pbmVzJyB9LFxuICB7IG5hbWU6ICdEZXMgUGxhaW5lcycgfSxcbiAgeyBuYW1lOiAnRGV0cm9pdCcgfSxcbiAgeyBuYW1lOiAnRGlhbW9uZCBCYXInIH0sXG4gIHsgbmFtZTogJ0RvcmFsJyB9LFxuICB7IG5hbWU6ICdEb3RoYW4nIH0sXG4gIHsgbmFtZTogJ0RvdmVyJyB9LFxuICB7IG5hbWU6ICdEb3duZXJzIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdEb3duZXknIH0sXG4gIHsgbmFtZTogJ0RyYXBlcicgfSxcbiAgeyBuYW1lOiAnRHVibGluJyB9LFxuICB7IG5hbWU6ICdEdWJsaW4nIH0sXG4gIHsgbmFtZTogJ0R1YnVxdWUnIH0sXG4gIHsgbmFtZTogJ0R1bHV0aCcgfSxcbiAgeyBuYW1lOiAnRHVuY2FudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0R1bndvb2R5JyB9LFxuICB7IG5hbWU6ICdEdXJoYW0nIH0sXG4gIHsgbmFtZTogJ0VhZ2FuJyB9LFxuICB7IG5hbWU6ICdFYXN0IExhbnNpbmcnIH0sXG4gIHsgbmFtZTogJ0Vhc3QgT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdFYXN0IFByb3ZpZGVuY2UnIH0sXG4gIHsgbmFtZTogJ0Vhc3R2YWxlJyB9LFxuICB7IG5hbWU6ICdFYXUgQ2xhaXJlJyB9LFxuICB7IG5hbWU6ICdFZGVuIFByYWlyaWUnIH0sXG4gIHsgbmFtZTogJ0VkaW5hJyB9LFxuICB7IG5hbWU6ICdFZGluYnVyZycgfSxcbiAgeyBuYW1lOiAnRWRtb25kJyB9LFxuICB7IG5hbWU6ICdFZG1vbmRzJyB9LFxuICB7IG5hbWU6ICdFbCBDYWpvbicgfSxcbiAgeyBuYW1lOiAnRWwgQ2VudHJvJyB9LFxuICB7IG5hbWU6ICdFbCBNb250ZScgfSxcbiAgeyBuYW1lOiAnRWwgUGFzbycgfSxcbiAgeyBuYW1lOiAnRWxnaW4nIH0sXG4gIHsgbmFtZTogJ0VsaXphYmV0aCcgfSxcbiAgeyBuYW1lOiAnRWxrIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdFbGtoYXJ0JyB9LFxuICB7IG5hbWU6ICdFbG1odXJzdCcgfSxcbiAgeyBuYW1lOiAnRWx5cmlhJyB9LFxuICB7IG5hbWU6ICdFbmNpbml0YXMnIH0sXG4gIHsgbmFtZTogJ0VuaWQnIH0sXG4gIHsgbmFtZTogJ0VyaWUnIH0sXG4gIHsgbmFtZTogJ0VzY29uZGlkbycgfSxcbiAgeyBuYW1lOiAnRXVjbGlkJyB9LFxuICB7IG5hbWU6ICdFdWdlbmUnIH0sXG4gIHsgbmFtZTogJ0V1bGVzcycgfSxcbiAgeyBuYW1lOiAnRXZhbnN0b24nIH0sXG4gIHsgbmFtZTogJ0V2YW5zdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0V2ZXJldHQnIH0sXG4gIHsgbmFtZTogJ0V2ZXJldHQnIH0sXG4gIHsgbmFtZTogJ0ZhaXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnRmFpcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdGYWxsIFJpdmVyJyB9LFxuICB7IG5hbWU6ICdGYXJnbycgfSxcbiAgeyBuYW1lOiAnRmFybWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnRmFybWluZ3RvbiBIaWxscycgfSxcbiAgeyBuYW1lOiAnRmF5ZXR0ZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdGYXlldHRldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0ZlZGVyYWwgV2F5JyB9LFxuICB7IG5hbWU6ICdGaW5kbGF5JyB9LFxuICB7IG5hbWU6ICdGaXNoZXJzJyB9LFxuICB7IG5hbWU6ICdGaXRjaGJ1cmcnIH0sXG4gIHsgbmFtZTogJ0ZsYWdzdGFmZicgfSxcbiAgeyBuYW1lOiAnRmxpbnQnIH0sXG4gIHsgbmFtZTogJ0Zsb3JlbmNlJyB9LFxuICB7IG5hbWU6ICdGbG9yZW5jZScgfSxcbiAgeyBuYW1lOiAnRmxvcmlzc2FudCcgfSxcbiAgeyBuYW1lOiAnRmxvd2VyIE1vdW5kJyB9LFxuICB7IG5hbWU6ICdGb2xzb20nIH0sXG4gIHsgbmFtZTogJ0ZvbmQgZHUgTGFjJyB9LFxuICB7IG5hbWU6ICdGb250YW5hJyB9LFxuICB7IG5hbWU6ICdGb3J0IENvbGxpbnMnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgTGF1ZGVyZGFsZScgfSxcbiAgeyBuYW1lOiAnRm9ydCBNeWVycycgfSxcbiAgeyBuYW1lOiAnRm9ydCBQaWVyY2UnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgU21pdGgnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgV2F5bmUnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgV29ydGgnIH0sXG4gIHsgbmFtZTogJ0ZvdW50YWluIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnRnJhbmtsaW4nIH0sXG4gIHsgbmFtZTogJ0ZyZWRlcmljaycgfSxcbiAgeyBuYW1lOiAnRnJlZXBvcnQnIH0sXG4gIHsgbmFtZTogJ0ZyZW1vbnQnIH0sXG4gIHsgbmFtZTogJ0ZyZXNubycgfSxcbiAgeyBuYW1lOiAnRnJpZW5kc3dvb2QnIH0sXG4gIHsgbmFtZTogJ0ZyaXNjbycgfSxcbiAgeyBuYW1lOiAnRnVsbGVydG9uJyB9LFxuICB7IG5hbWU6ICdHYWluZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnR2FpdGhlcnNidXJnJyB9LFxuICB7IG5hbWU6ICdHYWx2ZXN0b24nIH0sXG4gIHsgbmFtZTogJ0dhcmRlbiBHcm92ZScgfSxcbiAgeyBuYW1lOiAnR2FyZGVuYScgfSxcbiAgeyBuYW1lOiAnR2FybGFuZCcgfSxcbiAgeyBuYW1lOiAnR2FyeScgfSxcbiAgeyBuYW1lOiAnR2FzdG9uaWEnIH0sXG4gIHsgbmFtZTogJ0dlb3JnZXRvd24nIH0sXG4gIHsgbmFtZTogJ0dlcm1hbnRvd24nIH0sXG4gIHsgbmFtZTogJ0dpbGJlcnQnIH0sXG4gIHsgbmFtZTogJ0dpbHJveScgfSxcbiAgeyBuYW1lOiAnR2xlbmRhbGUnIH0sXG4gIHsgbmFtZTogJ0dsZW5kYWxlJyB9LFxuICB7IG5hbWU6ICdHbGVuZG9yYScgfSxcbiAgeyBuYW1lOiAnR2xlbnZpZXcnIH0sXG4gIHsgbmFtZTogJ0dvb2R5ZWFyJyB9LFxuICB7IG5hbWU6ICdHb29zZSBDcmVlaycgfSxcbiAgeyBuYW1lOiAnR3JhbmQgRm9ya3MnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIElzbGFuZCcgfSxcbiAgeyBuYW1lOiAnR3JhbmQgSnVuY3Rpb24nIH0sXG4gIHsgbmFtZTogJ0dyYW5kIFByYWlyaWUnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIFJhcGlkcycgfSxcbiAgeyBuYW1lOiAnR3JhcGV2aW5lJyB9LFxuICB7IG5hbWU6ICdHcmVhdCBGYWxscycgfSxcbiAgeyBuYW1lOiAnR3JlZWxleScgfSxcbiAgeyBuYW1lOiAnR3JlZW4gQmF5JyB9LFxuICB7IG5hbWU6ICdHcmVlbmFjcmVzJyB9LFxuICB7IG5hbWU6ICdHcmVlbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdHcmVlbnNib3JvJyB9LFxuICB7IG5hbWU6ICdHcmVlbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdHcmVlbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdHcmVlbndvb2QnIH0sXG4gIHsgbmFtZTogJ0dyZXNoYW0nIH0sXG4gIHsgbmFtZTogJ0dyb3ZlIENpdHknIH0sXG4gIHsgbmFtZTogJ0d1bGZwb3J0JyB9LFxuICB7IG5hbWU6ICdIYWNrZW5zYWNrJyB9LFxuICB7IG5hbWU6ICdIYWdlcnN0b3duJyB9LFxuICB7IG5hbWU6ICdIYWxsYW5kYWxlIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdIYWx0b20gQ2l0eScgfSxcbiAgeyBuYW1lOiAnSGFtaWx0b24nIH0sXG4gIHsgbmFtZTogJ0hhbW1vbmQnIH0sXG4gIHsgbmFtZTogJ0hhbXB0b24nIH0sXG4gIHsgbmFtZTogJ0hhbmZvcmQnIH0sXG4gIHsgbmFtZTogJ0hhbm92ZXIgUGFyaycgfSxcbiAgeyBuYW1lOiAnSGFybGluZ2VuJyB9LFxuICB7IG5hbWU6ICdIYXJyaXNidXJnJyB9LFxuICB7IG5hbWU6ICdIYXJyaXNvbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ0hhcnRmb3JkJyB9LFxuICB7IG5hbWU6ICdIYXR0aWVzYnVyZycgfSxcbiAgeyBuYW1lOiAnSGF2ZXJoaWxsJyB9LFxuICB7IG5hbWU6ICdIYXd0aG9ybmUnIH0sXG4gIHsgbmFtZTogJ0hheXdhcmQnIH0sXG4gIHsgbmFtZTogJ0hlbWV0JyB9LFxuICB7IG5hbWU6ICdIZW1wc3RlYWQnIH0sXG4gIHsgbmFtZTogJ0hlbmRlcnNvbicgfSxcbiAgeyBuYW1lOiAnSGVuZGVyc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0hlc3BlcmlhJyB9LFxuICB7IG5hbWU6ICdIaWFsZWFoJyB9LFxuICB7IG5hbWU6ICdIaWNrb3J5JyB9LFxuICB7IG5hbWU6ICdIaWdoIFBvaW50JyB9LFxuICB7IG5hbWU6ICdIaWdobGFuZCcgfSxcbiAgeyBuYW1lOiAnSGlsbHNib3JvJyB9LFxuICB7IG5hbWU6ICdIaWx0b24gSGVhZCBJc2xhbmQnIH0sXG4gIHsgbmFtZTogJ0hvYm9rZW4nIH0sXG4gIHsgbmFtZTogJ0hvZmZtYW4gRXN0YXRlcycgfSxcbiAgeyBuYW1lOiAnSG9sbHl3b29kJyB9LFxuICB7IG5hbWU6ICdIb2x5b2tlJyB9LFxuICB7IG5hbWU6ICdIb21lc3RlYWQnIH0sXG4gIHsgbmFtZTogJ0hvbm9sdWx1JyB9LFxuICB7IG5hbWU6ICdIb292ZXInIH0sXG4gIHsgbmFtZTogJ0hvdXN0b24nIH0sXG4gIHsgbmFtZTogJ0h1YmVyIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0h1bnRlcnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVudGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnSHVudGluZ3RvbiBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnSHVudGluZ3RvbiBQYXJrJyB9LFxuICB7IG5hbWU6ICdIdW50c3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdIdW50c3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdIdXJzdCcgfSxcbiAgeyBuYW1lOiAnSHV0Y2hpbnNvbicgfSxcbiAgeyBuYW1lOiAnSWRhaG8gRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0luZGVwZW5kZW5jZScgfSxcbiAgeyBuYW1lOiAnSW5kaWFuYXBvbGlzJyB9LFxuICB7IG5hbWU6ICdJbmRpbycgfSxcbiAgeyBuYW1lOiAnSW5nbGV3b29kJyB9LFxuICB7IG5hbWU6ICdJb3dhIENpdHknIH0sXG4gIHsgbmFtZTogJ0lydmluZScgfSxcbiAgeyBuYW1lOiAnSXJ2aW5nJyB9LFxuICB7IG5hbWU6ICdKYWNrc29uJyB9LFxuICB7IG5hbWU6ICdKYWNrc29uJyB9LFxuICB7IG5hbWU6ICdKYWNrc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0phY2tzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmFuZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSmVmZmVyc29uIENpdHknIH0sXG4gIHsgbmFtZTogJ0plZmZlcnNvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKZXJzZXkgQ2l0eScgfSxcbiAgeyBuYW1lOiAnSm9obnMgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0pvaG5zb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnSm9saWV0JyB9LFxuICB7IG5hbWU6ICdKb25lc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ0pvcGxpbicgfSxcbiAgeyBuYW1lOiAnSnVwaXRlcicgfSxcbiAgeyBuYW1lOiAnSnVydXBhIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnS2FsYW1hem9vJyB9LFxuICB7IG5hbWU6ICdLYW5uYXBvbGlzJyB9LFxuICB7IG5hbWU6ICdLYW5zYXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnS2Fuc2FzIENpdHknIH0sXG4gIHsgbmFtZTogJ0tlYXJueScgfSxcbiAgeyBuYW1lOiAnS2VpemVyJyB9LFxuICB7IG5hbWU6ICdLZWxsZXInIH0sXG4gIHsgbmFtZTogJ0tlbm5lcicgfSxcbiAgeyBuYW1lOiAnS2VubmV3aWNrJyB9LFxuICB7IG5hbWU6ICdLZW5vc2hhJyB9LFxuICB7IG5hbWU6ICdLZW50JyB9LFxuICB7IG5hbWU6ICdLZW50d29vZCcgfSxcbiAgeyBuYW1lOiAnS2V0dGVyaW5nJyB9LFxuICB7IG5hbWU6ICdLaWxsZWVuJyB9LFxuICB7IG5hbWU6ICdLaW5nc3BvcnQnIH0sXG4gIHsgbmFtZTogJ0tpcmtsYW5kJyB9LFxuICB7IG5hbWU6ICdLaXNzaW1tZWUnIH0sXG4gIHsgbmFtZTogJ0tub3h2aWxsZScgfSxcbiAgeyBuYW1lOiAnS29rb21vJyB9LFxuICB7IG5hbWU6ICdMYSBDcm9zc2UnIH0sXG4gIHsgbmFtZTogJ0xhIEhhYnJhJyB9LFxuICB7IG5hbWU6ICdMYSBNZXNhJyB9LFxuICB7IG5hbWU6ICdMYSBNaXJhZGEnIH0sXG4gIHsgbmFtZTogJ0xhIFB1ZW50ZScgfSxcbiAgeyBuYW1lOiAnTGEgUXVpbnRhJyB9LFxuICB7IG5hbWU6ICdMYWNleScgfSxcbiAgeyBuYW1lOiAnTGFmYXlldHRlJyB9LFxuICB7IG5hbWU6ICdMYWZheWV0dGUnIH0sXG4gIHsgbmFtZTogJ0xhZ3VuYSBOaWd1ZWwnIH0sXG4gIHsgbmFtZTogJ0xha2UgQ2hhcmxlcycgfSxcbiAgeyBuYW1lOiAnTGFrZSBFbHNpbm9yZScgfSxcbiAgeyBuYW1lOiAnTGFrZSBGb3Jlc3QnIH0sXG4gIHsgbmFtZTogJ0xha2UgSGF2YXN1IENpdHknIH0sXG4gIHsgbmFtZTogJ0xha2UgT3N3ZWdvJyB9LFxuICB7IG5hbWU6ICdMYWtlbGFuZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5zaW5nJyB9LFxuICB7IG5hbWU6ICdMYXJlZG8nIH0sXG4gIHsgbmFtZTogJ0xhcmdvJyB9LFxuICB7IG5hbWU6ICdMYXMgQ3J1Y2VzJyB9LFxuICB7IG5hbWU6ICdMYXMgVmVnYXMnIH0sXG4gIHsgbmFtZTogJ0xhdWRlcmhpbGwnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3RvbicgfSxcbiAgeyBuYW1lOiAnTGF5dG9uJyB9LFxuICB7IG5hbWU6ICdMZWFndWUgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTGVlXFwncyBTdW1taXQnIH0sXG4gIHsgbmFtZTogJ0xlZXNidXJnJyB9LFxuICB7IG5hbWU6ICdMZWhpJyB9LFxuICB7IG5hbWU6ICdMZW5leGEnIH0sXG4gIHsgbmFtZTogJ0xlb21pbnN0ZXInIH0sXG4gIHsgbmFtZTogJ0xld2lzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0xleGluZ3Rvbi1GYXlldHRlJyB9LFxuICB7IG5hbWU6ICdMaW1hJyB9LFxuICB7IG5hbWU6ICdMaW5jb2xuJyB9LFxuICB7IG5hbWU6ICdMaW5jb2xuJyB9LFxuICB7IG5hbWU6ICdMaW5jb2xuIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0xpbmRlbicgfSxcbiAgeyBuYW1lOiAnTGl0dGxlIFJvY2snIH0sXG4gIHsgbmFtZTogJ0xpdHRsZXRvbicgfSxcbiAgeyBuYW1lOiAnTGl2ZXJtb3JlJyB9LFxuICB7IG5hbWU6ICdMaXZvbmlhJyB9LFxuICB7IG5hbWU6ICdMb2RpJyB9LFxuICB7IG5hbWU6ICdMb2dhbicgfSxcbiAgeyBuYW1lOiAnTG9tYmFyZCcgfSxcbiAgeyBuYW1lOiAnTG9tcG9jJyB9LFxuICB7IG5hbWU6ICdMb25nIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdMb25nbW9udCcgfSxcbiAgeyBuYW1lOiAnTG9uZ3ZpZXcnIH0sXG4gIHsgbmFtZTogJ0xvcmFpbicgfSxcbiAgeyBuYW1lOiAnTG9zIEFuZ2VsZXMnIH0sXG4gIHsgbmFtZTogJ0xvdWlzdmlsbGUvSmVmZmVyc29uIENvdW50eScgfSxcbiAgeyBuYW1lOiAnTG92ZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0xvd2VsbCcgfSxcbiAgeyBuYW1lOiAnTHViYm9jaycgfSxcbiAgeyBuYW1lOiAnTHluY2hidXJnJyB9LFxuICB7IG5hbWU6ICdMeW5uJyB9LFxuICB7IG5hbWU6ICdMeW53b29kJyB9LFxuICB7IG5hbWU6ICdNYWNvbicgfSxcbiAgeyBuYW1lOiAnTWFkZXJhJyB9LFxuICB7IG5hbWU6ICdNYWRpc29uJyB9LFxuICB7IG5hbWU6ICdNYWRpc29uJyB9LFxuICB7IG5hbWU6ICdNYWxkZW4nIH0sXG4gIHsgbmFtZTogJ01hbmFzc2FzJyB9LFxuICB7IG5hbWU6ICdNYW5jaGVzdGVyJyB9LFxuICB7IG5hbWU6ICdNYW5oYXR0YW4nIH0sXG4gIHsgbmFtZTogJ01hbmthdG8nIH0sXG4gIHsgbmFtZTogJ01hbnNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnTWFuc2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdNYW50ZWNhJyB9LFxuICB7IG5hbWU6ICdNYXBsZSBHcm92ZScgfSxcbiAgeyBuYW1lOiAnTWFwbGV3b29kJyB9LFxuICB7IG5hbWU6ICdNYXJhbmEnIH0sXG4gIHsgbmFtZTogJ01hcmdhdGUnIH0sXG4gIHsgbmFtZTogJ01hcmljb3BhJyB9LFxuICB7IG5hbWU6ICdNYXJpZXR0YScgfSxcbiAgeyBuYW1lOiAnTWFybGJvcm91Z2gnIH0sXG4gIHsgbmFtZTogJ01hcnRpbmV6JyB9LFxuICB7IG5hbWU6ICdNYXJ5c3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdNY0FsbGVuJyB9LFxuICB7IG5hbWU6ICdNY0tpbm5leScgfSxcbiAgeyBuYW1lOiAnTWVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnTWVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnTWVsYm91cm5lJyB9LFxuICB7IG5hbWU6ICdNZW1waGlzJyB9LFxuICB7IG5hbWU6ICdNZW5pZmVlJyB9LFxuICB7IG5hbWU6ICdNZW50b3InIH0sXG4gIHsgbmFtZTogJ01lcmNlZCcgfSxcbiAgeyBuYW1lOiAnTWVyaWRlbicgfSxcbiAgeyBuYW1lOiAnTWVyaWRpYW4nIH0sXG4gIHsgbmFtZTogJ01lcmlkaWFuJyB9LFxuICB7IG5hbWU6ICdNZXNhJyB9LFxuICB7IG5hbWU6ICdNZXNxdWl0ZScgfSxcbiAgeyBuYW1lOiAnTWV0aHVlbicgfSxcbiAgeyBuYW1lOiAnTWlhbWknIH0sXG4gIHsgbmFtZTogJ01pYW1pIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdNaWFtaSBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdNaWRkbGV0b3duJyB9LFxuICB7IG5hbWU6ICdNaWRkbGV0b3duJyB9LFxuICB7IG5hbWU6ICdNaWRsYW5kJyB9LFxuICB7IG5hbWU6ICdNaWRsYW5kJyB9LFxuICB7IG5hbWU6ICdNaWR3ZXN0IENpdHknIH0sXG4gIHsgbmFtZTogJ01pbGZvcmQnIH0sXG4gIHsgbmFtZTogJ01pbHBpdGFzJyB9LFxuICB7IG5hbWU6ICdNaWx3YXVrZWUnIH0sXG4gIHsgbmFtZTogJ01pbm5lYXBvbGlzJyB9LFxuICB7IG5hbWU6ICdNaW5uZXRvbmthJyB9LFxuICB7IG5hbWU6ICdNaW5vdCcgfSxcbiAgeyBuYW1lOiAnTWlyYW1hcicgfSxcbiAgeyBuYW1lOiAnTWlzaGF3YWthJyB9LFxuICB7IG5hbWU6ICdNaXNzaW9uJyB9LFxuICB7IG5hbWU6ICdNaXNzaW9uIFZpZWpvJyB9LFxuICB7IG5hbWU6ICdNaXNzb3VsYScgfSxcbiAgeyBuYW1lOiAnTWlzc291cmkgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTW9iaWxlJyB9LFxuICB7IG5hbWU6ICdNb2Rlc3RvJyB9LFxuICB7IG5hbWU6ICdNb2xpbmUnIH0sXG4gIHsgbmFtZTogJ01vbnJvZScgfSxcbiAgeyBuYW1lOiAnTW9ucm92aWEnIH0sXG4gIHsgbmFtZTogJ01vbnRjbGFpcicgfSxcbiAgeyBuYW1lOiAnTW9udGViZWxsbycgfSxcbiAgeyBuYW1lOiAnTW9udGVyZXkgUGFyaycgfSxcbiAgeyBuYW1lOiAnTW9udGdvbWVyeScgfSxcbiAgeyBuYW1lOiAnTW9vcmUnIH0sXG4gIHsgbmFtZTogJ01vb3JoZWFkJyB9LFxuICB7IG5hbWU6ICdNb3Jlbm8gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdNb3JnYW4gSGlsbCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgUGxlYXNhbnQnIH0sXG4gIHsgbmFtZTogJ01vdW50IFByb3NwZWN0JyB9LFxuICB7IG5hbWU6ICdNb3VudCBWZXJub24nIH0sXG4gIHsgbmFtZTogJ01vdW50YWluIFZpZXcnIH0sXG4gIHsgbmFtZTogJ011bmNpZScgfSxcbiAgeyBuYW1lOiAnTXVyZnJlZXNib3JvJyB9LFxuICB7IG5hbWU6ICdNdXJyYXknIH0sXG4gIHsgbmFtZTogJ011cnJpZXRhJyB9LFxuICB7IG5hbWU6ICdNdXNrZWdvbicgfSxcbiAgeyBuYW1lOiAnTXVza29nZWUnIH0sXG4gIHsgbmFtZTogJ05hbXBhJyB9LFxuICB7IG5hbWU6ICdOYXBhJyB9LFxuICB7IG5hbWU6ICdOYXBlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdOYXNodWEnIH0sXG4gIHsgbmFtZTogJ05hc2h2aWxsZS1EYXZpZHNvbicgfSxcbiAgeyBuYW1lOiAnTmF0aW9uYWwgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTmV3IEJlZGZvcmQnIH0sXG4gIHsgbmFtZTogJ05ldyBCZXJsaW4nIH0sXG4gIHsgbmFtZTogJ05ldyBCcmF1bmZlbHMnIH0sXG4gIHsgbmFtZTogJ05ldyBCcml0YWluJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJ1bnN3aWNrJyB9LFxuICB7IG5hbWU6ICdOZXcgSGF2ZW4nIH0sXG4gIHsgbmFtZTogJ05ldyBPcmxlYW5zJyB9LFxuICB7IG5hbWU6ICdOZXcgUm9jaGVsbGUnIH0sXG4gIHsgbmFtZTogJ05ldyBZb3JrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdwb3J0IEJlYWNoJyB9LFxuICB7IG5hbWU6ICdOZXdwb3J0IE5ld3MnIH0sXG4gIHsgbmFtZTogJ05ld3RvbicgfSxcbiAgeyBuYW1lOiAnTmlhZ2FyYSBGYWxscycgfSxcbiAgeyBuYW1lOiAnTm9ibGVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ05vcmZvbGsnIH0sXG4gIHsgbmFtZTogJ05vcm1hbCcgfSxcbiAgeyBuYW1lOiAnTm9ybWFuJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBDaGFybGVzdG9uJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMYXMgVmVnYXMnIH0sXG4gIHsgbmFtZTogJ05vcnRoIExhdWRlcmRhbGUnIH0sXG4gIHsgbmFtZTogJ05vcnRoIExpdHRsZSBSb2NrJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBNaWFtaScgfSxcbiAgeyBuYW1lOiAnTm9ydGggTWlhbWkgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ05vcnRoIFBvcnQnIH0sXG4gIHsgbmFtZTogJ05vcnRoIFJpY2hsYW5kIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdOb3J0aGdsZW5uJyB9LFxuICB7IG5hbWU6ICdOb3J3YWxrJyB9LFxuICB7IG5hbWU6ICdOb3J3YWxrJyB9LFxuICB7IG5hbWU6ICdOb3J3aWNoJyB9LFxuICB7IG5hbWU6ICdOb3ZhdG8nIH0sXG4gIHsgbmFtZTogJ05vdmknIH0sXG4gIHsgbmFtZTogJ09cXCdGYWxsb24nIH0sXG4gIHsgbmFtZTogJ09hayBMYXduJyB9LFxuICB7IG5hbWU6ICdPYWsgUGFyaycgfSxcbiAgeyBuYW1lOiAnT2FrbGFuZCcgfSxcbiAgeyBuYW1lOiAnT2FrbGFuZCBQYXJrJyB9LFxuICB7IG5hbWU6ICdPYWtsZXknIH0sXG4gIHsgbmFtZTogJ09jYWxhJyB9LFxuICB7IG5hbWU6ICdPY2VhbnNpZGUnIH0sXG4gIHsgbmFtZTogJ09jb2VlJyB9LFxuICB7IG5hbWU6ICdPZGVzc2EnIH0sXG4gIHsgbmFtZTogJ09nZGVuJyB9LFxuICB7IG5hbWU6ICdPa2xhaG9tYSBDaXR5JyB9LFxuICB7IG5hbWU6ICdPbGF0aGUnIH0sXG4gIHsgbmFtZTogJ09seW1waWEnIH0sXG4gIHsgbmFtZTogJ09tYWhhJyB9LFxuICB7IG5hbWU6ICdPbnRhcmlvJyB9LFxuICB7IG5hbWU6ICdPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ09yZW0nIH0sXG4gIHsgbmFtZTogJ09ybGFuZCBQYXJrJyB9LFxuICB7IG5hbWU6ICdPcmxhbmRvJyB9LFxuICB7IG5hbWU6ICdPcm1vbmQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ09ybyBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ09zaGtvc2gnIH0sXG4gIHsgbmFtZTogJ092ZXJsYW5kIFBhcmsnIH0sXG4gIHsgbmFtZTogJ093ZW5zYm9ybycgfSxcbiAgeyBuYW1lOiAnT3huYXJkJyB9LFxuICB7IG5hbWU6ICdQYWNpZmljYScgfSxcbiAgeyBuYW1lOiAnUGFsYXRpbmUnIH0sXG4gIHsgbmFtZTogJ1BhbG0gQmF5JyB9LFxuICB7IG5hbWU6ICdQYWxtIEJlYWNoIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ1BhbG0gQ29hc3QnIH0sXG4gIHsgbmFtZTogJ1BhbG0gRGVzZXJ0JyB9LFxuICB7IG5hbWU6ICdQYWxtIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ1BhbG1kYWxlJyB9LFxuICB7IG5hbWU6ICdQYWxvIEFsdG8nIH0sXG4gIHsgbmFtZTogJ1BhbmFtYSBDaXR5JyB9LFxuICB7IG5hbWU6ICdQYXJhbW91bnQnIH0sXG4gIHsgbmFtZTogJ1BhcmsgUmlkZ2UnIH0sXG4gIHsgbmFtZTogJ1BhcmtlcicgfSxcbiAgeyBuYW1lOiAnUGFybWEnIH0sXG4gIHsgbmFtZTogJ1Bhc2FkZW5hJyB9LFxuICB7IG5hbWU6ICdQYXNhZGVuYScgfSxcbiAgeyBuYW1lOiAnUGFzY28nIH0sXG4gIHsgbmFtZTogJ1Bhc3NhaWMnIH0sXG4gIHsgbmFtZTogJ1BhdGVyc29uJyB9LFxuICB7IG5hbWU6ICdQYXd0dWNrZXQnIH0sXG4gIHsgbmFtZTogJ1BlYWJvZHknIH0sXG4gIHsgbmFtZTogJ1BlYWNodHJlZSBDb3JuZXJzJyB9LFxuICB7IG5hbWU6ICdQZWFybGFuZCcgfSxcbiAgeyBuYW1lOiAnUGVtYnJva2UgUGluZXMnIH0sXG4gIHsgbmFtZTogJ1BlbnNhY29sYScgfSxcbiAgeyBuYW1lOiAnUGVvcmlhJyB9LFxuICB7IG5hbWU6ICdQZW9yaWEnIH0sXG4gIHsgbmFtZTogJ1BlcnJpcycgfSxcbiAgeyBuYW1lOiAnUGVydGggQW1ib3knIH0sXG4gIHsgbmFtZTogJ1BldGFsdW1hJyB9LFxuICB7IG5hbWU6ICdQZmx1Z2VydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1BoYXJyJyB9LFxuICB7IG5hbWU6ICdQaGVuaXggQ2l0eScgfSxcbiAgeyBuYW1lOiAnUGhpbGFkZWxwaGlhJyB9LFxuICB7IG5hbWU6ICdQaG9lbml4JyB9LFxuICB7IG5hbWU6ICdQaWNvIFJpdmVyYScgfSxcbiAgeyBuYW1lOiAnUGluZSBCbHVmZicgfSxcbiAgeyBuYW1lOiAnUGluZWxsYXMgUGFyaycgfSxcbiAgeyBuYW1lOiAnUGl0dHNidXJnJyB9LFxuICB7IG5hbWU6ICdQaXR0c2J1cmdoJyB9LFxuICB7IG5hbWU6ICdQaXR0c2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFjZW50aWEnIH0sXG4gIHsgbmFtZTogJ1BsYWluZmllbGQnIH0sXG4gIHsgbmFtZTogJ1BsYWluZmllbGQnIH0sXG4gIHsgbmFtZTogJ1BsYW5vJyB9LFxuICB7IG5hbWU6ICdQbGFudGF0aW9uJyB9LFxuICB7IG5hbWU6ICdQbGVhc2FudG9uJyB9LFxuICB7IG5hbWU6ICdQbHltb3V0aCcgfSxcbiAgeyBuYW1lOiAnUG9jYXRlbGxvJyB9LFxuICB7IG5hbWU6ICdQb21vbmEnIH0sXG4gIHsgbmFtZTogJ1BvbXBhbm8gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1BvbnRpYWMnIH0sXG4gIHsgbmFtZTogJ1BvcnQgQXJ0aHVyJyB9LFxuICB7IG5hbWU6ICdQb3J0IE9yYW5nZScgfSxcbiAgeyBuYW1lOiAnUG9ydCBTdC4gTHVjaWUnIH0sXG4gIHsgbmFtZTogJ1BvcnRhZ2UnIH0sXG4gIHsgbmFtZTogJ1BvcnRlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdQb3J0bGFuZCcgfSxcbiAgeyBuYW1lOiAnUG9ydGxhbmQnIH0sXG4gIHsgbmFtZTogJ1BvcnRzbW91dGgnIH0sXG4gIHsgbmFtZTogJ1Bvd2F5JyB9LFxuICB7IG5hbWU6ICdQcmVzY290dCcgfSxcbiAgeyBuYW1lOiAnUHJlc2NvdHQgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdQcm92aWRlbmNlJyB9LFxuICB7IG5hbWU6ICdQcm92bycgfSxcbiAgeyBuYW1lOiAnUHVlYmxvJyB9LFxuICB7IG5hbWU6ICdQdXlhbGx1cCcgfSxcbiAgeyBuYW1lOiAnUXVpbmN5JyB9LFxuICB7IG5hbWU6ICdRdWluY3knIH0sXG4gIHsgbmFtZTogJ1JhY2luZScgfSxcbiAgeyBuYW1lOiAnUmFsZWlnaCcgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIENvcmRvdmEnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBDdWNhbW9uZ2EnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBQYWxvcyBWZXJkZXMnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBTYW50YSBNYXJnYXJpdGEnIH0sXG4gIHsgbmFtZTogJ1JhcGlkIENpdHknIH0sXG4gIHsgbmFtZTogJ1JlYWRpbmcnIH0sXG4gIHsgbmFtZTogJ1JlZGRpbmcnIH0sXG4gIHsgbmFtZTogJ1JlZGxhbmRzJyB9LFxuICB7IG5hbWU6ICdSZWRtb25kJyB9LFxuICB7IG5hbWU6ICdSZWRvbmRvIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdSZWR3b29kIENpdHknIH0sXG4gIHsgbmFtZTogJ1Jlbm8nIH0sXG4gIHsgbmFtZTogJ1JlbnRvbicgfSxcbiAgeyBuYW1lOiAnUmV2ZXJlJyB9LFxuICB7IG5hbWU6ICdSaWFsdG8nIH0sXG4gIHsgbmFtZTogJ1JpY2hhcmRzb24nIH0sXG4gIHsgbmFtZTogJ1JpY2hsYW5kJyB9LFxuICB7IG5hbWU6ICdSaWNobW9uZCcgfSxcbiAgeyBuYW1lOiAnUmljaG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JpbyBSYW5jaG8nIH0sXG4gIHsgbmFtZTogJ1JpdmVyc2lkZScgfSxcbiAgeyBuYW1lOiAnUml2ZXJ0b24nIH0sXG4gIHsgbmFtZTogJ1JvYW5va2UnIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXIgSGlsbHMnIH0sXG4gIHsgbmFtZTogJ1JvY2sgSGlsbCcgfSxcbiAgeyBuYW1lOiAnUm9jayBJc2xhbmQnIH0sXG4gIHsgbmFtZTogJ1JvY2tmb3JkJyB9LFxuICB7IG5hbWU6ICdSb2NrbGluJyB9LFxuICB7IG5hbWU6ICdSb2NrdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1JvY2t3YWxsJyB9LFxuICB7IG5hbWU6ICdSb2NreSBNb3VudCcgfSxcbiAgeyBuYW1lOiAnUm9nZXJzJyB9LFxuICB7IG5hbWU6ICdSb2huZXJ0IFBhcmsnIH0sXG4gIHsgbmFtZTogJ1JvbWVvdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1Jvc2VtZWFkJyB9LFxuICB7IG5hbWU6ICdSb3NldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1Jvc2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9zd2VsbCcgfSxcbiAgeyBuYW1lOiAnUm9zd2VsbCcgfSxcbiAgeyBuYW1lOiAnUm91bmQgUm9jaycgfSxcbiAgeyBuYW1lOiAnUm93bGV0dCcgfSxcbiAgeyBuYW1lOiAnUm95JyB9LFxuICB7IG5hbWU6ICdSb3lhbCBPYWsnIH0sXG4gIHsgbmFtZTogJ1NhY3JhbWVudG8nIH0sXG4gIHsgbmFtZTogJ1NhZ2luYXcnIH0sXG4gIHsgbmFtZTogJ1NhbGVtJyB9LFxuICB7IG5hbWU6ICdTYWxlbScgfSxcbiAgeyBuYW1lOiAnU2FsaW5hJyB9LFxuICB7IG5hbWU6ICdTYWxpbmFzJyB9LFxuICB7IG5hbWU6ICdTYWx0IExha2UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnU2FtbWFtaXNoJyB9LFxuICB7IG5hbWU6ICdTYW4gQW5nZWxvJyB9LFxuICB7IG5hbWU6ICdTYW4gQW50b25pbycgfSxcbiAgeyBuYW1lOiAnU2FuIEJlcm5hcmRpbm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCcnVubycgfSxcbiAgeyBuYW1lOiAnU2FuIEJ1ZW5hdmVudHVyYSAoVmVudHVyYSknIH0sXG4gIHsgbmFtZTogJ1NhbiBDbGVtZW50ZScgfSxcbiAgeyBuYW1lOiAnU2FuIERpZWdvJyB9LFxuICB7IG5hbWU6ICdTYW4gRnJhbmNpc2NvJyB9LFxuICB7IG5hbWU6ICdTYW4gR2FicmllbCcgfSxcbiAgeyBuYW1lOiAnU2FuIEphY2ludG8nIH0sXG4gIHsgbmFtZTogJ1NhbiBKb3NlJyB9LFxuICB7IG5hbWU6ICdTYW4gTGVhbmRybycgfSxcbiAgeyBuYW1lOiAnU2FuIEx1aXMgT2Jpc3BvJyB9LFxuICB7IG5hbWU6ICdTYW4gTWFyY29zJyB9LFxuICB7IG5hbWU6ICdTYW4gTWFyY29zJyB9LFxuICB7IG5hbWU6ICdTYW4gTWF0ZW8nIH0sXG4gIHsgbmFtZTogJ1NhbiBSYWZhZWwnIH0sXG4gIHsgbmFtZTogJ1NhbiBSYW1vbicgfSxcbiAgeyBuYW1lOiAnU2FuZHknIH0sXG4gIHsgbmFtZTogJ1NhbmR5IFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ1NhbmZvcmQnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIEFuYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQmFyYmFyYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQ2xhcmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIENsYXJpdGEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIENydXonIH0sXG4gIHsgbmFtZTogJ1NhbnRhIEZlJyB9LFxuICB7IG5hbWU6ICdTYW50YSBNYXJpYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgTW9uaWNhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBSb3NhJyB9LFxuICB7IG5hbWU6ICdTYW50ZWUnIH0sXG4gIHsgbmFtZTogJ1NhcmFzb3RhJyB9LFxuICB7IG5hbWU6ICdTYXZhbm5haCcgfSxcbiAgeyBuYW1lOiAnU2F5cmV2aWxsZScgfSxcbiAgeyBuYW1lOiAnU2NoYXVtYnVyZycgfSxcbiAgeyBuYW1lOiAnU2NoZW5lY3RhZHknIH0sXG4gIHsgbmFtZTogJ1Njb3R0c2RhbGUnIH0sXG4gIHsgbmFtZTogJ1NjcmFudG9uJyB9LFxuICB7IG5hbWU6ICdTZWF0dGxlJyB9LFxuICB7IG5hbWU6ICdTaGFrb3BlZScgfSxcbiAgeyBuYW1lOiAnU2hhd25lZScgfSxcbiAgeyBuYW1lOiAnU2hlYm95Z2FuJyB9LFxuICB7IG5hbWU6ICdTaGVsdG9uJyB9LFxuICB7IG5hbWU6ICdTaGVybWFuJyB9LFxuICB7IG5hbWU6ICdTaG9yZWxpbmUnIH0sXG4gIHsgbmFtZTogJ1NocmV2ZXBvcnQnIH0sXG4gIHsgbmFtZTogJ1NpZXJyYSBWaXN0YScgfSxcbiAgeyBuYW1lOiAnU2ltaSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1Npb3V4IENpdHknIH0sXG4gIHsgbmFtZTogJ1Npb3V4IEZhbGxzJyB9LFxuICB7IG5hbWU6ICdTa29raWUnIH0sXG4gIHsgbmFtZTogJ1NteXJuYScgfSxcbiAgeyBuYW1lOiAnU215cm5hJyB9LFxuICB7IG5hbWU6ICdTb21lcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBCZW5kJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBHYXRlJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBKb3JkYW4nIH0sXG4gIHsgbmFtZTogJ1NvdXRoIFNhbiBGcmFuY2lzY28nIH0sXG4gIHsgbmFtZTogJ1NvdXRoYXZlbicgfSxcbiAgeyBuYW1lOiAnU291dGhmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3BhbmlzaCBGb3JrJyB9LFxuICB7IG5hbWU6ICdTcGFya3MnIH0sXG4gIHsgbmFtZTogJ1NwYXJ0YW5idXJnJyB9LFxuICB7IG5hbWU6ICdTcG9rYW5lJyB9LFxuICB7IG5hbWU6ICdTcG9rYW5lIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZGFsZScgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2hhcmxlcycgfSxcbiAgeyBuYW1lOiAnU3QuIENsYWlyIFNob3JlcycgfSxcbiAgeyBuYW1lOiAnU3QuIENsb3VkJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2xvdWQnIH0sXG4gIHsgbmFtZTogJ1N0LiBHZW9yZ2UnIH0sXG4gIHsgbmFtZTogJ1N0LiBKb3NlcGgnIH0sXG4gIHsgbmFtZTogJ1N0LiBMb3VpcycgfSxcbiAgeyBuYW1lOiAnU3QuIExvdWlzIFBhcmsnIH0sXG4gIHsgbmFtZTogJ1N0LiBQYXVsJyB9LFxuICB7IG5hbWU6ICdTdC4gUGV0ZXJzJyB9LFxuICB7IG5hbWU6ICdTdC4gUGV0ZXJzYnVyZycgfSxcbiAgeyBuYW1lOiAnU3RhbWZvcmQnIH0sXG4gIHsgbmFtZTogJ1N0YW50b24nIH0sXG4gIHsgbmFtZTogJ1N0YXRlIENvbGxlZ2UnIH0sXG4gIHsgbmFtZTogJ1N0ZXJsaW5nIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ1N0aWxsd2F0ZXInIH0sXG4gIHsgbmFtZTogJ1N0b2NrdG9uJyB9LFxuICB7IG5hbWU6ICdTdHJlYW13b29kJyB9LFxuICB7IG5hbWU6ICdTdHJvbmdzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1N1ZmZvbGsnIH0sXG4gIHsgbmFtZTogJ1N1Z2FyIExhbmQnIH0sXG4gIHsgbmFtZTogJ1N1bW1lcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdTdW10ZXInIH0sXG4gIHsgbmFtZTogJ1N1bm55dmFsZScgfSxcbiAgeyBuYW1lOiAnU3VucmlzZScgfSxcbiAgeyBuYW1lOiAnU3VycHJpc2UnIH0sXG4gIHsgbmFtZTogJ1N5cmFjdXNlJyB9LFxuICB7IG5hbWU6ICdUYWNvbWEnIH0sXG4gIHsgbmFtZTogJ1RhbGxhaGFzc2VlJyB9LFxuICB7IG5hbWU6ICdUYW1hcmFjJyB9LFxuICB7IG5hbWU6ICdUYW1wYScgfSxcbiAgeyBuYW1lOiAnVGF1bnRvbicgfSxcbiAgeyBuYW1lOiAnVGF5bG9yJyB9LFxuICB7IG5hbWU6ICdUYXlsb3JzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1RlbWVjdWxhJyB9LFxuICB7IG5hbWU6ICdUZW1wZScgfSxcbiAgeyBuYW1lOiAnVGVtcGxlJyB9LFxuICB7IG5hbWU6ICdUZXJyZSBIYXV0ZScgfSxcbiAgeyBuYW1lOiAnVGV4YXJrYW5hJyB9LFxuICB7IG5hbWU6ICdUZXhhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdUaGUgQ29sb255JyB9LFxuICB7IG5hbWU6ICdUaG9ybnRvbicgfSxcbiAgeyBuYW1lOiAnVGhvdXNhbmQgT2FrcycgfSxcbiAgeyBuYW1lOiAnVGlnYXJkJyB9LFxuICB7IG5hbWU6ICdUaW5sZXkgUGFyaycgfSxcbiAgeyBuYW1lOiAnVGl0dXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnVG9sZWRvJyB9LFxuICB7IG5hbWU6ICdUb3Bla2EnIH0sXG4gIHsgbmFtZTogJ1RvcnJhbmNlJyB9LFxuICB7IG5hbWU6ICdUcmFjeScgfSxcbiAgeyBuYW1lOiAnVHJlbnRvbicgfSxcbiAgeyBuYW1lOiAnVHJveScgfSxcbiAgeyBuYW1lOiAnVHJveScgfSxcbiAgeyBuYW1lOiAnVHVjc29uJyB9LFxuICB7IG5hbWU6ICdUdWxhcmUnIH0sXG4gIHsgbmFtZTogJ1R1bHNhJyB9LFxuICB7IG5hbWU6ICdUdXJsb2NrJyB9LFxuICB7IG5hbWU6ICdUdXNjYWxvb3NhJyB9LFxuICB7IG5hbWU6ICdUdXN0aW4nIH0sXG4gIHsgbmFtZTogJ1R3aW4gRmFsbHMnIH0sXG4gIHsgbmFtZTogJ1R5bGVyJyB9LFxuICB7IG5hbWU6ICdVbmlvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdVbmlvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdVcGxhbmQnIH0sXG4gIHsgbmFtZTogJ1VyYmFuYScgfSxcbiAgeyBuYW1lOiAnVXJiYW5kYWxlJyB9LFxuICB7IG5hbWU6ICdVdGljYScgfSxcbiAgeyBuYW1lOiAnVmFjYXZpbGxlJyB9LFxuICB7IG5hbWU6ICdWYWxkb3N0YScgfSxcbiAgeyBuYW1lOiAnVmFsbGVqbycgfSxcbiAgeyBuYW1lOiAnVmFsbGV5IFN0cmVhbScgfSxcbiAgeyBuYW1lOiAnVmFuY291dmVyJyB9LFxuICB7IG5hbWU6ICdWaWN0b3JpYScgfSxcbiAgeyBuYW1lOiAnVmljdG9ydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1ZpbmVsYW5kJyB9LFxuICB7IG5hbWU6ICdWaXJnaW5pYSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnVmlzYWxpYScgfSxcbiAgeyBuYW1lOiAnVmlzdGEnIH0sXG4gIHsgbmFtZTogJ1dhY28nIH0sXG4gIHsgbmFtZTogJ1dhbG51dCBDcmVlaycgfSxcbiAgeyBuYW1lOiAnV2FsdGhhbScgfSxcbiAgeyBuYW1lOiAnV2FybmVyIFJvYmlucycgfSxcbiAgeyBuYW1lOiAnV2FycmVuJyB9LFxuICB7IG5hbWU6ICdXYXJyZW4nIH0sXG4gIHsgbmFtZTogJ1dhcndpY2snIH0sXG4gIHsgbmFtZTogJ1dhc2hpbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dhdGVyYnVyeScgfSxcbiAgeyBuYW1lOiAnV2F0ZXJsb28nIH0sXG4gIHsgbmFtZTogJ1dhdHNvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdXYXVrZWdhbicgfSxcbiAgeyBuYW1lOiAnV2F1a2VzaGEnIH0sXG4gIHsgbmFtZTogJ1dhdXNhdScgfSxcbiAgeyBuYW1lOiAnV2F1d2F0b3NhJyB9LFxuICB7IG5hbWU6ICdXZWxsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXZXNsYWNvJyB9LFxuICB7IG5hbWU6ICdXZXN0IEFsbGlzJyB9LFxuICB7IG5hbWU6ICdXZXN0IENvdmluYScgfSxcbiAgeyBuYW1lOiAnV2VzdCBEZXMgTW9pbmVzJyB9LFxuICB7IG5hbWU6ICdXZXN0IEhhdmVuJyB9LFxuICB7IG5hbWU6ICdXZXN0IEpvcmRhbicgfSxcbiAgeyBuYW1lOiAnV2VzdCBOZXcgWW9yaycgfSxcbiAgeyBuYW1lOiAnV2VzdCBQYWxtIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdXZXN0IFNhY3JhbWVudG8nIH0sXG4gIHsgbmFtZTogJ1dlc3QgVmFsbGV5IENpdHknIH0sXG4gIHsgbmFtZTogJ1dlc3RlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdXZXN0ZmllbGQnIH0sXG4gIHsgbmFtZTogJ1dlc3RsYW5kJyB9LFxuICB7IG5hbWU6ICdXZXN0bWluc3RlcicgfSxcbiAgeyBuYW1lOiAnV2VzdG1pbnN0ZXInIH0sXG4gIHsgbmFtZTogJ1dlc3RvbicgfSxcbiAgeyBuYW1lOiAnV2V5bW91dGggVG93bicgfSxcbiAgeyBuYW1lOiAnV2hlYXRvbicgfSxcbiAgeyBuYW1lOiAnV2hlZWxpbmcnIH0sXG4gIHsgbmFtZTogJ1doaXRlIFBsYWlucycgfSxcbiAgeyBuYW1lOiAnV2hpdHRpZXInIH0sXG4gIHsgbmFtZTogJ1dpY2hpdGEnIH0sXG4gIHsgbmFtZTogJ1dpY2hpdGEgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ1dpbGtlcy1CYXJyZScgfSxcbiAgeyBuYW1lOiAnV2lsbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2lsbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2lsc29uJyB9LFxuICB7IG5hbWU6ICdXaW5zdG9uLVNhbGVtJyB9LFxuICB7IG5hbWU6ICdXaW50ZXIgR2FyZGVuJyB9LFxuICB7IG5hbWU6ICdXb2J1cm4nIH0sXG4gIHsgbmFtZTogJ1dvb2RidXJ5JyB9LFxuICB7IG5hbWU6ICdXb29kbGFuZCcgfSxcbiAgeyBuYW1lOiAnV29vbnNvY2tldCcgfSxcbiAgeyBuYW1lOiAnV29yY2VzdGVyJyB9LFxuICB7IG5hbWU6ICdXeWxpZScgfSxcbiAgeyBuYW1lOiAnV3lvbWluZycgfSxcbiAgeyBuYW1lOiAnWWFraW1hJyB9LFxuICB7IG5hbWU6ICdZb25rZXJzJyB9LFxuICB7IG5hbWU6ICdZb3JiYSBMaW5kYScgfSxcbiAgeyBuYW1lOiAnWW9yaycgfSxcbiAgeyBuYW1lOiAnWW91bmdzdG93bicgfSxcbiAgeyBuYW1lOiAnWXViYSBDaXR5JyB9LFxuICB7IG5hbWU6ICdZdWNhaXBhJyB9LFxuICB7IG5hbWU6ICdZdW1hJyB9XG5dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG5cdHsgZ2l0aHViOiAnamVkd2F0c29uJywgbmFtZTogJ0plZCBXYXRzb24nIH0sXG5cdHsgZ2l0aHViOiAnYnJ1ZGVyc3RlaW4nLCBuYW1lOiAnRGF2ZSBCcm90aGVyc3RvbmUnIH0sXG5cdHsgZ2l0aHViOiAnam9zc21hYycsIG5hbWU6ICdKb3NzIE1hY2tpc29uJyB9LFxuXHR7IGdpdGh1YjogJ2puaWVjaGNpYWwnLCBuYW1lOiAnSmFrdWIgTmllY2hjaWHFgicgfSxcblx0eyBnaXRodWI6ICdjcmFpZ2RhbGxpbW9yZScsIG5hbWU6ICdDcmFpZyBEYWxsaW1vcmUnIH0sXG5cdHsgZ2l0aHViOiAnanVsZW4nLCBuYW1lOiAnSnVsZW4gUnVpeiBBaXpwdXJ1JyB9LFxuXHR7IGdpdGh1YjogJ2Rjb3VzZW5zJywgbmFtZTogJ0RhbmllbCBDb3VzZW5zJyB9LFxuXHR7IGdpdGh1YjogJ2pnYXV0c2NoJywgbmFtZTogJ0pvbiBHYXV0c2NoJyB9LFxuXHR7IGdpdGh1YjogJ2RtaXRyeS1zbWlybm92JywgbmFtZTogJ0RtaXRyeSBTbWlybm92JyB9LFxuXTtcbiIsImV4cG9ydHMuQVUgPSBbXG5cdHsgdmFsdWU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JywgbGFiZWw6ICdBdXN0cmFsaWFuIENhcGl0YWwgVGVycml0b3J5JywgY2xhc3NOYW1lOiAnU3RhdGUtQUNUJyB9LFxuXHR7IHZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJywgbGFiZWw6ICdOZXcgU291dGggV2FsZXMnLCBjbGFzc05hbWU6ICdTdGF0ZS1OU1cnIH0sXG5cdHsgdmFsdWU6ICd2aWN0b3JpYScsIGxhYmVsOiAnVmljdG9yaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1WaWMnIH0sXG5cdHsgdmFsdWU6ICdxdWVlbnNsYW5kJywgbGFiZWw6ICdRdWVlbnNsYW5kJywgY2xhc3NOYW1lOiAnU3RhdGUtUWxkJyB9LFxuXHR7IHZhbHVlOiAnd2VzdGVybi1hdXN0cmFsaWEnLCBsYWJlbDogJ1dlc3Rlcm4gQXVzdHJhbGlhJywgY2xhc3NOYW1lOiAnU3RhdGUtV0EnIH0sXG5cdHsgdmFsdWU6ICdzb3V0aC1hdXN0cmFsaWEnLCBsYWJlbDogJ1NvdXRoIEF1c3RyYWxpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVNBJyB9LFxuXHR7IHZhbHVlOiAndGFzbWFuaWEnLCBsYWJlbDogJ1Rhc21hbmlhJywgY2xhc3NOYW1lOiAnU3RhdGUtVGFzJyB9LFxuXHR7IHZhbHVlOiAnbm9ydGhlcm4tdGVycml0b3J5JywgbGFiZWw6ICdOb3J0aGVybiBUZXJyaXRvcnknLCBjbGFzc05hbWU6ICdTdGF0ZS1OVCcgfSxcbl07XG5cbmV4cG9ydHMuVVMgPSBbXG4gICAgeyB2YWx1ZTogJ0FMJywgbGFiZWw6ICdBbGFiYW1hJywgZGlzYWJsZWQ6IHRydWUgfSxcbiAgICB7IHZhbHVlOiAnQUsnLCBsYWJlbDogJ0FsYXNrYScgfSxcbiAgICB7IHZhbHVlOiAnQVMnLCBsYWJlbDogJ0FtZXJpY2FuIFNhbW9hJyB9LFxuICAgIHsgdmFsdWU6ICdBWicsIGxhYmVsOiAnQXJpem9uYScgfSxcbiAgICB7IHZhbHVlOiAnQVInLCBsYWJlbDogJ0Fya2Fuc2FzJyB9LFxuICAgIHsgdmFsdWU6ICdDQScsIGxhYmVsOiAnQ2FsaWZvcm5pYScgfSxcbiAgICB7IHZhbHVlOiAnQ08nLCBsYWJlbDogJ0NvbG9yYWRvJyB9LFxuICAgIHsgdmFsdWU6ICdDVCcsIGxhYmVsOiAnQ29ubmVjdGljdXQnIH0sXG4gICAgeyB2YWx1ZTogJ0RFJywgbGFiZWw6ICdEZWxhd2FyZScgfSxcbiAgICB7IHZhbHVlOiAnREMnLCBsYWJlbDogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJyB9LFxuICAgIHsgdmFsdWU6ICdGTScsIGxhYmVsOiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJyB9LFxuICAgIHsgdmFsdWU6ICdGTCcsIGxhYmVsOiAnRmxvcmlkYScgfSxcbiAgICB7IHZhbHVlOiAnR0EnLCBsYWJlbDogJ0dlb3JnaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0dVJywgbGFiZWw6ICdHdWFtJyB9LFxuICAgIHsgdmFsdWU6ICdISScsIGxhYmVsOiAnSGF3YWlpJyB9LFxuICAgIHsgdmFsdWU6ICdJRCcsIGxhYmVsOiAnSWRhaG8nIH0sXG4gICAgeyB2YWx1ZTogJ0lMJywgbGFiZWw6ICdJbGxpbm9pcycgfSxcbiAgICB7IHZhbHVlOiAnSU4nLCBsYWJlbDogJ0luZGlhbmEnIH0sXG4gICAgeyB2YWx1ZTogJ0lBJywgbGFiZWw6ICdJb3dhJyB9LFxuICAgIHsgdmFsdWU6ICdLUycsIGxhYmVsOiAnS2Fuc2FzJyB9LFxuICAgIHsgdmFsdWU6ICdLWScsIGxhYmVsOiAnS2VudHVja3knIH0sXG4gICAgeyB2YWx1ZTogJ0xBJywgbGFiZWw6ICdMb3Vpc2lhbmEnIH0sXG4gICAgeyB2YWx1ZTogJ01FJywgbGFiZWw6ICdNYWluZScgfSxcbiAgICB7IHZhbHVlOiAnTUgnLCBsYWJlbDogJ01hcnNoYWxsIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ01EJywgbGFiZWw6ICdNYXJ5bGFuZCcgfSxcbiAgICB7IHZhbHVlOiAnTUEnLCBsYWJlbDogJ01hc3NhY2h1c2V0dHMnIH0sXG4gICAgeyB2YWx1ZTogJ01JJywgbGFiZWw6ICdNaWNoaWdhbicgfSxcbiAgICB7IHZhbHVlOiAnTU4nLCBsYWJlbDogJ01pbm5lc290YScgfSxcbiAgICB7IHZhbHVlOiAnTVMnLCBsYWJlbDogJ01pc3Npc3NpcHBpJyB9LFxuICAgIHsgdmFsdWU6ICdNTycsIGxhYmVsOiAnTWlzc291cmknIH0sXG4gICAgeyB2YWx1ZTogJ01UJywgbGFiZWw6ICdNb250YW5hJyB9LFxuICAgIHsgdmFsdWU6ICdORScsIGxhYmVsOiAnTmVicmFza2EnIH0sXG4gICAgeyB2YWx1ZTogJ05WJywgbGFiZWw6ICdOZXZhZGEnIH0sXG4gICAgeyB2YWx1ZTogJ05IJywgbGFiZWw6ICdOZXcgSGFtcHNoaXJlJyB9LFxuICAgIHsgdmFsdWU6ICdOSicsIGxhYmVsOiAnTmV3IEplcnNleScgfSxcbiAgICB7IHZhbHVlOiAnTk0nLCBsYWJlbDogJ05ldyBNZXhpY28nIH0sXG4gICAgeyB2YWx1ZTogJ05ZJywgbGFiZWw6ICdOZXcgWW9yaycgfSxcbiAgICB7IHZhbHVlOiAnTkMnLCBsYWJlbDogJ05vcnRoIENhcm9saW5hJyB9LFxuICAgIHsgdmFsdWU6ICdORCcsIGxhYmVsOiAnTm9ydGggRGFrb3RhJyB9LFxuICAgIHsgdmFsdWU6ICdNUCcsIGxhYmVsOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJyB9LFxuICAgIHsgdmFsdWU6ICdPSCcsIGxhYmVsOiAnT2hpbycgfSxcbiAgICB7IHZhbHVlOiAnT0snLCBsYWJlbDogJ09rbGFob21hJyB9LFxuICAgIHsgdmFsdWU6ICdPUicsIGxhYmVsOiAnT3JlZ29uJyB9LFxuICAgIHsgdmFsdWU6ICdQVycsIGxhYmVsOiAnUGFsYXUnIH0sXG4gICAgeyB2YWx1ZTogJ1BBJywgbGFiZWw6ICdQZW5uc3lsdmFuaWEnIH0sXG4gICAgeyB2YWx1ZTogJ1BSJywgbGFiZWw6ICdQdWVydG8gUmljbycgfSxcbiAgICB7IHZhbHVlOiAnUkknLCBsYWJlbDogJ1Job2RlIElzbGFuZCcgfSxcbiAgICB7IHZhbHVlOiAnU0MnLCBsYWJlbDogJ1NvdXRoIENhcm9saW5hJyB9LFxuICAgIHsgdmFsdWU6ICdTRCcsIGxhYmVsOiAnU291dGggRGFrb3RhJyB9LFxuICAgIHsgdmFsdWU6ICdUTicsIGxhYmVsOiAnVGVubmVzc2VlJyB9LFxuICAgIHsgdmFsdWU6ICdUWCcsIGxhYmVsOiAnVGV4YXMnIH0sXG4gICAgeyB2YWx1ZTogJ1VUJywgbGFiZWw6ICdVdGFoJyB9LFxuICAgIHsgdmFsdWU6ICdWVCcsIGxhYmVsOiAnVmVybW9udCcgfSxcbiAgICB7IHZhbHVlOiAnVkknLCBsYWJlbDogJ1ZpcmdpbiBJc2xhbmRzJyB9LFxuICAgIHsgdmFsdWU6ICdWQScsIGxhYmVsOiAnVmlyZ2luaWEnIH0sXG4gICAgeyB2YWx1ZTogJ1dBJywgbGFiZWw6ICdXYXNoaW5ndG9uJyB9LFxuICAgIHsgdmFsdWU6ICdXVicsIGxhYmVsOiAnV2VzdCBWaXJnaW5pYScgfSxcbiAgICB7IHZhbHVlOiAnV0knLCBsYWJlbDogJ1dpc2NvbnNpbicgfSxcbiAgICB7IHZhbHVlOiAnV1knLCBsYWJlbDogJ1d5b21pbmcnIH0sXG5dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG5cdHsgdmFsdWU6ICdKb2huIFNtaXRoJywgbGFiZWw6ICdKb2huIFNtaXRoJywgZW1haWw6ICdqb2huQHNtaXRoLmNvbScgfSxcblx0eyB2YWx1ZTogJ01lcnJ5IEphbmUnLCBsYWJlbDogJ01lcnJ5IEphbmUnLCBlbWFpbDogJ21lcnJ5QGphbmUuY29tJyB9LFxuXHR7IHZhbHVlOiAnU3RhbiBIb3BlcicsIGxhYmVsOiAnU3RhbiBIb3BlcicsIGVtYWlsOiAnc3RhbkBob3Blci5jb20nIH1cbl07XG4iLCJ2YXIgY2hhcmVuYyA9IHtcbiAgLy8gVVRGLTggZW5jb2RpbmdcbiAgdXRmODoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gY2hhcmVuYy5iaW4uc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjaGFyZW5jLmJpbi5ieXRlc1RvU3RyaW5nKGJ5dGVzKSkpO1xuICAgIH1cbiAgfSxcblxuICAvLyBCaW5hcnkgZW5jb2RpbmdcbiAgYmluOiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHN0ciA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdHIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJycpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyZW5jO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZSgnLi9pbkRPTScpO1xuXG52YXIgc2l6ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocmVjYWxjKSB7XG4gIGlmICghc2l6ZSB8fCByZWNhbGMpIHtcbiAgICBpZiAoY2FuVXNlRE9NKSB7XG4gICAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIHNjcm9sbERpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUudG9wID0gJy05OTk5cHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLndpZHRoID0gJzUwcHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG4gICAgICBzaXplID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzaXplO1xufTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgc2hhbGxvd0VxdWFsXG4gKiBAdHlwZWNoZWNrc1xuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFBlcmZvcm1zIGVxdWFsaXR5IGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGtleXMgb24gYW4gb2JqZWN0IGFuZCByZXR1cm5pbmcgZmFsc2VcbiAqIHdoZW4gYW55IGtleSBoYXMgdmFsdWVzIHdoaWNoIGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgYXJndW1lbnRzLlxuICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlcyBvZiBhbGwga2V5cyBhcmUgc3RyaWN0bHkgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgdmFyIGJIYXNPd25Qcm9wZXJ0eSA9IGhhc093blByb3BlcnR5LmJpbmQob2JqQik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWJIYXNPd25Qcm9wZXJ0eShrZXlzQVtpXSkgfHwgb2JqQVtrZXlzQVtpXV0gIT09IG9iakJba2V5c0FbaV1dKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0VxdWFsOyIsIi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBCdWZmZXJcbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgaXMtYnVmZmVyYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gISEob2JqICE9IG51bGwgJiZcbiAgICAob2JqLl9pc0J1ZmZlciB8fCAvLyBGb3IgU2FmYXJpIDUtNyAobWlzc2luZyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yKVxuICAgICAgKG9iai5jb25zdHJ1Y3RvciAmJlxuICAgICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpXG4gICAgKSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZWRpYVF1ZXJ5O1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICBtZWRpYVF1ZXJ5ID0gXCIoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiA1LzQpLCAobWluLXJlc29sdXRpb246IDEuMjVkcHB4KVwiO1xuICAgIGlmICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEuMjUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEobWVkaWFRdWVyeSkubWF0Y2hlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCIoZnVuY3Rpb24oKXtcclxuICB2YXIgY3J5cHQgPSByZXF1aXJlKCdjcnlwdCcpLFxyXG4gICAgICB1dGY4ID0gcmVxdWlyZSgnY2hhcmVuYycpLnV0ZjgsXHJcbiAgICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyksXHJcbiAgICAgIGJpbiA9IHJlcXVpcmUoJ2NoYXJlbmMnKS5iaW4sXHJcblxyXG4gIC8vIFRoZSBjb3JlXHJcbiAgbWQ1ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIC8vIENvbnZlcnQgdG8gYnl0ZSBhcnJheVxyXG4gICAgaWYgKG1lc3NhZ2UuY29uc3RydWN0b3IgPT0gU3RyaW5nKVxyXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kaW5nID09PSAnYmluYXJ5JylcclxuICAgICAgICBtZXNzYWdlID0gYmluLnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBtZXNzYWdlID0gdXRmOC5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgZWxzZSBpZiAoaXNCdWZmZXIobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLCAwKTtcclxuICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gbWVzc2FnZS50b1N0cmluZygpO1xyXG4gICAgLy8gZWxzZSwgYXNzdW1lIGJ5dGUgYXJyYXkgYWxyZWFkeVxyXG5cclxuICAgIHZhciBtID0gY3J5cHQuYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpLFxyXG4gICAgICAgIGwgPSBtZXNzYWdlLmxlbmd0aCAqIDgsXHJcbiAgICAgICAgYSA9ICAxNzMyNTg0MTkzLFxyXG4gICAgICAgIGIgPSAtMjcxNzMzODc5LFxyXG4gICAgICAgIGMgPSAtMTczMjU4NDE5NCxcclxuICAgICAgICBkID0gIDI3MTczMzg3ODtcclxuXHJcbiAgICAvLyBTd2FwIGVuZGlhblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG1baV0gPSAoKG1baV0gPDwgIDgpIHwgKG1baV0gPj4+IDI0KSkgJiAweDAwRkYwMEZGIHxcclxuICAgICAgICAgICAgICgobVtpXSA8PCAyNCkgfCAobVtpXSA+Pj4gIDgpKSAmIDB4RkYwMEZGMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFkZGluZ1xyXG4gICAgbVtsID4+PiA1XSB8PSAweDgwIDw8IChsICUgMzIpO1xyXG4gICAgbVsoKChsICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGw7XHJcblxyXG4gICAgLy8gTWV0aG9kIHNob3J0Y3V0c1xyXG4gICAgdmFyIEZGID0gbWQ1Ll9mZixcclxuICAgICAgICBHRyA9IG1kNS5fZ2csXHJcbiAgICAgICAgSEggPSBtZDUuX2hoLFxyXG4gICAgICAgIElJID0gbWQ1Ll9paTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XHJcblxyXG4gICAgICB2YXIgYWEgPSBhLFxyXG4gICAgICAgICAgYmIgPSBiLFxyXG4gICAgICAgICAgY2MgPSBjLFxyXG4gICAgICAgICAgZGQgPSBkO1xyXG5cclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgMF0sICA3LCAtNjgwODc2OTM2KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgMl0sIDE3LCAgNjA2MTA1ODE5KTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDRdLCAgNywgLTE3NjQxODg5Nyk7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDcsICAxNzcwMDM1NDE2KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krMTRdLCAxNywgLTE1MDIwMDIyOTApO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzE1XSwgMjIsICAxMjM2NTM1MzI5KTtcclxuXHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDFdLCAgNSwgLTE2NTc5NjUxMCk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzExXSwgMTQsICA2NDM3MTc3MTMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA1XSwgIDUsIC03MDE1NTg2OTEpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzEwXSwgIDksICAzODAxNjA4Myk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDldLCAgNSwgIDU2ODQ0NjQzOCk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA4XSwgMjAsICAxMTYzNTMxNTAxKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krIDJdLCAgOSwgLTUxNDAzNzg0KTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgN10sIDE0LCAgMTczNTMyODQ3Myk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgNV0sICA0LCAtMzc4NTU4KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgN10sIDE2LCAtMTU1NDk3NjMyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxMF0sIDIzLCAtMTA5NDczMDY0MCk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krMTNdLCAgNCwgIDY4MTI3OTE3NCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDBdLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDNdLCAxNiwgLTcyMjUyMTk3OSk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgOV0sICA0LCAtNjQwMzY0NDg3KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsxMl0sIDExLCAtNDIxODE1ODM1KTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuXHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDBdLCAgNiwgLTE5ODYzMDg0NCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgNV0sIDIxLCAtNTc0MzQwNTUpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDYsICAxNzAwNDg1NTcxKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgM10sIDEwLCAtMTg5NDk4NjYwNik7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTBdLCAxNSwgLTEwNTE1MjMpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgOF0sICA2LCAgMTg3MzMxMzM1OSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTVdLCAxMCwgLTMwNjExNzQ0KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDYsIC0xNDU1MjMwNzApO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcclxuXHJcbiAgICAgIGEgPSAoYSArIGFhKSA+Pj4gMDtcclxuICAgICAgYiA9IChiICsgYmIpID4+PiAwO1xyXG4gICAgICBjID0gKGMgKyBjYykgPj4+IDA7XHJcbiAgICAgIGQgPSAoZCArIGRkKSA+Pj4gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3J5cHQuZW5kaWFuKFthLCBiLCBjLCBkXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQXV4aWxpYXJ5IGZ1bmN0aW9uc1xyXG4gIG1kNS5fZmYgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiICYgYyB8IH5iICYgZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5fZ2cgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiICYgZCB8IGMgJiB+ZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faGggID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2lpICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYyBeIChiIHwgfmQpKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcblxyXG4gIC8vIFBhY2thZ2UgcHJpdmF0ZSBibG9ja3NpemVcclxuICBtZDUuX2Jsb2Nrc2l6ZSA9IDE2O1xyXG4gIG1kNS5fZGlnZXN0c2l6ZSA9IDE2O1xyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICBpZih0eXBlb2YgbWVzc2FnZSA9PSAndW5kZWZpbmVkJylcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBkaWdlc3RieXRlcyA9IGNyeXB0LndvcmRzVG9CeXRlcyhtZDUobWVzc2FnZSwgb3B0aW9ucykpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5hc0J5dGVzID8gZGlnZXN0Ynl0ZXMgOlxyXG4gICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IGJpbi5ieXRlc1RvU3RyaW5nKGRpZ2VzdGJ5dGVzKSA6XHJcbiAgICAgICAgY3J5cHQuYnl0ZXNUb0hleChkaWdlc3RieXRlcyk7XHJcbiAgfTtcclxuXHJcbn0pKCk7XHJcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lO1xuXG4gIGlmICgodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsKSAmJiBwZXJmb3JtYW5jZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwpICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoZ2V0TmFub1NlY29uZHMoKSAtIGxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gIH0gZWxzZSBpZiAoRGF0ZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIERhdGUubm93KCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKCkge1xuICByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICByb290LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9zaGFsbG93Q29tcGFyZScpOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMC4wXG52YXIgUmVhY3QsIGlzUmV0aW5hLCBtZDUsIHF1ZXJ5c3RyaW5nO1xuXG5SZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1kNSA9IHJlcXVpcmUoJ21kNScpO1xuXG5xdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmlzUmV0aW5hID0gcmVxdWlyZSgnaXMtcmV0aW5hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0dyYXZhdGFyJyxcbiAgcHJvcFR5cGVzOiB7XG4gICAgZW1haWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWQ1OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcmF0aW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGh0dHBzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBcImRlZmF1bHRcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2l6ZTogNTAsXG4gICAgICByYXRpbmc6ICdnJyxcbiAgICAgIGh0dHBzOiBmYWxzZSxcbiAgICAgIFwiZGVmYXVsdFwiOiBcInJldHJvXCJcbiAgICB9O1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiYXNlLCBoYXNoLCBtb2Rlcm5Ccm93c2VyLCBxdWVyeSwgcmV0aW5hUXVlcnksIHJldGluYVNyYywgc3JjO1xuICAgIGJhc2UgPSB0aGlzLnByb3BzLmh0dHBzID8gXCJodHRwczovL3NlY3VyZS5ncmF2YXRhci5jb20vYXZhdGFyL1wiIDogJ2h0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8nO1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcbiAgICAgIHM6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgIHI6IHRoaXMucHJvcHMucmF0aW5nLFxuICAgICAgZDogdGhpcy5wcm9wc1tcImRlZmF1bHRcIl1cbiAgICB9KTtcbiAgICByZXRpbmFRdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh7XG4gICAgICBzOiB0aGlzLnByb3BzLnNpemUgKiAyLFxuICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICBkOiB0aGlzLnByb3BzW1wiZGVmYXVsdFwiXVxuICAgIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm1kNSkge1xuICAgICAgaGFzaCA9IHRoaXMucHJvcHMubWQ1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5lbWFpbCkge1xuICAgICAgaGFzaCA9IG1kNSh0aGlzLnByb3BzLmVtYWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdHcmF2YXRhciBpbWFnZSBjYW4gbm90IGJlIGZldGNoZWQuIEVpdGhlciB0aGUgXCJlbWFpbFwiIG9yIFwibWQ1XCIgcHJvcCBtdXN0IGJlIHNwZWNpZmllZC4nKTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIG51bGwpO1xuICAgIH1cbiAgICBzcmMgPSBiYXNlICsgaGFzaCArIFwiP1wiICsgcXVlcnk7XG4gICAgcmV0aW5hU3JjID0gYmFzZSArIGhhc2ggKyBcIj9cIiArIHJldGluYVF1ZXJ5O1xuICAgIG1vZGVybkJyb3dzZXIgPSB0cnVlO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCkge1xuICAgICAgbW9kZXJuQnJvd3NlciA9ICdzcmNzZXQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIH1cbiAgICBpZiAoIW1vZGVybkJyb3dzZXIgJiYgaXNSZXRpbmEoKSkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgUmVhY3QuX19zcHJlYWQoe1xuICAgICAgICBcInN0eWxlXCI6IHRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgIFwiY2xhc3NOYW1lXCI6IFwicmVhY3QtZ3JhdmF0YXIgXCIgKyB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgXCJzcmNcIjogcmV0aW5hU3JjLFxuICAgICAgICBcImhlaWdodFwiOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIFwid2lkdGhcIjogdGhpcy5wcm9wcy5zaXplXG4gICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIFJlYWN0Ll9fc3ByZWFkKHtcbiAgICAgICAgXCJzdHlsZVwiOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBcImNsYXNzTmFtZVwiOiBcInJlYWN0LWdyYXZhdGFyIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIFwic3JjXCI6IHNyYyxcbiAgICAgICAgXCJzcmNTZXRcIjogcmV0aW5hU3JjICsgXCIgMnhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICBcIndpZHRoXCI6IHRoaXMucHJvcHMuc2l6ZVxuICAgICAgfSwgdGhpcy5wcm9wcykpO1xuICAgIH1cbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBUaGlzIEhPQyBkZWNvcmF0ZXMgYSB2aXJ0dWFsaXplZCBjb21wb25lbnQgYW5kIHJlc3BvbmRzIHRvIGFycm93LWtleSBldmVudHMgYnkgc2Nyb2xsaW5nIG9uZSByb3cgb3IgY29sdW1uIGF0IGEgdGltZS5cbiAqL1xuXG52YXIgQXJyb3dLZXlTdGVwcGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFycm93S2V5U3RlcHBlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXJyb3dLZXlTdGVwcGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFycm93S2V5U3RlcHBlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyb3dLZXlTdGVwcGVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjcm9sbFRvQ29sdW1uOiAwLFxuICAgICAgc2Nyb2xsVG9Sb3c6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NvbHVtblN0YXJ0SW5kZXggPSAwO1xuICAgIF90aGlzLl9jb2x1bW5TdG9wSW5kZXggPSAwO1xuICAgIF90aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICBfdGhpcy5fcm93U3RvcEluZGV4ID0gMDtcblxuICAgIF90aGlzLl9vbktleURvd24gPSBfdGhpcy5fb25LZXlEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZCA9IF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXJyb3dLZXlTdGVwcGVyLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9zdGF0ZS5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9zdGF0ZS5zY3JvbGxUb1JvdztcblxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgb25LZXlEb3duOiB0aGlzLl9vbktleURvd25cbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW4oe1xuICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiB0aGlzLl9vblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbjogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgICAgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvUm93XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbktleURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMi5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG5cbiAgICAgIC8vIFRoZSBhYm92ZSBjYXNlcyBhbGwgcHJldmVudCBkZWZhdWx0IGV2ZW50IGV2ZW50IGJlaGF2aW9yLlxuICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRoZSBncmlkIGZyb20gc2Nyb2xsaW5nIGFmdGVyIHRoZSBzbmFwLXRvIHVwZGF0ZS5cblxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWluKHRoaXMuX3Jvd1N0b3BJbmRleCArIDEsIHJvd3NDb3VudCAtIDEpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1heCh0aGlzLl9jb2x1bW5TdGFydEluZGV4IC0gMSwgMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1pbih0aGlzLl9jb2x1bW5TdG9wSW5kZXggKyAxLCBjb2x1bW5zQ291bnQgLSAxKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWF4KHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSAxLCAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNlY3Rpb25SZW5kZXJlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNlY3Rpb25SZW5kZXJlZChfcmVmKSB7XG4gICAgICB2YXIgY29sdW1uU3RhcnRJbmRleCA9IF9yZWYuY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHZhciBjb2x1bW5TdG9wSW5kZXggPSBfcmVmLmNvbHVtblN0b3BJbmRleDtcbiAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZi5yb3dTdGFydEluZGV4O1xuICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYucm93U3RvcEluZGV4O1xuXG4gICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX2NvbHVtblN0b3BJbmRleCA9IGNvbHVtblN0b3BJbmRleDtcbiAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSByb3dTdGFydEluZGV4O1xuICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gcm93U3RvcEluZGV4O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBcnJvd0tleVN0ZXBwZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BcnJvd0tleVN0ZXBwZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQXJyb3dLZXlTdGVwcGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BcnJvd0tleVN0ZXBwZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWNvcmF0b3IgY29tcG9uZW50IHRoYXQgYXV0b21hdGljYWxseSBhZGp1c3RzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgc2luZ2xlIGNoaWxkLlxuICogQ2hpbGQgY29tcG9uZW50IHNob3VsZCBub3QgYmUgZGVjbGFyZWQgYXMgYSBjaGlsZCBidXQgc2hvdWxkIHJhdGhlciBiZSBzcGVjaWZpZWQgYnkgYSBgQ2hpbGRDb21wb25lbnRgIHByb3BlcnR5LlxuICogQWxsIG90aGVyIHByb3BlcnRpZXMgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQgY29tcG9uZW50LlxuICovXG5cbnZhciBBdXRvU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQXV0b1NpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBdXRvU2l6ZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b1NpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBdXRvU2l6ZXIpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgd2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX29uUmVzaXplID0gX3RoaXMuX29uUmVzaXplLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fc2V0UmVmID0gX3RoaXMuX3NldFJlZi5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXV0b1NpemVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAvLyBEZWZlciByZXF1aXJpbmcgcmVzaXplIGhhbmRsZXIgaW4gb3JkZXIgdG8gc3VwcG9ydCBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAvLyBTZWUgaXNzdWUgIzQxXG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplID0gcmVxdWlyZSgnLi4vdmVuZG9yL2RldGVjdEVsZW1lbnRSZXNpemUnKTtcbiAgICAgIHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUuYWRkUmVzaXplTGlzdGVuZXIodGhpcy5fcGFyZW50Tm9kZSwgdGhpcy5fb25SZXNpemUpO1xuXG4gICAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplLnJlbW92ZVJlc2l6ZUxpc3RlbmVyKHRoaXMuX3BhcmVudE5vZGUsIHRoaXMuX29uUmVzaXplKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBkaXNhYmxlSGVpZ2h0ID0gX3Byb3BzLmRpc2FibGVIZWlnaHQ7XG4gICAgICB2YXIgZGlzYWJsZVdpZHRoID0gX3Byb3BzLmRpc2FibGVXaWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGhlaWdodCA9IF9zdGF0ZS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfc3RhdGUud2lkdGg7XG5cbiAgICAgIC8vIE91dGVyIGRpdiBzaG91bGQgbm90IGZvcmNlIHdpZHRoL2hlaWdodCBzaW5jZSB0aGF0IG1heSBwcmV2ZW50IGNvbnRhaW5lcnMgZnJvbSBzaHJpbmtpbmcuXG4gICAgICAvLyBJbm5lciBjb21wb25lbnQgc2hvdWxkIG92ZXJmbG93IGFuZCB1c2UgY2FsY3VsYXRlZCB3aWR0aC9oZWlnaHQuXG4gICAgICAvLyBTZWUgaXNzdWUgIzY4IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICB2YXIgb3V0ZXJTdHlsZSA9IHsgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9O1xuXG4gICAgICBpZiAoIWRpc2FibGVIZWlnaHQpIHtcbiAgICAgICAgb3V0ZXJTdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRpc2FibGVXaWR0aCkge1xuICAgICAgICBvdXRlclN0eWxlLndpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogdGhpcy5fc2V0UmVmLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICBzdHlsZTogb3V0ZXJTdHlsZVxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbih7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGggfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uUmVzaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uUmVzaXplKCkge1xuICAgICAgdmFyIG9uUmVzaXplID0gdGhpcy5wcm9wcy5vblJlc2l6ZTtcblxuICAgICAgdmFyIF9wYXJlbnROb2RlJGdldEJvdW5kaSA9IHRoaXMuX3BhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIHZhciBoZWlnaHQgPSBfcGFyZW50Tm9kZSRnZXRCb3VuZGkuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3BhcmVudE5vZGUkZ2V0Qm91bmRpLndpZHRoO1xuXG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fcGFyZW50Tm9kZSk7XG4gICAgICB2YXIgcGFkZGluZ0xlZnQgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nTGVmdCwgMTApO1xuICAgICAgdmFyIHBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdSaWdodCwgMTApO1xuICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nVG9wLCAxMCk7XG4gICAgICB2YXIgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdCb3R0b20sIDEwKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0IC0gcGFkZGluZ1RvcCAtIHBhZGRpbmdCb3R0b20sXG4gICAgICAgIHdpZHRoOiB3aWR0aCAtIHBhZGRpbmdMZWZ0IC0gcGFkZGluZ1JpZ2h0XG4gICAgICB9KTtcblxuICAgICAgb25SZXNpemUoeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChldmVudCkge1xuICAgICAgLy8gUHJldmVudCBkZXRlY3RFbGVtZW50UmVzaXplIGxpYnJhcnkgZnJvbSBiZWluZyB0cmlnZ2VyZWQgYnkgdGhpcyBzY3JvbGwgZXZlbnQuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0UmVmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFJlZihhdXRvU2l6ZXIpIHtcbiAgICAgIC8vIEluIGNhc2UgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB1bm1vdW50ZWRcbiAgICAgIHRoaXMuX3BhcmVudE5vZGUgPSBhdXRvU2l6ZXIgJiYgYXV0b1NpemVyLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF1dG9TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9TaXplci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGNoaWxkcmVuLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGhlaWdodCwgd2lkdGggfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogRGlzYWJsZSBkeW5hbWljIDpoZWlnaHQgcHJvcGVydHkgKi9cbiAgZGlzYWJsZUhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBEaXNhYmxlIGR5bmFtaWMgOndpZHRoIHByb3BlcnR5ICovXG4gIGRpc2FibGVXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIG9uLXJlc2l6ZTogKHsgaGVpZ2h0LCB3aWR0aCB9KSAqL1xuICBvblJlc2l6ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5BdXRvU2l6ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9TaXplcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXV0b1NpemVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0F1dG9TaXplcjIgPSByZXF1aXJlKCcuL0F1dG9TaXplcicpO1xuXG52YXIgX0F1dG9TaXplcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BdXRvU2l6ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0F1dG9TaXplcjMuZGVmYXVsdDtcbmV4cG9ydHMuQXV0b1NpemVyID0gX0F1dG9TaXplcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi4vR3JpZCcpO1xuXG52YXIgX0dyaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIaWdoLW9yZGVyIGNvbXBvbmVudCB0aGF0IGF1dG8tY2FsY3VsYXRlcyBjb2x1bW4td2lkdGhzIGZvciBgR3JpZGAgY2VsbHMuXG4gKi9cblxudmFyIENvbHVtblNpemVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbHVtblNpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDb2x1bW5TaXplcihwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2x1bW5TaXplcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sdW1uU2l6ZXIpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9yZWdpc3RlckNoaWxkID0gX3RoaXMuX3JlZ2lzdGVyQ2hpbGQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENvbHVtblNpemVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY29sdW1uTWF4V2lkdGggPSBfcHJvcHMuY29sdW1uTWF4V2lkdGg7XG4gICAgICB2YXIgY29sdW1uTWluV2lkdGggPSBfcHJvcHMuY29sdW1uTWluV2lkdGg7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcblxuXG4gICAgICBpZiAoY29sdW1uTWF4V2lkdGggIT09IHByZXZQcm9wcy5jb2x1bW5NYXhXaWR0aCB8fCBjb2x1bW5NaW5XaWR0aCAhPT0gcHJldlByb3BzLmNvbHVtbk1pbldpZHRoIHx8IGNvbHVtbnNDb3VudCAhPT0gcHJldlByb3BzLmNvbHVtbnNDb3VudCB8fCB3aWR0aCAhPT0gcHJldlByb3BzLndpZHRoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wczIuY2hpbGRyZW47XG4gICAgICB2YXIgY29sdW1uTWF4V2lkdGggPSBfcHJvcHMyLmNvbHVtbk1heFdpZHRoO1xuICAgICAgdmFyIGNvbHVtbk1pbldpZHRoID0gX3Byb3BzMi5jb2x1bW5NaW5XaWR0aDtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG5cblxuICAgICAgdmFyIHNhZmVDb2x1bW5NaW5XaWR0aCA9IGNvbHVtbk1pbldpZHRoIHx8IDE7XG5cbiAgICAgIHZhciBzYWZlQ29sdW1uTWF4V2lkdGggPSBjb2x1bW5NYXhXaWR0aCA/IE1hdGgubWluKGNvbHVtbk1heFdpZHRoLCB3aWR0aCkgOiB3aWR0aDtcblxuICAgICAgdmFyIGNvbHVtbldpZHRoID0gd2lkdGggLyBjb2x1bW5zQ291bnQ7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGgubWF4KHNhZmVDb2x1bW5NaW5XaWR0aCwgY29sdW1uV2lkdGgpO1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLm1pbihzYWZlQ29sdW1uTWF4V2lkdGgsIGNvbHVtbldpZHRoKTtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5mbG9vcihjb2x1bW5XaWR0aCk7XG5cbiAgICAgIHZhciBhZGp1c3RlZFdpZHRoID0gTWF0aC5taW4od2lkdGgsIGNvbHVtbldpZHRoICogY29sdW1uc0NvdW50KTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgYWRqdXN0ZWRXaWR0aDogYWRqdXN0ZWRXaWR0aCxcbiAgICAgICAgZ2V0Q29sdW1uV2lkdGg6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKCkge1xuICAgICAgICAgIHJldHVybiBjb2x1bW5XaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJDaGlsZDogdGhpcy5fcmVnaXN0ZXJDaGlsZFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkICE9PSBudWxsICYmICEoY2hpbGQgaW5zdGFuY2VvZiBfR3JpZDIuZGVmYXVsdCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgY2hpbGQgdHlwZSByZWdpc3RlcmVkOyBvbmx5IEdyaWQgY2hpbGRyZW4gYXJlIHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkID0gY2hpbGQ7XG5cbiAgICAgIGlmICh0aGlzLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbHVtblNpemVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uU2l6ZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBhIHZpcnR1YWxpemVkIEdyaWQuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgYWRqdXN0ZWRXaWR0aCwgZ2V0Q29sdW1uV2lkdGgsIHJlZ2lzdGVyQ2hpbGQgfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICpcbiAgICogVGhlIHNwZWNpZmllZCA6Z2V0Q29sdW1uV2lkdGggZnVuY3Rpb24gc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgR3JpZCdzIDpjb2x1bW5XaWR0aCBwcm9wZXJ0eS5cbiAgICogVGhlIDpyZWdpc3RlckNoaWxkIHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIEdyaWQncyA6cmVmIHByb3BlcnR5LlxuICAgKiBUaGUgOmFkanVzdGVkV2lkdGggcHJvcGVydHkgaXMgb3B0aW9uYWw7IGl0IHJlZmxlY3RzIHRoZSBsZXNzZXIgb2YgdGhlIG92ZXJhbGwgd2lkdGggb3IgdGhlIHdpZHRoIG9mIGFsbCBjb2x1bW5zLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCBtYXhpbXVtIGFsbG93ZWQgY29sdW1uIHdpZHRoICovXG4gIGNvbHVtbk1heFdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgbWluaW11bSBhbGxvd2VkIGNvbHVtbiB3aWR0aCAqL1xuICBjb2x1bW5NaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE51bWJlciBvZiBjb2x1bW5zIGluIEdyaWQgb3IgRmxleFRhYmxlIGNoaWxkICovXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogV2lkdGggb2YgR3JpZCBvciBGbGV4VGFibGUgY2hpbGQgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDb2x1bW5TaXplcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbHVtblNpemVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0NvbHVtblNpemVyMiA9IHJlcXVpcmUoJy4vQ29sdW1uU2l6ZXInKTtcblxudmFyIF9Db2x1bW5TaXplcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2x1bW5TaXplcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQ29sdW1uU2l6ZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkNvbHVtblNpemVyID0gX0NvbHVtblNpemVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdENlbGxSZW5kZXJlciA9IGRlZmF1bHRDZWxsUmVuZGVyZXI7XG5leHBvcnRzLmRlZmF1bHRDZWxsRGF0YUdldHRlciA9IGRlZmF1bHRDZWxsRGF0YUdldHRlcjtcbmV4cG9ydHMuZGVmYXVsdEhlYWRlclJlbmRlcmVyID0gZGVmYXVsdEhlYWRlclJlbmRlcmVyO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfU29ydEluZGljYXRvciA9IHJlcXVpcmUoJy4vU29ydEluZGljYXRvcicpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydEluZGljYXRvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWZhdWx0IGNlbGwgcmVuZGVyZXIgdGhhdCBkaXNwbGF5cyBhbiBhdHRyaWJ1dGUgYXMgYSBzaW1wbGUgc3RyaW5nXG4gKiBZb3Ugc2hvdWxkIG92ZXJyaWRlIHRoZSBjb2x1bW4ncyBjZWxsUmVuZGVyZXIgaWYgeW91ciBkYXRhIGlzIHNvbWUgb3RoZXIgdHlwZSBvZiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDZWxsUmVuZGVyZXIoY2VsbERhdGEsIGNlbGxEYXRhS2V5LCByb3dEYXRhLCByb3dJbmRleCwgY29sdW1uRGF0YSkge1xuICBpZiAoY2VsbERhdGEgPT09IG51bGwgfHwgY2VsbERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gU3RyaW5nKGNlbGxEYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgYWNjZXNzb3IgZm9yIHJldHVybmluZyBhIGNlbGwgdmFsdWUgZm9yIGEgZ2l2ZW4gYXR0cmlidXRlLlxuICogVGhpcyBmdW5jdGlvbiBleHBlY3RzIHRvIG9wZXJhdGUgb24gZWl0aGVyIGEgdmFuaWxsYSBPYmplY3Qgb3IgYW4gSW1tdXRhYmxlIE1hcC5cbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlIGNvbHVtbidzIGNlbGxEYXRhR2V0dGVyIGlmIHlvdXIgZGF0YSBpcyBzb21lIG90aGVyIHR5cGUgb2Ygb2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbERhdGFHZXR0ZXIoZGF0YUtleSwgcm93RGF0YSwgY29sdW1uRGF0YSkge1xuICBpZiAocm93RGF0YS5nZXQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiByb3dEYXRhLmdldChkYXRhS2V5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm93RGF0YVtkYXRhS2V5XTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgdGFibGUgaGVhZGVyIHJlbmRlcmVyLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0SGVhZGVyUmVuZGVyZXIoX3JlZikge1xuICB2YXIgY29sdW1uRGF0YSA9IF9yZWYuY29sdW1uRGF0YTtcbiAgdmFyIGRhdGFLZXkgPSBfcmVmLmRhdGFLZXk7XG4gIHZhciBkaXNhYmxlU29ydCA9IF9yZWYuZGlzYWJsZVNvcnQ7XG4gIHZhciBsYWJlbCA9IF9yZWYubGFiZWw7XG4gIHZhciBzb3J0QnkgPSBfcmVmLnNvcnRCeTtcbiAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcmVmLnNvcnREaXJlY3Rpb247XG5cbiAgdmFyIHNob3dTb3J0SW5kaWNhdG9yID0gc29ydEJ5ID09PSBkYXRhS2V5O1xuICB2YXIgY2hpbGRyZW4gPSBbX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAge1xuICAgICAgY2xhc3NOYW1lOiAnRmxleFRhYmxlX19oZWFkZXJUcnVuY2F0ZWRUZXh0JyxcbiAgICAgIGtleTogJ2xhYmVsJyxcbiAgICAgIHRpdGxlOiBsYWJlbFxuICAgIH0sXG4gICAgbGFiZWxcbiAgKV07XG5cbiAgaWYgKHNob3dTb3J0SW5kaWNhdG9yKSB7XG4gICAgY2hpbGRyZW4ucHVzaChfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfU29ydEluZGljYXRvcjIuZGVmYXVsdCwge1xuICAgICAga2V5OiAnU29ydEluZGljYXRvcicsXG4gICAgICBzb3J0RGlyZWN0aW9uOiBzb3J0RGlyZWN0aW9uXG4gICAgfSkpO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgaGVhZGVyIGFuZCBjZWxsIGNvbnRlbnRzIG9mIGEgdGFibGUgY29sdW1uLlxuICovXG5cbnZhciBDb2x1bW4gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sdW1uLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbHVtbik7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbHVtbikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICByZXR1cm4gQ29sdW1uO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2VsbERhdGFHZXR0ZXI6IGRlZmF1bHRDZWxsRGF0YUdldHRlcixcbiAgY2VsbFJlbmRlcmVyOiBkZWZhdWx0Q2VsbFJlbmRlcmVyLFxuICBmbGV4R3JvdzogMCxcbiAgZmxleFNocmluazogMSxcbiAgaGVhZGVyUmVuZGVyZXI6IGRlZmF1bHRIZWFkZXJSZW5kZXJlclxufTtcbkNvbHVtbi5wcm9wVHlwZXMgPSB7XG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gY2VsbCAqL1xuICBjZWxsQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyBhIGNlbGwncyBkYXRhLCBnaXZlbiBpdHMgOmRhdGFLZXlcbiAgICogKGRhdGFLZXk6IHN0cmluZywgcm93RGF0YTogYW55KTogYW55XG4gICAqL1xuICBjZWxsRGF0YUdldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY2VsbCdzIGNvbnRlbnRzLlxuICAgKiAoY2VsbERhdGE6IGFueSwgY2VsbERhdGFLZXk6IHN0cmluZywgcm93RGF0YTogYW55LCByb3dJbmRleDogbnVtYmVyLCBjb2x1bW5EYXRhOiBhbnkpOiBlbGVtZW50XG4gICAqL1xuICBjZWxsUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKiogT3B0aW9uYWwgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCB0byB0aGlzIGNvbHVtbidzIDpjZWxsRGF0YUdldHRlciAqL1xuICBjb2x1bW5EYXRhOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKiogVW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcm93LWRhdGEgYXR0cmlidXRlIGNvcnJlc3BuZGluZyB0byB0aGlzIGNlbGwgKi9cbiAgZGF0YUtleTogX3JlYWN0LlByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcblxuICAvKiogSWYgc29ydCBpcyBlbmFibGVkIGZvciB0aGUgdGFibGUgYXQgbGFyZ2UsIGRpc2FibGUgaXQgZm9yIHRoaXMgY29sdW1uICovXG4gIGRpc2FibGVTb3J0OiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIEZsZXggZ3JvdyBzdHlsZTsgZGVmYXVsdHMgdG8gMCAqL1xuICBmbGV4R3JvdzogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIEZsZXggc2hyaW5rIHN0eWxlOyBkZWZhdWx0cyB0byAxICovXG4gIGZsZXhTaHJpbms6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gdGhpcyBjb2x1bW4ncyBoZWFkZXIgKi9cbiAgaGVhZGVyQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogT3B0aW9uYWwgY2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNvbHVtbiBoZWFkZXIgY29udGVudHMuXG4gICAqICh7IGNvbHVtbkRhdGE6IG9iamVjdCwgZGF0YUtleTogc3RyaW5nLCBkaXNhYmxlU29ydDogYm9vbGVhbiwgbGFiZWw6IHN0cmluZywgc29ydEJ5OiBzdHJpbmcsIHNvcnREaXJlY3Rpb246IHN0cmluZyB9KTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIGhlYWRlclJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogSGVhZGVyIGxhYmVsIGZvciB0aGlzIGNvbHVtbiAqL1xuICBsYWJlbDogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIE1heGltdW0gd2lkdGggb2YgY29sdW1uOyB0aGlzIHByb3BlcnR5IHdpbGwgb25seSBiZSB1c2VkIGlmIDpmbGV4R3JvdyBpcyA+IDAuICovXG4gIG1heFdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogTWluaW11bSB3aWR0aCBvZiBjb2x1bW4uICovXG4gIG1pbldpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogRmxleCBiYXNpcyAod2lkdGgpIGZvciB0aGlzIGNvbHVtbjsgVGhpcyB2YWx1ZSBjYW4gZ3JvdyBvciBzaHJpbmsgYmFzZWQgb24gOmZsZXhHcm93IGFuZCA6ZmxleFNocmluayBwcm9wZXJ0aWVzLiAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbHVtbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX0ZsZXhDb2x1bW4gPSByZXF1aXJlKCcuL0ZsZXhDb2x1bW4nKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhDb2x1bW4pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24gPSByZXF1aXJlKCcuL1NvcnREaXJlY3Rpb24nKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnREaXJlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogVGFibGUgY29tcG9uZW50IHdpdGggZml4ZWQgaGVhZGVycyBhbmQgdmlydHVhbGl6ZWQgcm93cyBmb3IgaW1wcm92ZWQgcGVyZm9ybWFuY2Ugd2l0aCBsYXJnZSBkYXRhIHNldHMuXG4gKiBUaGlzIGNvbXBvbmVudCBleHBlY3RzIGV4cGxpY2l0IHdpZHRoLCBoZWlnaHQsIGFuZCBwYWRkaW5nIHBhcmFtZXRlcnMuXG4gKi9cblxudmFyIEZsZXhUYWJsZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhGbGV4VGFibGUsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEZsZXhUYWJsZShwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGV4VGFibGUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEZsZXhUYWJsZSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBzY3JvbGxiYXJXaWR0aDogMFxuICAgIH07XG5cbiAgICBfdGhpcy5fY3JlYXRlUm93ID0gX3RoaXMuX2NyZWF0ZVJvdy5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2VlIEdyaWQjcmVjb21wdXRlR3JpZFNpemVcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRmxleFRhYmxlLCBbe1xuICAgIGtleTogJ3JlY29tcHV0ZVJvd0hlaWdodHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVSb3dIZWlnaHRzKCkge1xuICAgICAgdGhpcy5yZWZzLkdyaWQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICB0aGlzLl9zZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHMuZGlzYWJsZUhlYWRlcjtcbiAgICAgIHZhciBoZWFkZXJIZWlnaHQgPSBfcHJvcHMuaGVhZGVySGVpZ2h0O1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgbm9Sb3dzUmVuZGVyZXIgPSBfcHJvcHMubm9Sb3dzUmVuZGVyZXI7XG4gICAgICB2YXIgb25Sb3dzUmVuZGVyZWQgPSBfcHJvcHMub25Sb3dzUmVuZGVyZWQ7XG4gICAgICB2YXIgX29uU2Nyb2xsID0gX3Byb3BzLm9uU2Nyb2xsO1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJvd0NsYXNzTmFtZSA9IF9wcm9wcy5yb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcHJvcHMuc2Nyb2xsVG9JbmRleDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcblxuXG4gICAgICB2YXIgYXZhaWxhYmxlUm93c0hlaWdodCA9IGhlaWdodCAtIGhlYWRlckhlaWdodDtcblxuICAgICAgLy8gVGhpcyByb3ctcmVuZGVyZXIgd3JhcHBlciBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gdHJpZ2dlciByZS1yZW5kZXIgd2hlbiB0aGVcbiAgICAgIC8vIHNvcnQtYnkgb3Igc29ydC1kaXJlY3Rpb24gaGF2ZSBjaGFuZ2VkIChlbHNlIEdyaWQgd2lsbCBub3Qgc2VlIGFueSBwcm9wcyBjaGFuZ2VzKVxuICAgICAgdmFyIHJvd1JlbmRlcmVyID0gZnVuY3Rpb24gcm93UmVuZGVyZXIoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5fY3JlYXRlUm93KGluZGV4KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciByb3dDbGFzcyA9IHJvd0NsYXNzTmFtZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93Q2xhc3NOYW1lKC0xKSA6IHJvd0NsYXNzTmFtZTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlJywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICAhZGlzYWJsZUhlYWRlciAmJiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9faGVhZGVyUm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBoZWFkZXJIZWlnaHQsXG4gICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogc2Nyb2xsYmFyV2lkdGgsXG4gICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5fZ2V0UmVuZGVyZWRIZWFkZXJSb3coKVxuICAgICAgICApLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwge1xuICAgICAgICAgIHJlZjogJ0dyaWQnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9fR3JpZCcsXG4gICAgICAgICAgY29sdW1uV2lkdGg6IHdpZHRoLFxuICAgICAgICAgIGNvbHVtbnNDb3VudDogMSxcbiAgICAgICAgICBoZWlnaHQ6IGF2YWlsYWJsZVJvd3NIZWlnaHQsXG4gICAgICAgICAgbm9Db250ZW50UmVuZGVyZXI6IG5vUm93c1JlbmRlcmVyLFxuICAgICAgICAgIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICAgICAgICByZXR1cm4gX29uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZChfcmVmMikge1xuICAgICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RhcnRJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0b3BJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd1N0YXJ0SW5kZXggPSBfcmVmMi5yb3dTdGFydEluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYyLnJvd1N0b3BJbmRleDtcbiAgICAgICAgICAgIHJldHVybiBvblJvd3NSZW5kZXJlZCh7XG4gICAgICAgICAgICAgIG92ZXJzY2FuU3RhcnRJbmRleDogcm93T3ZlcnNjYW5TdGFydEluZGV4LFxuICAgICAgICAgICAgICBvdmVyc2NhblN0b3BJbmRleDogcm93T3ZlcnNjYW5TdG9wSW5kZXgsXG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXg6IHJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIHN0b3BJbmRleDogcm93U3RvcEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG92ZXJzY2FuUm93c0NvdW50OiBvdmVyc2NhblJvd3NDb3VudCxcbiAgICAgICAgICByZW5kZXJDZWxsOiBmdW5jdGlvbiByZW5kZXJDZWxsKF9yZWYzKSB7XG4gICAgICAgICAgICB2YXIgY29sdW1uSW5kZXggPSBfcmVmMy5jb2x1bW5JbmRleDtcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IF9yZWYzLnJvd0luZGV4O1xuICAgICAgICAgICAgcmV0dXJuIHJvd1JlbmRlcmVyKHJvd0luZGV4KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvd0hlaWdodDogcm93SGVpZ2h0LFxuICAgICAgICAgIHJvd3NDb3VudDogcm93c0NvdW50LFxuICAgICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb0luZGV4LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlQ29sdW1uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZUNvbHVtbihjb2x1bW4sIGNvbHVtbkluZGV4LCByb3dEYXRhLCByb3dJbmRleCkge1xuICAgICAgdmFyIF9jb2x1bW4kcHJvcHMgPSBjb2x1bW4ucHJvcHM7XG4gICAgICB2YXIgY2VsbENsYXNzTmFtZSA9IF9jb2x1bW4kcHJvcHMuY2VsbENsYXNzTmFtZTtcbiAgICAgIHZhciBjZWxsRGF0YUdldHRlciA9IF9jb2x1bW4kcHJvcHMuY2VsbERhdGFHZXR0ZXI7XG4gICAgICB2YXIgY29sdW1uRGF0YSA9IF9jb2x1bW4kcHJvcHMuY29sdW1uRGF0YTtcbiAgICAgIHZhciBkYXRhS2V5ID0gX2NvbHVtbiRwcm9wcy5kYXRhS2V5O1xuICAgICAgdmFyIGNlbGxSZW5kZXJlciA9IF9jb2x1bW4kcHJvcHMuY2VsbFJlbmRlcmVyO1xuXG4gICAgICB2YXIgY2VsbERhdGEgPSBjZWxsRGF0YUdldHRlcihkYXRhS2V5LCByb3dEYXRhLCBjb2x1bW5EYXRhKTtcbiAgICAgIHZhciByZW5kZXJlZENlbGwgPSBjZWxsUmVuZGVyZXIoY2VsbERhdGEsIGRhdGFLZXksIHJvd0RhdGEsIHJvd0luZGV4LCBjb2x1bW5EYXRhKTtcblxuICAgICAgdmFyIHN0eWxlID0gdGhpcy5fZ2V0RmxleFN0eWxlRm9yQ29sdW1uKGNvbHVtbik7XG5cbiAgICAgIHZhciB0aXRsZSA9IHR5cGVvZiByZW5kZXJlZENlbGwgPT09ICdzdHJpbmcnID8gcmVuZGVyZWRDZWxsIDogbnVsbDtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ1JvdycgKyByb3dJbmRleCArICctQ29sJyArIGNvbHVtbkluZGV4LFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19yb3dDb2x1bW4nLCBjZWxsQ2xhc3NOYW1lKSxcbiAgICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRmxleFRhYmxlX190cnVuY2F0ZWRDb2x1bW5UZXh0JyxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVuZGVyZWRDZWxsXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZUhlYWRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVIZWFkZXIoY29sdW1uLCBjb2x1bW5JbmRleCkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlYWRlckNsYXNzTmFtZSA9IF9wcm9wczIuaGVhZGVyQ2xhc3NOYW1lO1xuICAgICAgdmFyIG9uSGVhZGVyQ2xpY2sgPSBfcHJvcHMyLm9uSGVhZGVyQ2xpY2s7XG4gICAgICB2YXIgc29ydCA9IF9wcm9wczIuc29ydDtcbiAgICAgIHZhciBzb3J0QnkgPSBfcHJvcHMyLnNvcnRCeTtcbiAgICAgIHZhciBzb3J0RGlyZWN0aW9uID0gX3Byb3BzMi5zb3J0RGlyZWN0aW9uO1xuICAgICAgdmFyIF9jb2x1bW4kcHJvcHMyID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGRhdGFLZXkgPSBfY29sdW1uJHByb3BzMi5kYXRhS2V5O1xuICAgICAgdmFyIGRpc2FibGVTb3J0ID0gX2NvbHVtbiRwcm9wczIuZGlzYWJsZVNvcnQ7XG4gICAgICB2YXIgaGVhZGVyUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzMi5oZWFkZXJSZW5kZXJlcjtcbiAgICAgIHZhciBsYWJlbCA9IF9jb2x1bW4kcHJvcHMyLmxhYmVsO1xuICAgICAgdmFyIGNvbHVtbkRhdGEgPSBfY29sdW1uJHByb3BzMi5jb2x1bW5EYXRhO1xuXG4gICAgICB2YXIgc29ydEVuYWJsZWQgPSAhZGlzYWJsZVNvcnQgJiYgc29ydDtcblxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX2hlYWRlckNvbHVtbicsIGhlYWRlckNsYXNzTmFtZSwgY29sdW1uLnByb3BzLmhlYWRlckNsYXNzTmFtZSwge1xuICAgICAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckNvbHVtbic6IHNvcnRFbmFibGVkXG4gICAgICB9KTtcbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4pO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc29ydGFibGUgaGVhZGVyLCBjbGlja2luZyBpdCBzaG91bGQgdXBkYXRlIHRoZSB0YWJsZSBkYXRhJ3Mgc29ydGluZy5cbiAgICAgIHZhciBuZXdTb3J0RGlyZWN0aW9uID0gc29ydEJ5ICE9PSBkYXRhS2V5IHx8IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0MgPyBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MgOiBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDO1xuICAgICAgdmFyIG9uQ2xpY2sgPSBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICBzb3J0RW5hYmxlZCAmJiBzb3J0KGRhdGFLZXksIG5ld1NvcnREaXJlY3Rpb24pO1xuICAgICAgICBvbkhlYWRlckNsaWNrKGRhdGFLZXksIGNvbHVtbkRhdGEpO1xuICAgICAgfTtcblxuICAgICAgdmFyIHJlbmRlcmVkSGVhZGVyID0gaGVhZGVyUmVuZGVyZXIoe1xuICAgICAgICBjb2x1bW5EYXRhOiBjb2x1bW5EYXRhLFxuICAgICAgICBkYXRhS2V5OiBkYXRhS2V5LFxuICAgICAgICBkaXNhYmxlU29ydDogZGlzYWJsZVNvcnQsXG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHNvcnREaXJlY3Rpb246IHNvcnREaXJlY3Rpb25cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnSGVhZGVyLUNvbCcgKyBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2tcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyZWRIZWFkZXJcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZVJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVSb3cocm93SW5kZXgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuO1xuICAgICAgdmFyIG9uUm93Q2xpY2sgPSBfcHJvcHMzLm9uUm93Q2xpY2s7XG4gICAgICB2YXIgcm93Q2xhc3NOYW1lID0gX3Byb3BzMy5yb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93R2V0dGVyID0gX3Byb3BzMy5yb3dHZXR0ZXI7XG4gICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSB0aGlzLnN0YXRlLnNjcm9sbGJhcldpZHRoO1xuXG5cbiAgICAgIHZhciByb3dDbGFzcyA9IHJvd0NsYXNzTmFtZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93Q2xhc3NOYW1lKHJvd0luZGV4KSA6IHJvd0NsYXNzTmFtZTtcblxuICAgICAgdmFyIHJlbmRlcmVkUm93ID0gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5fY3JlYXRlQ29sdW1uKGNvbHVtbiwgY29sdW1uSW5kZXgsIHJvd0dldHRlcihyb3dJbmRleCksIHJvd0luZGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiByb3dJbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fcm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICByZXR1cm4gb25Sb3dDbGljayhyb3dJbmRleCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9nZXRSb3dIZWlnaHQocm93SW5kZXgpLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBzY3JvbGxiYXJXaWR0aFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyZWRSb3dcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgZmxleC1zaHJpbmssIGZsZXgtZ3JvdywgYW5kIHdpZHRoIHZhbHVlcyBmb3IgYSBjZWxsIChoZWFkZXIgb3IgY29sdW1uKS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2dldEZsZXhTdHlsZUZvckNvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKSB7XG4gICAgICB2YXIgZmxleFZhbHVlID0gY29sdW1uLnByb3BzLmZsZXhHcm93ICsgJyAnICsgY29sdW1uLnByb3BzLmZsZXhTaHJpbmsgKyAnICcgKyBjb2x1bW4ucHJvcHMud2lkdGggKyAncHgnO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGZsZXg6IGZsZXhWYWx1ZSxcbiAgICAgICAgbXNGbGV4OiBmbGV4VmFsdWUsXG4gICAgICAgIFdlYmtpdEZsZXg6IGZsZXhWYWx1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5tYXhXaWR0aCkge1xuICAgICAgICBzdHlsZS5tYXhXaWR0aCA9IGNvbHVtbi5wcm9wcy5tYXhXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5taW5XaWR0aCkge1xuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGNvbHVtbi5wcm9wcy5taW5XaWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRSZW5kZXJlZEhlYWRlclJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSZW5kZXJlZEhlYWRlclJvdygpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHM0LmNoaWxkcmVuO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHM0LmRpc2FibGVIZWFkZXI7XG5cbiAgICAgIHZhciBpdGVtcyA9IGRpc2FibGVIZWFkZXIgPyBbXSA6IGNoaWxkcmVuO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLm1hcChpdGVtcywgZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNC5fY3JlYXRlSGVhZGVyKGNvbHVtbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFJvd0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSb3dIZWlnaHQocm93SW5kZXgpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSB0aGlzLnByb3BzLnJvd0hlaWdodDtcblxuXG4gICAgICByZXR1cm4gcm93SGVpZ2h0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dIZWlnaHQocm93SW5kZXgpIDogcm93SGVpZ2h0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxiYXJXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgIHZhciBHcmlkID0gKDAsIF9yZWFjdERvbS5maW5kRE9NTm9kZSkodGhpcy5yZWZzLkdyaWQpO1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gR3JpZC5jbGllbnRXaWR0aCB8fCAwO1xuICAgICAgdmFyIG9mZnNldFdpZHRoID0gR3JpZC5vZmZzZXRXaWR0aCB8fCAwO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gb2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNjcm9sbGJhcldpZHRoOiBzY3JvbGxiYXJXaWR0aCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRmxleFRhYmxlO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuRmxleFRhYmxlLnByb3BUeXBlcyA9IHtcbiAgLyoqIE9uZSBvciBtb3JlIEZsZXhDb2x1bW5zIGRlc2NyaWJpbmcgdGhlIGRhdGEgZGlzcGxheWVkIGluIHRoaXMgcm93ICovXG4gIGNoaWxkcmVuOiBmdW5jdGlvbiBjaGlsZHJlbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4udG9BcnJheShwcm9wcy5jaGlsZHJlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNoaWxkcmVuW2ldLnR5cGUgIT09IF9GbGV4Q29sdW1uMi5kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ZsZXhUYWJsZSBvbmx5IGFjY2VwdHMgY2hpbGRyZW4gb2YgdHlwZSBGbGV4Q29sdW1uJyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgbmFtZSAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBEaXNhYmxlIHJlbmRlcmluZyB0aGUgaGVhZGVyIGF0IGFsbCAqL1xuICBkaXNhYmxlSGVhZGVyOiBfcmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBhbGwgY29sdW1uIGhlYWRlcnMgKi9cbiAgaGVhZGVyQ2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRml4ZWQgaGVpZ2h0IG9mIGhlYWRlciByb3cgKi9cbiAgaGVhZGVySGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBGaXhlZC9hdmFpbGFibGUgaGVpZ2h0IGZvciBvdXQgRE9NIGVsZW1lbnQgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHRhYmxlIGJvZHkgcm93cyB3aGVuIHJvd3NDb3VudCBpcyAwICovXG4gIG5vUm93c1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICogT3B0aW9uYWwgY2FsbGJhY2sgd2hlbiBhIGNvbHVtbidzIGhlYWRlciBpcyBjbGlja2VkLlxuICAqIChkYXRhS2V5OiBzdHJpbmcpOiB2b2lkXG4gICovXG4gIG9uSGVhZGVyQ2xpY2s6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGEgdXNlciBjbGlja3Mgb24gYSB0YWJsZSByb3cuXG4gICAqIChyb3dJbmRleDogbnVtYmVyKTogdm9pZFxuICAgKi9cbiAgb25Sb3dDbGljazogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNsaWNlIG9mIHJvd3MgdGhhdCB3ZXJlIGp1c3QgcmVuZGVyZWQuXG4gICAqICh7IHN0YXJ0SW5kZXgsIHN0b3BJbmRleCB9KTogdm9pZFxuICAgKi9cbiAgb25Sb3dzUmVuZGVyZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyB0byByZW5kZXIgYWJvdmUvYmVsb3cgdGhlIHZpc2libGUgYm91bmRzIG9mIHRoZSBsaXN0LlxuICAgKiBUaGVzZSByb3dzIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICovXG4gIG92ZXJzY2FuUm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gYWxsIHRhYmxlIHJvd3MgKGluY2x1ZGluZyB0aGUgaGVhZGVyIHJvdykuXG4gICAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIGEgQ1NTIGNsYXNzIG5hbWUgKHN0cmluZykgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBjbGFzcyBuYW1lLlxuICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGl0cyBzaWduYXR1cmUgc2hvdWxkIGJlOiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZ1xuICAgKi9cbiAgcm93Q2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIGEgZGF0YSByb3cgZ2l2ZW4gYW4gaW5kZXguXG4gICAqIChpbmRleDogbnVtYmVyKTogYW55XG4gICAqL1xuICByb3dHZXR0ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE51bWJlciBvZiByb3dzIGluIHRhYmxlLiAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KSAqL1xuICBzY3JvbGxUb0luZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogVmVydGljYWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBTb3J0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBpZiBhIHNvcnRhYmxlIGhlYWRlciBpcyBjbGlja2VkLlxuICAgKiAoZGF0YUtleTogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uKTogdm9pZFxuICAgKi9cbiAgc29ydDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKiBGbGV4VGFibGUgZGF0YSBpcyBjdXJyZW50bHkgc29ydGVkIGJ5IHRoaXMgOmRhdGFLZXkgKGlmIGl0IGlzIHNvcnRlZCBhdCBhbGwpICovXG4gIHNvcnRCeTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIEZsZXhUYWJsZSBkYXRhIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gdGhpcyBkaXJlY3Rpb24gKGlmIGl0IGlzIHNvcnRlZCBhdCBhbGwpICovXG4gIHNvcnREaXJlY3Rpb246IF9yZWFjdC5Qcm9wVHlwZXMub25lT2YoW19Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQywgX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ10pLFxuXG4gIC8qKiBXaWR0aCBvZiBsaXN0ICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuRmxleFRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlzYWJsZUhlYWRlcjogZmFsc2UsXG4gIGhlYWRlckhlaWdodDogMCxcbiAgbm9Sb3dzUmVuZGVyZXI6IGZ1bmN0aW9uIG5vUm93c1JlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvbkhlYWRlckNsaWNrOiBmdW5jdGlvbiBvbkhlYWRlckNsaWNrKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblJvd0NsaWNrOiBmdW5jdGlvbiBvblJvd0NsaWNrKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblJvd3NSZW5kZXJlZDogZnVuY3Rpb24gb25Sb3dzUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IDEwXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gRmxleFRhYmxlOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBTb3J0RGlyZWN0aW9uID0ge1xuICAvKipcbiAgICogU29ydCBpdGVtcyBpbiBhc2NlbmRpbmcgb3JkZXIuXG4gICAqIFRoaXMgbWVhbnMgYXJyYW5naW5nIGZyb20gdGhlIGxvd2VzdCB2YWx1ZSB0byB0aGUgaGlnaGVzdCAoZS5nLiBhLXosIDAtOSkuXG4gICAqL1xuICBBU0M6ICdBU0MnLFxuXG4gIC8qKlxuICAgKiBTb3J0IGl0ZW1zIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gICAqIFRoaXMgbWVhbnMgYXJyYW5naW5nIGZyb20gdGhlIGhpZ2hlc3QgdmFsdWUgdG8gdGhlIGxvd2VzdCAoZS5nLiB6LWEsIDktMCkuXG4gICAqL1xuICBERVNDOiAnREVTQydcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnREaXJlY3Rpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gU29ydEluZGljYXRvcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBEaXNwbGF5ZWQgYmVzaWRlIGEgaGVhZGVyIHRvIGluZGljYXRlIHRoYXQgYSBGbGV4VGFibGUgaXMgY3VycmVudGx5IHNvcnRlZCBieSB0aGlzIGNvbHVtbi5cbiAqL1xuZnVuY3Rpb24gU29ydEluZGljYXRvcihfcmVmKSB7XG4gIHZhciBzb3J0RGlyZWN0aW9uID0gX3JlZi5zb3J0RGlyZWN0aW9uO1xuXG4gIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24nLCB7XG4gICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uLS1BU0MnOiBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsXG4gICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uLS1ERVNDJzogc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ1xuICB9KTtcblxuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ3N2ZycsXG4gICAge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgd2lkdGg6IDE4LFxuICAgICAgaGVpZ2h0OiAxOCxcbiAgICAgIHZpZXdCb3g6ICcwIDAgMjQgMjQnLFxuICAgICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB9LFxuICAgIHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQyA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTcgMTRsNS01IDUgNXonIH0pIDogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNNyAxMGw1IDUgNS01eicgfSksXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNMCAwaDI0djI0SDB6JywgZmlsbDogJ25vbmUnIH0pXG4gICk7XG59XG5Tb3J0SW5kaWNhdG9yLnByb3BUeXBlcyA9IHtcbiAgc29ydERpcmVjdGlvbjogX3JlYWN0LlByb3BUeXBlcy5vbmVPZihbX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDLCBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDXSlcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Tb3J0SW5kaWNhdG9yID0gZXhwb3J0cy5Tb3J0RGlyZWN0aW9uID0gZXhwb3J0cy5GbGV4Q29sdW1uID0gZXhwb3J0cy5GbGV4VGFibGUgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfRmxleFRhYmxlMiA9IHJlcXVpcmUoJy4vRmxleFRhYmxlJyk7XG5cbnZhciBfRmxleFRhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhUYWJsZTIpO1xuXG52YXIgX0ZsZXhDb2x1bW4yID0gcmVxdWlyZSgnLi9GbGV4Q29sdW1uJyk7XG5cbnZhciBfRmxleENvbHVtbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GbGV4Q29sdW1uMik7XG5cbnZhciBfU29ydERpcmVjdGlvbjIgPSByZXF1aXJlKCcuL1NvcnREaXJlY3Rpb24nKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnREaXJlY3Rpb24yKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMiA9IHJlcXVpcmUoJy4vU29ydEluZGljYXRvcicpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydEluZGljYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfRmxleFRhYmxlMy5kZWZhdWx0O1xuZXhwb3J0cy5GbGV4VGFibGUgPSBfRmxleFRhYmxlMy5kZWZhdWx0O1xuZXhwb3J0cy5GbGV4Q29sdW1uID0gX0ZsZXhDb2x1bW4zLmRlZmF1bHQ7XG5leHBvcnRzLlNvcnREaXJlY3Rpb24gPSBfU29ydERpcmVjdGlvbjMuZGVmYXVsdDtcbmV4cG9ydHMuU29ydEluZGljYXRvciA9IF9Tb3J0SW5kaWNhdG9yMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9HcmlkVXRpbHMgPSByZXF1aXJlKCcuL0dyaWRVdGlscycpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9yYWYgPSByZXF1aXJlKCdyYWYnKTtcblxudmFyIF9yYWYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmFmKTtcblxudmFyIF9zY3JvbGxiYXJTaXplID0gcmVxdWlyZSgnZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplJyk7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGxiYXJTaXplKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIG1pbGlzZWNvbmRzIGR1cmluZyB3aGljaCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICogVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgbWFrZXMgc2Nyb2xsaW5nIHNtb290aGVyLlxuICovXG52YXIgSVNfU0NST0xMSU5HX1RJTUVPVVQgPSAxNTA7XG5cbi8qKlxuICogQ29udHJvbHMgd2hldGhlciB0aGUgR3JpZCB1cGRhdGVzIHRoZSBET00gZWxlbWVudCdzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlIG9yIGp1c3Qgb2JzZXJ2ZXMgaXQuXG4gKiBUaGlzIHByZXZlbnRzIEdyaWQgZnJvbSBpbnRlcnJ1cHRpbmcgbW91c2Utd2hlZWwgYW5pbWF0aW9ucyAoc2VlIGlzc3VlICMyKS5cbiAqL1xudmFyIFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUyA9IHtcbiAgT0JTRVJWRUQ6ICdvYnNlcnZlZCcsXG4gIFJFUVVFU1RFRDogJ3JlcXVlc3RlZCdcbn07XG5cbi8qKlxuICogUmVuZGVycyB0YWJ1bGFyIGRhdGEgd2l0aCB2aXJ0dWFsaXphdGlvbiBhbG9uZyB0aGUgdmVydGljYWwgYW5kIGhvcml6b250YWwgYXhlcy5cbiAqIFJvdyBoZWlnaHRzIGFuZCBjb2x1bW4gd2lkdGhzIG11c3QgYmUga25vd24gYWhlYWQgb2YgdGltZSBhbmQgc3BlY2lmaWVkIGFzIHByb3BlcnRpZXMuXG4gKi9cblxudmFyIEdyaWQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoR3JpZCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gR3JpZChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHcmlkKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihHcmlkKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGU6IGZhbHNlLFxuICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG5cbiAgICAvLyBJbnZva2VzIG9uU2VjdGlvblJlbmRlcmVkIGNhbGxiYWNrIG9ubHkgd2hlbiBzdGFydC9zdG9wIHJvdyBvciBjb2x1bW4gaW5kaWNlcyBjaGFuZ2VcbiAgICBfdGhpcy5fb25HcmlkUmVuZGVyZWRNZW1vaXplciA9ICgwLCBfR3JpZFV0aWxzLmNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIpKCk7XG4gICAgX3RoaXMuX29uU2Nyb2xsTWVtb2l6ZXIgPSAoMCwgX0dyaWRVdGlscy5jcmVhdGVDYWxsYmFja01lbW9pemVyKShmYWxzZSk7XG5cbiAgICAvLyBCaW5kIGZ1bmN0aW9ucyB0byBpbnN0YW5jZSBzbyB0aGV5IGRvbid0IGxvc2UgY29udGV4dCB3aGVuIHBhc3NlZCBhcm91bmRcbiAgICBfdGhpcy5fY29tcHV0ZUdyaWRNZXRhZGF0YSA9IF90aGlzLl9jb21wdXRlR3JpZE1ldGFkYXRhLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlciA9IF90aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlci5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbiA9IF90aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4uYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93ID0gX3RoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93LmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZWQgcmVjb21wdXRlIG9mIHJvdyBoZWlnaHRzIGFuZCBjb2x1bW4gd2lkdGhzLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgaWYgZHluYW1pYyBjb2x1bW4gb3Igcm93IHNpemVzIGhhdmUgY2hhbmdlZCBidXQgbm90aGluZyBlbHNlIGhhcy5cbiAgICogU2luY2UgR3JpZCBvbmx5IHJlY2VpdmVzIDpjb2x1bW5zQ291bnQgYW5kIDpyb3dzQ291bnQgaXQgaGFzIG5vIHdheSBvZiBkZXRlY3Rpbmcgd2hlbiB0aGUgdW5kZXJseWluZyBkYXRhIGNoYW5nZXMuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEdyaWQsIFt7XG4gICAga2V5OiAncmVjb21wdXRlR3JpZFNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWNvbXB1dGVHcmlkU2l6ZSgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9wcm9wcy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvQ29sdW1uID0gX3Byb3BzLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfcHJvcHMuc2Nyb2xsVG9Sb3c7XG5cblxuICAgICAgdGhpcy5fc2Nyb2xsYmFyU2l6ZSA9ICgwLCBfc2Nyb2xsYmFyU2l6ZTIuZGVmYXVsdCkoKTtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCB8fCBzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9Db2x1bW4gPj0gMCB8fCBzY3JvbGxUb1JvdyA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbigpO1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgb25TY3JvbGwgY2FsbGJhY2tcbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0IHx8IDAsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wIHx8IDAsXG4gICAgICAgIHRvdGFsQ29sdW1uc1dpZHRoOiB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpLFxuICAgICAgICB0b3RhbFJvd3NIZWlnaHQ6IHRoaXMuX2dldFRvdGFsUm93c0hlaWdodCgpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBOZXcgc2Nyb2xsLXRvLWNlbGwgcHJvcHMgaGF2ZSBiZWVuIHNldFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IF9wcm9wczIuY29sdW1uV2lkdGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMi5oZWlnaHQ7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzMi5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcHJvcHMyLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3Byb3BzMi5zY3JvbGxUb1JvdztcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBfc3RhdGUuc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb247XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlLnNjcm9sbFRvcDtcblxuICAgICAgLy8gTWFrZSBzdXJlIHJlcXVlc3RlZCBjaGFuZ2VzIHRvIDpzY3JvbGxMZWZ0IG9yIDpzY3JvbGxUb3AgZ2V0IGFwcGxpZWQuXG4gICAgICAvLyBBc3NpZ25pbmcgdG8gc2Nyb2xsTGVmdC9zY3JvbGxUb3AgdGVsbHMgdGhlIGJyb3dzZXIgdG8gaW50ZXJydXB0IGFueSBydW5uaW5nIHNjcm9sbCBhbmltYXRpb25zLFxuICAgICAgLy8gQW5kIHRvIGRpc2NhcmQgYW55IHBlbmRpbmcgYXN5bmMgY2hhbmdlcyB0byB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRoYXQgbWF5IGhhdmUgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lIChlLmcuIG9uIGEgc2VwYXJhdGUgc2Nyb2xsaW5nIHRocmVhZCkuXG4gICAgICAvLyBTbyB3ZSBvbmx5IHNldCB0aGVzZSB3aGVuIHdlIHJlcXVpcmUgYW4gYWRqdXN0bWVudCBvZiB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgLy8gU2VlIGlzc3VlICMyIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICBpZiAoc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPT09IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQpIHtcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSBwcmV2U3RhdGUuc2Nyb2xsTGVmdCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHByZXZTdGF0ZS5zY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgY3VycmVudCA6c2Nyb2xsVG9Db2x1bW4gb3IgOnNjcm9sbFRvUm93IHZhbHVlcyByZXF1aXJlcyBpdFxuICAgICAgKDAsIF9HcmlkVXRpbHMudXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogY29sdW1uV2lkdGgsXG4gICAgICAgIHByZXZpb3VzQ2VsbHNDb3VudDogcHJldlByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBwcmV2aW91c1Njcm9sbFRvSW5kZXg6IHByZXZQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgcHJldmlvdXNTaXplOiBwcmV2UHJvcHMud2lkdGgsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHNpemU6IHdpZHRoLFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiB0aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW5cbiAgICAgIH0pO1xuICAgICAgKDAsIF9HcmlkVXRpbHMudXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogcm93c0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogcm93SGVpZ2h0LFxuICAgICAgICBwcmV2aW91c0NlbGxzQ291bnQ6IHByZXZQcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIHByZXZpb3VzQ2VsbFNpemU6IHByZXZQcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy5oZWlnaHQsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxUb0luZGV4OiBzY3JvbGxUb1JvdyxcbiAgICAgICAgc2l6ZTogaGVpZ2h0LFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiB0aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1Jvd1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBvblJvd3NSZW5kZXJlZCBjYWxsYmFjayBpZiBzdGFydC9zdG9wIGluZGljZXMgaGF2ZSBjaGFuZ2VkXG4gICAgICB0aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuX2NvbXB1dGVHcmlkTWV0YWRhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBFbXB0eSBjb250ZW50ICgwIHJvd3Mgb3IgY29sdW1ucylcbiAgICAgKiAyKSBOZXcgc2Nyb2xsIHByb3BzIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiAzKSBDZWxscy1jb3VudCBvciBjZWxscy1zaXplIGhhcyBjaGFuZ2VkLCBtYWtpbmcgcHJldmlvdXMgc2Nyb2xsIG9mZnNldHMgaW52YWxpZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgaWYgKG5leHRQcm9wcy5jb2x1bW5zQ291bnQgPT09IDAgJiYgbmV4dFN0YXRlLnNjcm9sbExlZnQgIT09IDAgfHwgbmV4dFByb3BzLnJvd3NDb3VudCA9PT0gMCAmJiBuZXh0U3RhdGUuc2Nyb2xsVG9wICE9PSAwKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFByb3BzLnNjcm9sbExlZnQgIT09IHRoaXMucHJvcHMuc2Nyb2xsTGVmdCB8fCBuZXh0UHJvcHMuc2Nyb2xsVG9wICE9PSB0aGlzLnByb3BzLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbmV4dFByb3BzLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBuZXh0UHJvcHMuc2Nyb2xsVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgc2Nyb2xsIG9mZnNldHMgaWYgdGhlIHNpemUgb3IgbnVtYmVyIG9mIGNlbGxzIGhhdmUgY2hhbmdlZCwgaW52YWxpZGF0aW5nIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgKDAsIF9HcmlkVXRpbHMuY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlcikoe1xuICAgICAgICBjZWxsc0NvdW50OiB0aGlzLnByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgY2VsbFNpemU6IHRoaXMucHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrOiB0aGlzLl9jb21wdXRlR3JpZE1ldGFkYXRhLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzOiBuZXh0UHJvcHMsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZTogbmV4dFN0YXRlLmNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGUsXG4gICAgICAgIG5leHRDZWxsc0NvdW50OiBuZXh0UHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBuZXh0Q2VsbFNpemU6IG5leHRQcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uXG4gICAgICB9KTtcbiAgICAgICgwLCBfR3JpZFV0aWxzLmNvbXB1dGVDZWxsTWV0YWRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXRIZWxwZXIpKHtcbiAgICAgICAgY2VsbHNDb3VudDogdGhpcy5wcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIGNlbGxTaXplOiB0aGlzLnByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IHRoaXMuX2NvbXB1dGVHcmlkTWV0YWRhdGEsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHM6IG5leHRQcm9wcyxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlOiBuZXh0U3RhdGUuY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZSxcbiAgICAgICAgbmV4dENlbGxzQ291bnQ6IG5leHRQcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIG5leHRDZWxsU2l6ZTogbmV4dFByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgbmV4dFNjcm9sbFRvSW5kZXg6IG5leHRQcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogdGhpcy5wcm9wcy5zY3JvbGxUb1JvdyxcbiAgICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDogdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3dcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMzLmhlaWdodDtcbiAgICAgIHZhciBub0NvbnRlbnRSZW5kZXJlciA9IF9wcm9wczMubm9Db250ZW50UmVuZGVyZXI7XG4gICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5zQ291bnQgPSBfcHJvcHMzLm92ZXJzY2FuQ29sdW1uc0NvdW50O1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzMy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByZW5kZXJDZWxsID0gX3Byb3BzMy5yZW5kZXJDZWxsO1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wczMucm93c0NvdW50O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMy53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IF9zdGF0ZTIuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZTIuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUyLnNjcm9sbFRvcDtcblxuXG4gICAgICB2YXIgY2hpbGRyZW5Ub0Rpc3BsYXkgPSBbXTtcblxuICAgICAgLy8gUmVuZGVyIG9ubHkgZW5vdWdoIGNvbHVtbnMgYW5kIHJvd3MgdG8gY292ZXIgdGhlIHZpc2libGUgYXJlYSBvZiB0aGUgZ3JpZC5cbiAgICAgIGlmIChoZWlnaHQgPiAwICYmIHdpZHRoID4gMCkge1xuICAgICAgICB2YXIgdmlzaWJsZUNvbHVtbkluZGljZXMgPSAoMCwgX0dyaWRVdGlscy5nZXRWaXNpYmxlQ2VsbEluZGljZXMpKHtcbiAgICAgICAgICBjZWxsc0NvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgICAgY2VsbE1ldGFkYXRhOiB0aGlzLl9jb2x1bW5NZXRhZGF0YSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxMZWZ0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB2aXNpYmxlUm93SW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldFZpc2libGVDZWxsSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcmUgZm9yIF9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpXG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCA9IHZpc2libGVDb2x1bW5JbmRpY2VzLnN0YXJ0O1xuICAgICAgICB0aGlzLl9yZW5kZXJlZENvbHVtblN0b3BJbmRleCA9IHZpc2libGVDb2x1bW5JbmRpY2VzLnN0b3A7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCA9IHZpc2libGVSb3dJbmRpY2VzLnN0YXJ0O1xuICAgICAgICB0aGlzLl9yZW5kZXJlZFJvd1N0b3BJbmRleCA9IHZpc2libGVSb3dJbmRpY2VzLnN0b3A7XG5cbiAgICAgICAgdmFyIG92ZXJzY2FuQ29sdW1uSW5kaWNlcyA9ICgwLCBfR3JpZFV0aWxzLmdldE92ZXJzY2FuSW5kaWNlcykoe1xuICAgICAgICAgIGNlbGxzQ291bnQ6IGNvbHVtbnNDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuQ29sdW1uc0NvdW50LFxuICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBzdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBvdmVyc2NhblJvd0luZGljZXMgPSAoMCwgX0dyaWRVdGlscy5nZXRPdmVyc2NhbkluZGljZXMpKHtcbiAgICAgICAgICBjZWxsc0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5DZWxsc0NvdW50OiBvdmVyc2NhblJvd3NDb3VudCxcbiAgICAgICAgICBzdGFydEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgc3RvcEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0b3BJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fY29sdW1uU3RhcnRJbmRleCA9IG92ZXJzY2FuQ29sdW1uSW5kaWNlcy5vdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX2NvbHVtblN0b3BJbmRleCA9IG92ZXJzY2FuQ29sdW1uSW5kaWNlcy5vdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgdGhpcy5fcm93U3RhcnRJbmRleCA9IG92ZXJzY2FuUm93SW5kaWNlcy5vdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd1N0b3BJbmRleCA9IG92ZXJzY2FuUm93SW5kaWNlcy5vdmVyc2NhblN0b3BJbmRleDtcblxuICAgICAgICBmb3IgKHZhciByb3dJbmRleCA9IHRoaXMuX3Jvd1N0YXJ0SW5kZXg7IHJvd0luZGV4IDw9IHRoaXMuX3Jvd1N0b3BJbmRleDsgcm93SW5kZXgrKykge1xuICAgICAgICAgIHZhciByb3dEYXR1bSA9IHRoaXMuX3Jvd01ldGFkYXRhW3Jvd0luZGV4XTtcblxuICAgICAgICAgIGZvciAodmFyIGNvbHVtbkluZGV4ID0gdGhpcy5fY29sdW1uU3RhcnRJbmRleDsgY29sdW1uSW5kZXggPD0gdGhpcy5fY29sdW1uU3RvcEluZGV4OyBjb2x1bW5JbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgY29sdW1uRGF0dW0gPSB0aGlzLl9jb2x1bW5NZXRhZGF0YVtjb2x1bW5JbmRleF07XG4gICAgICAgICAgICB2YXIgcmVuZGVyZWRDZWxsID0gcmVuZGVyQ2VsbCh7IGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCwgcm93SW5kZXg6IHJvd0luZGV4IH0pO1xuICAgICAgICAgICAgdmFyIGtleSA9IHJvd0luZGV4ICsgJy0nICsgY29sdW1uSW5kZXg7XG5cbiAgICAgICAgICAgIC8vIGFueSBvdGhlciBmYWxzZXkgdmFsdWUgd2lsbCBiZSByZW5kZXJlZFxuICAgICAgICAgICAgLy8gYXMgYSB0ZXh0IG5vZGUgYnkgUmVhY3RcbiAgICAgICAgICAgIGlmIChyZW5kZXJlZENlbGwgPT0gbnVsbCB8fCByZW5kZXJlZENlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdHcmlkX19jZWxsJyxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9nZXRSb3dIZWlnaHQocm93SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgbGVmdDogY29sdW1uRGF0dW0ub2Zmc2V0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgIHRvcDogcm93RGF0dW0ub2Zmc2V0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9nZXRDb2x1bW5XaWR0aChjb2x1bW5JbmRleClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXkucHVzaChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBncmlkU3R5bGUgPSB7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgIH07XG5cbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IHRoaXMuX2dldFRvdGFsQ29sdW1uc1dpZHRoKCk7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gdGhpcy5fZ2V0VG90YWxSb3dzSGVpZ2h0KCk7XG5cbiAgICAgIC8vIEZvcmNlIGJyb3dzZXIgdG8gaGlkZSBzY3JvbGxiYXJzIHdoZW4gd2Uga25vdyB0aGV5IGFyZW4ndCBuZWNlc3NhcnkuXG4gICAgICAvLyBPdGhlcndpc2Ugb25jZSBzY3JvbGxiYXJzIGFwcGVhciB0aGV5IG1heSBub3QgZGlzYXBwZWFyIGFnYWluLlxuICAgICAgLy8gRm9yIG1vcmUgaW5mbyBzZWUgaXNzdWUgIzExNlxuICAgICAgaWYgKHRvdGFsQ29sdW1uc1dpZHRoIDw9IHdpZHRoKSB7XG4gICAgICAgIGdyaWRTdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRvdGFsUm93c0hlaWdodCA8PSBoZWlnaHQpIHtcbiAgICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiAnc2Nyb2xsaW5nQ29udGFpbmVyJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0dyaWQnLCBjbGFzc05hbWUpLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICB0YWJJbmRleDogMCxcbiAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDAgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogaXNTY3JvbGxpbmcgPyAnbm9uZScgOiAnYXV0bydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCAmJiBub0NvbnRlbnRSZW5kZXJlcigpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGVscGVyIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfY29tcHV0ZUdyaWRNZXRhZGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wdXRlR3JpZE1ldGFkYXRhKHByb3BzKSB7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gcHJvcHMuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGNvbHVtbldpZHRoID0gcHJvcHMuY29sdW1uV2lkdGg7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gcHJvcHMucm93SGVpZ2h0O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IHByb3BzLnJvd3NDb3VudDtcblxuXG4gICAgICB0aGlzLl9jb2x1bW5NZXRhZGF0YSA9ICgwLCBfR3JpZFV0aWxzLmluaXRDZWxsTWV0YWRhdGEpKHtcbiAgICAgICAgY2VsbHNDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBzaXplOiBjb2x1bW5XaWR0aFxuICAgICAgfSk7XG4gICAgICB0aGlzLl9yb3dNZXRhZGF0YSA9ICgwLCBfR3JpZFV0aWxzLmluaXRDZWxsTWV0YWRhdGEpKHtcbiAgICAgICAgY2VsbHNDb3VudDogcm93c0NvdW50LFxuICAgICAgICBzaXplOiByb3dIZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gOmlzU2Nyb2xsaW5nIGZsYWcgZm9yIGEgc21hbGwgd2luZG93IG9mIHRpbWUuXG4gICAgICogVGhpcyBmbGFnIGlzIHVzZWQgdG8gZGlzYWJsZSBwb2ludGVyIGV2ZW50cyBvbiB0aGUgc2Nyb2xsYWJsZSBwb3J0aW9uIG9mIHRoZSBHcmlkLlxuICAgICAqIFRoaXMgcHJldmVudHMgamVya3kvc3R1dHRlcnkgbW91c2Utd2hlZWwgc2Nyb2xsaW5nLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0sIElTX1NDUk9MTElOR19USU1FT1VUKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0Q29sdW1uV2lkdGgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q29sdW1uV2lkdGgoaW5kZXgpIHtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IHRoaXMucHJvcHMuY29sdW1uV2lkdGg7XG5cblxuICAgICAgcmV0dXJuIGNvbHVtbldpZHRoIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBjb2x1bW5XaWR0aChpbmRleCkgOiBjb2x1bW5XaWR0aDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0Um93SGVpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFJvd0hlaWdodChpbmRleCkge1xuICAgICAgdmFyIHJvd0hlaWdodCA9IHRoaXMucHJvcHMucm93SGVpZ2h0O1xuXG5cbiAgICAgIHJldHVybiByb3dIZWlnaHQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0hlaWdodChpbmRleCkgOiByb3dIZWlnaHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFRvdGFsQ29sdW1uc1dpZHRoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFRvdGFsQ29sdW1uc1dpZHRoKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbk1ldGFkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdHVtID0gdGhpcy5fY29sdW1uTWV0YWRhdGFbdGhpcy5fY29sdW1uTWV0YWRhdGEubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0VG90YWxSb3dzSGVpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFRvdGFsUm93c0hlaWdodCgpIHtcbiAgICAgIGlmICh0aGlzLl9yb3dNZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXR1bSA9IHRoaXMuX3Jvd01ldGFkYXRhW3RoaXMuX3Jvd01ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCkge1xuICAgICAgdmFyIG9uU2VjdGlvblJlbmRlcmVkID0gdGhpcy5wcm9wcy5vblNlY3Rpb25SZW5kZXJlZDtcblxuXG4gICAgICB0aGlzLl9vbkdyaWRSZW5kZXJlZE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IG9uU2VjdGlvblJlbmRlcmVkLFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgY29sdW1uT3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9jb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtbk92ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIGNvbHVtblN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRDb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgcm93T3ZlcnNjYW5TdGFydEluZGV4OiB0aGlzLl9yb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd092ZXJzY2FuU3RvcEluZGV4OiB0aGlzLl9yb3dTdG9wSW5kZXgsXG4gICAgICAgICAgcm93U3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd1N0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdG9wSW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25TY3JvbGxNZW1vaXplcihfcmVmKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IF9yZWYudG90YWxDb2x1bW5zV2lkdGg7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gX3JlZi50b3RhbFJvd3NIZWlnaHQ7XG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNC5oZWlnaHQ7XG4gICAgICB2YXIgb25TY3JvbGwgPSBfcHJvcHM0Lm9uU2Nyb2xsO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNC53aWR0aDtcblxuXG4gICAgICB0aGlzLl9vblNjcm9sbE1lbW9pemVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIGNhbGxiYWNrKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMi5zY3JvbGxMZWZ0O1xuICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmMi5zY3JvbGxUb3A7XG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgICAgICBfdGhpczMuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFNjcm9sbFBvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbFBvc2l0aW9uKF9yZWYzKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjMuc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCB8fCBzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHRoaXMuc3RhdGUuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUpIHtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUgIT0gbnVsbCA/IHNjcm9sbFRvQ29sdW1uT3ZlcnJpZGUgOiB0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uO1xuXG4gICAgICB2YXIgd2lkdGggPSB0aGlzLnByb3BzLndpZHRoO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSB0aGlzLnN0YXRlLnNjcm9sbExlZnQ7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvQ29sdW1uID49IDApIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gKDAsIF9HcmlkVXRpbHMuZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KSh7XG4gICAgICAgICAgY2VsbE1ldGFkYXRhOiB0aGlzLl9jb2x1bW5NZXRhZGF0YSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb0NvbHVtblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gY2FsY3VsYXRlZFNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBjYWxjdWxhdGVkU2Nyb2xsTGVmdFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KHNjcm9sbFRvUm93T3ZlcnJpZGUpIHtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IHNjcm9sbFRvUm93T3ZlcnJpZGUgIT0gbnVsbCA/IHNjcm9sbFRvUm93T3ZlcnJpZGUgOiB0aGlzLnByb3BzLnNjcm9sbFRvUm93O1xuXG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gdGhpcy5zdGF0ZS5zY3JvbGxUb3A7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvUm93ID49IDApIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxUb3AgPSAoMCwgX0dyaWRVdGlscy5nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgpKHtcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IHNjcm9sbFRvUm93XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY3JvbGxUb3AgIT09IGNhbGN1bGF0ZWRTY3JvbGxUb3ApIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IGNhbGN1bGF0ZWRTY3JvbGxUb3BcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChldmVudCkge1xuICAgICAgLy8gSW4gY2VydGFpbiBlZGdlLWNhc2VzIFJlYWN0IGRpc3BhdGNoZXMgYW4gb25TY3JvbGwgZXZlbnQgd2l0aCBhbiBpbnZhbGlkIHRhcmdldC5zY3JvbGxMZWZ0IC8gdGFyZ2V0LnNjcm9sbFRvcC5cbiAgICAgIC8vIFRoaXMgaW52YWxpZCBldmVudCBjYW4gYmUgZGV0ZWN0ZWQgYnkgY29tcGFyaW5nIGV2ZW50LnRhcmdldCB0byB0aGlzIGNvbXBvbmVudCdzIHNjcm9sbGFibGUgRE9NIGVsZW1lbnQuXG4gICAgICAvLyBTZWUgaXNzdWUgIzQwNCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IHBvaW50ZXIgZXZlbnRzIGZyb20gaW50ZXJydXB0aW5nIGEgc21vb3RoIHNjcm9sbFxuICAgICAgdGhpcy5fZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKTtcblxuICAgICAgLy8gV2hlbiB0aGlzIGNvbXBvbmVudCBpcyBzaHJ1bmsgZHJhc3RpY2FsbHksIFJlYWN0IGRpc3BhdGNoZXMgYSBzZXJpZXMgb2YgYmFjay10by1iYWNrIHNjcm9sbCBldmVudHMsXG4gICAgICAvLyBHcmFkdWFsbHkgY29udmVyZ2luZyBvbiBhIHNjcm9sbFRvcCB0aGF0IGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBuZXcsIHNtYWxsZXIgaGVpZ2h0LlxuICAgICAgLy8gVGhpcyBjYXVzZXMgYSBzZXJpZXMgb2YgcmFwaWQgcmVuZGVycyB0aGF0IGlzIHNsb3cgZm9yIGxvbmcgbGlzdHMuXG4gICAgICAvLyBXZSBjYW4gYXZvaWQgdGhhdCBieSBkb2luZyBzb21lIHNpbXBsZSBib3VuZHMgY2hlY2tpbmcgdG8gZW5zdXJlIHRoYXQgc2Nyb2xsVG9wIG5ldmVyIGV4Y2VlZHMgdGhlIHRvdGFsIGhlaWdodC5cbiAgICAgIHZhciBfcHJvcHM1ID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHM1LmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczUud2lkdGg7XG5cbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gdGhpcy5fc2Nyb2xsYmFyU2l6ZTtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSB0aGlzLl9nZXRUb3RhbFJvd3NIZWlnaHQoKTtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IHRoaXMuX2dldFRvdGFsQ29sdW1uc1dpZHRoKCk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IE1hdGgubWluKHRvdGFsQ29sdW1uc1dpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCk7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5taW4odG90YWxSb3dzSGVpZ2h0IC0gaGVpZ2h0ICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCk7XG5cbiAgICAgIC8vIENlcnRhaW4gZGV2aWNlcyAobGlrZSBBcHBsZSB0b3VjaHBhZCkgcmFwaWQtZmlyZSBkdXBsaWNhdGUgZXZlbnRzLlxuICAgICAgLy8gRG9uJ3QgZm9yY2UgYSByZS1yZW5kZXIgaWYgdGhpcyBpcyB0aGUgY2FzZS5cbiAgICAgIC8vIFRoZSBtb3VzZSBtYXkgbW92ZSBmYXN0ZXIgdGhlbiB0aGUgYW5pbWF0aW9uIGZyYW1lIGRvZXMuXG4gICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIGF2b2lkIG92ZXItdXBkYXRpbmcuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0IHx8IHRoaXMuc3RhdGUuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgd2l0aCBjYW5jZWxhYmxlIHNjcm9sbCBldmVudHMgKGVnLiBGaXJlZm94KSBpbnRlcnJ1cHQgc2Nyb2xsaW5nIGFuaW1hdGlvbnMgaWYgc2Nyb2xsVG9wL3Njcm9sbExlZnQgaXMgc2V0LlxuICAgICAgICAvLyBPdGhlciBicm93c2VycyAoZWcuIFNhZmFyaSkgZG9uJ3Qgc2Nyb2xsIGFzIHdlbGwgd2l0aG91dCB0aGUgaGVscCB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMgKERPTSBvciBzdHlsZSBjaGFuZ2VzIGR1cmluZyBzY3JvbGxpbmcpLlxuICAgICAgICAvLyBBbGwgdGhpbmdzIGNvbnNpZGVyZWQsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIGJlc3QgY3VycmVudCB3b3JrIGFyb3VuZCB0aGF0IEknbSBhd2FyZSBvZi5cbiAgICAgICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkL3B1bGwvMTI0XG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IGV2ZW50LmNhbmNlbGFibGUgPyBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuT0JTRVJWRUQgOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Njcm9sbGluZykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24sXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoeyBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCwgdG90YWxDb2x1bW5zV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLCB0b3RhbFJvd3NIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR3JpZDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkdyaWQucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogT3B0aW9uYWwgY3VzdG9tIENTUyBjbGFzcyBuYW1lIHRvIGF0dGFjaCB0byByb290IEdyaWQgZWxlbWVudC5cbiAgICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb2x1bW5zIGluIGdyaWQuXG4gICAqL1xuICBjb2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIGNvbHVtbiB3aWR0aCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgYSBjb2x1bW4gZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgY29sdW1uV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIEdyaWQ7IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSByb3dzLlxuICAgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiBlaXRoZXIgOnJvd3NDb3VudCBvciA6Y29sdW1uc0NvdW50IGlzIDAuXG4gICAqL1xuICBub0NvbnRlbnRSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGgsIHNjcm9sbEhlaWdodCwgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlY3Rpb24gb2YgdGhlIEdyaWQgdGhhdCB3YXMganVzdCByZW5kZXJlZC5cbiAgICogKHsgY29sdW1uU3RhcnRJbmRleCwgY29sdW1uU3RvcEluZGV4LCByb3dTdGFydEluZGV4LCByb3dTdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uU2VjdGlvblJlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNvbHVtbnMgdG8gcmVuZGVyIGJlZm9yZS9hZnRlciB0aGUgdmlzaWJsZSBzZWN0aW9uIG9mIHRoZSBncmlkLlxuICAgKiBUaGVzZSBjb2x1bW5zIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcyBvciBicm93c2VycyB0aGF0IHNlbmQgc2Nyb2xsIGV2ZW50cyBpbmZyZXF1ZW50bHkuXG4gICAqL1xuICBvdmVyc2NhbkNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIHNlY3Rpb24gb2YgdGhlIGdyaWQuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzIG9yIGJyb3dzZXJzIHRoYXQgc2VuZCBzY3JvbGwgZXZlbnRzIGluZnJlcXVlbnRseS5cbiAgICovXG4gIG92ZXJzY2FuUm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBSZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY2VsbCBnaXZlbiBhbiByb3cgYW5kIGNvbHVtbiBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHsgY29sdW1uSW5kZXg6IG51bWJlciwgcm93SW5kZXg6IG51bWJlciB9KTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIHJlbmRlckNlbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIGluIGdyaWQuXG4gICAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEhvcml6b250YWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxMZWZ0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogQ29sdW1uIGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpXG4gICAqL1xuICBzY3JvbGxUb0NvbHVtbjogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogUm93IGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpXG4gICAqL1xuICBzY3JvbGxUb1JvdzogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIEdyaWQ7IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSBjb2x1bW5zLlxuICAgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5HcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgbm9Db250ZW50UmVuZGVyZXI6IGZ1bmN0aW9uIG5vQ29udGVudFJlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb3ZlcnNjYW5Db2x1bW5zQ291bnQ6IDAsXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEdyaWQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb21wdXRlQ2VsbE1ldGFkYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0SGVscGVyID0gY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlcjtcbmV4cG9ydHMuY3JlYXRlQ2FsbGJhY2tNZW1vaXplciA9IGNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXI7XG5leHBvcnRzLmZpbmROZWFyZXN0Q2VsbCA9IGZpbmROZWFyZXN0Q2VsbDtcbmV4cG9ydHMuZ2V0T3ZlcnNjYW5JbmRpY2VzID0gZ2V0T3ZlcnNjYW5JbmRpY2VzO1xuZXhwb3J0cy5nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXggPSBnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXg7XG5leHBvcnRzLmdldFZpc2libGVDZWxsSW5kaWNlcyA9IGdldFZpc2libGVDZWxsSW5kaWNlcztcbmV4cG9ydHMuaW5pdENlbGxNZXRhZGF0YSA9IGluaXRDZWxsTWV0YWRhdGE7XG5leHBvcnRzLnVwZGF0ZVNjcm9sbEluZGV4SGVscGVyID0gdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXI7XG4vKipcbiAqIEhlbHBlciBtZXRob2QgdGhhdCBkZXRlcm1pbmVzIHdoZW4gdG8gcmVjYWxjdWxhdGUgcm93IG9yIGNvbHVtbiBtZXRhZGF0YS5cbiAqXG4gKiBAcGFyYW0gY2VsbHNDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgTWV0aG9kIHRvIGludm9rZSBpZiBjZWxsIG1ldGFkYXRhIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzIFBhcmFtZXRlcnMgdG8gcGFzcyB0byA6Y29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgRmxhZyBzcGVjaWZ5aW5nIHRoYXQgbWV0YWRhdGEgc2hvdWxkIGJlIHJlY2FsY3VsYXRlZFxuICogQHBhcmFtIG5leHRDZWxsc0NvdW50IE5ld2x5IHVwZGF0ZWQgbnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gbmV4dENlbGxzU2l6ZSBOZXdseSB1cGRhdGVkIHdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG5leHRTY3JvbGxUb0luZGV4IE5ld2x5IHVwZGF0ZWQgc2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4IENhbGxiYWNrIHRvIGludm9rZSBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUNlbGxNZXRhZGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldEhlbHBlcihfcmVmKSB7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZi5jZWxsc0NvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcztcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZSA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlO1xuICB2YXIgbmV4dENlbGxzQ291bnQgPSBfcmVmLm5leHRDZWxsc0NvdW50O1xuICB2YXIgbmV4dENlbGxTaXplID0gX3JlZi5uZXh0Q2VsbFNpemU7XG4gIHZhciBuZXh0U2Nyb2xsVG9JbmRleCA9IF9yZWYubmV4dFNjcm9sbFRvSW5kZXg7XG4gIHZhciBzY3JvbGxUb0luZGV4ID0gX3JlZi5zY3JvbGxUb0luZGV4O1xuICB2YXIgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCA9IF9yZWYudXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDtcblxuICAvLyBEb24ndCBjb21wYXJlIGNlbGwgc2l6ZXMgaWYgdGhleSBhcmUgZnVuY3Rpb25zIGJlY2F1c2UgaW5saW5lIGZ1bmN0aW9ucyB3b3VsZCBjYXVzZSBpbmZpbml0ZSBsb29wcy5cbiAgLy8gSW4gdGhhdCBldmVudCB1c2VycyBzaG91bGQgdXNlIHRoZSBtYW51YWwgcmVjb21wdXRlIG1ldGhvZHMgdG8gaW5mb3JtIG9mIGNoYW5nZXMuXG4gIGlmIChjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgfHwgY2VsbHNDb3VudCAhPT0gbmV4dENlbGxzQ291bnQgfHwgKHR5cGVvZiBjZWxsU2l6ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG5leHRDZWxsU2l6ZSA9PT0gJ251bWJlcicpICYmIGNlbGxTaXplICE9PSBuZXh0Q2VsbFNpemUpIHtcbiAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFjayhjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzKTtcblxuICAgIC8vIFVwZGF0ZWQgY2VsbCBtZXRhZGF0YSBtYXkgaGF2ZSBoaWRkZW4gdGhlIHByZXZpb3VzIHNjcm9sbGVkLXRvIGl0ZW0uXG4gICAgLy8gSW4gdGhpcyBjYXNlIHdlIHNob3VsZCBhbHNvIHVwZGF0ZSB0aGUgc2Nyb2xsVG9wIHRvIGVuc3VyZSBpdCBzdGF5cyB2aXNpYmxlLlxuICAgIGlmIChzY3JvbGxUb0luZGV4ID49IDAgJiYgc2Nyb2xsVG9JbmRleCA9PT0gbmV4dFNjcm9sbFRvSW5kZXgpIHtcbiAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXgoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSB0aGF0IHVwZGF0ZXMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayB3aGVuZXZlciBhbnkgb2YgdGhlIHNwZWNpZmllZCBpbmRpY2VzIGhhdmUgY2hhbmdlZC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FsbGJhY2tNZW1vaXplcigpIHtcbiAgdmFyIHJlcXVpcmVBbGxLZXlzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgY2FjaGVkSW5kaWNlcyA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBfcmVmMi5jYWxsYmFjaztcbiAgICB2YXIgaW5kaWNlcyA9IF9yZWYyLmluZGljZXM7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGluZGljZXMpO1xuICAgIHZhciBhbGxJbml0aWFsaXplZCA9ICFyZXF1aXJlQWxsS2V5cyB8fCBrZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBpbmRpY2VzW2tleV0gPj0gMDtcbiAgICB9KTtcbiAgICB2YXIgaW5kZXhDaGFuZ2VkID0ga2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBjYWNoZWRJbmRpY2VzW2tleV0gIT09IGluZGljZXNba2V5XTtcbiAgICB9KTtcblxuICAgIGNhY2hlZEluZGljZXMgPSBpbmRpY2VzO1xuXG4gICAgaWYgKGFsbEluaXRpYWxpemVkICYmIGluZGV4Q2hhbmdlZCkge1xuICAgICAgY2FsbGJhY2soaW5kaWNlcyk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEJpbmFyeSBzZWFyY2ggZnVuY3Rpb24gaW5zcGlyZWQgYnkgcmVhY3QtaW5maW5pdGUuXG4gKi9cbmZ1bmN0aW9uIGZpbmROZWFyZXN0Q2VsbChfcmVmMykge1xuICB2YXIgY2VsbE1ldGFkYXRhID0gX3JlZjMuY2VsbE1ldGFkYXRhO1xuICB2YXIgbW9kZSA9IF9yZWYzLm1vZGU7XG4gIHZhciBvZmZzZXQgPSBfcmVmMy5vZmZzZXQ7XG5cbiAgdmFyIGhpZ2ggPSBjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMTtcbiAgdmFyIGxvdyA9IDA7XG4gIHZhciBtaWRkbGUgPSB1bmRlZmluZWQ7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gdW5kZWZpbmVkO1xuXG4gIC8vIFRPRE8gQWRkIGJldHRlciBndWFyZHMgaGVyZSBhZ2FpbnN0IE5hTiBvZmZzZXRcblxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICBtaWRkbGUgPSBsb3cgKyBNYXRoLmZsb29yKChoaWdoIC0gbG93KSAvIDIpO1xuICAgIGN1cnJlbnRPZmZzZXQgPSBjZWxsTWV0YWRhdGFbbWlkZGxlXS5vZmZzZXQ7XG5cbiAgICBpZiAoY3VycmVudE9mZnNldCA9PT0gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gbWlkZGxlO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA8IG9mZnNldCkge1xuICAgICAgbG93ID0gbWlkZGxlICsgMTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPiBvZmZzZXQpIHtcbiAgICAgIGhpZ2ggPSBtaWRkbGUgLSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSBmaW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfTE9XRVIgJiYgbG93ID4gMCkge1xuICAgIHJldHVybiBsb3cgLSAxO1xuICB9IGVsc2UgaWYgKG1vZGUgPT09IGZpbmROZWFyZXN0Q2VsbC5FUVVBTF9PUl9ISUdIRVIgJiYgaGlnaCA8IGNlbGxNZXRhZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGhpZ2ggKyAxO1xuICB9XG59XG5cbmZpbmROZWFyZXN0Q2VsbC5FUVVBTF9PUl9MT1dFUiA9IDE7XG5maW5kTmVhcmVzdENlbGwuRVFVQUxfT1JfSElHSEVSID0gMjtcblxuZnVuY3Rpb24gZ2V0T3ZlcnNjYW5JbmRpY2VzKF9yZWY0KSB7XG4gIHZhciBjZWxsc0NvdW50ID0gX3JlZjQuY2VsbHNDb3VudDtcbiAgdmFyIG92ZXJzY2FuQ2VsbHNDb3VudCA9IF9yZWY0Lm92ZXJzY2FuQ2VsbHNDb3VudDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmNC5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjQuc3RvcEluZGV4O1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gb3ZlcnNjYW5DZWxsc0NvdW50KSxcbiAgICBvdmVyc2NhblN0b3BJbmRleDogTWF0aC5taW4oY2VsbHNDb3VudCAtIDEsIHN0b3BJbmRleCArIG92ZXJzY2FuQ2VsbHNDb3VudClcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGEgbmV3IG9mZnNldCB0aGF0IGVuc3VyZXMgYSBjZXJ0YWluIGNlbGwgaXMgdmlzaWJsZSwgZ2l2ZW4gdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICogSWYgdGhlIGNlbGwgaXMgYWxyZWFkeSB2aXNpYmxlIHRoZW4gdGhlIGN1cnJlbnQgb2Zmc2V0IHdpbGwgYmUgcmV0dXJuZWQuXG4gKiBJZiB0aGUgY3VycmVudCBvZmZzZXQgaXMgdG9vIGdyZWF0IG9yIHNtYWxsLCBpdCB3aWxsIGJlIGFkanVzdGVkIGp1c3QgZW5vdWdoIHRvIGVuc3VyZSB0aGUgc3BlY2lmaWVkIGluZGV4IGlzIHZpc2libGUuXG4gKlxuICogQHBhcmFtIGNlbGxNZXRhZGF0YSBNZXRhZGF0YSBpbml0aWFsbHkgY29tcHV0ZWQgYnkgaW5pdENlbGxNZXRhZGF0YSgpXG4gKiBAcGFyYW0gY29udGFpbmVyU2l6ZSBUb3RhbCBzaXplICh3aWR0aCBvciBoZWlnaHQpIG9mIHRoZSBjb250YWluZXJcbiAqIEBwYXJhbSBjdXJyZW50T2Zmc2V0IENvbnRhaW5lcidzIGN1cnJlbnQgKHggb3IgeSkgb2Zmc2V0XG4gKiBAcGFyYW0gdGFyZ2V0SW5kZXggSW5kZXggb2YgdGFyZ2V0IGNlbGxcbiAqIEByZXR1cm4gT2Zmc2V0IHRvIHVzZSB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBjZWxsIGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KF9yZWY1KSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmNS5jZWxsTWV0YWRhdGE7XG4gIHZhciBjb250YWluZXJTaXplID0gX3JlZjUuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmNS5jdXJyZW50T2Zmc2V0O1xuICB2YXIgdGFyZ2V0SW5kZXggPSBfcmVmNS50YXJnZXRJbmRleDtcblxuICBpZiAoY2VsbE1ldGFkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdGFyZ2V0SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMSwgdGFyZ2V0SW5kZXgpKTtcblxuICB2YXIgZGF0dW0gPSBjZWxsTWV0YWRhdGFbdGFyZ2V0SW5kZXhdO1xuICB2YXIgbWF4T2Zmc2V0ID0gZGF0dW0ub2Zmc2V0O1xuICB2YXIgbWluT2Zmc2V0ID0gbWF4T2Zmc2V0IC0gY29udGFpbmVyU2l6ZSArIGRhdHVtLnNpemU7XG4gIHZhciBuZXdPZmZzZXQgPSBNYXRoLm1heChtaW5PZmZzZXQsIE1hdGgubWluKG1heE9mZnNldCwgY3VycmVudE9mZnNldCkpO1xuXG4gIHJldHVybiBuZXdPZmZzZXQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcmFuZ2Ugb2YgY2VsbHMgdG8gZGlzcGxheSBmb3IgYSBnaXZlbiBvZmZzZXQgaW4gb3JkZXIgdG8gZmlsbCB0aGUgc3BlY2lmaWVkIGNvbnRhaW5lci5cbiAqXG4gKiBAcGFyYW0gY2VsbHNDb3VudCBUb3RhbCBudW1iZXIgb2YgY2VsbHMuXG4gKiBAcGFyYW0gY2VsbE1ldGFkYXRhIE1ldGFkYXRhIGluaXRpYWxseSBjb21wdXRlZCBieSBpbml0Q2VsbE1ldGFkYXRhKClcbiAqIEBwYXJhbSBjb250YWluZXJTaXplIFRvdGFsIHNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIGN1cnJlbnRPZmZzZXQgQ29udGFpbmVyJ3MgY3VycmVudCAoeCBvciB5KSBvZmZzZXRcbiAqIEByZXR1cm4gQW4gb2JqZWN0IGNvbnRhaW5pbmcgOnN0YXJ0IGFuZCA6c3RvcCBhdHRyaWJ1dGVzLCBlYWNoIHNwZWNpZnlpbmcgYSBjZWxsIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGdldFZpc2libGVDZWxsSW5kaWNlcyhfcmVmNikge1xuICB2YXIgY2VsbHNDb3VudCA9IF9yZWY2LmNlbGxzQ291bnQ7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmNi5jZWxsTWV0YWRhdGE7XG4gIHZhciBjb250YWluZXJTaXplID0gX3JlZjYuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmNi5jdXJyZW50T2Zmc2V0O1xuXG4gIGlmIChjZWxsc0NvdW50ID09PSAwKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gVE9ETyBBZGQgYmV0dGVyIGd1YXJkcyBoZXJlIGFnYWluc3QgTmFOIG9mZnNldFxuXG4gIHZhciBsYXN0RGF0dW0gPSBjZWxsTWV0YWRhdGFbY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICB2YXIgdG90YWxDZWxsU2l6ZSA9IGxhc3REYXR1bS5vZmZzZXQgKyBsYXN0RGF0dW0uc2l6ZTtcblxuICAvLyBFbnN1cmUgb2Zmc2V0IGlzIHdpdGhpbiByZWFzb25hYmxlIGJvdW5kc1xuICBjdXJyZW50T2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odG90YWxDZWxsU2l6ZSAtIGNvbnRhaW5lclNpemUsIGN1cnJlbnRPZmZzZXQpKTtcblxuICB2YXIgbWF4T2Zmc2V0ID0gTWF0aC5taW4odG90YWxDZWxsU2l6ZSwgY3VycmVudE9mZnNldCArIGNvbnRhaW5lclNpemUpO1xuXG4gIHZhciBzdGFydCA9IGZpbmROZWFyZXN0Q2VsbCh7XG4gICAgY2VsbE1ldGFkYXRhOiBjZWxsTWV0YWRhdGEsXG4gICAgbW9kZTogZmluZE5lYXJlc3RDZWxsLkVRVUFMX09SX0xPV0VSLFxuICAgIG9mZnNldDogY3VycmVudE9mZnNldFxuICB9KTtcblxuICB2YXIgZGF0dW0gPSBjZWxsTWV0YWRhdGFbc3RhcnRdO1xuICBjdXJyZW50T2Zmc2V0ID0gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcblxuICB2YXIgc3RvcCA9IHN0YXJ0O1xuXG4gIHdoaWxlIChjdXJyZW50T2Zmc2V0IDwgbWF4T2Zmc2V0ICYmIHN0b3AgPCBjZWxsc0NvdW50IC0gMSkge1xuICAgIHN0b3ArKztcblxuICAgIGN1cnJlbnRPZmZzZXQgKz0gY2VsbE1ldGFkYXRhW3N0b3BdLnNpemU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBzdG9wOiBzdG9wXG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgbWV0YWRhdGEgZm9yIGFuIGF4aXMgYW5kIGl0cyBjZWxscy5cbiAqIFRoaXMgZGF0YSBpcyB1c2VkIHRvIGRldGVybWluZSB3aGljaCBjZWxscyBhcmUgdmlzaWJsZSBnaXZlbiBhIGNvbnRhaW5lciBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIGNlbGxzQ291bnQgVG90YWwgbnVtYmVyIG9mIGNlbGxzLlxuICogQHBhcmFtIHNpemUgRWl0aGVyIGEgZml4ZWQgc2l6ZSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgc2l6ZSBmb3IgYSBnaXZlbiBnaXZlbiBhbiBpbmRleC5cbiAqIEByZXR1cm4gT2JqZWN0IG1hcHBpbmcgY2VsbCBpbmRleCB0byBjZWxsIG1ldGFkYXRhIChzaXplLCBvZmZzZXQpXG4gKi9cbmZ1bmN0aW9uIGluaXRDZWxsTWV0YWRhdGEoX3JlZjcpIHtcbiAgdmFyIGNlbGxzQ291bnQgPSBfcmVmNy5jZWxsc0NvdW50O1xuICB2YXIgc2l6ZSA9IF9yZWY3LnNpemU7XG5cbiAgdmFyIHNpemVHZXR0ZXIgPSBzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBzaXplIDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgdmFyIGNlbGxNZXRhZGF0YSA9IFtdO1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xuICAgIHZhciBfc2l6ZSA9IHNpemVHZXR0ZXIoaSk7XG5cbiAgICBpZiAoX3NpemUgPT0gbnVsbCB8fCBpc05hTihfc2l6ZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIHNpemUgcmV0dXJuZWQgZm9yIGNlbGwgJyArIGkgKyAnIG9mIHZhbHVlICcgKyBfc2l6ZSk7XG4gICAgfVxuXG4gICAgY2VsbE1ldGFkYXRhW2ldID0ge1xuICAgICAgc2l6ZTogX3NpemUsXG4gICAgICBvZmZzZXQ6IG9mZnNldFxuICAgIH07XG5cbiAgICBvZmZzZXQgKz0gX3NpemU7XG4gIH1cblxuICByZXR1cm4gY2VsbE1ldGFkYXRhO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hlbiB0byB1cGRhdGUgc2Nyb2xsIG9mZnNldHMgdG8gZW5zdXJlIHRoYXQgYSBzY3JvbGwtdG8taW5kZXggcmVtYWlucyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBjZWxsTWV0YWRhdGEgTWV0YWRhdGEgaW5pdGlhbGx5IGNvbXB1dGVkIGJ5IGluaXRDZWxsTWV0YWRhdGEoKVxuICogQHBhcmFtIGNlbGxzQ291bnQgTnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY2VsbHNTaXplIFdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIHByZXZpb3VzQ2VsbHNDb3VudCBQcmV2aW91cyBudW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zXG4gKiBAcGFyYW0gcHJldmlvdXNDZWxsc1NpemUgUHJldmlvdXMgd2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzXG4gKiBAcGFyYW0gcHJldmlvdXNTY3JvbGxUb0luZGV4IFByZXZpb3VzIHNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHByZXZpb3VzU2l6ZSBQcmV2aW91cyB3aWR0aCBvciBoZWlnaHQgb2YgdGhlIHZpcnR1YWxpemVkIGNvbnRhaW5lclxuICogQHBhcmFtIHNjcm9sbE9mZnNldCBDdXJyZW50IHNjcm9sbExlZnQgb3Igc2Nyb2xsVG9wXG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBzaXplIFdpZHRoIG9yIGhlaWdodCBvZiB0aGUgdmlydHVhbGl6ZWQgY29udGFpbmVyXG4gKiBAcGFyYW0gdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBhbiBvcHRpb25hbCBzY3JvbGwtdG8taW5kZXggb3ZlcnJpZGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIoX3JlZjgpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWY4LmNlbGxNZXRhZGF0YTtcbiAgdmFyIGNlbGxzQ291bnQgPSBfcmVmOC5jZWxsc0NvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmOC5jZWxsU2l6ZTtcbiAgdmFyIHByZXZpb3VzQ2VsbHNDb3VudCA9IF9yZWY4LnByZXZpb3VzQ2VsbHNDb3VudDtcbiAgdmFyIHByZXZpb3VzQ2VsbFNpemUgPSBfcmVmOC5wcmV2aW91c0NlbGxTaXplO1xuICB2YXIgcHJldmlvdXNTY3JvbGxUb0luZGV4ID0gX3JlZjgucHJldmlvdXNTY3JvbGxUb0luZGV4O1xuICB2YXIgcHJldmlvdXNTaXplID0gX3JlZjgucHJldmlvdXNTaXplO1xuICB2YXIgc2Nyb2xsT2Zmc2V0ID0gX3JlZjguc2Nyb2xsT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9yZWY4LnNjcm9sbFRvSW5kZXg7XG4gIHZhciBzaXplID0gX3JlZjguc2l6ZTtcbiAgdmFyIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2sgPSBfcmVmOC51cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrO1xuXG4gIHZhciBoYXNTY3JvbGxUb0luZGV4ID0gc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPCBjZWxsc0NvdW50O1xuICB2YXIgc2l6ZUhhc0NoYW5nZWQgPSBzaXplICE9PSBwcmV2aW91c1NpemUgfHwgIXByZXZpb3VzQ2VsbFNpemUgfHwgdHlwZW9mIGNlbGxTaXplID09PSAnbnVtYmVyJyAmJiBjZWxsU2l6ZSAhPT0gcHJldmlvdXNDZWxsU2l6ZTtcblxuICAvLyBJZiB3ZSBoYXZlIGEgbmV3IHNjcm9sbCB0YXJnZXQgT1IgaWYgaGVpZ2h0L3Jvdy1oZWlnaHQgaGFzIGNoYW5nZWQsXG4gIC8vIFdlIHNob3VsZCBlbnN1cmUgdGhhdCB0aGUgc2Nyb2xsIHRhcmdldCBpcyB2aXNpYmxlLlxuICBpZiAoaGFzU2Nyb2xsVG9JbmRleCAmJiAoc2l6ZUhhc0NoYW5nZWQgfHwgc2Nyb2xsVG9JbmRleCAhPT0gcHJldmlvdXNTY3JvbGxUb0luZGV4KSkge1xuICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soKTtcblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBzZWxlY3RlZCBpdGVtIGJ1dCBsaXN0IHNpemUgb3IgbnVtYmVyIG9mIGNoaWxkcmVuIGhhdmUgZGVjcmVhc2VkLFxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBhcmVuJ3Qgc2Nyb2xsZWQgdG9vIGZhciBwYXN0IHRoZSBjdXJyZW50IGNvbnRlbnQuXG4gIH0gZWxzZSBpZiAoIWhhc1Njcm9sbFRvSW5kZXggJiYgKHNpemUgPCBwcmV2aW91c1NpemUgfHwgY2VsbHNDb3VudCA8IHByZXZpb3VzQ2VsbHNDb3VudCkpIHtcbiAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0ID0gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KHtcbiAgICAgICAgY2VsbE1ldGFkYXRhOiBjZWxsTWV0YWRhdGEsXG4gICAgICAgIGNvbnRhaW5lclNpemU6IHNpemUsXG4gICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbE9mZnNldCxcbiAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxzQ291bnQgLSAxXG4gICAgICB9KTtcblxuICAgICAgLy8gT25seSBhZGp1c3QgdGhlIHNjcm9sbCBwb3NpdGlvbiBpZiB3ZSd2ZSBzY3JvbGxlZCBiZWxvdyB0aGUgbGFzdCBzZXQgb2Ygcm93cy5cbiAgICAgIGlmIChjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soY2VsbHNDb3VudCAtIDEpO1xuICAgICAgfVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuR3JpZCA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9HcmlkMiA9IHJlcXVpcmUoJy4vR3JpZCcpO1xuXG52YXIgX0dyaWQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfR3JpZDMuZGVmYXVsdDtcbmV4cG9ydHMuR3JpZCA9IF9HcmlkMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZXhwb3J0cy5pc1JhbmdlVmlzaWJsZSA9IGlzUmFuZ2VWaXNpYmxlO1xuZXhwb3J0cy5zY2FuRm9yVW5sb2FkZWRSYW5nZXMgPSBzY2FuRm9yVW5sb2FkZWRSYW5nZXM7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEhpZ2hlci1vcmRlciBjb21wb25lbnQgdGhhdCBtYW5hZ2VzIGxhenktbG9hZGluZyBmb3IgXCJpbmZpbml0ZVwiIGRhdGEuXG4gKiBUaGlzIGNvbXBvbmVudCBkZWNvcmF0ZXMgYSB2aXJ0dWFsIGNvbXBvbmVudCBhbmQganVzdC1pbi10aW1lIHByZWZldGNoZXMgcm93cyBhcyBhIHVzZXIgc2Nyb2xscy5cbiAqIEl0IGlzIGludGVuZGVkIGFzIGEgY29udmVuaWVuY2UgY29tcG9uZW50OyBmb3JrIGl0IGlmIHlvdSdkIGxpa2UgZmluZXItZ3JhaW5lZCBjb250cm9sIG92ZXIgZGF0YS1sb2FkaW5nLlxuICovXG5cbnZhciBJbmZpbml0ZUxvYWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhJbmZpbml0ZUxvYWRlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5maW5pdGVMb2FkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW5maW5pdGVMb2FkZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEluZmluaXRlTG9hZGVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fb25Sb3dzUmVuZGVyZWQgPSBfdGhpcy5fb25Sb3dzUmVuZGVyZWQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3JlZ2lzdGVyQ2hpbGQgPSBfdGhpcy5fcmVnaXN0ZXJDaGlsZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSW5maW5pdGVMb2FkZXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuXG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICBvblJvd3NSZW5kZXJlZDogdGhpcy5fb25Sb3dzUmVuZGVyZWQsXG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQ6IHRoaXMuX3JlZ2lzdGVyQ2hpbGRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJvd3NSZW5kZXJlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJvd3NSZW5kZXJlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmLnN0YXJ0SW5kZXg7XG4gICAgICB2YXIgc3RvcEluZGV4ID0gX3JlZi5zdG9wSW5kZXg7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBpc1Jvd0xvYWRlZCA9IF9wcm9wcy5pc1Jvd0xvYWRlZDtcbiAgICAgIHZhciBsb2FkTW9yZVJvd3MgPSBfcHJvcHMubG9hZE1vcmVSb3dzO1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wcy5yb3dzQ291bnQ7XG4gICAgICB2YXIgdGhyZXNob2xkID0gX3Byb3BzLnRocmVzaG9sZDtcblxuXG4gICAgICB0aGlzLl9sYXN0UmVuZGVyZWRTdGFydEluZGV4ID0gc3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX2xhc3RSZW5kZXJlZFN0b3BJbmRleCA9IHN0b3BJbmRleDtcblxuICAgICAgdmFyIHVubG9hZGVkUmFuZ2VzID0gc2NhbkZvclVubG9hZGVkUmFuZ2VzKHtcbiAgICAgICAgaXNSb3dMb2FkZWQ6IGlzUm93TG9hZGVkLFxuICAgICAgICBzdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gdGhyZXNob2xkKSxcbiAgICAgICAgc3RvcEluZGV4OiBNYXRoLm1pbihyb3dzQ291bnQsIHN0b3BJbmRleCArIHRocmVzaG9sZClcbiAgICAgIH0pO1xuXG4gICAgICB1bmxvYWRlZFJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uICh1bmxvYWRlZFJhbmdlKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gbG9hZE1vcmVSb3dzKHVubG9hZGVkUmFuZ2UpO1xuICAgICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSB2aXNpYmxlIHJvd3MgaWYgYW55IG9mIHRoZW0gaGF2ZSBqdXN0IGJlZW4gbG9hZGVkLlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZXkgd2lsbCByZW1haW4gaW4gdGhlaXIgdW5sb2FkZWQgdmlzdWFsIHN0YXRlLlxuICAgICAgICAgICAgaWYgKGlzUmFuZ2VWaXNpYmxlKHtcbiAgICAgICAgICAgICAgbGFzdFJlbmRlcmVkU3RhcnRJbmRleDogX3RoaXMyLl9sYXN0UmVuZGVyZWRTdGFydEluZGV4LFxuICAgICAgICAgICAgICBsYXN0UmVuZGVyZWRTdG9wSW5kZXg6IF90aGlzMi5fbGFzdFJlbmRlcmVkU3RvcEluZGV4LFxuICAgICAgICAgICAgICBzdGFydEluZGV4OiB1bmxvYWRlZFJhbmdlLnN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIHN0b3BJbmRleDogdW5sb2FkZWRSYW5nZS5zdG9wSW5kZXhcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpczIuX3JlZ2lzdGVyZWRDaGlsZCkge1xuICAgICAgICAgICAgICAgIF90aGlzMi5fcmVnaXN0ZXJlZENoaWxkLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChyZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCA9IHJlZ2lzdGVyZWRDaGlsZDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSW5maW5pdGVMb2FkZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIHNwZWNpZmllZCBzdGFydC9zdG9wIHJhbmdlIGlzIHZpc2libGUgYmFzZWQgb24gdGhlIG1vc3QgcmVjZW50bHkgcmVuZGVyZWQgcmFuZ2UuXG4gKi9cblxuXG5JbmZpbml0ZUxvYWRlci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGEgdmlydHVhbGl6ZWQgY29tcG9uZW50LlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IG9uUm93c1JlbmRlcmVkLCByZWdpc3RlckNoaWxkIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgOm9uUm93c1JlbmRlcmVkIGZ1bmN0aW9uIHNob3VsZCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQncyA6b25Sb3dzUmVuZGVyZWQgcHJvcGVydHkuXG4gICAqIFRoZSA6cmVnaXN0ZXJDaGlsZCBjYWxsYmFjayBzaG91bGQgYmUgc2V0IGFzIHRoZSB2aXJ0dWFsaXplZCBjb21wb25lbnQncyA6cmVmLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgdHJhY2tpbmcgdGhlIGxvYWRlZCBzdGF0ZSBvZiBlYWNoIHJvdy5cbiAgICogSXQgc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTogKGluZGV4OiBudW1iZXIpOiBib29sZWFuXG4gICAqL1xuICBpc1Jvd0xvYWRlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBtb3JlIHJvd3MgbXVzdCBiZSBsb2FkZWQuXG4gICAqIEl0IHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6ICh7IHN0YXJ0SW5kZXgsIHN0b3BJbmRleCB9KTogUHJvbWlzZVxuICAgKiBUaGUgcmV0dXJuZWQgUHJvbWlzZSBzaG91bGQgYmUgcmVzb2x2ZWQgb25jZSByb3cgZGF0YSBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICogSXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB3aGVuIHRvIHJlZnJlc2ggdGhlIGxpc3Qgd2l0aCB0aGUgbmV3bHktbG9hZGVkIGRhdGEuXG4gICAqIFRoaXMgY2FsbGJhY2sgbWF5IGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiByZWFjdGlvbiB0byBhIHNpbmdsZSBzY3JvbGwgZXZlbnQuXG4gICAqL1xuICBsb2FkTW9yZVJvd3M6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBsaXN0OyBjYW4gYmUgYXJiaXRyYXJ5IGhpZ2ggbnVtYmVyIGlmIGFjdHVhbCBudW1iZXIgaXMgdW5rbm93bi5cbiAgICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogVGhyZXNob2xkIGF0IHdoaWNoIHRvIHByZS1mZXRjaCBkYXRhLlxuICAgKiBBIHRocmVzaG9sZCBYIG1lYW5zIHRoYXQgZGF0YSB3aWxsIHN0YXJ0IGxvYWRpbmcgd2hlbiBhIHVzZXIgc2Nyb2xscyB3aXRoaW4gWCByb3dzLlxuICAgKiBUaGlzIHZhbHVlIGRlZmF1bHRzIHRvIDE1LlxuICAgKi9cbiAgdGhyZXNob2xkOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuSW5maW5pdGVMb2FkZXIuZGVmYXVsdFByb3BzID0ge1xuICByb3dzQ291bnQ6IDAsXG4gIHRocmVzaG9sZDogMTVcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBJbmZpbml0ZUxvYWRlcjtcbmZ1bmN0aW9uIGlzUmFuZ2VWaXNpYmxlKF9yZWYyKSB7XG4gIHZhciBsYXN0UmVuZGVyZWRTdGFydEluZGV4ID0gX3JlZjIubGFzdFJlbmRlcmVkU3RhcnRJbmRleDtcbiAgdmFyIGxhc3RSZW5kZXJlZFN0b3BJbmRleCA9IF9yZWYyLmxhc3RSZW5kZXJlZFN0b3BJbmRleDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmMi5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjIuc3RvcEluZGV4O1xuXG4gIHJldHVybiAhKHN0YXJ0SW5kZXggPiBsYXN0UmVuZGVyZWRTdG9wSW5kZXggfHwgc3RvcEluZGV4IDwgbGFzdFJlbmRlcmVkU3RhcnRJbmRleCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgb2YgdGhlIHJhbmdlcyB3aXRoaW4gYSBsYXJnZXIgcmFuZ2UgdGhhdCBjb250YWluIHVubG9hZGVkIHJvd3MuXG4gKi9cbmZ1bmN0aW9uIHNjYW5Gb3JVbmxvYWRlZFJhbmdlcyhfcmVmMykge1xuICB2YXIgaXNSb3dMb2FkZWQgPSBfcmVmMy5pc1Jvd0xvYWRlZDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmMy5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjMuc3RvcEluZGV4O1xuXG4gIHZhciB1bmxvYWRlZFJhbmdlcyA9IFtdO1xuICB2YXIgcmFuZ2VTdGFydEluZGV4ID0gbnVsbDtcbiAgdmFyIHJhbmdlU3RvcEluZGV4ID0gbnVsbDtcblxuICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8PSBzdG9wSW5kZXg7IGkrKykge1xuICAgIHZhciBsb2FkZWQgPSBpc1Jvd0xvYWRlZChpKTtcblxuICAgIGlmICghbG9hZGVkKSB7XG4gICAgICByYW5nZVN0b3BJbmRleCA9IGk7XG4gICAgICBpZiAocmFuZ2VTdGFydEluZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHJhbmdlU3RhcnRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyYW5nZVN0b3BJbmRleCAhPT0gbnVsbCkge1xuICAgICAgdW5sb2FkZWRSYW5nZXMucHVzaCh7XG4gICAgICAgIHN0YXJ0SW5kZXg6IHJhbmdlU3RhcnRJbmRleCxcbiAgICAgICAgc3RvcEluZGV4OiByYW5nZVN0b3BJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIHJhbmdlU3RhcnRJbmRleCA9IHJhbmdlU3RvcEluZGV4ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2VTdG9wSW5kZXggIT09IG51bGwpIHtcbiAgICB1bmxvYWRlZFJhbmdlcy5wdXNoKHtcbiAgICAgIHN0YXJ0SW5kZXg6IHJhbmdlU3RhcnRJbmRleCxcbiAgICAgIHN0b3BJbmRleDogcmFuZ2VTdG9wSW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB1bmxvYWRlZFJhbmdlcztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0luZmluaXRlTG9hZGVyMiA9IHJlcXVpcmUoJy4vSW5maW5pdGVMb2FkZXInKTtcblxudmFyIF9JbmZpbml0ZUxvYWRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmZpbml0ZUxvYWRlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfSW5maW5pdGVMb2FkZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gX0luZmluaXRlTG9hZGVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSE9DIHRoYXQgc2ltcGxpZmllcyB0aGUgcHJvY2VzcyBvZiBzeW5jaHJvbml6aW5nIHNjcm9sbGluZyBiZXR3ZWVuIHR3byBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gKi9cblxudmFyIFNjcm9sbFN5bmMgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoU2Nyb2xsU3luYywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU2Nyb2xsU3luYyhwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxTeW5jKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JvbGxTeW5jKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsaWVudEhlaWdodDogMCxcbiAgICAgIGNsaWVudFdpZHRoOiAwLFxuICAgICAgc2Nyb2xsSGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIHNjcm9sbFdpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2Nyb2xsU3luYywgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3N0YXRlLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IF9zdGF0ZS5jbGllbnRXaWR0aDtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfc3RhdGUuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbFdpZHRoID0gX3N0YXRlLnNjcm9sbFdpZHRoO1xuXG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LFxuICAgICAgICBjbGllbnRXaWR0aDogY2xpZW50V2lkdGgsXG4gICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChfcmVmKSB7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBfcmVmLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsV2lkdGggPSBfcmVmLnNjcm9sbFdpZHRoO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIGNsaWVudFdpZHRoOiBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGggfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjcm9sbFN5bmM7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5TY3JvbGxTeW5jLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgMiBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgb25TY3JvbGwsIHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gU2Nyb2xsU3luYzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfU2Nyb2xsU3luYzIgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxudmFyIF9TY3JvbGxTeW5jMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Njcm9sbFN5bmMyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1Njcm9sbFN5bmMzLmRlZmF1bHQ7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBfU2Nyb2xsU3luYzMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEl0IGlzIGluZWZmaWNpZW50IHRvIGNyZWF0ZSBhbmQgbWFuYWdlIGEgbGFyZ2UgbGlzdCBvZiBET00gZWxlbWVudHMgd2l0aGluIGEgc2Nyb2xsaW5nIGNvbnRhaW5lclxuICogaWYgb25seSBhIGZldyBvZiB0aG9zZSBlbGVtZW50cyBhcmUgdmlzaWJsZS4gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIGNvbXBvbmVudCBpcyB0byBpbXByb3ZlXG4gKiBwZXJmb3JtYW5jZSBieSBvbmx5IHJlbmRlcmluZyB0aGUgRE9NIG5vZGVzIHRoYXQgYSB1c2VyIGlzIGFibGUgdG8gc2VlIGJhc2VkIG9uIHRoZWlyIGN1cnJlbnRcbiAqIHNjcm9sbCBwb3NpdGlvbi5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIGEgdmlydHVhbGl6ZWQgbGlzdCBvZiBlbGVtZW50cyB3aXRoIGVpdGhlciBmaXhlZCBvciBkeW5hbWljIGhlaWdodHMuXG4gKi9cblxudmFyIFZpcnR1YWxTY3JvbGwgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoVmlydHVhbFNjcm9sbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVmlydHVhbFNjcm9sbCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlydHVhbFNjcm9sbCk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZpcnR1YWxTY3JvbGwpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFZpcnR1YWxTY3JvbGwsIFt7XG4gICAga2V5OiAncmVjb21wdXRlUm93SGVpZ2h0cycsXG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBHcmlkI3JlY29tcHV0ZUdyaWRTaXplXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZVJvd0hlaWdodHMoKSB7XG4gICAgICB0aGlzLnJlZnMuR3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzLmhlaWdodDtcbiAgICAgIHZhciBub1Jvd3NSZW5kZXJlciA9IF9wcm9wcy5ub1Jvd3NSZW5kZXJlcjtcbiAgICAgIHZhciBvblJvd3NSZW5kZXJlZCA9IF9wcm9wcy5vblJvd3NSZW5kZXJlZDtcbiAgICAgIHZhciBfb25TY3JvbGwgPSBfcHJvcHMub25TY3JvbGw7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dSZW5kZXJlciA9IF9wcm9wcy5yb3dSZW5kZXJlcjtcbiAgICAgIHZhciBvdmVyc2NhblJvd3NDb3VudCA9IF9wcm9wcy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcHJvcHMuc2Nyb2xsVG9JbmRleDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuXG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnVmlydHVhbFNjcm9sbCcsIGNsYXNzTmFtZSk7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwge1xuICAgICAgICByZWY6ICdHcmlkJyxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgICBjb2x1bW5XaWR0aDogd2lkdGgsXG4gICAgICAgIGNvbHVtbnNDb3VudDogMSxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIG5vQ29udGVudFJlbmRlcmVyOiBub1Jvd3NSZW5kZXJlcixcbiAgICAgICAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKF9yZWYpIHtcbiAgICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgICAgICByZXR1cm4gX29uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uU2VjdGlvblJlbmRlcmVkKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RhcnRJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWYyLnJvd1N0YXJ0SW5kZXg7XG4gICAgICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYyLnJvd1N0b3BJbmRleDtcbiAgICAgICAgICByZXR1cm4gb25Sb3dzUmVuZGVyZWQoe1xuICAgICAgICAgICAgb3ZlcnNjYW5TdGFydEluZGV4OiByb3dPdmVyc2NhblN0YXJ0SW5kZXgsXG4gICAgICAgICAgICBvdmVyc2NhblN0b3BJbmRleDogcm93T3ZlcnNjYW5TdG9wSW5kZXgsXG4gICAgICAgICAgICBzdGFydEluZGV4OiByb3dTdGFydEluZGV4LFxuICAgICAgICAgICAgc3RvcEluZGV4OiByb3dTdG9wSW5kZXhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb3ZlcnNjYW5Sb3dzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICByZW5kZXJDZWxsOiBmdW5jdGlvbiByZW5kZXJDZWxsKF9yZWYzKSB7XG4gICAgICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjMuY29sdW1uSW5kZXg7XG4gICAgICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjMucm93SW5kZXg7XG4gICAgICAgICAgcmV0dXJuIHJvd1JlbmRlcmVyKHJvd0luZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgcm93SGVpZ2h0OiByb3dIZWlnaHQsXG4gICAgICAgIHJvd3NDb3VudDogcm93c0NvdW50LFxuICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9JbmRleCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFZpcnR1YWxTY3JvbGw7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyBuYW1lICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIEhlaWdodCBjb25zdHJhaW50IGZvciBsaXN0IChkZXRlcm1pbmVzIGhvdyBtYW55IGFjdHVhbCByb3dzIGFyZSByZW5kZXJlZCkgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiByb3dzQ291bnQgaXMgMCAqL1xuICBub1Jvd3NSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2xpY2Ugb2Ygcm93cyB0aGF0IHdlcmUganVzdCByZW5kZXJlZC5cbiAgICogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblJvd3NSZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AgfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSZXNwb25zYmlsZSBmb3IgcmVuZGVyaW5nIGEgcm93IGdpdmVuIGFuIGluZGV4ICovXG4gIHJvd1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdC4gKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkgKi9cbiAgc2Nyb2xsVG9JbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogV2lkdGggb2YgbGlzdCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblZpcnR1YWxTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBub1Jvd3NSZW5kZXJlcjogZnVuY3Rpb24gbm9Sb3dzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uUm93c1JlbmRlcmVkOiBmdW5jdGlvbiBvblJvd3NSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhblJvd3NDb3VudDogMTBcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBWaXJ0dWFsU2Nyb2xsOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVmlydHVhbFNjcm9sbCA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9WaXJ0dWFsU2Nyb2xsMiA9IHJlcXVpcmUoJy4vVmlydHVhbFNjcm9sbCcpO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVmlydHVhbFNjcm9sbDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfVmlydHVhbFNjcm9sbDMuZGVmYXVsdDtcbmV4cG9ydHMuVmlydHVhbFNjcm9sbCA9IF9WaXJ0dWFsU2Nyb2xsMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9BcnJvd0tleVN0ZXBwZXIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0Fycm93S2V5U3RlcHBlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BcnJvd0tleVN0ZXBwZXIuQXJyb3dLZXlTdGVwcGVyO1xuICB9XG59KTtcblxudmFyIF9BdXRvU2l6ZXIgPSByZXF1aXJlKCcuL0F1dG9TaXplcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0F1dG9TaXplcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BdXRvU2l6ZXIuQXV0b1NpemVyO1xuICB9XG59KTtcblxudmFyIF9Db2x1bW5TaXplciA9IHJlcXVpcmUoJy4vQ29sdW1uU2l6ZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDb2x1bW5TaXplcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Db2x1bW5TaXplci5Db2x1bW5TaXplcjtcbiAgfVxufSk7XG5cbnZhciBfRmxleFRhYmxlID0gcmVxdWlyZSgnLi9GbGV4VGFibGUnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGbGV4VGFibGUnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLkZsZXhUYWJsZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0ZsZXhDb2x1bW4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLkZsZXhDb2x1bW47XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0RGlyZWN0aW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5Tb3J0RGlyZWN0aW9uO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydEluZGljYXRvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuU29ydEluZGljYXRvcjtcbiAgfVxufSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4vR3JpZCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0dyaWQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfR3JpZC5HcmlkO1xuICB9XG59KTtcblxudmFyIF9JbmZpbml0ZUxvYWRlciA9IHJlcXVpcmUoJy4vSW5maW5pdGVMb2FkZXInKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdJbmZpbml0ZUxvYWRlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9JbmZpbml0ZUxvYWRlci5JbmZpbml0ZUxvYWRlcjtcbiAgfVxufSk7XG5cbnZhciBfU2Nyb2xsU3luYyA9IHJlcXVpcmUoJy4vU2Nyb2xsU3luYycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1Njcm9sbFN5bmMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfU2Nyb2xsU3luYy5TY3JvbGxTeW5jO1xuICB9XG59KTtcblxudmFyIF9WaXJ0dWFsU2Nyb2xsID0gcmVxdWlyZSgnLi9WaXJ0dWFsU2Nyb2xsJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnVmlydHVhbFNjcm9sbCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9WaXJ0dWFsU2Nyb2xsLlZpcnR1YWxTY3JvbGw7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIERldGVjdCBFbGVtZW50IFJlc2l6ZS5cbiogRm9ya2VkIGluIG9yZGVyIHRvIGd1YXJkIGFnYWluc3QgdW5zYWZlICd3aW5kb3cnIGFuZCAnZG9jdW1lbnQnIHJlZmVyZW5jZXMuXG4qXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9zZGVjaW1hL2phdmFzY3JpcHQtZGV0ZWN0LWVsZW1lbnQtcmVzaXplXG4qIFNlYmFzdGlhbiBEZWNpbWFcbipcbiogdmVyc2lvbjogMC41LjNcbioqL1xuXG4vLyBDaGVjayBgZG9jdW1lbnRgIGFuZCBgd2luZG93YCBpbiBjYXNlIG9mIHNlcnZlci1zaWRlIHJlbmRlcmluZ1xudmFyIF93aW5kb3c7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgX3dpbmRvdyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIF93aW5kb3cgPSBzZWxmO1xufSBlbHNlIHtcbiAgX3dpbmRvdyA9IHVuZGVmaW5lZDtcbn1cblxudmFyIGF0dGFjaEV2ZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5hdHRhY2hFdmVudDtcbnZhciBzdHlsZXNDcmVhdGVkID0gZmFsc2U7XG5cbmlmICghYXR0YWNoRXZlbnQpIHtcbiAgdmFyIHJlcXVlc3RGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmFmID0gX3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gX3dpbmRvdy5zZXRUaW1lb3V0KGZuLCAyMCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gcmFmKGZuKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIGNhbmNlbEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5jZWwgPSBfd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LmNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkKSB7XG4gICAgICByZXR1cm4gY2FuY2VsKGlkKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIHJlc2V0VHJpZ2dlcnMgPSBmdW5jdGlvbiByZXNldFRyaWdnZXJzKGVsZW1lbnQpIHtcbiAgICB2YXIgdHJpZ2dlcnMgPSBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyxcbiAgICAgICAgZXhwYW5kID0gdHJpZ2dlcnMuZmlyc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGNvbnRyYWN0ID0gdHJpZ2dlcnMubGFzdEVsZW1lbnRDaGlsZCxcbiAgICAgICAgZXhwYW5kQ2hpbGQgPSBleHBhbmQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29udHJhY3Quc2Nyb2xsTGVmdCA9IGNvbnRyYWN0LnNjcm9sbFdpZHRoO1xuICAgIGNvbnRyYWN0LnNjcm9sbFRvcCA9IGNvbnRyYWN0LnNjcm9sbEhlaWdodDtcbiAgICBleHBhbmRDaGlsZC5zdHlsZS53aWR0aCA9IGV4cGFuZC5vZmZzZXRXaWR0aCArIDEgKyAncHgnO1xuICAgIGV4cGFuZENoaWxkLnN0eWxlLmhlaWdodCA9IGV4cGFuZC5vZmZzZXRIZWlnaHQgKyAxICsgJ3B4JztcbiAgICBleHBhbmQuc2Nyb2xsTGVmdCA9IGV4cGFuZC5zY3JvbGxXaWR0aDtcbiAgICBleHBhbmQuc2Nyb2xsVG9wID0gZXhwYW5kLnNjcm9sbEhlaWdodDtcbiAgfTtcblxuICB2YXIgY2hlY2tUcmlnZ2VycyA9IGZ1bmN0aW9uIGNoZWNrVHJpZ2dlcnMoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50Lm9mZnNldFdpZHRoICE9IGVsZW1lbnQuX19yZXNpemVMYXN0X18ud2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgIT0gZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy5oZWlnaHQ7XG4gIH07XG5cbiAgdmFyIHNjcm9sbExpc3RlbmVyID0gZnVuY3Rpb24gc2Nyb2xsTGlzdGVuZXIoZSkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcztcbiAgICByZXNldFRyaWdnZXJzKHRoaXMpO1xuICAgIGlmICh0aGlzLl9fcmVzaXplUkFGX18pIGNhbmNlbEZyYW1lKHRoaXMuX19yZXNpemVSQUZfXyk7XG4gICAgdGhpcy5fX3Jlc2l6ZVJBRl9fID0gcmVxdWVzdEZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjaGVja1RyaWdnZXJzKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18ud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICBmbi5jYWxsKGVsZW1lbnQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKiBEZXRlY3QgQ1NTIEFuaW1hdGlvbnMgc3VwcG9ydCB0byBkZXRlY3QgZWxlbWVudCBkaXNwbGF5L3JlLWF0dGFjaCAqL1xuICB2YXIgYW5pbWF0aW9uID0gZmFsc2UsXG4gICAgICBhbmltYXRpb25zdHJpbmcgPSAnYW5pbWF0aW9uJyxcbiAgICAgIGtleWZyYW1lcHJlZml4ID0gJycsXG4gICAgICBhbmltYXRpb25zdGFydGV2ZW50ID0gJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICAgIGRvbVByZWZpeGVzID0gJ1dlYmtpdCBNb3ogTyBtcycuc3BsaXQoJyAnKSxcbiAgICAgIHN0YXJ0RXZlbnRzID0gJ3dlYmtpdEFuaW1hdGlvblN0YXJ0IGFuaW1hdGlvbnN0YXJ0IG9BbmltYXRpb25TdGFydCBNU0FuaW1hdGlvblN0YXJ0Jy5zcGxpdCgnICcpLFxuICAgICAgcGZ4ID0gJyc7XG4gIHtcbiAgICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcbiAgICBpZiAoZWxtLnN0eWxlLmFuaW1hdGlvbk5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYW5pbWF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYW5pbWF0aW9uID09PSBmYWxzZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb21QcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZWxtLnN0eWxlW2RvbVByZWZpeGVzW2ldICsgJ0FuaW1hdGlvbk5hbWUnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGZ4ID0gZG9tUHJlZml4ZXNbaV07XG4gICAgICAgICAgYW5pbWF0aW9uc3RyaW5nID0gcGZ4ICsgJ0FuaW1hdGlvbic7XG4gICAgICAgICAga2V5ZnJhbWVwcmVmaXggPSAnLScgKyBwZngudG9Mb3dlckNhc2UoKSArICctJztcbiAgICAgICAgICBhbmltYXRpb25zdGFydGV2ZW50ID0gc3RhcnRFdmVudHNbaV07XG4gICAgICAgICAgYW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBhbmltYXRpb25OYW1lID0gJ3Jlc2l6ZWFuaW0nO1xuICB2YXIgYW5pbWF0aW9uS2V5ZnJhbWVzID0gJ0AnICsga2V5ZnJhbWVwcmVmaXggKyAna2V5ZnJhbWVzICcgKyBhbmltYXRpb25OYW1lICsgJyB7IGZyb20geyBvcGFjaXR5OiAwOyB9IHRvIHsgb3BhY2l0eTogMDsgfSB9ICc7XG4gIHZhciBhbmltYXRpb25TdHlsZSA9IGtleWZyYW1lcHJlZml4ICsgJ2FuaW1hdGlvbjogMW1zICcgKyBhbmltYXRpb25OYW1lICsgJzsgJztcbn1cblxudmFyIGNyZWF0ZVN0eWxlcyA9IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlcygpIHtcbiAgaWYgKCFzdHlsZXNDcmVhdGVkKSB7XG4gICAgLy9vcGFjaXR5OjAgd29ya3MgYXJvdW5kIGEgY2hyb21lIGJ1ZyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mjg2MzYwXG4gICAgdmFyIGNzcyA9IChhbmltYXRpb25LZXlmcmFtZXMgPyBhbmltYXRpb25LZXlmcmFtZXMgOiAnJykgKyAnLnJlc2l6ZS10cmlnZ2VycyB7ICcgKyAoYW5pbWF0aW9uU3R5bGUgPyBhbmltYXRpb25TdHlsZSA6ICcnKSArICd2aXNpYmlsaXR5OiBoaWRkZW47IG9wYWNpdHk6IDA7IH0gJyArICcucmVzaXplLXRyaWdnZXJzLCAucmVzaXplLXRyaWdnZXJzID4gZGl2LCAuY29udHJhY3QtdHJpZ2dlcjpiZWZvcmUgeyBjb250ZW50OiBcXFwiIFxcXCI7IGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgfSAucmVzaXplLXRyaWdnZXJzID4gZGl2IHsgYmFja2dyb3VuZDogI2VlZTsgb3ZlcmZsb3c6IGF1dG87IH0gLmNvbnRyYWN0LXRyaWdnZXI6YmVmb3JlIHsgd2lkdGg6IDIwMCU7IGhlaWdodDogMjAwJTsgfScsXG4gICAgICAgIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHN0eWxlc0NyZWF0ZWQgPSB0cnVlO1xuICB9XG59O1xuXG52YXIgYWRkUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRSZXNpemVMaXN0ZW5lcihlbGVtZW50LCBmbikge1xuICBpZiAoYXR0YWNoRXZlbnQpIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgZm4pO2Vsc2Uge1xuICAgIGlmICghZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pIHtcbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09ICdzdGF0aWMnKSBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNyZWF0ZVN0eWxlcygpO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXyA9IHt9O1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fID0gW107XG4gICAgICAoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuY2xhc3NOYW1lID0gJ3Jlc2l6ZS10cmlnZ2Vycyc7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXy5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImV4cGFuZC10cmlnZ2VyXCI+PGRpdj48L2Rpdj48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJjb250cmFjdC10cmlnZ2VyXCI+PC9kaXY+JztcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pO1xuICAgICAgcmVzZXRUcmlnZ2VycyhlbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsTGlzdGVuZXIsIHRydWUpO1xuXG4gICAgICAvKiBMaXN0ZW4gZm9yIGEgY3NzIGFuaW1hdGlvbiB0byBkZXRlY3QgZWxlbWVudCBkaXNwbGF5L3JlLWF0dGFjaCAqL1xuICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCAmJiBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXy5hZGRFdmVudExpc3RlbmVyKGFuaW1hdGlvbnN0YXJ0ZXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmFuaW1hdGlvbk5hbWUgPT0gYW5pbWF0aW9uTmFtZSkgcmVzZXRUcmlnZ2VycyhlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18ucHVzaChmbik7XG4gIH1cbn07XG5cbnZhciByZW1vdmVSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZVJlc2l6ZUxpc3RlbmVyKGVsZW1lbnQsIGZuKSB7XG4gIGlmIChhdHRhY2hFdmVudCkgZWxlbWVudC5kZXRhY2hFdmVudCgnb25yZXNpemUnLCBmbik7ZWxzZSB7XG4gICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLnNwbGljZShlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uaW5kZXhPZihmbiksIDEpO1xuICAgIGlmICghZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmxlbmd0aCkge1xuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxMaXN0ZW5lcik7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyA9ICFlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGRSZXNpemVMaXN0ZW5lcjogYWRkUmVzaXplTGlzdGVuZXIsXG4gIHJlbW92ZVJlc2l6ZUxpc3RlbmVyOiByZW1vdmVSZXNpemVMaXN0ZW5lclxufTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4qIEBwcm92aWRlc01vZHVsZSBzaGFsbG93Q29tcGFyZVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnZmJqcy9saWIvc2hhbGxvd0VxdWFsJyk7XG5cbi8qKlxuICogRG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBmb3IgcHJvcHMgYW5kIHN0YXRlLlxuICogU2VlIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpblxuICovXG5mdW5jdGlvbiBzaGFsbG93Q29tcGFyZShpbnN0YW5jZSwgbmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgcmV0dXJuICFzaGFsbG93RXF1YWwoaW5zdGFuY2UucHJvcHMsIG5leHRQcm9wcykgfHwgIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5zdGF0ZSwgbmV4dFN0YXRlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93Q29tcGFyZTsiXX0=
