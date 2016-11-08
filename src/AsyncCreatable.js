import React from 'react';
import Select from './Select';

const AsyncCreatable = React.createClass({
	displayName: 'AsyncCreatableSelect',

	render () {
		return (
			<Select.Async {...this.props}>
				{(asyncProps) => (
					<Select.Creatable {...this.props}>
						{(creatableProps) => (
							<Select
								{...asyncProps}
								{...creatableProps}
							/>
						)}
					</Select.Creatable>
				)}
			</Select.Async>
		);
	}
});

module.exports = AsyncCreatable;
