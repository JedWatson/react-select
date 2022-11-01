/** @jsx jsx */
import { jsx } from '@emotion/react';
import type { ComponentMeta } from '@storybook/react';
import Select, { OptionProps } from 'react-select';

import { Field } from '../components';
import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/StyleCompositionExample',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

function Option(props: OptionProps<ColourOption>) {
  const {
    children,
    className,
    cx,
    getStyles,
    innerProps,
    innerRef,
    isDisabled,
    isFocused,
    isSelected,
  } = props;
  console.log(innerRef);
  return (
    <div
      ref={innerRef}
      css={getStyles('option', props)}
      className={cx(
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
}

export function StyleCompositionExample() {
  return (
    <Field label="Style Composition" htmlFor="style-composition-id">
      <Select
        inputId="style-composition-id"
        closeMenuOnSelect={false}
        components={{ Option }}
        styles={{
          option: (base) => ({
            ...base,
            border: `1px dotted ${colourOptions[2].color}`,
            height: '100%',
          }),
        }}
        defaultValue={colourOptions[4]}
        options={colourOptions}
      />
    </Field>
  );
}
