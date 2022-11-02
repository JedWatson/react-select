import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import Tooltip from '@atlaskit/tooltip';
import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components,
  GroupHeadingProps,
  StylesConfig,
} from 'react-select';
import { Field } from '../components';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  groupedOptions,
} from '../data';

export default {
  title: 'Select/CustomGroupHeading',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomGroupHeading() {
  return (
    <Field label="Custom Group Heading" htmlFor="custom-group-heading-id">
      <Select<ColourOption | FlavourOption>
        inputId="custom-group-heading-id"
        defaultValue={colourOptions[1]}
        options={groupedOptions}
        components={{ GroupHeading }}
        styles={styles}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption | FlavourOption> = {
  groupHeading: (base) => ({
    ...base,
    flex: '1 1',
    color: 'white',
    margin: 0,
  }),
};

// =============================================================================
// Components
// =============================================================================

function GroupHeading(props: GroupHeadingProps<ColourOption | FlavourOption>) {
  return (
    <div
      style={{
        border: `2px dotted ${colourOptions[2].color}`,
        color: 'white',
        background: colourOptions[2].color,
        padding: '5px 0px',
        display: 'flex',
      }}
    >
      <components.GroupHeading {...props} />
      <Tooltip content="Custom GroupHeading Component">
        <EditorPanelIcon label="Editor Panel" />
      </Tooltip>
    </div>
  );
}
