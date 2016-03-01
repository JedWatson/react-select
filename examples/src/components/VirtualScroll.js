import React from 'react';
import Select from 'react-select';

var firstNames = ['Noah', 'Liam', 'Mason', 'Jacob', 'William', 'Ethan', 'Michael', 'Alexander', 'James', 'Daniel', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Emily', 'Abigail', 'Madison', 'Charlotte'];
var lastNames = ['Smith', 'Johnson', 'Brown', 'Jones', 'Miller', 'Davis', 'Williams', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson'];

var VirtualScroll = React.createClass({
	displayName: 'VirtualScroll',
	propTypes: {
		label: React.PropTypes.string
	},
	getDefaultProps () {
		return {
			label: 'Virtual Scrolling:'
		};
	},
	getInitialState () {
		return {
			options: this._generateRows(1000),
			count: 1000
		};
	},
	_generateRows (count){
		var rows = [];
		for(var i = 0; i < count; i++){
			
			var firstNameIndex = Math.floor(Math.random() * firstNames.length);
			var lastNameIndex = Math.floor(Math.random() * lastNames.length);

			var name = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
			var name = 
			rows.push({
				label: name,
				value: name
			});
		}
		return rows;
	},
	setNumRows (e) {
		var count = e.target.value;
		console.log('Rows count changed to ' + count);


		this.setState({
			options: this._generateRows(count),
			count: count,
			selectValue: null
		});
	},
	updateValue (newValue) {
		console.log('Select changed to ' + (newValue ? newValue.label : 'null'));
		this.setState({
			selectValue: newValue
		});
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select 
					ref="virtualScroll" 
					options={this.state.options} 
					value={this.state.selectValue} 
					onChange={this.updateValue} 
					useVirtualScroll
					virtualScroll={{
						height: 198,
						width: 398,
						rowHeight: 35,
						overscanRowsCount: 10
					}} />

				<div style={{ marginTop: 14 }}>
					<label>
						Number of Rows: 
						
					</label>
					<input type="number" className="text-control" name="searchable" value={this.state.count} onChange={this.setNumRows}/>
				</div>
			</div>
		);
	}
});


module.exports = VirtualScroll;
