"use strict";

var React = require('react');

var SingleValue = React.createClass({
  displayName: "SingleValue",

  propTypes: {
    placeholder: React.PropTypes.string, // this is default value provided by React-Select based component
    value: React.PropTypes.object // selected option
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "Select-placeholder" },
      this.props.placeholder
    );
  }
});

module.exports = SingleValue;