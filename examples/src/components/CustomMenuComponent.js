import React from 'react';
import Select from 'react-select';
import { VirtualScroll } from 'react-virtualized';

const PEOPLE = require('../data/large');

const InfiniteList = React.createClass({
	render () {
		let { children, style, ...props } = this.props;

		return (
			<VirtualScroll
				height={200}
				{...props}
				rowRenderer={this.renderRow}
				rowsCount={children.length}
				rowHeight={35}
				children={children /* Pass this so the list re-renders when children are hovered/change */}
			/>
		);
	},

	renderRow(index) {
		let { children } = this.props;
		return children[index];
	}
});

const CustomMenuComponent = React.createClass({
	propTypes: {
		hint: React.PropTypes.string,
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	setValue (value) {
		this.setState({ value });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					onChange={this.setValue}
					menuComponent={InfiniteList}
					placeholder={`Select one of these ${PEOPLE.length} people...`}
					options={PEOPLE}
					value={this.state.value}
					labelKey="name"
					valueKey="id"
				/>
				<div className="hint">
					This example implements a custom Menu components to render a an infinite list using a react-list.
				</div>
			</div>
		);
	}
});

module.exports = CustomMenuComponent;
