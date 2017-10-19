import React from 'react';
import Select from './Select';
import Async from './Async';
import Creatable from './Creatable';

function reduce(obj, props = {}){
  return Object.keys(obj)
  .reduce((props, key) => {
    const value = obj[key];
    if (value !== undefined) props[key] = value;
    return props;
  }, props);
}

class AsyncCreatableSelect extends React.Component {

	focus () {
		this.select.focus();
	}

	render () {
		return (
			<Async {...this.props}>
				{(asyncProps) => (
					<Creatable {...this.props}>
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
					</Creatable>
				)}
			</Async>
		);
	}
};

export default AsyncCreatableSelect;
