// @flow

import React from 'react';
import md from 'react-markings';

import ContentBlock from '../ContentBlock';
import { Code, CodeBlock } from '../styled-components';

const keyFn = k => {
  const style = { display: 'inline-block', marginBottom: 6, marginRight: 4 };
  return (
    <span key={k} style={style}>
      <Code>{k}</Code>
    </span>
  );
};
const styleKeys = [
  'clearIndicator',
  'container',
  'control',
  'dropdownIndicator',
  'group',
  'groupHeading',
  'indicatorsContainer',
  'indicatorSeparator',
  'input',
  'loadingIndicator',
  'loadingMessage',
  'menu',
  'menuList',
  'multiValue',
  'multiValueLabel',
  'multiValueRemove',
  'noOptionsMessage',
  'option',
  'placeholder',
  'singleValue',
  'valueContainer',
];

export default function Styles() {
  return (
    <ContentBlock>{md`
      # Styles

      React-Select offers a flexible, light-weight styling framework which is
      a thin abstraction over simple javascript objects using
      [glam](https://github.com/threepointone/glam).

      ${(
        <CodeBlock>
          {`/**
* @param {Object} base -- the component's default style
* @param {Object} state -- the component's current state e.g. \`isFocused\`
* @returns {Object}
*/
function styleFn(base, state) {
  // optionally spread base styles
  return { ...base, color: state.isFocused ? 'blue' : 'red' };
}`}
        </CodeBlock>
      )}

      ### Style Object

      Each component is keyed, and ships with default styles. The component's
      default style object is passed as the first argument to the function
      when it's resolved.

      The second argument is the current state of the select, features like
      \`isFocused\`, \`isSelected\` etc. allowing you to
      implement dynamic styles for each of the components.

      ###### Style Keys

      ${styleKeys.map(keyFn)}

      ### Base and State

      Spreading the base styles into your returned object let's you extend it
      however you like while maintaining existing styles. Alternatively, you
      can omit the base and completely take control of the component's styles.

      ${(
        <CodeBlock>
          {`const customStyles = {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-selects styles are passed to <View />
    width: 200,
  })
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
}

const App = () => (
  <Select
    styles={customStyles}
    options={...}
  />
);`}
        </CodeBlock>
      )}
    `}</ContentBlock>
  );
}
