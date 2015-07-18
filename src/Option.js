var React = require('react');

var Option = React.createClass({
  render: function() {
    var renderedLabel = this.props.renderFunc(this.props.object);
    var obj = this.props.object;

    return this.props.object.disabled ? (
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
