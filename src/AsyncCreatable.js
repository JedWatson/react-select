import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Async from './Async';
import Creatable from './Creatable';

class AsyncCreatableSelect extends React.Component {

	focus () {
		this.select.focus();
	}

	render () {
		return (
			<Async {...this.props}>
				{({ ref, ...asyncProps }) => {
					const asyncRef = ref;
					return (<Creatable {...asyncProps} >
						{({ ref, ...creatableProps }) => {
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
					</Creatable>);
				}}
			</Async>
		);
	}
};

function defaultChildren (props) {
	return (
		<Select {...props} />
	);
};

AsyncCreatableSelect.PropTypes = {
	children: PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren,
};

export default AsyncCreatableSelect;
