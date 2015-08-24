import GravatarOption from './CustomOption';
import GravatarValue from './CustomSingleValue';
import React from 'react';
import Select from 'react-select';

const USERS = require('../data/users');

var UsersField = React.createClass({
	propTypes: {
		label: React.PropTypes.string,
	},
	render () {

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					onOptionLabelClick={this.onLabelClick}
					placeholder="Select user"
					optionComponent={GravatarOption}
					singleValueComponent={GravatarValue}
					options={USERS.users}/>
			</div>
		);
	}
});

module.exports = UsersField;