import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Option from './Option';

const OPTION_HEIGHT = 35;
const MENU_HEIGHT = 70;

const optionStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: OPTION_HEIGHT
};

const Menu = React.createClass({
  propTypes: {
    findPropChild: React.PropTypes.func,
    focusedOption: React.PropTypes.object,
    getOptionLabel: React.PropTypes.func,
    menuContainerStyle: React.PropTypes.object,
    multi: React.PropTypes.bool,
    noResultsText: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func.isRequired,
    onScroll: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
    optionComponent: React.PropTypes.func,
    optionRenderer: React.PropTypes.func,
    options: React.PropTypes.array,
    style: React.PropTypes.object,
    valueArray: React.PropTypes.array,
    valueKey: React.PropTypes.string,
  },
  getInitialState() {
    return {
      scrollTop: 0
    };
  },

  onScrollHandler(e) {
    this.setState({ scrollTop: e.target.scrollTop });
    console.log(e.target.scrollTop);
    this.props.onScroll(e);
  },

  renderMenu (options, valueArray, focusedOption) {
    const { optionComponent, optionRenderer, findPropChild, getOptionLabel, valueKey, onSelect, onFocus } = this.props;
    if (options && options.length) {
			let Option = optionComponent;
			let renderLabel = optionRenderer || findPropChild('optionRenderer') || getOptionLabel;
      const { scrollTop } = this.state;
      const itemsToSkip = Math.max(0, Math.floor(scrollTop / OPTION_HEIGHT));
      const itemsToRender = 1;

			return options.map((option, i) => {
				let isSelected = valueArray && valueArray.indexOf(option) > -1;
				let isFocused = option === focusedOption;
				let optionRef = isFocused ? 'focused' : null;
				let optionClass = classNames({
					'Select-option': true,
					'is-selected': isSelected,
					'is-focused': isFocused,
					'is-disabled': option.disabled,
				});

        const yOffset = i * OPTION_HEIGHT;

        const style = Object.assign({}, optionStyles, {
          WebkitTransform: `translate3d(0, ${yOffset}px, 0)`,
          MozTransform: `translate3d(0, ${yOffset}px, 0)`,
          msTransform: `translate3d(0, ${yOffset}px, 0)`,
          transform: `translate3d(0, ${yOffset}px, 0)`,
        });

        const newOption = Object.assign({}, option);
        newOption.style = Object.assign({}, newOption.style, style );

        if (i < itemsToSkip || i > itemsToSkip + itemsToRender) {
          return null;
        }

				return (
					<Option
						className={optionClass}
						isDisabled={option.disabled}
						isFocused={isFocused}
						key={`option-${i}-${option[valueKey]}`}
						onSelect={onSelect}
						onFocus={onFocus}
						option={newOption}
						isSelected={isSelected}
						ref={optionRef}
						>
						{renderLabel(option)}
					</Option>
				);
			});
		} else if (this.props.noResultsText) {
			return (
				<div className="Select-noresults">
					{this.props.noResultsText}
				</div>
			);
		} else {
			return null;
		}
  },
  render() {
    const { menuContainerStyle, style, onScroll, onMouseDown, multi, valueArray, focusedOption, options } = this.props;
    return (
      <div ref="menuContainer" className="Select-menu-outer" style={menuContainerStyle}>
        <div ref="menu" className="Select-menu"
             style={Object.assign({}, style, { height: MENU_HEIGHT, overflow: 'scroll', position: 'relative' })}
             onScroll={this.onScrollHandler}
             onMouseDown={onMouseDown}>
          <div style={{ height: options.length * OPTION_HEIGHT, width: '100%', touchEvents: 'none' }} />
          {this.renderMenu(options, !multi ? valueArray : null, focusedOption)}
        </div>
      </div>
    );
  }
});

export default Menu;
