import { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import { Field } from '../components';

import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/FixedOptions',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function FixedOptions() {
  const [value, setValue] = React.useState<readonly ColourOption[]>(
    orderOptions([colourOptions[0], colourOptions[1], colourOptions[3]])
  );

  function handleChange(
    newValue: OnChangeValue<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
  ) {
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        newValue = colourOptions.filter((v) => v.isFixed);
        break;
    }

    setValue(orderOptions(newValue));
  }

  return (
    <Field label="Fixed options" htmlFor="fixed-options-id">
      <Select
        inputId="fixed-options-id"
        isClearable={value.some((v) => !v.isFixed)}
        isMulti
        onChange={handleChange}
        options={colourOptions}
        styles={styles}
        value={value}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption, true> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};

// =============================================================================
// Utils
// =============================================================================

function orderOptions(values: readonly ColourOption[]) {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
}
