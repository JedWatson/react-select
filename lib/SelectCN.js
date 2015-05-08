var React = require('react');
var pinyin = require('pinyin');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Select = require('..');

module.exports = React.createClass({
  getProps: function() {
    var props = _extends({
      filterOption: function(op, filterValue) {
        // Forked from Select.js
        var valueText = String(op.value),
            labelText = String(op.label),
            pinyinText = String(op.pinyin),
            pyText = String(op.py);
        return (
          !filterValue || this.props.matchPos === 'start' ? (
            pinyinText.substr(0, filterValue.length) === filterValue ||
            pyText.substr(0, filterValue.length) === filterValue ||
            this.props.matchProp !== 'label' &&
            valueText.toLowerCase().substr(0, filterValue.length) === filterValue ||
            this.props.matchProp !== 'value' &&
            labelText.toLowerCase().substr(0, filterValue.length) === filterValue
          ) : (
            pinyinText.indexOf(filterValue.toLowerCase()) >= 0  ||
            pyText.indexOf(filterValue.toLowerCase()) >= 0  ||
            this.props.matchProp !== 'label' &&
            valueText.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0 ||
            this.props.matchProp !== 'value' &&
            labelText.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0
          )
        );
      }
    }, this.props);
    props.options.forEach(function(option) {
      option.pinyin = pinyin(option.label, {
        style: pinyin.STYLE_NORMAL
      }).join('').toLowerCase();
      option.py = pinyin(option.label, {
        style: pinyin.STYLE_FIRST_LETTER
      }).join('').toLowerCase();
      return option;
    });
    return props;
  },
  render: function() {
    return <Select {...this.getProps()} />;    
  },
});