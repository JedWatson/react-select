import React, { Fragment } from 'react';

import Select, { components, MenuProps } from 'react-select';
import {
  ColourOption,
  colourOptions,
  FlavourOption,
  GroupedOption,
  groupedOptions,
} from '../data';

function getLength(
  options: readonly (GroupedOption | ColourOption | FlavourOption)[]
): number {
  return options.reduce((acc, curr) => {
    if ('options' in curr) return acc + getLength(curr.options);
    return acc + 1;
  }, 0);
}

const menuHeaderStyle = {
  padding: '8px 12px',
};

const Menu = (
  props: MenuProps<ColourOption | FlavourOption, false, GroupedOption>
) => {
  const optionsLength = getLength(props.options);
  return (
    <Fragment>
      <div style={menuHeaderStyle}>
        Custom Menu with {optionsLength} options
      </div>
      <components.Menu<ColourOption | FlavourOption, false, GroupedOption>
        {...props}
      >
        {props.children}
      </components.Menu>
    </Fragment>
  );
};

export default () => (
  <Select<ColourOption | FlavourOption, false, GroupedOption>
    defaultValue={colourOptions[1]}
    options={groupedOptions}
    components={{ Menu }}
  />
);
