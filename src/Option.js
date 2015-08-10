var React = require('react');
var classes = require('classnames');

var Option = React.createClass({
	propTypes: {
		addLabelText: React.PropTypes.string,          // string rendered in case of allowCreate option passed to ReactSelect
		className: React.PropTypes.string,             // className (based on mouse position)
		mouseDown: React.PropTypes.func,               // method to handle click on option element
		mouseEnter: React.PropTypes.func,              // method to handle mouseEnter on option element
		mouseLeave: React.PropTypes.func,              // method to handle mouseLeave on option element
		option: React.PropTypes.object.isRequired,     // object that is base for that option
		renderFunc: React.PropTypes.func               // method passed to ReactSelect component to render label text
	},

	render: function() {
		var obj = this.props.option;
		var renderedLabel = this.props.renderFunc(obj);
		var optionClasses = classes(this.props.className, obj.className);

		return obj.disabled ? (
			<div className={optionClasses}>{renderedLabel}</div>
		) : (
			<div className={optionClasses} style={obj.style}
				onMouseEnter={this.props.mouseEnter}
				onMouseLeave={this.props.mouseLeave}
				onMouseDown={this.props.mouseDown}
				onClick={this.props.mouseDown}>
				{ obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel }
			</div>
		);
	}
});

module.exports = Option;
