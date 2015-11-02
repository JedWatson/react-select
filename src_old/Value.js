var React = require('react');
var classes = require('classnames');

var Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		disabled: React.PropTypes.bool,                   // disabled prop passed to ReactSelect
		onOptionLabelClick: React.PropTypes.func,         // method to handle click on value label
		onRemove: React.PropTypes.func,                   // method to handle remove of that value
		option: React.PropTypes.object.isRequired,        // option passed to component
		optionLabelClick: React.PropTypes.bool,           // indicates if onOptionLabelClick should be handled
		renderer: React.PropTypes.func                    // method to render option label passed to ReactSelect
	},

	blockEvent (event) {
		event.stopPropagation();
	},

	handleOnRemove (event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render () {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}

		if(!this.props.onRemove && !this.props.optionLabelClick) {
			return (
				<div
					className={classes('Select-value', this.props.option.className)}
					style={this.props.option.style}
					title={this.props.option.title}
				>{label}</div>
			);
		}

		if (this.props.optionLabelClick) {
			label = (
				<a className={classes('Select-item-label__a', this.props.option.className)}
					onMouseDown={this.blockEvent}
					onTouchEnd={this.props.onOptionLabelClick}
					onClick={this.props.onOptionLabelClick}
					style={this.props.option.style}
					title={this.props.option.title}>
					{label}
				</a>
			);
		}

		return (
			<div className={classes('Select-item', this.props.option.className)}
				 style={this.props.option.style}
				 title={this.props.option.title}>
				<span className="Select-item-icon"
					onMouseDown={this.blockEvent}
					onClick={this.handleOnRemove}
					onTouchEnd={this.handleOnRemove}>&times;</span>
				<span className="Select-item-label">{label}</span>
			</div>
		);
	}

});

module.exports = Value;
