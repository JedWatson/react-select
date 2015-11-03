import React from 'react';

import Select from './Select';
import stripDiacritics from './utils/stripDiacritics';

var requestId = 0;

var Async = React.createClass({
	propTypes: {
		cacheAsyncResults: React.PropTypes.bool,        // whether to cache results
		getOptions: React.PropTypes.func.isRequired,    // function to call to get options
		ignoreAccents: React.PropTypes.bool,            // whether to strip diacritics when filtering (shared with Select)
		ignoreCase: React.PropTypes.bool,               // whether to perform case-insensitive filtering (shared with Select)
		loadingPlaceholder: React.PropTypes.string,     // replaces the placeholder while options are loading
		minimumInput: React.PropTypes.number,           // the minimum number of characters that trigger getOptions
		placeholder: React.PropTypes.string,            // field placeholder, displayed when there's no value (shared with Select)
	},
	getDefaultProps () {
		return {
			cacheAsyncResults: true,
			ignoreAccents: true,
			ignoreCase: true,
			loadingPlaceholder: 'Loading...',
			minimumInput: 0,
		};
	},
	getInitialState () {
		return {
			isLoading: false,
			options: [],
		};
	},
	componentWillMount () {
		this._optionsCache = {};
	},
	componentDidMount () {
		this.getOptions('');
	},
	getOptions (input) {
		if (typeof input !== 'string') return;
		if (input.length < this.props.minimumInput) return;
		if (this.props.ignoreAccents) {
			input = stripDiacritics(input);
		}
		if (this.props.ignoreCase) {
			input = input.toLowerCase();
		}
		if (this.props.cacheAsyncResults) {
			for (var i = 0; i <= input.length; i++) {
				var cacheKey = input.slice(0, i);
				if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
					this.setState({
						options: this._optionsCache[cacheKey].options,
					});
					return;
				}
			}
		}
		this.setState({
			isLoading: true,
		});
		var _requestId = this._currentRequestId = requestId++;
		var responseHandler = (err, data) => {
			if (err) throw err;
			if (this.props.cacheAsyncResults) {
				this._optionsCache[input] = data;
			}
			if (_requestId !== this._currentRequestId) return;
			this.setState({
				isLoading: false,
				options: data && data.options || [],
			});
		}
		var promise = this.props.getOptions(input, responseHandler);
		if (promise && typeof promise.then === 'function') {
			promise.then((data) => {
				responseHandler(null, data)
			}, (err) => {
				responseHandler(err)
			});
		}
	},
	render () {
		let { isLoading, options } = this.state;
		let placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
		return <Select {...this.props} isLoading={isLoading} onInputChange={this.getOptions} options={options} placeholder={placeholder} />
	}
});

module.exports = Async;
