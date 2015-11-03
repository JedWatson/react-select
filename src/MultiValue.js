var React = require('react');
var classes = require('classnames');

var MultiValue = React.createClass({

	displayName: 'MultiValue',

	propTypes: {
		disabled: React.PropTypes.bool,                   // disabled prop passed to ReactSelect
		onOptionLabelClick: React.PropTypes.func,         // method to handle click on value label
		onRemove: React.PropTypes.func,                   // method to handle remove of that value
		value: React.PropTypes.object.isRequired,         // option passed to component
	},

	onRemove (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onRemove(this.props.value);
	},

	renderRemoveIcon () {
		if (this.props.disabled) return;
		return (
			<span className="Select-item-icon"
				onMouseDown={this.onRemove}
				onTouchEnd={this.onRemove}>
				&times;
			</span>
		);
	},

	render () {
		// if (!this.props.onRemove && !this.props.optionLabelClick) {
		// 	return (
		// 		<div
		// 			className={classes('Select-value', this.props.option.className)}
		// 			style={this.props.option.style}
		// 			title={this.props.option.title}
		// 		>{label}</div>
		// 	);
		// }

		// if (this.props.optionLabelClick) {
		// 	label = (
		// 		<a className={classes('Select-item-label__a', this.props.option.className)}
		// 			onMouseDown={this.blockEvent}
		// 			onTouchEnd={this.props.onOptionLabelClick}
		// 			onClick={this.props.onOptionLabelClick}
		// 			style={this.props.option.style}
		// 			title={this.props.option.title}>
		// 			{label}
		// 		</a>
		// 	);
		// }

		return (
			<div className={classes('Select-item', this.props.value.className)}
				style={this.props.value.style}
				title={this.props.value.title}
				>
				{this.renderRemoveIcon()}
				<span className="Select-item-label">{this.props.children}</span>
			</div>
		);
	}

});

module.exports = MultiValue;
