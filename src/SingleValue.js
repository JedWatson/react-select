import React from 'react';
import classes from 'classnames';

const SingleValue = React.createClass({
	propTypes: {
		value: React.PropTypes.object.isRequired,
	},
	render () {
		let classNames = classes('Select-placeholder', this.props.value.className);
		return (
			<div
				className={classNames}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.props.children}
			</div>
		);
	}
});

module.exports = SingleValue;
