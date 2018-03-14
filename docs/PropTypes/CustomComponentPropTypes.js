export const PropsWithStyles = {
  defaultValue: null,
  description: '',
  name: 'getStyles',
  type: '(string, any) => Object'
};

export const IndicatorProps = [
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

export const ControlProps = [
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
export const GroupProps = [
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

export const IndicatorsContainer = [
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
