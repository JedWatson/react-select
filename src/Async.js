import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import stripDiacritics from './utils/stripDiacritics';
const propTypes = {
	autoload: PropTypes.bool.isRequired,       // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: PropTypes.any,                      // object to use to cache results; set to null/false to disable caching
	children: PropTypes.func.isRequired,       // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: PropTypes.bool,             // strip diacritics when filtering; defaults to true
	ignoreCase: PropTypes.bool,                // perform case-insensitive filtering; defaults to true
	loadOptions: PropTypes.func.isRequired,    // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: PropTypes.oneOfType([  // replaces the placeholder while options are loading
		PropTypes.string,
		PropTypes.node
	]),
	multi: PropTypes.bool,                     // multi-value input
	noResultsText: PropTypes.oneOfType([       // field noResultsText, displayed when no options come back from the server
		PropTypes.string,
		PropTypes.node
	]),
	onChange: PropTypes.func,                  // onChange handler: function (newValue) {}
	onInputChange: PropTypes.func,             // optional for keeping track of what is being typed
	options: PropTypes.array.isRequired,       // array of options
	placeholder: PropTypes.oneOfType([         // field placeholder, displayed when there's no value (shared with Select)
		PropTypes.string,
		PropTypes.node
	]),
	searchPromptText: PropTypes.oneOfType([    // label to prompt for search input
		PropTypes.string,
		PropTypes.node
	]),
	value: PropTypes.any,                      // initial field value
};

const defaultCache = {};

const defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search',
};

export default class Async extends Component {
	constructor (props, context) {
		super(props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			isLoading: false,
			options: props.options,
		};

		this._onInputChange = this._onInputChange.bind(this);
	}

	componentDidMount () {
		const { autoload } = this.props;

		if (autoload) {
			this.loadOptions('');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.options !== this.props.options) {
			this.setState({
				options: nextProps.options,
			});
		}
	}

	clearOptions() {
		this.setState({ options: [] });
	}

	loadOptions (inputValue) {
		const { loadOptions } = this.props;
		const cache = this._cache;

		if (
			cache &&
			cache.hasOwnProperty(inputValue)
		) {
			this.setState({
				options: cache[inputValue]
			});

			return;
		}

		const callback = (error, data) => {
			if (callback === this._callback) {
				this._callback = null;

				const options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				this.setState({
					isLoading: false,
					options
				});
			}
		};

		// Ignore all but the most recent request
		this._callback = callback;

		const promise = loadOptions(inputValue, callback);
		if (promise) {
			promise.then(
				(data) => callback(null, data),
				(error) => callback(error)
			);
		}

		if (
			this._callback &&
			!this.state.isLoading
		) {
			this.setState({
				isLoading: true
			});
		}
	}

	_onInputChange (inputValue) {
		const { ignoreAccents, ignoreCase, onInputChange } = this.props;
		let transformedInputValue = inputValue;

		if (ignoreAccents) {
			transformedInputValue = stripDiacritics(transformedInputValue);
		}

		if (ignoreCase) {
			transformedInputValue = transformedInputValue.toLowerCase();
		}

		if (onInputChange) {
			onInputChange(transformedInputValue);
		}

		this.loadOptions(transformedInputValue);

		// Return the original input value to avoid modifying the user's view of the input while typing.
		return inputValue;
	}

	inputValue() {
		if (this.select) {
			return this.select.state.inputValue;
		}
		return '';
	}

	noResultsText() {
		const { loadingPlaceholder, noResultsText, searchPromptText } = this.props;
		const { isLoading } = this.state;

		const inputValue = this.inputValue();

		if (isLoading) {
			return loadingPlaceholder;
		}
		if (inputValue && noResultsText) {
			return noResultsText;
		}
		return searchPromptText;
	}

	focus () {
		this.select.focus();
	}

	render () {
		const { children, loadingPlaceholder, placeholder } = this.props;
		const { isLoading, options } = this.state;

		const props = {
			noResultsText: this.noResultsText(),
			placeholder: isLoading ? loadingPlaceholder : placeholder,
			options: (isLoading && loadingPlaceholder) ? [] : options,
			ref: (ref) => (this.select = ref),
			onChange: (newValues) => {
				if (this.props.multi && this.props.value && (newValues.length > this.props.value.length)) {
					this.clearOptions();
				}
				this.props.onChange(newValues);
			}
		};

		return children({
			...this.props,
			...props,
			isLoading,
			onInputChange: this._onInputChange
		});
	}
}

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

function defaultChildren (props) {
	return (
		<Select {...props} />
	);
}
