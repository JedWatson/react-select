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

var _componentsGithubUsers = require('./components/GithubUsers');

var _componentsGithubUsers2 = _interopRequireDefault(_componentsGithubUsers);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsVirtualized = require('./components/Virtualized');

var _componentsVirtualized2 = _interopRequireDefault(_componentsVirtualized);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsStates2['default'], { label: 'States', searchable: true }),
	_react2['default'].createElement(_componentsMultiselect2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement(_componentsVirtualized2['default'], { label: 'Virtualized' }),
	_react2['default'].createElement(_componentsContributors2['default'], { label: 'Contributors (Async)' }),
	_react2['default'].createElement(_componentsGithubUsers2['default'], { label: 'Github users (Async with fetch.js)' }),
	_react2['default'].createElement(_componentsNumericSelect2['default'], { label: 'Numeric Values' }),
	_react2['default'].createElement(_componentsCustomRender2['default'], { label: 'Custom Render Methods' }),
	_react2['default'].createElement(_componentsCustomComponents2['default'], { label: 'Custom Placeholder, Option and Value Components' })
), document.getElementById('example'));
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Contributors":2,"./components/CustomComponents":3,"./components/CustomRender":4,"./components/GithubUsers":5,"./components/Multiselect":6,"./components/NumericSelect":7,"./components/States":8,"./components/Virtualized":9,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
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

},{"../data/contributors":11,"react":undefined,"react-select":undefined}],3:[function(require,module,exports){
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

},{"../data/users":13,"react":undefined,"react-gravatar":30,"react-select":undefined}],4:[function(require,module,exports){
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

},{"react":undefined,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var GithubUsers = _react2['default'].createClass({
	displayName: 'GithubUsers',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true
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
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers: function getUsers(input) {
		return (0, _isomorphicFetch2['default'])('https://api.github.com/search/users?q=' + input).then(function (response) {
			return response.json();
		}).then(function (json) {
			return { options: json.items };
		});
	},
	gotoUser: function gotoUser(value, event) {
		window.open(value.html_url);
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
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoUser, valueKey: 'id', labelKey: 'login', loadOptions: this.getUsers, minimumInput: 1 }),
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
				'This example uses fetch.js for showing Async options with Promises'
			)
		);
	}
});

module.exports = GithubUsers;

},{"isomorphic-fetch":21,"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ sort: 1, label: 'Chocolate', value: 'chocolate' }, { sort: 2, label: 'Vanilla', value: 'vanilla' }, { sort: 3, label: 'Strawberry', value: 'strawberry' }, { sort: 4, label: 'Caramel', value: 'caramel' }, { sort: 5, label: 'Cookies and Cream', value: 'cookiescream' }, { sort: 6, label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ sort: 1, label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

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
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, dragToReorder: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
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
						'Match value'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label'
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

},{"../data/states":12,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

var DATA = require('../data/cities');

var CitiesField = _react2['default'].createClass({
	displayName: 'CitiesField',
	getInitialState: function getInitialState() {
		return {};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'Cities (Large Dataset)'
			),
			_react2['default'].createElement(_reactVirtualizedSelect2['default'], { ref: 'citySelect',
				options: options,
				simpleValue: true,
				clearable: true,
				name: 'select-city',
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true,
				labelKey: 'name',
				valueKey: 'name'
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'Uses ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized' },
					'react-virtualized'
				),
				' and ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized-select/' },
					'react-virtualized-select'
				),
				' to display a list of the world\'s 1,000 largest cities.'
			)
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":10,"react":undefined,"react-virtualized-select":33}],10:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],11:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],12:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],13:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],17:[function(require,module,exports){
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
},{"./inDOM":16}],18:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
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
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":70}],22:[function(require,module,exports){
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

},{"charenc":14,"crypt":15,"is-buffer":19}],23:[function(require,module,exports){
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

},{"_process":24}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":25,"./encode":26}],28:[function(require,module,exports){
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

},{"performance-now":23}],29:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":69}],30:[function(require,module,exports){
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
    var base, className, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
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
    className = 'react-gravatar';
    if (this.props.className) {
      className = className + " " + this.props.className;
    }
    if (!modernBrowser && isRetina()) {
      return React.createElement("img", Object.assign({
        "style": this.props.style,
        "src": retinaSrc,
        "height": this.props.size,
        "width": this.props.size
      }, this.props, {
        "className": className
      }));
    } else {
      return React.createElement("img", Object.assign({
        "style": this.props.style,
        "src": src,
        "srcSet": retinaSrc + " 2x",
        "height": this.props.size,
        "width": this.props.size
      }, this.props, {
        "className": className
      }));
    }
  }
});

},{"is-retina":20,"md5":22,"querystring":27,"react":undefined}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualizedSelect = function (_Component) {
  _inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    _classCallCheck(this, VirtualizedSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._optionRenderer = _this._optionRenderer.bind(_this);
    return _this;
  }

  _createClass(VirtualizedSelect, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default, _extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var _props = this.props;
      var maxHeight = _props.maxHeight;
      var optionHeight = _props.optionHeight;
      var optionRenderer = _props.optionRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = Math.min(maxHeight, options.length * optionHeight);
      var innerRowRenderer = optionRenderer || this._optionRenderer;

      function wrappedRowRenderer(index) {
        var option = options[index];

        return innerRowRenderer({ focusedOption: focusedOption, focusedOptionIndex: focusedOptionIndex, focusOption: focusOption, labelKey: labelKey, option: option, options: options, selectValue: selectValue, valueArray: valueArray });
      }

      return _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        { disableHeight: true },
        function (_ref2) {
          var width = _ref2.width;
          return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            rowHeight: optionHeight,
            rowRenderer: wrappedRowRenderer,
            rowsCount: options.length,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_optionRenderer',
    value: function _optionRenderer(_ref3) {
      var focusedOption = _ref3.focusedOption;
      var focusOption = _ref3.focusOption;
      var labelKey = _ref3.labelKey;
      var option = _ref3.option;
      var selectValue = _ref3.selectValue;
      var optionHeight = this.props.optionHeight;


      var className = option === focusedOption ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption' : 'VirtualizedSelectOption';

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onClick: function onClick() {
            return selectValue(option);
          },
          onMouseOver: function onMouseOver() {
            return focusOption(option);
          },
          style: {
            height: optionHeight
          }
        },
        option[labelKey]
      );
    }
  }]);

  return VirtualizedSelect;
}(_react.Component);

VirtualizedSelect.propTypes = {
  maxHeight: _react.PropTypes.number.isRequired,
  optionHeight: _react.PropTypes.number.isRequired,
  optionRenderer: _react.PropTypes.func
};
VirtualizedSelect.defaultProps = {
  maxHeight: 200,
  optionHeight: 35
};
exports.default = VirtualizedSelect;
},{"react":undefined,"react-select":undefined,"react-virtualized":64}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _VirtualizedSelect = require('./VirtualizedSelect');

var _VirtualizedSelect2 = _interopRequireDefault(_VirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualizedSelect2.default;
},{"./VirtualizedSelect":31}],33:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./VirtualizedSelect":32,"dup":32}],34:[function(require,module,exports){
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
},{"react":undefined,"react-addons-shallow-compare":29}],35:[function(require,module,exports){
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
},{"./ArrowKeyStepper":34}],36:[function(require,module,exports){
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
      if (this._detectElementResize) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
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

      // Gaurd against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      var boundingRect = this._parentNode.getBoundingClientRect();
      var height = boundingRect.height || 0;
      var width = boundingRect.width || 0;

      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      var paddingRight = parseInt(style.paddingRight, 10) || 0;
      var paddingTop = parseInt(style.paddingTop, 10) || 0;
      var paddingBottom = parseInt(style.paddingBottom, 10) || 0;

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
},{"../vendor/detectElementResize":68,"react":undefined,"react-addons-shallow-compare":29}],37:[function(require,module,exports){
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
},{"./AutoSizer":36}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CollectionView = require('./CollectionView');

var _CollectionView2 = _interopRequireDefault(_CollectionView);

var _calculateSizeAndPositionData2 = require('./utils/calculateSizeAndPositionData');

var _calculateSizeAndPositionData3 = _interopRequireDefault(_calculateSizeAndPositionData2);

var _getUpdatedOffsetForIndex = require('../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders scattered or non-linear data.
 * Unlike Grid, which renders checkerboard data, Collection can render arbitrarily positioned- even overlapping- data.
 */

var Collection = function (_Component) {
  _inherits(Collection, _Component);

  function Collection(props, context) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).call(this, props, context));

    _this._cellMetadata = [];
    _this._lastRenderedCellIndices = [];
    return _this;
  }

  /** React lifecycle methods */

  _createClass(Collection, [{
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement(_CollectionView2.default, _extends({
        cellLayoutManager: this,
        ref: 'CollectionView'
      }, props));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** CellLayoutManager interface */

  }, {
    key: 'calculateSizeAndPositionData',
    value: function calculateSizeAndPositionData() {
      var _props = this.props;
      var cellCount = _props.cellCount;
      var cellSizeAndPositionGetter = _props.cellSizeAndPositionGetter;
      var sectionSize = _props.sectionSize;


      var data = (0, _calculateSizeAndPositionData3.default)({
        cellCount: cellCount,
        cellSizeAndPositionGetter: cellSizeAndPositionGetter,
        sectionSize: sectionSize
      });

      this._cellMetadata = data.cellMetadata;
      this._sectionManager = data.sectionManager;
      this._height = data.height;
      this._width = data.width;
    }

    /**
     * Returns the most recently rendered set of cell indices.
     */

  }, {
    key: 'getLastRenderedIndices',
    value: function getLastRenderedIndices() {
      return this._lastRenderedCellIndices;
    }

    /**
     * Calculates the minimum amount of change from the current scroll position to ensure the specified cell is (fully) visible.
     */

  }, {
    key: 'getScrollPositionForCell',
    value: function getScrollPositionForCell(_ref) {
      var cellIndex = _ref.cellIndex;
      var height = _ref.height;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var width = _ref.width;
      var cellCount = this.props.cellCount;


      if (cellIndex >= 0 && cellIndex < cellCount) {
        var cellMetadata = this._cellMetadata[cellIndex];

        scrollLeft = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadata.x,
          cellSize: cellMetadata.width,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: cellIndex
        });

        scrollTop = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadata.y,
          cellSize: cellMetadata.height,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: cellIndex
        });
      }

      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }
  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return {
        height: this._height,
        width: this._width
      };
    }
  }, {
    key: 'renderCells',
    value: function renderCells(_ref2) {
      var _this2 = this;

      var height = _ref2.height;
      var isScrolling = _ref2.isScrolling;
      var width = _ref2.width;
      var x = _ref2.x;
      var y = _ref2.y;
      var _props2 = this.props;
      var cellGroupRenderer = _props2.cellGroupRenderer;
      var cellRenderer = _props2.cellRenderer;

      // Store for later calls to getLastRenderedIndices()

      this._lastRenderedCellIndices = this._sectionManager.getCellIndices({
        height: height,
        width: width,
        x: x,
        y: y
      });

      return cellGroupRenderer({
        cellRenderer: cellRenderer,
        cellSizeAndPositionGetter: function cellSizeAndPositionGetter(index) {
          return _this2._sectionManager.getCellMetadata(index);
        },
        indices: this._lastRenderedCellIndices
      });
    }
  }]);

  return Collection;
}(_react.Component);

Collection.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Number of cells in Collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a group of cells given their indices.
   * Should implement the following interface: ({
   *   cellSizeAndPositionGetter:Function,
   *   indices: Array<number>,
   *   cellRenderer: Function
   * }): Array<PropTypes.node>
   */
  cellGroupRenderer: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: (index: number): PropTypes.node
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback responsible for returning size and offset/position information for a given cell (index).
   * (index): { height: number, width: number, x: number, y: number }
   */
  cellSizeAndPositionGetter: _react.PropTypes.func.isRequired,

  /**
   * Optionally override the size of the sections a Collection's cells are split into.
   */
  sectionSize: _react.PropTypes.number
};
Collection.defaultProps = {
  'aria-label': 'grid',
  cellGroupRenderer: defaultCellGroupRenderer
};
exports.default = Collection;


function defaultCellGroupRenderer(_ref3) {
  var cellRenderer = _ref3.cellRenderer;
  var cellSizeAndPositionGetter = _ref3.cellSizeAndPositionGetter;
  var indices = _ref3.indices;

  return indices.map(function (index) {
    var cellMetadata = cellSizeAndPositionGetter(index);
    var renderedCell = cellRenderer(index);

    if (renderedCell == null || renderedCell === false) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      {
        className: 'Collection__cell',
        key: index,
        style: {
          height: cellMetadata.height,
          left: cellMetadata.x,
          top: cellMetadata.y,
          width: cellMetadata.width
        }
      },
      renderedCell
    );
  }).filter(function (renderedCell) {
    return !!renderedCell;
  });
}
},{"../utils/getUpdatedOffsetForIndex":66,"./CollectionView":39,"./utils/calculateSizeAndPositionData":43,"react":undefined,"react-addons-shallow-compare":29}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @TODO It would be nice to refactor Grid to use this code as well.

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
 * Monitors changes in properties (eg. cellCount) and state (eg. scroll offsets) to determine when rendering needs to occur.
 * This component does not render any visible content itself; it defers to the specified :cellLayoutManager.
 */

var CollectionView = function (_Component) {
  _inherits(CollectionView, _Component);

  function CollectionView(props, context) {
    _classCallCheck(this, CollectionView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CollectionView).call(this, props, context));

    _this.state = {
      calculateSizeAndPositionDataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes callbacks only when their values have changed.
    _this._onSectionRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around.
    _this._invokeOnSectionRenderedHelper = _this._invokeOnSectionRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollPositionForScrollToCell = _this._updateScrollPositionForScrollToCell.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of cell sizes and positions.
   * This function should be called if cell sizes have changed but nothing else has.
   * Since cell positions are calculated by callbacks, the collection view has no way of detecting when the underlying data has changed.
   */


  _createClass(CollectionView, [{
    key: 'recomputeCellSizesAndPositions',
    value: function recomputeCellSizesAndPositions() {
      this.setState({
        calculateSizeAndPositionDataOnNextUpdate: true
      });
    }

    /* ---------------------------- Component lifecycle methods ---------------------------- */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var cellLayoutManager = _props.cellLayoutManager;
      var scrollLeft = _props.scrollLeft;
      var scrollToCell = _props.scrollToCell;
      var scrollTop = _props.scrollTop;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollToCell >= 0) {
        this._updateScrollPositionForScrollToCell();
      } else if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      // Update onSectionRendered callback.
      this._invokeOnSectionRenderedHelper();

      var _cellLayoutManager$ge = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge.height;
      var totalWidth = _cellLayoutManager$ge.width;

      // Initialize onScroll callback.

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalHeight: totalHeight,
        totalWidth: totalWidth
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var height = _props2.height;
      var scrollToCell = _props2.scrollToCell;
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

      // Update scroll offsets if the current :scrollToCell values requires it
      if (height !== prevProps.height || scrollToCell !== prevProps.scrollToCell || width !== prevProps.width) {
        this._updateScrollPositionForScrollToCell();
      }

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnSectionRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var cellLayoutManager = this.props.cellLayoutManager;


      cellLayoutManager.calculateSizeAndPositionData();
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
      if (nextProps.cellCount === 0 && (nextState.scrollLeft !== 0 || nextState.scrollTop !== 0)) {
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

      if (nextProps.cellCount !== this.props.cellCount || nextProps.cellLayoutManager !== this.props.cellLayoutManager || nextState.calculateSizeAndPositionDataOnNextUpdate) {
        nextProps.cellLayoutManager.calculateSizeAndPositionData();
      }

      if (nextState.calculateSizeAndPositionDataOnNextUpdate) {
        this.setState({
          calculateSizeAndPositionDataOnNextUpdate: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var cellLayoutManager = _props3.cellLayoutManager;
      var className = _props3.className;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = height > 0 && width > 0 ? cellLayoutManager.renderCells({
        height: height,
        isScrolling: isScrolling,
        width: width,
        x: scrollLeft,
        y: scrollTop
      }) : [];

      var _cellLayoutManager$ge2 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge2.height;
      var totalWidth = _cellLayoutManager$ge2.width;


      var gridStyle = {
        height: height,
        width: width
      };

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }
      if (totalWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Collection', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: gridStyle,
          tabIndex: 0
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Collection__innerScrollContainer',
            style: {
              height: totalHeight,
              maxHeight: totalHeight,
              maxWidth: totalWidth,
              pointerEvents: isScrolling ? 'none' : 'auto',
              width: totalWidth
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

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Collection.
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
    key: '_invokeOnSectionRenderedHelper',
    value: function _invokeOnSectionRenderedHelper() {
      var _props4 = this.props;
      var cellLayoutManager = _props4.cellLayoutManager;
      var onSectionRendered = _props4.onSectionRendered;


      this._onSectionRenderedMemoizer({
        callback: onSectionRendered,
        indices: cellLayoutManager.getLastRenderedIndices()
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var _this3 = this;

      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalHeight = _ref.totalHeight;
      var totalWidth = _ref.totalWidth;

      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;
          var _props5 = _this3.props;
          var height = _props5.height;
          var onScroll = _props5.onScroll;
          var width = _props5.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalWidth
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
      var _this4 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this4._setNextStateAnimationFrameId = null;
        _this4.setState(state);
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
    key: '_updateScrollPositionForScrollToCell',
    value: function _updateScrollPositionForScrollToCell() {
      var _props6 = this.props;
      var cellLayoutManager = _props6.cellLayoutManager;
      var height = _props6.height;
      var scrollToCell = _props6.scrollToCell;
      var width = _props6.width;
      var _state3 = this.state;
      var scrollLeft = _state3.scrollLeft;
      var scrollTop = _state3.scrollTop;


      if (scrollToCell >= 0) {
        var scrollPosition = cellLayoutManager.getScrollPositionForCell({
          cellIndex: scrollToCell,
          height: height,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          width: width
        });

        if (scrollPosition.scrollLeft !== scrollLeft || scrollPosition.scrollTop !== scrollTop) {
          this._setScrollPosition(scrollPosition);
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
      var _props7 = this.props;
      var cellLayoutManager = _props7.cellLayoutManager;
      var height = _props7.height;
      var width = _props7.width;

      var scrollbarSize = this._scrollbarSize;

      var _cellLayoutManager$ge3 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge3.height;
      var totalWidth = _cellLayoutManager$ge3.width;

      var scrollLeft = Math.min(totalWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalHeight - height + scrollbarSize, event.target.scrollTop);

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

        // Synchronously set :isScrolling the first time (since _setNextState will reschedule its animation frame each time it's called)
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

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        totalWidth: totalWidth,
        totalHeight: totalHeight
      });
    }
  }]);

  return CollectionView;
}(_react.Component);

CollectionView.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Number of cells in collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Calculates cell sizes and positions and manages rendering the appropriate cells given a specified window.
   */
  cellLayoutManager: _react.PropTypes.object.isRequired,

  /**
   * Optional custom CSS class name to attach to root Collection element.
   */
  className: _react.PropTypes.string,

  /**
   * Height of Collection; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :cellCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Collection that was just rendered.
   * This callback is passed an array of the most recently rendered section indices.
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Horizontal offset.
   */
  scrollLeft: _react.PropTypes.number,

  /**
   * Cell index to ensure visible (by forcefully scrolling if necessary).
   */
  scrollToCell: _react.PropTypes.number,

  /**
   * Vertical offset.
   */
  scrollTop: _react.PropTypes.number,

  /**
   * Width of Collection; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
CollectionView.defaultProps = {
  'aria-label': 'grid',
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  }
};
exports.default = CollectionView;
},{"../utils/createCallbackMemoizer":65,"classnames":undefined,"dom-helpers/util/scrollbarSize":17,"raf":28,"react":undefined,"react-addons-shallow-compare":29}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A section of the Window.
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * Sections have a fixed size and contain 0 to many cells (tracked by their indices).
 */

var Section = function () {
  function Section(_ref) {
    var height = _ref.height;
    var width = _ref.width;
    var x = _ref.x;
    var y = _ref.y;

    _classCallCheck(this, Section);

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this._indexMap = {};
    this._indices = [];
  }

  /** Add a cell to this section. */


  _createClass(Section, [{
    key: 'addCellIndex',
    value: function addCellIndex(index) {
      if (!this._indexMap[index]) {
        this._indexMap[index] = true;
        this._indices.push(index);
      }
    }

    /** Get all cell indices that have been added to this section. */

  }, {
    key: 'getCellIndices',
    value: function getCellIndices() {
      return this._indices;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      return this.x + ',' + this.y + ' ' + this.width + 'x' + this.height;
    }
  }]);

  return Section;
}(); /** @rlow */


exports.default = Section;
},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Window Sections are used to group nearby cells.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This enables us to more quickly determine which cells to display in a given region of the Window.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Section = require('./Section');

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECTION_SIZE = 100;

/**
 * Contains 0 to many Sections.
 * Grows (and adds Sections) dynamically as cells are registered.
 * Automatically adds cells to the appropriate Section(s).
 */

var SectionManager = function () {
  function SectionManager() {
    var sectionSize = arguments.length <= 0 || arguments[0] === undefined ? SECTION_SIZE : arguments[0];

    _classCallCheck(this, SectionManager);

    this._sectionSize = sectionSize;

    this._cellMetadata = [];
    this._sections = {};
  }

  /**
   * Gets all cell indices contained in the specified region.
   * A region may encompass 1 or more Sections.
   */


  _createClass(SectionManager, [{
    key: 'getCellIndices',
    value: function getCellIndices(_ref) {
      var height = _ref.height;
      var width = _ref.width;
      var x = _ref.x;
      var y = _ref.y;

      var indices = {};

      this.getSections({ height: height, width: width, x: x, y: y }).forEach(function (section) {
        return section.getCellIndices().forEach(function (index) {
          return indices[index] = index;
        });
      });

      // Object keys are strings; this function returns numbers
      return Object.keys(indices).map(function (index) {
        return indices[index];
      });
    }

    /** Get size and position information for the cell specified. */

  }, {
    key: 'getCellMetadata',
    value: function getCellMetadata(index) {
      return this._cellMetadata[index];
    }

    /** Get all Sections overlapping the specified region. */

  }, {
    key: 'getSections',
    value: function getSections(_ref2) {
      var height = _ref2.height;
      var width = _ref2.width;
      var x = _ref2.x;
      var y = _ref2.y;

      var sectionXStart = Math.floor(x / this._sectionSize);
      var sectionXStop = Math.floor((x + width - 1) / this._sectionSize);
      var sectionYStart = Math.floor(y / this._sectionSize);
      var sectionYStop = Math.floor((y + height - 1) / this._sectionSize);

      var sections = [];

      for (var sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
        for (var sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
          var key = sectionX + '.' + sectionY;

          if (!this._sections[key]) {
            this._sections[key] = new _Section2.default({
              height: this._sectionSize,
              width: this._sectionSize,
              x: sectionX * this._sectionSize,
              y: sectionY * this._sectionSize
            });
          }

          sections.push(this._sections[key]);
        }
      }

      return sections;
    }

    /** Total number of Sections based on the currently registered cells. */

  }, {
    key: 'getTotalSectionCount',
    value: function getTotalSectionCount() {
      return Object.keys(this._sections).length;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return Object.keys(this._sections).map(function (index) {
        return _this._sections[index].toString();
      });
    }

    /** Adds a cell to the appropriate Sections and registers it metadata for later retrievable. */

  }, {
    key: 'registerCell',
    value: function registerCell(_ref3) {
      var cellMetadatum = _ref3.cellMetadatum;
      var index = _ref3.index;

      this._cellMetadata[index] = cellMetadatum;

      this.getSections(cellMetadatum).forEach(function (section) {
        return section.addCellIndex(index);
      });
    }
  }]);

  return SectionManager;
}();

exports.default = SectionManager;
},{"./Section":40}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = exports.default = undefined;

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Collection3.default;
exports.Collection = _Collection3.default;
},{"./Collection":38}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionData;

var _SectionManager = require('../SectionManager');

var _SectionManager2 = _interopRequireDefault(_SectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateSizeAndPositionData(_ref) {
  var cellCount = _ref.cellCount;
  var cellSizeAndPositionGetter = _ref.cellSizeAndPositionGetter;
  var sectionSize = _ref.sectionSize;

  var cellMetadata = [];
  var sectionManager = new _SectionManager2.default(sectionSize);
  var height = 0;
  var width = 0;

  for (var index = 0; index < cellCount; index++) {
    var cellMetadatum = cellSizeAndPositionGetter(index);

    if (cellMetadatum.height == null || isNaN(cellMetadatum.height) || cellMetadatum.width == null || isNaN(cellMetadatum.width) || cellMetadatum.x == null || isNaN(cellMetadatum.x) || cellMetadatum.y == null || isNaN(cellMetadatum.y)) {
      throw Error('Invalid metadata returned for cell ' + index + ':\n        x:' + cellMetadatum.x + ', y:' + cellMetadatum.y + ', width:' + cellMetadatum.width + ', height:' + cellMetadatum.height);
    }

    height = Math.max(height, cellMetadatum.y + cellMetadatum.height);
    width = Math.max(width, cellMetadatum.x + cellMetadatum.width);

    cellMetadata[index] = cellMetadatum;
    sectionManager.registerCell({
      cellMetadatum: cellMetadatum,
      index: index
    });
  }

  return {
    cellMetadata: cellMetadata,
    height: height,
    sectionManager: sectionManager,
    width: width
  };
}
},{"../SectionManager":41}],44:[function(require,module,exports){
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
},{"../Grid":52,"react":undefined,"react-addons-shallow-compare":29}],45:[function(require,module,exports){
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
},{"./ColumnSizer":44}],46:[function(require,module,exports){
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
  /** Optional aria-label value to set on the column header */
  'aria-label': _react.PropTypes.string,

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
},{"./SortIndicator":49,"react":undefined}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
          'aria-label': this.props['aria-label'],
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

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      var a11yProps = {};

      if (sortEnabled || onHeaderClick) {
        (function () {
          // If this is a sortable header, clicking it should update the table data's sorting.
          var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;

          var onClick = function onClick() {
            sortEnabled && sort(dataKey, newSortDirection);
            onHeaderClick && onHeaderClick(dataKey, columnData);
          };

          var onKeyDown = function onKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
              onClick();
            }
          };

          a11yProps['aria-label'] = column.props['aria-label'] || label || dataKey;
          a11yProps.role = 'rowheader';
          a11yProps.tabIndex = 0;
          a11yProps.onClick = onClick;
          a11yProps.onKeyDown = onKeyDown;
        })();
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style
        }),
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
      var rowData = rowGetter(rowIndex);

      var renderedRow = _react2.default.Children.toArray(children).map(function (column, columnIndex) {
        return _this3._createColumn(column, columnIndex, rowData, rowIndex);
      });

      var a11yProps = {};

      if (onRowClick) {
        a11yProps['aria-label'] = 'row';
        a11yProps.role = 'row';
        a11yProps.tabIndex = 0;
        a11yProps.onClick = function () {
          return onRowClick(rowIndex);
        };
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: rowIndex,
          className: (0, _classnames2.default)('FlexTable__row', rowClass),
          style: {
            height: this._getRowHeight(rowIndex),
            paddingRight: scrollbarWidth
          }
        }),
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

      var items = disableHeader ? [] : _react2.default.Children.toArray(children);

      return items.map(function (column, index) {
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
  'aria-label': _react.PropTypes.string,

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
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = FlexTable;
},{"../Grid":52,"./FlexColumn":46,"./SortDirection":48,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":29,"react-dom":undefined}],48:[function(require,module,exports){
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
},{}],49:[function(require,module,exports){
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
},{"./SortDirection":48,"classnames":undefined,"react":undefined}],50:[function(require,module,exports){
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
},{"./FlexColumn":46,"./FlexTable":47,"./SortDirection":48,"./SortIndicator":49}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateSizeAndPositionDataAndUpdateScrollOffset = require('./utils/calculateSizeAndPositionDataAndUpdateScrollOffset');

var _calculateSizeAndPositionDataAndUpdateScrollOffset2 = _interopRequireDefault(_calculateSizeAndPositionDataAndUpdateScrollOffset);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _getNearestIndex = require('./utils/getNearestIndex');

var _getNearestIndex2 = _interopRequireDefault(_getNearestIndex);

var _getOverscanIndices = require('./utils/getOverscanIndices');

var _getOverscanIndices2 = _interopRequireDefault(_getOverscanIndices);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _getUpdatedOffsetForIndex = require('../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

var _getVisibleCellIndices = require('./utils/getVisibleCellIndices');

var _getVisibleCellIndices2 = _interopRequireDefault(_getVisibleCellIndices);

var _initCellMetadata = require('../utils/initCellMetadata');

var _initCellMetadata2 = _interopRequireDefault(_initCellMetadata);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _updateScrollIndexHelper = require('./utils/updateScrollIndexHelper');

var _updateScrollIndexHelper2 = _interopRequireDefault(_updateScrollIndexHelper);

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
    _this._onGridRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._computeColumnMetadata = _this._computeColumnMetadata.bind(_this);
    _this._computeRowMetadata = _this._computeRowMetadata.bind(_this);
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
      var _this2 = this;

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
      // @TODO Do we also need this check or can the one in componentWillUpdate() suffice?
      (0, _updateScrollIndexHelper2.default)({
        cellCount: columnsCount,
        cellMetadata: this._columnMetadata,
        cellSize: columnWidth,
        previousCellsCount: prevProps.columnsCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToColumn) {
          return _this2._updateScrollLeftForScrollToColumn(_extends({}, _this2.props, { scrollToColumn: scrollToColumn }));
        }
      });
      (0, _updateScrollIndexHelper2.default)({
        cellCount: rowsCount,
        cellMetadata: this._rowMetadata,
        cellSize: rowHeight,
        previousCellsCount: prevProps.rowsCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToRow) {
          return _this2._updateScrollTopForScrollToRow(_extends({}, _this2.props, { scrollToRow: scrollToRow }));
        }
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._computeColumnMetadata(this.props);
      this._computeRowMetadata(this.props);
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
      var _this3 = this;

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
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.columnsCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: this._computeColumnMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.columnsCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollLeftForScrollToColumn(nextProps, nextState);
        }
      });
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.rowsCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: this._computeRowMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.rowsCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollTopForScrollToRow(nextProps, nextState);
        }
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
      var renderCellRanges = _props3.renderCellRanges;
      var rowsCount = _props3.rowsCount;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = (0, _getVisibleCellIndices2.default)({
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft
        });

        var visibleRowIndices = (0, _getVisibleCellIndices2.default)({
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _getOverscanIndices2.default)({
          cellCount: columnsCount,
          overscanCellsCount: overscanColumnsCount,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _getOverscanIndices2.default)({
          cellCount: rowsCount,
          overscanCellsCount: overscanRowsCount,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        childrenToDisplay = renderCellRanges({
          columnMetadata: this._columnMetadata,
          columnStartIndex: this._columnStartIndex,
          columnStopIndex: this._columnStopIndex,
          renderCell: renderCell,
          rowMetadata: this._rowMetadata,
          rowStartIndex: this._rowStartIndex,
          rowStopIndex: this._rowStopIndex
        });
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
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: gridStyle,
          tabIndex: 0
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
    key: '_computeColumnMetadata',
    value: function _computeColumnMetadata(props) {
      var columnsCount = props.columnsCount;
      var columnWidth = props.columnWidth;


      this._columnMetadata = (0, _initCellMetadata2.default)({
        cellCount: columnsCount,
        size: columnWidth
      });
    }
  }, {
    key: '_computeRowMetadata',
    value: function _computeRowMetadata(props) {
      var rowHeight = props.rowHeight;
      var rowsCount = props.rowsCount;


      this._rowMetadata = (0, _initCellMetadata2.default)({
        cellCount: rowsCount,
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
      var _this4 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this4._disablePointerEventsTimeoutId = null;
        _this4.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
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
      var _this5 = this;

      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalColumnsWidth = _ref.totalColumnsWidth;
      var totalRowsHeight = _ref.totalRowsHeight;

      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;
          var _props4 = _this5.props;
          var height = _props4.height;
          var onScroll = _props4.onScroll;
          var width = _props4.width;


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
      var _this6 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this6._setNextStateAnimationFrameId = null;
        _this6.setState(state);
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
    value: function _updateScrollLeftForScrollToColumn() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var _ref4 = props || this.props;

      var columnsCount = _ref4.columnsCount;
      var scrollToColumn = _ref4.scrollToColumn;
      var width = _ref4.width;

      var _ref5 = state || this.state;

      var scrollLeft = _ref5.scrollLeft;


      if (scrollToColumn >= 0 && columnsCount > 0) {
        var targetIndex = (0, _getNearestIndex2.default)({
          cellCount: this._columnMetadata.length,
          targetIndex: scrollToColumn
        });

        var columnMetadata = this._columnMetadata[targetIndex];

        var calculatedScrollLeft = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: columnMetadata.offset,
          cellSize: columnMetadata.size,
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
    value: function _updateScrollTopForScrollToRow() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var _ref6 = props || this.props;

      var height = _ref6.height;
      var rowsCount = _ref6.rowsCount;
      var scrollToRow = _ref6.scrollToRow;

      var _ref7 = state || this.state;

      var scrollTop = _ref7.scrollTop;


      if (scrollToRow >= 0 && rowsCount > 0) {
        var targetIndex = (0, _getNearestIndex2.default)({
          cellCount: this._rowMetadata.length,
          targetIndex: scrollToRow
        });

        var rowMetadata = this._rowMetadata[targetIndex];

        var calculatedScrollTop = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: rowMetadata.offset,
          cellSize: rowMetadata.size,
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
  'aria-label': _react.PropTypes.string,

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
   * Responsible for rendering a group of cells given their index ranges.
   * Should implement the following interface: ({
   *   columnMetadata:Array<Object>,
   *   columnStartIndex: number,
   *   columnStopIndex: number,
   *   renderCell: Function,
   *   rowMetadata:Array<Object>,
   *   rowStartIndex: number,
   *   rowStopIndex: number
   * }): Array<PropTypes.node>
   */
  renderCellRanges: _react.PropTypes.func.isRequired,

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
  'aria-label': 'grid',
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
  overscanRowsCount: 10,
  renderCellRanges: defaultRenderCellRanges
};
exports.default = Grid;


function defaultRenderCellRanges(_ref8) {
  var columnMetadata = _ref8.columnMetadata;
  var columnStartIndex = _ref8.columnStartIndex;
  var columnStopIndex = _ref8.columnStopIndex;
  var renderCell = _ref8.renderCell;
  var rowMetadata = _ref8.rowMetadata;
  var rowStartIndex = _ref8.rowStartIndex;
  var rowStopIndex = _ref8.rowStopIndex;

  var renderedCells = [];

  for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    var rowDatum = rowMetadata[rowIndex];

    for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
      var columnDatum = columnMetadata[columnIndex];
      var renderedCell = renderCell({ columnIndex: columnIndex, rowIndex: rowIndex });
      var key = rowIndex + '-' + columnIndex;

      if (renderedCell == null || renderedCell === false) {
        continue;
      }

      var child = _react2.default.createElement(
        'div',
        {
          key: key,
          className: 'Grid__cell',
          style: {
            height: rowDatum.size,
            left: columnDatum.offset,
            top: rowDatum.offset,
            width: columnDatum.size
          }
        },
        renderedCell
      );

      renderedCells.push(child);
    }
  }

  return renderedCells;
}
},{"../utils/createCallbackMemoizer":65,"../utils/getUpdatedOffsetForIndex":66,"../utils/initCellMetadata":67,"./utils/calculateSizeAndPositionDataAndUpdateScrollOffset":53,"./utils/getNearestIndex":54,"./utils/getOverscanIndices":55,"./utils/getVisibleCellIndices":56,"./utils/updateScrollIndexHelper":57,"classnames":undefined,"dom-helpers/util/scrollbarSize":17,"raf":28,"react":undefined,"react-addons-shallow-compare":29}],52:[function(require,module,exports){
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
},{"./Grid":51}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionDataAndUpdateScrollOffset;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellCount Number of rows or columns in the current axis
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
function calculateSizeAndPositionDataAndUpdateScrollOffset(_ref) {
  var cellCount = _ref.cellCount;
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
  if (computeMetadataOnNextUpdate || cellCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}
},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNearestIndex;
/**
 * Finds the nearest valid index to the one specified if the specified index is invalid.
 * @param cellCount Number of rows or columns in the current axis
 * @param targetIndex Index to use if possible
 */
function getNearestIndex(_ref) {
  var cellCount = _ref.cellCount;
  var targetIndex = _ref.targetIndex;

  return Math.max(0, Math.min(cellCount - 1, targetIndex));
}
},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOverscanIndices;
/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 * @param cellCount Number of rows or columns in the current axis
 * @param overscanCellsCount Maximum number of cells to over-render in either direction
 * @param startIndex Begin of range of visible cells
 * @param stopIndex End of range of visible cells
 */
function getOverscanIndices(_ref) {
  var cellCount = _ref.cellCount;
  var overscanCellsCount = _ref.overscanCellsCount;
  var startIndex = _ref.startIndex;
  var stopIndex = _ref.stopIndex;

  return {
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
  };
}
},{}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVisibleCellIndices;
/**
 * Determines the range of cells to display for a given offset in order to fill the specified container.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return An object containing :start and :stop attributes, each specifying a cell index
 */
function getVisibleCellIndices(_ref) {
  var cellMetadata = _ref.cellMetadata;
  var containerSize = _ref.containerSize;
  var currentOffset = _ref.currentOffset;

  var cellCount = cellMetadata.length;

  if (cellCount === 0) {
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
    mode: EQUAL_OR_LOWER,
    offset: currentOffset
  });

  var datum = cellMetadata[start];
  currentOffset = datum.offset + datum.size;

  var stop = start;

  while (currentOffset < maxOffset && stop < cellCount - 1) {
    stop++;

    currentOffset += cellMetadata[stop].size;
  }

  return {
    start: start,
    stop: stop
  };
}

/**
 * Binary search function inspired by react-infinite.
 */
function findNearestCell(_ref2) {
  var cellMetadata = _ref2.cellMetadata;
  var mode = _ref2.mode;
  var offset = _ref2.offset;

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

  if (mode === EQUAL_OR_LOWER && low > 0) {
    return low - 1;
  } else if (mode === EQUAL_OR_HIGHER && high < cellMetadata.length - 1) {
    return high + 1;
  }
}

var EQUAL_OR_LOWER = 1;
var EQUAL_OR_HIGHER = 2;
},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateScrollIndexHelper;

var _getNearestIndex = require('./getNearestIndex');

var _getNearestIndex2 = _interopRequireDefault(_getNearestIndex);

var _getUpdatedOffsetForIndex = require('../../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param cellCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an scroll-to-index value
 */
function updateScrollIndexHelper(_ref) {
  var cellMetadata = _ref.cellMetadata;
  var cellCount = _ref.cellCount;
  var cellSize = _ref.cellSize;
  var previousCellsCount = _ref.previousCellsCount;
  var previousCellSize = _ref.previousCellSize;
  var previousScrollToIndex = _ref.previousScrollToIndex;
  var previousSize = _ref.previousSize;
  var scrollOffset = _ref.scrollOffset;
  var scrollToIndex = _ref.scrollToIndex;
  var size = _ref.size;
  var updateScrollIndexCallback = _ref.updateScrollIndexCallback;

  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
      scrollToIndex = (0, _getNearestIndex2.default)({
        cellCount: cellCount,
        targetIndex: cellCount - 1
      });

      if (scrollToIndex < cellCount) {
        var cellMetadatum = cellMetadata[scrollToIndex];
        var calculatedScrollOffset = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadatum.offset,
          cellSize: cellMetadatum.size,
          containerSize: size,
          currentOffset: scrollOffset
        });

        // Only adjust the scroll position if we've scrolled below the last set of rows.
        if (calculatedScrollOffset < scrollOffset) {
          updateScrollIndexCallback(cellCount - 1);
        }
      }
    }
}
},{"../../utils/getUpdatedOffsetForIndex":66,"./getNearestIndex":54}],58:[function(require,module,exports){
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
      var minimumBatchSize = _props.minimumBatchSize;
      var rowsCount = _props.rowsCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        minimumBatchSize: minimumBatchSize,
        rowsCount: rowsCount,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowsCount - 1, stopIndex + threshold)
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
   * Minimum number of rows to be loaded at a time.
   * This property can be used to batch requests to reduce HTTP requests.
   */
  minimumBatchSize: _react.PropTypes.number.isRequired,

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
  minimumBatchSize: 10,
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
  var minimumBatchSize = _ref3.minimumBatchSize;
  var rowsCount = _ref3.rowsCount;
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
    // Attempt to satisfy :minimumBatchSize requirement but don't exceed :rowsCount
    var potentialStopIndex = Math.min(Math.max(rangeStopIndex, rangeStartIndex + minimumBatchSize - 1), rowsCount - 1);

    for (var i = rangeStopIndex + 1; i <= potentialStopIndex; i++) {
      if (!isRowLoaded(i)) {
        rangeStopIndex = i;
      } else {
        break;
      }
    }

    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  return unloadedRanges;
}
},{"react":undefined,"react-addons-shallow-compare":29}],59:[function(require,module,exports){
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
},{"./InfiniteLoader":58}],60:[function(require,module,exports){
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
},{"react":undefined,"react-addons-shallow-compare":29}],61:[function(require,module,exports){
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
},{"./ScrollSync":60}],62:[function(require,module,exports){
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
        'aria-label': this.props['aria-label'],
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
  'aria-label': _react.PropTypes.string,

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
},{"../Grid":52,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":29}],63:[function(require,module,exports){
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
},{"./VirtualScroll":62}],64:[function(require,module,exports){
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

var _Collection = require('./Collection');

Object.defineProperty(exports, 'Collection', {
  enumerable: true,
  get: function get() {
    return _Collection.Collection;
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
},{"./ArrowKeyStepper":35,"./AutoSizer":37,"./Collection":42,"./ColumnSizer":45,"./FlexTable":50,"./Grid":52,"./InfiniteLoader":59,"./ScrollSync":61,"./VirtualScroll":63}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCallbackMemoizer;
/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref) {
    var callback = _ref.callback;
    var indices = _ref.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      return indices[key] >= 0;
    });
    var indexChanged = keys.length !== Object.keys(cachedIndices).length || keys.some(function (key) {
      return cachedIndices[key] !== indices[key];
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}
},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUpdatedOffsetForIndex;
/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param cellOffset Offset (x or y) position for cell
 * @param cellSize Size (width or height) of cell
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref) {
  var cellOffset = _ref.cellOffset;
  var cellSize = _ref.cellSize;
  var containerSize = _ref.containerSize;
  var currentOffset = _ref.currentOffset;

  var maxOffset = cellOffset;
  var minOffset = maxOffset - containerSize + cellSize;
  var newOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  return newOffset;
}
},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initCellMetadata;
/**
 * Initializes metadata for an axis and its cells.
 * This data is used to determine which cells are visible given a container size and scroll position.
 *
 * @param cellCount Total number of cells.
 * @param size Either a fixed size or a function that returns the size for a given given an index.
 * @return Object mapping cell index to cell metadata (size, offset)
 */
function initCellMetadata(_ref) {
  var cellCount = _ref.cellCount;
  var size = _ref.size;

  var sizeGetter = size instanceof Function ? size : function (index) {
    return size;
  };

  var cellMetadata = [];
  var offset = 0;

  for (var i = 0; i < cellCount; i++) {
    var _size = sizeGetter(i);

    if (_size == null || isNaN(_size)) {
      throw Error("Invalid size returned for cell " + i + " of value " + _size);
    }

    cellMetadata[i] = {
      size: _size,
      offset: offset
    };

    offset += _size;
  }

  return cellMetadata;
}
},{}],68:[function(require,module,exports){
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
},{}],69:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
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
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":18}],70:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2FwcC5qcyIsIi9Vc2Vycy9vbGl2ZXIvRG9jdW1lbnRzL2RldmVsb3BtZW50L3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9Db250cmlidXRvcnMuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cy5qcyIsIi9Vc2Vycy9vbGl2ZXIvRG9jdW1lbnRzL2RldmVsb3BtZW50L3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9DdXN0b21SZW5kZXIuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvR2l0aHViVXNlcnMuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTXVsdGlzZWxlY3QuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdC5qcyIsIi9Vc2Vycy9vbGl2ZXIvRG9jdW1lbnRzL2RldmVsb3BtZW50L3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9TdGF0ZXMuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvVmlydHVhbGl6ZWQuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvY2l0aWVzLmpzIiwiL1VzZXJzL29saXZlci9Eb2N1bWVudHMvZGV2ZWxvcG1lbnQvcHJvamVjdHMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL2NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy9vbGl2ZXIvRG9jdW1lbnRzL2RldmVsb3BtZW50L3Byb2plY3RzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9zdGF0ZXMuanMiLCIvVXNlcnMvb2xpdmVyL0RvY3VtZW50cy9kZXZlbG9wbWVudC9wcm9qZWN0cy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvdXNlcnMuanMiLCJub2RlX21vZHVsZXMvY2hhcmVuYy9jaGFyZW5jLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0L2NyeXB0LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL3V0aWwvaW5ET00uanMiLCJub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3NoYWxsb3dFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXMtcmV0aW5hL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtZmV0Y2gvZmV0Y2gtbnBtLWJyb3dzZXJpZnkuanMiLCJub2RlX21vZHVsZXMvbWQ1L21kNS5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1ncmF2YXRhci9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxpemVkU2VsZWN0L1ZpcnR1YWxpemVkU2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxpemVkU2VsZWN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL0Fycm93S2V5U3RlcHBlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0Fycm93S2V5U3RlcHBlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9BdXRvU2l6ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BdXRvU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL0NvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL0NvbGxlY3Rpb25WaWV3LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi9TZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi9TZWN0aW9uTWFuYWdlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL3V0aWxzL2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2x1bW5TaXplci9Db2x1bW5TaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbHVtblNpemVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL0ZsZXhDb2x1bW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvRmxleFRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL1NvcnREaXJlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvU29ydEluZGljYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL3V0aWxzL2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL3V0aWxzL2dldE5lYXJlc3RJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvZ2V0T3ZlcnNjYW5JbmRpY2VzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC91dGlscy9nZXRWaXNpYmxlQ2VsbEluZGljZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL3V0aWxzL3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvSW5maW5pdGVMb2FkZXIvSW5maW5pdGVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9JbmZpbml0ZUxvYWRlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvU2Nyb2xsU3luYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1Njcm9sbFN5bmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL1ZpcnR1YWxTY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9WaXJ0dWFsU2Nyb2xsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy91dGlscy9jcmVhdGVDYWxsYmFja01lbW9pemVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvdXRpbHMvZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvdXRpbHMvaW5pdENlbGxNZXRhZGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL3ZlbmRvci9kZXRlY3RFbGVtZW50UmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9zaGFsbG93Q29tcGFyZS5qcyIsIm5vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDYixjQUFjOzs7O3NDQUVSLDJCQUEyQjs7OztxQ0FDNUIsMEJBQTBCOzs7OzBDQUNyQiwrQkFBK0I7Ozs7c0NBQ25DLDJCQUEyQjs7OztxQ0FDNUIsMEJBQTBCOzs7O3VDQUN4Qiw0QkFBNEI7Ozs7cUNBQzlCLDBCQUEwQjs7OztnQ0FDL0IscUJBQXFCOzs7O0FBRXhDLHNCQUFTLE1BQU0sQ0FDZDs7O0NBQ0Msa0VBQVEsS0FBSyxFQUFDLFFBQVEsRUFBQyxVQUFVLE1BQUEsR0FBRztDQUNwQyx1RUFBYSxLQUFLLEVBQUMsYUFBYSxHQUFHO0NBQ25DLHVFQUFhLEtBQUssRUFBQyxhQUFhLEdBQUc7Q0FDbkMsd0VBQWMsS0FBSyxFQUFDLHNCQUFzQixHQUFHO0NBQzdDLHVFQUFhLEtBQUssRUFBQyxvQ0FBb0MsR0FBRztDQUMxRCx5RUFBZSxLQUFLLEVBQUMsZ0JBQWdCLEdBQUc7Q0FDeEMsd0VBQWMsS0FBSyxFQUFDLHVCQUF1QixHQUFFO0NBQzdDLDRFQUFrQixLQUFLLEVBQUMsaURBQWlELEdBQUc7Q0FJdkUsRUFDTixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUNsQyxD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QUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFB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YyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsNkJBQTZCLEVBQUUsRUFDdkMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQ2hCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FB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LEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3pCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQzFCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQ2pCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUMzQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVB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RSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFF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QUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQ3ZDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQ3JDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQ3ZDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQ3BDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBQ3BDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQ2xDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDeEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFDdEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBRSxFQUNsRCxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUM5QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUNoQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUMvQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUNyQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxFQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEVBQ3hDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQ3RDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQy9CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDeEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFDcEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFDdkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FDcEMsQ0FBQzs7Ozs7QUN2RUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUNoQixFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFDckUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEVBQ3JFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUNyRSxDQUFDOzs7QUNKRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL2tCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgQ29udHJpYnV0b3JzIGZyb20gJy4vY29tcG9uZW50cy9Db250cmlidXRvcnMnO1xuaW1wb3J0IEdpdGh1YlVzZXJzIGZyb20gJy4vY29tcG9uZW50cy9HaXRodWJVc2Vycyc7XG5pbXBvcnQgQ3VzdG9tQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cyc7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21SZW5kZXInO1xuaW1wb3J0IE11bHRpc2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9NdWx0aXNlbGVjdCc7XG5pbXBvcnQgTnVtZXJpY1NlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdCc7XG5pbXBvcnQgVmlydHVhbGl6ZWQgZnJvbSAnLi9jb21wb25lbnRzL1ZpcnR1YWxpemVkJztcbmltcG9ydCBTdGF0ZXMgZnJvbSAnLi9jb21wb25lbnRzL1N0YXRlcyc7XG5cblJlYWN0RE9NLnJlbmRlcihcblx0PGRpdj5cblx0XHQ8U3RhdGVzIGxhYmVsPVwiU3RhdGVzXCIgc2VhcmNoYWJsZSAvPlxuXHRcdDxNdWx0aXNlbGVjdCBsYWJlbD1cIk11bHRpc2VsZWN0XCIgLz5cblx0XHQ8VmlydHVhbGl6ZWQgbGFiZWw9XCJWaXJ0dWFsaXplZFwiIC8+XG5cdFx0PENvbnRyaWJ1dG9ycyBsYWJlbD1cIkNvbnRyaWJ1dG9ycyAoQXN5bmMpXCIgLz5cblx0XHQ8R2l0aHViVXNlcnMgbGFiZWw9XCJHaXRodWIgdXNlcnMgKEFzeW5jIHdpdGggZmV0Y2guanMpXCIgLz5cblx0XHQ8TnVtZXJpY1NlbGVjdCBsYWJlbD1cIk51bWVyaWMgVmFsdWVzXCIgLz5cblx0XHQ8Q3VzdG9tUmVuZGVyIGxhYmVsPVwiQ3VzdG9tIFJlbmRlciBNZXRob2RzXCIvPlxuXHRcdDxDdXN0b21Db21wb25lbnRzIGxhYmVsPVwiQ3VzdG9tIFBsYWNlaG9sZGVyLCBPcHRpb24gYW5kIFZhbHVlIENvbXBvbmVudHNcIiAvPlxuXHRcdHsvKlxuXHRcdDxTZWxlY3RlZFZhbHVlc0ZpZWxkIGxhYmVsPVwiT3B0aW9uIENyZWF0aW9uICh0YWdzIG1vZGUpXCIgb3B0aW9ucz17RkxBVk9VUlN9IGFsbG93Q3JlYXRlIGhpbnQ9XCJFbnRlciBhIHZhbHVlIHRoYXQncyBOT1QgaW4gdGhlIGxpc3QsIHRoZW4gaGl0IHJldHVyblwiIC8+XG5cdFx0Ki99XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IENPTlRSSUJVVE9SUyA9IHJlcXVpcmUoJy4uL2RhdGEvY29udHJpYnV0b3JzJyk7XG5jb25zdCBNQVhfQ09OVFJJQlVUT1JTID0gNjtcbmNvbnN0IEFTWU5DX0RFTEFZID0gNTAwO1xuXG5jb25zdCBDb250cmlidXRvcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ29udHJpYnV0b3JzJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFtDT05UUklCVVRPUlNbMF1dLFxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWVbMF0sXG5cdFx0fSk7XG5cdH0sXG5cdGdldENvbnRyaWJ1dG9ycyAoaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuXHRcdHZhciBvcHRpb25zID0gQ09OVFJJQlVUT1JTLmZpbHRlcihpID0+IHtcblx0XHRcdHJldHVybiBpLmdpdGh1Yi5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoKSA9PT0gaW5wdXQ7XG5cdFx0fSk7XG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLnNsaWNlKDAsIE1BWF9DT05UUklCVVRPUlMpLFxuXHRcdFx0Y29tcGxldGU6IG9wdGlvbnMubGVuZ3RoIDw9IE1BWF9DT05UUklCVVRPUlMsXG5cdFx0fTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0fSwgQVNZTkNfREVMQVkpO1xuXHR9LFxuXHRnb3RvQ29udHJpYnV0b3IgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vJyArIHZhbHVlLmdpdGh1Yik7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdC5Bc3luYyBtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvblZhbHVlQ2xpY2s9e3RoaXMuZ290b0NvbnRyaWJ1dG9yfSB2YWx1ZUtleT1cImdpdGh1YlwiIGxhYmVsS2V5PVwibmFtZVwiIGxvYWRPcHRpb25zPXt0aGlzLmdldENvbnRyaWJ1dG9yc30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIGxhYmVsIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLCBhc3luYyBvcHRpb25zIGFuZCBvcGVucyB0aGUgZ2l0aHViIHByb2ZpbGVzIGluIGEgbmV3IHdpbmRvdyB3aGVuIHZhbHVlcyBhcmUgY2xpY2tlZDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJpYnV0b3JzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBHcmF2YXRhciBmcm9tICdyZWFjdC1ncmF2YXRhcic7XG5cbmNvbnN0IFVTRVJTID0gcmVxdWlyZSgnLi4vZGF0YS91c2VycycpO1xuY29uc3QgR1JBVkFUQVJfU0laRSA9IDE1O1xuXG5jb25zdCBHcmF2YXRhck9wdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpc0Rpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRpc0ZvY3VzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGlzU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvcHRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0fSxcblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZUVudGVyIChldmVudCkge1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuaXNGb2N1c2VkKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy5vbkZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy5vcHRpb24udGl0bGV9PlxuXHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMub3B0aW9uLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgR3JhdmF0YXJWYWx1ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlXCIgdGl0bGU9e3RoaXMucHJvcHMudmFsdWUudGl0bGV9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtbGFiZWxcIj5cblx0XHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMudmFsdWUuZW1haWx9IHNpemU9e0dSQVZBVEFSX1NJWkV9IHN0eWxlPXtncmF2YXRhclN0eWxlfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgVXNlcnNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0aGludDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgcGxhY2Vob2xkZXIgPSA8c3Bhbj4mIzk3ODY7IFNlbGVjdCBVc2VyPC9zcGFuPjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ9e0dyYXZhdGFyT3B0aW9ufVxuXHRcdFx0XHRcdG9wdGlvbnM9e1VTRVJTfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZUNvbXBvbmVudD17R3JhdmF0YXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5cblx0XHRcdFx0XHRUaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gT3B0aW9uIGFuZCBWYWx1ZSBjb21wb25lbnRzIHRvIHJlbmRlciBhIEdyYXZhdGFyIGltYWdlIGZvciBlYWNoIHVzZXIgYmFzZWQgb24gdGhlaXIgZW1haWwuXG5cdFx0XHRcdFx0SXQgYWxzbyBkZW1vbnN0cmF0ZXMgcmVuZGVyaW5nIEhUTUwgZWxlbWVudHMgYXMgdGhlIHBsYWNlaG9sZGVyLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG52YXIgRGlzYWJsZWRVcHNlbGxPcHRpb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0Rpc2FibGVkVXBzZWxsT3B0aW9ucycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdTdXBwb3J0IGxldmVsIHNlbGVjdGVkOicsIHZhbHVlLmxhYmVsKTtcblx0fSxcblx0cmVuZGVyTGluazogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIDxhIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDUgfX0gaHJlZj1cIi91cGdyYWRlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VXBncmFkZSBoZXJlITwvYT47XG5cdH0sXG5cdHJlbmRlck9wdGlvbjogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBvcHRpb24uY29sb3IgfX0+e29wdGlvbi5sYWJlbH0ge29wdGlvbi5saW5rfTwvc3Bhbj47XG5cdH0sXG5cdHJlbmRlclZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gPHN0cm9uZyBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmNvbG9yIH19PntvcHRpb24ubGFiZWx9PC9zdHJvbmc+O1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHRpb25zID0gW1xuXHRcdFx0eyBsYWJlbDogJ0Jhc2ljIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ2Jhc2ljJywgY29sb3I6ICcjRTMxODY0JyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ByZW1pdW0gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJlbWl1bScsIGNvbG9yOiAnIzYyMTZBMycgfSxcblx0XHRcdHsgbGFiZWw6ICdQcm8gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJvJywgZGlzYWJsZWQ6IHRydWUsIGxpbms6IHRoaXMucmVuZGVyTGluaygpIH0sXG5cdFx0XTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBzdXBwb3J0IGxldmVsXCJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyPXt0aGlzLnJlbmRlck9wdGlvbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZVJlbmRlcmVyPXt0aGlzLnJlbmRlclZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZGVtb25zdGF0ZXMgY3VzdG9tIHJlbmRlciBtZXRob2RzIGFuZCBsaW5rcyBpbiBkaXNhYmxlZCBvcHRpb25zPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGlzYWJsZWRVcHNlbGxPcHRpb25zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJztcblxuXG5jb25zdCBHaXRodWJVc2VycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdHaXRodWJVc2VycycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUgPyB0aGlzLnN0YXRlLnZhbHVlWzBdIDogbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHRnZXRVc2VycyAoaW5wdXQpIHtcblx0XHRyZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL3VzZXJzP3E9JHtpbnB1dH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBqc29uLml0ZW1zIH07XG4gICAgICB9KTtcblx0fSxcblx0Z290b1VzZXIgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKHZhbHVlLmh0bWxfdXJsKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0LkFzeW5jIG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uVmFsdWVDbGljaz17dGhpcy5nb3RvVXNlcn0gdmFsdWVLZXk9XCJpZFwiIGxhYmVsS2V5PVwibG9naW5cIiBsb2FkT3B0aW9ucz17dGhpcy5nZXRVc2Vyc30gbWluaW11bUlucHV0PXsxfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9NdWx0aX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aXNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXshdGhpcy5zdGF0ZS5tdWx0aX0gb25DaGFuZ2U9e3RoaXMuc3dpdGNoVG9TaW5nbGV9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2luZ2xlIFZhbHVlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgdXNlcyBmZXRjaC5qcyBmb3Igc2hvd2luZyBBc3luYyBvcHRpb25zIHdpdGggUHJvbWlzZXM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdpdGh1YlVzZXJzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgRkxBVk9VUlMgPSBbXG5cdHsgc29ydDogMSwgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcblx0eyBzb3J0OiAyLCBsYWJlbDogJ1ZhbmlsbGEnLCB2YWx1ZTogJ3ZhbmlsbGEnIH0sXG5cdHsgc29ydDogMywgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9LFxuXHR7IHNvcnQ6IDQsIGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcblx0eyBzb3J0OiA1LCBsYWJlbDogJ0Nvb2tpZXMgYW5kIENyZWFtJywgdmFsdWU6ICdjb29raWVzY3JlYW0nIH0sXG5cdHsgc29ydDogNiwgbGFiZWw6ICdQZXBwZXJtaW50JywgdmFsdWU6ICdwZXBwZXJtaW50JyB9LFxuXTtcblxuY29uc3QgV0hZX1dPVUxEX1lPVSA9IFtcblx0eyBzb3J0OiAxLCBsYWJlbDogJ0Nob2NvbGF0ZSAoYXJlIHlvdSBjcmF6eT8pJywgdmFsdWU6ICdjaG9jb2xhdGUnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuXS5jb25jYXQoRkxBVk9VUlMuc2xpY2UoMSkpO1xuXG52YXIgTXVsdGlTZWxlY3RGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdNdWx0aVNlbGVjdEZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdGNyYXp5OiBmYWxzZSxcblx0XHRcdG9wdGlvbnM6IEZMQVZPVVJTLFxuXHRcdFx0dmFsdWU6IFtdLFxuXHRcdH07XG5cdH0sXG5cdGhhbmRsZVNlbGVjdENoYW5nZSAodmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnWW91XFwndmUgc2VsZWN0ZWQ6JywgdmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0dG9nZ2xlRGlzYWJsZWQgKGUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGlzYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG5cdH0sXG5cdHRvZ2dsZUNob2NvbGF0ZSAoZSkge1xuXHRcdGxldCBjcmF6eSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjcmF6eTogY3JhenksXG5cdFx0XHRvcHRpb25zOiBjcmF6eSA/IFdIWV9XT1VMRF9ZT1UgOiBGTEFWT1VSUyxcblx0XHR9KTtcblx0fSxcblxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgbXVsdGkgc2ltcGxlVmFsdWUgZHJhZ1RvUmVvcmRlcj17dHJ1ZX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlbGVjdCB5b3VyIGZhdm91cml0ZShzKVwiIG9wdGlvbnM9e3RoaXMuc3RhdGUub3B0aW9uc30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0Q2hhbmdlfSAvPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVEaXNhYmxlZH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+RGlzYWJsZSB0aGUgY29udHJvbDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNyYXp5fSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaG9jb2xhdGV9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkkgZG9uJ3QgbGlrZSBDaG9jb2xhdGUgKGRpc2FibGVkIHRoZSBvcHRpb24pPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlTZWxlY3RGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbnZhciBWYWx1ZXNBc051bWJlcnNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdWYWx1ZXNBc051bWJlcnNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0eyB2YWx1ZTogMTAsIGxhYmVsOiAnVGVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMSwgbGFiZWw6ICdFbGV2ZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDEyLCBsYWJlbDogJ1R3ZWx2ZScgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjMsIGxhYmVsOiAnVHdlbnR5LXRocmVlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyNCwgbGFiZWw6ICdUd2VudHktZm91cicgfVxuXHRcdFx0XSxcblx0XHRcdG1hdGNoUG9zOiAnYW55Jyxcblx0XHRcdG1hdGNoVmFsdWU6IHRydWUsXG5cdFx0XHRtYXRjaExhYmVsOiB0cnVlLFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0XHRtdWx0aTogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoU3RhcnQoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoUG9zOiBldmVudC50YXJnZXQuY2hlY2tlZCA/ICdzdGFydCcgOiAnYW55J1xuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoVmFsdWUoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoVmFsdWU6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hMYWJlbChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hMYWJlbDogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2UodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdFx0Y29uc29sZS5sb2coJ051bWVyaWMgU2VsZWN0IHZhbHVlIGNoYW5nZWQgdG8nLCB2YWx1ZSk7XG5cdH0sXG5cdG9uQ2hhbmdlTXVsdGkoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBtYXRjaFByb3AgPSAnYW55Jztcblx0XHRpZiAodGhpcy5zdGF0ZS5tYXRjaExhYmVsICYmICF0aGlzLnN0YXRlLm1hdGNoVmFsdWUpIHtcblx0XHRcdG1hdGNoUHJvcCA9ICdsYWJlbCc7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5zdGF0ZS5tYXRjaExhYmVsICYmIHRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ3ZhbHVlJztcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdG1hdGNoUG9zPXt0aGlzLnN0YXRlLm1hdGNoUG9zfVxuXHRcdFx0XHRcdG1hdGNoUHJvcD17bWF0Y2hQcm9wfVxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuc3RhdGUub3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm11bHRpfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU11bHRpfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aS1TZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaFZhbHVlfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoVmFsdWV9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk1hdGNoIHZhbHVlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hMYWJlbH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaExhYmVsfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NYXRjaCBsYWJlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoUG9zID09PSAnc3RhcnQnfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoU3RhcnR9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk9ubHkgaW5jbHVkZSBtYXRjaGVzIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmc8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZXhhbXBsZSB1c2VzIHNpbXBsZSBudW1lcmljIHZhbHVlczwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVzQXNOdW1iZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBTVEFURVMgPSByZXF1aXJlKCcuLi9kYXRhL3N0YXRlcycpO1xuXG52YXIgU3RhdGVzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnU3RhdGVzRmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRzZWFyY2hhYmxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFiZWw6ICdTdGF0ZXM6Jyxcblx0XHRcdHNlYXJjaGFibGU6IHRydWUsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y291bnRyeTogJ0FVJyxcblx0XHRcdGRpc2FibGVkOiBmYWxzZSxcblx0XHRcdHNlYXJjaGFibGU6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdHNlbGVjdFZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyxcblx0XHRcdGNsZWFyYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRzd2l0Y2hDb3VudHJ5IChlKSB7XG5cdFx0dmFyIG5ld0NvdW50cnkgPSBlLnRhcmdldC52YWx1ZTtcblx0XHRjb25zb2xlLmxvZygnQ291bnRyeSBjaGFuZ2VkIHRvICcgKyBuZXdDb3VudHJ5KTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvdW50cnk6IG5ld0NvdW50cnksXG5cdFx0XHRzZWxlY3RWYWx1ZTogbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnU3RhdGUgY2hhbmdlZCB0byAnICsgbmV3VmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdGZvY3VzU3RhdGVTZWxlY3QgKCkge1xuXHRcdHRoaXMucmVmcy5zdGF0ZVNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXHR0b2dnbGVDaGVja2JveCAoZSkge1xuXHRcdGxldCBuZXdTdGF0ZSA9IHt9O1xuXHRcdG5ld1N0YXRlW2UudGFyZ2V0Lm5hbWVdID0gZS50YXJnZXQuY2hlY2tlZDtcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IFNUQVRFU1t0aGlzLnN0YXRlLmNvdW50cnldO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgcmVmPVwic3RhdGVTZWxlY3RcIiBhdXRvZm9jdXMgb3B0aW9ucz17b3B0aW9uc30gc2ltcGxlVmFsdWUgY2xlYXJhYmxlPXt0aGlzLnN0YXRlLmNsZWFyYWJsZX0gbmFtZT1cInNlbGVjdGVkLXN0YXRlXCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdFZhbHVlfSBvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gc2VhcmNoYWJsZT17dGhpcy5zdGF0ZS5zZWFyY2hhYmxlfSAvPlxuXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAxNCB9fT5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmZvY3VzU3RhdGVTZWxlY3R9PkZvY3VzIFNlbGVjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwic2VhcmNoYWJsZVwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuc2VhcmNoYWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+U2VhcmNoYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiZGlzYWJsZWRcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlZDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19PlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBuYW1lPVwiY2xlYXJhYmxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jbGVhcmFibGV9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkNsZWFyYWJsZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ0FVJ30gdmFsdWU9XCJBVVwiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+QXVzdHJhbGlhPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY291bnRyeSA9PT0gJ1VTJ30gdmFsdWU9XCJVU1wiIG9uQ2hhbmdlPXt0aGlzLnN3aXRjaENvdW50cnl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+VW5pdGVkIFN0YXRlczwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFZpcnR1YWxpemVkU2VsZWN0IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdCc7XG5cbmNvbnN0IERBVEEgPSByZXF1aXJlKCcuLi9kYXRhL2NpdGllcycpO1xuXG52YXIgQ2l0aWVzRmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ2l0aWVzRmllbGQnLFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0dXBkYXRlVmFsdWUgKG5ld1ZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWVcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IERBVEEuQ0lUSUVTO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPkNpdGllcyAoTGFyZ2UgRGF0YXNldCk8L2gzPlxuXHRcdFx0XHQ8VmlydHVhbGl6ZWRTZWxlY3QgcmVmPVwiY2l0eVNlbGVjdFwiXG5cdFx0XHRcdFx0b3B0aW9ucz17b3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdGNsZWFyYWJsZVxuXHRcdFx0XHRcdG5hbWU9XCJzZWxlY3QtY2l0eVwiXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMudXBkYXRlVmFsdWV9XG5cdFx0XHRcdFx0c2VhcmNoYWJsZVxuXHRcdFx0XHRcdGxhYmVsS2V5PVwibmFtZVwiXG5cdFx0XHRcdFx0dmFsdWVLZXk9XCJuYW1lXCJcblx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+XG5cdFx0XHRcdFx0VXNlcyA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWRcIj5yZWFjdC12aXJ0dWFsaXplZDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC1zZWxlY3QvXCI+cmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0PC9hPiB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgd29ybGQncyAxLDAwMCBsYXJnZXN0IGNpdGllcy5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENpdGllc0ZpZWxkO1xuIiwiZXhwb3J0cy5DSVRJRVMgPSBbXG4gIHsgbmFtZTogJ0FiaWxlbmUnIH0sXG4gIHsgbmFtZTogJ0FkZGlzb24nIH0sXG4gIHsgbmFtZTogJ0Frcm9uJyB9LFxuICB7IG5hbWU6ICdBbGFtZWRhJyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJ1cXVlcnF1ZScgfSxcbiAgeyBuYW1lOiAnQWxleGFuZHJpYScgfSxcbiAgeyBuYW1lOiAnQWxleGFuZHJpYScgfSxcbiAgeyBuYW1lOiAnQWxoYW1icmEnIH0sXG4gIHsgbmFtZTogJ0FsaXNvIFZpZWpvJyB9LFxuICB7IG5hbWU6ICdBbGxlbicgfSxcbiAgeyBuYW1lOiAnQWxsZW50b3duJyB9LFxuICB7IG5hbWU6ICdBbHBoYXJldHRhJyB9LFxuICB7IG5hbWU6ICdBbHRhbW9udGUgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQWx0b29uYScgfSxcbiAgeyBuYW1lOiAnQW1hcmlsbG8nIH0sXG4gIHsgbmFtZTogJ0FtZXMnIH0sXG4gIHsgbmFtZTogJ0FuYWhlaW0nIH0sXG4gIHsgbmFtZTogJ0FuY2hvcmFnZScgfSxcbiAgeyBuYW1lOiAnQW5kZXJzb24nIH0sXG4gIHsgbmFtZTogJ0Fua2VueScgfSxcbiAgeyBuYW1lOiAnQW5uIEFyYm9yJyB9LFxuICB7IG5hbWU6ICdBbm5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0FudGlvY2gnIH0sXG4gIHsgbmFtZTogJ0FwYWNoZSBKdW5jdGlvbicgfSxcbiAgeyBuYW1lOiAnQXBleCcgfSxcbiAgeyBuYW1lOiAnQXBvcGthJyB9LFxuICB7IG5hbWU6ICdBcHBsZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0FwcGxlIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnQXBwbGV0b24nIH0sXG4gIHsgbmFtZTogJ0FyY2FkaWEnIH0sXG4gIHsgbmFtZTogJ0FybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQXJsaW5ndG9uIEhlaWdodHMnIH0sXG4gIHsgbmFtZTogJ0FydmFkYScgfSxcbiAgeyBuYW1lOiAnQXNoZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdBdGhlbnMtQ2xhcmtlIENvdW50eScgfSxcbiAgeyBuYW1lOiAnQXRsYW50YScgfSxcbiAgeyBuYW1lOiAnQXRsYW50aWMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQXR0bGVib3JvJyB9LFxuICB7IG5hbWU6ICdBdWJ1cm4nIH0sXG4gIHsgbmFtZTogJ0F1YnVybicgfSxcbiAgeyBuYW1lOiAnQXVndXN0YS1SaWNobW9uZCBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0F1cm9yYScgfSxcbiAgeyBuYW1lOiAnQXVyb3JhJyB9LFxuICB7IG5hbWU6ICdBdXN0aW4nIH0sXG4gIHsgbmFtZTogJ0F2ZW50dXJhJyB9LFxuICB7IG5hbWU6ICdBdm9uZGFsZScgfSxcbiAgeyBuYW1lOiAnQXp1c2EnIH0sXG4gIHsgbmFtZTogJ0Jha2Vyc2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdCYWxkd2luIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0JhbHRpbW9yZScgfSxcbiAgeyBuYW1lOiAnQmFybnN0YWJsZSBUb3duJyB9LFxuICB7IG5hbWU6ICdCYXJ0bGV0dCcgfSxcbiAgeyBuYW1lOiAnQmFydGxldHQnIH0sXG4gIHsgbmFtZTogJ0JhdG9uIFJvdWdlJyB9LFxuICB7IG5hbWU6ICdCYXR0bGUgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0JheW9ubmUnIH0sXG4gIHsgbmFtZTogJ0JheXRvd24nIH0sXG4gIHsgbmFtZTogJ0JlYXVtb250JyB9LFxuICB7IG5hbWU6ICdCZWF1bW9udCcgfSxcbiAgeyBuYW1lOiAnQmVhdmVyY3JlZWsnIH0sXG4gIHsgbmFtZTogJ0JlYXZlcnRvbicgfSxcbiAgeyBuYW1lOiAnQmVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnQmVsbCBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZ1ZScgfSxcbiAgeyBuYW1lOiAnQmVsbGV2dWUnIH0sXG4gIHsgbmFtZTogJ0JlbGxmbG93ZXInIH0sXG4gIHsgbmFtZTogJ0JlbGxpbmdoYW0nIH0sXG4gIHsgbmFtZTogJ0JlbG9pdCcgfSxcbiAgeyBuYW1lOiAnQmVuZCcgfSxcbiAgeyBuYW1lOiAnQmVudG9udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JlcmtlbGV5JyB9LFxuICB7IG5hbWU6ICdCZXJ3eW4nIH0sXG4gIHsgbmFtZTogJ0JldGhsZWhlbScgfSxcbiAgeyBuYW1lOiAnQmV2ZXJseScgfSxcbiAgeyBuYW1lOiAnQmlsbGluZ3MnIH0sXG4gIHsgbmFtZTogJ0JpbG94aScgfSxcbiAgeyBuYW1lOiAnQmluZ2hhbXRvbicgfSxcbiAgeyBuYW1lOiAnQmlybWluZ2hhbScgfSxcbiAgeyBuYW1lOiAnQmlzbWFyY2snIH0sXG4gIHsgbmFtZTogJ0JsYWNrc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0JsYWluZScgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmx1ZSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdCb2NhIFJhdG9uJyB9LFxuICB7IG5hbWU6ICdCb2lzZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdCb2xpbmdicm9vaycgfSxcbiAgeyBuYW1lOiAnQm9uaXRhIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0Jvc3NpZXIgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQm9zdG9uJyB9LFxuICB7IG5hbWU6ICdCb3VsZGVyJyB9LFxuICB7IG5hbWU6ICdCb3VudGlmdWwnIH0sXG4gIHsgbmFtZTogJ0Jvd2llJyB9LFxuICB7IG5hbWU6ICdCb3dsaW5nIEdyZWVuJyB9LFxuICB7IG5hbWU6ICdCb3ludG9uIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdCb3plbWFuJyB9LFxuICB7IG5hbWU6ICdCcmFkZW50b24nIH0sXG4gIHsgbmFtZTogJ0JyZWEnIH0sXG4gIHsgbmFtZTogJ0JyZW1lcnRvbicgfSxcbiAgeyBuYW1lOiAnQnJlbnR3b29kJyB9LFxuICB7IG5hbWU6ICdCcmVudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0JyaWRnZXBvcnQnIH0sXG4gIHsgbmFtZTogJ0JyaXN0b2wnIH0sXG4gIHsgbmFtZTogJ0Jyb2NrdG9uJyB9LFxuICB7IG5hbWU6ICdCcm9rZW4gQXJyb3cnIH0sXG4gIHsgbmFtZTogJ0Jyb29rZmllbGQnIH0sXG4gIHsgbmFtZTogJ0Jyb29raGF2ZW4nIH0sXG4gIHsgbmFtZTogJ0Jyb29rbHluIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0Jyb29tZmllbGQnIH0sXG4gIHsgbmFtZTogJ0Jyb3duc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdCcnlhbicgfSxcbiAgeyBuYW1lOiAnQnVja2V5ZScgfSxcbiAgeyBuYW1lOiAnQnVlbmEgUGFyaycgfSxcbiAgeyBuYW1lOiAnQnVmZmFsbycgfSxcbiAgeyBuYW1lOiAnQnVmZmFsbyBHcm92ZScgfSxcbiAgeyBuYW1lOiAnQnVsbGhlYWQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQnVyYmFuaycgfSxcbiAgeyBuYW1lOiAnQnVyaWVuJyB9LFxuICB7IG5hbWU6ICdCdXJsZXNvbicgfSxcbiAgeyBuYW1lOiAnQnVybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQnVybGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQnVybnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2FsZHdlbGwnIH0sXG4gIHsgbmFtZTogJ0NhbGV4aWNvJyB9LFxuICB7IG5hbWU6ICdDYWx1bWV0IENpdHknIH0sXG4gIHsgbmFtZTogJ0NhbWFyaWxsbycgfSxcbiAgeyBuYW1lOiAnQ2FtYnJpZGdlJyB9LFxuICB7IG5hbWU6ICdDYW1kZW4nIH0sXG4gIHsgbmFtZTogJ0NhbXBiZWxsJyB9LFxuICB7IG5hbWU6ICdDYW50b24nIH0sXG4gIHsgbmFtZTogJ0NhcGUgQ29yYWwnIH0sXG4gIHsgbmFtZTogJ0NhcGUgR2lyYXJkZWF1JyB9LFxuICB7IG5hbWU6ICdDYXJsc2JhZCcgfSxcbiAgeyBuYW1lOiAnQ2FybWVsJyB9LFxuICB7IG5hbWU6ICdDYXJvbCBTdHJlYW0nIH0sXG4gIHsgbmFtZTogJ0NhcnBlbnRlcnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2Fycm9sbHRvbicgfSxcbiAgeyBuYW1lOiAnQ2Fyc29uJyB9LFxuICB7IG5hbWU6ICdDYXJzb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2FyeScgfSxcbiAgeyBuYW1lOiAnQ2FzYSBHcmFuZGUnIH0sXG4gIHsgbmFtZTogJ0Nhc3BlcicgfSxcbiAgeyBuYW1lOiAnQ2FzdGxlIFJvY2snIH0sXG4gIHsgbmFtZTogJ0NhdGhlZHJhbCBDaXR5JyB9LFxuICB7IG5hbWU6ICdDZWRhciBGYWxscycgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgSGlsbCcgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgUGFyaycgfSxcbiAgeyBuYW1lOiAnQ2VkYXIgUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdDZW50ZW5uaWFsJyB9LFxuICB7IG5hbWU6ICdDZXJlcycgfSxcbiAgeyBuYW1lOiAnQ2Vycml0b3MnIH0sXG4gIHsgbmFtZTogJ0NoYW1wYWlnbicgfSxcbiAgeyBuYW1lOiAnQ2hhbmRsZXInIH0sXG4gIHsgbmFtZTogJ0NoYXBlbCBIaWxsJyB9LFxuICB7IG5hbWU6ICdDaGFybGVzdG9uJyB9LFxuICB7IG5hbWU6ICdDaGFybGVzdG9uJyB9LFxuICB7IG5hbWU6ICdDaGFybG90dGUnIH0sXG4gIHsgbmFtZTogJ0NoYXJsb3R0ZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2hhdHRhbm9vZ2EnIH0sXG4gIHsgbmFtZTogJ0NoZWxzZWEnIH0sXG4gIHsgbmFtZTogJ0NoZXNhcGVha2UnIH0sXG4gIHsgbmFtZTogJ0NoZXN0ZXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQ2hleWVubmUnIH0sXG4gIHsgbmFtZTogJ0NoaWNhZ28nIH0sXG4gIHsgbmFtZTogJ0NoaWNvJyB9LFxuICB7IG5hbWU6ICdDaGljb3BlZScgfSxcbiAgeyBuYW1lOiAnQ2hpbm8nIH0sXG4gIHsgbmFtZTogJ0NoaW5vIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdDaHVsYSBWaXN0YScgfSxcbiAgeyBuYW1lOiAnQ2ljZXJvJyB9LFxuICB7IG5hbWU6ICdDaW5jaW5uYXRpJyB9LFxuICB7IG5hbWU6ICdDaXRydXMgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQ2xhcmtzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0NsZWFyd2F0ZXInIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCcgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQ2xpZnRvbicgfSxcbiAgeyBuYW1lOiAnQ2xvdmlzJyB9LFxuICB7IG5hbWU6ICdDbG92aXMnIH0sXG4gIHsgbmFtZTogJ0NvYWNoZWxsYScgfSxcbiAgeyBuYW1lOiAnQ29jb251dCBDcmVlaycgfSxcbiAgeyBuYW1lOiAnQ29ldXIgZFxcJ0FsZW5lJyB9LFxuICB7IG5hbWU6ICdDb2xsZWdlIFN0YXRpb24nIH0sXG4gIHsgbmFtZTogJ0NvbGxpZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ29sb3JhZG8gU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQ29sdG9uJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJpYScgfSxcbiAgeyBuYW1lOiAnQ29sdW1iaWEnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbW1lcmNlIENpdHknIH0sXG4gIHsgbmFtZTogJ0NvbXB0b24nIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbmNvcmQnIH0sXG4gIHsgbmFtZTogJ0NvbnJvZScgfSxcbiAgeyBuYW1lOiAnQ29ud2F5JyB9LFxuICB7IG5hbWU6ICdDb29uIFJhcGlkcycgfSxcbiAgeyBuYW1lOiAnQ29wcGVsbCcgfSxcbiAgeyBuYW1lOiAnQ29yYWwgR2FibGVzJyB9LFxuICB7IG5hbWU6ICdDb3JhbCBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdDb3JvbmEnIH0sXG4gIHsgbmFtZTogJ0NvcnB1cyBDaHJpc3RpJyB9LFxuICB7IG5hbWU6ICdDb3J2YWxsaXMnIH0sXG4gIHsgbmFtZTogJ0Nvc3RhIE1lc2EnIH0sXG4gIHsgbmFtZTogJ0NvdW5jaWwgQmx1ZmZzJyB9LFxuICB7IG5hbWU6ICdDb3ZpbmEnIH0sXG4gIHsgbmFtZTogJ0NvdmluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQ3JhbnN0b24nIH0sXG4gIHsgbmFtZTogJ0NyeXN0YWwgTGFrZScgfSxcbiAgeyBuYW1lOiAnQ3VsdmVyIENpdHknIH0sXG4gIHsgbmFtZTogJ0N1cGVydGlubycgfSxcbiAgeyBuYW1lOiAnQ3V0bGVyIEJheScgfSxcbiAgeyBuYW1lOiAnQ3V5YWhvZ2EgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0N5cHJlc3MnIH0sXG4gIHsgbmFtZTogJ0RhbGxhcycgfSxcbiAgeyBuYW1lOiAnRGFseSBDaXR5JyB9LFxuICB7IG5hbWU6ICdEYW5idXJ5JyB9LFxuICB7IG5hbWU6ICdEYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRGFudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0RhdmVucG9ydCcgfSxcbiAgeyBuYW1lOiAnRGF2aWUnIH0sXG4gIHsgbmFtZTogJ0RhdmlzJyB9LFxuICB7IG5hbWU6ICdEYXl0b24nIH0sXG4gIHsgbmFtZTogJ0RheXRvbmEgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlS2FsYicgfSxcbiAgeyBuYW1lOiAnRGVTb3RvJyB9LFxuICB7IG5hbWU6ICdEZWFyYm9ybicgfSxcbiAgeyBuYW1lOiAnRGVhcmJvcm4gSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnRGVjYXR1cicgfSxcbiAgeyBuYW1lOiAnRGVjYXR1cicgfSxcbiAgeyBuYW1lOiAnRGVlcmZpZWxkIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZWxhbm8nIH0sXG4gIHsgbmFtZTogJ0RlbHJheSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVsdG9uYScgfSxcbiAgeyBuYW1lOiAnRGVudG9uJyB9LFxuICB7IG5hbWU6ICdEZW52ZXInIH0sXG4gIHsgbmFtZTogJ0RlcyBNb2luZXMnIH0sXG4gIHsgbmFtZTogJ0RlcyBQbGFpbmVzJyB9LFxuICB7IG5hbWU6ICdEZXRyb2l0JyB9LFxuICB7IG5hbWU6ICdEaWFtb25kIEJhcicgfSxcbiAgeyBuYW1lOiAnRG9yYWwnIH0sXG4gIHsgbmFtZTogJ0RvdGhhbicgfSxcbiAgeyBuYW1lOiAnRG92ZXInIH0sXG4gIHsgbmFtZTogJ0Rvd25lcnMgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0Rvd25leScgfSxcbiAgeyBuYW1lOiAnRHJhcGVyJyB9LFxuICB7IG5hbWU6ICdEdWJsaW4nIH0sXG4gIHsgbmFtZTogJ0R1YmxpbicgfSxcbiAgeyBuYW1lOiAnRHVidXF1ZScgfSxcbiAgeyBuYW1lOiAnRHVsdXRoJyB9LFxuICB7IG5hbWU6ICdEdW5jYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRHVud29vZHknIH0sXG4gIHsgbmFtZTogJ0R1cmhhbScgfSxcbiAgeyBuYW1lOiAnRWFnYW4nIH0sXG4gIHsgbmFtZTogJ0Vhc3QgTGFuc2luZycgfSxcbiAgeyBuYW1lOiAnRWFzdCBPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ0Vhc3QgUHJvdmlkZW5jZScgfSxcbiAgeyBuYW1lOiAnRWFzdHZhbGUnIH0sXG4gIHsgbmFtZTogJ0VhdSBDbGFpcmUnIH0sXG4gIHsgbmFtZTogJ0VkZW4gUHJhaXJpZScgfSxcbiAgeyBuYW1lOiAnRWRpbmEnIH0sXG4gIHsgbmFtZTogJ0VkaW5idXJnJyB9LFxuICB7IG5hbWU6ICdFZG1vbmQnIH0sXG4gIHsgbmFtZTogJ0VkbW9uZHMnIH0sXG4gIHsgbmFtZTogJ0VsIENham9uJyB9LFxuICB7IG5hbWU6ICdFbCBDZW50cm8nIH0sXG4gIHsgbmFtZTogJ0VsIE1vbnRlJyB9LFxuICB7IG5hbWU6ICdFbCBQYXNvJyB9LFxuICB7IG5hbWU6ICdFbGdpbicgfSxcbiAgeyBuYW1lOiAnRWxpemFiZXRoJyB9LFxuICB7IG5hbWU6ICdFbGsgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0Vsa2hhcnQnIH0sXG4gIHsgbmFtZTogJ0VsbWh1cnN0JyB9LFxuICB7IG5hbWU6ICdFbHlyaWEnIH0sXG4gIHsgbmFtZTogJ0VuY2luaXRhcycgfSxcbiAgeyBuYW1lOiAnRW5pZCcgfSxcbiAgeyBuYW1lOiAnRXJpZScgfSxcbiAgeyBuYW1lOiAnRXNjb25kaWRvJyB9LFxuICB7IG5hbWU6ICdFdWNsaWQnIH0sXG4gIHsgbmFtZTogJ0V1Z2VuZScgfSxcbiAgeyBuYW1lOiAnRXVsZXNzJyB9LFxuICB7IG5hbWU6ICdFdmFuc3RvbicgfSxcbiAgeyBuYW1lOiAnRXZhbnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnRXZlcmV0dCcgfSxcbiAgeyBuYW1lOiAnRXZlcmV0dCcgfSxcbiAgeyBuYW1lOiAnRmFpcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdGYWlyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0ZhbGwgUml2ZXInIH0sXG4gIHsgbmFtZTogJ0ZhcmdvJyB9LFxuICB7IG5hbWU6ICdGYXJtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdGYXJtaW5ndG9uIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdGYXlldHRldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0ZheWV0dGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnRmVkZXJhbCBXYXknIH0sXG4gIHsgbmFtZTogJ0ZpbmRsYXknIH0sXG4gIHsgbmFtZTogJ0Zpc2hlcnMnIH0sXG4gIHsgbmFtZTogJ0ZpdGNoYnVyZycgfSxcbiAgeyBuYW1lOiAnRmxhZ3N0YWZmJyB9LFxuICB7IG5hbWU6ICdGbGludCcgfSxcbiAgeyBuYW1lOiAnRmxvcmVuY2UnIH0sXG4gIHsgbmFtZTogJ0Zsb3JlbmNlJyB9LFxuICB7IG5hbWU6ICdGbG9yaXNzYW50JyB9LFxuICB7IG5hbWU6ICdGbG93ZXIgTW91bmQnIH0sXG4gIHsgbmFtZTogJ0ZvbHNvbScgfSxcbiAgeyBuYW1lOiAnRm9uZCBkdSBMYWMnIH0sXG4gIHsgbmFtZTogJ0ZvbnRhbmEnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgQ29sbGlucycgfSxcbiAgeyBuYW1lOiAnRm9ydCBMYXVkZXJkYWxlJyB9LFxuICB7IG5hbWU6ICdGb3J0IE15ZXJzJyB9LFxuICB7IG5hbWU6ICdGb3J0IFBpZXJjZScgfSxcbiAgeyBuYW1lOiAnRm9ydCBTbWl0aCcgfSxcbiAgeyBuYW1lOiAnRm9ydCBXYXluZScgfSxcbiAgeyBuYW1lOiAnRm9ydCBXb3J0aCcgfSxcbiAgeyBuYW1lOiAnRm91bnRhaW4gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdGcmFua2xpbicgfSxcbiAgeyBuYW1lOiAnRnJlZGVyaWNrJyB9LFxuICB7IG5hbWU6ICdGcmVlcG9ydCcgfSxcbiAgeyBuYW1lOiAnRnJlbW9udCcgfSxcbiAgeyBuYW1lOiAnRnJlc25vJyB9LFxuICB7IG5hbWU6ICdGcmllbmRzd29vZCcgfSxcbiAgeyBuYW1lOiAnRnJpc2NvJyB9LFxuICB7IG5hbWU6ICdGdWxsZXJ0b24nIH0sXG4gIHsgbmFtZTogJ0dhaW5lc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdHYWl0aGVyc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0dhbHZlc3RvbicgfSxcbiAgeyBuYW1lOiAnR2FyZGVuIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdHYXJkZW5hJyB9LFxuICB7IG5hbWU6ICdHYXJsYW5kJyB9LFxuICB7IG5hbWU6ICdHYXJ5JyB9LFxuICB7IG5hbWU6ICdHYXN0b25pYScgfSxcbiAgeyBuYW1lOiAnR2VvcmdldG93bicgfSxcbiAgeyBuYW1lOiAnR2VybWFudG93bicgfSxcbiAgeyBuYW1lOiAnR2lsYmVydCcgfSxcbiAgeyBuYW1lOiAnR2lscm95JyB9LFxuICB7IG5hbWU6ICdHbGVuZGFsZScgfSxcbiAgeyBuYW1lOiAnR2xlbmRhbGUnIH0sXG4gIHsgbmFtZTogJ0dsZW5kb3JhJyB9LFxuICB7IG5hbWU6ICdHbGVudmlldycgfSxcbiAgeyBuYW1lOiAnR29vZHllYXInIH0sXG4gIHsgbmFtZTogJ0dvb3NlIENyZWVrJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBGb3JrcycgfSxcbiAgeyBuYW1lOiAnR3JhbmQgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBKdW5jdGlvbicgfSxcbiAgeyBuYW1lOiAnR3JhbmQgUHJhaXJpZScgfSxcbiAgeyBuYW1lOiAnR3JhbmQgUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdHcmFwZXZpbmUnIH0sXG4gIHsgbmFtZTogJ0dyZWF0IEZhbGxzJyB9LFxuICB7IG5hbWU6ICdHcmVlbGV5JyB9LFxuICB7IG5hbWU6ICdHcmVlbiBCYXknIH0sXG4gIHsgbmFtZTogJ0dyZWVuYWNyZXMnIH0sXG4gIHsgbmFtZTogJ0dyZWVuZmllbGQnIH0sXG4gIHsgbmFtZTogJ0dyZWVuc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ0dyZWVudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dyZWVudmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dyZWVud29vZCcgfSxcbiAgeyBuYW1lOiAnR3Jlc2hhbScgfSxcbiAgeyBuYW1lOiAnR3JvdmUgQ2l0eScgfSxcbiAgeyBuYW1lOiAnR3VsZnBvcnQnIH0sXG4gIHsgbmFtZTogJ0hhY2tlbnNhY2snIH0sXG4gIHsgbmFtZTogJ0hhZ2Vyc3Rvd24nIH0sXG4gIHsgbmFtZTogJ0hhbGxhbmRhbGUgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0hhbHRvbSBDaXR5JyB9LFxuICB7IG5hbWU6ICdIYW1pbHRvbicgfSxcbiAgeyBuYW1lOiAnSGFtbW9uZCcgfSxcbiAgeyBuYW1lOiAnSGFtcHRvbicgfSxcbiAgeyBuYW1lOiAnSGFuZm9yZCcgfSxcbiAgeyBuYW1lOiAnSGFub3ZlciBQYXJrJyB9LFxuICB7IG5hbWU6ICdIYXJsaW5nZW4nIH0sXG4gIHsgbmFtZTogJ0hhcnJpc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0hhcnJpc29uYnVyZycgfSxcbiAgeyBuYW1lOiAnSGFydGZvcmQnIH0sXG4gIHsgbmFtZTogJ0hhdHRpZXNidXJnJyB9LFxuICB7IG5hbWU6ICdIYXZlcmhpbGwnIH0sXG4gIHsgbmFtZTogJ0hhd3Rob3JuZScgfSxcbiAgeyBuYW1lOiAnSGF5d2FyZCcgfSxcbiAgeyBuYW1lOiAnSGVtZXQnIH0sXG4gIHsgbmFtZTogJ0hlbXBzdGVhZCcgfSxcbiAgeyBuYW1lOiAnSGVuZGVyc29uJyB9LFxuICB7IG5hbWU6ICdIZW5kZXJzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSGVzcGVyaWEnIH0sXG4gIHsgbmFtZTogJ0hpYWxlYWgnIH0sXG4gIHsgbmFtZTogJ0hpY2tvcnknIH0sXG4gIHsgbmFtZTogJ0hpZ2ggUG9pbnQnIH0sXG4gIHsgbmFtZTogJ0hpZ2hsYW5kJyB9LFxuICB7IG5hbWU6ICdIaWxsc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ0hpbHRvbiBIZWFkIElzbGFuZCcgfSxcbiAgeyBuYW1lOiAnSG9ib2tlbicgfSxcbiAgeyBuYW1lOiAnSG9mZm1hbiBFc3RhdGVzJyB9LFxuICB7IG5hbWU6ICdIb2xseXdvb2QnIH0sXG4gIHsgbmFtZTogJ0hvbHlva2UnIH0sXG4gIHsgbmFtZTogJ0hvbWVzdGVhZCcgfSxcbiAgeyBuYW1lOiAnSG9ub2x1bHUnIH0sXG4gIHsgbmFtZTogJ0hvb3ZlcicgfSxcbiAgeyBuYW1lOiAnSG91c3RvbicgfSxcbiAgeyBuYW1lOiAnSHViZXIgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnSHVudGVyc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdIdW50aW5ndG9uIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0h1bnRzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1bnRzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1cnN0JyB9LFxuICB7IG5hbWU6ICdIdXRjaGluc29uJyB9LFxuICB7IG5hbWU6ICdJZGFobyBGYWxscycgfSxcbiAgeyBuYW1lOiAnSW5kZXBlbmRlbmNlJyB9LFxuICB7IG5hbWU6ICdJbmRpYW5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0luZGlvJyB9LFxuICB7IG5hbWU6ICdJbmdsZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0lvd2EgQ2l0eScgfSxcbiAgeyBuYW1lOiAnSXJ2aW5lJyB9LFxuICB7IG5hbWU6ICdJcnZpbmcnIH0sXG4gIHsgbmFtZTogJ0phY2tzb24nIH0sXG4gIHsgbmFtZTogJ0phY2tzb24nIH0sXG4gIHsgbmFtZTogJ0phY2tzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmFja3NvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKYW5lc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdKZWZmZXJzb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnSmVmZmVyc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0plcnNleSBDaXR5JyB9LFxuICB7IG5hbWU6ICdKb2hucyBDcmVlaycgfSxcbiAgeyBuYW1lOiAnSm9obnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdKb2xpZXQnIH0sXG4gIHsgbmFtZTogJ0pvbmVzYm9ybycgfSxcbiAgeyBuYW1lOiAnSm9wbGluJyB9LFxuICB7IG5hbWU6ICdKdXBpdGVyJyB9LFxuICB7IG5hbWU6ICdKdXJ1cGEgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdLYWxhbWF6b28nIH0sXG4gIHsgbmFtZTogJ0thbm5hcG9saXMnIH0sXG4gIHsgbmFtZTogJ0thbnNhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdLYW5zYXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnS2Vhcm55JyB9LFxuICB7IG5hbWU6ICdLZWl6ZXInIH0sXG4gIHsgbmFtZTogJ0tlbGxlcicgfSxcbiAgeyBuYW1lOiAnS2VubmVyJyB9LFxuICB7IG5hbWU6ICdLZW5uZXdpY2snIH0sXG4gIHsgbmFtZTogJ0tlbm9zaGEnIH0sXG4gIHsgbmFtZTogJ0tlbnQnIH0sXG4gIHsgbmFtZTogJ0tlbnR3b29kJyB9LFxuICB7IG5hbWU6ICdLZXR0ZXJpbmcnIH0sXG4gIHsgbmFtZTogJ0tpbGxlZW4nIH0sXG4gIHsgbmFtZTogJ0tpbmdzcG9ydCcgfSxcbiAgeyBuYW1lOiAnS2lya2xhbmQnIH0sXG4gIHsgbmFtZTogJ0tpc3NpbW1lZScgfSxcbiAgeyBuYW1lOiAnS25veHZpbGxlJyB9LFxuICB7IG5hbWU6ICdLb2tvbW8nIH0sXG4gIHsgbmFtZTogJ0xhIENyb3NzZScgfSxcbiAgeyBuYW1lOiAnTGEgSGFicmEnIH0sXG4gIHsgbmFtZTogJ0xhIE1lc2EnIH0sXG4gIHsgbmFtZTogJ0xhIE1pcmFkYScgfSxcbiAgeyBuYW1lOiAnTGEgUHVlbnRlJyB9LFxuICB7IG5hbWU6ICdMYSBRdWludGEnIH0sXG4gIHsgbmFtZTogJ0xhY2V5JyB9LFxuICB7IG5hbWU6ICdMYWZheWV0dGUnIH0sXG4gIHsgbmFtZTogJ0xhZmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGFndW5hIE5pZ3VlbCcgfSxcbiAgeyBuYW1lOiAnTGFrZSBDaGFybGVzJyB9LFxuICB7IG5hbWU6ICdMYWtlIEVsc2lub3JlJyB9LFxuICB7IG5hbWU6ICdMYWtlIEZvcmVzdCcgfSxcbiAgeyBuYW1lOiAnTGFrZSBIYXZhc3UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTGFrZSBPc3dlZ28nIH0sXG4gIHsgbmFtZTogJ0xha2VsYW5kJyB9LFxuICB7IG5hbWU6ICdMYWtldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbnNpbmcnIH0sXG4gIHsgbmFtZTogJ0xhcmVkbycgfSxcbiAgeyBuYW1lOiAnTGFyZ28nIH0sXG4gIHsgbmFtZTogJ0xhcyBDcnVjZXMnIH0sXG4gIHsgbmFtZTogJ0xhcyBWZWdhcycgfSxcbiAgeyBuYW1lOiAnTGF1ZGVyaGlsbCcgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3dG9uJyB9LFxuICB7IG5hbWU6ICdMYXl0b24nIH0sXG4gIHsgbmFtZTogJ0xlYWd1ZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdMZWVcXCdzIFN1bW1pdCcgfSxcbiAgeyBuYW1lOiAnTGVlc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0xlaGknIH0sXG4gIHsgbmFtZTogJ0xlbmV4YScgfSxcbiAgeyBuYW1lOiAnTGVvbWluc3RlcicgfSxcbiAgeyBuYW1lOiAnTGV3aXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTGV4aW5ndG9uLUZheWV0dGUnIH0sXG4gIHsgbmFtZTogJ0xpbWEnIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4nIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4nIH0sXG4gIHsgbmFtZTogJ0xpbmNvbG4gUGFyaycgfSxcbiAgeyBuYW1lOiAnTGluZGVuJyB9LFxuICB7IG5hbWU6ICdMaXR0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnTGl0dGxldG9uJyB9LFxuICB7IG5hbWU6ICdMaXZlcm1vcmUnIH0sXG4gIHsgbmFtZTogJ0xpdm9uaWEnIH0sXG4gIHsgbmFtZTogJ0xvZGknIH0sXG4gIHsgbmFtZTogJ0xvZ2FuJyB9LFxuICB7IG5hbWU6ICdMb21iYXJkJyB9LFxuICB7IG5hbWU6ICdMb21wb2MnIH0sXG4gIHsgbmFtZTogJ0xvbmcgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0xvbmdtb250JyB9LFxuICB7IG5hbWU6ICdMb25ndmlldycgfSxcbiAgeyBuYW1lOiAnTG9yYWluJyB9LFxuICB7IG5hbWU6ICdMb3MgQW5nZWxlcycgfSxcbiAgeyBuYW1lOiAnTG91aXN2aWxsZS9KZWZmZXJzb24gQ291bnR5JyB9LFxuICB7IG5hbWU6ICdMb3ZlbGFuZCcgfSxcbiAgeyBuYW1lOiAnTG93ZWxsJyB9LFxuICB7IG5hbWU6ICdMdWJib2NrJyB9LFxuICB7IG5hbWU6ICdMeW5jaGJ1cmcnIH0sXG4gIHsgbmFtZTogJ0x5bm4nIH0sXG4gIHsgbmFtZTogJ0x5bndvb2QnIH0sXG4gIHsgbmFtZTogJ01hY29uJyB9LFxuICB7IG5hbWU6ICdNYWRlcmEnIH0sXG4gIHsgbmFtZTogJ01hZGlzb24nIH0sXG4gIHsgbmFtZTogJ01hZGlzb24nIH0sXG4gIHsgbmFtZTogJ01hbGRlbicgfSxcbiAgeyBuYW1lOiAnTWFuYXNzYXMnIH0sXG4gIHsgbmFtZTogJ01hbmNoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ01hbmhhdHRhbicgfSxcbiAgeyBuYW1lOiAnTWFua2F0bycgfSxcbiAgeyBuYW1lOiAnTWFuc2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdNYW5zZmllbGQnIH0sXG4gIHsgbmFtZTogJ01hbnRlY2EnIH0sXG4gIHsgbmFtZTogJ01hcGxlIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdNYXBsZXdvb2QnIH0sXG4gIHsgbmFtZTogJ01hcmFuYScgfSxcbiAgeyBuYW1lOiAnTWFyZ2F0ZScgfSxcbiAgeyBuYW1lOiAnTWFyaWNvcGEnIH0sXG4gIHsgbmFtZTogJ01hcmlldHRhJyB9LFxuICB7IG5hbWU6ICdNYXJsYm9yb3VnaCcgfSxcbiAgeyBuYW1lOiAnTWFydGluZXonIH0sXG4gIHsgbmFtZTogJ01hcnlzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ01jQWxsZW4nIH0sXG4gIHsgbmFtZTogJ01jS2lubmV5JyB9LFxuICB7IG5hbWU6ICdNZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdNZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdNZWxib3VybmUnIH0sXG4gIHsgbmFtZTogJ01lbXBoaXMnIH0sXG4gIHsgbmFtZTogJ01lbmlmZWUnIH0sXG4gIHsgbmFtZTogJ01lbnRvcicgfSxcbiAgeyBuYW1lOiAnTWVyY2VkJyB9LFxuICB7IG5hbWU6ICdNZXJpZGVuJyB9LFxuICB7IG5hbWU6ICdNZXJpZGlhbicgfSxcbiAgeyBuYW1lOiAnTWVyaWRpYW4nIH0sXG4gIHsgbmFtZTogJ01lc2EnIH0sXG4gIHsgbmFtZTogJ01lc3F1aXRlJyB9LFxuICB7IG5hbWU6ICdNZXRodWVuJyB9LFxuICB7IG5hbWU6ICdNaWFtaScgfSxcbiAgeyBuYW1lOiAnTWlhbWkgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ01pYW1pIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ01pZGRsZXRvd24nIH0sXG4gIHsgbmFtZTogJ01pZGRsZXRvd24nIH0sXG4gIHsgbmFtZTogJ01pZGxhbmQnIH0sXG4gIHsgbmFtZTogJ01pZGxhbmQnIH0sXG4gIHsgbmFtZTogJ01pZHdlc3QgQ2l0eScgfSxcbiAgeyBuYW1lOiAnTWlsZm9yZCcgfSxcbiAgeyBuYW1lOiAnTWlscGl0YXMnIH0sXG4gIHsgbmFtZTogJ01pbHdhdWtlZScgfSxcbiAgeyBuYW1lOiAnTWlubmVhcG9saXMnIH0sXG4gIHsgbmFtZTogJ01pbm5ldG9ua2EnIH0sXG4gIHsgbmFtZTogJ01pbm90JyB9LFxuICB7IG5hbWU6ICdNaXJhbWFyJyB9LFxuICB7IG5hbWU6ICdNaXNoYXdha2EnIH0sXG4gIHsgbmFtZTogJ01pc3Npb24nIH0sXG4gIHsgbmFtZTogJ01pc3Npb24gVmllam8nIH0sXG4gIHsgbmFtZTogJ01pc3NvdWxhJyB9LFxuICB7IG5hbWU6ICdNaXNzb3VyaSBDaXR5JyB9LFxuICB7IG5hbWU6ICdNb2JpbGUnIH0sXG4gIHsgbmFtZTogJ01vZGVzdG8nIH0sXG4gIHsgbmFtZTogJ01vbGluZScgfSxcbiAgeyBuYW1lOiAnTW9ucm9lJyB9LFxuICB7IG5hbWU6ICdNb25yb3ZpYScgfSxcbiAgeyBuYW1lOiAnTW9udGNsYWlyJyB9LFxuICB7IG5hbWU6ICdNb250ZWJlbGxvJyB9LFxuICB7IG5hbWU6ICdNb250ZXJleSBQYXJrJyB9LFxuICB7IG5hbWU6ICdNb250Z29tZXJ5JyB9LFxuICB7IG5hbWU6ICdNb29yZScgfSxcbiAgeyBuYW1lOiAnTW9vcmhlYWQnIH0sXG4gIHsgbmFtZTogJ01vcmVubyBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ01vcmdhbiBIaWxsJyB9LFxuICB7IG5hbWU6ICdNb3VudCBQbGVhc2FudCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgUHJvc3BlY3QnIH0sXG4gIHsgbmFtZTogJ01vdW50IFZlcm5vbicgfSxcbiAgeyBuYW1lOiAnTW91bnRhaW4gVmlldycgfSxcbiAgeyBuYW1lOiAnTXVuY2llJyB9LFxuICB7IG5hbWU6ICdNdXJmcmVlc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ011cnJheScgfSxcbiAgeyBuYW1lOiAnTXVycmlldGEnIH0sXG4gIHsgbmFtZTogJ011c2tlZ29uJyB9LFxuICB7IG5hbWU6ICdNdXNrb2dlZScgfSxcbiAgeyBuYW1lOiAnTmFtcGEnIH0sXG4gIHsgbmFtZTogJ05hcGEnIH0sXG4gIHsgbmFtZTogJ05hcGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ05hc2h1YScgfSxcbiAgeyBuYW1lOiAnTmFzaHZpbGxlLURhdmlkc29uJyB9LFxuICB7IG5hbWU6ICdOYXRpb25hbCBDaXR5JyB9LFxuICB7IG5hbWU6ICdOZXcgQmVkZm9yZCcgfSxcbiAgeyBuYW1lOiAnTmV3IEJlcmxpbicgfSxcbiAgeyBuYW1lOiAnTmV3IEJyYXVuZmVscycgfSxcbiAgeyBuYW1lOiAnTmV3IEJyaXRhaW4nIH0sXG4gIHsgbmFtZTogJ05ldyBCcnVuc3dpY2snIH0sXG4gIHsgbmFtZTogJ05ldyBIYXZlbicgfSxcbiAgeyBuYW1lOiAnTmV3IE9ybGVhbnMnIH0sXG4gIHsgbmFtZTogJ05ldyBSb2NoZWxsZScgfSxcbiAgeyBuYW1lOiAnTmV3IFlvcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld3BvcnQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ05ld3BvcnQgTmV3cycgfSxcbiAgeyBuYW1lOiAnTmV3dG9uJyB9LFxuICB7IG5hbWU6ICdOaWFnYXJhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdOb2JsZXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTm9yZm9saycgfSxcbiAgeyBuYW1lOiAnTm9ybWFsJyB9LFxuICB7IG5hbWU6ICdOb3JtYW4nIH0sXG4gIHsgbmFtZTogJ05vcnRoIENoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ05vcnRoIExhcyBWZWdhcycgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGF1ZGVyZGFsZScgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGl0dGxlIFJvY2snIH0sXG4gIHsgbmFtZTogJ05vcnRoIE1pYW1pJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBNaWFtaSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTm9ydGggUG9ydCcgfSxcbiAgeyBuYW1lOiAnTm9ydGggUmljaGxhbmQgSGlsbHMnIH0sXG4gIHsgbmFtZTogJ05vcnRoZ2xlbm4nIH0sXG4gIHsgbmFtZTogJ05vcndhbGsnIH0sXG4gIHsgbmFtZTogJ05vcndhbGsnIH0sXG4gIHsgbmFtZTogJ05vcndpY2gnIH0sXG4gIHsgbmFtZTogJ05vdmF0bycgfSxcbiAgeyBuYW1lOiAnTm92aScgfSxcbiAgeyBuYW1lOiAnT1xcJ0ZhbGxvbicgfSxcbiAgeyBuYW1lOiAnT2FrIExhd24nIH0sXG4gIHsgbmFtZTogJ09hayBQYXJrJyB9LFxuICB7IG5hbWU6ICdPYWtsYW5kJyB9LFxuICB7IG5hbWU6ICdPYWtsYW5kIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ha2xleScgfSxcbiAgeyBuYW1lOiAnT2NhbGEnIH0sXG4gIHsgbmFtZTogJ09jZWFuc2lkZScgfSxcbiAgeyBuYW1lOiAnT2NvZWUnIH0sXG4gIHsgbmFtZTogJ09kZXNzYScgfSxcbiAgeyBuYW1lOiAnT2dkZW4nIH0sXG4gIHsgbmFtZTogJ09rbGFob21hIENpdHknIH0sXG4gIHsgbmFtZTogJ09sYXRoZScgfSxcbiAgeyBuYW1lOiAnT2x5bXBpYScgfSxcbiAgeyBuYW1lOiAnT21haGEnIH0sXG4gIHsgbmFtZTogJ09udGFyaW8nIH0sXG4gIHsgbmFtZTogJ09yYW5nZScgfSxcbiAgeyBuYW1lOiAnT3JlbScgfSxcbiAgeyBuYW1lOiAnT3JsYW5kIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ybGFuZG8nIH0sXG4gIHsgbmFtZTogJ09ybW9uZCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnT3JvIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnT3Noa29zaCcgfSxcbiAgeyBuYW1lOiAnT3ZlcmxhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT3dlbnNib3JvJyB9LFxuICB7IG5hbWU6ICdPeG5hcmQnIH0sXG4gIHsgbmFtZTogJ1BhY2lmaWNhJyB9LFxuICB7IG5hbWU6ICdQYWxhdGluZScgfSxcbiAgeyBuYW1lOiAnUGFsbSBCYXknIH0sXG4gIHsgbmFtZTogJ1BhbG0gQmVhY2ggR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnUGFsbSBDb2FzdCcgfSxcbiAgeyBuYW1lOiAnUGFsbSBEZXNlcnQnIH0sXG4gIHsgbmFtZTogJ1BhbG0gU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnUGFsbWRhbGUnIH0sXG4gIHsgbmFtZTogJ1BhbG8gQWx0bycgfSxcbiAgeyBuYW1lOiAnUGFuYW1hIENpdHknIH0sXG4gIHsgbmFtZTogJ1BhcmFtb3VudCcgfSxcbiAgeyBuYW1lOiAnUGFyayBSaWRnZScgfSxcbiAgeyBuYW1lOiAnUGFya2VyJyB9LFxuICB7IG5hbWU6ICdQYXJtYScgfSxcbiAgeyBuYW1lOiAnUGFzYWRlbmEnIH0sXG4gIHsgbmFtZTogJ1Bhc2FkZW5hJyB9LFxuICB7IG5hbWU6ICdQYXNjbycgfSxcbiAgeyBuYW1lOiAnUGFzc2FpYycgfSxcbiAgeyBuYW1lOiAnUGF0ZXJzb24nIH0sXG4gIHsgbmFtZTogJ1Bhd3R1Y2tldCcgfSxcbiAgeyBuYW1lOiAnUGVhYm9keScgfSxcbiAgeyBuYW1lOiAnUGVhY2h0cmVlIENvcm5lcnMnIH0sXG4gIHsgbmFtZTogJ1BlYXJsYW5kJyB9LFxuICB7IG5hbWU6ICdQZW1icm9rZSBQaW5lcycgfSxcbiAgeyBuYW1lOiAnUGVuc2Fjb2xhJyB9LFxuICB7IG5hbWU6ICdQZW9yaWEnIH0sXG4gIHsgbmFtZTogJ1Blb3JpYScgfSxcbiAgeyBuYW1lOiAnUGVycmlzJyB9LFxuICB7IG5hbWU6ICdQZXJ0aCBBbWJveScgfSxcbiAgeyBuYW1lOiAnUGV0YWx1bWEnIH0sXG4gIHsgbmFtZTogJ1BmbHVnZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnUGhhcnInIH0sXG4gIHsgbmFtZTogJ1BoZW5peCBDaXR5JyB9LFxuICB7IG5hbWU6ICdQaGlsYWRlbHBoaWEnIH0sXG4gIHsgbmFtZTogJ1Bob2VuaXgnIH0sXG4gIHsgbmFtZTogJ1BpY28gUml2ZXJhJyB9LFxuICB7IG5hbWU6ICdQaW5lIEJsdWZmJyB9LFxuICB7IG5hbWU6ICdQaW5lbGxhcyBQYXJrJyB9LFxuICB7IG5hbWU6ICdQaXR0c2J1cmcnIH0sXG4gIHsgbmFtZTogJ1BpdHRzYnVyZ2gnIH0sXG4gIHsgbmFtZTogJ1BpdHRzZmllbGQnIH0sXG4gIHsgbmFtZTogJ1BsYWNlbnRpYScgfSxcbiAgeyBuYW1lOiAnUGxhaW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhaW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhbm8nIH0sXG4gIHsgbmFtZTogJ1BsYW50YXRpb24nIH0sXG4gIHsgbmFtZTogJ1BsZWFzYW50b24nIH0sXG4gIHsgbmFtZTogJ1BseW1vdXRoJyB9LFxuICB7IG5hbWU6ICdQb2NhdGVsbG8nIH0sXG4gIHsgbmFtZTogJ1BvbW9uYScgfSxcbiAgeyBuYW1lOiAnUG9tcGFubyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnUG9udGlhYycgfSxcbiAgeyBuYW1lOiAnUG9ydCBBcnRodXInIH0sXG4gIHsgbmFtZTogJ1BvcnQgT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdQb3J0IFN0LiBMdWNpZScgfSxcbiAgeyBuYW1lOiAnUG9ydGFnZScgfSxcbiAgeyBuYW1lOiAnUG9ydGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1BvcnRsYW5kJyB9LFxuICB7IG5hbWU6ICdQb3J0bGFuZCcgfSxcbiAgeyBuYW1lOiAnUG9ydHNtb3V0aCcgfSxcbiAgeyBuYW1lOiAnUG93YXknIH0sXG4gIHsgbmFtZTogJ1ByZXNjb3R0JyB9LFxuICB7IG5hbWU6ICdQcmVzY290dCBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1Byb3ZpZGVuY2UnIH0sXG4gIHsgbmFtZTogJ1Byb3ZvJyB9LFxuICB7IG5hbWU6ICdQdWVibG8nIH0sXG4gIHsgbmFtZTogJ1B1eWFsbHVwJyB9LFxuICB7IG5hbWU6ICdRdWluY3knIH0sXG4gIHsgbmFtZTogJ1F1aW5jeScgfSxcbiAgeyBuYW1lOiAnUmFjaW5lJyB9LFxuICB7IG5hbWU6ICdSYWxlaWdoJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gQ29yZG92YScgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIEN1Y2Ftb25nYScgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIFBhbG9zIFZlcmRlcycgfSxcbiAgeyBuYW1lOiAnUmFuY2hvIFNhbnRhIE1hcmdhcml0YScgfSxcbiAgeyBuYW1lOiAnUmFwaWQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUmVhZGluZycgfSxcbiAgeyBuYW1lOiAnUmVkZGluZycgfSxcbiAgeyBuYW1lOiAnUmVkbGFuZHMnIH0sXG4gIHsgbmFtZTogJ1JlZG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JlZG9uZG8gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1JlZHdvb2QgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUmVubycgfSxcbiAgeyBuYW1lOiAnUmVudG9uJyB9LFxuICB7IG5hbWU6ICdSZXZlcmUnIH0sXG4gIHsgbmFtZTogJ1JpYWx0bycgfSxcbiAgeyBuYW1lOiAnUmljaGFyZHNvbicgfSxcbiAgeyBuYW1lOiAnUmljaGxhbmQnIH0sXG4gIHsgbmFtZTogJ1JpY2htb25kJyB9LFxuICB7IG5hbWU6ICdSaWNobW9uZCcgfSxcbiAgeyBuYW1lOiAnUmlvIFJhbmNobycgfSxcbiAgeyBuYW1lOiAnUml2ZXJzaWRlJyB9LFxuICB7IG5hbWU6ICdSaXZlcnRvbicgfSxcbiAgeyBuYW1lOiAnUm9hbm9rZScgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlciBIaWxscycgfSxcbiAgeyBuYW1lOiAnUm9jayBIaWxsJyB9LFxuICB7IG5hbWU6ICdSb2NrIElzbGFuZCcgfSxcbiAgeyBuYW1lOiAnUm9ja2ZvcmQnIH0sXG4gIHsgbmFtZTogJ1JvY2tsaW4nIH0sXG4gIHsgbmFtZTogJ1JvY2t2aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9ja3dhbGwnIH0sXG4gIHsgbmFtZTogJ1JvY2t5IE1vdW50JyB9LFxuICB7IG5hbWU6ICdSb2dlcnMnIH0sXG4gIHsgbmFtZTogJ1JvaG5lcnQgUGFyaycgfSxcbiAgeyBuYW1lOiAnUm9tZW92aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9zZW1lYWQnIH0sXG4gIHsgbmFtZTogJ1Jvc2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnUm9zZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3N3ZWxsJyB9LFxuICB7IG5hbWU6ICdSb3N3ZWxsJyB9LFxuICB7IG5hbWU6ICdSb3VuZCBSb2NrJyB9LFxuICB7IG5hbWU6ICdSb3dsZXR0JyB9LFxuICB7IG5hbWU6ICdSb3knIH0sXG4gIHsgbmFtZTogJ1JveWFsIE9haycgfSxcbiAgeyBuYW1lOiAnU2FjcmFtZW50bycgfSxcbiAgeyBuYW1lOiAnU2FnaW5hdycgfSxcbiAgeyBuYW1lOiAnU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1NhbGVtJyB9LFxuICB7IG5hbWU6ICdTYWxpbmEnIH0sXG4gIHsgbmFtZTogJ1NhbGluYXMnIH0sXG4gIHsgbmFtZTogJ1NhbHQgTGFrZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdTYW1tYW1pc2gnIH0sXG4gIHsgbmFtZTogJ1NhbiBBbmdlbG8nIH0sXG4gIHsgbmFtZTogJ1NhbiBBbnRvbmlvJyB9LFxuICB7IG5hbWU6ICdTYW4gQmVybmFyZGlubycgfSxcbiAgeyBuYW1lOiAnU2FuIEJydW5vJyB9LFxuICB7IG5hbWU6ICdTYW4gQnVlbmF2ZW50dXJhIChWZW50dXJhKScgfSxcbiAgeyBuYW1lOiAnU2FuIENsZW1lbnRlJyB9LFxuICB7IG5hbWU6ICdTYW4gRGllZ28nIH0sXG4gIHsgbmFtZTogJ1NhbiBGcmFuY2lzY28nIH0sXG4gIHsgbmFtZTogJ1NhbiBHYWJyaWVsJyB9LFxuICB7IG5hbWU6ICdTYW4gSmFjaW50bycgfSxcbiAgeyBuYW1lOiAnU2FuIEpvc2UnIH0sXG4gIHsgbmFtZTogJ1NhbiBMZWFuZHJvJyB9LFxuICB7IG5hbWU6ICdTYW4gTHVpcyBPYmlzcG8nIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXJjb3MnIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXJjb3MnIH0sXG4gIHsgbmFtZTogJ1NhbiBNYXRlbycgfSxcbiAgeyBuYW1lOiAnU2FuIFJhZmFlbCcgfSxcbiAgeyBuYW1lOiAnU2FuIFJhbW9uJyB9LFxuICB7IG5hbWU6ICdTYW5keScgfSxcbiAgeyBuYW1lOiAnU2FuZHkgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnU2FuZm9yZCcgfSxcbiAgeyBuYW1lOiAnU2FudGEgQW5hJyB9LFxuICB7IG5hbWU6ICdTYW50YSBCYXJiYXJhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDbGFyYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQ2xhcml0YScgfSxcbiAgeyBuYW1lOiAnU2FudGEgQ3J1eicgfSxcbiAgeyBuYW1lOiAnU2FudGEgRmUnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIE1hcmlhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBNb25pY2EnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIFJvc2EnIH0sXG4gIHsgbmFtZTogJ1NhbnRlZScgfSxcbiAgeyBuYW1lOiAnU2FyYXNvdGEnIH0sXG4gIHsgbmFtZTogJ1NhdmFubmFoJyB9LFxuICB7IG5hbWU6ICdTYXlyZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdTY2hhdW1idXJnJyB9LFxuICB7IG5hbWU6ICdTY2hlbmVjdGFkeScgfSxcbiAgeyBuYW1lOiAnU2NvdHRzZGFsZScgfSxcbiAgeyBuYW1lOiAnU2NyYW50b24nIH0sXG4gIHsgbmFtZTogJ1NlYXR0bGUnIH0sXG4gIHsgbmFtZTogJ1NoYWtvcGVlJyB9LFxuICB7IG5hbWU6ICdTaGF3bmVlJyB9LFxuICB7IG5hbWU6ICdTaGVib3lnYW4nIH0sXG4gIHsgbmFtZTogJ1NoZWx0b24nIH0sXG4gIHsgbmFtZTogJ1NoZXJtYW4nIH0sXG4gIHsgbmFtZTogJ1Nob3JlbGluZScgfSxcbiAgeyBuYW1lOiAnU2hyZXZlcG9ydCcgfSxcbiAgeyBuYW1lOiAnU2llcnJhIFZpc3RhJyB9LFxuICB7IG5hbWU6ICdTaW1pIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnU2lvdXggQ2l0eScgfSxcbiAgeyBuYW1lOiAnU2lvdXggRmFsbHMnIH0sXG4gIHsgbmFtZTogJ1Nrb2tpZScgfSxcbiAgeyBuYW1lOiAnU215cm5hJyB9LFxuICB7IG5hbWU6ICdTbXlybmEnIH0sXG4gIHsgbmFtZTogJ1NvbWVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEJlbmQnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEdhdGUnIH0sXG4gIHsgbmFtZTogJ1NvdXRoIEpvcmRhbicgfSxcbiAgeyBuYW1lOiAnU291dGggU2FuIEZyYW5jaXNjbycgfSxcbiAgeyBuYW1lOiAnU291dGhhdmVuJyB9LFxuICB7IG5hbWU6ICdTb3V0aGZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcGFuaXNoIEZvcmsnIH0sXG4gIHsgbmFtZTogJ1NwYXJrcycgfSxcbiAgeyBuYW1lOiAnU3BhcnRhbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ1Nwb2thbmUnIH0sXG4gIHsgbmFtZTogJ1Nwb2thbmUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdTcHJpbmdkYWxlJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1N0LiBDaGFybGVzJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2xhaXIgU2hvcmVzJyB9LFxuICB7IG5hbWU6ICdTdC4gQ2xvdWQnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbG91ZCcgfSxcbiAgeyBuYW1lOiAnU3QuIEdlb3JnZScgfSxcbiAgeyBuYW1lOiAnU3QuIEpvc2VwaCcgfSxcbiAgeyBuYW1lOiAnU3QuIExvdWlzJyB9LFxuICB7IG5hbWU6ICdTdC4gTG91aXMgUGFyaycgfSxcbiAgeyBuYW1lOiAnU3QuIFBhdWwnIH0sXG4gIHsgbmFtZTogJ1N0LiBQZXRlcnMnIH0sXG4gIHsgbmFtZTogJ1N0LiBQZXRlcnNidXJnJyB9LFxuICB7IG5hbWU6ICdTdGFtZm9yZCcgfSxcbiAgeyBuYW1lOiAnU3RhbnRvbicgfSxcbiAgeyBuYW1lOiAnU3RhdGUgQ29sbGVnZScgfSxcbiAgeyBuYW1lOiAnU3RlcmxpbmcgSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnU3RpbGx3YXRlcicgfSxcbiAgeyBuYW1lOiAnU3RvY2t0b24nIH0sXG4gIHsgbmFtZTogJ1N0cmVhbXdvb2QnIH0sXG4gIHsgbmFtZTogJ1N0cm9uZ3N2aWxsZScgfSxcbiAgeyBuYW1lOiAnU3VmZm9saycgfSxcbiAgeyBuYW1lOiAnU3VnYXIgTGFuZCcgfSxcbiAgeyBuYW1lOiAnU3VtbWVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1N1bXRlcicgfSxcbiAgeyBuYW1lOiAnU3Vubnl2YWxlJyB9LFxuICB7IG5hbWU6ICdTdW5yaXNlJyB9LFxuICB7IG5hbWU6ICdTdXJwcmlzZScgfSxcbiAgeyBuYW1lOiAnU3lyYWN1c2UnIH0sXG4gIHsgbmFtZTogJ1RhY29tYScgfSxcbiAgeyBuYW1lOiAnVGFsbGFoYXNzZWUnIH0sXG4gIHsgbmFtZTogJ1RhbWFyYWMnIH0sXG4gIHsgbmFtZTogJ1RhbXBhJyB9LFxuICB7IG5hbWU6ICdUYXVudG9uJyB9LFxuICB7IG5hbWU6ICdUYXlsb3InIH0sXG4gIHsgbmFtZTogJ1RheWxvcnN2aWxsZScgfSxcbiAgeyBuYW1lOiAnVGVtZWN1bGEnIH0sXG4gIHsgbmFtZTogJ1RlbXBlJyB9LFxuICB7IG5hbWU6ICdUZW1wbGUnIH0sXG4gIHsgbmFtZTogJ1RlcnJlIEhhdXRlJyB9LFxuICB7IG5hbWU6ICdUZXhhcmthbmEnIH0sXG4gIHsgbmFtZTogJ1RleGFzIENpdHknIH0sXG4gIHsgbmFtZTogJ1RoZSBDb2xvbnknIH0sXG4gIHsgbmFtZTogJ1Rob3JudG9uJyB9LFxuICB7IG5hbWU6ICdUaG91c2FuZCBPYWtzJyB9LFxuICB7IG5hbWU6ICdUaWdhcmQnIH0sXG4gIHsgbmFtZTogJ1RpbmxleSBQYXJrJyB9LFxuICB7IG5hbWU6ICdUaXR1c3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdUb2xlZG8nIH0sXG4gIHsgbmFtZTogJ1RvcGVrYScgfSxcbiAgeyBuYW1lOiAnVG9ycmFuY2UnIH0sXG4gIHsgbmFtZTogJ1RyYWN5JyB9LFxuICB7IG5hbWU6ICdUcmVudG9uJyB9LFxuICB7IG5hbWU6ICdUcm95JyB9LFxuICB7IG5hbWU6ICdUcm95JyB9LFxuICB7IG5hbWU6ICdUdWNzb24nIH0sXG4gIHsgbmFtZTogJ1R1bGFyZScgfSxcbiAgeyBuYW1lOiAnVHVsc2EnIH0sXG4gIHsgbmFtZTogJ1R1cmxvY2snIH0sXG4gIHsgbmFtZTogJ1R1c2NhbG9vc2EnIH0sXG4gIHsgbmFtZTogJ1R1c3RpbicgfSxcbiAgeyBuYW1lOiAnVHdpbiBGYWxscycgfSxcbiAgeyBuYW1lOiAnVHlsZXInIH0sXG4gIHsgbmFtZTogJ1VuaW9uIENpdHknIH0sXG4gIHsgbmFtZTogJ1VuaW9uIENpdHknIH0sXG4gIHsgbmFtZTogJ1VwbGFuZCcgfSxcbiAgeyBuYW1lOiAnVXJiYW5hJyB9LFxuICB7IG5hbWU6ICdVcmJhbmRhbGUnIH0sXG4gIHsgbmFtZTogJ1V0aWNhJyB9LFxuICB7IG5hbWU6ICdWYWNhdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1ZhbGRvc3RhJyB9LFxuICB7IG5hbWU6ICdWYWxsZWpvJyB9LFxuICB7IG5hbWU6ICdWYWxsZXkgU3RyZWFtJyB9LFxuICB7IG5hbWU6ICdWYW5jb3V2ZXInIH0sXG4gIHsgbmFtZTogJ1ZpY3RvcmlhJyB9LFxuICB7IG5hbWU6ICdWaWN0b3J2aWxsZScgfSxcbiAgeyBuYW1lOiAnVmluZWxhbmQnIH0sXG4gIHsgbmFtZTogJ1ZpcmdpbmlhIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdWaXNhbGlhJyB9LFxuICB7IG5hbWU6ICdWaXN0YScgfSxcbiAgeyBuYW1lOiAnV2FjbycgfSxcbiAgeyBuYW1lOiAnV2FsbnV0IENyZWVrJyB9LFxuICB7IG5hbWU6ICdXYWx0aGFtJyB9LFxuICB7IG5hbWU6ICdXYXJuZXIgUm9iaW5zJyB9LFxuICB7IG5hbWU6ICdXYXJyZW4nIH0sXG4gIHsgbmFtZTogJ1dhcnJlbicgfSxcbiAgeyBuYW1lOiAnV2Fyd2ljaycgfSxcbiAgeyBuYW1lOiAnV2FzaGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2F0ZXJidXJ5JyB9LFxuICB7IG5hbWU6ICdXYXRlcmxvbycgfSxcbiAgeyBuYW1lOiAnV2F0c29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ1dhdWtlZ2FuJyB9LFxuICB7IG5hbWU6ICdXYXVrZXNoYScgfSxcbiAgeyBuYW1lOiAnV2F1c2F1JyB9LFxuICB7IG5hbWU6ICdXYXV3YXRvc2EnIH0sXG4gIHsgbmFtZTogJ1dlbGxpbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dlc2xhY28nIH0sXG4gIHsgbmFtZTogJ1dlc3QgQWxsaXMnIH0sXG4gIHsgbmFtZTogJ1dlc3QgQ292aW5hJyB9LFxuICB7IG5hbWU6ICdXZXN0IERlcyBNb2luZXMnIH0sXG4gIHsgbmFtZTogJ1dlc3QgSGF2ZW4nIH0sXG4gIHsgbmFtZTogJ1dlc3QgSm9yZGFuJyB9LFxuICB7IG5hbWU6ICdXZXN0IE5ldyBZb3JrJyB9LFxuICB7IG5hbWU6ICdXZXN0IFBhbG0gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1dlc3QgU2FjcmFtZW50bycgfSxcbiAgeyBuYW1lOiAnV2VzdCBWYWxsZXkgQ2l0eScgfSxcbiAgeyBuYW1lOiAnV2VzdGVydmlsbGUnIH0sXG4gIHsgbmFtZTogJ1dlc3RmaWVsZCcgfSxcbiAgeyBuYW1lOiAnV2VzdGxhbmQnIH0sXG4gIHsgbmFtZTogJ1dlc3RtaW5zdGVyJyB9LFxuICB7IG5hbWU6ICdXZXN0bWluc3RlcicgfSxcbiAgeyBuYW1lOiAnV2VzdG9uJyB9LFxuICB7IG5hbWU6ICdXZXltb3V0aCBUb3duJyB9LFxuICB7IG5hbWU6ICdXaGVhdG9uJyB9LFxuICB7IG5hbWU6ICdXaGVlbGluZycgfSxcbiAgeyBuYW1lOiAnV2hpdGUgUGxhaW5zJyB9LFxuICB7IG5hbWU6ICdXaGl0dGllcicgfSxcbiAgeyBuYW1lOiAnV2ljaGl0YScgfSxcbiAgeyBuYW1lOiAnV2ljaGl0YSBGYWxscycgfSxcbiAgeyBuYW1lOiAnV2lsa2VzLUJhcnJlJyB9LFxuICB7IG5hbWU6ICdXaWxtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXaWxtaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXaWxzb24nIH0sXG4gIHsgbmFtZTogJ1dpbnN0b24tU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1dpbnRlciBHYXJkZW4nIH0sXG4gIHsgbmFtZTogJ1dvYnVybicgfSxcbiAgeyBuYW1lOiAnV29vZGJ1cnknIH0sXG4gIHsgbmFtZTogJ1dvb2RsYW5kJyB9LFxuICB7IG5hbWU6ICdXb29uc29ja2V0JyB9LFxuICB7IG5hbWU6ICdXb3JjZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1d5bGllJyB9LFxuICB7IG5hbWU6ICdXeW9taW5nJyB9LFxuICB7IG5hbWU6ICdZYWtpbWEnIH0sXG4gIHsgbmFtZTogJ1lvbmtlcnMnIH0sXG4gIHsgbmFtZTogJ1lvcmJhIExpbmRhJyB9LFxuICB7IG5hbWU6ICdZb3JrJyB9LFxuICB7IG5hbWU6ICdZb3VuZ3N0b3duJyB9LFxuICB7IG5hbWU6ICdZdWJhIENpdHknIH0sXG4gIHsgbmFtZTogJ1l1Y2FpcGEnIH0sXG4gIHsgbmFtZTogJ1l1bWEnIH1cbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcblx0eyBnaXRodWI6ICdqZWR3YXRzb24nLCBuYW1lOiAnSmVkIFdhdHNvbicgfSxcblx0eyBnaXRodWI6ICdicnVkZXJzdGVpbicsIG5hbWU6ICdEYXZlIEJyb3RoZXJzdG9uZScgfSxcblx0eyBnaXRodWI6ICdqb3NzbWFjJywgbmFtZTogJ0pvc3MgTWFja2lzb24nIH0sXG5cdHsgZ2l0aHViOiAnam5pZWNoY2lhbCcsIG5hbWU6ICdKYWt1YiBOaWVjaGNpYcWCJyB9LFxuXHR7IGdpdGh1YjogJ2NyYWlnZGFsbGltb3JlJywgbmFtZTogJ0NyYWlnIERhbGxpbW9yZScgfSxcblx0eyBnaXRodWI6ICdqdWxlbicsIG5hbWU6ICdKdWxlbiBSdWl6IEFpenB1cnUnIH0sXG5cdHsgZ2l0aHViOiAnZGNvdXNlbnMnLCBuYW1lOiAnRGFuaWVsIENvdXNlbnMnIH0sXG5cdHsgZ2l0aHViOiAnamdhdXRzY2gnLCBuYW1lOiAnSm9uIEdhdXRzY2gnIH0sXG5cdHsgZ2l0aHViOiAnZG1pdHJ5LXNtaXJub3YnLCBuYW1lOiAnRG1pdHJ5IFNtaXJub3YnIH0sXG5dO1xuIiwiZXhwb3J0cy5BVSA9IFtcblx0eyB2YWx1ZTogJ2F1c3RyYWxpYW4tY2FwaXRhbC10ZXJyaXRvcnknLCBsYWJlbDogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknLCBjbGFzc05hbWU6ICdTdGF0ZS1BQ1QnIH0sXG5cdHsgdmFsdWU6ICduZXctc291dGgtd2FsZXMnLCBsYWJlbDogJ05ldyBTb3V0aCBXYWxlcycsIGNsYXNzTmFtZTogJ1N0YXRlLU5TVycgfSxcblx0eyB2YWx1ZTogJ3ZpY3RvcmlhJywgbGFiZWw6ICdWaWN0b3JpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVZpYycgfSxcblx0eyB2YWx1ZTogJ3F1ZWVuc2xhbmQnLCBsYWJlbDogJ1F1ZWVuc2xhbmQnLCBjbGFzc05hbWU6ICdTdGF0ZS1RbGQnIH0sXG5cdHsgdmFsdWU6ICd3ZXN0ZXJuLWF1c3RyYWxpYScsIGxhYmVsOiAnV2VzdGVybiBBdXN0cmFsaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1XQScgfSxcblx0eyB2YWx1ZTogJ3NvdXRoLWF1c3RyYWxpYScsIGxhYmVsOiAnU291dGggQXVzdHJhbGlhJywgY2xhc3NOYW1lOiAnU3RhdGUtU0EnIH0sXG5cdHsgdmFsdWU6ICd0YXNtYW5pYScsIGxhYmVsOiAnVGFzbWFuaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1UYXMnIH0sXG5cdHsgdmFsdWU6ICdub3J0aGVybi10ZXJyaXRvcnknLCBsYWJlbDogJ05vcnRoZXJuIFRlcnJpdG9yeScsIGNsYXNzTmFtZTogJ1N0YXRlLU5UJyB9LFxuXTtcblxuZXhwb3J0cy5VUyA9IFtcbiAgICB7IHZhbHVlOiAnQUwnLCBsYWJlbDogJ0FsYWJhbWEnLCBkaXNhYmxlZDogdHJ1ZSB9LFxuICAgIHsgdmFsdWU6ICdBSycsIGxhYmVsOiAnQWxhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdBUycsIGxhYmVsOiAnQW1lcmljYW4gU2Ftb2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FaJywgbGFiZWw6ICdBcml6b25hJyB9LFxuICAgIHsgdmFsdWU6ICdBUicsIGxhYmVsOiAnQXJrYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0NBJywgbGFiZWw6ICdDYWxpZm9ybmlhJyB9LFxuICAgIHsgdmFsdWU6ICdDTycsIGxhYmVsOiAnQ29sb3JhZG8nIH0sXG4gICAgeyB2YWx1ZTogJ0NUJywgbGFiZWw6ICdDb25uZWN0aWN1dCcgfSxcbiAgICB7IHZhbHVlOiAnREUnLCBsYWJlbDogJ0RlbGF3YXJlJyB9LFxuICAgIHsgdmFsdWU6ICdEQycsIGxhYmVsOiAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZNJywgbGFiZWw6ICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0ZMJywgbGFiZWw6ICdGbG9yaWRhJyB9LFxuICAgIHsgdmFsdWU6ICdHQScsIGxhYmVsOiAnR2VvcmdpYScgfSxcbiAgICB7IHZhbHVlOiAnR1UnLCBsYWJlbDogJ0d1YW0nIH0sXG4gICAgeyB2YWx1ZTogJ0hJJywgbGFiZWw6ICdIYXdhaWknIH0sXG4gICAgeyB2YWx1ZTogJ0lEJywgbGFiZWw6ICdJZGFobycgfSxcbiAgICB7IHZhbHVlOiAnSUwnLCBsYWJlbDogJ0lsbGlub2lzJyB9LFxuICAgIHsgdmFsdWU6ICdJTicsIGxhYmVsOiAnSW5kaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnSUEnLCBsYWJlbDogJ0lvd2EnIH0sXG4gICAgeyB2YWx1ZTogJ0tTJywgbGFiZWw6ICdLYW5zYXMnIH0sXG4gICAgeyB2YWx1ZTogJ0tZJywgbGFiZWw6ICdLZW50dWNreScgfSxcbiAgICB7IHZhbHVlOiAnTEEnLCBsYWJlbDogJ0xvdWlzaWFuYScgfSxcbiAgICB7IHZhbHVlOiAnTUUnLCBsYWJlbDogJ01haW5lJyB9LFxuICAgIHsgdmFsdWU6ICdNSCcsIGxhYmVsOiAnTWFyc2hhbGwgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnTUQnLCBsYWJlbDogJ01hcnlsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdNQScsIGxhYmVsOiAnTWFzc2FjaHVzZXR0cycgfSxcbiAgICB7IHZhbHVlOiAnTUknLCBsYWJlbDogJ01pY2hpZ2FuJyB9LFxuICAgIHsgdmFsdWU6ICdNTicsIGxhYmVsOiAnTWlubmVzb3RhJyB9LFxuICAgIHsgdmFsdWU6ICdNUycsIGxhYmVsOiAnTWlzc2lzc2lwcGknIH0sXG4gICAgeyB2YWx1ZTogJ01PJywgbGFiZWw6ICdNaXNzb3VyaScgfSxcbiAgICB7IHZhbHVlOiAnTVQnLCBsYWJlbDogJ01vbnRhbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05FJywgbGFiZWw6ICdOZWJyYXNrYScgfSxcbiAgICB7IHZhbHVlOiAnTlYnLCBsYWJlbDogJ05ldmFkYScgfSxcbiAgICB7IHZhbHVlOiAnTkgnLCBsYWJlbDogJ05ldyBIYW1wc2hpcmUnIH0sXG4gICAgeyB2YWx1ZTogJ05KJywgbGFiZWw6ICdOZXcgSmVyc2V5JyB9LFxuICAgIHsgdmFsdWU6ICdOTScsIGxhYmVsOiAnTmV3IE1leGljbycgfSxcbiAgICB7IHZhbHVlOiAnTlknLCBsYWJlbDogJ05ldyBZb3JrJyB9LFxuICAgIHsgdmFsdWU6ICdOQycsIGxhYmVsOiAnTm9ydGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ05EJywgbGFiZWw6ICdOb3J0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01QJywgbGFiZWw6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ09IJywgbGFiZWw6ICdPaGlvJyB9LFxuICAgIHsgdmFsdWU6ICdPSycsIGxhYmVsOiAnT2tsYWhvbWEnIH0sXG4gICAgeyB2YWx1ZTogJ09SJywgbGFiZWw6ICdPcmVnb24nIH0sXG4gICAgeyB2YWx1ZTogJ1BXJywgbGFiZWw6ICdQYWxhdScgfSxcbiAgICB7IHZhbHVlOiAnUEEnLCBsYWJlbDogJ1Blbm5zeWx2YW5pYScgfSxcbiAgICB7IHZhbHVlOiAnUFInLCBsYWJlbDogJ1B1ZXJ0byBSaWNvJyB9LFxuICAgIHsgdmFsdWU6ICdSSScsIGxhYmVsOiAnUmhvZGUgSXNsYW5kJyB9LFxuICAgIHsgdmFsdWU6ICdTQycsIGxhYmVsOiAnU291dGggQ2Fyb2xpbmEnIH0sXG4gICAgeyB2YWx1ZTogJ1NEJywgbGFiZWw6ICdTb3V0aCBEYWtvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ1ROJywgbGFiZWw6ICdUZW5uZXNzZWUnIH0sXG4gICAgeyB2YWx1ZTogJ1RYJywgbGFiZWw6ICdUZXhhcycgfSxcbiAgICB7IHZhbHVlOiAnVVQnLCBsYWJlbDogJ1V0YWgnIH0sXG4gICAgeyB2YWx1ZTogJ1ZUJywgbGFiZWw6ICdWZXJtb250JyB9LFxuICAgIHsgdmFsdWU6ICdWSScsIGxhYmVsOiAnVmlyZ2luIElzbGFuZHMnIH0sXG4gICAgeyB2YWx1ZTogJ1ZBJywgbGFiZWw6ICdWaXJnaW5pYScgfSxcbiAgICB7IHZhbHVlOiAnV0EnLCBsYWJlbDogJ1dhc2hpbmd0b24nIH0sXG4gICAgeyB2YWx1ZTogJ1dWJywgbGFiZWw6ICdXZXN0IFZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXSScsIGxhYmVsOiAnV2lzY29uc2luJyB9LFxuICAgIHsgdmFsdWU6ICdXWScsIGxhYmVsOiAnV3lvbWluZycgfSxcbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcblx0eyB2YWx1ZTogJ0pvaG4gU21pdGgnLCBsYWJlbDogJ0pvaG4gU21pdGgnLCBlbWFpbDogJ2pvaG5Ac21pdGguY29tJyB9LFxuXHR7IHZhbHVlOiAnTWVycnkgSmFuZScsIGxhYmVsOiAnTWVycnkgSmFuZScsIGVtYWlsOiAnbWVycnlAamFuZS5jb20nIH0sXG5cdHsgdmFsdWU6ICdTdGFuIEhvcGVyJywgbGFiZWw6ICdTdGFuIEhvcGVyJywgZW1haWw6ICdzdGFuQGhvcGVyLmNvbScgfVxuXTtcbiIsInZhciBjaGFyZW5jID0ge1xuICAvLyBVVEYtOCBlbmNvZGluZ1xuICB1dGY4OiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHJldHVybiBjaGFyZW5jLmJpbi5zdHJpbmdUb0J5dGVzKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGNoYXJlbmMuYmluLmJ5dGVzVG9TdHJpbmcoYnl0ZXMpKSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEJpbmFyeSBlbmNvZGluZ1xuICBiaW46IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspXG4gICAgICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgc3RyID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHN0ci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pKTtcbiAgICAgIHJldHVybiBzdHIuam9pbignJyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJlbmM7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBiYXNlNjRtYXBcbiAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nLFxuXG4gIGNyeXB0ID0ge1xuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIGxlZnRcbiAgICByb3RsOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgYikgfCAobiA+Pj4gKDMyIC0gYikpO1xuICAgIH0sXG5cbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiByaWdodFxuICAgIHJvdHI6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCAoMzIgLSBiKSkgfCAobiA+Pj4gYik7XG4gICAgfSxcblxuICAgIC8vIFN3YXAgYmlnLWVuZGlhbiB0byBsaXR0bGUtZW5kaWFuIGFuZCB2aWNlIHZlcnNhXG4gICAgZW5kaWFuOiBmdW5jdGlvbihuKSB7XG4gICAgICAvLyBJZiBudW1iZXIgZ2l2ZW4sIHN3YXAgZW5kaWFuXG4gICAgICBpZiAobi5jb25zdHJ1Y3RvciA9PSBOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0LnJvdGwobiwgOCkgJiAweDAwRkYwMEZGIHwgY3J5cHQucm90bChuLCAyNCkgJiAweEZGMDBGRjAwO1xuICAgICAgfVxuXG4gICAgICAvLyBFbHNlLCBhc3N1bWUgYXJyYXkgYW5kIHN3YXAgYWxsIGl0ZW1zXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4ubGVuZ3RoOyBpKyspXG4gICAgICAgIG5baV0gPSBjcnlwdC5lbmRpYW4obltpXSk7XG4gICAgICByZXR1cm4gbjtcbiAgICB9LFxuXG4gICAgLy8gR2VuZXJhdGUgYW4gYXJyYXkgb2YgYW55IGxlbmd0aCBvZiByYW5kb20gYnl0ZXNcbiAgICByYW5kb21CeXRlczogZnVuY3Rpb24obikge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXTsgbiA+IDA7IG4tLSlcbiAgICAgICAgYnl0ZXMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYmlnLWVuZGlhbiAzMi1iaXQgd29yZHNcbiAgICBieXRlc1RvV29yZHM6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciB3b3JkcyA9IFtdLCBpID0gMCwgYiA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKywgYiArPSA4KVxuICAgICAgICB3b3Jkc1tiID4+PiA1XSB8PSBieXRlc1tpXSA8PCAoMjQgLSBiICUgMzIpO1xuICAgICAgcmV0dXJuIHdvcmRzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGJpZy1lbmRpYW4gMzItYml0IHdvcmRzIHRvIGEgYnl0ZSBhcnJheVxuICAgIHdvcmRzVG9CeXRlczogZnVuY3Rpb24od29yZHMpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGIgPSAwOyBiIDwgd29yZHMubGVuZ3RoICogMzI7IGIgKz0gOClcbiAgICAgICAgYnl0ZXMucHVzaCgod29yZHNbYiA+Pj4gNV0gPj4+ICgyNCAtIGIgJSAzMikpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgaGV4IHN0cmluZ1xuICAgIGJ5dGVzVG9IZXg6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBoZXggPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSAmIDB4RikudG9TdHJpbmcoMTYpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoZXguam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBoZXggc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGhleFRvQnl0ZXM6IGZ1bmN0aW9uKGhleCkge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYyA9IDA7IGMgPCBoZXgubGVuZ3RoOyBjICs9IDIpXG4gICAgICAgIGJ5dGVzLnB1c2gocGFyc2VJbnQoaGV4LnN1YnN0cihjLCAyKSwgMTYpKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBiYXNlLTY0IHN0cmluZ1xuICAgIGJ5dGVzVG9CYXNlNjQ6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBiYXNlNjQgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICB2YXIgdHJpcGxldCA9IChieXRlc1tpXSA8PCAxNikgfCAoYnl0ZXNbaSArIDFdIDw8IDgpIHwgYnl0ZXNbaSArIDJdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKylcbiAgICAgICAgICBpZiAoaSAqIDggKyBqICogNiA8PSBieXRlcy5sZW5ndGggKiA4KVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goYmFzZTY0bWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gNiAqICgzIC0gaikpICYgMHgzRikpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKCc9Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYmFzZTY0LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYmFzZS02NCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgYmFzZTY0VG9CeXRlczogZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgICAvLyBSZW1vdmUgbm9uLWJhc2UtNjQgY2hhcmFjdGVyc1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnJlcGxhY2UoL1teQS1aMC05K1xcL10vaWcsICcnKTtcblxuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgaSA9IDAsIGltb2Q0ID0gMDsgaSA8IGJhc2U2NC5sZW5ndGg7XG4gICAgICAgICAgaW1vZDQgPSArK2kgJSA0KSB7XG4gICAgICAgIGlmIChpbW9kNCA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgYnl0ZXMucHVzaCgoKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSAtIDEpKVxuICAgICAgICAgICAgJiAoTWF0aC5wb3coMiwgLTIgKiBpbW9kNCArIDgpIC0gMSkpIDw8IChpbW9kNCAqIDIpKVxuICAgICAgICAgICAgfCAoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpKSkgPj4+ICg2IC0gaW1vZDQgKiAyKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGNyeXB0O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCcuL2luRE9NJyk7XG5cbnZhciBzaXplO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyZWNhbGMpIHtcbiAgaWYgKCFzaXplIHx8IHJlY2FsYykge1xuICAgIGlmIChjYW5Vc2VET00pIHtcbiAgICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS50b3AgPSAnLTk5OTlweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgIHNpemUgPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICogXG4gKi9cblxuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBlcXVhbGl0eSBieSBpdGVyYXRpbmcgdGhyb3VnaCBrZXlzIG9uIGFuIG9iamVjdCBhbmQgcmV0dXJuaW5nIGZhbHNlXG4gKiB3aGVuIGFueSBrZXkgaGFzIHZhbHVlcyB3aGljaCBhcmUgbm90IHN0cmljdGx5IGVxdWFsIGJldHdlZW4gdGhlIGFyZ3VtZW50cy5cbiAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZXMgb2YgYWxsIGtleXMgYXJlIHN0cmljdGx5IGVxdWFsLlxuICovXG5mdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICBpZiAoaXMob2JqQSwgb2JqQikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqQSAhPT0gJ29iamVjdCcgfHwgb2JqQSA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqQiAhPT0gJ29iamVjdCcgfHwgb2JqQiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iakIsIGtleXNBW2ldKSB8fCAhaXMob2JqQVtrZXlzQVtpXV0sIG9iakJba2V5c0FbaV1dKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dFcXVhbDsiLCIvKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgQnVmZmVyXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGlzLWJ1ZmZlcmBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAhPSBudWxsICYmXG4gICAgKG9iai5faXNCdWZmZXIgfHwgLy8gRm9yIFNhZmFyaSA1LTcgKG1pc3NpbmcgT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvcilcbiAgICAgIChvYmouY29uc3RydWN0b3IgJiZcbiAgICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKVxuICAgICkpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWVkaWFRdWVyeTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgbWVkaWFRdWVyeSA9IFwiKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogNS80KSwgKG1pbi1yZXNvbHV0aW9uOiAxLjI1ZHBweClcIjtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLy8gdGhlIHdoYXR3Zy1mZXRjaCBwb2x5ZmlsbCBpbnN0YWxscyB0aGUgZmV0Y2goKSBmdW5jdGlvblxuLy8gb24gdGhlIGdsb2JhbCBvYmplY3QgKHdpbmRvdyBvciBzZWxmKVxuLy9cbi8vIFJldHVybiB0aGF0IGFzIHRoZSBleHBvcnQgZm9yIHVzZSBpbiBXZWJwYWNrLCBCcm93c2VyaWZ5IGV0Yy5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzZWxmLmZldGNoLmJpbmQoc2VsZik7XG4iLCIoZnVuY3Rpb24oKXtcclxuICB2YXIgY3J5cHQgPSByZXF1aXJlKCdjcnlwdCcpLFxyXG4gICAgICB1dGY4ID0gcmVxdWlyZSgnY2hhcmVuYycpLnV0ZjgsXHJcbiAgICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyksXHJcbiAgICAgIGJpbiA9IHJlcXVpcmUoJ2NoYXJlbmMnKS5iaW4sXHJcblxyXG4gIC8vIFRoZSBjb3JlXHJcbiAgbWQ1ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIC8vIENvbnZlcnQgdG8gYnl0ZSBhcnJheVxyXG4gICAgaWYgKG1lc3NhZ2UuY29uc3RydWN0b3IgPT0gU3RyaW5nKVxyXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kaW5nID09PSAnYmluYXJ5JylcclxuICAgICAgICBtZXNzYWdlID0gYmluLnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBtZXNzYWdlID0gdXRmOC5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgZWxzZSBpZiAoaXNCdWZmZXIobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLCAwKTtcclxuICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gbWVzc2FnZS50b1N0cmluZygpO1xyXG4gICAgLy8gZWxzZSwgYXNzdW1lIGJ5dGUgYXJyYXkgYWxyZWFkeVxyXG5cclxuICAgIHZhciBtID0gY3J5cHQuYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpLFxyXG4gICAgICAgIGwgPSBtZXNzYWdlLmxlbmd0aCAqIDgsXHJcbiAgICAgICAgYSA9ICAxNzMyNTg0MTkzLFxyXG4gICAgICAgIGIgPSAtMjcxNzMzODc5LFxyXG4gICAgICAgIGMgPSAtMTczMjU4NDE5NCxcclxuICAgICAgICBkID0gIDI3MTczMzg3ODtcclxuXHJcbiAgICAvLyBTd2FwIGVuZGlhblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG1baV0gPSAoKG1baV0gPDwgIDgpIHwgKG1baV0gPj4+IDI0KSkgJiAweDAwRkYwMEZGIHxcclxuICAgICAgICAgICAgICgobVtpXSA8PCAyNCkgfCAobVtpXSA+Pj4gIDgpKSAmIDB4RkYwMEZGMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFkZGluZ1xyXG4gICAgbVtsID4+PiA1XSB8PSAweDgwIDw8IChsICUgMzIpO1xyXG4gICAgbVsoKChsICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGw7XHJcblxyXG4gICAgLy8gTWV0aG9kIHNob3J0Y3V0c1xyXG4gICAgdmFyIEZGID0gbWQ1Ll9mZixcclxuICAgICAgICBHRyA9IG1kNS5fZ2csXHJcbiAgICAgICAgSEggPSBtZDUuX2hoLFxyXG4gICAgICAgIElJID0gbWQ1Ll9paTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XHJcblxyXG4gICAgICB2YXIgYWEgPSBhLFxyXG4gICAgICAgICAgYmIgPSBiLFxyXG4gICAgICAgICAgY2MgPSBjLFxyXG4gICAgICAgICAgZGQgPSBkO1xyXG5cclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgMF0sICA3LCAtNjgwODc2OTM2KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgMl0sIDE3LCAgNjA2MTA1ODE5KTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDRdLCAgNywgLTE3NjQxODg5Nyk7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDcsICAxNzcwMDM1NDE2KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krMTJdLCAgNywgIDE4MDQ2MDM2ODIpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krMTRdLCAxNywgLTE1MDIwMDIyOTApO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzE1XSwgMjIsICAxMjM2NTM1MzI5KTtcclxuXHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDFdLCAgNSwgLTE2NTc5NjUxMCk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krIDZdLCAgOSwgLTEwNjk1MDE2MzIpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzExXSwgMTQsICA2NDM3MTc3MTMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA1XSwgIDUsIC03MDE1NTg2OTEpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzEwXSwgIDksICAzODAxNjA4Myk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDldLCAgNSwgIDU2ODQ0NjQzOCk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTRdLCAgOSwgLTEwMTk4MDM2OTApO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA4XSwgMjAsICAxMTYzNTMxNTAxKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsxM10sICA1LCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krIDJdLCAgOSwgLTUxNDAzNzg0KTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgN10sIDE0LCAgMTczNTMyODQ3Myk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgNV0sICA0LCAtMzc4NTU4KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDFdLCAgNCwgLTE1MzA5OTIwNjApO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgN10sIDE2LCAtMTU1NDk3NjMyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxMF0sIDIzLCAtMTA5NDczMDY0MCk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krMTNdLCAgNCwgIDY4MTI3OTE3NCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDBdLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDNdLCAxNiwgLTcyMjUyMTk3OSk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgOV0sICA0LCAtNjQwMzY0NDg3KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsxMl0sIDExLCAtNDIxODE1ODM1KTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuXHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDBdLCAgNiwgLTE5ODYzMDg0NCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgNV0sIDIxLCAtNTc0MzQwNTUpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDYsICAxNzAwNDg1NTcxKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgM10sIDEwLCAtMTg5NDk4NjYwNik7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTBdLCAxNSwgLTEwNTE1MjMpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgOF0sICA2LCAgMTg3MzMxMzM1OSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTVdLCAxMCwgLTMwNjExNzQ0KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDYsIC0xNDU1MjMwNzApO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcclxuXHJcbiAgICAgIGEgPSAoYSArIGFhKSA+Pj4gMDtcclxuICAgICAgYiA9IChiICsgYmIpID4+PiAwO1xyXG4gICAgICBjID0gKGMgKyBjYykgPj4+IDA7XHJcbiAgICAgIGQgPSAoZCArIGRkKSA+Pj4gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3J5cHQuZW5kaWFuKFthLCBiLCBjLCBkXSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQXV4aWxpYXJ5IGZ1bmN0aW9uc1xyXG4gIG1kNS5fZmYgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiICYgYyB8IH5iICYgZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5fZ2cgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiICYgZCB8IGMgJiB+ZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faGggID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2lpICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYyBeIChiIHwgfmQpKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcblxyXG4gIC8vIFBhY2thZ2UgcHJpdmF0ZSBibG9ja3NpemVcclxuICBtZDUuX2Jsb2Nrc2l6ZSA9IDE2O1xyXG4gIG1kNS5fZGlnZXN0c2l6ZSA9IDE2O1xyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICBpZih0eXBlb2YgbWVzc2FnZSA9PSAndW5kZWZpbmVkJylcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBkaWdlc3RieXRlcyA9IGNyeXB0LndvcmRzVG9CeXRlcyhtZDUobWVzc2FnZSwgb3B0aW9ucykpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5hc0J5dGVzID8gZGlnZXN0Ynl0ZXMgOlxyXG4gICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IGJpbi5ieXRlc1RvU3RyaW5nKGRpZ2VzdGJ5dGVzKSA6XHJcbiAgICAgICAgY3J5cHQuYnl0ZXNUb0hleChkaWdlc3RieXRlcyk7XHJcbiAgfTtcclxuXHJcbn0pKCk7XHJcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lO1xuXG4gIGlmICgodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsKSAmJiBwZXJmb3JtYW5jZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwpICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoZ2V0TmFub1NlY29uZHMoKSAtIGxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gIH0gZWxzZSBpZiAoRGF0ZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIERhdGUubm93KCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKCkge1xuICByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICByb290LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9zaGFsbG93Q29tcGFyZScpOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMC4wXG52YXIgUmVhY3QsIGlzUmV0aW5hLCBtZDUsIHF1ZXJ5c3RyaW5nO1xuXG5SZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1kNSA9IHJlcXVpcmUoJ21kNScpO1xuXG5xdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmlzUmV0aW5hID0gcmVxdWlyZSgnaXMtcmV0aW5hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0dyYXZhdGFyJyxcbiAgcHJvcFR5cGVzOiB7XG4gICAgZW1haWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgbWQ1OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgcmF0aW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGh0dHBzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBcImRlZmF1bHRcIjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2l6ZTogNTAsXG4gICAgICByYXRpbmc6ICdnJyxcbiAgICAgIGh0dHBzOiBmYWxzZSxcbiAgICAgIFwiZGVmYXVsdFwiOiBcInJldHJvXCJcbiAgICB9O1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiYXNlLCBjbGFzc05hbWUsIGhhc2gsIG1vZGVybkJyb3dzZXIsIHF1ZXJ5LCByZXRpbmFRdWVyeSwgcmV0aW5hU3JjLCBzcmM7XG4gICAgYmFzZSA9IHRoaXMucHJvcHMuaHR0cHMgPyBcImh0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvXCIgOiAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyc7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe1xuICAgICAgczogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICBkOiB0aGlzLnByb3BzW1wiZGVmYXVsdFwiXVxuICAgIH0pO1xuICAgIHJldGluYVF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcbiAgICAgIHM6IHRoaXMucHJvcHMuc2l6ZSAqIDIsXG4gICAgICByOiB0aGlzLnByb3BzLnJhdGluZyxcbiAgICAgIGQ6IHRoaXMucHJvcHNbXCJkZWZhdWx0XCJdXG4gICAgfSk7XG4gICAgaWYgKHRoaXMucHJvcHMubWQ1KSB7XG4gICAgICBoYXNoID0gdGhpcy5wcm9wcy5tZDU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVtYWlsKSB7XG4gICAgICBoYXNoID0gbWQ1KHRoaXMucHJvcHMuZW1haWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0dyYXZhdGFyIGltYWdlIGNhbiBub3QgYmUgZmV0Y2hlZC4gRWl0aGVyIHRoZSBcImVtYWlsXCIgb3IgXCJtZDVcIiBwcm9wIG11c3QgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgbnVsbCk7XG4gICAgfVxuICAgIHNyYyA9IGJhc2UgKyBoYXNoICsgXCI/XCIgKyBxdWVyeTtcbiAgICByZXRpbmFTcmMgPSBiYXNlICsgaGFzaCArIFwiP1wiICsgcmV0aW5hUXVlcnk7XG4gICAgbW9kZXJuQnJvd3NlciA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgICBtb2Rlcm5Ccm93c2VyID0gJ3NyY3NldCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgfVxuICAgIGNsYXNzTmFtZSA9ICdyZWFjdC1ncmF2YXRhcic7XG4gICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgIH1cbiAgICBpZiAoIW1vZGVybkJyb3dzZXIgJiYgaXNSZXRpbmEoKSkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIFwic3R5bGVcIjogdGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgXCJzcmNcIjogcmV0aW5hU3JjLFxuICAgICAgICBcImhlaWdodFwiOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIFwid2lkdGhcIjogdGhpcy5wcm9wcy5zaXplXG4gICAgICB9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgIFwiY2xhc3NOYW1lXCI6IGNsYXNzTmFtZVxuICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgXCJzdHlsZVwiOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBcInNyY1wiOiBzcmMsXG4gICAgICAgIFwic3JjU2V0XCI6IHJldGluYVNyYyArIFwiIDJ4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgXCJ3aWR0aFwiOiB0aGlzLnByb3BzLnNpemVcbiAgICAgIH0sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgXCJjbGFzc05hbWVcIjogY2xhc3NOYW1lXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0U2VsZWN0ID0gcmVxdWlyZSgncmVhY3Qtc2VsZWN0Jyk7XG5cbnZhciBfcmVhY3RTZWxlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RTZWxlY3QpO1xuXG52YXIgX3JlYWN0VmlydHVhbGl6ZWQgPSByZXF1aXJlKCdyZWFjdC12aXJ0dWFsaXplZCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBWaXJ0dWFsaXplZFNlbGVjdCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhWaXJ0dWFsaXplZFNlbGVjdCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVmlydHVhbGl6ZWRTZWxlY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlydHVhbGl6ZWRTZWxlY3QpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZpcnR1YWxpemVkU2VsZWN0KS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fcmVuZGVyTWVudSA9IF90aGlzLl9yZW5kZXJNZW51LmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vcHRpb25SZW5kZXJlciA9IF90aGlzLl9vcHRpb25SZW5kZXJlci5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmlydHVhbGl6ZWRTZWxlY3QsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFNlbGVjdDIuZGVmYXVsdCwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgbWVudVJlbmRlcmVyOiB0aGlzLl9yZW5kZXJNZW51LFxuICAgICAgICBtZW51U3R5bGU6IHsgb3ZlcmZsb3c6ICdoaWRkZW4nIH1cbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0plZFdhdHNvbi9yZWFjdC1zZWxlY3QvI2VmZmVjaWVudGx5LXJlbmRlcmluZy1sYXJnZS1saXN0cy13aXRoLXdpbmRvd2luZ1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfcmVuZGVyTWVudScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJNZW51KF9yZWYpIHtcbiAgICAgIHZhciBmb2N1c2VkT3B0aW9uID0gX3JlZi5mb2N1c2VkT3B0aW9uO1xuICAgICAgdmFyIGZvY3VzT3B0aW9uID0gX3JlZi5mb2N1c09wdGlvbjtcbiAgICAgIHZhciBsYWJlbEtleSA9IF9yZWYubGFiZWxLZXk7XG4gICAgICB2YXIgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IF9yZWYuc2VsZWN0VmFsdWU7XG4gICAgICB2YXIgdmFsdWVBcnJheSA9IF9yZWYudmFsdWVBcnJheTtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIG1heEhlaWdodCA9IF9wcm9wcy5tYXhIZWlnaHQ7XG4gICAgICB2YXIgb3B0aW9uSGVpZ2h0ID0gX3Byb3BzLm9wdGlvbkhlaWdodDtcbiAgICAgIHZhciBvcHRpb25SZW5kZXJlciA9IF9wcm9wcy5vcHRpb25SZW5kZXJlcjtcblxuICAgICAgdmFyIGZvY3VzZWRPcHRpb25JbmRleCA9IG9wdGlvbnMuaW5kZXhPZihmb2N1c2VkT3B0aW9uKTtcbiAgICAgIHZhciBoZWlnaHQgPSBNYXRoLm1pbihtYXhIZWlnaHQsIG9wdGlvbnMubGVuZ3RoICogb3B0aW9uSGVpZ2h0KTtcbiAgICAgIHZhciBpbm5lclJvd1JlbmRlcmVyID0gb3B0aW9uUmVuZGVyZXIgfHwgdGhpcy5fb3B0aW9uUmVuZGVyZXI7XG5cbiAgICAgIGZ1bmN0aW9uIHdyYXBwZWRSb3dSZW5kZXJlcihpbmRleCkge1xuICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tpbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGlubmVyUm93UmVuZGVyZXIoeyBmb2N1c2VkT3B0aW9uOiBmb2N1c2VkT3B0aW9uLCBmb2N1c2VkT3B0aW9uSW5kZXg6IGZvY3VzZWRPcHRpb25JbmRleCwgZm9jdXNPcHRpb246IGZvY3VzT3B0aW9uLCBsYWJlbEtleTogbGFiZWxLZXksIG9wdGlvbjogb3B0aW9uLCBvcHRpb25zOiBvcHRpb25zLCBzZWxlY3RWYWx1ZTogc2VsZWN0VmFsdWUsIHZhbHVlQXJyYXk6IHZhbHVlQXJyYXkgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgX3JlYWN0VmlydHVhbGl6ZWQuQXV0b1NpemVyLFxuICAgICAgICB7IGRpc2FibGVIZWlnaHQ6IHRydWUgfSxcbiAgICAgICAgZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGg7XG4gICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFZpcnR1YWxpemVkLlZpcnR1YWxTY3JvbGwsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ1ZpcnR1YWxTZWxlY3RHcmlkJyxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgcm93SGVpZ2h0OiBvcHRpb25IZWlnaHQsXG4gICAgICAgICAgICByb3dSZW5kZXJlcjogd3JhcHBlZFJvd1JlbmRlcmVyLFxuICAgICAgICAgICAgcm93c0NvdW50OiBvcHRpb25zLmxlbmd0aCxcbiAgICAgICAgICAgIHNjcm9sbFRvSW5kZXg6IGZvY3VzZWRPcHRpb25JbmRleCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vcHRpb25SZW5kZXJlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vcHRpb25SZW5kZXJlcihfcmVmMykge1xuICAgICAgdmFyIGZvY3VzZWRPcHRpb24gPSBfcmVmMy5mb2N1c2VkT3B0aW9uO1xuICAgICAgdmFyIGZvY3VzT3B0aW9uID0gX3JlZjMuZm9jdXNPcHRpb247XG4gICAgICB2YXIgbGFiZWxLZXkgPSBfcmVmMy5sYWJlbEtleTtcbiAgICAgIHZhciBvcHRpb24gPSBfcmVmMy5vcHRpb247XG4gICAgICB2YXIgc2VsZWN0VmFsdWUgPSBfcmVmMy5zZWxlY3RWYWx1ZTtcbiAgICAgIHZhciBvcHRpb25IZWlnaHQgPSB0aGlzLnByb3BzLm9wdGlvbkhlaWdodDtcblxuXG4gICAgICB2YXIgY2xhc3NOYW1lID0gb3B0aW9uID09PSBmb2N1c2VkT3B0aW9uID8gJ1ZpcnR1YWxpemVkU2VsZWN0T3B0aW9uIFZpcnR1YWxpemVkU2VsZWN0Rm9jdXNlZE9wdGlvbicgOiAnVmlydHVhbGl6ZWRTZWxlY3RPcHRpb24nO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RWYWx1ZShvcHRpb24pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25Nb3VzZU92ZXI6IGZ1bmN0aW9uIG9uTW91c2VPdmVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvY3VzT3B0aW9uKG9wdGlvbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiBvcHRpb25IZWlnaHRcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbltsYWJlbEtleV1cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFZpcnR1YWxpemVkU2VsZWN0O1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuVmlydHVhbGl6ZWRTZWxlY3QucHJvcFR5cGVzID0ge1xuICBtYXhIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIG9wdGlvbkhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb3B0aW9uUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuY1xufTtcblZpcnR1YWxpemVkU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgbWF4SGVpZ2h0OiAyMDAsXG4gIG9wdGlvbkhlaWdodDogMzVcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBWaXJ0dWFsaXplZFNlbGVjdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfVmlydHVhbGl6ZWRTZWxlY3QgPSByZXF1aXJlKCcuL1ZpcnR1YWxpemVkU2VsZWN0Jyk7XG5cbnZhciBfVmlydHVhbGl6ZWRTZWxlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVmlydHVhbGl6ZWRTZWxlY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfVmlydHVhbGl6ZWRTZWxlY3QyLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogVGhpcyBIT0MgZGVjb3JhdGVzIGEgdmlydHVhbGl6ZWQgY29tcG9uZW50IGFuZCByZXNwb25kcyB0byBhcnJvdy1rZXkgZXZlbnRzIGJ5IHNjcm9sbGluZyBvbmUgcm93IG9yIGNvbHVtbiBhdCBhIHRpbWUuXG4gKi9cblxudmFyIEFycm93S2V5U3RlcHBlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhBcnJvd0tleVN0ZXBwZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEFycm93S2V5U3RlcHBlcihwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcnJvd0tleVN0ZXBwZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFycm93S2V5U3RlcHBlcikuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBzY3JvbGxUb0NvbHVtbjogMCxcbiAgICAgIHNjcm9sbFRvUm93OiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gMDtcbiAgICBfdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gMDtcbiAgICBfdGhpcy5fcm93U3RhcnRJbmRleCA9IDA7XG4gICAgX3RoaXMuX3Jvd1N0b3BJbmRleCA9IDA7XG5cbiAgICBfdGhpcy5fb25LZXlEb3duID0gX3RoaXMuX29uS2V5RG93bi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQgPSBfdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFycm93S2V5U3RlcHBlciwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfc3RhdGUuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfc3RhdGUuc2Nyb2xsVG9Sb3c7XG5cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5fb25LZXlEb3duXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuKHtcbiAgICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogdGhpcy5fb25TZWN0aW9uUmVuZGVyZWQsXG4gICAgICAgICAgc2Nyb2xsVG9Db2x1bW46IHNjcm9sbFRvQ29sdW1uLFxuICAgICAgICAgIHNjcm9sbFRvUm93OiBzY3JvbGxUb1Jvd1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25LZXlEb3duJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uS2V5RG93bihldmVudCkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczIuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wczIucm93c0NvdW50O1xuXG4gICAgICAvLyBUaGUgYWJvdmUgY2FzZXMgYWxsIHByZXZlbnQgZGVmYXVsdCBldmVudCBldmVudCBiZWhhdmlvci5cbiAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCB0aGUgZ3JpZCBmcm9tIHNjcm9sbGluZyBhZnRlciB0aGUgc25hcC10byB1cGRhdGUuXG5cbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvUm93OiBNYXRoLm1pbih0aGlzLl9yb3dTdG9wSW5kZXggKyAxLCByb3dzQ291bnQgLSAxKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb0NvbHVtbjogTWF0aC5tYXgodGhpcy5fY29sdW1uU3RhcnRJbmRleCAtIDEsIDApXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb0NvbHVtbjogTWF0aC5taW4odGhpcy5fY29sdW1uU3RvcEluZGV4ICsgMSwgY29sdW1uc0NvdW50IC0gMSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvUm93OiBNYXRoLm1heCh0aGlzLl9yb3dTdGFydEluZGV4IC0gMSwgMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TZWN0aW9uUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TZWN0aW9uUmVuZGVyZWQoX3JlZikge1xuICAgICAgdmFyIGNvbHVtblN0YXJ0SW5kZXggPSBfcmVmLmNvbHVtblN0YXJ0SW5kZXg7XG4gICAgICB2YXIgY29sdW1uU3RvcEluZGV4ID0gX3JlZi5jb2x1bW5TdG9wSW5kZXg7XG4gICAgICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWYucm93U3RhcnRJbmRleDtcbiAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmLnJvd1N0b3BJbmRleDtcblxuICAgICAgdGhpcy5fY29sdW1uU3RhcnRJbmRleCA9IGNvbHVtblN0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9jb2x1bW5TdG9wSW5kZXggPSBjb2x1bW5TdG9wSW5kZXg7XG4gICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gcm93U3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX3Jvd1N0b3BJbmRleCA9IHJvd1N0b3BJbmRleDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXJyb3dLZXlTdGVwcGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQXJyb3dLZXlTdGVwcGVyLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBjb2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFycm93S2V5U3RlcHBlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFycm93S2V5U3RlcHBlciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9BcnJvd0tleVN0ZXBwZXIyID0gcmVxdWlyZSgnLi9BcnJvd0tleVN0ZXBwZXInKTtcblxudmFyIF9BcnJvd0tleVN0ZXBwZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXJyb3dLZXlTdGVwcGVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BcnJvd0tleVN0ZXBwZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkFycm93S2V5U3RlcHBlciA9IF9BcnJvd0tleVN0ZXBwZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogRGVjb3JhdG9yIGNvbXBvbmVudCB0aGF0IGF1dG9tYXRpY2FsbHkgYWRqdXN0cyB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBhIHNpbmdsZSBjaGlsZC5cbiAqIENoaWxkIGNvbXBvbmVudCBzaG91bGQgbm90IGJlIGRlY2xhcmVkIGFzIGEgY2hpbGQgYnV0IHNob3VsZCByYXRoZXIgYmUgc3BlY2lmaWVkIGJ5IGEgYENoaWxkQ29tcG9uZW50YCBwcm9wZXJ0eS5cbiAqIEFsbCBvdGhlciBwcm9wZXJ0aWVzIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGNoaWxkIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgQXV0b1NpemVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEF1dG9TaXplciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXV0b1NpemVyKHByb3BzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEF1dG9TaXplcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXV0b1NpemVyKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHdpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9vblJlc2l6ZSA9IF90aGlzLl9vblJlc2l6ZS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fb25TY3JvbGwgPSBfdGhpcy5fb25TY3JvbGwuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3NldFJlZiA9IF90aGlzLl9zZXRSZWYuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEF1dG9TaXplciwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgLy8gRGVmZXIgcmVxdWlyaW5nIHJlc2l6ZSBoYW5kbGVyIGluIG9yZGVyIHRvIHN1cHBvcnQgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgICAgLy8gU2VlIGlzc3VlICM0MVxuICAgICAgdGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZSA9IHJlcXVpcmUoJy4uL3ZlbmRvci9kZXRlY3RFbGVtZW50UmVzaXplJyk7XG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplLmFkZFJlc2l6ZUxpc3RlbmVyKHRoaXMuX3BhcmVudE5vZGUsIHRoaXMuX29uUmVzaXplKTtcblxuICAgICAgdGhpcy5fb25SZXNpemUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUpIHtcbiAgICAgICAgdGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZS5yZW1vdmVSZXNpemVMaXN0ZW5lcih0aGlzLl9wYXJlbnROb2RlLCB0aGlzLl9vblJlc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgZGlzYWJsZUhlaWdodCA9IF9wcm9wcy5kaXNhYmxlSGVpZ2h0O1xuICAgICAgdmFyIGRpc2FibGVXaWR0aCA9IF9wcm9wcy5kaXNhYmxlV2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBoZWlnaHQgPSBfc3RhdGUuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3N0YXRlLndpZHRoO1xuXG4gICAgICAvLyBPdXRlciBkaXYgc2hvdWxkIG5vdCBmb3JjZSB3aWR0aC9oZWlnaHQgc2luY2UgdGhhdCBtYXkgcHJldmVudCBjb250YWluZXJzIGZyb20gc2hyaW5raW5nLlxuICAgICAgLy8gSW5uZXIgY29tcG9uZW50IHNob3VsZCBvdmVyZmxvdyBhbmQgdXNlIGNhbGN1bGF0ZWQgd2lkdGgvaGVpZ2h0LlxuICAgICAgLy8gU2VlIGlzc3VlICM2OCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgICAgdmFyIG91dGVyU3R5bGUgPSB7IG92ZXJmbG93OiAndmlzaWJsZScgfTtcblxuICAgICAgaWYgKCFkaXNhYmxlSGVpZ2h0KSB7XG4gICAgICAgIG91dGVyU3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkaXNhYmxlV2lkdGgpIHtcbiAgICAgICAgb3V0ZXJTdHlsZS53aWR0aCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IHRoaXMuX3NldFJlZixcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgc3R5bGU6IG91dGVyU3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW4oeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJlc2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJlc2l6ZSgpIHtcbiAgICAgIHZhciBvblJlc2l6ZSA9IHRoaXMucHJvcHMub25SZXNpemU7XG5cbiAgICAgIC8vIEdhdXJkIGFnYWluc3QgQXV0b1NpemVyIGNvbXBvbmVudCBiZWluZyByZW1vdmVkIGZyb20gdGhlIERPTSBpbW1lZGlhdGVseSBhZnRlciBiZWluZyBhZGRlZC5cbiAgICAgIC8vIFRoaXMgY2FuIHJlc3VsdCBpbiBpbnZhbGlkIHN0eWxlIHZhbHVlcyB3aGljaCBjYW4gcmVzdWx0IGluIE5hTiB2YWx1ZXMgaWYgd2UgZG9uJ3QgaGFuZGxlIHRoZW0uXG4gICAgICAvLyBTZWUgaXNzdWUgIzE1MCBmb3IgbW9yZSBjb250ZXh0LlxuXG4gICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5fcGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBoZWlnaHQgPSBib3VuZGluZ1JlY3QuaGVpZ2h0IHx8IDA7XG4gICAgICB2YXIgd2lkdGggPSBib3VuZGluZ1JlY3Qud2lkdGggfHwgMDtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9wYXJlbnROb2RlKTtcbiAgICAgIHZhciBwYWRkaW5nTGVmdCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0LCAxMCkgfHwgMDtcbiAgICAgIHZhciBwYWRkaW5nUmlnaHQgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nUmlnaHQsIDEwKSB8fCAwO1xuICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUludChzdHlsZS5wYWRkaW5nVG9wLCAxMCkgfHwgMDtcbiAgICAgIHZhciBwYWRkaW5nQm90dG9tID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0JvdHRvbSwgMTApIHx8IDA7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCAtIHBhZGRpbmdUb3AgLSBwYWRkaW5nQm90dG9tLFxuICAgICAgICB3aWR0aDogd2lkdGggLSBwYWRkaW5nTGVmdCAtIHBhZGRpbmdSaWdodFxuICAgICAgfSk7XG5cbiAgICAgIG9uUmVzaXplKHsgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIFByZXZlbnQgZGV0ZWN0RWxlbWVudFJlc2l6ZSBsaWJyYXJ5IGZyb20gYmVpbmcgdHJpZ2dlcmVkIGJ5IHRoaXMgc2Nyb2xsIGV2ZW50LlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFJlZicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRSZWYoYXV0b1NpemVyKSB7XG4gICAgICAvLyBJbiBjYXNlIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdW5tb3VudGVkXG4gICAgICB0aGlzLl9wYXJlbnROb2RlID0gYXV0b1NpemVyICYmIGF1dG9TaXplci5wYXJlbnROb2RlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBdXRvU2l6ZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BdXRvU2l6ZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBjaGlsZHJlbi5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBoZWlnaHQsIHdpZHRoIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqL1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIERpc2FibGUgZHluYW1pYyA6aGVpZ2h0IHByb3BlcnR5ICovXG4gIGRpc2FibGVIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogRGlzYWJsZSBkeW5hbWljIDp3aWR0aCBwcm9wZXJ0eSAqL1xuICBkaXNhYmxlV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogQ2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbi1yZXNpemU6ICh7IGhlaWdodCwgd2lkdGggfSkgKi9cbiAgb25SZXNpemU6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuQXV0b1NpemVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgb25SZXNpemU6IGZ1bmN0aW9uIG9uUmVzaXplKCkge31cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBBdXRvU2l6ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5BdXRvU2l6ZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQXV0b1NpemVyMiA9IHJlcXVpcmUoJy4vQXV0b1NpemVyJyk7XG5cbnZhciBfQXV0b1NpemVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0F1dG9TaXplcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQXV0b1NpemVyMy5kZWZhdWx0O1xuZXhwb3J0cy5BdXRvU2l6ZXIgPSBfQXV0b1NpemVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX0NvbGxlY3Rpb25WaWV3ID0gcmVxdWlyZSgnLi9Db2xsZWN0aW9uVmlldycpO1xuXG52YXIgX0NvbGxlY3Rpb25WaWV3MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbGxlY3Rpb25WaWV3KTtcblxudmFyIF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhMiA9IHJlcXVpcmUoJy4vdXRpbHMvY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YScpO1xuXG52YXIgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YTIpO1xuXG52YXIgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCcpO1xuXG52YXIgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogUmVuZGVycyBzY2F0dGVyZWQgb3Igbm9uLWxpbmVhciBkYXRhLlxuICogVW5saWtlIEdyaWQsIHdoaWNoIHJlbmRlcnMgY2hlY2tlcmJvYXJkIGRhdGEsIENvbGxlY3Rpb24gY2FuIHJlbmRlciBhcmJpdHJhcmlseSBwb3NpdGlvbmVkLSBldmVuIG92ZXJsYXBwaW5nLSBkYXRhLlxuICovXG5cbnZhciBDb2xsZWN0aW9uID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbGxlY3Rpb24sIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxlY3Rpb24ocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sbGVjdGlvbik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGVjdGlvbikuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX2NlbGxNZXRhZGF0YSA9IFtdO1xuICAgIF90aGlzLl9sYXN0UmVuZGVyZWRDZWxsSW5kaWNlcyA9IFtdO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKiBSZWFjdCBsaWZlY3ljbGUgbWV0aG9kcyAqL1xuXG4gIF9jcmVhdGVDbGFzcyhDb2xsZWN0aW9uLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh0aGlzLnByb3BzLCBbXSk7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfQ29sbGVjdGlvblZpZXcyLmRlZmF1bHQsIF9leHRlbmRzKHtcbiAgICAgICAgY2VsbExheW91dE1hbmFnZXI6IHRoaXMsXG4gICAgICAgIHJlZjogJ0NvbGxlY3Rpb25WaWV3J1xuICAgICAgfSwgcHJvcHMpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG5cbiAgICAvKiogQ2VsbExheW91dE1hbmFnZXIgaW50ZXJmYWNlICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbENvdW50ID0gX3Byb3BzLmNlbGxDb3VudDtcbiAgICAgIHZhciBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyID0gX3Byb3BzLmNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI7XG4gICAgICB2YXIgc2VjdGlvblNpemUgPSBfcHJvcHMuc2VjdGlvblNpemU7XG5cblxuICAgICAgdmFyIGRhdGEgPSAoMCwgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEzLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiBjZWxsQ291bnQsXG4gICAgICAgIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI6IGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIsXG4gICAgICAgIHNlY3Rpb25TaXplOiBzZWN0aW9uU2l6ZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2NlbGxNZXRhZGF0YSA9IGRhdGEuY2VsbE1ldGFkYXRhO1xuICAgICAgdGhpcy5fc2VjdGlvbk1hbmFnZXIgPSBkYXRhLnNlY3Rpb25NYW5hZ2VyO1xuICAgICAgdGhpcy5faGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgICB0aGlzLl93aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbW9zdCByZWNlbnRseSByZW5kZXJlZCBzZXQgb2YgY2VsbCBpbmRpY2VzLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRMYXN0UmVuZGVyZWRJbmRpY2VzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TGFzdFJlbmRlcmVkSW5kaWNlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXN0UmVuZGVyZWRDZWxsSW5kaWNlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtaW5pbXVtIGFtb3VudCBvZiBjaGFuZ2UgZnJvbSB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gdG8gZW5zdXJlIHRoZSBzcGVjaWZpZWQgY2VsbCBpcyAoZnVsbHkpIHZpc2libGUuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFNjcm9sbFBvc2l0aW9uRm9yQ2VsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uRm9yQ2VsbChfcmVmKSB7XG4gICAgICB2YXIgY2VsbEluZGV4ID0gX3JlZi5jZWxsSW5kZXg7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZi5oZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYud2lkdGg7XG4gICAgICB2YXIgY2VsbENvdW50ID0gdGhpcy5wcm9wcy5jZWxsQ291bnQ7XG5cblxuICAgICAgaWYgKGNlbGxJbmRleCA+PSAwICYmIGNlbGxJbmRleCA8IGNlbGxDb3VudCkge1xuICAgICAgICB2YXIgY2VsbE1ldGFkYXRhID0gdGhpcy5fY2VsbE1ldGFkYXRhW2NlbGxJbmRleF07XG5cbiAgICAgICAgc2Nyb2xsTGVmdCA9ICgwLCBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4Mi5kZWZhdWx0KSh7XG4gICAgICAgICAgY2VsbE9mZnNldDogY2VsbE1ldGFkYXRhLngsXG4gICAgICAgICAgY2VsbFNpemU6IGNlbGxNZXRhZGF0YS53aWR0aCxcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHRhcmdldEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsVG9wID0gKDAsIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjZWxsTWV0YWRhdGEueSxcbiAgICAgICAgICBjZWxsU2l6ZTogY2VsbE1ldGFkYXRhLmhlaWdodCxcbiAgICAgICAgICBjb250YWluZXJTaXplOiBoZWlnaHQsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFRvdGFsU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvdGFsU2l6ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogdGhpcy5faGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpcy5fd2lkdGhcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyQ2VsbHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJDZWxscyhfcmVmMikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBoZWlnaHQgPSBfcmVmMi5oZWlnaHQ7XG4gICAgICB2YXIgaXNTY3JvbGxpbmcgPSBfcmVmMi5pc1Njcm9sbGluZztcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYyLndpZHRoO1xuICAgICAgdmFyIHggPSBfcmVmMi54O1xuICAgICAgdmFyIHkgPSBfcmVmMi55O1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNlbGxHcm91cFJlbmRlcmVyID0gX3Byb3BzMi5jZWxsR3JvdXBSZW5kZXJlcjtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSBfcHJvcHMyLmNlbGxSZW5kZXJlcjtcblxuICAgICAgLy8gU3RvcmUgZm9yIGxhdGVyIGNhbGxzIHRvIGdldExhc3RSZW5kZXJlZEluZGljZXMoKVxuXG4gICAgICB0aGlzLl9sYXN0UmVuZGVyZWRDZWxsSW5kaWNlcyA9IHRoaXMuX3NlY3Rpb25NYW5hZ2VyLmdldENlbGxJbmRpY2VzKHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjZWxsR3JvdXBSZW5kZXJlcih7XG4gICAgICAgIGNlbGxSZW5kZXJlcjogY2VsbFJlbmRlcmVyLFxuICAgICAgICBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyOiBmdW5jdGlvbiBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyKGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5fc2VjdGlvbk1hbmFnZXIuZ2V0Q2VsbE1ldGFkYXRhKGluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5kaWNlczogdGhpcy5fbGFzdFJlbmRlcmVkQ2VsbEluZGljZXNcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2xsZWN0aW9uO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQ29sbGVjdGlvbi5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjZWxscyBpbiBDb2xsZWN0aW9uLlxuICAgKi9cbiAgY2VsbENvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBSZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgZ3JvdXAgb2YgY2VsbHMgZ2l2ZW4gdGhlaXIgaW5kaWNlcy5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHtcbiAgICogICBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyOkZ1bmN0aW9uLFxuICAgKiAgIGluZGljZXM6IEFycmF5PG51bWJlcj4sXG4gICAqICAgY2VsbFJlbmRlcmVyOiBGdW5jdGlvblxuICAgKiB9KTogQXJyYXk8UHJvcFR5cGVzLm5vZGU+XG4gICAqL1xuICBjZWxsR3JvdXBSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjZWxsIGdpdmVuIGFuIHJvdyBhbmQgY29sdW1uIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoaW5kZXg6IG51bWJlcik6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICBjZWxsUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHNpemUgYW5kIG9mZnNldC9wb3NpdGlvbiBpbmZvcm1hdGlvbiBmb3IgYSBnaXZlbiBjZWxsIChpbmRleCkuXG4gICAqIChpbmRleCk6IHsgaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyIH1cbiAgICovXG4gIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IG92ZXJyaWRlIHRoZSBzaXplIG9mIHRoZSBzZWN0aW9ucyBhIENvbGxlY3Rpb24ncyBjZWxscyBhcmUgc3BsaXQgaW50by5cbiAgICovXG4gIHNlY3Rpb25TaXplOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlclxufTtcbkNvbGxlY3Rpb24uZGVmYXVsdFByb3BzID0ge1xuICAnYXJpYS1sYWJlbCc6ICdncmlkJyxcbiAgY2VsbEdyb3VwUmVuZGVyZXI6IGRlZmF1bHRDZWxsR3JvdXBSZW5kZXJlclxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbGxlY3Rpb247XG5cblxuZnVuY3Rpb24gZGVmYXVsdENlbGxHcm91cFJlbmRlcmVyKF9yZWYzKSB7XG4gIHZhciBjZWxsUmVuZGVyZXIgPSBfcmVmMy5jZWxsUmVuZGVyZXI7XG4gIHZhciBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyID0gX3JlZjMuY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjtcbiAgdmFyIGluZGljZXMgPSBfcmVmMy5pbmRpY2VzO1xuXG4gIHJldHVybiBpbmRpY2VzLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICB2YXIgY2VsbE1ldGFkYXRhID0gY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcihpbmRleCk7XG4gICAgdmFyIHJlbmRlcmVkQ2VsbCA9IGNlbGxSZW5kZXJlcihpbmRleCk7XG5cbiAgICBpZiAocmVuZGVyZWRDZWxsID09IG51bGwgfHwgcmVuZGVyZWRDZWxsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogJ0NvbGxlY3Rpb25fX2NlbGwnLFxuICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGhlaWdodDogY2VsbE1ldGFkYXRhLmhlaWdodCxcbiAgICAgICAgICBsZWZ0OiBjZWxsTWV0YWRhdGEueCxcbiAgICAgICAgICB0b3A6IGNlbGxNZXRhZGF0YS55LFxuICAgICAgICAgIHdpZHRoOiBjZWxsTWV0YWRhdGEud2lkdGhcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICk7XG4gIH0pLmZpbHRlcihmdW5jdGlvbiAocmVuZGVyZWRDZWxsKSB7XG4gICAgcmV0dXJuICEhcmVuZGVyZWRDZWxsO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplciA9IHJlcXVpcmUoJy4uL3V0aWxzL2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXInKTtcblxudmFyIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIpO1xuXG52YXIgX3Njcm9sbGJhclNpemUgPSByZXF1aXJlKCdkb20taGVscGVycy91dGlsL3Njcm9sbGJhclNpemUnKTtcblxudmFyIF9zY3JvbGxiYXJTaXplMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njcm9sbGJhclNpemUpO1xuXG52YXIgX3JhZiA9IHJlcXVpcmUoJ3JhZicpO1xuXG52YXIgX3JhZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yYWYpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vLyBAVE9ETyBJdCB3b3VsZCBiZSBuaWNlIHRvIHJlZmFjdG9yIEdyaWQgdG8gdXNlIHRoaXMgY29kZSBhcyB3ZWxsLlxuXG4vKipcbiAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIG1pbGlzZWNvbmRzIGR1cmluZyB3aGljaCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICogVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgbWFrZXMgc2Nyb2xsaW5nIHNtb290aGVyLlxuICovXG52YXIgSVNfU0NST0xMSU5HX1RJTUVPVVQgPSAxNTA7XG5cbi8qKlxuICogQ29udHJvbHMgd2hldGhlciB0aGUgR3JpZCB1cGRhdGVzIHRoZSBET00gZWxlbWVudCdzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlIG9yIGp1c3Qgb2JzZXJ2ZXMgaXQuXG4gKiBUaGlzIHByZXZlbnRzIEdyaWQgZnJvbSBpbnRlcnJ1cHRpbmcgbW91c2Utd2hlZWwgYW5pbWF0aW9ucyAoc2VlIGlzc3VlICMyKS5cbiAqL1xudmFyIFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUyA9IHtcbiAgT0JTRVJWRUQ6ICdvYnNlcnZlZCcsXG4gIFJFUVVFU1RFRDogJ3JlcXVlc3RlZCdcbn07XG5cbi8qKlxuICogTW9uaXRvcnMgY2hhbmdlcyBpbiBwcm9wZXJ0aWVzIChlZy4gY2VsbENvdW50KSBhbmQgc3RhdGUgKGVnLiBzY3JvbGwgb2Zmc2V0cykgdG8gZGV0ZXJtaW5lIHdoZW4gcmVuZGVyaW5nIG5lZWRzIHRvIG9jY3VyLlxuICogVGhpcyBjb21wb25lbnQgZG9lcyBub3QgcmVuZGVyIGFueSB2aXNpYmxlIGNvbnRlbnQgaXRzZWxmOyBpdCBkZWZlcnMgdG8gdGhlIHNwZWNpZmllZCA6Y2VsbExheW91dE1hbmFnZXIuXG4gKi9cblxudmFyIENvbGxlY3Rpb25WaWV3ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbGxlY3Rpb25WaWV3LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBDb2xsZWN0aW9uVmlldyhwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xsZWN0aW9uVmlldyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sbGVjdGlvblZpZXcpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YU9uTmV4dFVwZGF0ZTogZmFsc2UsXG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfTtcblxuICAgIC8vIEludm9rZXMgY2FsbGJhY2tzIG9ubHkgd2hlbiB0aGVpciB2YWx1ZXMgaGF2ZSBjaGFuZ2VkLlxuICAgIF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZE1lbW9pemVyID0gKDAsIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMi5kZWZhdWx0KSgpO1xuICAgIF90aGlzLl9vblNjcm9sbE1lbW9pemVyID0gKDAsIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMi5kZWZhdWx0KShmYWxzZSk7XG5cbiAgICAvLyBCaW5kIGZ1bmN0aW9ucyB0byBpbnN0YW5jZSBzbyB0aGV5IGRvbid0IGxvc2UgY29udGV4dCB3aGVuIHBhc3NlZCBhcm91bmQuXG4gICAgX3RoaXMuX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyID0gX3RoaXMuX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwgPSBfdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlZCByZWNvbXB1dGUgb2YgY2VsbCBzaXplcyBhbmQgcG9zaXRpb25zLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgaWYgY2VsbCBzaXplcyBoYXZlIGNoYW5nZWQgYnV0IG5vdGhpbmcgZWxzZSBoYXMuXG4gICAqIFNpbmNlIGNlbGwgcG9zaXRpb25zIGFyZSBjYWxjdWxhdGVkIGJ5IGNhbGxiYWNrcywgdGhlIGNvbGxlY3Rpb24gdmlldyBoYXMgbm8gd2F5IG9mIGRldGVjdGluZyB3aGVuIHRoZSB1bmRlcmx5aW5nIGRhdGEgaGFzIGNoYW5nZWQuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENvbGxlY3Rpb25WaWV3LCBbe1xuICAgIGtleTogJ3JlY29tcHV0ZUNlbGxTaXplc0FuZFBvc2l0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZUNlbGxTaXplc0FuZFBvc2l0aW9ucygpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIENvbXBvbmVudCBsaWZlY3ljbGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsTGF5b3V0TWFuYWdlciA9IF9wcm9wcy5jZWxsTGF5b3V0TWFuYWdlcjtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3Byb3BzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9DZWxsID0gX3Byb3BzLnNjcm9sbFRvQ2VsbDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIHRoaXMuX3Njcm9sbGJhclNpemUgPSAoMCwgX3Njcm9sbGJhclNpemUyLmRlZmF1bHQpKCk7XG5cbiAgICAgIGlmIChzY3JvbGxUb0NlbGwgPj0gMCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCgpO1xuICAgICAgfSBlbHNlIGlmIChzY3JvbGxMZWZ0ID49IDAgfHwgc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oeyBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIG9uU2VjdGlvblJlbmRlcmVkIGNhbGxiYWNrLlxuICAgICAgdGhpcy5faW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIoKTtcblxuICAgICAgdmFyIF9jZWxsTGF5b3V0TWFuYWdlciRnZSA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfY2VsbExheW91dE1hbmFnZXIkZ2UuaGVpZ2h0O1xuICAgICAgdmFyIHRvdGFsV2lkdGggPSBfY2VsbExheW91dE1hbmFnZXIkZ2Uud2lkdGg7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgb25TY3JvbGwgY2FsbGJhY2suXG5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0IHx8IDAsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wIHx8IDAsXG4gICAgICAgIHRvdGFsSGVpZ2h0OiB0b3RhbEhlaWdodCxcbiAgICAgICAgdG90YWxXaWR0aDogdG90YWxXaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMi5oZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsVG9DZWxsID0gX3Byb3BzMi5zY3JvbGxUb0NlbGw7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMyLndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZS5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID0gX3N0YXRlLnNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZS5zY3JvbGxUb3A7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSByZXF1ZXN0ZWQgY2hhbmdlcyB0byA6c2Nyb2xsTGVmdCBvciA6c2Nyb2xsVG9wIGdldCBhcHBsaWVkLlxuICAgICAgLy8gQXNzaWduaW5nIHRvIHNjcm9sbExlZnQvc2Nyb2xsVG9wIHRlbGxzIHRoZSBicm93c2VyIHRvIGludGVycnVwdCBhbnkgcnVubmluZyBzY3JvbGwgYW5pbWF0aW9ucyxcbiAgICAgIC8vIEFuZCB0byBkaXNjYXJkIGFueSBwZW5kaW5nIGFzeW5jIGNoYW5nZXMgdG8gdGhlIHNjcm9sbCBwb3NpdGlvbiB0aGF0IG1heSBoYXZlIGhhcHBlbmVkIGluIHRoZSBtZWFudGltZSAoZS5nLiBvbiBhIHNlcGFyYXRlIHNjcm9sbGluZyB0aHJlYWQpLlxuICAgICAgLy8gU28gd2Ugb25seSBzZXQgdGhlc2Ugd2hlbiB3ZSByZXF1aXJlIGFuIGFkanVzdG1lbnQgb2YgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjMiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID09PSBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEKSB7XG4gICAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDAgJiYgc2Nyb2xsTGVmdCAhPT0gcHJldlN0YXRlLnNjcm9sbExlZnQgJiYgc2Nyb2xsTGVmdCAhPT0gdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nyb2xsVG9wID49IDAgJiYgc2Nyb2xsVG9wICE9PSBwcmV2U3RhdGUuc2Nyb2xsVG9wICYmIHNjcm9sbFRvcCAhPT0gdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxUb3ApIHtcbiAgICAgICAgICB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgc2Nyb2xsIG9mZnNldHMgaWYgdGhlIGN1cnJlbnQgOnNjcm9sbFRvQ2VsbCB2YWx1ZXMgcmVxdWlyZXMgaXRcbiAgICAgIGlmIChoZWlnaHQgIT09IHByZXZQcm9wcy5oZWlnaHQgfHwgc2Nyb2xsVG9DZWxsICE9PSBwcmV2UHJvcHMuc2Nyb2xsVG9DZWxsIHx8IHdpZHRoICE9PSBwcmV2UHJvcHMud2lkdGgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIG9uUm93c1JlbmRlcmVkIGNhbGxiYWNrIGlmIHN0YXJ0L3N0b3AgaW5kaWNlcyBoYXZlIGNoYW5nZWRcbiAgICAgIHRoaXMuX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgdmFyIGNlbGxMYXlvdXRNYW5hZ2VyID0gdGhpcy5wcm9wcy5jZWxsTGF5b3V0TWFuYWdlcjtcblxuXG4gICAgICBjZWxsTGF5b3V0TWFuYWdlci5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBFbXB0eSBjb250ZW50ICgwIHJvd3Mgb3IgY29sdW1ucylcbiAgICAgKiAyKSBOZXcgc2Nyb2xsIHByb3BzIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiAzKSBDZWxscy1jb3VudCBvciBjZWxscy1zaXplIGhhcyBjaGFuZ2VkLCBtYWtpbmcgcHJldmlvdXMgc2Nyb2xsIG9mZnNldHMgaW52YWxpZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgaWYgKG5leHRQcm9wcy5jZWxsQ291bnQgPT09IDAgJiYgKG5leHRTdGF0ZS5zY3JvbGxMZWZ0ICE9PSAwIHx8IG5leHRTdGF0ZS5zY3JvbGxUb3AgIT09IDApKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFByb3BzLnNjcm9sbExlZnQgIT09IHRoaXMucHJvcHMuc2Nyb2xsTGVmdCB8fCBuZXh0UHJvcHMuc2Nyb2xsVG9wICE9PSB0aGlzLnByb3BzLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogbmV4dFByb3BzLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBuZXh0UHJvcHMuc2Nyb2xsVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dFByb3BzLmNlbGxDb3VudCAhPT0gdGhpcy5wcm9wcy5jZWxsQ291bnQgfHwgbmV4dFByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyICE9PSB0aGlzLnByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyIHx8IG5leHRTdGF0ZS5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlKSB7XG4gICAgICAgIG5leHRQcm9wcy5jZWxsTGF5b3V0TWFuYWdlci5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0U3RhdGUuY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YU9uTmV4dFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHMzLmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wczMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczMuaGVpZ2h0O1xuICAgICAgdmFyIG5vQ29udGVudFJlbmRlcmVyID0gX3Byb3BzMy5ub0NvbnRlbnRSZW5kZXJlcjtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczMud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlMiA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgaXNTY3JvbGxpbmcgPSBfc3RhdGUyLmlzU2Nyb2xsaW5nO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUyLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlMi5zY3JvbGxUb3A7XG5cblxuICAgICAgdmFyIGNoaWxkcmVuVG9EaXNwbGF5ID0gaGVpZ2h0ID4gMCAmJiB3aWR0aCA+IDAgPyBjZWxsTGF5b3V0TWFuYWdlci5yZW5kZXJDZWxscyh7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICBpc1Njcm9sbGluZzogaXNTY3JvbGxpbmcsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgeDogc2Nyb2xsTGVmdCxcbiAgICAgICAgeTogc2Nyb2xsVG9wXG4gICAgICB9KSA6IFtdO1xuXG4gICAgICB2YXIgX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMiA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfY2VsbExheW91dE1hbmFnZXIkZ2UyLmhlaWdodDtcbiAgICAgIHZhciB0b3RhbFdpZHRoID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMi53aWR0aDtcblxuXG4gICAgICB2YXIgZ3JpZFN0eWxlID0ge1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9O1xuXG4gICAgICAvLyBGb3JjZSBicm93c2VyIHRvIGhpZGUgc2Nyb2xsYmFycyB3aGVuIHdlIGtub3cgdGhleSBhcmVuJ3QgbmVjZXNzYXJ5LlxuICAgICAgLy8gT3RoZXJ3aXNlIG9uY2Ugc2Nyb2xsYmFycyBhcHBlYXIgdGhleSBtYXkgbm90IGRpc2FwcGVhciBhZ2Fpbi5cbiAgICAgIC8vIEZvciBtb3JlIGluZm8gc2VlIGlzc3VlICMxMTZcbiAgICAgIGlmICh0b3RhbEhlaWdodCA8PSBoZWlnaHQpIHtcbiAgICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgICAgaWYgKHRvdGFsV2lkdGggPD0gd2lkdGgpIHtcbiAgICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgcmVmOiAnc2Nyb2xsaW5nQ29udGFpbmVyJyxcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0NvbGxlY3Rpb24nLCBjbGFzc05hbWUpLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICByb2xlOiAnZ3JpZCcsXG4gICAgICAgICAgc3R5bGU6IGdyaWRTdHlsZSxcbiAgICAgICAgICB0YWJJbmRleDogMFxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlblRvRGlzcGxheS5sZW5ndGggPiAwICYmIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NvbGxlY3Rpb25fX2lubmVyU2Nyb2xsQ29udGFpbmVyJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGhlaWdodDogdG90YWxIZWlnaHQsXG4gICAgICAgICAgICAgIG1heEhlaWdodDogdG90YWxIZWlnaHQsXG4gICAgICAgICAgICAgIG1heFdpZHRoOiB0b3RhbFdpZHRoLFxuICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc1Njcm9sbGluZyA/ICdub25lJyA6ICdhdXRvJyxcbiAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCAmJiBub0NvbnRlbnRSZW5kZXJlcigpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGVscGVyIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiA6aXNTY3JvbGxpbmcgZmxhZyBmb3IgYSBzbWFsbCB3aW5kb3cgb2YgdGltZS5cbiAgICAgKiBUaGlzIGZsYWcgaXMgdXNlZCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIG9uIHRoZSBzY3JvbGxhYmxlIHBvcnRpb24gb2YgdGhlIENvbGxlY3Rpb24uXG4gICAgICogVGhpcyBwcmV2ZW50cyBqZXJreS9zdHV0dGVyeSBtb3VzZS13aGVlbCBzY3JvbGxpbmcuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSwgSVNfU0NST0xMSU5HX1RJTUVPVVQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPblNlY3Rpb25SZW5kZXJlZEhlbHBlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbnZva2VPblNlY3Rpb25SZW5kZXJlZEhlbHBlcigpIHtcbiAgICAgIHZhciBfcHJvcHM0ID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsTGF5b3V0TWFuYWdlciA9IF9wcm9wczQuY2VsbExheW91dE1hbmFnZXI7XG4gICAgICB2YXIgb25TZWN0aW9uUmVuZGVyZWQgPSBfcHJvcHM0Lm9uU2VjdGlvblJlbmRlcmVkO1xuXG5cbiAgICAgIHRoaXMuX29uU2VjdGlvblJlbmRlcmVkTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogb25TZWN0aW9uUmVuZGVyZWQsXG4gICAgICAgIGluZGljZXM6IGNlbGxMYXlvdXRNYW5hZ2VyLmdldExhc3RSZW5kZXJlZEluZGljZXMoKVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25TY3JvbGxNZW1vaXplcihfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfcmVmLnRvdGFsSGVpZ2h0O1xuICAgICAgdmFyIHRvdGFsV2lkdGggPSBfcmVmLnRvdGFsV2lkdGg7XG5cbiAgICAgIHRoaXMuX29uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soX3JlZjIpIHtcbiAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYyLnNjcm9sbExlZnQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYyLnNjcm9sbFRvcDtcbiAgICAgICAgICB2YXIgX3Byb3BzNSA9IF90aGlzMy5wcm9wcztcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNS5oZWlnaHQ7XG4gICAgICAgICAgdmFyIG9uU2Nyb2xsID0gX3Byb3BzNS5vblNjcm9sbDtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcHJvcHM1LndpZHRoO1xuXG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aDogdG90YWxXaWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiB7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSBkdXJpbmcgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lLlxuICAgICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhdm9pZCBtdWx0aXBsZSByZW5kZXJzIGluIGEgc21hbGwgc3BhbiBvZiB0aW1lLlxuICAgICAqIFRoaXMgaGVscHMgcGVyZm9ybWFuY2UgZm9yIGJ1cnN0eSBldmVudHMgKGxpa2Ugb25TY3JvbGwpLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0TmV4dFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldE5leHRTdGF0ZShzdGF0ZSkge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIF9yYWYyLmRlZmF1bHQuY2FuY2VsKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gKDAsIF9yYWYyLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM0Ll9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICAgICAgX3RoaXM0LnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxQb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxQb3NpdGlvbihfcmVmMykge1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYzLnNjcm9sbFRvcDtcblxuICAgICAgdmFyIG5ld1N0YXRlID0ge1xuICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRFxuICAgICAgfTtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCkge1xuICAgICAgICBuZXdTdGF0ZS5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnN0YXRlLnNjcm9sbExlZnQgfHwgc2Nyb2xsVG9wID49IDAgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnN0YXRlLnNjcm9sbFRvcCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsUG9zaXRpb25Gb3JTY3JvbGxUb0NlbGwoKSB7XG4gICAgICB2YXIgX3Byb3BzNiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHM2LmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczYuaGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbFRvQ2VsbCA9IF9wcm9wczYuc2Nyb2xsVG9DZWxsO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNi53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUzID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlMy5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZTMuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIGlmIChzY3JvbGxUb0NlbGwgPj0gMCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSBjZWxsTGF5b3V0TWFuYWdlci5nZXRTY3JvbGxQb3NpdGlvbkZvckNlbGwoe1xuICAgICAgICAgIGNlbGxJbmRleDogc2Nyb2xsVG9DZWxsLFxuICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbi5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0IHx8IHNjcm9sbFBvc2l0aW9uLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oc2Nyb2xsUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAvLyBJbiBjZXJ0YWluIGVkZ2UtY2FzZXMgUmVhY3QgZGlzcGF0Y2hlcyBhbiBvblNjcm9sbCBldmVudCB3aXRoIGFuIGludmFsaWQgdGFyZ2V0LnNjcm9sbExlZnQgLyB0YXJnZXQuc2Nyb2xsVG9wLlxuICAgICAgLy8gVGhpcyBpbnZhbGlkIGV2ZW50IGNhbiBiZSBkZXRlY3RlZCBieSBjb21wYXJpbmcgZXZlbnQudGFyZ2V0IHRvIHRoaXMgY29tcG9uZW50J3Mgc2Nyb2xsYWJsZSBET00gZWxlbWVudC5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjNDA0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgcG9pbnRlciBldmVudHMgZnJvbSBpbnRlcnJ1cHRpbmcgYSBzbW9vdGggc2Nyb2xsXG4gICAgICB0aGlzLl9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpO1xuXG4gICAgICAvLyBXaGVuIHRoaXMgY29tcG9uZW50IGlzIHNocnVuayBkcmFzdGljYWxseSwgUmVhY3QgZGlzcGF0Y2hlcyBhIHNlcmllcyBvZiBiYWNrLXRvLWJhY2sgc2Nyb2xsIGV2ZW50cyxcbiAgICAgIC8vIEdyYWR1YWxseSBjb252ZXJnaW5nIG9uIGEgc2Nyb2xsVG9wIHRoYXQgaXMgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIG5ldywgc21hbGxlciBoZWlnaHQuXG4gICAgICAvLyBUaGlzIGNhdXNlcyBhIHNlcmllcyBvZiByYXBpZCByZW5kZXJzIHRoYXQgaXMgc2xvdyBmb3IgbG9uZyBsaXN0cy5cbiAgICAgIC8vIFdlIGNhbiBhdm9pZCB0aGF0IGJ5IGRvaW5nIHNvbWUgc2ltcGxlIGJvdW5kcyBjaGVja2luZyB0byBlbnN1cmUgdGhhdCBzY3JvbGxUb3AgbmV2ZXIgZXhjZWVkcyB0aGUgdG90YWwgaGVpZ2h0LlxuICAgICAgdmFyIF9wcm9wczcgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNlbGxMYXlvdXRNYW5hZ2VyID0gX3Byb3BzNy5jZWxsTGF5b3V0TWFuYWdlcjtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHM3LmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczcud2lkdGg7XG5cbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gdGhpcy5fc2Nyb2xsYmFyU2l6ZTtcblxuICAgICAgdmFyIF9jZWxsTGF5b3V0TWFuYWdlciRnZTMgPSBjZWxsTGF5b3V0TWFuYWdlci5nZXRUb3RhbFNpemUoKTtcblxuICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMy5oZWlnaHQ7XG4gICAgICB2YXIgdG90YWxXaWR0aCA9IF9jZWxsTGF5b3V0TWFuYWdlciRnZTMud2lkdGg7XG5cbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gTWF0aC5taW4odG90YWxXaWR0aCAtIHdpZHRoICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IE1hdGgubWluKHRvdGFsSGVpZ2h0IC0gaGVpZ2h0ICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCk7XG5cbiAgICAgIC8vIENlcnRhaW4gZGV2aWNlcyAobGlrZSBBcHBsZSB0b3VjaHBhZCkgcmFwaWQtZmlyZSBkdXBsaWNhdGUgZXZlbnRzLlxuICAgICAgLy8gRG9uJ3QgZm9yY2UgYSByZS1yZW5kZXIgaWYgdGhpcyBpcyB0aGUgY2FzZS5cbiAgICAgIC8vIFRoZSBtb3VzZSBtYXkgbW92ZSBmYXN0ZXIgdGhlbiB0aGUgYW5pbWF0aW9uIGZyYW1lIGRvZXMuXG4gICAgICAvLyBVc2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRvIGF2b2lkIG92ZXItdXBkYXRpbmcuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0IHx8IHRoaXMuc3RhdGUuc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgd2l0aCBjYW5jZWxhYmxlIHNjcm9sbCBldmVudHMgKGVnLiBGaXJlZm94KSBpbnRlcnJ1cHQgc2Nyb2xsaW5nIGFuaW1hdGlvbnMgaWYgc2Nyb2xsVG9wL3Njcm9sbExlZnQgaXMgc2V0LlxuICAgICAgICAvLyBPdGhlciBicm93c2VycyAoZWcuIFNhZmFyaSkgZG9uJ3Qgc2Nyb2xsIGFzIHdlbGwgd2l0aG91dCB0aGUgaGVscCB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMgKERPTSBvciBzdHlsZSBjaGFuZ2VzIGR1cmluZyBzY3JvbGxpbmcpLlxuICAgICAgICAvLyBBbGwgdGhpbmdzIGNvbnNpZGVyZWQsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIGJlc3QgY3VycmVudCB3b3JrIGFyb3VuZCB0aGF0IEknbSBhd2FyZSBvZi5cbiAgICAgICAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkL3B1bGwvMTI0XG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IGV2ZW50LmNhbmNlbGFibGUgPyBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuT0JTRVJWRUQgOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEO1xuXG4gICAgICAgIC8vIFN5bmNocm9ub3VzbHkgc2V0IDppc1Njcm9sbGluZyB0aGUgZmlyc3QgdGltZSAoc2luY2UgX3NldE5leHRTdGF0ZSB3aWxsIHJlc2NoZWR1bGUgaXRzIGFuaW1hdGlvbiBmcmFtZSBlYWNoIHRpbWUgaXQncyBjYWxsZWQpXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Njcm9sbGluZykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NldE5leHRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjogc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24sXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgdG90YWxXaWR0aDogdG90YWxXaWR0aCxcbiAgICAgICAgdG90YWxIZWlnaHQ6IHRvdGFsSGVpZ2h0XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sbGVjdGlvblZpZXc7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Db2xsZWN0aW9uVmlldy5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjZWxscyBpbiBjb2xsZWN0aW9uLlxuICAgKi9cbiAgY2VsbENvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGNlbGwgc2l6ZXMgYW5kIHBvc2l0aW9ucyBhbmQgbWFuYWdlcyByZW5kZXJpbmcgdGhlIGFwcHJvcHJpYXRlIGNlbGxzIGdpdmVuIGEgc3BlY2lmaWVkIHdpbmRvdy5cbiAgICovXG4gIGNlbGxMYXlvdXRNYW5hZ2VyOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjdXN0b20gQ1NTIGNsYXNzIG5hbWUgdG8gYXR0YWNoIHRvIHJvb3QgQ29sbGVjdGlvbiBlbGVtZW50LlxuICAgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIENvbGxlY3Rpb247IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSByb3dzLlxuICAgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiBlaXRoZXIgOnJvd3NDb3VudCBvciA6Y2VsbENvdW50IGlzIDAuXG4gICAqL1xuICBub0NvbnRlbnRSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGgsIHNjcm9sbEhlaWdodCwgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlY3Rpb24gb2YgdGhlIENvbGxlY3Rpb24gdGhhdCB3YXMganVzdCByZW5kZXJlZC5cbiAgICogVGhpcyBjYWxsYmFjayBpcyBwYXNzZWQgYW4gYXJyYXkgb2YgdGhlIG1vc3QgcmVjZW50bHkgcmVuZGVyZWQgc2VjdGlvbiBpbmRpY2VzLlxuICAgKi9cbiAgb25TZWN0aW9uUmVuZGVyZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIG9mZnNldC5cbiAgICovXG4gIHNjcm9sbExlZnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBDZWxsIGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpLlxuICAgKi9cbiAgc2Nyb2xsVG9DZWxsOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogVmVydGljYWwgb2Zmc2V0LlxuICAgKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogV2lkdGggb2YgQ29sbGVjdGlvbjsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIGNvbHVtbnMuXG4gICAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkNvbGxlY3Rpb25WaWV3LmRlZmF1bHRQcm9wcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiAnZ3JpZCcsXG4gIG5vQ29udGVudFJlbmRlcmVyOiBmdW5jdGlvbiBub0NvbnRlbnRSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDb2xsZWN0aW9uVmlldzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQSBzZWN0aW9uIG9mIHRoZSBXaW5kb3cuXG4gKiBXaW5kb3cgU2VjdGlvbnMgYXJlIHVzZWQgdG8gZ3JvdXAgbmVhcmJ5IGNlbGxzLlxuICogVGhpcyBlbmFibGVzIHVzIHRvIG1vcmUgcXVpY2tseSBkZXRlcm1pbmUgd2hpY2ggY2VsbHMgdG8gZGlzcGxheSBpbiBhIGdpdmVuIHJlZ2lvbiBvZiB0aGUgV2luZG93LlxuICogU2VjdGlvbnMgaGF2ZSBhIGZpeGVkIHNpemUgYW5kIGNvbnRhaW4gMCB0byBtYW55IGNlbGxzICh0cmFja2VkIGJ5IHRoZWlyIGluZGljZXMpLlxuICovXG5cbnZhciBTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZWN0aW9uKF9yZWYpIHtcbiAgICB2YXIgaGVpZ2h0ID0gX3JlZi5oZWlnaHQ7XG4gICAgdmFyIHdpZHRoID0gX3JlZi53aWR0aDtcbiAgICB2YXIgeCA9IF9yZWYueDtcbiAgICB2YXIgeSA9IF9yZWYueTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZWN0aW9uKTtcblxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG5cbiAgICB0aGlzLl9pbmRleE1hcCA9IHt9O1xuICAgIHRoaXMuX2luZGljZXMgPSBbXTtcbiAgfVxuXG4gIC8qKiBBZGQgYSBjZWxsIHRvIHRoaXMgc2VjdGlvbi4gKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhTZWN0aW9uLCBbe1xuICAgIGtleTogJ2FkZENlbGxJbmRleCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENlbGxJbmRleChpbmRleCkge1xuICAgICAgaWYgKCF0aGlzLl9pbmRleE1hcFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5faW5kZXhNYXBbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBjZWxsIGluZGljZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhpcyBzZWN0aW9uLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDZWxsSW5kaWNlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxJbmRpY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgfVxuXG4gICAgLyoqIEludGVuZGVkIGZvciBkZWJ1Z2dlci90ZXN0IHB1cnBvc2VzIG9ubHkgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnggKyAnLCcgKyB0aGlzLnkgKyAnICcgKyB0aGlzLndpZHRoICsgJ3gnICsgdGhpcy5oZWlnaHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNlY3Rpb247XG59KCk7IC8qKiBAcmxvdyAqL1xuXG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY3Rpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpOyAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBXaW5kb3cgU2VjdGlvbnMgYXJlIHVzZWQgdG8gZ3JvdXAgbmVhcmJ5IGNlbGxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFRoaXMgZW5hYmxlcyB1cyB0byBtb3JlIHF1aWNrbHkgZGV0ZXJtaW5lIHdoaWNoIGNlbGxzIHRvIGRpc3BsYXkgaW4gYSBnaXZlbiByZWdpb24gb2YgdGhlIFdpbmRvdy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuXG52YXIgX1NlY3Rpb24gPSByZXF1aXJlKCcuL1NlY3Rpb24nKTtcblxudmFyIF9TZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU0VDVElPTl9TSVpFID0gMTAwO1xuXG4vKipcbiAqIENvbnRhaW5zIDAgdG8gbWFueSBTZWN0aW9ucy5cbiAqIEdyb3dzIChhbmQgYWRkcyBTZWN0aW9ucykgZHluYW1pY2FsbHkgYXMgY2VsbHMgYXJlIHJlZ2lzdGVyZWQuXG4gKiBBdXRvbWF0aWNhbGx5IGFkZHMgY2VsbHMgdG8gdGhlIGFwcHJvcHJpYXRlIFNlY3Rpb24ocykuXG4gKi9cblxudmFyIFNlY3Rpb25NYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZWN0aW9uTWFuYWdlcigpIHtcbiAgICB2YXIgc2VjdGlvblNpemUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBTRUNUSU9OX1NJWkUgOiBhcmd1bWVudHNbMF07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2VjdGlvbk1hbmFnZXIpO1xuXG4gICAgdGhpcy5fc2VjdGlvblNpemUgPSBzZWN0aW9uU2l6ZTtcblxuICAgIHRoaXMuX2NlbGxNZXRhZGF0YSA9IFtdO1xuICAgIHRoaXMuX3NlY3Rpb25zID0ge307XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgY2VsbCBpbmRpY2VzIGNvbnRhaW5lZCBpbiB0aGUgc3BlY2lmaWVkIHJlZ2lvbi5cbiAgICogQSByZWdpb24gbWF5IGVuY29tcGFzcyAxIG9yIG1vcmUgU2VjdGlvbnMuXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFNlY3Rpb25NYW5hZ2VyLCBbe1xuICAgIGtleTogJ2dldENlbGxJbmRpY2VzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbEluZGljZXMoX3JlZikge1xuICAgICAgdmFyIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3JlZi53aWR0aDtcbiAgICAgIHZhciB4ID0gX3JlZi54O1xuICAgICAgdmFyIHkgPSBfcmVmLnk7XG5cbiAgICAgIHZhciBpbmRpY2VzID0ge307XG5cbiAgICAgIHRoaXMuZ2V0U2VjdGlvbnMoeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoLCB4OiB4LCB5OiB5IH0pLmZvckVhY2goZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uZ2V0Q2VsbEluZGljZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgIHJldHVybiBpbmRpY2VzW2luZGV4XSA9IGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBPYmplY3Qga2V5cyBhcmUgc3RyaW5nczsgdGhpcyBmdW5jdGlvbiByZXR1cm5zIG51bWJlcnNcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpbmRpY2VzKS5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRpY2VzW2luZGV4XTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZXQgc2l6ZSBhbmQgcG9zaXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBjZWxsIHNwZWNpZmllZC4gKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2VsbE1ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbE1ldGFkYXRhKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2VsbE1ldGFkYXRhW2luZGV4XTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBTZWN0aW9ucyBvdmVybGFwcGluZyB0aGUgc3BlY2lmaWVkIHJlZ2lvbi4gKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2VjdGlvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTZWN0aW9ucyhfcmVmMikge1xuICAgICAgdmFyIGhlaWdodCA9IF9yZWYyLmhlaWdodDtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYyLndpZHRoO1xuICAgICAgdmFyIHggPSBfcmVmMi54O1xuICAgICAgdmFyIHkgPSBfcmVmMi55O1xuXG4gICAgICB2YXIgc2VjdGlvblhTdGFydCA9IE1hdGguZmxvb3IoeCAvIHRoaXMuX3NlY3Rpb25TaXplKTtcbiAgICAgIHZhciBzZWN0aW9uWFN0b3AgPSBNYXRoLmZsb29yKCh4ICsgd2lkdGggLSAxKSAvIHRoaXMuX3NlY3Rpb25TaXplKTtcbiAgICAgIHZhciBzZWN0aW9uWVN0YXJ0ID0gTWF0aC5mbG9vcih5IC8gdGhpcy5fc2VjdGlvblNpemUpO1xuICAgICAgdmFyIHNlY3Rpb25ZU3RvcCA9IE1hdGguZmxvb3IoKHkgKyBoZWlnaHQgLSAxKSAvIHRoaXMuX3NlY3Rpb25TaXplKTtcblxuICAgICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICAgIGZvciAodmFyIHNlY3Rpb25YID0gc2VjdGlvblhTdGFydDsgc2VjdGlvblggPD0gc2VjdGlvblhTdG9wOyBzZWN0aW9uWCsrKSB7XG4gICAgICAgIGZvciAodmFyIHNlY3Rpb25ZID0gc2VjdGlvbllTdGFydDsgc2VjdGlvblkgPD0gc2VjdGlvbllTdG9wOyBzZWN0aW9uWSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IHNlY3Rpb25YICsgJy4nICsgc2VjdGlvblk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX3NlY3Rpb25zW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlY3Rpb25zW2tleV0gPSBuZXcgX1NlY3Rpb24yLmRlZmF1bHQoe1xuICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX3NlY3Rpb25TaXplLFxuICAgICAgICAgICAgICB3aWR0aDogdGhpcy5fc2VjdGlvblNpemUsXG4gICAgICAgICAgICAgIHg6IHNlY3Rpb25YICogdGhpcy5fc2VjdGlvblNpemUsXG4gICAgICAgICAgICAgIHk6IHNlY3Rpb25ZICogdGhpcy5fc2VjdGlvblNpemVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlY3Rpb25zLnB1c2godGhpcy5fc2VjdGlvbnNba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlY3Rpb25zO1xuICAgIH1cblxuICAgIC8qKiBUb3RhbCBudW1iZXIgb2YgU2VjdGlvbnMgYmFzZWQgb24gdGhlIGN1cnJlbnRseSByZWdpc3RlcmVkIGNlbGxzLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUb3RhbFNlY3Rpb25Db3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvdGFsU2VjdGlvbkNvdW50KCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NlY3Rpb25zKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqIEludGVuZGVkIGZvciBkZWJ1Z2dlci90ZXN0IHB1cnBvc2VzIG9ubHkgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zZWN0aW9ucykubWFwKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuX3NlY3Rpb25zW2luZGV4XS50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEFkZHMgYSBjZWxsIHRvIHRoZSBhcHByb3ByaWF0ZSBTZWN0aW9ucyBhbmQgcmVnaXN0ZXJzIGl0IG1ldGFkYXRhIGZvciBsYXRlciByZXRyaWV2YWJsZS4gKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVnaXN0ZXJDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJDZWxsKF9yZWYzKSB7XG4gICAgICB2YXIgY2VsbE1ldGFkYXR1bSA9IF9yZWYzLmNlbGxNZXRhZGF0dW07XG4gICAgICB2YXIgaW5kZXggPSBfcmVmMy5pbmRleDtcblxuICAgICAgdGhpcy5fY2VsbE1ldGFkYXRhW2luZGV4XSA9IGNlbGxNZXRhZGF0dW07XG5cbiAgICAgIHRoaXMuZ2V0U2VjdGlvbnMoY2VsbE1ldGFkYXR1bSkuZm9yRWFjaChmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VjdGlvbi5hZGRDZWxsSW5kZXgoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNlY3Rpb25NYW5hZ2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTZWN0aW9uTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQ29sbGVjdGlvbjIgPSByZXF1aXJlKCcuL0NvbGxlY3Rpb24nKTtcblxudmFyIF9Db2xsZWN0aW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbGxlY3Rpb24yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NvbGxlY3Rpb24zLmRlZmF1bHQ7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBfQ29sbGVjdGlvbjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhO1xuXG52YXIgX1NlY3Rpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi4vU2VjdGlvbk1hbmFnZXInKTtcblxudmFyIF9TZWN0aW9uTWFuYWdlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZWN0aW9uTWFuYWdlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyID0gX3JlZi5jZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyO1xuICB2YXIgc2VjdGlvblNpemUgPSBfcmVmLnNlY3Rpb25TaXplO1xuXG4gIHZhciBjZWxsTWV0YWRhdGEgPSBbXTtcbiAgdmFyIHNlY3Rpb25NYW5hZ2VyID0gbmV3IF9TZWN0aW9uTWFuYWdlcjIuZGVmYXVsdChzZWN0aW9uU2l6ZSk7XG4gIHZhciBoZWlnaHQgPSAwO1xuICB2YXIgd2lkdGggPSAwO1xuXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBjZWxsQ291bnQ7IGluZGV4KyspIHtcbiAgICB2YXIgY2VsbE1ldGFkYXR1bSA9IGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIoaW5kZXgpO1xuXG4gICAgaWYgKGNlbGxNZXRhZGF0dW0uaGVpZ2h0ID09IG51bGwgfHwgaXNOYU4oY2VsbE1ldGFkYXR1bS5oZWlnaHQpIHx8IGNlbGxNZXRhZGF0dW0ud2lkdGggPT0gbnVsbCB8fCBpc05hTihjZWxsTWV0YWRhdHVtLndpZHRoKSB8fCBjZWxsTWV0YWRhdHVtLnggPT0gbnVsbCB8fCBpc05hTihjZWxsTWV0YWRhdHVtLngpIHx8IGNlbGxNZXRhZGF0dW0ueSA9PSBudWxsIHx8IGlzTmFOKGNlbGxNZXRhZGF0dW0ueSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIG1ldGFkYXRhIHJldHVybmVkIGZvciBjZWxsICcgKyBpbmRleCArICc6XFxuICAgICAgICB4OicgKyBjZWxsTWV0YWRhdHVtLnggKyAnLCB5OicgKyBjZWxsTWV0YWRhdHVtLnkgKyAnLCB3aWR0aDonICsgY2VsbE1ldGFkYXR1bS53aWR0aCArICcsIGhlaWdodDonICsgY2VsbE1ldGFkYXR1bS5oZWlnaHQpO1xuICAgIH1cblxuICAgIGhlaWdodCA9IE1hdGgubWF4KGhlaWdodCwgY2VsbE1ldGFkYXR1bS55ICsgY2VsbE1ldGFkYXR1bS5oZWlnaHQpO1xuICAgIHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIGNlbGxNZXRhZGF0dW0ueCArIGNlbGxNZXRhZGF0dW0ud2lkdGgpO1xuXG4gICAgY2VsbE1ldGFkYXRhW2luZGV4XSA9IGNlbGxNZXRhZGF0dW07XG4gICAgc2VjdGlvbk1hbmFnZXIucmVnaXN0ZXJDZWxsKHtcbiAgICAgIGNlbGxNZXRhZGF0dW06IGNlbGxNZXRhZGF0dW0sXG4gICAgICBpbmRleDogaW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2VsbE1ldGFkYXRhOiBjZWxsTWV0YWRhdGEsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgc2VjdGlvbk1hbmFnZXI6IHNlY3Rpb25NYW5hZ2VyLFxuICAgIHdpZHRoOiB3aWR0aFxuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuLi9HcmlkJyk7XG5cbnZhciBfR3JpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HcmlkKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEhpZ2gtb3JkZXIgY29tcG9uZW50IHRoYXQgYXV0by1jYWxjdWxhdGVzIGNvbHVtbi13aWR0aHMgZm9yIGBHcmlkYCBjZWxscy5cbiAqL1xuXG52YXIgQ29sdW1uU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sdW1uU2l6ZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbHVtblNpemVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbHVtblNpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2x1bW5TaXplcikuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX3JlZ2lzdGVyQ2hpbGQgPSBfdGhpcy5fcmVnaXN0ZXJDaGlsZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ29sdW1uU2l6ZXIsIFt7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5NYXhXaWR0aCA9IF9wcm9wcy5jb2x1bW5NYXhXaWR0aDtcbiAgICAgIHZhciBjb2x1bW5NaW5XaWR0aCA9IF9wcm9wcy5jb2x1bW5NaW5XaWR0aDtcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuXG5cbiAgICAgIGlmIChjb2x1bW5NYXhXaWR0aCAhPT0gcHJldlByb3BzLmNvbHVtbk1heFdpZHRoIHx8IGNvbHVtbk1pbldpZHRoICE9PSBwcmV2UHJvcHMuY29sdW1uTWluV2lkdGggfHwgY29sdW1uc0NvdW50ICE9PSBwcmV2UHJvcHMuY29sdW1uc0NvdW50IHx8IHdpZHRoICE9PSBwcmV2UHJvcHMud2lkdGgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCkge1xuICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzMi5jaGlsZHJlbjtcbiAgICAgIHZhciBjb2x1bW5NYXhXaWR0aCA9IF9wcm9wczIuY29sdW1uTWF4V2lkdGg7XG4gICAgICB2YXIgY29sdW1uTWluV2lkdGggPSBfcHJvcHMyLmNvbHVtbk1pbldpZHRoO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczIuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMi53aWR0aDtcblxuXG4gICAgICB2YXIgc2FmZUNvbHVtbk1pbldpZHRoID0gY29sdW1uTWluV2lkdGggfHwgMTtcblxuICAgICAgdmFyIHNhZmVDb2x1bW5NYXhXaWR0aCA9IGNvbHVtbk1heFdpZHRoID8gTWF0aC5taW4oY29sdW1uTWF4V2lkdGgsIHdpZHRoKSA6IHdpZHRoO1xuXG4gICAgICB2YXIgY29sdW1uV2lkdGggPSB3aWR0aCAvIGNvbHVtbnNDb3VudDtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5tYXgoc2FmZUNvbHVtbk1pbldpZHRoLCBjb2x1bW5XaWR0aCk7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGgubWluKHNhZmVDb2x1bW5NYXhXaWR0aCwgY29sdW1uV2lkdGgpO1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLmZsb29yKGNvbHVtbldpZHRoKTtcblxuICAgICAgdmFyIGFkanVzdGVkV2lkdGggPSBNYXRoLm1pbih3aWR0aCwgY29sdW1uV2lkdGggKiBjb2x1bW5zQ291bnQpO1xuXG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICBhZGp1c3RlZFdpZHRoOiBhZGp1c3RlZFdpZHRoLFxuICAgICAgICBnZXRDb2x1bW5XaWR0aDogZnVuY3Rpb24gZ2V0Q29sdW1uV2lkdGgoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbHVtbldpZHRoO1xuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlckNoaWxkOiB0aGlzLl9yZWdpc3RlckNoaWxkXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVnaXN0ZXJDaGlsZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWdpc3RlckNoaWxkKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgIT09IG51bGwgJiYgIShjaGlsZCBpbnN0YW5jZW9mIF9HcmlkMi5kZWZhdWx0KSkge1xuICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBjaGlsZCB0eXBlIHJlZ2lzdGVyZWQ7IG9ubHkgR3JpZCBjaGlsZHJlbiBhcmUgc3VwcG9ydGVkLicpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQgPSBjaGlsZDtcblxuICAgICAgaWYgKHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCkge1xuICAgICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQucmVjb21wdXRlR3JpZFNpemUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sdW1uU2l6ZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Db2x1bW5TaXplci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGEgdmlydHVhbGl6ZWQgR3JpZC5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBhZGp1c3RlZFdpZHRoLCBnZXRDb2x1bW5XaWR0aCwgcmVnaXN0ZXJDaGlsZCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWVkIDpnZXRDb2x1bW5XaWR0aCBmdW5jdGlvbiBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBHcmlkJ3MgOmNvbHVtbldpZHRoIHByb3BlcnR5LlxuICAgKiBUaGUgOnJlZ2lzdGVyQ2hpbGQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgR3JpZCdzIDpyZWYgcHJvcGVydHkuXG4gICAqIFRoZSA6YWRqdXN0ZWRXaWR0aCBwcm9wZXJ0eSBpcyBvcHRpb25hbDsgaXQgcmVmbGVjdHMgdGhlIGxlc3NlciBvZiB0aGUgb3ZlcmFsbCB3aWR0aCBvciB0aGUgd2lkdGggb2YgYWxsIGNvbHVtbnMuXG4gICAqL1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIG1heGltdW0gYWxsb3dlZCBjb2x1bW4gd2lkdGggKi9cbiAgY29sdW1uTWF4V2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBPcHRpb25hbCBtaW5pbXVtIGFsbG93ZWQgY29sdW1uIHdpZHRoICovXG4gIGNvbHVtbk1pbldpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogTnVtYmVyIG9mIGNvbHVtbnMgaW4gR3JpZCBvciBGbGV4VGFibGUgY2hpbGQgKi9cbiAgY29sdW1uc0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBXaWR0aCBvZiBHcmlkIG9yIEZsZXhUYWJsZSBjaGlsZCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbHVtblNpemVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ29sdW1uU2l6ZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfQ29sdW1uU2l6ZXIyID0gcmVxdWlyZSgnLi9Db2x1bW5TaXplcicpO1xuXG52YXIgX0NvbHVtblNpemVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbHVtblNpemVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Db2x1bW5TaXplcjMuZGVmYXVsdDtcbmV4cG9ydHMuQ29sdW1uU2l6ZXIgPSBfQ29sdW1uU2l6ZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0Q2VsbFJlbmRlcmVyID0gZGVmYXVsdENlbGxSZW5kZXJlcjtcbmV4cG9ydHMuZGVmYXVsdENlbGxEYXRhR2V0dGVyID0gZGVmYXVsdENlbGxEYXRhR2V0dGVyO1xuZXhwb3J0cy5kZWZhdWx0SGVhZGVyUmVuZGVyZXIgPSBkZWZhdWx0SGVhZGVyUmVuZGVyZXI7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yID0gcmVxdWlyZSgnLi9Tb3J0SW5kaWNhdG9yJyk7XG5cbnZhciBfU29ydEluZGljYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0SW5kaWNhdG9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIERlZmF1bHQgY2VsbCByZW5kZXJlciB0aGF0IGRpc3BsYXlzIGFuIGF0dHJpYnV0ZSBhcyBhIHNpbXBsZSBzdHJpbmdcbiAqIFlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlIGNvbHVtbidzIGNlbGxSZW5kZXJlciBpZiB5b3VyIGRhdGEgaXMgc29tZSBvdGhlciB0eXBlIG9mIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENlbGxSZW5kZXJlcihjZWxsRGF0YSwgY2VsbERhdGFLZXksIHJvd0RhdGEsIHJvd0luZGV4LCBjb2x1bW5EYXRhKSB7XG4gIGlmIChjZWxsRGF0YSA9PT0gbnVsbCB8fCBjZWxsRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBTdHJpbmcoY2VsbERhdGEpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBhY2Nlc3NvciBmb3IgcmV0dXJuaW5nIGEgY2VsbCB2YWx1ZSBmb3IgYSBnaXZlbiBhdHRyaWJ1dGUuXG4gKiBUaGlzIGZ1bmN0aW9uIGV4cGVjdHMgdG8gb3BlcmF0ZSBvbiBlaXRoZXIgYSB2YW5pbGxhIE9iamVjdCBvciBhbiBJbW11dGFibGUgTWFwLlxuICogWW91IHNob3VsZCBvdmVycmlkZSB0aGUgY29sdW1uJ3MgY2VsbERhdGFHZXR0ZXIgaWYgeW91ciBkYXRhIGlzIHNvbWUgb3RoZXIgdHlwZSBvZiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDZWxsRGF0YUdldHRlcihkYXRhS2V5LCByb3dEYXRhLCBjb2x1bW5EYXRhKSB7XG4gIGlmIChyb3dEYXRhLmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHJvd0RhdGEuZ2V0KGRhdGFLZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3dEYXRhW2RhdGFLZXldO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCB0YWJsZSBoZWFkZXIgcmVuZGVyZXIuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRIZWFkZXJSZW5kZXJlcihfcmVmKSB7XG4gIHZhciBjb2x1bW5EYXRhID0gX3JlZi5jb2x1bW5EYXRhO1xuICB2YXIgZGF0YUtleSA9IF9yZWYuZGF0YUtleTtcbiAgdmFyIGRpc2FibGVTb3J0ID0gX3JlZi5kaXNhYmxlU29ydDtcbiAgdmFyIGxhYmVsID0gX3JlZi5sYWJlbDtcbiAgdmFyIHNvcnRCeSA9IF9yZWYuc29ydEJ5O1xuICB2YXIgc29ydERpcmVjdGlvbiA9IF9yZWYuc29ydERpcmVjdGlvbjtcblxuICB2YXIgc2hvd1NvcnRJbmRpY2F0b3IgPSBzb3J0QnkgPT09IGRhdGFLZXk7XG4gIHZhciBjaGlsZHJlbiA9IFtfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7XG4gICAgICBjbGFzc05hbWU6ICdGbGV4VGFibGVfX2hlYWRlclRydW5jYXRlZFRleHQnLFxuICAgICAga2V5OiAnbGFiZWwnLFxuICAgICAgdGl0bGU6IGxhYmVsXG4gICAgfSxcbiAgICBsYWJlbFxuICApXTtcblxuICBpZiAoc2hvd1NvcnRJbmRpY2F0b3IpIHtcbiAgICBjaGlsZHJlbi5wdXNoKF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Tb3J0SW5kaWNhdG9yMi5kZWZhdWx0LCB7XG4gICAgICBrZXk6ICdTb3J0SW5kaWNhdG9yJyxcbiAgICAgIHNvcnREaXJlY3Rpb246IHNvcnREaXJlY3Rpb25cbiAgICB9KSk7XG4gIH1cblxuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBoZWFkZXIgYW5kIGNlbGwgY29udGVudHMgb2YgYSB0YWJsZSBjb2x1bW4uXG4gKi9cblxudmFyIENvbHVtbiA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhDb2x1bW4sIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbHVtbigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sdW1uKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sdW1uKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBDb2x1bW47XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Db2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBjZWxsRGF0YUdldHRlcjogZGVmYXVsdENlbGxEYXRhR2V0dGVyLFxuICBjZWxsUmVuZGVyZXI6IGRlZmF1bHRDZWxsUmVuZGVyZXIsXG4gIGZsZXhHcm93OiAwLFxuICBmbGV4U2hyaW5rOiAxLFxuICBoZWFkZXJSZW5kZXJlcjogZGVmYXVsdEhlYWRlclJlbmRlcmVyXG59O1xuQ29sdW1uLnByb3BUeXBlcyA9IHtcbiAgLyoqIE9wdGlvbmFsIGFyaWEtbGFiZWwgdmFsdWUgdG8gc2V0IG9uIHRoZSBjb2x1bW4gaGVhZGVyICovXG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBjZWxsICovXG4gIGNlbGxDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIGEgY2VsbCdzIGRhdGEsIGdpdmVuIGl0cyA6ZGF0YUtleVxuICAgKiAoZGF0YUtleTogc3RyaW5nLCByb3dEYXRhOiBhbnkpOiBhbnlcbiAgICovXG4gIGNlbGxEYXRhR2V0dGVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjZWxsJ3MgY29udGVudHMuXG4gICAqIChjZWxsRGF0YTogYW55LCBjZWxsRGF0YUtleTogc3RyaW5nLCByb3dEYXRhOiBhbnksIHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkRhdGE6IGFueSk6IGVsZW1lbnRcbiAgICovXG4gIGNlbGxSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKiBPcHRpb25hbCBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIHRvIHRoaXMgY29sdW1uJ3MgOmNlbGxEYXRhR2V0dGVyICovXG4gIGNvbHVtbkRhdGE6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKiBVbmlxdWVseSBpZGVudGlmaWVzIHRoZSByb3ctZGF0YSBhdHRyaWJ1dGUgY29ycmVzcG5kaW5nIHRvIHRoaXMgY2VsbCAqL1xuICBkYXRhS2V5OiBfcmVhY3QuUHJvcFR5cGVzLmFueS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBJZiBzb3J0IGlzIGVuYWJsZWQgZm9yIHRoZSB0YWJsZSBhdCBsYXJnZSwgZGlzYWJsZSBpdCBmb3IgdGhpcyBjb2x1bW4gKi9cbiAgZGlzYWJsZVNvcnQ6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogRmxleCBncm93IHN0eWxlOyBkZWZhdWx0cyB0byAwICovXG4gIGZsZXhHcm93OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogRmxleCBzaHJpbmsgc3R5bGU7IGRlZmF1bHRzIHRvIDEgKi9cbiAgZmxleFNocmluazogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byB0aGlzIGNvbHVtbidzIGhlYWRlciAqL1xuICBoZWFkZXJDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjYWxsYmFjayByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY29sdW1uIGhlYWRlciBjb250ZW50cy5cbiAgICogKHsgY29sdW1uRGF0YTogb2JqZWN0LCBkYXRhS2V5OiBzdHJpbmcsIGRpc2FibGVTb3J0OiBib29sZWFuLCBsYWJlbDogc3RyaW5nLCBzb3J0Qnk6IHN0cmluZywgc29ydERpcmVjdGlvbjogc3RyaW5nIH0pOiBQcm9wVHlwZXMubm9kZVxuICAgKi9cbiAgaGVhZGVyUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBIZWFkZXIgbGFiZWwgZm9yIHRoaXMgY29sdW1uICovXG4gIGxhYmVsOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogTWF4aW11bSB3aWR0aCBvZiBjb2x1bW47IHRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IGJlIHVzZWQgaWYgOmZsZXhHcm93IGlzID4gMC4gKi9cbiAgbWF4V2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBNaW5pbXVtIHdpZHRoIG9mIGNvbHVtbi4gKi9cbiAgbWluV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBGbGV4IGJhc2lzICh3aWR0aCkgZm9yIHRoaXMgY29sdW1uOyBUaGlzIHZhbHVlIGNhbiBncm93IG9yIHNocmluayBiYXNlZCBvbiA6ZmxleEdyb3cgYW5kIDpmbGV4U2hyaW5rIHByb3BlcnRpZXMuICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sdW1uOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfRmxleENvbHVtbiA9IHJlcXVpcmUoJy4vRmxleENvbHVtbicpO1xuXG52YXIgX0ZsZXhDb2x1bW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleENvbHVtbik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi4vR3JpZCcpO1xuXG52YXIgX0dyaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZCk7XG5cbnZhciBfU29ydERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBUYWJsZSBjb21wb25lbnQgd2l0aCBmaXhlZCBoZWFkZXJzIGFuZCB2aXJ0dWFsaXplZCByb3dzIGZvciBpbXByb3ZlZCBwZXJmb3JtYW5jZSB3aXRoIGxhcmdlIGRhdGEgc2V0cy5cbiAqIFRoaXMgY29tcG9uZW50IGV4cGVjdHMgZXhwbGljaXQgd2lkdGgsIGhlaWdodCwgYW5kIHBhZGRpbmcgcGFyYW1ldGVycy5cbiAqL1xuXG52YXIgRmxleFRhYmxlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEZsZXhUYWJsZSwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gRmxleFRhYmxlKHByb3BzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsZXhUYWJsZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmxleFRhYmxlKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjcm9sbGJhcldpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9jcmVhdGVSb3cgPSBfdGhpcy5fY3JlYXRlUm93LmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWUgR3JpZCNyZWNvbXB1dGVHcmlkU2l6ZVxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhGbGV4VGFibGUsIFt7XG4gICAga2V5OiAncmVjb21wdXRlUm93SGVpZ2h0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZVJvd0hlaWdodHMoKSB7XG4gICAgICB0aGlzLnJlZnMuR3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLl9zZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgZGlzYWJsZUhlYWRlciA9IF9wcm9wcy5kaXNhYmxlSGVhZGVyO1xuICAgICAgdmFyIGhlYWRlckhlaWdodCA9IF9wcm9wcy5oZWFkZXJIZWlnaHQ7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzLmhlaWdodDtcbiAgICAgIHZhciBub1Jvd3NSZW5kZXJlciA9IF9wcm9wcy5ub1Jvd3NSZW5kZXJlcjtcbiAgICAgIHZhciBvblJvd3NSZW5kZXJlZCA9IF9wcm9wcy5vblJvd3NSZW5kZXJlZDtcbiAgICAgIHZhciBfb25TY3JvbGwgPSBfcHJvcHMub25TY3JvbGw7XG4gICAgICB2YXIgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfcHJvcHMub3ZlcnNjYW5Sb3dzQ291bnQ7XG4gICAgICB2YXIgcm93Q2xhc3NOYW1lID0gX3Byb3BzLnJvd0NsYXNzTmFtZTtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBfcHJvcHMucm93SGVpZ2h0O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wcy5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9wcm9wcy5zY3JvbGxUb0luZGV4O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMud2lkdGg7XG4gICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSB0aGlzLnN0YXRlLnNjcm9sbGJhcldpZHRoO1xuXG5cbiAgICAgIHZhciBhdmFpbGFibGVSb3dzSGVpZ2h0ID0gaGVpZ2h0IC0gaGVhZGVySGVpZ2h0O1xuXG4gICAgICAvLyBUaGlzIHJvdy1yZW5kZXJlciB3cmFwcGVyIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSBpbiBvcmRlciB0byB0cmlnZ2VyIHJlLXJlbmRlciB3aGVuIHRoZVxuICAgICAgLy8gc29ydC1ieSBvciBzb3J0LWRpcmVjdGlvbiBoYXZlIGNoYW5nZWQgKGVsc2UgR3JpZCB3aWxsIG5vdCBzZWUgYW55IHByb3BzIGNoYW5nZXMpXG4gICAgICB2YXIgcm93UmVuZGVyZXIgPSBmdW5jdGlvbiByb3dSZW5kZXJlcihpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLl9jcmVhdGVSb3coaW5kZXgpO1xuICAgICAgfTtcblxuICAgICAgdmFyIHJvd0NsYXNzID0gcm93Q2xhc3NOYW1lIGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dDbGFzc05hbWUoLTEpIDogcm93Q2xhc3NOYW1lO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGUnLCBjbGFzc05hbWUpXG4gICAgICAgIH0sXG4gICAgICAgICFkaXNhYmxlSGVhZGVyICYmIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19oZWFkZXJSb3cnLCByb3dDbGFzcyksXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBoZWlnaHQ6IGhlYWRlckhlaWdodCxcbiAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBzY3JvbGxiYXJXaWR0aCxcbiAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aGlzLl9nZXRSZW5kZXJlZEhlYWRlclJvdygpXG4gICAgICAgICksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9HcmlkMi5kZWZhdWx0LCB7XG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgICAgcmVmOiAnR3JpZCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnRmxleFRhYmxlX19HcmlkJyxcbiAgICAgICAgICBjb2x1bW5XaWR0aDogd2lkdGgsXG4gICAgICAgICAgY29sdW1uc0NvdW50OiAxLFxuICAgICAgICAgIGhlaWdodDogYXZhaWxhYmxlUm93c0hlaWdodCxcbiAgICAgICAgICBub0NvbnRlbnRSZW5kZXJlcjogbm9Sb3dzUmVuZGVyZXIsXG4gICAgICAgICAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKF9yZWYpIHtcbiAgICAgICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfcmVmLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHJldHVybiBfb25TY3JvbGwoeyBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uU2VjdGlvblJlbmRlcmVkKF9yZWYyKSB7XG4gICAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdGFydEluZGV4ID0gX3JlZjIucm93T3ZlcnNjYW5TdGFydEluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RvcEluZGV4ID0gX3JlZjIucm93T3ZlcnNjYW5TdG9wSW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWYyLnJvd1N0YXJ0SW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZjIucm93U3RvcEluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIG9uUm93c1JlbmRlcmVkKHtcbiAgICAgICAgICAgICAgb3ZlcnNjYW5TdGFydEluZGV4OiByb3dPdmVyc2NhblN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiByb3dPdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgICAgICAgc3RhcnRJbmRleDogcm93U3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgc3RvcEluZGV4OiByb3dTdG9wSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3ZlcnNjYW5Sb3dzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICAgIHJlbmRlckNlbGw6IGZ1bmN0aW9uIHJlbmRlckNlbGwoX3JlZjMpIHtcbiAgICAgICAgICAgIHZhciBjb2x1bW5JbmRleCA9IF9yZWYzLmNvbHVtbkluZGV4O1xuICAgICAgICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjMucm93SW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gcm93UmVuZGVyZXIocm93SW5kZXgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcm93SGVpZ2h0OiByb3dIZWlnaHQsXG4gICAgICAgICAgcm93c0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgICAgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvSW5kZXgsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVDb2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlQ29sdW1uKGNvbHVtbiwgY29sdW1uSW5kZXgsIHJvd0RhdGEsIHJvd0luZGV4KSB7XG4gICAgICB2YXIgX2NvbHVtbiRwcm9wcyA9IGNvbHVtbi5wcm9wcztcbiAgICAgIHZhciBjZWxsQ2xhc3NOYW1lID0gX2NvbHVtbiRwcm9wcy5jZWxsQ2xhc3NOYW1lO1xuICAgICAgdmFyIGNlbGxEYXRhR2V0dGVyID0gX2NvbHVtbiRwcm9wcy5jZWxsRGF0YUdldHRlcjtcbiAgICAgIHZhciBjb2x1bW5EYXRhID0gX2NvbHVtbiRwcm9wcy5jb2x1bW5EYXRhO1xuICAgICAgdmFyIGRhdGFLZXkgPSBfY29sdW1uJHByb3BzLmRhdGFLZXk7XG4gICAgICB2YXIgY2VsbFJlbmRlcmVyID0gX2NvbHVtbiRwcm9wcy5jZWxsUmVuZGVyZXI7XG5cbiAgICAgIHZhciBjZWxsRGF0YSA9IGNlbGxEYXRhR2V0dGVyKGRhdGFLZXksIHJvd0RhdGEsIGNvbHVtbkRhdGEpO1xuICAgICAgdmFyIHJlbmRlcmVkQ2VsbCA9IGNlbGxSZW5kZXJlcihjZWxsRGF0YSwgZGF0YUtleSwgcm93RGF0YSwgcm93SW5kZXgsIGNvbHVtbkRhdGEpO1xuXG4gICAgICB2YXIgc3R5bGUgPSB0aGlzLl9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKTtcblxuICAgICAgdmFyIHRpdGxlID0gdHlwZW9mIHJlbmRlcmVkQ2VsbCA9PT0gJ3N0cmluZycgPyByZW5kZXJlZENlbGwgOiBudWxsO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnUm93JyArIHJvd0luZGV4ICsgJy1Db2wnICsgY29sdW1uSW5kZXgsXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3Jvd0NvbHVtbicsIGNlbGxDbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgICB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdGbGV4VGFibGVfX3RydW5jYXRlZENvbHVtblRleHQnLFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZW5kZXJlZENlbGxcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY3JlYXRlSGVhZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZUhlYWRlcihjb2x1bW4sIGNvbHVtbkluZGV4KSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVhZGVyQ2xhc3NOYW1lID0gX3Byb3BzMi5oZWFkZXJDbGFzc05hbWU7XG4gICAgICB2YXIgb25IZWFkZXJDbGljayA9IF9wcm9wczIub25IZWFkZXJDbGljaztcbiAgICAgIHZhciBzb3J0ID0gX3Byb3BzMi5zb3J0O1xuICAgICAgdmFyIHNvcnRCeSA9IF9wcm9wczIuc29ydEJ5O1xuICAgICAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcHJvcHMyLnNvcnREaXJlY3Rpb247XG4gICAgICB2YXIgX2NvbHVtbiRwcm9wczIgPSBjb2x1bW4ucHJvcHM7XG4gICAgICB2YXIgZGF0YUtleSA9IF9jb2x1bW4kcHJvcHMyLmRhdGFLZXk7XG4gICAgICB2YXIgZGlzYWJsZVNvcnQgPSBfY29sdW1uJHByb3BzMi5kaXNhYmxlU29ydDtcbiAgICAgIHZhciBoZWFkZXJSZW5kZXJlciA9IF9jb2x1bW4kcHJvcHMyLmhlYWRlclJlbmRlcmVyO1xuICAgICAgdmFyIGxhYmVsID0gX2NvbHVtbiRwcm9wczIubGFiZWw7XG4gICAgICB2YXIgY29sdW1uRGF0YSA9IF9jb2x1bW4kcHJvcHMyLmNvbHVtbkRhdGE7XG5cbiAgICAgIHZhciBzb3J0RW5hYmxlZCA9ICFkaXNhYmxlU29ydCAmJiBzb3J0O1xuXG4gICAgICB2YXIgY2xhc3NOYW1lcyA9ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9faGVhZGVyQ29sdW1uJywgaGVhZGVyQ2xhc3NOYW1lLCBjb2x1bW4ucHJvcHMuaGVhZGVyQ2xhc3NOYW1lLCB7XG4gICAgICAgICdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVyQ29sdW1uJzogc29ydEVuYWJsZWRcbiAgICAgIH0pO1xuICAgICAgdmFyIHN0eWxlID0gdGhpcy5fZ2V0RmxleFN0eWxlRm9yQ29sdW1uKGNvbHVtbik7XG5cbiAgICAgIHZhciByZW5kZXJlZEhlYWRlciA9IGhlYWRlclJlbmRlcmVyKHtcbiAgICAgICAgY29sdW1uRGF0YTogY29sdW1uRGF0YSxcbiAgICAgICAgZGF0YUtleTogZGF0YUtleSxcbiAgICAgICAgZGlzYWJsZVNvcnQ6IGRpc2FibGVTb3J0LFxuICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgIHNvcnRCeTogc29ydEJ5LFxuICAgICAgICBzb3J0RGlyZWN0aW9uOiBzb3J0RGlyZWN0aW9uXG4gICAgICB9KTtcblxuICAgICAgdmFyIGExMXlQcm9wcyA9IHt9O1xuXG4gICAgICBpZiAoc29ydEVuYWJsZWQgfHwgb25IZWFkZXJDbGljaykge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBzb3J0YWJsZSBoZWFkZXIsIGNsaWNraW5nIGl0IHNob3VsZCB1cGRhdGUgdGhlIHRhYmxlIGRhdGEncyBzb3J0aW5nLlxuICAgICAgICAgIHZhciBuZXdTb3J0RGlyZWN0aW9uID0gc29ydEJ5ICE9PSBkYXRhS2V5IHx8IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0MgPyBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MgOiBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDO1xuXG4gICAgICAgICAgdmFyIG9uQ2xpY2sgPSBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgc29ydEVuYWJsZWQgJiYgc29ydChkYXRhS2V5LCBuZXdTb3J0RGlyZWN0aW9uKTtcbiAgICAgICAgICAgIG9uSGVhZGVyQ2xpY2sgJiYgb25IZWFkZXJDbGljayhkYXRhS2V5LCBjb2x1bW5EYXRhKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIG9uS2V5RG93biA9IGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgICBvbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGExMXlQcm9wc1snYXJpYS1sYWJlbCddID0gY29sdW1uLnByb3BzWydhcmlhLWxhYmVsJ10gfHwgbGFiZWwgfHwgZGF0YUtleTtcbiAgICAgICAgICBhMTF5UHJvcHMucm9sZSA9ICdyb3doZWFkZXInO1xuICAgICAgICAgIGExMXlQcm9wcy50YWJJbmRleCA9IDA7XG4gICAgICAgICAgYTExeVByb3BzLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgICAgIGExMXlQcm9wcy5vbktleURvd24gPSBvbktleURvd247XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIF9leHRlbmRzKHt9LCBhMTF5UHJvcHMsIHtcbiAgICAgICAgICBrZXk6ICdIZWFkZXItQ29sJyArIGNvbHVtbkluZGV4LFxuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyxcbiAgICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgICAgfSksXG4gICAgICAgIHJlbmRlcmVkSGVhZGVyXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVSb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlUm93KHJvd0luZGV4KSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzMy5jaGlsZHJlbjtcbiAgICAgIHZhciBvblJvd0NsaWNrID0gX3Byb3BzMy5vblJvd0NsaWNrO1xuICAgICAgdmFyIHJvd0NsYXNzTmFtZSA9IF9wcm9wczMucm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd0dldHRlciA9IF9wcm9wczMucm93R2V0dGVyO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gdGhpcy5zdGF0ZS5zY3JvbGxiYXJXaWR0aDtcblxuXG4gICAgICB2YXIgcm93Q2xhc3MgPSByb3dDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0NsYXNzTmFtZShyb3dJbmRleCkgOiByb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93RGF0YSA9IHJvd0dldHRlcihyb3dJbmRleCk7XG5cbiAgICAgIHZhciByZW5kZXJlZFJvdyA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5tYXAoZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5fY3JlYXRlQ29sdW1uKGNvbHVtbiwgY29sdW1uSW5kZXgsIHJvd0RhdGEsIHJvd0luZGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYTExeVByb3BzID0ge307XG5cbiAgICAgIGlmIChvblJvd0NsaWNrKSB7XG4gICAgICAgIGExMXlQcm9wc1snYXJpYS1sYWJlbCddID0gJ3Jvdyc7XG4gICAgICAgIGExMXlQcm9wcy5yb2xlID0gJ3Jvdyc7XG4gICAgICAgIGExMXlQcm9wcy50YWJJbmRleCA9IDA7XG4gICAgICAgIGExMXlQcm9wcy5vbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvblJvd0NsaWNrKHJvd0luZGV4KTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgX2V4dGVuZHMoe30sIGExMXlQcm9wcywge1xuICAgICAgICAgIGtleTogcm93SW5kZXgsXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3JvdycsIHJvd0NsYXNzKSxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9nZXRSb3dIZWlnaHQocm93SW5kZXgpLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBzY3JvbGxiYXJXaWR0aFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHJlbmRlcmVkUm93XG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgdGhlIGZsZXgtc2hyaW5rLCBmbGV4LWdyb3csIGFuZCB3aWR0aCB2YWx1ZXMgZm9yIGEgY2VsbCAoaGVhZGVyIG9yIGNvbHVtbikuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19nZXRGbGV4U3R5bGVGb3JDb2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0RmxleFN0eWxlRm9yQ29sdW1uKGNvbHVtbikge1xuICAgICAgdmFyIGZsZXhWYWx1ZSA9IGNvbHVtbi5wcm9wcy5mbGV4R3JvdyArICcgJyArIGNvbHVtbi5wcm9wcy5mbGV4U2hyaW5rICsgJyAnICsgY29sdW1uLnByb3BzLndpZHRoICsgJ3B4JztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBmbGV4OiBmbGV4VmFsdWUsXG4gICAgICAgIG1zRmxleDogZmxleFZhbHVlLFxuICAgICAgICBXZWJraXRGbGV4OiBmbGV4VmFsdWVcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb2x1bW4ucHJvcHMubWF4V2lkdGgpIHtcbiAgICAgICAgc3R5bGUubWF4V2lkdGggPSBjb2x1bW4ucHJvcHMubWF4V2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW4ucHJvcHMubWluV2lkdGgpIHtcbiAgICAgICAgc3R5bGUubWluV2lkdGggPSBjb2x1bW4ucHJvcHMubWluV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0UmVuZGVyZWRIZWFkZXJSb3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UmVuZGVyZWRIZWFkZXJSb3coKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzNC5jaGlsZHJlbjtcbiAgICAgIHZhciBkaXNhYmxlSGVhZGVyID0gX3Byb3BzNC5kaXNhYmxlSGVhZGVyO1xuXG4gICAgICB2YXIgaXRlbXMgPSBkaXNhYmxlSGVhZGVyID8gW10gOiBfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG5cbiAgICAgIHJldHVybiBpdGVtcy5tYXAoZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNC5fY3JlYXRlSGVhZGVyKGNvbHVtbiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFJvd0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSb3dIZWlnaHQocm93SW5kZXgpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSB0aGlzLnByb3BzLnJvd0hlaWdodDtcblxuXG4gICAgICByZXR1cm4gcm93SGVpZ2h0IGluc3RhbmNlb2YgRnVuY3Rpb24gPyByb3dIZWlnaHQocm93SW5kZXgpIDogcm93SGVpZ2h0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRTY3JvbGxiYXJXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgIHZhciBHcmlkID0gKDAsIF9yZWFjdERvbS5maW5kRE9NTm9kZSkodGhpcy5yZWZzLkdyaWQpO1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gR3JpZC5jbGllbnRXaWR0aCB8fCAwO1xuICAgICAgdmFyIG9mZnNldFdpZHRoID0gR3JpZC5vZmZzZXRXaWR0aCB8fCAwO1xuICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gb2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNjcm9sbGJhcldpZHRoOiBzY3JvbGxiYXJXaWR0aCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRmxleFRhYmxlO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuRmxleFRhYmxlLnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogT25lIG9yIG1vcmUgRmxleENvbHVtbnMgZGVzY3JpYmluZyB0aGUgZGF0YSBkaXNwbGF5ZWQgaW4gdGhpcyByb3cgKi9cbiAgY2hpbGRyZW46IGZ1bmN0aW9uIGNoaWxkcmVuKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KHByb3BzLmNoaWxkcmVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY2hpbGRyZW5baV0udHlwZSAhPT0gX0ZsZXhDb2x1bW4yLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignRmxleFRhYmxlIG9ubHkgYWNjZXB0cyBjaGlsZHJlbiBvZiB0eXBlIEZsZXhDb2x1bW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyBuYW1lICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIERpc2FibGUgcmVuZGVyaW5nIHRoZSBoZWFkZXIgYXQgYWxsICovXG4gIGRpc2FibGVIZWFkZXI6IF9yZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGFsbCBjb2x1bW4gaGVhZGVycyAqL1xuICBoZWFkZXJDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBGaXhlZCBoZWlnaHQgb2YgaGVhZGVyIHJvdyAqL1xuICBoZWFkZXJIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEZpeGVkL2F2YWlsYWJsZSBoZWlnaHQgZm9yIG91dCBET00gZWxlbWVudCAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2YgdGFibGUgYm9keSByb3dzIHdoZW4gcm93c0NvdW50IGlzIDAgKi9cbiAgbm9Sb3dzUmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgKiBPcHRpb25hbCBjYWxsYmFjayB3aGVuIGEgY29sdW1uJ3MgaGVhZGVyIGlzIGNsaWNrZWQuXG4gICogKGRhdGFLZXk6IHN0cmluZyk6IHZvaWRcbiAgKi9cbiAgb25IZWFkZXJDbGljazogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIHRhYmxlIHJvdy5cbiAgICogKHJvd0luZGV4OiBudW1iZXIpOiB2b2lkXG4gICAqL1xuICBvblJvd0NsaWNrOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2xpY2Ugb2Ygcm93cyB0aGF0IHdlcmUganVzdCByZW5kZXJlZC5cbiAgICogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblJvd3NSZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW5ldmVyIHRoZSBzY3JvbGwgb2Zmc2V0IGNoYW5nZXMgd2l0aGluIHRoZSBpbm5lciBzY3JvbGxhYmxlIHJlZ2lvbi5cbiAgICogVGhpcyBjYWxsYmFjayBjYW4gYmUgdXNlZCB0byBzeW5jIHNjcm9sbGluZyBiZXR3ZWVuIGxpc3RzLCB0YWJsZXMsIG9yIGdyaWRzLlxuICAgKiAoeyBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIENTUyBjbGFzcyB0byBhcHBseSB0byBhbGwgdGFibGUgcm93cyAoaW5jbHVkaW5nIHRoZSBoZWFkZXIgcm93KS5cbiAgICogVGhpcyBwcm9wZXJ0eSBjYW4gYmUgYSBDU1MgY2xhc3MgbmFtZSAoc3RyaW5nKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNsYXNzIG5hbWUuXG4gICAqIElmIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgaXRzIHNpZ25hdHVyZSBzaG91bGQgYmU6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nXG4gICAqL1xuICByb3dDbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLnN0cmluZywgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSksXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgYSBkYXRhIHJvdyBnaXZlbiBhbiBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBhbnlcbiAgICovXG4gIHJvd0dldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIHJvdyBoZWlnaHQgKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGhlaWdodCBvZiBhIHJvdyBnaXZlbiBpdHMgaW5kZXguXG4gICAqIChpbmRleDogbnVtYmVyKTogbnVtYmVyXG4gICAqL1xuICByb3dIZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gdGFibGUuICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogUm93IGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpICovXG4gIHNjcm9sbFRvSW5kZXg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFNvcnQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGlmIGEgc29ydGFibGUgaGVhZGVyIGlzIGNsaWNrZWQuXG4gICAqIChkYXRhS2V5OiBzdHJpbmcsIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24pOiB2b2lkXG4gICAqL1xuICBzb3J0OiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIEZsZXhUYWJsZSBkYXRhIGlzIGN1cnJlbnRseSBzb3J0ZWQgYnkgdGhpcyA6ZGF0YUtleSAoaWYgaXQgaXMgc29ydGVkIGF0IGFsbCkgKi9cbiAgc29ydEJ5OiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRmxleFRhYmxlIGRhdGEgaXMgY3VycmVudGx5IHNvcnRlZCBpbiB0aGlzIGRpcmVjdGlvbiAoaWYgaXQgaXMgc29ydGVkIGF0IGFsbCkgKi9cbiAgc29ydERpcmVjdGlvbjogX3JlYWN0LlByb3BUeXBlcy5vbmVPZihbX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDLCBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDXSksXG5cbiAgLyoqIFdpZHRoIG9mIGxpc3QgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5GbGV4VGFibGUuZGVmYXVsdFByb3BzID0ge1xuICBkaXNhYmxlSGVhZGVyOiBmYWxzZSxcbiAgaGVhZGVySGVpZ2h0OiAwLFxuICBub1Jvd3NSZW5kZXJlcjogZnVuY3Rpb24gbm9Sb3dzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uUm93c1JlbmRlcmVkOiBmdW5jdGlvbiBvblJvd3NSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhblJvd3NDb3VudDogMTBcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBGbGV4VGFibGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIFNvcnREaXJlY3Rpb24gPSB7XG4gIC8qKlxuICAgKiBTb3J0IGl0ZW1zIGluIGFzY2VuZGluZyBvcmRlci5cbiAgICogVGhpcyBtZWFucyBhcnJhbmdpbmcgZnJvbSB0aGUgbG93ZXN0IHZhbHVlIHRvIHRoZSBoaWdoZXN0IChlLmcuIGEteiwgMC05KS5cbiAgICovXG4gIEFTQzogJ0FTQycsXG5cbiAgLyoqXG4gICAqIFNvcnQgaXRlbXMgaW4gZGVzY2VuZGluZyBvcmRlci5cbiAgICogVGhpcyBtZWFucyBhcnJhbmdpbmcgZnJvbSB0aGUgaGlnaGVzdCB2YWx1ZSB0byB0aGUgbG93ZXN0IChlLmcuIHotYSwgOS0wKS5cbiAgICovXG4gIERFU0M6ICdERVNDJ1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU29ydERpcmVjdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTb3J0SW5kaWNhdG9yO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24gPSByZXF1aXJlKCcuL1NvcnREaXJlY3Rpb24nKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnREaXJlY3Rpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIERpc3BsYXllZCBiZXNpZGUgYSBoZWFkZXIgdG8gaW5kaWNhdGUgdGhhdCBhIEZsZXhUYWJsZSBpcyBjdXJyZW50bHkgc29ydGVkIGJ5IHRoaXMgY29sdW1uLlxuICovXG5mdW5jdGlvbiBTb3J0SW5kaWNhdG9yKF9yZWYpIHtcbiAgdmFyIHNvcnREaXJlY3Rpb24gPSBfcmVmLnNvcnREaXJlY3Rpb247XG5cbiAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbicsIHtcbiAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24tLUFTQyc6IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQyxcbiAgICAnRmxleFRhYmxlX19zb3J0YWJsZUhlYWRlckljb24tLURFU0MnOiBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5ERVNDXG4gIH0pO1xuXG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnc3ZnJyxcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMsXG4gICAgICB3aWR0aDogMTgsXG4gICAgICBoZWlnaHQ6IDE4LFxuICAgICAgdmlld0JveDogJzAgMCAyNCAyNCcsXG4gICAgICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuICAgIH0sXG4gICAgc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNNyAxNGw1LTUgNSA1eicgfSkgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ003IDEwbDUgNSA1LTV6JyB9KSxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ00wIDBoMjR2MjRIMHonLCBmaWxsOiAnbm9uZScgfSlcbiAgKTtcbn1cblNvcnRJbmRpY2F0b3IucHJvcFR5cGVzID0ge1xuICBzb3J0RGlyZWN0aW9uOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsIF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NdKVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNvcnRJbmRpY2F0b3IgPSBleHBvcnRzLlNvcnREaXJlY3Rpb24gPSBleHBvcnRzLkZsZXhDb2x1bW4gPSBleHBvcnRzLkZsZXhUYWJsZSA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9GbGV4VGFibGUyID0gcmVxdWlyZSgnLi9GbGV4VGFibGUnKTtcblxudmFyIF9GbGV4VGFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleFRhYmxlMik7XG5cbnZhciBfRmxleENvbHVtbjIgPSByZXF1aXJlKCcuL0ZsZXhDb2x1bW4nKTtcblxudmFyIF9GbGV4Q29sdW1uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0ZsZXhDb2x1bW4yKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uMiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbjIpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IyID0gcmVxdWlyZSgnLi9Tb3J0SW5kaWNhdG9yJyk7XG5cbnZhciBfU29ydEluZGljYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0SW5kaWNhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9GbGV4VGFibGUzLmRlZmF1bHQ7XG5leHBvcnRzLkZsZXhUYWJsZSA9IF9GbGV4VGFibGUzLmRlZmF1bHQ7XG5leHBvcnRzLkZsZXhDb2x1bW4gPSBfRmxleENvbHVtbjMuZGVmYXVsdDtcbmV4cG9ydHMuU29ydERpcmVjdGlvbiA9IF9Tb3J0RGlyZWN0aW9uMy5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0SW5kaWNhdG9yID0gX1NvcnRJbmRpY2F0b3IzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQgPSByZXF1aXJlKCcuL3V0aWxzL2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQnKTtcblxudmFyIF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQpO1xuXG52YXIgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIgPSByZXF1aXJlKCcuLi91dGlscy9jcmVhdGVDYWxsYmFja01lbW9pemVyJyk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDYWxsYmFja01lbW9pemVyKTtcblxudmFyIF9nZXROZWFyZXN0SW5kZXggPSByZXF1aXJlKCcuL3V0aWxzL2dldE5lYXJlc3RJbmRleCcpO1xuXG52YXIgX2dldE5lYXJlc3RJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXROZWFyZXN0SW5kZXgpO1xuXG52YXIgX2dldE92ZXJzY2FuSW5kaWNlcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0T3ZlcnNjYW5JbmRpY2VzJyk7XG5cbnZhciBfZ2V0T3ZlcnNjYW5JbmRpY2VzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldE92ZXJzY2FuSW5kaWNlcyk7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZSA9IHJlcXVpcmUoJ2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZScpO1xuXG52YXIgX3Njcm9sbGJhclNpemUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsYmFyU2l6ZSk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4ID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4Jyk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCk7XG5cbnZhciBfZ2V0VmlzaWJsZUNlbGxJbmRpY2VzID0gcmVxdWlyZSgnLi91dGlscy9nZXRWaXNpYmxlQ2VsbEluZGljZXMnKTtcblxudmFyIF9nZXRWaXNpYmxlQ2VsbEluZGljZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmlzaWJsZUNlbGxJbmRpY2VzKTtcblxudmFyIF9pbml0Q2VsbE1ldGFkYXRhID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5pdENlbGxNZXRhZGF0YScpO1xuXG52YXIgX2luaXRDZWxsTWV0YWRhdGEyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5pdENlbGxNZXRhZGF0YSk7XG5cbnZhciBfcmFmID0gcmVxdWlyZSgncmFmJyk7XG5cbnZhciBfcmFmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JhZik7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyID0gcmVxdWlyZSgnLi91dGlscy91cGRhdGVTY3JvbGxJbmRleEhlbHBlcicpO1xuXG52YXIgX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIG1pbGlzZWNvbmRzIGR1cmluZyB3aGljaCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICogVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgbWFrZXMgc2Nyb2xsaW5nIHNtb290aGVyLlxuICovXG52YXIgSVNfU0NST0xMSU5HX1RJTUVPVVQgPSAxNTA7XG5cbi8qKlxuICogQ29udHJvbHMgd2hldGhlciB0aGUgR3JpZCB1cGRhdGVzIHRoZSBET00gZWxlbWVudCdzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlIG9yIGp1c3Qgb2JzZXJ2ZXMgaXQuXG4gKiBUaGlzIHByZXZlbnRzIEdyaWQgZnJvbSBpbnRlcnJ1cHRpbmcgbW91c2Utd2hlZWwgYW5pbWF0aW9ucyAoc2VlIGlzc3VlICMyKS5cbiAqL1xudmFyIFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUyA9IHtcbiAgT0JTRVJWRUQ6ICdvYnNlcnZlZCcsXG4gIFJFUVVFU1RFRDogJ3JlcXVlc3RlZCdcbn07XG5cbi8qKlxuICogUmVuZGVycyB0YWJ1bGFyIGRhdGEgd2l0aCB2aXJ0dWFsaXphdGlvbiBhbG9uZyB0aGUgdmVydGljYWwgYW5kIGhvcml6b250YWwgYXhlcy5cbiAqIFJvdyBoZWlnaHRzIGFuZCBjb2x1bW4gd2lkdGhzIG11c3QgYmUga25vd24gYWhlYWQgb2YgdGltZSBhbmQgc3BlY2lmaWVkIGFzIHByb3BlcnRpZXMuXG4gKi9cblxudmFyIEdyaWQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoR3JpZCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gR3JpZChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHcmlkKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihHcmlkKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGU6IGZhbHNlLFxuICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMFxuICAgIH07XG5cbiAgICAvLyBJbnZva2VzIG9uU2VjdGlvblJlbmRlcmVkIGNhbGxiYWNrIG9ubHkgd2hlbiBzdGFydC9zdG9wIHJvdyBvciBjb2x1bW4gaW5kaWNlcyBjaGFuZ2VcbiAgICBfdGhpcy5fb25HcmlkUmVuZGVyZWRNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoKTtcbiAgICBfdGhpcy5fb25TY3JvbGxNZW1vaXplciA9ICgwLCBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcjIuZGVmYXVsdCkoZmFsc2UpO1xuXG4gICAgLy8gQmluZCBmdW5jdGlvbnMgdG8gaW5zdGFuY2Ugc28gdGhleSBkb24ndCBsb3NlIGNvbnRleHQgd2hlbiBwYXNzZWQgYXJvdW5kXG4gICAgX3RoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YSA9IF90aGlzLl9jb21wdXRlQ29sdW1uTWV0YWRhdGEuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YSA9IF90aGlzLl9jb21wdXRlUm93TWV0YWRhdGEuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyID0gX3RoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uID0gX3RoaXMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbi5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cgPSBfdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlZCByZWNvbXB1dGUgb2Ygcm93IGhlaWdodHMgYW5kIGNvbHVtbiB3aWR0aHMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBpZiBkeW5hbWljIGNvbHVtbiBvciByb3cgc2l6ZXMgaGF2ZSBjaGFuZ2VkIGJ1dCBub3RoaW5nIGVsc2UgaGFzLlxuICAgKiBTaW5jZSBHcmlkIG9ubHkgcmVjZWl2ZXMgOmNvbHVtbnNDb3VudCBhbmQgOnJvd3NDb3VudCBpdCBoYXMgbm8gd2F5IG9mIGRldGVjdGluZyB3aGVuIHRoZSB1bmRlcmx5aW5nIGRhdGEgY2hhbmdlcy5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoR3JpZCwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVHcmlkU2l6ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZUdyaWRTaXplKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3Byb3BzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcHJvcHMuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9wcm9wcy5zY3JvbGxUb1JvdztcblxuXG4gICAgICB0aGlzLl9zY3JvbGxiYXJTaXplID0gKDAsIF9zY3JvbGxiYXJTaXplMi5kZWZhdWx0KSgpO1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwIHx8IHNjcm9sbFRvcCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb0NvbHVtbiA+PSAwIHx8IHNjcm9sbFRvUm93ID49IDApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBvblJvd3NSZW5kZXJlZCBjYWxsYmFja1xuICAgICAgdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBvblNjcm9sbCBjYWxsYmFja1xuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQgfHwgMCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfHwgMCxcbiAgICAgICAgdG90YWxDb2x1bW5zV2lkdGg6IHRoaXMuX2dldFRvdGFsQ29sdW1uc1dpZHRoKCksXG4gICAgICAgIHRvdGFsUm93c0hlaWdodDogdGhpcy5fZ2V0VG90YWxSb3dzSGVpZ2h0KClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogVGhpcyBtZXRob2QgdXBkYXRlcyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBpbiBzdGF0ZSBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAqIDEpIE5ldyBzY3JvbGwtdG8tY2VsbCBwcm9wcyBoYXZlIGJlZW4gc2V0XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcHJvcHMyLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IF9wcm9wczIuY29sdW1uV2lkdGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMi5oZWlnaHQ7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzMi5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcHJvcHMyLnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3Byb3BzMi5zY3JvbGxUb1JvdztcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBfc3RhdGUuc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb247XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlLnNjcm9sbFRvcDtcblxuICAgICAgLy8gTWFrZSBzdXJlIHJlcXVlc3RlZCBjaGFuZ2VzIHRvIDpzY3JvbGxMZWZ0IG9yIDpzY3JvbGxUb3AgZ2V0IGFwcGxpZWQuXG4gICAgICAvLyBBc3NpZ25pbmcgdG8gc2Nyb2xsTGVmdC9zY3JvbGxUb3AgdGVsbHMgdGhlIGJyb3dzZXIgdG8gaW50ZXJydXB0IGFueSBydW5uaW5nIHNjcm9sbCBhbmltYXRpb25zLFxuICAgICAgLy8gQW5kIHRvIGRpc2NhcmQgYW55IHBlbmRpbmcgYXN5bmMgY2hhbmdlcyB0byB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRoYXQgbWF5IGhhdmUgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lIChlLmcuIG9uIGEgc2VwYXJhdGUgc2Nyb2xsaW5nIHRocmVhZCkuXG4gICAgICAvLyBTbyB3ZSBvbmx5IHNldCB0aGVzZSB3aGVuIHdlIHJlcXVpcmUgYW4gYWRqdXN0bWVudCBvZiB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgLy8gU2VlIGlzc3VlICMyIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICBpZiAoc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPT09IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQpIHtcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSBwcmV2U3RhdGUuc2Nyb2xsTGVmdCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHByZXZTdGF0ZS5zY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgY3VycmVudCA6c2Nyb2xsVG9Db2x1bW4gb3IgOnNjcm9sbFRvUm93IHZhbHVlcyByZXF1aXJlcyBpdFxuICAgICAgLy8gQFRPRE8gRG8gd2UgYWxzbyBuZWVkIHRoaXMgY2hlY2sgb3IgY2FuIHRoZSBvbmUgaW4gY29tcG9uZW50V2lsbFVwZGF0ZSgpIHN1ZmZpY2U/XG4gICAgICAoMCwgX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyMi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogY29sdW1uV2lkdGgsXG4gICAgICAgIHByZXZpb3VzQ2VsbHNDb3VudDogcHJldlByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBwcmV2aW91c1Njcm9sbFRvSW5kZXg6IHByZXZQcm9wcy5zY3JvbGxUb0NvbHVtbixcbiAgICAgICAgcHJldmlvdXNTaXplOiBwcmV2UHJvcHMud2lkdGgsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHNpemU6IHdpZHRoLFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiBmdW5jdGlvbiB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKHNjcm9sbFRvQ29sdW1uKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKF9leHRlbmRzKHt9LCBfdGhpczIucHJvcHMsIHsgc2Nyb2xsVG9Db2x1bW46IHNjcm9sbFRvQ29sdW1uIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAoMCwgX3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyMi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogcm93c0NvdW50LFxuICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICBjZWxsU2l6ZTogcm93SGVpZ2h0LFxuICAgICAgICBwcmV2aW91c0NlbGxzQ291bnQ6IHByZXZQcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIHByZXZpb3VzQ2VsbFNpemU6IHByZXZQcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy5oZWlnaHQsXG4gICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxUb0luZGV4OiBzY3JvbGxUb1JvdyxcbiAgICAgICAgc2l6ZTogaGVpZ2h0LFxuICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrOiBmdW5jdGlvbiB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKHNjcm9sbFRvUm93KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3coX2V4dGVuZHMoe30sIF90aGlzMi5wcm9wcywgeyBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9Sb3cgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIG9uUm93c1JlbmRlcmVkIGNhbGxiYWNrIGlmIHN0YXJ0L3N0b3AgaW5kaWNlcyBoYXZlIGNoYW5nZWRcbiAgICAgIHRoaXMuX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgdGhpcy5fY29tcHV0ZUNvbHVtbk1ldGFkYXRhKHRoaXMucHJvcHMpO1xuICAgICAgdGhpcy5fY29tcHV0ZVJvd01ldGFkYXRhKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGluIHN0YXRlIGZvciB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgICogMSkgRW1wdHkgY29udGVudCAoMCByb3dzIG9yIGNvbHVtbnMpXG4gICAgICogMikgTmV3IHNjcm9sbCBwcm9wcyBvdmVycmlkaW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICogMykgQ2VsbHMtY291bnQgb3IgY2VsbHMtc2l6ZSBoYXMgY2hhbmdlZCwgbWFraW5nIHByZXZpb3VzIHNjcm9sbCBvZmZzZXRzIGludmFsaWRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAobmV4dFByb3BzLmNvbHVtbnNDb3VudCA9PT0gMCAmJiBuZXh0U3RhdGUuc2Nyb2xsTGVmdCAhPT0gMCB8fCBuZXh0UHJvcHMucm93c0NvdW50ID09PSAwICYmIG5leHRTdGF0ZS5zY3JvbGxUb3AgIT09IDApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UHJvcHMuc2Nyb2xsTGVmdCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxMZWZ0IHx8IG5leHRQcm9wcy5zY3JvbGxUb3AgIT09IHRoaXMucHJvcHMuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBuZXh0UHJvcHMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IG5leHRQcm9wcy5zY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgc2l6ZSBvciBudW1iZXIgb2YgY2VsbHMgaGF2ZSBjaGFuZ2VkLCBpbnZhbGlkYXRpbmcgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAoMCwgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiB0aGlzLnByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgY2VsbFNpemU6IHRoaXMucHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrOiB0aGlzLl9jb21wdXRlQ29sdW1uTWV0YWRhdGEsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHM6IG5leHRQcm9wcyxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlOiBuZXh0U3RhdGUuY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZSxcbiAgICAgICAgbmV4dENlbGxzQ291bnQ6IG5leHRQcm9wcy5jb2x1bW5zQ291bnQsXG4gICAgICAgIG5leHRDZWxsU2l6ZTogbmV4dFByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICBuZXh0U2Nyb2xsVG9JbmRleDogbmV4dFByb3BzLnNjcm9sbFRvQ29sdW1uLFxuICAgICAgICBzY3JvbGxUb0luZGV4OiB0aGlzLnByb3BzLnNjcm9sbFRvQ29sdW1uLFxuICAgICAgICB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4OiBmdW5jdGlvbiB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4KCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMuX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbihuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgKDAsIF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0Mi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogdGhpcy5wcm9wcy5yb3dzQ291bnQsXG4gICAgICAgIGNlbGxTaXplOiB0aGlzLnByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IHRoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YSxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wczogbmV4dFByb3BzLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGU6IG5leHRTdGF0ZS5jb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlLFxuICAgICAgICBuZXh0Q2VsbHNDb3VudDogbmV4dFByb3BzLnJvd3NDb3VudCxcbiAgICAgICAgbmV4dENlbGxTaXplOiBuZXh0UHJvcHMucm93SGVpZ2h0LFxuICAgICAgICBuZXh0U2Nyb2xsVG9JbmRleDogbmV4dFByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICBzY3JvbGxUb0luZGV4OiB0aGlzLnByb3BzLnNjcm9sbFRvUm93LFxuICAgICAgICB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4OiBmdW5jdGlvbiB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4KCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczMuX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wczMuY2xhc3NOYW1lO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczMuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczMuaGVpZ2h0O1xuICAgICAgdmFyIG5vQ29udGVudFJlbmRlcmVyID0gX3Byb3BzMy5ub0NvbnRlbnRSZW5kZXJlcjtcbiAgICAgIHZhciBvdmVyc2NhbkNvbHVtbnNDb3VudCA9IF9wcm9wczMub3ZlcnNjYW5Db2x1bW5zQ291bnQ7XG4gICAgICB2YXIgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfcHJvcHMzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJlbmRlckNlbGwgPSBfcHJvcHMzLnJlbmRlckNlbGw7XG4gICAgICB2YXIgcmVuZGVyQ2VsbFJhbmdlcyA9IF9wcm9wczMucmVuZGVyQ2VsbFJhbmdlcztcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMzLnJvd3NDb3VudDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczMud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlMiA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgaXNTY3JvbGxpbmcgPSBfc3RhdGUyLmlzU2Nyb2xsaW5nO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUyLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlMi5zY3JvbGxUb3A7XG5cblxuICAgICAgdmFyIGNoaWxkcmVuVG9EaXNwbGF5ID0gW107XG5cbiAgICAgIC8vIFJlbmRlciBvbmx5IGVub3VnaCBjb2x1bW5zIGFuZCByb3dzIHRvIGNvdmVyIHRoZSB2aXNpYmxlIGFyZWEgb2YgdGhlIGdyaWQuXG4gICAgICBpZiAoaGVpZ2h0ID4gMCAmJiB3aWR0aCA+IDApIHtcbiAgICAgICAgdmFyIHZpc2libGVDb2x1bW5JbmRpY2VzID0gKDAsIF9nZXRWaXNpYmxlQ2VsbEluZGljZXMyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbExlZnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHZpc2libGVSb3dJbmRpY2VzID0gKDAsIF9nZXRWaXNpYmxlQ2VsbEluZGljZXMyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsTWV0YWRhdGE6IHRoaXMuX3Jvd01ldGFkYXRhLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxUb3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcmUgZm9yIF9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpXG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCA9IHZpc2libGVDb2x1bW5JbmRpY2VzLnN0YXJ0O1xuICAgICAgICB0aGlzLl9yZW5kZXJlZENvbHVtblN0b3BJbmRleCA9IHZpc2libGVDb2x1bW5JbmRpY2VzLnN0b3A7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCA9IHZpc2libGVSb3dJbmRpY2VzLnN0YXJ0O1xuICAgICAgICB0aGlzLl9yZW5kZXJlZFJvd1N0b3BJbmRleCA9IHZpc2libGVSb3dJbmRpY2VzLnN0b3A7XG5cbiAgICAgICAgdmFyIG92ZXJzY2FuQ29sdW1uSW5kaWNlcyA9ICgwLCBfZ2V0T3ZlcnNjYW5JbmRpY2VzMi5kZWZhdWx0KSh7XG4gICAgICAgICAgY2VsbENvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5DZWxsc0NvdW50OiBvdmVyc2NhbkNvbHVtbnNDb3VudCxcbiAgICAgICAgICBzdGFydEluZGV4OiB0aGlzLl9yZW5kZXJlZENvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgc3RvcEluZGV4OiB0aGlzLl9yZW5kZXJlZENvbHVtblN0b3BJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgb3ZlcnNjYW5Sb3dJbmRpY2VzID0gKDAsIF9nZXRPdmVyc2NhbkluZGljZXMyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCxcbiAgICAgICAgICBzdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN0b3JlIGZvciBfaW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKVxuICAgICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fY29sdW1uU3RvcEluZGV4ID0gb3ZlcnNjYW5Db2x1bW5JbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dTdGFydEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gb3ZlcnNjYW5Sb3dJbmRpY2VzLm92ZXJzY2FuU3RvcEluZGV4O1xuXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5ID0gcmVuZGVyQ2VsbFJhbmdlcyh7XG4gICAgICAgICAgY29sdW1uTWV0YWRhdGE6IHRoaXMuX2NvbHVtbk1ldGFkYXRhLFxuICAgICAgICAgIGNvbHVtblN0YXJ0SW5kZXg6IHRoaXMuX2NvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RvcEluZGV4OiB0aGlzLl9jb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgcmVuZGVyQ2VsbDogcmVuZGVyQ2VsbCxcbiAgICAgICAgICByb3dNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgICAgcm93U3RhcnRJbmRleDogdGhpcy5fcm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dTdG9wSW5kZXg6IHRoaXMuX3Jvd1N0b3BJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGdyaWRTdHlsZSA9IHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfTtcblxuICAgICAgdmFyIHRvdGFsQ29sdW1uc1dpZHRoID0gdGhpcy5fZ2V0VG90YWxDb2x1bW5zV2lkdGgoKTtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSB0aGlzLl9nZXRUb3RhbFJvd3NIZWlnaHQoKTtcblxuICAgICAgLy8gRm9yY2UgYnJvd3NlciB0byBoaWRlIHNjcm9sbGJhcnMgd2hlbiB3ZSBrbm93IHRoZXkgYXJlbid0IG5lY2Vzc2FyeS5cbiAgICAgIC8vIE90aGVyd2lzZSBvbmNlIHNjcm9sbGJhcnMgYXBwZWFyIHRoZXkgbWF5IG5vdCBkaXNhcHBlYXIgYWdhaW4uXG4gICAgICAvLyBGb3IgbW9yZSBpbmZvIHNlZSBpc3N1ZSAjMTE2XG4gICAgICBpZiAodG90YWxDb2x1bW5zV2lkdGggPD0gd2lkdGgpIHtcbiAgICAgICAgZ3JpZFN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuICAgICAgfVxuXG4gICAgICBpZiAodG90YWxSb3dzSGVpZ2h0IDw9IGhlaWdodCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6ICdzY3JvbGxpbmdDb250YWluZXInLFxuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnR3JpZCcsIGNsYXNzTmFtZSksXG4gICAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICAgIHJvbGU6ICdncmlkJyxcbiAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLFxuICAgICAgICAgIHRhYkluZGV4OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDAgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRvdGFsUm93c0hlaWdodCxcbiAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogaXNTY3JvbGxpbmcgPyAnbm9uZScgOiAnYXV0bydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA9PT0gMCAmJiBub0NvbnRlbnRSZW5kZXJlcigpXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSGVscGVyIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfY29tcHV0ZUNvbHVtbk1ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NvbXB1dGVDb2x1bW5NZXRhZGF0YShwcm9wcykge1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IHByb3BzLmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IHByb3BzLmNvbHVtbldpZHRoO1xuXG5cbiAgICAgIHRoaXMuX2NvbHVtbk1ldGFkYXRhID0gKDAsIF9pbml0Q2VsbE1ldGFkYXRhMi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogY29sdW1uc0NvdW50LFxuICAgICAgICBzaXplOiBjb2x1bW5XaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NvbXB1dGVSb3dNZXRhZGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wdXRlUm93TWV0YWRhdGEocHJvcHMpIHtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBwcm9wcy5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gcHJvcHMucm93c0NvdW50O1xuXG5cbiAgICAgIHRoaXMuX3Jvd01ldGFkYXRhID0gKDAsIF9pbml0Q2VsbE1ldGFkYXRhMi5kZWZhdWx0KSh7XG4gICAgICAgIGNlbGxDb3VudDogcm93c0NvdW50LFxuICAgICAgICBzaXplOiByb3dIZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gOmlzU2Nyb2xsaW5nIGZsYWcgZm9yIGEgc21hbGwgd2luZG93IG9mIHRpbWUuXG4gICAgICogVGhpcyBmbGFnIGlzIHVzZWQgdG8gZGlzYWJsZSBwb2ludGVyIGV2ZW50cyBvbiB0aGUgc2Nyb2xsYWJsZSBwb3J0aW9uIG9mIHRoZSBHcmlkLlxuICAgICAqIFRoaXMgcHJldmVudHMgamVya3kvc3R1dHRlcnkgbW91c2Utd2hlZWwgc2Nyb2xsaW5nLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZW5hYmxlUG9pbnRlckV2ZW50c0FmdGVyRGVsYXkoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzNC5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICBfdGhpczQuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0sIElTX1NDUk9MTElOR19USU1FT1VUKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0VG90YWxDb2x1bW5zV2lkdGgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0VG90YWxDb2x1bW5zV2lkdGgoKSB7XG4gICAgICBpZiAodGhpcy5fY29sdW1uTWV0YWRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0dW0gPSB0aGlzLl9jb2x1bW5NZXRhZGF0YVt0aGlzLl9jb2x1bW5NZXRhZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBkYXR1bS5vZmZzZXQgKyBkYXR1bS5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRUb3RhbFJvd3NIZWlnaHQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0VG90YWxSb3dzSGVpZ2h0KCkge1xuICAgICAgaWYgKHRoaXMuX3Jvd01ldGFkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdHVtID0gdGhpcy5fcm93TWV0YWRhdGFbdGhpcy5fcm93TWV0YWRhdGEubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKSB7XG4gICAgICB2YXIgb25TZWN0aW9uUmVuZGVyZWQgPSB0aGlzLnByb3BzLm9uU2VjdGlvblJlbmRlcmVkO1xuXG5cbiAgICAgIHRoaXMuX29uR3JpZFJlbmRlcmVkTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogb25TZWN0aW9uUmVuZGVyZWQsXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBjb2x1bW5PdmVyc2NhblN0YXJ0SW5kZXg6IHRoaXMuX2NvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgY29sdW1uT3ZlcnNjYW5TdG9wSW5kZXg6IHRoaXMuX2NvbHVtblN0b3BJbmRleCxcbiAgICAgICAgICBjb2x1bW5TdGFydEluZGV4OiB0aGlzLl9yZW5kZXJlZENvbHVtblN0YXJ0SW5kZXgsXG4gICAgICAgICAgY29sdW1uU3RvcEluZGV4OiB0aGlzLl9yZW5kZXJlZENvbHVtblN0b3BJbmRleCxcbiAgICAgICAgICByb3dPdmVyc2NhblN0YXJ0SW5kZXg6IHRoaXMuX3Jvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgcm93T3ZlcnNjYW5TdG9wSW5kZXg6IHRoaXMuX3Jvd1N0b3BJbmRleCxcbiAgICAgICAgICByb3dTdGFydEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgcm93U3RvcEluZGV4OiB0aGlzLl9yZW5kZXJlZFJvd1N0b3BJbmRleFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaW52b2tlT25TY3JvbGxNZW1vaXplcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbnZva2VPblNjcm9sbE1lbW9pemVyKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciB0b3RhbENvbHVtbnNXaWR0aCA9IF9yZWYudG90YWxDb2x1bW5zV2lkdGg7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gX3JlZi50b3RhbFJvd3NIZWlnaHQ7XG5cbiAgICAgIHRoaXMuX29uU2Nyb2xsTWVtb2l6ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soX3JlZjIpIHtcbiAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYyLnNjcm9sbExlZnQ7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYyLnNjcm9sbFRvcDtcbiAgICAgICAgICB2YXIgX3Byb3BzNCA9IF90aGlzNS5wcm9wcztcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNC5oZWlnaHQ7XG4gICAgICAgICAgdmFyIG9uU2Nyb2xsID0gX3Byb3BzNC5vblNjcm9sbDtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcHJvcHM0LndpZHRoO1xuXG5cbiAgICAgICAgICBvblNjcm9sbCh7XG4gICAgICAgICAgICBjbGllbnRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IHRvdGFsQ29sdW1uc1dpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczYuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgICAgICBfdGhpczYuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFNjcm9sbFBvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbFBvc2l0aW9uKF9yZWYzKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjMuc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCB8fCBzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHRoaXMuc3RhdGUuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKCkge1xuICAgICAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIHZhciBfcmVmNCA9IHByb3BzIHx8IHRoaXMucHJvcHM7XG5cbiAgICAgIHZhciBjb2x1bW5zQ291bnQgPSBfcmVmNC5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9Db2x1bW4gPSBfcmVmNC5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWY0LndpZHRoO1xuXG4gICAgICB2YXIgX3JlZjUgPSBzdGF0ZSB8fCB0aGlzLnN0YXRlO1xuXG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWY1LnNjcm9sbExlZnQ7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvQ29sdW1uID49IDAgJiYgY29sdW1uc0NvdW50ID4gMCkge1xuICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSAoMCwgX2dldE5lYXJlc3RJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxDb3VudDogdGhpcy5fY29sdW1uTWV0YWRhdGEubGVuZ3RoLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb0NvbHVtblxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY29sdW1uTWV0YWRhdGEgPSB0aGlzLl9jb2x1bW5NZXRhZGF0YVt0YXJnZXRJbmRleF07XG5cbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gKDAsIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjb2x1bW5NZXRhZGF0YS5vZmZzZXQsXG4gICAgICAgICAgY2VsbFNpemU6IGNvbHVtbk1ldGFkYXRhLnNpemUsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogd2lkdGgsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogc2Nyb2xsVG9Db2x1bW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbExlZnQgIT09IGNhbGN1bGF0ZWRTY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgICAgc2Nyb2xsTGVmdDogY2FsY3VsYXRlZFNjcm9sbExlZnRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdygpIHtcbiAgICAgIHZhciBwcm9wcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgX3JlZjYgPSBwcm9wcyB8fCB0aGlzLnByb3BzO1xuXG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZjYuaGVpZ2h0O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9yZWY2LnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9yZWY2LnNjcm9sbFRvUm93O1xuXG4gICAgICB2YXIgX3JlZjcgPSBzdGF0ZSB8fCB0aGlzLnN0YXRlO1xuXG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjcuc2Nyb2xsVG9wO1xuXG5cbiAgICAgIGlmIChzY3JvbGxUb1JvdyA+PSAwICYmIHJvd3NDb3VudCA+IDApIHtcbiAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gKDAsIF9nZXROZWFyZXN0SW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsQ291bnQ6IHRoaXMuX3Jvd01ldGFkYXRhLmxlbmd0aCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogc2Nyb2xsVG9Sb3dcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJvd01ldGFkYXRhID0gdGhpcy5fcm93TWV0YWRhdGFbdGFyZ2V0SW5kZXhdO1xuXG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsVG9wID0gKDAsIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsT2Zmc2V0OiByb3dNZXRhZGF0YS5vZmZzZXQsXG4gICAgICAgICAgY2VsbFNpemU6IHJvd01ldGFkYXRhLnNpemUsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogaGVpZ2h0LFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbFRvcCxcbiAgICAgICAgICB0YXJnZXRJbmRleDogc2Nyb2xsVG9Sb3dcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCAhPT0gY2FsY3VsYXRlZFNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogY2FsY3VsYXRlZFNjcm9sbFRvcFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAvLyBJbiBjZXJ0YWluIGVkZ2UtY2FzZXMgUmVhY3QgZGlzcGF0Y2hlcyBhbiBvblNjcm9sbCBldmVudCB3aXRoIGFuIGludmFsaWQgdGFyZ2V0LnNjcm9sbExlZnQgLyB0YXJnZXQuc2Nyb2xsVG9wLlxuICAgICAgLy8gVGhpcyBpbnZhbGlkIGV2ZW50IGNhbiBiZSBkZXRlY3RlZCBieSBjb21wYXJpbmcgZXZlbnQudGFyZ2V0IHRvIHRoaXMgY29tcG9uZW50J3Mgc2Nyb2xsYWJsZSBET00gZWxlbWVudC5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjNDA0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgcG9pbnRlciBldmVudHMgZnJvbSBpbnRlcnJ1cHRpbmcgYSBzbW9vdGggc2Nyb2xsXG4gICAgICB0aGlzLl9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpO1xuXG4gICAgICAvLyBXaGVuIHRoaXMgY29tcG9uZW50IGlzIHNocnVuayBkcmFzdGljYWxseSwgUmVhY3QgZGlzcGF0Y2hlcyBhIHNlcmllcyBvZiBiYWNrLXRvLWJhY2sgc2Nyb2xsIGV2ZW50cyxcbiAgICAgIC8vIEdyYWR1YWxseSBjb252ZXJnaW5nIG9uIGEgc2Nyb2xsVG9wIHRoYXQgaXMgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIG5ldywgc21hbGxlciBoZWlnaHQuXG4gICAgICAvLyBUaGlzIGNhdXNlcyBhIHNlcmllcyBvZiByYXBpZCByZW5kZXJzIHRoYXQgaXMgc2xvdyBmb3IgbG9uZyBsaXN0cy5cbiAgICAgIC8vIFdlIGNhbiBhdm9pZCB0aGF0IGJ5IGRvaW5nIHNvbWUgc2ltcGxlIGJvdW5kcyBjaGVja2luZyB0byBlbnN1cmUgdGhhdCBzY3JvbGxUb3AgbmV2ZXIgZXhjZWVkcyB0aGUgdG90YWwgaGVpZ2h0LlxuICAgICAgdmFyIF9wcm9wczUgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczUuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNS53aWR0aDtcblxuICAgICAgdmFyIHNjcm9sbGJhclNpemUgPSB0aGlzLl9zY3JvbGxiYXJTaXplO1xuICAgICAgdmFyIHRvdGFsUm93c0hlaWdodCA9IHRoaXMuX2dldFRvdGFsUm93c0hlaWdodCgpO1xuICAgICAgdmFyIHRvdGFsQ29sdW1uc1dpZHRoID0gdGhpcy5fZ2V0VG90YWxDb2x1bW5zV2lkdGgoKTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gTWF0aC5taW4odG90YWxDb2x1bW5zV2lkdGggLSB3aWR0aCArIHNjcm9sbGJhclNpemUsIGV2ZW50LnRhcmdldC5zY3JvbGxMZWZ0KTtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLm1pbih0b3RhbFJvd3NIZWlnaHQgLSBoZWlnaHQgKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsVG9wKTtcblxuICAgICAgLy8gQ2VydGFpbiBkZXZpY2VzIChsaWtlIEFwcGxlIHRvdWNocGFkKSByYXBpZC1maXJlIGR1cGxpY2F0ZSBldmVudHMuXG4gICAgICAvLyBEb24ndCBmb3JjZSBhIHJlLXJlbmRlciBpZiB0aGlzIGlzIHRoZSBjYXNlLlxuICAgICAgLy8gVGhlIG1vdXNlIG1heSBtb3ZlIGZhc3RlciB0aGVuIHRoZSBhbmltYXRpb24gZnJhbWUgZG9lcy5cbiAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gYXZvaWQgb3Zlci11cGRhdGluZy5cbiAgICAgIGlmICh0aGlzLnN0YXRlLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQgfHwgdGhpcy5zdGF0ZS5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgICAgICAvLyBCcm93c2VycyB3aXRoIGNhbmNlbGFibGUgc2Nyb2xsIGV2ZW50cyAoZWcuIEZpcmVmb3gpIGludGVycnVwdCBzY3JvbGxpbmcgYW5pbWF0aW9ucyBpZiBzY3JvbGxUb3Avc2Nyb2xsTGVmdCBpcyBzZXQuXG4gICAgICAgIC8vIE90aGVyIGJyb3dzZXJzIChlZy4gU2FmYXJpKSBkb24ndCBzY3JvbGwgYXMgd2VsbCB3aXRob3V0IHRoZSBoZWxwIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucyAoRE9NIG9yIHN0eWxlIGNoYW5nZXMgZHVyaW5nIHNjcm9sbGluZykuXG4gICAgICAgIC8vIEFsbCB0aGluZ3MgY29uc2lkZXJlZCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgYmVzdCBjdXJyZW50IHdvcmsgYXJvdW5kIHRoYXQgSSdtIGF3YXJlIG9mLlxuICAgICAgICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWQvcHVsbC8xMjRcbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID0gZXZlbnQuY2FuY2VsYWJsZSA/IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5PQlNFUlZFRCA6IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0TmV4dFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbixcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wLCB0b3RhbENvbHVtbnNXaWR0aDogdG90YWxDb2x1bW5zV2lkdGgsIHRvdGFsUm93c0hlaWdodDogdG90YWxSb3dzSGVpZ2h0IH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBHcmlkO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuR3JpZC5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgbmFtZSB0byBhdHRhY2ggdG8gcm9vdCBHcmlkIGVsZW1lbnQuXG4gICAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgY29sdW1ucyBpbiBncmlkLlxuICAgKi9cbiAgY29sdW1uc0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCBjb2x1bW4gd2lkdGggKG51bWJlcikgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHdpZHRoIG9mIGEgY29sdW1uIGdpdmVuIGl0cyBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIGNvbHVtbldpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEhlaWdodCBvZiBHcmlkOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgcm93cy5cbiAgICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiByb3dzIHdoZW4gZWl0aGVyIDpyb3dzQ291bnQgb3IgOmNvbHVtbnNDb3VudCBpcyAwLlxuICAgKi9cbiAgbm9Db250ZW50UmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW5ldmVyIHRoZSBzY3JvbGwgb2Zmc2V0IGNoYW5nZXMgd2l0aGluIHRoZSBpbm5lciBzY3JvbGxhYmxlIHJlZ2lvbi5cbiAgICogVGhpcyBjYWxsYmFjayBjYW4gYmUgdXNlZCB0byBzeW5jIHNjcm9sbGluZyBiZXR3ZWVuIGxpc3RzLCB0YWJsZXMsIG9yIGdyaWRzLlxuICAgKiAoeyBjbGllbnRIZWlnaHQsIGNsaWVudFdpZHRoLCBzY3JvbGxIZWlnaHQsIHNjcm9sbExlZnQsIHNjcm9sbFRvcCwgc2Nyb2xsV2lkdGggfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzZWN0aW9uIG9mIHRoZSBHcmlkIHRoYXQgd2FzIGp1c3QgcmVuZGVyZWQuXG4gICAqICh7IGNvbHVtblN0YXJ0SW5kZXgsIGNvbHVtblN0b3BJbmRleCwgcm93U3RhcnRJbmRleCwgcm93U3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblNlY3Rpb25SZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb2x1bW5zIHRvIHJlbmRlciBiZWZvcmUvYWZ0ZXIgdGhlIHZpc2libGUgc2VjdGlvbiBvZiB0aGUgZ3JpZC5cbiAgICogVGhlc2UgY29sdW1ucyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMgb3IgYnJvd3NlcnMgdGhhdCBzZW5kIHNjcm9sbCBldmVudHMgaW5mcmVxdWVudGx5LlxuICAgKi9cbiAgb3ZlcnNjYW5Db2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBzZWN0aW9uIG9mIHRoZSBncmlkLlxuICAgKiBUaGVzZSByb3dzIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcyBvciBicm93c2VycyB0aGF0IHNlbmQgc2Nyb2xsIGV2ZW50cyBpbmZyZXF1ZW50bHkuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwgZ2l2ZW4gYW4gcm93IGFuZCBjb2x1bW4gaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6ICh7IGNvbHVtbkluZGV4OiBudW1iZXIsIHJvd0luZGV4OiBudW1iZXIgfSk6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICByZW5kZXJDZWxsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGdyb3VwIG9mIGNlbGxzIGdpdmVuIHRoZWlyIGluZGV4IHJhbmdlcy5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHtcbiAgICogICBjb2x1bW5NZXRhZGF0YTpBcnJheTxPYmplY3Q+LFxuICAgKiAgIGNvbHVtblN0YXJ0SW5kZXg6IG51bWJlcixcbiAgICogICBjb2x1bW5TdG9wSW5kZXg6IG51bWJlcixcbiAgICogICByZW5kZXJDZWxsOiBGdW5jdGlvbixcbiAgICogICByb3dNZXRhZGF0YTpBcnJheTxPYmplY3Q+LFxuICAgKiAgIHJvd1N0YXJ0SW5kZXg6IG51bWJlcixcbiAgICogICByb3dTdG9wSW5kZXg6IG51bWJlclxuICAgKiB9KTogQXJyYXk8UHJvcFR5cGVzLm5vZGU+XG4gICAqL1xuICByZW5kZXJDZWxsUmFuZ2VzOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBncmlkLlxuICAgKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBIb3Jpem9udGFsIG9mZnNldC4gKi9cbiAgc2Nyb2xsTGVmdDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIENvbHVtbiBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Db2x1bW46IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBWZXJ0aWNhbCBvZmZzZXQuICovXG4gIHNjcm9sbFRvcDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KVxuICAgKi9cbiAgc2Nyb2xsVG9Sb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiBHcmlkOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgY29sdW1ucy5cbiAgICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuR3JpZC5kZWZhdWx0UHJvcHMgPSB7XG4gICdhcmlhLWxhYmVsJzogJ2dyaWQnLFxuICBub0NvbnRlbnRSZW5kZXJlcjogZnVuY3Rpb24gbm9Db250ZW50UmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TZWN0aW9uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uU2VjdGlvblJlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhbkNvbHVtbnNDb3VudDogMCxcbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IDEwLFxuICByZW5kZXJDZWxsUmFuZ2VzOiBkZWZhdWx0UmVuZGVyQ2VsbFJhbmdlc1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEdyaWQ7XG5cblxuZnVuY3Rpb24gZGVmYXVsdFJlbmRlckNlbGxSYW5nZXMoX3JlZjgpIHtcbiAgdmFyIGNvbHVtbk1ldGFkYXRhID0gX3JlZjguY29sdW1uTWV0YWRhdGE7XG4gIHZhciBjb2x1bW5TdGFydEluZGV4ID0gX3JlZjguY29sdW1uU3RhcnRJbmRleDtcbiAgdmFyIGNvbHVtblN0b3BJbmRleCA9IF9yZWY4LmNvbHVtblN0b3BJbmRleDtcbiAgdmFyIHJlbmRlckNlbGwgPSBfcmVmOC5yZW5kZXJDZWxsO1xuICB2YXIgcm93TWV0YWRhdGEgPSBfcmVmOC5yb3dNZXRhZGF0YTtcbiAgdmFyIHJvd1N0YXJ0SW5kZXggPSBfcmVmOC5yb3dTdGFydEluZGV4O1xuICB2YXIgcm93U3RvcEluZGV4ID0gX3JlZjgucm93U3RvcEluZGV4O1xuXG4gIHZhciByZW5kZXJlZENlbGxzID0gW107XG5cbiAgZm9yICh2YXIgcm93SW5kZXggPSByb3dTdGFydEluZGV4OyByb3dJbmRleCA8PSByb3dTdG9wSW5kZXg7IHJvd0luZGV4KyspIHtcbiAgICB2YXIgcm93RGF0dW0gPSByb3dNZXRhZGF0YVtyb3dJbmRleF07XG5cbiAgICBmb3IgKHZhciBjb2x1bW5JbmRleCA9IGNvbHVtblN0YXJ0SW5kZXg7IGNvbHVtbkluZGV4IDw9IGNvbHVtblN0b3BJbmRleDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgdmFyIGNvbHVtbkRhdHVtID0gY29sdW1uTWV0YWRhdGFbY29sdW1uSW5kZXhdO1xuICAgICAgdmFyIHJlbmRlcmVkQ2VsbCA9IHJlbmRlckNlbGwoeyBjb2x1bW5JbmRleDogY29sdW1uSW5kZXgsIHJvd0luZGV4OiByb3dJbmRleCB9KTtcbiAgICAgIHZhciBrZXkgPSByb3dJbmRleCArICctJyArIGNvbHVtbkluZGV4O1xuXG4gICAgICBpZiAocmVuZGVyZWRDZWxsID09IG51bGwgfHwgcmVuZGVyZWRDZWxsID09PSBmYWxzZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNoaWxkID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgY2xhc3NOYW1lOiAnR3JpZF9fY2VsbCcsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGhlaWdodDogcm93RGF0dW0uc2l6ZSxcbiAgICAgICAgICAgIGxlZnQ6IGNvbHVtbkRhdHVtLm9mZnNldCxcbiAgICAgICAgICAgIHRvcDogcm93RGF0dW0ub2Zmc2V0LFxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbkRhdHVtLnNpemVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICAgKTtcblxuICAgICAgcmVuZGVyZWRDZWxscy5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVuZGVyZWRDZWxscztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkdyaWQgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfR3JpZDIgPSByZXF1aXJlKCcuL0dyaWQnKTtcblxudmFyIF9HcmlkMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0dyaWQzLmRlZmF1bHQ7XG5leHBvcnRzLkdyaWQgPSBfR3JpZDMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0O1xuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRoYXQgZGV0ZXJtaW5lcyB3aGVuIHRvIHJlY2FsY3VsYXRlIHJvdyBvciBjb2x1bW4gbWV0YWRhdGEuXG4gKlxuICogQHBhcmFtIGNlbGxDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgTWV0aG9kIHRvIGludm9rZSBpZiBjZWxsIG1ldGFkYXRhIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzIFBhcmFtZXRlcnMgdG8gcGFzcyB0byA6Y29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgRmxhZyBzcGVjaWZ5aW5nIHRoYXQgbWV0YWRhdGEgc2hvdWxkIGJlIHJlY2FsY3VsYXRlZFxuICogQHBhcmFtIG5leHRDZWxsc0NvdW50IE5ld2x5IHVwZGF0ZWQgbnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1ucyBpbiB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gbmV4dENlbGxzU2l6ZSBOZXdseSB1cGRhdGVkIHdpZHRoIG9yIGhlaWdodCBvZiBjZWxscyBmb3IgdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG5leHRTY3JvbGxUb0luZGV4IE5ld2x5IHVwZGF0ZWQgc2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gc2Nyb2xsVG9JbmRleCBTY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSB1cGRhdGVTY3JvbGxPZmZzZXRGb3JTY3JvbGxUb0luZGV4IENhbGxiYWNrIHRvIGludm9rZSBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNob3VsZCBiZSByZWNhbGN1bGF0ZWRcbiAqL1xuZnVuY3Rpb24gY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldChfcmVmKSB7XG4gIHZhciBjZWxsQ291bnQgPSBfcmVmLmNlbGxDb3VudDtcbiAgdmFyIGNlbGxTaXplID0gX3JlZi5jZWxsU2l6ZTtcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrID0gX3JlZi5jb21wdXRlTWV0YWRhdGFDYWxsYmFjaztcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHMgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHM7XG4gIHZhciBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZTtcbiAgdmFyIG5leHRDZWxsc0NvdW50ID0gX3JlZi5uZXh0Q2VsbHNDb3VudDtcbiAgdmFyIG5leHRDZWxsU2l6ZSA9IF9yZWYubmV4dENlbGxTaXplO1xuICB2YXIgbmV4dFNjcm9sbFRvSW5kZXggPSBfcmVmLm5leHRTY3JvbGxUb0luZGV4O1xuICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9yZWYuc2Nyb2xsVG9JbmRleDtcbiAgdmFyIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXggPSBfcmVmLnVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXg7XG5cbiAgLy8gRG9uJ3QgY29tcGFyZSBjZWxsIHNpemVzIGlmIHRoZXkgYXJlIGZ1bmN0aW9ucyBiZWNhdXNlIGlubGluZSBmdW5jdGlvbnMgd291bGQgY2F1c2UgaW5maW5pdGUgbG9vcHMuXG4gIC8vIEluIHRoYXQgZXZlbnQgdXNlcnMgc2hvdWxkIHVzZSB0aGUgbWFudWFsIHJlY29tcHV0ZSBtZXRob2RzIHRvIGluZm9ybSBvZiBjaGFuZ2VzLlxuICBpZiAoY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlIHx8IGNlbGxDb3VudCAhPT0gbmV4dENlbGxzQ291bnQgfHwgKHR5cGVvZiBjZWxsU2l6ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG5leHRDZWxsU2l6ZSA9PT0gJ251bWJlcicpICYmIGNlbGxTaXplICE9PSBuZXh0Q2VsbFNpemUpIHtcbiAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFjayhjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzKTtcblxuICAgIC8vIFVwZGF0ZWQgY2VsbCBtZXRhZGF0YSBtYXkgaGF2ZSBoaWRkZW4gdGhlIHByZXZpb3VzIHNjcm9sbGVkLXRvIGl0ZW0uXG4gICAgLy8gSW4gdGhpcyBjYXNlIHdlIHNob3VsZCBhbHNvIHVwZGF0ZSB0aGUgc2Nyb2xsVG9wIHRvIGVuc3VyZSBpdCBzdGF5cyB2aXNpYmxlLlxuICAgIGlmIChzY3JvbGxUb0luZGV4ID49IDAgJiYgc2Nyb2xsVG9JbmRleCA9PT0gbmV4dFNjcm9sbFRvSW5kZXgpIHtcbiAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXgoKTtcbiAgICB9XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldE5lYXJlc3RJbmRleDtcbi8qKlxuICogRmluZHMgdGhlIG5lYXJlc3QgdmFsaWQgaW5kZXggdG8gdGhlIG9uZSBzcGVjaWZpZWQgaWYgdGhlIHNwZWNpZmllZCBpbmRleCBpcyBpbnZhbGlkLlxuICogQHBhcmFtIGNlbGxDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSB0YXJnZXRJbmRleCBJbmRleCB0byB1c2UgaWYgcG9zc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0TmVhcmVzdEluZGV4KF9yZWYpIHtcbiAgdmFyIGNlbGxDb3VudCA9IF9yZWYuY2VsbENvdW50O1xuICB2YXIgdGFyZ2V0SW5kZXggPSBfcmVmLnRhcmdldEluZGV4O1xuXG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihjZWxsQ291bnQgLSAxLCB0YXJnZXRJbmRleCkpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0T3ZlcnNjYW5JbmRpY2VzO1xuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgY2VsbHMgdG8gb3ZlcnNjYW4gYmVmb3JlIGFuZCBhZnRlciBhIHNwZWNpZmllZCByYW5nZS5cbiAqIFRoaXMgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IG92ZXJzY2FubmluZyBkb2Vzbid0IGV4Y2VlZCB0aGUgYXZhaWxhYmxlIGNlbGxzLlxuICogQHBhcmFtIGNlbGxDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBvdmVyc2NhbkNlbGxzQ291bnQgTWF4aW11bSBudW1iZXIgb2YgY2VsbHMgdG8gb3Zlci1yZW5kZXIgaW4gZWl0aGVyIGRpcmVjdGlvblxuICogQHBhcmFtIHN0YXJ0SW5kZXggQmVnaW4gb2YgcmFuZ2Ugb2YgdmlzaWJsZSBjZWxsc1xuICogQHBhcmFtIHN0b3BJbmRleCBFbmQgb2YgcmFuZ2Ugb2YgdmlzaWJsZSBjZWxsc1xuICovXG5mdW5jdGlvbiBnZXRPdmVyc2NhbkluZGljZXMoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBvdmVyc2NhbkNlbGxzQ291bnQgPSBfcmVmLm92ZXJzY2FuQ2VsbHNDb3VudDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmLnN0YXJ0SW5kZXg7XG4gIHZhciBzdG9wSW5kZXggPSBfcmVmLnN0b3BJbmRleDtcblxuICByZXR1cm4ge1xuICAgIG92ZXJzY2FuU3RhcnRJbmRleDogTWF0aC5tYXgoMCwgc3RhcnRJbmRleCAtIG92ZXJzY2FuQ2VsbHNDb3VudCksXG4gICAgb3ZlcnNjYW5TdG9wSW5kZXg6IE1hdGgubWluKGNlbGxDb3VudCAtIDEsIHN0b3BJbmRleCArIG92ZXJzY2FuQ2VsbHNDb3VudClcbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFZpc2libGVDZWxsSW5kaWNlcztcbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcmFuZ2Ugb2YgY2VsbHMgdG8gZGlzcGxheSBmb3IgYSBnaXZlbiBvZmZzZXQgaW4gb3JkZXIgdG8gZmlsbCB0aGUgc3BlY2lmaWVkIGNvbnRhaW5lci5cbiAqXG4gKiBAcGFyYW0gY2VsbE1ldGFkYXRhIE1ldGFkYXRhIGluaXRpYWxseSBjb21wdXRlZCBieSBpbml0Q2VsbE1ldGFkYXRhKClcbiAqIEBwYXJhbSBjb250YWluZXJTaXplIFRvdGFsIHNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIGN1cnJlbnRPZmZzZXQgQ29udGFpbmVyJ3MgY3VycmVudCAoeCBvciB5KSBvZmZzZXRcbiAqIEByZXR1cm4gQW4gb2JqZWN0IGNvbnRhaW5pbmcgOnN0YXJ0IGFuZCA6c3RvcCBhdHRyaWJ1dGVzLCBlYWNoIHNwZWNpZnlpbmcgYSBjZWxsIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGdldFZpc2libGVDZWxsSW5kaWNlcyhfcmVmKSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmLmNlbGxNZXRhZGF0YTtcbiAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmLmNvbnRhaW5lclNpemU7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gX3JlZi5jdXJyZW50T2Zmc2V0O1xuXG4gIHZhciBjZWxsQ291bnQgPSBjZWxsTWV0YWRhdGEubGVuZ3RoO1xuXG4gIGlmIChjZWxsQ291bnQgPT09IDApIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvLyBUT0RPIEFkZCBiZXR0ZXIgZ3VhcmRzIGhlcmUgYWdhaW5zdCBOYU4gb2Zmc2V0XG5cbiAgdmFyIGxhc3REYXR1bSA9IGNlbGxNZXRhZGF0YVtjZWxsTWV0YWRhdGEubGVuZ3RoIC0gMV07XG4gIHZhciB0b3RhbENlbGxTaXplID0gbGFzdERhdHVtLm9mZnNldCArIGxhc3REYXR1bS5zaXplO1xuXG4gIC8vIEVuc3VyZSBvZmZzZXQgaXMgd2l0aGluIHJlYXNvbmFibGUgYm91bmRzXG4gIGN1cnJlbnRPZmZzZXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbENlbGxTaXplIC0gY29udGFpbmVyU2l6ZSwgY3VycmVudE9mZnNldCkpO1xuXG4gIHZhciBtYXhPZmZzZXQgPSBNYXRoLm1pbih0b3RhbENlbGxTaXplLCBjdXJyZW50T2Zmc2V0ICsgY29udGFpbmVyU2l6ZSk7XG5cbiAgdmFyIHN0YXJ0ID0gZmluZE5lYXJlc3RDZWxsKHtcbiAgICBjZWxsTWV0YWRhdGE6IGNlbGxNZXRhZGF0YSxcbiAgICBtb2RlOiBFUVVBTF9PUl9MT1dFUixcbiAgICBvZmZzZXQ6IGN1cnJlbnRPZmZzZXRcbiAgfSk7XG5cbiAgdmFyIGRhdHVtID0gY2VsbE1ldGFkYXRhW3N0YXJ0XTtcbiAgY3VycmVudE9mZnNldCA9IGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG5cbiAgdmFyIHN0b3AgPSBzdGFydDtcblxuICB3aGlsZSAoY3VycmVudE9mZnNldCA8IG1heE9mZnNldCAmJiBzdG9wIDwgY2VsbENvdW50IC0gMSkge1xuICAgIHN0b3ArKztcblxuICAgIGN1cnJlbnRPZmZzZXQgKz0gY2VsbE1ldGFkYXRhW3N0b3BdLnNpemU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBzdG9wOiBzdG9wXG4gIH07XG59XG5cbi8qKlxuICogQmluYXJ5IHNlYXJjaCBmdW5jdGlvbiBpbnNwaXJlZCBieSByZWFjdC1pbmZpbml0ZS5cbiAqL1xuZnVuY3Rpb24gZmluZE5lYXJlc3RDZWxsKF9yZWYyKSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmMi5jZWxsTWV0YWRhdGE7XG4gIHZhciBtb2RlID0gX3JlZjIubW9kZTtcbiAgdmFyIG9mZnNldCA9IF9yZWYyLm9mZnNldDtcblxuICB2YXIgaGlnaCA9IGNlbGxNZXRhZGF0YS5sZW5ndGggLSAxO1xuICB2YXIgbG93ID0gMDtcbiAgdmFyIG1pZGRsZSA9IHVuZGVmaW5lZDtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSB1bmRlZmluZWQ7XG5cbiAgLy8gVE9ETyBBZGQgYmV0dGVyIGd1YXJkcyBoZXJlIGFnYWluc3QgTmFOIG9mZnNldFxuXG4gIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgIG1pZGRsZSA9IGxvdyArIE1hdGguZmxvb3IoKGhpZ2ggLSBsb3cpIC8gMik7XG4gICAgY3VycmVudE9mZnNldCA9IGNlbGxNZXRhZGF0YVttaWRkbGVdLm9mZnNldDtcblxuICAgIGlmIChjdXJyZW50T2Zmc2V0ID09PSBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBtaWRkbGU7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50T2Zmc2V0IDwgb2Zmc2V0KSB7XG4gICAgICBsb3cgPSBtaWRkbGUgKyAxO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA+IG9mZnNldCkge1xuICAgICAgaGlnaCA9IG1pZGRsZSAtIDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IEVRVUFMX09SX0xPV0VSICYmIGxvdyA+IDApIHtcbiAgICByZXR1cm4gbG93IC0gMTtcbiAgfSBlbHNlIGlmIChtb2RlID09PSBFUVVBTF9PUl9ISUdIRVIgJiYgaGlnaCA8IGNlbGxNZXRhZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGhpZ2ggKyAxO1xuICB9XG59XG5cbnZhciBFUVVBTF9PUl9MT1dFUiA9IDE7XG52YXIgRVFVQUxfT1JfSElHSEVSID0gMjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB1cGRhdGVTY3JvbGxJbmRleEhlbHBlcjtcblxudmFyIF9nZXROZWFyZXN0SW5kZXggPSByZXF1aXJlKCcuL2dldE5lYXJlc3RJbmRleCcpO1xuXG52YXIgX2dldE5lYXJlc3RJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXROZWFyZXN0SW5kZXgpO1xuXG52YXIgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCcpO1xuXG52YXIgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hlbiB0byB1cGRhdGUgc2Nyb2xsIG9mZnNldHMgdG8gZW5zdXJlIHRoYXQgYSBzY3JvbGwtdG8taW5kZXggcmVtYWlucyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBjZWxsTWV0YWRhdGEgTWV0YWRhdGEgaW5pdGlhbGx5IGNvbXB1dGVkIGJ5IGluaXRDZWxsTWV0YWRhdGEoKVxuICogQHBhcmFtIGNlbGxDb3VudCBOdW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjZWxsc1NpemUgV2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gcHJldmlvdXNDZWxsc0NvdW50IFByZXZpb3VzIG51bWJlciBvZiByb3dzIG9yIGNvbHVtbnNcbiAqIEBwYXJhbSBwcmV2aW91c0NlbGxzU2l6ZSBQcmV2aW91cyB3aWR0aCBvciBoZWlnaHQgb2YgY2VsbHNcbiAqIEBwYXJhbSBwcmV2aW91c1Njcm9sbFRvSW5kZXggUHJldmlvdXMgc2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gcHJldmlvdXNTaXplIFByZXZpb3VzIHdpZHRoIG9yIGhlaWdodCBvZiB0aGUgdmlydHVhbGl6ZWQgY29udGFpbmVyXG4gKiBAcGFyYW0gc2Nyb2xsT2Zmc2V0IEN1cnJlbnQgc2Nyb2xsTGVmdCBvciBzY3JvbGxUb3BcbiAqIEBwYXJhbSBzY3JvbGxUb0luZGV4IFNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHNpemUgV2lkdGggb3IgaGVpZ2h0IG9mIHRoZSB2aXJ0dWFsaXplZCBjb250YWluZXJcbiAqIEBwYXJhbSB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGFuIHNjcm9sbC10by1pbmRleCB2YWx1ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxJbmRleEhlbHBlcihfcmVmKSB7XG4gIHZhciBjZWxsTWV0YWRhdGEgPSBfcmVmLmNlbGxNZXRhZGF0YTtcbiAgdmFyIGNlbGxDb3VudCA9IF9yZWYuY2VsbENvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgcHJldmlvdXNDZWxsc0NvdW50ID0gX3JlZi5wcmV2aW91c0NlbGxzQ291bnQ7XG4gIHZhciBwcmV2aW91c0NlbGxTaXplID0gX3JlZi5wcmV2aW91c0NlbGxTaXplO1xuICB2YXIgcHJldmlvdXNTY3JvbGxUb0luZGV4ID0gX3JlZi5wcmV2aW91c1Njcm9sbFRvSW5kZXg7XG4gIHZhciBwcmV2aW91c1NpemUgPSBfcmVmLnByZXZpb3VzU2l6ZTtcbiAgdmFyIHNjcm9sbE9mZnNldCA9IF9yZWYuc2Nyb2xsT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9yZWYuc2Nyb2xsVG9JbmRleDtcbiAgdmFyIHNpemUgPSBfcmVmLnNpemU7XG4gIHZhciB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrID0gX3JlZi51cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrO1xuXG4gIHZhciBoYXNTY3JvbGxUb0luZGV4ID0gc2Nyb2xsVG9JbmRleCA+PSAwICYmIHNjcm9sbFRvSW5kZXggPCBjZWxsQ291bnQ7XG4gIHZhciBzaXplSGFzQ2hhbmdlZCA9IHNpemUgIT09IHByZXZpb3VzU2l6ZSB8fCAhcHJldmlvdXNDZWxsU2l6ZSB8fCB0eXBlb2YgY2VsbFNpemUgPT09ICdudW1iZXInICYmIGNlbGxTaXplICE9PSBwcmV2aW91c0NlbGxTaXplO1xuXG4gIC8vIElmIHdlIGhhdmUgYSBuZXcgc2Nyb2xsIHRhcmdldCBPUiBpZiBoZWlnaHQvcm93LWhlaWdodCBoYXMgY2hhbmdlZCxcbiAgLy8gV2Ugc2hvdWxkIGVuc3VyZSB0aGF0IHRoZSBzY3JvbGwgdGFyZ2V0IGlzIHZpc2libGUuXG4gIGlmIChoYXNTY3JvbGxUb0luZGV4ICYmIChzaXplSGFzQ2hhbmdlZCB8fCBzY3JvbGxUb0luZGV4ICE9PSBwcmV2aW91c1Njcm9sbFRvSW5kZXgpKSB7XG4gICAgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayhzY3JvbGxUb0luZGV4KTtcblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBzZWxlY3RlZCBpdGVtIGJ1dCBsaXN0IHNpemUgb3IgbnVtYmVyIG9mIGNoaWxkcmVuIGhhdmUgZGVjcmVhc2VkLFxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBhcmVuJ3Qgc2Nyb2xsZWQgdG9vIGZhciBwYXN0IHRoZSBjdXJyZW50IGNvbnRlbnQuXG4gIH0gZWxzZSBpZiAoIWhhc1Njcm9sbFRvSW5kZXggJiYgY2VsbENvdW50ID4gMCAmJiAoc2l6ZSA8IHByZXZpb3VzU2l6ZSB8fCBjZWxsQ291bnQgPCBwcmV2aW91c0NlbGxzQ291bnQpKSB7XG4gICAgICBzY3JvbGxUb0luZGV4ID0gKDAsIF9nZXROZWFyZXN0SW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiBjZWxsQ291bnQsXG4gICAgICAgIHRhcmdldEluZGV4OiBjZWxsQ291bnQgLSAxXG4gICAgICB9KTtcblxuICAgICAgaWYgKHNjcm9sbFRvSW5kZXggPCBjZWxsQ291bnQpIHtcbiAgICAgICAgdmFyIGNlbGxNZXRhZGF0dW0gPSBjZWxsTWV0YWRhdGFbc2Nyb2xsVG9JbmRleF07XG4gICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0ID0gKDAsIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjZWxsTWV0YWRhdHVtLm9mZnNldCxcbiAgICAgICAgICBjZWxsU2l6ZTogY2VsbE1ldGFkYXR1bS5zaXplLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHNpemUsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsT2Zmc2V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ubHkgYWRqdXN0IHRoZSBzY3JvbGwgcG9zaXRpb24gaWYgd2UndmUgc2Nyb2xsZWQgYmVsb3cgdGhlIGxhc3Qgc2V0IG9mIHJvd3MuXG4gICAgICAgIGlmIChjYWxjdWxhdGVkU2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgICAgdXBkYXRlU2Nyb2xsSW5kZXhDYWxsYmFjayhjZWxsQ291bnQgLSAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmV4cG9ydHMuaXNSYW5nZVZpc2libGUgPSBpc1JhbmdlVmlzaWJsZTtcbmV4cG9ydHMuc2NhbkZvclVubG9hZGVkUmFuZ2VzID0gc2NhbkZvclVubG9hZGVkUmFuZ2VzO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIaWdoZXItb3JkZXIgY29tcG9uZW50IHRoYXQgbWFuYWdlcyBsYXp5LWxvYWRpbmcgZm9yIFwiaW5maW5pdGVcIiBkYXRhLlxuICogVGhpcyBjb21wb25lbnQgZGVjb3JhdGVzIGEgdmlydHVhbCBjb21wb25lbnQgYW5kIGp1c3QtaW4tdGltZSBwcmVmZXRjaGVzIHJvd3MgYXMgYSB1c2VyIHNjcm9sbHMuXG4gKiBJdCBpcyBpbnRlbmRlZCBhcyBhIGNvbnZlbmllbmNlIGNvbXBvbmVudDsgZm9yayBpdCBpZiB5b3UnZCBsaWtlIGZpbmVyLWdyYWluZWQgY29udHJvbCBvdmVyIGRhdGEtbG9hZGluZy5cbiAqL1xuXG52YXIgSW5maW5pdGVMb2FkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoSW5maW5pdGVMb2FkZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEluZmluaXRlTG9hZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEluZmluaXRlTG9hZGVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihJbmZpbml0ZUxvYWRlcikuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuX29uUm93c1JlbmRlcmVkID0gX3RoaXMuX29uUm93c1JlbmRlcmVkLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9yZWdpc3RlckNoaWxkID0gX3RoaXMuX3JlZ2lzdGVyQ2hpbGQuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEluZmluaXRlTG9hZGVyLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgb25Sb3dzUmVuZGVyZWQ6IHRoaXMuX29uUm93c1JlbmRlcmVkLFxuICAgICAgICByZWdpc3RlckNoaWxkOiB0aGlzLl9yZWdpc3RlckNoaWxkXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzaG91bGRDb21wb25lbnRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyLmRlZmF1bHQpKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Sb3dzUmVuZGVyZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Sb3dzUmVuZGVyZWQoX3JlZikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdGFydEluZGV4ID0gX3JlZi5zdGFydEluZGV4O1xuICAgICAgdmFyIHN0b3BJbmRleCA9IF9yZWYuc3RvcEluZGV4O1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaXNSb3dMb2FkZWQgPSBfcHJvcHMuaXNSb3dMb2FkZWQ7XG4gICAgICB2YXIgbG9hZE1vcmVSb3dzID0gX3Byb3BzLmxvYWRNb3JlUm93cztcbiAgICAgIHZhciBtaW5pbXVtQmF0Y2hTaXplID0gX3Byb3BzLm1pbmltdW1CYXRjaFNpemU7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzLnJvd3NDb3VudDtcbiAgICAgIHZhciB0aHJlc2hvbGQgPSBfcHJvcHMudGhyZXNob2xkO1xuXG5cbiAgICAgIHRoaXMuX2xhc3RSZW5kZXJlZFN0YXJ0SW5kZXggPSBzdGFydEluZGV4O1xuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkU3RvcEluZGV4ID0gc3RvcEluZGV4O1xuXG4gICAgICB2YXIgdW5sb2FkZWRSYW5nZXMgPSBzY2FuRm9yVW5sb2FkZWRSYW5nZXMoe1xuICAgICAgICBpc1Jvd0xvYWRlZDogaXNSb3dMb2FkZWQsXG4gICAgICAgIG1pbmltdW1CYXRjaFNpemU6IG1pbmltdW1CYXRjaFNpemUsXG4gICAgICAgIHJvd3NDb3VudDogcm93c0NvdW50LFxuICAgICAgICBzdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gdGhyZXNob2xkKSxcbiAgICAgICAgc3RvcEluZGV4OiBNYXRoLm1pbihyb3dzQ291bnQgLSAxLCBzdG9wSW5kZXggKyB0aHJlc2hvbGQpXG4gICAgICB9KTtcblxuICAgICAgdW5sb2FkZWRSYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAodW5sb2FkZWRSYW5nZSkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IGxvYWRNb3JlUm93cyh1bmxvYWRlZFJhbmdlKTtcbiAgICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVmcmVzaCB0aGUgdmlzaWJsZSByb3dzIGlmIGFueSBvZiB0aGVtIGhhdmUganVzdCBiZWVuIGxvYWRlZC5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0aGV5IHdpbGwgcmVtYWluIGluIHRoZWlyIHVubG9hZGVkIHZpc3VhbCBzdGF0ZS5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlVmlzaWJsZSh7XG4gICAgICAgICAgICAgIGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXg6IF90aGlzMi5fbGFzdFJlbmRlcmVkU3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgbGFzdFJlbmRlcmVkU3RvcEluZGV4OiBfdGhpczIuX2xhc3RSZW5kZXJlZFN0b3BJbmRleCxcbiAgICAgICAgICAgICAgc3RhcnRJbmRleDogdW5sb2FkZWRSYW5nZS5zdGFydEluZGV4LFxuICAgICAgICAgICAgICBzdG9wSW5kZXg6IHVubG9hZGVkUmFuZ2Uuc3RvcEluZGV4XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMyLl9yZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuX3JlZ2lzdGVyZWRDaGlsZC5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZWdpc3RlckNoaWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlZ2lzdGVyQ2hpbGQocmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICB0aGlzLl9yZWdpc3RlcmVkQ2hpbGQgPSByZWdpc3RlcmVkQ2hpbGQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEluZmluaXRlTG9hZGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBzcGVjaWZpZWQgc3RhcnQvc3RvcCByYW5nZSBpcyB2aXNpYmxlIGJhc2VkIG9uIHRoZSBtb3N0IHJlY2VudGx5IHJlbmRlcmVkIHJhbmdlLlxuICovXG5cblxuSW5maW5pdGVMb2FkZXIucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyBhIHZpcnR1YWxpemVkIGNvbXBvbmVudC5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBvblJvd3NSZW5kZXJlZCwgcmVnaXN0ZXJDaGlsZCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWVkIDpvblJvd3NSZW5kZXJlZCBmdW5jdGlvbiBzaG91bGQgYmUgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGNoaWxkJ3MgOm9uUm93c1JlbmRlcmVkIHByb3BlcnR5LlxuICAgKiBUaGUgOnJlZ2lzdGVyQ2hpbGQgY2FsbGJhY2sgc2hvdWxkIGJlIHNldCBhcyB0aGUgdmlydHVhbGl6ZWQgY29tcG9uZW50J3MgOnJlZi5cbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIHRyYWNraW5nIHRoZSBsb2FkZWQgc3RhdGUgb2YgZWFjaCByb3cuXG4gICAqIEl0IHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6IChpbmRleDogbnVtYmVyKTogYm9vbGVhblxuICAgKi9cbiAgaXNSb3dMb2FkZWQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gbW9yZSByb3dzIG11c3QgYmUgbG9hZGVkLlxuICAgKiBJdCBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IFByb21pc2VcbiAgICogVGhlIHJldHVybmVkIFByb21pc2Ugc2hvdWxkIGJlIHJlc29sdmVkIG9uY2Ugcm93IGRhdGEgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAqIEl0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hlbiB0byByZWZyZXNoIHRoZSBsaXN0IHdpdGggdGhlIG5ld2x5LWxvYWRlZCBkYXRhLlxuICAgKiBUaGlzIGNhbGxiYWNrIG1heSBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgaW4gcmVhY3Rpb24gdG8gYSBzaW5nbGUgc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgbG9hZE1vcmVSb3dzOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTWluaW11bSBudW1iZXIgb2Ygcm93cyB0byBiZSBsb2FkZWQgYXQgYSB0aW1lLlxuICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIGJhdGNoIHJlcXVlc3RzIHRvIHJlZHVjZSBIVFRQIHJlcXVlc3RzLlxuICAgKi9cbiAgbWluaW11bUJhdGNoU2l6ZTogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdDsgY2FuIGJlIGFyYml0cmFyeSBoaWdoIG51bWJlciBpZiBhY3R1YWwgbnVtYmVyIGlzIHVua25vd24uXG4gICAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFRocmVzaG9sZCBhdCB3aGljaCB0byBwcmUtZmV0Y2ggZGF0YS5cbiAgICogQSB0aHJlc2hvbGQgWCBtZWFucyB0aGF0IGRhdGEgd2lsbCBzdGFydCBsb2FkaW5nIHdoZW4gYSB1c2VyIHNjcm9sbHMgd2l0aGluIFggcm93cy5cbiAgICogVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byAxNS5cbiAgICovXG4gIHRocmVzaG9sZDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkluZmluaXRlTG9hZGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgbWluaW11bUJhdGNoU2l6ZTogMTAsXG4gIHJvd3NDb3VudDogMCxcbiAgdGhyZXNob2xkOiAxNVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEluZmluaXRlTG9hZGVyO1xuZnVuY3Rpb24gaXNSYW5nZVZpc2libGUoX3JlZjIpIHtcbiAgdmFyIGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXggPSBfcmVmMi5sYXN0UmVuZGVyZWRTdGFydEluZGV4O1xuICB2YXIgbGFzdFJlbmRlcmVkU3RvcEluZGV4ID0gX3JlZjIubGFzdFJlbmRlcmVkU3RvcEluZGV4O1xuICB2YXIgc3RhcnRJbmRleCA9IF9yZWYyLnN0YXJ0SW5kZXg7XG4gIHZhciBzdG9wSW5kZXggPSBfcmVmMi5zdG9wSW5kZXg7XG5cbiAgcmV0dXJuICEoc3RhcnRJbmRleCA+IGxhc3RSZW5kZXJlZFN0b3BJbmRleCB8fCBzdG9wSW5kZXggPCBsYXN0UmVuZGVyZWRTdGFydEluZGV4KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBvZiB0aGUgcmFuZ2VzIHdpdGhpbiBhIGxhcmdlciByYW5nZSB0aGF0IGNvbnRhaW4gdW5sb2FkZWQgcm93cy5cbiAqL1xuZnVuY3Rpb24gc2NhbkZvclVubG9hZGVkUmFuZ2VzKF9yZWYzKSB7XG4gIHZhciBpc1Jvd0xvYWRlZCA9IF9yZWYzLmlzUm93TG9hZGVkO1xuICB2YXIgbWluaW11bUJhdGNoU2l6ZSA9IF9yZWYzLm1pbmltdW1CYXRjaFNpemU7XG4gIHZhciByb3dzQ291bnQgPSBfcmVmMy5yb3dzQ291bnQ7XG4gIHZhciBzdGFydEluZGV4ID0gX3JlZjMuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWYzLnN0b3BJbmRleDtcblxuICB2YXIgdW5sb2FkZWRSYW5nZXMgPSBbXTtcblxuICB2YXIgcmFuZ2VTdGFydEluZGV4ID0gbnVsbDtcbiAgdmFyIHJhbmdlU3RvcEluZGV4ID0gbnVsbDtcblxuICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8PSBzdG9wSW5kZXg7IGkrKykge1xuICAgIHZhciBsb2FkZWQgPSBpc1Jvd0xvYWRlZChpKTtcblxuICAgIGlmICghbG9hZGVkKSB7XG4gICAgICByYW5nZVN0b3BJbmRleCA9IGk7XG4gICAgICBpZiAocmFuZ2VTdGFydEluZGV4ID09PSBudWxsKSB7XG4gICAgICAgIHJhbmdlU3RhcnRJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyYW5nZVN0b3BJbmRleCAhPT0gbnVsbCkge1xuICAgICAgdW5sb2FkZWRSYW5nZXMucHVzaCh7XG4gICAgICAgIHN0YXJ0SW5kZXg6IHJhbmdlU3RhcnRJbmRleCxcbiAgICAgICAgc3RvcEluZGV4OiByYW5nZVN0b3BJbmRleFxuICAgICAgfSk7XG5cbiAgICAgIHJhbmdlU3RhcnRJbmRleCA9IHJhbmdlU3RvcEluZGV4ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2VTdG9wSW5kZXggIT09IG51bGwpIHtcbiAgICAvLyBBdHRlbXB0IHRvIHNhdGlzZnkgOm1pbmltdW1CYXRjaFNpemUgcmVxdWlyZW1lbnQgYnV0IGRvbid0IGV4Y2VlZCA6cm93c0NvdW50XG4gICAgdmFyIHBvdGVudGlhbFN0b3BJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KHJhbmdlU3RvcEluZGV4LCByYW5nZVN0YXJ0SW5kZXggKyBtaW5pbXVtQmF0Y2hTaXplIC0gMSksIHJvd3NDb3VudCAtIDEpO1xuXG4gICAgZm9yICh2YXIgaSA9IHJhbmdlU3RvcEluZGV4ICsgMTsgaSA8PSBwb3RlbnRpYWxTdG9wSW5kZXg7IGkrKykge1xuICAgICAgaWYgKCFpc1Jvd0xvYWRlZChpKSkge1xuICAgICAgICByYW5nZVN0b3BJbmRleCA9IGk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1bmxvYWRlZFJhbmdlcy5wdXNoKHtcbiAgICAgIHN0YXJ0SW5kZXg6IHJhbmdlU3RhcnRJbmRleCxcbiAgICAgIHN0b3BJbmRleDogcmFuZ2VTdG9wSW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB1bmxvYWRlZFJhbmdlcztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0luZmluaXRlTG9hZGVyMiA9IHJlcXVpcmUoJy4vSW5maW5pdGVMb2FkZXInKTtcblxudmFyIF9JbmZpbml0ZUxvYWRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmZpbml0ZUxvYWRlcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfSW5maW5pdGVMb2FkZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkluZmluaXRlTG9hZGVyID0gX0luZmluaXRlTG9hZGVyMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSE9DIHRoYXQgc2ltcGxpZmllcyB0aGUgcHJvY2VzcyBvZiBzeW5jaHJvbml6aW5nIHNjcm9sbGluZyBiZXR3ZWVuIHR3byBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gKi9cblxudmFyIFNjcm9sbFN5bmMgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoU2Nyb2xsU3luYywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gU2Nyb2xsU3luYyhwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JvbGxTeW5jKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihTY3JvbGxTeW5jKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsaWVudEhlaWdodDogMCxcbiAgICAgIGNsaWVudFdpZHRoOiAwLFxuICAgICAgc2Nyb2xsSGVpZ2h0OiAwLFxuICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIHNjcm9sbFdpZHRoOiAwXG4gICAgfTtcblxuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2Nyb2xsU3luYywgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3N0YXRlLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IF9zdGF0ZS5jbGllbnRXaWR0aDtcbiAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfc3RhdGUuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbFdpZHRoID0gX3N0YXRlLnNjcm9sbFdpZHRoO1xuXG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LFxuICAgICAgICBjbGllbnRXaWR0aDogY2xpZW50V2lkdGgsXG4gICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChfcmVmKSB7XG4gICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBfcmVmLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsV2lkdGggPSBfcmVmLnNjcm9sbFdpZHRoO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIGNsaWVudFdpZHRoOiBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0OiBzY3JvbGxIZWlnaHQsIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aDogc2Nyb2xsV2lkdGggfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNjcm9sbFN5bmM7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5TY3JvbGxTeW5jLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgMiBvciBtb3JlIHZpcnR1YWxpemVkIGNvbXBvbmVudHMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICogKHsgb25TY3JvbGwsIHNjcm9sbExlZnQsIHNjcm9sbFRvcCB9KSA9PiBQcm9wVHlwZXMuZWxlbWVudFxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gU2Nyb2xsU3luYzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfU2Nyb2xsU3luYzIgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxudmFyIF9TY3JvbGxTeW5jMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Njcm9sbFN5bmMyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX1Njcm9sbFN5bmMzLmRlZmF1bHQ7XG5leHBvcnRzLlNjcm9sbFN5bmMgPSBfU2Nyb2xsU3luYzMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfY2xhc3NuYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIF9jbGFzc25hbWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzbmFtZXMpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEl0IGlzIGluZWZmaWNpZW50IHRvIGNyZWF0ZSBhbmQgbWFuYWdlIGEgbGFyZ2UgbGlzdCBvZiBET00gZWxlbWVudHMgd2l0aGluIGEgc2Nyb2xsaW5nIGNvbnRhaW5lclxuICogaWYgb25seSBhIGZldyBvZiB0aG9zZSBlbGVtZW50cyBhcmUgdmlzaWJsZS4gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIGNvbXBvbmVudCBpcyB0byBpbXByb3ZlXG4gKiBwZXJmb3JtYW5jZSBieSBvbmx5IHJlbmRlcmluZyB0aGUgRE9NIG5vZGVzIHRoYXQgYSB1c2VyIGlzIGFibGUgdG8gc2VlIGJhc2VkIG9uIHRoZWlyIGN1cnJlbnRcbiAqIHNjcm9sbCBwb3NpdGlvbi5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCByZW5kZXJzIGEgdmlydHVhbGl6ZWQgbGlzdCBvZiBlbGVtZW50cyB3aXRoIGVpdGhlciBmaXhlZCBvciBkeW5hbWljIGhlaWdodHMuXG4gKi9cblxudmFyIFZpcnR1YWxTY3JvbGwgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoVmlydHVhbFNjcm9sbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVmlydHVhbFNjcm9sbCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlydHVhbFNjcm9sbCk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZpcnR1YWxTY3JvbGwpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFZpcnR1YWxTY3JvbGwsIFt7XG4gICAga2V5OiAncmVjb21wdXRlUm93SGVpZ2h0cycsXG5cblxuICAgIC8qKlxuICAgICAqIFNlZSBHcmlkI3JlY29tcHV0ZUdyaWRTaXplXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlY29tcHV0ZVJvd0hlaWdodHMoKSB7XG4gICAgICB0aGlzLnJlZnMuR3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzLmhlaWdodDtcbiAgICAgIHZhciBub1Jvd3NSZW5kZXJlciA9IF9wcm9wcy5ub1Jvd3NSZW5kZXJlcjtcbiAgICAgIHZhciBvblJvd3NSZW5kZXJlZCA9IF9wcm9wcy5vblJvd3NSZW5kZXJlZDtcbiAgICAgIHZhciBfb25TY3JvbGwgPSBfcHJvcHMub25TY3JvbGw7XG4gICAgICB2YXIgcm93SGVpZ2h0ID0gX3Byb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dSZW5kZXJlciA9IF9wcm9wcy5yb3dSZW5kZXJlcjtcbiAgICAgIHZhciBvdmVyc2NhblJvd3NDb3VudCA9IF9wcm9wcy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvSW5kZXggPSBfcHJvcHMuc2Nyb2xsVG9JbmRleDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuXG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnVmlydHVhbFNjcm9sbCcsIGNsYXNzTmFtZSk7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfR3JpZDIuZGVmYXVsdCwge1xuICAgICAgICByZWY6ICdHcmlkJyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyxcbiAgICAgICAgY29sdW1uV2lkdGg6IHdpZHRoLFxuICAgICAgICBjb2x1bW5zQ291bnQ6IDEsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICBub0NvbnRlbnRSZW5kZXJlcjogbm9Sb3dzUmVuZGVyZXIsXG4gICAgICAgIG9uU2Nyb2xsOiBmdW5jdGlvbiBvblNjcm9sbChfcmVmKSB7XG4gICAgICAgICAgdmFyIGNsaWVudEhlaWdodCA9IF9yZWYuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBfcmVmLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZi5zY3JvbGxUb3A7XG4gICAgICAgICAgcmV0dXJuIF9vblNjcm9sbCh7IGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZChfcmVmMikge1xuICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0YXJ0SW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RvcEluZGV4ID0gX3JlZjIucm93T3ZlcnNjYW5TdG9wSW5kZXg7XG4gICAgICAgICAgdmFyIHJvd1N0YXJ0SW5kZXggPSBfcmVmMi5yb3dTdGFydEluZGV4O1xuICAgICAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmMi5yb3dTdG9wSW5kZXg7XG4gICAgICAgICAgcmV0dXJuIG9uUm93c1JlbmRlcmVkKHtcbiAgICAgICAgICAgIG92ZXJzY2FuU3RhcnRJbmRleDogcm93T3ZlcnNjYW5TdGFydEluZGV4LFxuICAgICAgICAgICAgb3ZlcnNjYW5TdG9wSW5kZXg6IHJvd092ZXJzY2FuU3RvcEluZGV4LFxuICAgICAgICAgICAgc3RhcnRJbmRleDogcm93U3RhcnRJbmRleCxcbiAgICAgICAgICAgIHN0b3BJbmRleDogcm93U3RvcEluZGV4XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG92ZXJzY2FuUm93c0NvdW50OiBvdmVyc2NhblJvd3NDb3VudCxcbiAgICAgICAgcmVuZGVyQ2VsbDogZnVuY3Rpb24gcmVuZGVyQ2VsbChfcmVmMykge1xuICAgICAgICAgIHZhciBjb2x1bW5JbmRleCA9IF9yZWYzLmNvbHVtbkluZGV4O1xuICAgICAgICAgIHZhciByb3dJbmRleCA9IF9yZWYzLnJvd0luZGV4O1xuICAgICAgICAgIHJldHVybiByb3dSZW5kZXJlcihyb3dJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJvd0hlaWdodDogcm93SGVpZ2h0LFxuICAgICAgICByb3dzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvSW5kZXgsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBWaXJ0dWFsU2Nyb2xsO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuVmlydHVhbFNjcm9sbC5wcm9wVHlwZXMgPSB7XG4gICdhcmlhLWxhYmVsJzogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIE9wdGlvbmFsIENTUyBjbGFzcyBuYW1lICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIEhlaWdodCBjb25zdHJhaW50IGZvciBsaXN0IChkZXRlcm1pbmVzIGhvdyBtYW55IGFjdHVhbCByb3dzIGFyZSByZW5kZXJlZCkgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiByb3dzQ291bnQgaXMgMCAqL1xuICBub1Jvd3NSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2xpY2Ugb2Ygcm93cyB0aGF0IHdlcmUganVzdCByZW5kZXJlZC5cbiAgICogKHsgc3RhcnRJbmRleCwgc3RvcEluZGV4IH0pOiB2b2lkXG4gICAqL1xuICBvblJvd3NSZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIHRvIHJlbmRlciBhYm92ZS9iZWxvdyB0aGUgdmlzaWJsZSBib3VuZHMgb2YgdGhlIGxpc3QuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgKi9cbiAgb3ZlcnNjYW5Sb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AgfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSZXNwb25zYmlsZSBmb3IgcmVuZGVyaW5nIGEgcm93IGdpdmVuIGFuIGluZGV4ICovXG4gIHJvd1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgaW4gbGlzdC4gKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkgKi9cbiAgc2Nyb2xsVG9JbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogV2lkdGggb2YgbGlzdCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblZpcnR1YWxTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICBub1Jvd3NSZW5kZXJlcjogZnVuY3Rpb24gbm9Sb3dzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uUm93c1JlbmRlcmVkOiBmdW5jdGlvbiBvblJvd3NSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdmVyc2NhblJvd3NDb3VudDogMTBcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBWaXJ0dWFsU2Nyb2xsOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVmlydHVhbFNjcm9sbCA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9WaXJ0dWFsU2Nyb2xsMiA9IHJlcXVpcmUoJy4vVmlydHVhbFNjcm9sbCcpO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVmlydHVhbFNjcm9sbDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfVmlydHVhbFNjcm9sbDMuZGVmYXVsdDtcbmV4cG9ydHMuVmlydHVhbFNjcm9sbCA9IF9WaXJ0dWFsU2Nyb2xsMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9BcnJvd0tleVN0ZXBwZXIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0Fycm93S2V5U3RlcHBlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BcnJvd0tleVN0ZXBwZXIuQXJyb3dLZXlTdGVwcGVyO1xuICB9XG59KTtcblxudmFyIF9BdXRvU2l6ZXIgPSByZXF1aXJlKCcuL0F1dG9TaXplcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0F1dG9TaXplcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9BdXRvU2l6ZXIuQXV0b1NpemVyO1xuICB9XG59KTtcblxudmFyIF9Db2xsZWN0aW9uID0gcmVxdWlyZSgnLi9Db2xsZWN0aW9uJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ29sbGVjdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Db2xsZWN0aW9uLkNvbGxlY3Rpb247XG4gIH1cbn0pO1xuXG52YXIgX0NvbHVtblNpemVyID0gcmVxdWlyZSgnLi9Db2x1bW5TaXplcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0NvbHVtblNpemVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NvbHVtblNpemVyLkNvbHVtblNpemVyO1xuICB9XG59KTtcblxudmFyIF9GbGV4VGFibGUgPSByZXF1aXJlKCcuL0ZsZXhUYWJsZScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0ZsZXhUYWJsZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuRmxleFRhYmxlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRmxleENvbHVtbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuRmxleENvbHVtbjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnREaXJlY3Rpb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLlNvcnREaXJlY3Rpb247XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTb3J0SW5kaWNhdG9yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5Tb3J0SW5kaWNhdG9yO1xuICB9XG59KTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi9HcmlkJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnR3JpZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9HcmlkLkdyaWQ7XG4gIH1cbn0pO1xuXG52YXIgX0luZmluaXRlTG9hZGVyID0gcmVxdWlyZSgnLi9JbmZpbml0ZUxvYWRlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0luZmluaXRlTG9hZGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0luZmluaXRlTG9hZGVyLkluZmluaXRlTG9hZGVyO1xuICB9XG59KTtcblxudmFyIF9TY3JvbGxTeW5jID0gcmVxdWlyZSgnLi9TY3JvbGxTeW5jJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU2Nyb2xsU3luYycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9TY3JvbGxTeW5jLlNjcm9sbFN5bmM7XG4gIH1cbn0pO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwgPSByZXF1aXJlKCcuL1ZpcnR1YWxTY3JvbGwnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdWaXJ0dWFsU2Nyb2xsJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1ZpcnR1YWxTY3JvbGwuVmlydHVhbFNjcm9sbDtcbiAgfVxufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVDYWxsYmFja01lbW9pemVyO1xuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSB0aGF0IHVwZGF0ZXMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayB3aGVuZXZlciBhbnkgb2YgdGhlIHNwZWNpZmllZCBpbmRpY2VzIGhhdmUgY2hhbmdlZC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FsbGJhY2tNZW1vaXplcigpIHtcbiAgdmFyIHJlcXVpcmVBbGxLZXlzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgY2FjaGVkSW5kaWNlcyA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBjYWxsYmFjayA9IF9yZWYuY2FsbGJhY2s7XG4gICAgdmFyIGluZGljZXMgPSBfcmVmLmluZGljZXM7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGluZGljZXMpO1xuICAgIHZhciBhbGxJbml0aWFsaXplZCA9ICFyZXF1aXJlQWxsS2V5cyB8fCBrZXlzLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBpbmRpY2VzW2tleV0gPj0gMDtcbiAgICB9KTtcbiAgICB2YXIgaW5kZXhDaGFuZ2VkID0ga2V5cy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGNhY2hlZEluZGljZXMpLmxlbmd0aCB8fCBrZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGNhY2hlZEluZGljZXNba2V5XSAhPT0gaW5kaWNlc1trZXldO1xuICAgIH0pO1xuXG4gICAgY2FjaGVkSW5kaWNlcyA9IGluZGljZXM7XG5cbiAgICBpZiAoYWxsSW5pdGlhbGl6ZWQgJiYgaW5kZXhDaGFuZ2VkKSB7XG4gICAgICBjYWxsYmFjayhpbmRpY2VzKTtcbiAgICB9XG4gIH07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXg7XG4vKipcbiAqIERldGVybWluZXMgYSBuZXcgb2Zmc2V0IHRoYXQgZW5zdXJlcyBhIGNlcnRhaW4gY2VsbCBpcyB2aXNpYmxlLCBnaXZlbiB0aGUgY3VycmVudCBvZmZzZXQuXG4gKiBJZiB0aGUgY2VsbCBpcyBhbHJlYWR5IHZpc2libGUgdGhlbiB0aGUgY3VycmVudCBvZmZzZXQgd2lsbCBiZSByZXR1cm5lZC5cbiAqIElmIHRoZSBjdXJyZW50IG9mZnNldCBpcyB0b28gZ3JlYXQgb3Igc21hbGwsIGl0IHdpbGwgYmUgYWRqdXN0ZWQganVzdCBlbm91Z2ggdG8gZW5zdXJlIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgdmlzaWJsZS5cbiAqXG4gKiBAcGFyYW0gY2VsbE9mZnNldCBPZmZzZXQgKHggb3IgeSkgcG9zaXRpb24gZm9yIGNlbGxcbiAqIEBwYXJhbSBjZWxsU2l6ZSBTaXplICh3aWR0aCBvciBoZWlnaHQpIG9mIGNlbGxcbiAqIEBwYXJhbSBjb250YWluZXJTaXplIFRvdGFsIHNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgdGhlIGNvbnRhaW5lclxuICogQHBhcmFtIGN1cnJlbnRPZmZzZXQgQ29udGFpbmVyJ3MgY3VycmVudCAoeCBvciB5KSBvZmZzZXRcbiAqIEByZXR1cm4gT2Zmc2V0IHRvIHVzZSB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBjZWxsIGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KF9yZWYpIHtcbiAgdmFyIGNlbGxPZmZzZXQgPSBfcmVmLmNlbGxPZmZzZXQ7XG4gIHZhciBjZWxsU2l6ZSA9IF9yZWYuY2VsbFNpemU7XG4gIHZhciBjb250YWluZXJTaXplID0gX3JlZi5jb250YWluZXJTaXplO1xuICB2YXIgY3VycmVudE9mZnNldCA9IF9yZWYuY3VycmVudE9mZnNldDtcblxuICB2YXIgbWF4T2Zmc2V0ID0gY2VsbE9mZnNldDtcbiAgdmFyIG1pbk9mZnNldCA9IG1heE9mZnNldCAtIGNvbnRhaW5lclNpemUgKyBjZWxsU2l6ZTtcbiAgdmFyIG5ld09mZnNldCA9IE1hdGgubWF4KG1pbk9mZnNldCwgTWF0aC5taW4obWF4T2Zmc2V0LCBjdXJyZW50T2Zmc2V0KSk7XG5cbiAgcmV0dXJuIG5ld09mZnNldDtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGluaXRDZWxsTWV0YWRhdGE7XG4vKipcbiAqIEluaXRpYWxpemVzIG1ldGFkYXRhIGZvciBhbiBheGlzIGFuZCBpdHMgY2VsbHMuXG4gKiBUaGlzIGRhdGEgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hpY2ggY2VsbHMgYXJlIHZpc2libGUgZ2l2ZW4gYSBjb250YWluZXIgc2l6ZSBhbmQgc2Nyb2xsIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSBjZWxsQ291bnQgVG90YWwgbnVtYmVyIG9mIGNlbGxzLlxuICogQHBhcmFtIHNpemUgRWl0aGVyIGEgZml4ZWQgc2l6ZSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgc2l6ZSBmb3IgYSBnaXZlbiBnaXZlbiBhbiBpbmRleC5cbiAqIEByZXR1cm4gT2JqZWN0IG1hcHBpbmcgY2VsbCBpbmRleCB0byBjZWxsIG1ldGFkYXRhIChzaXplLCBvZmZzZXQpXG4gKi9cbmZ1bmN0aW9uIGluaXRDZWxsTWV0YWRhdGEoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBzaXplID0gX3JlZi5zaXplO1xuXG4gIHZhciBzaXplR2V0dGVyID0gc2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gc2l6ZSA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBzaXplO1xuICB9O1xuXG4gIHZhciBjZWxsTWV0YWRhdGEgPSBbXTtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsQ291bnQ7IGkrKykge1xuICAgIHZhciBfc2l6ZSA9IHNpemVHZXR0ZXIoaSk7XG5cbiAgICBpZiAoX3NpemUgPT0gbnVsbCB8fCBpc05hTihfc2l6ZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBzaXplIHJldHVybmVkIGZvciBjZWxsIFwiICsgaSArIFwiIG9mIHZhbHVlIFwiICsgX3NpemUpO1xuICAgIH1cblxuICAgIGNlbGxNZXRhZGF0YVtpXSA9IHtcbiAgICAgIHNpemU6IF9zaXplLFxuICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICB9O1xuXG4gICAgb2Zmc2V0ICs9IF9zaXplO1xuICB9XG5cbiAgcmV0dXJuIGNlbGxNZXRhZGF0YTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuKiBEZXRlY3QgRWxlbWVudCBSZXNpemUuXG4qIEZvcmtlZCBpbiBvcmRlciB0byBndWFyZCBhZ2FpbnN0IHVuc2FmZSAnd2luZG93JyBhbmQgJ2RvY3VtZW50JyByZWZlcmVuY2VzLlxuKlxuKiBodHRwczovL2dpdGh1Yi5jb20vc2RlY2ltYS9qYXZhc2NyaXB0LWRldGVjdC1lbGVtZW50LXJlc2l6ZVxuKiBTZWJhc3RpYW4gRGVjaW1hXG4qXG4qIHZlcnNpb246IDAuNS4zXG4qKi9cblxuLy8gQ2hlY2sgYGRvY3VtZW50YCBhbmQgYHdpbmRvd2AgaW4gY2FzZSBvZiBzZXJ2ZXItc2lkZSByZW5kZXJpbmdcbnZhciBfd2luZG93O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIF93aW5kb3cgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICBfd2luZG93ID0gc2VsZjtcbn0gZWxzZSB7XG4gIF93aW5kb3cgPSB1bmRlZmluZWQ7XG59XG5cbnZhciBhdHRhY2hFdmVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuYXR0YWNoRXZlbnQ7XG52YXIgc3R5bGVzQ3JlYXRlZCA9IGZhbHNlO1xuXG5pZiAoIWF0dGFjaEV2ZW50KSB7XG4gIHZhciByZXF1ZXN0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhZiA9IF93aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIF93aW5kb3cuc2V0VGltZW91dChmbiwgMjApO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIHJhZihmbik7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciBjYW5jZWxGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuY2VsID0gX3dpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5jbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZCkge1xuICAgICAgcmV0dXJuIGNhbmNlbChpZCk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciByZXNldFRyaWdnZXJzID0gZnVuY3Rpb24gcmVzZXRUcmlnZ2VycyhlbGVtZW50KSB7XG4gICAgdmFyIHRyaWdnZXJzID0gZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18sXG4gICAgICAgIGV4cGFuZCA9IHRyaWdnZXJzLmZpcnN0RWxlbWVudENoaWxkLFxuICAgICAgICBjb250cmFjdCA9IHRyaWdnZXJzLmxhc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGV4cGFuZENoaWxkID0gZXhwYW5kLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnRyYWN0LnNjcm9sbExlZnQgPSBjb250cmFjdC5zY3JvbGxXaWR0aDtcbiAgICBjb250cmFjdC5zY3JvbGxUb3AgPSBjb250cmFjdC5zY3JvbGxIZWlnaHQ7XG4gICAgZXhwYW5kQ2hpbGQuc3R5bGUud2lkdGggPSBleHBhbmQub2Zmc2V0V2lkdGggKyAxICsgJ3B4JztcbiAgICBleHBhbmRDaGlsZC5zdHlsZS5oZWlnaHQgPSBleHBhbmQub2Zmc2V0SGVpZ2h0ICsgMSArICdweCc7XG4gICAgZXhwYW5kLnNjcm9sbExlZnQgPSBleHBhbmQuc2Nyb2xsV2lkdGg7XG4gICAgZXhwYW5kLnNjcm9sbFRvcCA9IGV4cGFuZC5zY3JvbGxIZWlnaHQ7XG4gIH07XG5cbiAgdmFyIGNoZWNrVHJpZ2dlcnMgPSBmdW5jdGlvbiBjaGVja1RyaWdnZXJzKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRXaWR0aCAhPSBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLndpZHRoIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICE9IGVsZW1lbnQuX19yZXNpemVMYXN0X18uaGVpZ2h0O1xuICB9O1xuXG4gIHZhciBzY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uIHNjcm9sbExpc3RlbmVyKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXM7XG4gICAgcmVzZXRUcmlnZ2Vycyh0aGlzKTtcbiAgICBpZiAodGhpcy5fX3Jlc2l6ZVJBRl9fKSBjYW5jZWxGcmFtZSh0aGlzLl9fcmVzaXplUkFGX18pO1xuICAgIHRoaXMuX19yZXNpemVSQUZfXyA9IHJlcXVlc3RGcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY2hlY2tUcmlnZ2VycyhlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLndpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy5oZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgZm4uY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLyogRGV0ZWN0IENTUyBBbmltYXRpb25zIHN1cHBvcnQgdG8gZGV0ZWN0IGVsZW1lbnQgZGlzcGxheS9yZS1hdHRhY2ggKi9cbiAgdmFyIGFuaW1hdGlvbiA9IGZhbHNlLFxuICAgICAgYW5pbWF0aW9uc3RyaW5nID0gJ2FuaW1hdGlvbicsXG4gICAgICBrZXlmcmFtZXByZWZpeCA9ICcnLFxuICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCA9ICdhbmltYXRpb25zdGFydCcsXG4gICAgICBkb21QcmVmaXhlcyA9ICdXZWJraXQgTW96IE8gbXMnLnNwbGl0KCcgJyksXG4gICAgICBzdGFydEV2ZW50cyA9ICd3ZWJraXRBbmltYXRpb25TdGFydCBhbmltYXRpb25zdGFydCBvQW5pbWF0aW9uU3RhcnQgTVNBbmltYXRpb25TdGFydCcuc3BsaXQoJyAnKSxcbiAgICAgIHBmeCA9ICcnO1xuICB7XG4gICAgdmFyIGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG4gICAgaWYgKGVsbS5zdHlsZS5hbmltYXRpb25OYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFuaW1hdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tUHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVsbS5zdHlsZVtkb21QcmVmaXhlc1tpXSArICdBbmltYXRpb25OYW1lJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBmeCA9IGRvbVByZWZpeGVzW2ldO1xuICAgICAgICAgIGFuaW1hdGlvbnN0cmluZyA9IHBmeCArICdBbmltYXRpb24nO1xuICAgICAgICAgIGtleWZyYW1lcHJlZml4ID0gJy0nICsgcGZ4LnRvTG93ZXJDYXNlKCkgKyAnLSc7XG4gICAgICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCA9IHN0YXJ0RXZlbnRzW2ldO1xuICAgICAgICAgIGFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgYW5pbWF0aW9uTmFtZSA9ICdyZXNpemVhbmltJztcbiAgdmFyIGFuaW1hdGlvbktleWZyYW1lcyA9ICdAJyArIGtleWZyYW1lcHJlZml4ICsgJ2tleWZyYW1lcyAnICsgYW5pbWF0aW9uTmFtZSArICcgeyBmcm9tIHsgb3BhY2l0eTogMDsgfSB0byB7IG9wYWNpdHk6IDA7IH0gfSAnO1xuICB2YXIgYW5pbWF0aW9uU3R5bGUgPSBrZXlmcmFtZXByZWZpeCArICdhbmltYXRpb246IDFtcyAnICsgYW5pbWF0aW9uTmFtZSArICc7ICc7XG59XG5cbnZhciBjcmVhdGVTdHlsZXMgPSBmdW5jdGlvbiBjcmVhdGVTdHlsZXMoKSB7XG4gIGlmICghc3R5bGVzQ3JlYXRlZCkge1xuICAgIC8vb3BhY2l0eTowIHdvcmtzIGFyb3VuZCBhIGNocm9tZSBidWcgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI4NjM2MFxuICAgIHZhciBjc3MgPSAoYW5pbWF0aW9uS2V5ZnJhbWVzID8gYW5pbWF0aW9uS2V5ZnJhbWVzIDogJycpICsgJy5yZXNpemUtdHJpZ2dlcnMgeyAnICsgKGFuaW1hdGlvblN0eWxlID8gYW5pbWF0aW9uU3R5bGUgOiAnJykgKyAndmlzaWJpbGl0eTogaGlkZGVuOyBvcGFjaXR5OiAwOyB9ICcgKyAnLnJlc2l6ZS10cmlnZ2VycywgLnJlc2l6ZS10cmlnZ2VycyA+IGRpdiwgLmNvbnRyYWN0LXRyaWdnZXI6YmVmb3JlIHsgY29udGVudDogXFxcIiBcXFwiOyBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IH0gLnJlc2l6ZS10cmlnZ2VycyA+IGRpdiB7IGJhY2tncm91bmQ6ICNlZWU7IG92ZXJmbG93OiBhdXRvOyB9IC5jb250cmFjdC10cmlnZ2VyOmJlZm9yZSB7IHdpZHRoOiAyMDAlOyBoZWlnaHQ6IDIwMCU7IH0nLFxuICAgICAgICBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICBzdHlsZXNDcmVhdGVkID0gdHJ1ZTtcbiAgfVxufTtcblxudmFyIGFkZFJlc2l6ZUxpc3RlbmVyID0gZnVuY3Rpb24gYWRkUmVzaXplTGlzdGVuZXIoZWxlbWVudCwgZm4pIHtcbiAgaWYgKGF0dGFjaEV2ZW50KSBlbGVtZW50LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIGZuKTtlbHNlIHtcbiAgICBpZiAoIWVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKSB7XG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PSAnc3RhdGljJykgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICBjcmVhdGVTdHlsZXMoKTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18gPSB7fTtcbiAgICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXyA9IFtdO1xuICAgICAgKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLmNsYXNzTmFtZSA9ICdyZXNpemUtdHJpZ2dlcnMnO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18uaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJleHBhbmQtdHJpZ2dlclwiPjxkaXY+PC9kaXY+PC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiY29udHJhY3QtdHJpZ2dlclwiPjwvZGl2Pic7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKTtcbiAgICAgIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbExpc3RlbmVyLCB0cnVlKTtcblxuICAgICAgLyogTGlzdGVuIGZvciBhIGNzcyBhbmltYXRpb24gdG8gZGV0ZWN0IGVsZW1lbnQgZGlzcGxheS9yZS1hdHRhY2ggKi9cbiAgICAgIGFuaW1hdGlvbnN0YXJ0ZXZlbnQgJiYgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18uYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25zdGFydGV2ZW50LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5hbmltYXRpb25OYW1lID09IGFuaW1hdGlvbk5hbWUpIHJlc2V0VHJpZ2dlcnMoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLnB1c2goZm4pO1xuICB9XG59O1xuXG52YXIgcmVtb3ZlUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVSZXNpemVMaXN0ZW5lcihlbGVtZW50LCBmbikge1xuICBpZiAoYXR0YWNoRXZlbnQpIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29ucmVzaXplJywgZm4pO2Vsc2Uge1xuICAgIGVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5zcGxpY2UoZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmluZGV4T2YoZm4pLCAxKTtcbiAgICBpZiAoIWVsZW1lbnQuX19yZXNpemVMaXN0ZW5lcnNfXy5sZW5ndGgpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18gPSAhZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWRkUmVzaXplTGlzdGVuZXI6IGFkZFJlc2l6ZUxpc3RlbmVyLFxuICByZW1vdmVSZXNpemVMaXN0ZW5lcjogcmVtb3ZlUmVzaXplTGlzdGVuZXJcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuKiBAcHJvdmlkZXNNb2R1bGUgc2hhbGxvd0NvbXBhcmVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNoYWxsb3dFcXVhbCA9IHJlcXVpcmUoJ2ZianMvbGliL3NoYWxsb3dFcXVhbCcpO1xuXG4vKipcbiAqIERvZXMgYSBzaGFsbG93IGNvbXBhcmlzb24gZm9yIHByb3BzIGFuZCBzdGF0ZS5cbiAqIFNlZSBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW5cbiAqIFNlZSBhbHNvIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3Mvc2hhbGxvdy1jb21wYXJlLmh0bWxcbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NvbXBhcmUoaW5zdGFuY2UsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gIHJldHVybiAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFzaGFsbG93RXF1YWwoaW5zdGFuY2Uuc3RhdGUsIG5leHRTdGF0ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0NvbXBhcmU7IiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIC8vIE9ubHkgc3VwcG9ydCBBcnJheUJ1ZmZlcnMgZm9yIFBPU1QgbWV0aG9kLlxuICAgICAgICAvLyBSZWNlaXZpbmcgQXJyYXlCdWZmZXJzIGhhcHBlbnMgdmlhIEJsb2JzLCBpbnN0ZWFkLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQgOiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG4gICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpKSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gaGVhZGVycyh4aHIpIHtcbiAgICB2YXIgaGVhZCA9IG5ldyBIZWFkZXJzKClcbiAgICB2YXIgcGFpcnMgPSAoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKS50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHZhciBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHNwbGl0LnNoaWZ0KCkudHJpbSgpXG4gICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1c1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBvcHRpb25zLnN0YXR1c1RleHRcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdFxuICAgICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpICYmICFpbml0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBpbnB1dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgZnVuY3Rpb24gcmVzcG9uc2VVUkwoKSB7XG4gICAgICAgIGlmICgncmVzcG9uc2VVUkwnIGluIHhocikge1xuICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF2b2lkIHNlY3VyaXR5IHdhcm5pbmdzIG9uIGdldFJlc3BvbnNlSGVhZGVyIHdoZW4gbm90IGFsbG93ZWQgYnkgQ09SU1xuICAgICAgICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xuICAgICAgICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMoeGhyKSxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVVJMKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuIl19
