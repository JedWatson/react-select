import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var CreatableDemo = createClass({
	displayName: 'CreatableDemo',
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string
	},
	getInitialState () {
		return {
			atTop: true,
			multi: true,
			multiValue: [],
			options: [
				{ value: 'R', label: 'Red' },
				{ value: 'G', label: 'Green' },
				{ value: 'B', label: 'Blue' }
			],
			value: undefined
		};
	},
	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
	},
	render () {
		const { atTop, multi, multiValue, options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/v1.x/examples/src/components/Creatable.js">(Source)</a></h3>
				<Select.Creatable
					multi={multi}
					options={options}
					onChange={this.handleOnChange}
					value={multi ? multiValue : value}
					showNewOptionAtTop={atTop}
				/>
				<div className="hint">{this.props.hint}</div>
				<div className="checkbox-list">
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={multi}
							onChange={() => this.setState({ multi: true })}
						/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={!multi}
							onChange={() => this.setState({ multi: false })}
						/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="checkbox-list">
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={atTop}
							onChange={() => this.setState({ atTop: true })}
						/>
						<span className="checkbox-label">New option at top</span>
					</label>
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={!atTop}
							onChange={() => this.setState({ atTop: false })}
						/>
						<span className="checkbox-label">New option at bottom</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = CreatableDemo;
