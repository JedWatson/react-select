import React from 'react';

export default function removeRenderer() {
  if (this.props.disabled || !this.props.onRemove) return;
  return (
    <span
      className="Select-value-icon"
      aria-hidden="true"
      onMouseDown={this.onRemove}
      onTouchEnd={this.handleTouchEndRemove}
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}>
      &times;
    </span>
  );
}
