import React from 'react';
import Select from '../../src';
import { colourOptions } from '../data';

const Option = (props: OptionProps) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      className={className}
      style={Object.assign(
          getStyles('option', props),
        {
          'option': true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        }
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Option }}
    styles={{ option: (base) => ({ ...base, border: `1px dotted ${colourOptions[2].color}`, height: '100%' }) }}
    defaultValue={colourOptions[4]}
    options={colourOptions}
  />
);
