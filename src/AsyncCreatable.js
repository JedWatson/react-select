import React from 'react';
import Select from './Select';

function AsyncCreatable (props) {
	return (
		<Select.Async {...props}>
			{(asyncProps) => (
				<Select.Creatable {...props}>
					{(creatableProps) => (
						<Select
							{...asyncProps}
							{...creatableProps}
							onInputChange={(input) => {
								creatableProps.onInputChange(input);
								return asyncProps.onInputChange(input);
							}}
							ref={(ref) => {
								creatableProps.ref(ref);
								asyncProps.ref(ref);
							}}
						/>
					)}
				</Select.Creatable>
			)}
		</Select.Async>
	);
};

module.exports = AsyncCreatable;
