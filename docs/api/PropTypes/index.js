// @flow

import React, { Component } from 'react';

import { H1, H2 } from '../../styled-components';
import selectProps from './props';
import PrettyProp, { TypeDefinition } from '../../PrettyProp';

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

export default class APIPropTypes extends Component<*> {
  render() {
    return (
      <div>
        <H1>Prop Types</H1>

        <H2>Internal Types</H2>
        <p>You&apos;ll see these in the public props below:</p>
        <TypeDefinition>{internalTypes}</TypeDefinition>

        <H2>Public Props</H2>
        {selectProps.map(p => <PrettyProp key={p.name} {...p} />)}
      </div>
    );
  }
}
