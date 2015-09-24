var React = require('react');
var classes = require('classnames');

var Option = React.createClass({
	propTypes: {
		optionGroup: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      options: React.PropTypes.array.isRequired,
    }).isRequired,     // object that is base for that option
		renderFunc: React.PropTypes.func               // method passed to ReactSelect component to render label text
	},

	blockEvent: function(event) {
		event.preventDefault();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}

		if (event.target.target) {
			window.open(event.target.href);
		} else {
			window.location.href = event.target.href;
		}
	},

	render: function() {
		var obj = this.props.optionGroup;
		var renderedLabel = this.props.renderFunc(obj);
		var optionClasses = classes(this.props.className, obj.className);

		return (
			<div className={optionClasses}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{renderedLabel}
			</div>
		);
	}
});

module.exports = Option;
