import React from 'react';
import Select from 'react-select';
import { AutoSizer, VirtualScroll } from 'react-virtualized';

const DATA = require('../data/cities');

const OPTION_HEIGHT = 35;
const MAX_OPTIONS_HEIGHT = 200;

var CitiesField = React.createClass({
	displayName: 'CitiesField',
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: 'Cities:',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true,
		};
	},
	switchCountry (e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox (e) {
		let newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	renderMenu({ focusedOption, focusOption, options, selectValue, valueArray }) {
		const focusedOptionIndex = options.indexOf(focusedOption);
		const height = Math.min(MAX_OPTIONS_HEIGHT, options.length * OPTION_HEIGHT);

		return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualScroll
            ref="VirtualScroll"
            height={height}
            rowHeight={OPTION_HEIGHT}
            rowRenderer={(index) => (
            	<div
            		onMouseOver={() => focusOption(options[index])}
            		onClick={() => selectValue(options[index])}
            		style={{
            			backgroundColor: options[index] === focusedOption ? '#eee' : '#fff',
            			height: OPTION_HEIGHT,
            			display: 'flex',
            			alignItems: 'center',
            			padding: '0 .5rem'
            		}}
            	>
            		{options[index].name}
            	</div>
            )}
            rowsCount={options.length}
            scrollToIndex={focusedOptionIndex}
            width={width}
          />
        )}
      </AutoSizer>
		);
	},
	render () {
		var options = DATA.CITIES;
		return (
			<div className="section">
				<h3 className="section-heading">World's Largest Cities</h3>
				<h4>Uses react-virtualized to display data</h4>
				<Select ref="stateSelect"
					autofocus
					options={options}
					simpleValue
					clearable={this.state.clearable}
					name="selected-state"
					disabled={this.state.disabled}
					value={this.state.selectValue}
					onChange={this.updateValue}
					searchable={this.state.searchable}
					labelKey="name"
					valueKey="name"
					menuStyle={{ overflow: 'hidden' }}
					renderMenu={this.renderMenu}
				/>
			</div>
		);
	}
});


module.exports = CitiesField;
