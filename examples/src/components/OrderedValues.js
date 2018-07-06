import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			order: 'asc',
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleOrder (e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
  },
  
  sortAscending: (values) => {
    return values.slice().sort(function (left, right) {
      if (left.label > right.label) {
        return 1;
      } else {
        return -1;
      }
    });
  },

  sortDescending: (values) => {
    return values.slice().sort(function (left, right) {
      if (left.label > right.label) {
        return -1;
      } else {
        return 1;
      }
    });
  },

	render () {
		const { order, value } = this.state;
    const options = FLAVOURS;
    const sortFn = order === 'asc' ? this.sortAscending : this.sortDescending;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/OrderedValues.js">(Source)</a></h3>
				<Select
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your favourite(s)"
          removeSelected={this.state.removeSelected}
          orderValue={sortFn}
					simpleValue
					value={value}
        />
        
        {value ? <div className="hint">
					Actual value order: [{value.split(',').join(', ')}]
				</div> : null}

				<div className="checkbox-list">
          <label className="checkbox">
            <input type="radio" className="radio-control" name="order" value="asc" checked={this.state.order === 'asc'} onChange={this.toggleOrder} />
						<span className="checkbox-label">Ascending</span>
          </label>
          <label className="checkbox">
            <input type="radio" className="radio-control" name="order" value="desc" checked={this.state.order === 'desc'} onChange={this.toggleOrder} />
            <span className="checkbox-label">Descending</span>
          </label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
