import React from 'react';
import Select from 'react-select';

var CustomCloseLogic = React.createClass({
	displayName: 'CustomCloseLogic',
	propTypes: {
		label: React.PropTypes.string
	},
	getInitialState () {
		return {
			options: [
				{ value: 1, label: 'One' },
				{ value: 2, label: 'Two' },
				{ value: 3, label: 'Three' },
				{ value: 4, label: 'Four' },
				{ value: 5, label: 'Five' }
			],
			value: null
		};
	},
	onChange(value) {
		this.setState({ value });
		console.log('Custom close value changed to', value);
	},
	setupRef(selectComponent) {
		this.selectComponent = selectComponent;
	},
	requestClose() {
		console.log('Close requested');
		setTimeout(() => {
			console.log('Closing menu now!');
			this.selectComponent.close();
		}, 1000);
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					ref={this.setupRef}
					autoClose={false}
					requestClose={this.requestClose}
					onChange={this.onChange}
					options={this.state.options}
					simpleValue
					value={this.state.value}
					/>
				<div className="hint">This example implements custom close logic.</div>
			</div>
		);
	}
});

module.exports = CustomCloseLogic;
