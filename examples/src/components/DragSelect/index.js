import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ValueDrag from './ValueDrag';
import ValueSquare from './ValueSquare';
// import SelectDrag from './SelectDrag';

export default class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state={
      'id':'instance-value-item',
      'disabled':false,
      'instancePrefix':'instance',
      'value':{'label':'hello','value':'hello'}
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickValue = this.clickValue.bind(this)
    }
    clickValue(){
      console.log('clickValue');
    }
    handleChange(position){
      console.log('handleChange');
    }
    renderValue (valueArray, isOpen) {
  		let renderLabel = this.props.valueRenderer || this.getOptionLabel;
  		let ValueComponent = this.props.valueComponent;
  		if (!valueArray.length) {
  			return !this.state.inputValue ? <div className="Select-placeholder">{this.props.placeholder}</div> : null;
  		}
  		let onClick = this.props.onValueClick ? this.handleValueClick : null;
  		if (this.props.multi) {
  			return valueArray.map((value, i) => {
  				return (
  					<ValueComponent
  						id={this._instancePrefix + '-value-' + i}
  						instancePrefix={this._instancePrefix}
  						disabled={this.props.disabled || value.clearableValue === false}
  						key={`value-${i}-${value[this.props.valueKey]}`}
  						onClick={onClick}
  						handleDrag={this.handleDrag}
  						index={i}
  						onRemove={this.removeValue}
  						value={value}
  					>
  						{renderLabel(value, i)}
  						<span className="Select-aria-only">&nbsp;</span>
  					</ValueComponent>
  				);
  			});
  		} else if (!this.state.inputValue) {
  			if (isOpen) onClick = null;
  			return (
  				<ValueComponent
  					id={this._instancePrefix + '-value-item'}
  					disabled={this.props.disabled}
  					instancePrefix={this._instancePrefix}
  					onClick={onClick}
  					value={valueArray[0]}
  				>
  					{renderLabel(valueArray[0])}
  				</ValueComponent>
  			);
  		}
  	}
    render() {
      return(
        <div style={{
          height:'400px',
          width: '400px'
        }}>
        <ValueDrag
          id={this.state.id}
          disabled={this.state.disabled}
          instancePrefix={this.state.instancePrefix}
          onClick={this.onClick}
          value={this.state.value}>
          {this.renderLabel(this.state.value)}

        </ValueDrag>
        </div>
    );
    }
  }
