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
	render () {
		var obj = this.props.option;
		var size = 15;
		return (
			<div className={this.props.className}
				onMouseEnter={this.props.mouseEnter}
				onMouseLeave={this.props.mouseLeave}
				onMouseDown={this.props.mouseDown}
				onClick={this.props.mouseDown}>
				<Gravatar email={obj.email} size={size}/>
				{obj.value}
			</div>
		);
	}
});

module.exports = Option;
