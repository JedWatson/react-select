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

const Async = React.createClass({
	propTypes: {
		cache: React.PropTypes.any,                     // object to use to cache results, can be null to disable cache
		getOptions: React.PropTypes.func.isRequired,    // function to call to get options
		ignoreAccents: React.PropTypes.bool,            // whether to strip diacritics when filtering (shared with Select)
		ignoreCase: React.PropTypes.bool,               // whether to perform case-insensitive filtering (shared with Select)
		isLoading: React.PropTypes.bool,                // overrides the isLoading state when set to true
		loadingPlaceholder: React.PropTypes.string,     // replaces the placeholder while options are loading
		minimumInput: React.PropTypes.number,           // the minimum number of characters that trigger getOptions
		noResultsText: React.PropTypes.string,          // placeholder displayed when there are no matching search results (shared with Select)
		placeholder: React.PropTypes.string,            // field placeholder, displayed when there's no value (shared with Select)
		searchingText: React.PropTypes.string,          // message to display while options are loading
		searchPromptText: React.PropTypes.string,       // label to prompt for search input
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
		this.getOptions('');
	},
	componentWillReceiveProps (nextProps) {
		if (nextProps.cache !== this.props.cache) {
			this.setState({
				cache: initCache(nextProps.cache),
			});
		}
	},
	getOptions (input) {
		this._lastInput = input;
		if (input.length < this.props.minimumInput) {
			this._currentRequestId = -1;
			this.setState({
				isLoading: false,
				options: [],
			});
			return;
		}
		if (this.props.ignoreAccents) {
			input = stripDiacritics(input);
		}
		if (this.props.ignoreCase) {
			input = input.toLowerCase();
		}
		if (this.state.cache) {
			for (let i = 0; i <= input.length; i++) {
				let cacheKey = input.slice(0, i);
				if (this.state.cache[cacheKey] && (input === cacheKey || this.state.cache[cacheKey].complete)) {
					this.setState({
						options: this.state.cache[cacheKey].options,
					});
					return;
				}
			}
		}
		this.setState({
			isLoading: true,
		});
		let _requestId = this._currentRequestId = requestId++;
		let responseHandler = (err, data) => {
			if (err) throw err;
			if (!this.isMounted()) return;
			if (this.state.cache) {
				this.state.cache[input] = data;
			}
			if (_requestId !== this._currentRequestId) return;
			this.setState({
				isLoading: false,
				options: data && data.options || [],
			});
		}
		let promise = this.props.getOptions(input, responseHandler);
		if (promise && typeof promise.then === 'function') {
			promise.then((data) => {
				responseHandler(null, data);
			}, (err) => {
				responseHandler(err);
			});
		}
	},
	render () {
		let { noResultsText } = this.props;
		let { isLoading, options } = this.state;
		if (this.props.isLoading) isLoading = true;
		let placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
		if (!options.length) {
			if (this._lastInput.length < this.props.minimumInput) noResultsText = this.props.searchPromptText;
			if (isLoading) noResultsText = this.props.searchingText;
		}
		return (
			<Select
				{...this.props}
				isLoading={isLoading}
				noResultsText={noResultsText}
				onInputChange={this.getOptions}
				options={options}
				placeholder={placeholder}
				/>
		);
	}
});

module.exports = Async;
