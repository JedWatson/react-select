// @flow

import React from 'react';
import { Code, CodeBlock, H1 } from '../components';

const propFn = k => {
  const style = { display: 'inline-block', marginBottom: 6, marginRight: 4 };
  return (
    <span key={k} style={style}>
      <Code>{k}</Code>
    </span>
  );
};
const commonProps = [
  'clearValue',
  'getStyles',
  'getValue',
  'hasValue',
  'isMulti',
  'isRtl',
  'options',
  'selectOption',
  'setValue',
  'selectProps',
];

export default function APIComponents() {
  return (
    <div>
      <H1>Components</H1>
      <p>
        The main feature of this library is providing consumers with the
        building blocks necessary to create <em>their</em> component.
      </p>
      <h3>Replacing Components</h3>
      <p>
        React-Select allows you to augment layout and functionality by replacing
        the default components with your own, using the <Code>components</Code>{' '}
        property. These components are given all the current props and state
        letting you achieve anything you dream up.
      </p>
      <h3>Inner Props</h3>
      <p>
        All functional properties that the component needs are provided in{' '}
        <Code>innerProps</Code> which you must spread.
      </p>
      <h3>Common Props</h3>
      <p>
        Every component receives <Code>commonProps</Code> which are spread onto
        the component. These include:
      </p>
      <p>{commonProps.map(propFn)}</p>
      <CodeBlock>
        {`import React from 'react';
import Select from 'react-select';

const CustomOption = ({ innerProps, isDisabled }) => !isDisabled ? (
  <div {...innerProps}>
    // your component internals
  </div>
) : null;

class Component extends React.Component {
  render() {
    return <Select components={{ Option: CustomOption }} />;
  }
}`}
      </CodeBlock>
    </div>
  );
}
