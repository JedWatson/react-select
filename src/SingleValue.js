var React = require('react');

var SingleValue = React.createClass({
  propTypes: {
    option: React.PropTypes.object,               // selected option
    placeholder: React.PropTypes.string           // this is default value provided by React-Select based component
  },

  render: function() {
    return (
      <div className="Select-placeholder">{this.props.placeholder}</div>
    );
  }
});

module.exports = SingleValue;
