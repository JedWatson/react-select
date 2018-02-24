// @flow

import React, { Component } from 'react';

import { Code, H1, H2 } from '../../components';
import selectProps from './props';
import PrettyProp, { TypeDefinition } from './PrettyProp';

const internalTypes = `
type OptionType = { [string]: any }
type OptionsType = Array<OptionType>

type GroupType = {
  [string]: any, // group label
  options: OptionsType,
}

type ValueType = OptionType | OptionsType | null | void

type CommonProps = {
  clearValue: () => void,
  getStyles: (string, any) => {},
  getValue: () => ValueType,
  hasValue: boolean,
  isMulti: boolean,
  options: OptionsType,
  selectOption: OptionType => void,
  selectProps: any,
  setValue: (ValueType, ActionTypes) => void,
}

// passed as the second argument to \`onChange\`
type ActionTypes =
| 'clear'
| 'create-option'
| 'deselect-option'
| 'pop-value'
| 'remove-value'
| 'select-option'
| 'set-value'
`;

export default class Docs extends Component<*> {
  render() {
    return (
      <div>
        <H1>API Documentation</H1>
        <H2>Methods</H2>
        <p>
          <Code>focus()</Code> focused the control.
        </p>
        <H2>Types</H2>
        <p>Internal types (expected in props, below)</p>
        <TypeDefinition>{internalTypes}</TypeDefinition>
        <H2>Props</H2>
        {selectProps.map(p => <PrettyProp key={p.name} {...p} />)}
      </div>
    );
  }
}
