import React, { Component, PropTypes } from 'react';
import Select from './Select';
import stripDiacritics from './utils/stripDiacritics';

const propTypes = {
	autoload: React.PropTypes.bool.isRequired,       // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: React.PropTypes.any,                      // object to use to cache results; set to null/false to disable caching
	children: React.PropTypes.func.isRequired,       // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: React.PropTypes.bool,             // strip diacritics when filtering; defaults to true
	ignoreCase: React.PropTypes.bool,                // perform case-insensitive filtering; defaults to true
	loadingPlaceholder: React.PropTypes.oneOfType([  // replaces the placeholder while options are loading
		React.PropTypes.string,
		React.PropTypes.node
	]),
	loadOptions: React.PropTypes.func.isRequired,    // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	options: PropTypes.array.isRequired,             // array of options
	pagination: PropTypes.bool,											 // automatically load more options when the option list is scrolled to the end; default to false
	placeholder: React.PropTypes.oneOfType([         // field placeholder, displayed when there's no value (shared with Select)
		React.PropTypes.string,
		React.PropTypes.node
	]),
	noResultsText: React.PropTypes.oneOfType([       // field noResultsText, displayed when no options come back from the server
		React.PropTypes.string,
		React.PropTypes.node
	]),
	onChange: React.PropTypes.func,                  // onChange handler: function (newValue) {}
	searchPromptText: React.PropTypes.oneOfType([    // label to prompt for search input
		React.PropTypes.string,
		React.PropTypes.node
	]),
	onInputChange: React.PropTypes.func,             // optional for keeping track of what is being typed
	value: React.PropTypes.any,                      // initial field value
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
	pagination: false,
	searchPromptText: 'Type to search',
};

export default class Async extends Component {
	constructor (props, context) {
		super(props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			isLoading: false,
			isLoadingPage: false,
			page: 1,
			options: props.options,
		};

		this._onInputChange = this._onInputChange.bind(this);
		this._onMenuScrollToBottom = this._onMenuScrollToBottom.bind(this);
	}

	componentDidMount () {
		const { autoload } = this.props;

		if (autoload) {
			this.loadOptions('');
		}
	}

	componentWillUpdate (nextProps, nextState) {
		const propertiesToSync = ['options'];
		propertiesToSync.forEach((prop) => {
			if (this.props[prop] !== nextProps[prop]) {
				this.setState({
					[prop]: nextProps[prop]
				});
			}
		});
	}

	clearOptions() {
		this.setState({ options: [] });
	}

	loadOptions (inputValue, page = 1) {
		const { loadOptions, pagination } = this.props;
		const cache = this._cache;

		if (
			cache &&
			cache.hasOwnProperty(inputValue)
		) {
			this.setState({
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
			if (callback === this._callback) {
				this._callback = null;

				let options = data && data.options || [];

				const hasReachedLastPage = pagination && options.length === 0;

				if(page > 1) {
					options = this.state.options.concat(options);
				}

				if (cache) {
					cache[inputValue] = { page, options, hasReachedLastPage };
				}

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

		return inputValue;
	}

	_onInputChange (inputValue) {
		const { ignoreAccents, ignoreCase, onInputChange } = this.props;

		if (ignoreAccents) {
			inputValue = stripDiacritics(inputValue);
		}

		if (ignoreCase) {
			inputValue = inputValue.toLowerCase();
		}

		if (onInputChange) {
			onInputChange(inputValue);
		}

		return this.loadOptions(inputValue);
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

	_onMenuScrollToBottom (inputValue) {
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
			onChange: (newValues) => {
				if (this.props.value && (newValues.length > this.props.value.length)) {
					this.clearOptions();
				}
				this.props.onChange(newValues);
			}
		};

		return children({
			...this.props,
			...props,
			isLoading,
			onInputChange: this._onInputChange,
			onMenuScrollToBottom: this._onMenuScrollToBottom,
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
