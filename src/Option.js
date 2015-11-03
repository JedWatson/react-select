var React = require('react');
var classes = require('classnames');

var Option = React.createClass({
	propTypes: {
		className: React.PropTypes.string,             // className (based on mouse position)
		isDisabled: React.PropTypes.bool,              // the option is disabled
		isFocused: React.PropTypes.bool,               // the option is focused
		isSelected: React.PropTypes.bool,              // the option is selected
		onSelect: React.PropTypes.func,                // method to handle click on option element
		onFocus: React.PropTypes.func,                 // method to handle mouseEnter on option element
		onUnfocus: React.PropTypes.func,               // method to handle mouseLeave on option element
		option: React.PropTypes.object.isRequired,     // object that is base for that option
	},
	blockEvent (event) {
		event.preventDefault();
		event.stopPropagation();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	},
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		if (this.props.focused) return;
		this.props.onFocus(this.props.option, event);
	},
	handleMouseLeave (event) {
		this.props.onUnfocus(this.props.option, event);
	},
	render () {
		var option = this.props.option;
		var optionClasses = classes(this.props.className, option.className);

		return this.props.disabled ? (
			<div className={optionClasses}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={optionClasses}
				style={option.style}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				onMouseLeave={this.handleMouseLeave}
				onClick={this.handleMouseDown}
				title={option.title}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Option;
