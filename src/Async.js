import React from 'react';

import Select from './Select';
import stripDiacritics from './utils/stripDiacritics';

var requestId = 0;

var Async = React.createClass({
	propTypes: {
		getOptions: React.PropTypes.func.isRequired,    // function to call to get options
		autoload: React.PropTypes.bool,                 // whether to auto-load the default async options set
		cacheAsyncResults: React.PropTypes.bool,        // whether to cache results
		ignoreAccents: React.PropTypes.bool,            // whether to strip diacritics when filtering (shared with Select)
		ignoreCase: React.PropTypes.bool,               // whether to perform case-insensitive filtering (shared with Select)
	},
	getDefaultProps () {
		return {
			autoload: true,
			cacheAsyncResults: true,
			ignoreAccents: true,
			ignoreCase: true,
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
		if (this.props.autoload) {
			this.getOptions('');
		}
	},
	getOptions (input) {
		if (typeof input !== 'string') return;
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
		return <Select {...this.props} isLoading={isLoading} onInputChange={this.getOptions} options={options} />
	}
});

module.exports = Async;
