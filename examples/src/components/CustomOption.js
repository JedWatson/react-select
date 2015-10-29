import React from 'react';
import Gravatar from 'react-gravatar';

var Option = React.createClass({
	propTypes: {
		addLabelText: React.PropTypes.string,
		className: React.PropTypes.string,
		mouseDown: React.PropTypes.func,
		mouseEnter: React.PropTypes.func,
		mouseLeave: React.PropTypes.func,
		option: React.PropTypes.object.isRequired,
		renderFunc: React.PropTypes.func
	},
	handleMouseDown (e) {
		this.props.mouseDown(this.props.option, e);
	},
	handleMouseEnter (e) {
		this.props.mouseEnter(this.props.option, e);
	},
	handleMouseLeave (e) {
		this.props.mouseLeave(this.props.option, e);
	},
	render () {
		var obj = this.props.option;
		var size = 15;
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className={this.props.className}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onMouseDown={this.handleMouseDown}
				onClick={this.handleMouseDown}>
				<Gravatar email={obj.email} size={size} style={gravatarStyle} />
				{obj.value}
			</div>
		);
	}
});

module.exports = Option;
