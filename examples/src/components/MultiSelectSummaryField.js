import React from 'react';
import Select from 'react-select';

function logChange() {
    console.log.apply(console, [].concat(['Select value changed:'], Array.prototype.slice.apply(arguments)));
}

var MultiSelectField = React.createClass({
    displayName: 'MultiSelectField',
    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState () {
        return {
            value: []
        };
    },
    handleSelectChange (value, values) {
        logChange('New value:', value, 'Values:', values);
        this.setState({ value: value });
    },

    render () {
        var ops = [
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Strawberry', value: 'strawberry' },
            { label: 'Caramel', value: 'caramel' },
            { label: 'Cookies and Cream', value: 'cookiescream' },
            { label: 'Peppermint', value: 'peppermint' }
        ];
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select multi={true} multiSum={true} value={this.state.value} placeholder="Select your favourite(s)" options={ops} onChange={this.handleSelectChange} />
            </div>
        );
    }
});

module.exports = MultiSelectField;