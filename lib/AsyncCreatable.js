var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Select from './Select';
import Async from './Async';
import Creatable from './Creatable';

function reduce(obj, props = {}) {
	return Object.keys(obj).reduce((props, key) => {
		const value = obj[key];
		if (value !== undefined) props[key] = value;
		return props;
	}, props);
}

class AsyncCreatableSelect extends React.Component {

	focus() {
		this.select.focus();
	}

	render() {
		return React.createElement(
			Async,
			this.props,
			asyncProps => React.createElement(
				Creatable,
				this.props,
				creatableProps => React.createElement(Select, _extends({}, reduce(asyncProps, reduce(creatableProps, {})), {
					onInputChange: input => {
						creatableProps.onInputChange(input);
						return asyncProps.onInputChange(input);
					},
					ref: ref => {
						this.select = ref;
						creatableProps.ref(ref);
						asyncProps.ref(ref);
					}
				}))
			)
		);
	}
};

export default AsyncCreatableSelect;