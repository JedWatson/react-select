import Tooltip from '@atlaskit/tooltip';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import { NoticeProps, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Field } from '../components';

import { ColourOption, colourOptions } from '../data';

export default {
  title: 'Select/CustomLoadingMessage',
  component: AsyncSelect,
  argTypes: {},
} as ComponentMeta<typeof AsyncSelect>;

export function CustomLoadingMessage() {
  return (
    <Field label="Custom Loading Message" htmlFor="custom-loading-message-id">
      <AsyncSelect
        inputId="custom-loading-message-id"
        cacheOptions
        components={{ LoadingMessage }}
        defaultOptions
        loadOptions={promiseOptions}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  loadingMessage: (base) => ({
    ...base,
    backgroundColor: colourOptions[2].color,
    color: 'white',
  }),
};

// =============================================================================
// Components
// =============================================================================

function LoadingMessage(props: NoticeProps<ColourOption, false>) {
  return (
    <Tooltip content={'Custom Loading Message'}>
      <div
        {...props.innerProps}
        style={props.getStyles('loadingMessage', props) as React.CSSProperties}
      >
        {props.children}
      </div>
    </Tooltip>
  );
}

// =============================================================================
// Utils
// =============================================================================

function filterColors(inputValue: string) {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function promiseOptions(inputValue: string) {
  return new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });
}
