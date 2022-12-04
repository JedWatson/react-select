import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Tooltip from '@atlaskit/tooltip';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components,
  MultiValueRemoveProps,
  StylesConfig,
} from 'react-select';
import { ColourOption, colourOptions } from '../data';
import { Field } from '../components';

export default {
  title: 'Select/CustomMultiValueRemove',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomMultiValueRemove() {
  return (
    <Field
      label="Custom Multi Value Remove"
      htmlFor="custom-multi-value-remove-id"
    >
      <Select
        inputId="custom-multi-value-remove-id"
        components={{ MultiValueRemove }}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  multiValueRemove: (base) => ({
    ...base,
    border: `1px dotted ${colourOptions[2].color}`,
    height: '100%',
  }),
};

// =============================================================================
// Components
// =============================================================================

function MultiValueRemove(props: MultiValueRemoveProps<ColourOption>) {
  return (
    <Tooltip content={'Customise your multi-value remove component!'} truncate>
      <components.MultiValueRemove {...props}>
        <EmojiIcon label="Emoji" primaryColor={colourOptions[2].color} />
      </components.MultiValueRemove>
    </Tooltip>
  );
}
