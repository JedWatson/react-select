var React = require('react');
var classes = require('classnames');

var Option = React.createClass({
	propTypes: {
		children: React.PropTypes.any,
		className: React.PropTypes.string,
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
		return (
			<div className={classes(this.props.className, 'Select-optionGroup')}>
				<div
					className="Select-optionGroup-label"
					onMouseDown={this.blockEvent}
					onClick={this.blockEvent}>
					<strong>{renderedLabel}</strong>
				</div>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Option;
