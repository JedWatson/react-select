import React from 'react';
import Select from './Select';

const AsyncCreatable = React.createClass({
	displayName: 'AsyncCreatableSelect',

	render () {
		return (
			<Select.Async {...this.props}>
				{({ref, ...asyncProps}) => {
					const asyncRef = ref;
					return <Select.Creatable {...asyncProps} >
						{({ref, ...creatableProps}) => {
							const creatableRef = ref;
							return this.props.children({
								...creatableProps,
								ref: (select) => {
									creatableRef(select);
									asyncRef(select);
									this.select = select;
								}
							});
						}}
					</Select.Creatable>;
				}}
			</Select.Async>
		);
	}
});

function defaultChildren (props) {
	return (
		<Select {...props} />
	);
};

const propTypes = {
	children: React.PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

const defaultProps = {
	children: defaultChildren,
};

AsyncCreatable.propTypes = propTypes;
AsyncCreatable.defaultProps = defaultProps;

module.exports = AsyncCreatable;
