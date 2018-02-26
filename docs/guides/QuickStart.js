// @flow

import React from 'react';
import { Code, CodeBlock, H1 } from '../components';

export default function QuickStart() {
  return (
    <div>
      <H1>Quick Start</H1>
      <p>
        Start by installing <Code>react-select</Code>
      </p>
      <CodeBlock>yarn add react-select</CodeBlock>
      <p>Basic usage:</p>
      <CodeBlock>{`import React, { Component } from 'react';
import Select from 'react-select';

const options = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
];

class MySelect extends Component {
  render() {
    <Select options={options} />
  }
}`}</CodeBlock>
    </div>
  );
}
