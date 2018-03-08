import React from 'react';
import PrettyProp from '../PrettyProp';
const PropsWithStyles = {
  defaultValue: null,
  description: '',
  name: 'getStyles',
  type: '(string, any) => Object'
};

const propList = (propDefs) => propDefs.map(p => <PrettyProp key={p.name} {...p}/>);

const IndicatorProps = [
  {
    defaultValue: null,
    description: '',
    name: 'children',
    type: 'React Element'
  },
  {
    defaultValue: null,
    description: '',
    name: 'innerProps',
    type: 'Object',
  },
  {
    defaultValue: null,
    description: '',
    name: 'isFocused',
    type: 'boolean',
  },
  {
    defaultValue: null,
    description: '',
    name: 'isRtl',
    type: 'boolean',
  }
];
const ControlProps = [
  PropsWithStyles,
  {
    defaultValue: null,
    description: '',
    name: 'children',
    type: 'Node'
  },
  {
    defaultValue: null,
    description: '',
    typeDefinition: `{
  onMouseDown: (SyntheticMouseEvent<HTMLElement>) => void,
  innerRef: ElementRef<any>
}`,
    name: 'innerProps',
    type: 'Object'
  },
  {
    defaultValue: null,
    description: '',
    name: 'isDisabled',
    type: 'boolean',
  },
  {
    defaultValue: null,
    description: '',
    name: 'isFocused',
    tyep: 'boolean',
  },
];
const GroupProps = [
  {
    defaultValue: null,
    description: '',
    name: 'children',
    type: 'Node',
  },
  {
    defaultValue: null,
    description: '',
    name: 'Heading',
    type: 'React Component',
  },
  {
    defaultValue: null,
    description: '',
    typeDefinition: `{
      aria-labelledby: string
    }`,
    name: 'headingProps',
    type: 'Object',
  },
  {
    defaultValue: null,
    description: '',
    typeDefinition: `{
      aria-expanded: boolean,
      aria-label: string,
      role: "group"
    }`,
    name: 'Inner Props',
    type: 'Object'
  },
  {
    defaultValue: null,
    description: '',
    name: 'label',
    type: 'Node'
  }
];

const IndicatorsContainer = [
  {
    defaultValue: null,
    description: '',
    name: 'getStyles',
    type: '(string, any) => Object',
  },
  {
    defaultValue: null,
    description: '',
    name: 'isRtl',
    type: 'boolean',
  },
  {
    defaultValue: null,
    description: '',
    name: 'children',
    type: 'Node',
  },
];

export default {
  ClearIndicator: propList(IndicatorProps),
  Control: propList(ControlProps),
  DropdownIndicator: propList(IndicatorProps),
  Group: propList(GroupProps),
  GroupHeading: '{ Object }',
  IndicatorsContainer: propList(IndicatorsContainer),
  IndicatorSeparator: propList(IndicatorProps),
  Input: [],
  LoadingIndicator: [],
  Menu: [],
  MenuList: [],
  LoadingMessage: [],
  NoOptionsMessage: [],
  MultiValue: [],
  MultiValueContainer: [],
  MultiValueLabel: [],
  MultiValueRemove: [],
  Option: [],
  Placeholder: [],
  SelectContainer: [],
  SingleValue: [],
  ValueContainer: [],
};
