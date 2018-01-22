import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
	pagination: PropTypes.bool,		   // automatically load more options when the option list is scrolled to the end; default to false
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

const defaultChildren = props => <Select {...props} />;

const defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	pagination: false,
	searchPromptText: 'Type to search',
};

export default class Async extends Component {
	constructor (props, context) {
		super(props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			inputValue: '',
			isLoading: false,
			isLoadingPage: false,
			page: 1,
			options: props.options,
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onMenuScrollToBottom = this.onMenuScrollToBottom.bind(this);
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

	componentWillUnmount () {
		this._callback = null;
	}

	loadOptions (inputValue, page = 1) {
		const { loadOptions, pagination } = this.props;
		const cache = this._cache;

		if (
			cache &&
			Object.prototype.hasOwnProperty.call(cache, inputValue)
		) {
			this._callback = null;

			this.setState({
        			isLoading: false,
				options: cache[inputValue].options,
				page: cache[inputValue].page,
			});

			if (
				!pagination ||
				(pagination && (cache[inputValue].page >= page || cache[inputValue].hasReachedLastPage))
			) {
				return;
			}
		}

		const callback = (error, data) => {
			let options = data && data.options || [];

			const hasReachedLastPage = pagination && options.length === 0;

			if(page > 1) {
				options = this.state.options.concat(options);
			}

			if (cache) {
				cache[inputValue] = { page, options, hasReachedLastPage };
			}

			if (callback === this._callback) {
				this._callback = null;

				this.setState({
					isLoading: false,
					isLoadingPage: false,
					page,
					options,
				});
			}
		};

		// Ignore all but the most recent request
		this._callback = callback;

		let promise;

		if (pagination) {
			promise = loadOptions(inputValue, page, callback);
		} else {
			promise = loadOptions(inputValue, callback);
		}

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
				isLoading: true,
				isLoadingPage: page > this.state.page,
			});
		}
	}

	onInputChange (inputValue) {
		const { ignoreAccents, ignoreCase, onInputChange } = this.props;
		let newInputValue = inputValue;

		if (onInputChange) {
			const value = onInputChange(newInputValue);
			// Note: != used deliberately here to catch undefined and null
			if (value != null && typeof value !== 'object') {
				newInputValue = '' + value;
			}
		}

		let transformedInputValue = newInputValue;

		if (ignoreAccents) {
			transformedInputValue = stripDiacritics(transformedInputValue);
		}

		if (ignoreCase) {
			transformedInputValue = transformedInputValue.toLowerCase();
		}

		this.setState({ inputValue: newInputValue });
		this.loadOptions(transformedInputValue);

		// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
		return newInputValue;
	}

	noResultsText() {
		const { loadingPlaceholder, noResultsText, searchPromptText } = this.props;
		const { inputValue, isLoading } = this.state;

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

	onMenuScrollToBottom (inputValue) {
		if (!this.props.pagination || this.state.isLoading) return;

		this.loadOptions(inputValue, this.state.page + 1);
	}

	render () {
		const { children, loadingPlaceholder, placeholder } = this.props;
		const { isLoading, isLoadingPage, options } = this.state;

		const props = {
			noResultsText: this.noResultsText(),
			placeholder: isLoading ? loadingPlaceholder : placeholder,
			options: (isLoading && loadingPlaceholder && !isLoadingPage) ? [] : options,
			ref: (ref) => (this.select = ref),
		};

		return children({
			...this.props,
			...props,
			isLoading,
			onInputChange: this.onInputChange,
			onMenuScrollToBottom: this.onMenuScrollToBottom,
		});
	}
}

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;
