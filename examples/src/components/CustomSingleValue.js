import React from 'react';
import Gravatar from 'react-gravatar';

var SingleValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,
		value: React.PropTypes.object
	},
	render () {
		var obj = this.props.value;
		var size = 15;
		return (
			<div className="Select-placeholder">
				{obj ? (
					<div>
						<Gravatar email={obj.email} size={size}/>
						{obj.value}
					</div>
				) : (
					this.props.placeholder
				)
			}
		</div>
	);
	}
});

module.exports = SingleValue;
