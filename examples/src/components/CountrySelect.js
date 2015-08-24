import React from 'react';

var CountrySelect = React.createClass({
	displayName: 'CountrySelect',
	propTypes: {},
	
	onClick () {
		this.props.onSelect(this.props.value);
	},
	render () {
		var className = this.props.value === this.props.selected ? 'active' : 'link';
		return <span onClick={this.onClick} className={className}>{this.props.children}</span>;
	}
});

module.exports = CountrySelect;