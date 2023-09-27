import type { ComponentMeta } from '@storybook/react';
import * as React from 'react';
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from 'react-select';
import { Field } from '../components';
import { ColourOption, colourOptions, EMOJIS } from '../data';

export default {
  title: 'Select/CustomSelectProps',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

export function CustomSelectProps(props: Props<ColourOption>) {
  const [clickCount, setClickCount] = React.useState(0);

  function onClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setClickCount(clickCount + 1);
    event.preventDefault();
    event.stopPropagation();
  }

  const emoji = EMOJIS[clickCount % EMOJIS.length];

  return (
    <Field label="Custom Select Props" htmlFor="custom-select-props-id">
      <Select
        {...props}
        components={{ Control }}
        inputId="custom-select-props-id"
        isSearchable
        options={colourOptions}
        styles={styles}
        // @ts-ignore
        emoji={emoji}
        onEmojiClick={onClick}
      />
    </Field>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption> = {
  control: (css) => ({ ...css, paddingLeft: '1rem' }),
};

// =============================================================================
// Components
// =============================================================================

function Control({ children, ...props }: ControlProps<ColourOption>) {
  // @ts-ignore
  const { emoji, onEmojiClick } = props.selectProps;
  const style = { cursor: 'pointer' };

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} style={style}>
        {emoji}
      </span>
      {children}
    </components.Control>
  );
}
