import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';

const knightSource = {
  beginDrag(props,thing) {
    console.log(props,'knight');
    props.handleDrag(props.index)
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Knight extends Component {
  constructor(props){
    super(props);
    console.log(props,'props');
  }
  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value,this.props.index);
  }
  renderRemoveIcon () {
    if (this.props.disabled || !this.props.onRemove) return;
    return (
      <span className="Select-value-icon"
        aria-hidden="true"
        onMouseDown={this.onRemove}
        onTouchEnd={this.handleTouchEndRemove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}>
        &times;
      </span>
    );
  }
  renderLabel () {
    let className = 'Select-value-label';
    return this.props.onClick || this.props.value.href ? (
      <a className={className} href={this.props.value.href} target={this.props.value.target} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown}>
        {this.props.children}
      </a>
    ) : (
      <span className={className} onClick={this.handleDrag} role="option" aria-selected="true" id={this.props.id}>
        {this.props.children}
      </span>
    );
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className={classNames('Select-value', this.props.value.className)}
        style={this.props.value.style}
        title={this.props.value.title}
        >
        {this.renderRemoveIcon()}
        {this.renderLabel()}
      </div>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  children: React.PropTypes.node,
  disabled: React.PropTypes.bool,               // disabled prop passed to ReactSelect
  handleDrag: React.PropTypes.func,
  id: React.PropTypes.string,                   // Unique id for the value - used for aria
  index: React.PropTypes.number,								// Then index of the Value in list of components
  onClick: React.PropTypes.func,                // method to handle click on value label
  onRemove: React.PropTypes.func,               // method to handle removal of the value
  value: React.PropTypes.object.isRequired,     // the option object for this value
};

export default DragSource('value', knightSource, collect)(Knight);
