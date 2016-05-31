import React from 'react';

import Select from './Select';
import stripDiacritics from './utils/stripDiacritics';

let requestId = 0;

function initCache (cache) {
	if (cache && typeof cache !== 'object') {
		cache = {};
	}
	return cache ? cache : null;
}

function updateCache (cache, input, data) {
	if (!cache) return;
	cache[input] = data;
}

function getFromCache (cache, input) {
	if (!cache) return;
	for (let i = input.length; i >= 0; --i) {
		let cacheKey = input.slice(0, i);
		if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
			return cache[cacheKey];
		}
	}
}

function thenPromise (promise, callback) {
	if (!promise || typeof promise.then !== 'function') return;
	return promise.then((data) => {
		callback(null, data);
	}, (err) => {
		callback(err);
	});
}

const stringOrNode = React.PropTypes.oneOfType([
	React.PropTypes.string,
	React.PropTypes.node
]);

const Async = React.createClass({
	propTypes: {
		cache: React.PropTypes.any,                     // object to use to cache results, can be null to disable cache
		ignoreAccents: React.PropTypes.bool,            // whether to strip diacritics when filtering (shared with Select)
		ignoreCase: React.PropTypes.bool,               // whether to perform case-insensitive filtering (shared with Select)
		isLoading: React.PropTypes.bool,                // overrides the isLoading state when set to true
		loadOptions: React.PropTypes.func.isRequired,   // function to call to load options asynchronously
		loadingPlaceholder: React.PropTypes.string,     // replaces the placeholder while options are loading
		minimumInput: React.PropTypes.number,           // the minimum number of characters that trigger loadOptions
		noResultsText: stringOrNode,                    // placeholder displayed when there are no matching search results (shared with Select)
		onInputChange: React.PropTypes.func,            // onInputChange handler: function (inputValue) {}
		placeholder: stringOrNode,                      // field placeholder, displayed when there's no value (shared with Select)
		searchPromptText: stringOrNode,       // label to prompt for search input
		searchingText: React.PropTypes.string,          // message to display while options are loading
	},
	getDefaultProps () {
		return {
			cache: true,
			ignoreAccents: true,
			ignoreCase: true,
			loadingPlaceholder: 'Loading...',
			minimumInput: 0,
			searchingText: 'Searching...',
			searchPromptText: 'Type to search',
		};
	},
	getInitialState () {
		return {
			cache: initCache(this.props.cache),
			isLoading: false,
			options: [],
		};
	},
	componentWillMount () {
		this._lastInput = '';
	},
	componentDidMount () {
		this.loadOptions('');
	},
	componentWillReceiveProps (nextProps) {
		if (nextProps.cache !== this.props.cache) {
			this.setState({
				cache: initCache(nextProps.cache),
			});
		}
	},
	focus () {
		this.refs.select.focus();
	},
	resetState () {
		this._currentRequestId = -1;
		this.setState({
			isLoading: false,
			options: [],
		});
	},
	getResponseHandler (input) {
		let _requestId = this._currentRequestId = requestId++;
		return (err, data) => {
			if (err) throw err;
			if (!this.isMounted()) return;
			updateCache(this.state.cache, input, data);
			if (_requestId !== this._currentRequestId) return;
			this.setState({
				isLoading: false,
				options: data && data.options || [],
			});
		};
	},
	loadOptions (input) {
		if (this.props.onInputChange) {
			let nextState = this.props.onInputChange(input);
			// Note: != used deliberately here to catch undefined and null
			if (nextState != null) {
				input = '' + nextState;
			}
		}
		if (this.props.ignoreAccents) input = stripDiacritics(input);
		if (this.props.ignoreCase) input = input.toLowerCase();

		this._lastInput = input;
		if (input.length < this.props.minimumInput) {
			return this.resetState();
		}
		let cacheResult = getFromCache(this.state.cache, input);
		if (cacheResult) {
			return this.setState({
				options: cacheResult.options,
			});
		}
		this.setState({
			isLoading: true,
		});
		let responseHandler = this.getResponseHandler(input);
		let inputPromise = thenPromise(this.props.loadOptions(input, responseHandler), responseHandler);
		return inputPromise ? inputPromise.then(() => {
			return input;
		}) : input;
	},
	render () {
		let { noResultsText } = this.props;
		let { isLoading, options } = this.state;
		if (this.props.isLoading) isLoading = true;
		let placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
		if (isLoading) {
			noResultsText = this.props.searchingText;
		} else if (!options.length && this._lastInput.length < this.props.minimumInput) {
			noResultsText = this.props.searchPromptText;
		}
		return (
			<Select
				{...this.props}
				ref="select"
				isLoading={isLoading}
				noResultsText={noResultsText}
				onInputChange={this.loadOptions}
				options={options}
				placeholder={placeholder}
				/>
		);
	}
});

module.exports = Async;
