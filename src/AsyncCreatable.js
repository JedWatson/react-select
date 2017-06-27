import React from 'react';
import createClass from 'create-react-class';
import Select from './Select';

function reduce(obj, props = {}){
  return Object.keys(obj)
  .reduce((props, key) => {
    const value = obj[key];
    if (value !== undefined) props[key] = value;
    return props;
  }, props);
}

const AsyncCreatable = createClass({
	displayName: 'AsyncCreatableSelect',

	focus () {
		this.select.focus();
	},

	render () {
		return (
			<Select.Async {...this.props}>
				{(asyncProps) => (
					<Select.Creatable {...this.props}>
						{(creatableProps) => (
							<Select
								{...reduce(asyncProps, reduce(creatableProps, {}))}
								onInputChange={(input) => {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								}}
								ref={(ref) => {
									this.select = ref;
									creatableProps.ref(ref);
									asyncProps.ref(ref);
								}}
							/>
						)}
					</Select.Creatable>
				)}
			</Select.Async>
		);
	}
});

module.exports = AsyncCreatable;
