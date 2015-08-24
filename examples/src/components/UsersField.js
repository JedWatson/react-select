import GravatarOption from './CustomOption';
import GravatarValue from './CustomSingleValue';
import React from 'react';
import Select from 'react-select';

const USERS = require('../data/users');

var UsersField = React.createClass({
	getDefaultProps () {
		return {
			searchable: true,
			label: 'Users: (with custom option and value component)'
		};
	},
	render () {

		return (
			<div>
				<label>{this.props.label}</label>
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