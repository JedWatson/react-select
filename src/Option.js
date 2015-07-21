var React = require('react');

var Option = React.createClass({
  propTypes: {
    renderFunc: React.PropTypes.func,                   // method passed to ReactSelect component to render label text
    option: React.PropTypes.object.isRequired,          // object that is base for that option
    className: React.PropTypes.string,                  // className (based on mouse position)
    mouseEnter: React.PropTypes.func,                   // method to handle mouseEnter on option element
    mouseLeave: React.PropTypes.func,                   // method to handle mouseLeave on option element
    mouseDown: React.PropTypes.func,                    // method to handle click on option element
    addLabelText: React.PropTypes.string                // string rendered in case of allowCreate option passed to ReactSelect
  },

  render: function() {
    var obj = this.props.option;
    var renderedLabel = this.props.renderFunc(obj);

    return obj.disabled ? (
      <div className={this.props.className}>{renderedLabel}</div>
    ) : (
      <div className={this.props.className}
        onMouseEnter={this.props.mouseEnter}
        onMouseLeave={this.props.mouseLeave}
        onMouseDown={this.props.mouseDown}
        onClick={this.props.mouseDown}>
        { obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel }
      </div>
    );
  }
});

module.exports = Option;
