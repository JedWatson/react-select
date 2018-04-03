import React, { Component } from 'react';

import { type Props, defaultProps } from '../../src/Select';

export default class Select extends Component<Props> {
  defaultProps = defaultProps
}

export const BaseSelect = [
  {
    defaultValue: null,
    description:
      'HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)',
    name: 'aria-describedby',
    type: 'String',
  },
  {
    defaultValue: null,
    description: 'Aria label (for assistive tech)',
    name: 'aria-label',
    type: 'String',
  },
  {
    defaultValue: null,
    description:
      'HTML ID of an element that should be used as the label (for assistive tech)',
    name: 'aria-labelledby',
    type: 'String',
  },
  {
    defaultValue: null,
    description: 'Focus the control when it is mounted',
    name: 'autoFocus',
    type: 'Boolean',
  },
  {
    defaultValue: 'true',
    description:
      'Remove the currently focused option when the user presses backspace',
    name: 'backspaceRemovesValue',
    type: 'Boolean',
  },
  {
    defaultValue: 'true',
    description:
      'When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent',
    name: 'captureMenuScroll',
    type: 'Boolean',
  },
  {
    defaultValue: 'true',
    description: 'Close the select menu when the user selects an option',
    name: 'closeMenuOnSelect',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description: 'Custom components to use',
    name: 'components',
    type: 'Object',
    typeDefinition: `{
  ClearIndicator: ComponentType<CommonProps>,
  Control: ComponentType<CommonProps>,
  DropdownIndicator: ComponentType<CommonProps>,
  Group: ComponentType<CommonProps>,
  GroupHeading: ComponentType<CommonProps>,
  IndicatorsContainer: ComponentType<CommonProps>,
  IndicatorSeparator: ComponentType<CommonProps>,
  Input: ComponentType<CommonProps>,
  LoadingIndicator: ComponentType<CommonProps>,
  Menu: ComponentType<CommonProps>,
  MenuList: ComponentType<CommonProps>,
  LoadingMessage: ComponentType<CommonProps>,
  NoOptionsMessage: ComponentType<CommonProps>,
  MultiValue: ComponentType<CommonProps>,
  MultiValueContainer: ComponentType<CommonProps>,
  MultiValueLabel: ComponentType<CommonProps>,
  MultiValueRemove: ComponentType<CommonProps>,
  Option: ComponentType<CommonProps>,
  Placeholder: ComponentType<CommonProps>,
  SelectContainer: ComponentType<CommonProps>,
  SingleValue: ComponentType<CommonProps>,
  ValueContainer: ComponentType<CommonProps>,
}`,
  },
  {
    defaultValue: null,
    description:
      'Delimiter used to join multiple values into a single HTML Input value',
    name: 'delimiter',
    type: 'String',
  },
  {
    defaultValue: 'false',
    description:
      'Clear all values when the user presses escape AND the menu is closed',
    name: 'escapeClearsValue',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description:
      'Custom method to filter whether an option should be displayed in the menu',
    name: 'filterOption',
    type: 'Function',
    typeDefinition: '(Object, string) => boolean | null',
  },
  {
    defaultValue: null,
    description: 'Formats group labels in the menu as React components',
    name: 'formatGroupLabel',
    type: 'Function',
    typeDefinition: '(GroupType) => Node',
  },
  {
    defaultValue: null,
    description:
      'Formats option labels in the menu and control as React components',
    name: 'formatOptionLabel',
    type: 'Function',
    typeDefinition: '(OptionType, FormatOptionLabelMeta) => Node',
  },
  {
    defaultValue: null,
    description:
      'Resolves option data to a string to be displayed as the label by components',
    name: 'getOptionLabel',
    type: 'Function',
    typeDefinition: '(OptionType) => string',
  },
  {
    defaultValue: null,
    description:
      'Resolves option data to a string to compare options and specify value attributes',
    name: 'getOptionValue',
    type: 'Function',
    typeDefinition: '(OptionType) => string',
  },
  {
    defaultValue: 'true',
    description: 'Hide the selected option from the menu',
    name: 'hideSelectedOptions',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description: 'The value of the search input',
    name: 'inputValue',
    type: 'String',
  },
  {
    defaultValue: null,
    description: (
      <p>
        Define an id prefix for the select components e.g.{' '}
        <code>{'{your-id}'}-value</code>
      </p>
    ),
    name: 'instanceId',
    type: 'Number | String',
  },
  {
    defaultValue: null,
    description: 'Is the select value clearable',
    name: 'isClearable',
    type: 'Boolean',
  },
  {
    defaultValue: 'false',
    description: 'Is the select disabled',
    name: 'isDisabled',
    type: 'Boolean',
  },
  {
    defaultValue: 'false',
    description: 'Is the select in a state of loading (async)',
    name: 'isLoading',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description:
      'Override the built-in logic to detect whether an option is disabled',
    name: 'isOptionDisabled',
    type: 'Function',
    typeDefinition: '(OptionType) => boolean | false',
  },
  {
    defaultValue: null,
    description:
      'Override the built-in logic to detect whether an option is selected',
    name: 'isOptionSelected',
    type: 'Function',
    typeDefinition: '(OptionType) => boolean | false',
  },
  {
    defaultValue: 'false',
    description: 'Support multiple selected options',
    name: 'isMulti',
    type: 'Boolean',
  },
  {
    defaultValue: 'false',
    description: 'Is the select direction right-to-left',
    name: 'isRtl',
    type: 'Boolean',
  },
  {
    defaultValue: 'true',
    description: 'Whether to enable search functionality',
    name: 'isSearchable',
    type: 'Boolean',
  },
  {
    defaultValue: '300',
    description: 'Maximum height of the menu before scrolling',
    name: 'maxMenuHeight',
    type: 'Number',
  },
  {
    defaultValue: '100',
    description: 'Maximum height of the value container before scrolling',
    name: 'maxValueHeight',
    type: 'Number',
  },
  {
    defaultValue: 'false',
    description: 'Whether the menu is open',
    name: 'menuIsOpen',
    type: 'Boolean',
  },
  {
    defaultValue: "'bottom'",
    description:
      "Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.",
    name: 'menuPlacement',
    type: "'auto' | 'bottom' | 'top'",
  },
  {
    defaultValue: null,
    description:
      'Name of the HTML Input (optional - without this, no input will be rendered)',
    name: 'name',
    type: 'String',
  },
  {
    defaultValue: null,
    description: 'Text to display when there are no options',
    name: 'noOptionsMessage',
    type: 'Function',
    typeDefinition: '({ inputValue: string }) => string',
  },
  {
    defaultValue: null,
    description: 'Handle blur events on the control',
    name: 'onBlur',
    type: 'Function',
    typeDefinition: '(FocusEvent) => void',
  },
  {
    defaultValue: null,
    description: 'Handle change events on the select',
    name: 'onChange',
    type: 'Function',
    typeDefinition: '(Event) => void',
  },
  {
    defaultValue: null,
    description: 'Handle focus events on the control',
    name: 'onFocus',
    type: 'Function',
    typeDefinition: '(Event) => void',
  },
  {
    defaultValue: null,
    description: 'Handle change events on the input',
    name: 'onInputChange',
    type: 'Function',
    typeDefinition: '(string) => void',
  },
  {
    defaultValue: null,
    description: 'Handle key down events on the select',
    name: 'onKeyDown',
    type: 'Function',
    typeDefinition: '(Event) => void',
  },
  {
    defaultValue: null,
    description: 'Handle the menu opening',
    name: 'onMenuOpen',
    type: 'Function',
    typeDefinition: '() => void',
  },
  {
    defaultValue: null,
    description: 'Handle the menu closing',
    name: 'onMenuClose',
    type: 'Function',
    typeDefinition: '() => void',
  },
  {
    defaultValue: '[]',
    description: 'Array of options that populate the select menu',
    name: 'options',
    type: 'Array<Object>',
    typeDefinition: '[{ [key: string]: any }]',
  },
  {
    defaultValue: '5',
    description:
      'Number of options to jump in menu when page{up|down} keys are used',
    name: 'pageSize',
    type: 'Number',
  },
  {
    defaultValue: "'Select...'",
    description: 'Placeholder text for the select value',
    name: 'placeholder',
    type: 'String',
  },
  {
    defaultValue: null,
    description: 'Status to relay to screen readers',
    name: 'screenReaderStatus',
    type: 'Function',
    typeDefinition: '({ count: number }) => string',
  },
  {
    defaultValue: 'true on desktop, false on mobile',
    description: 'Whether the menu should be scrolled into view when it opens',
    name: 'menuShouldScrollIntoView',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description: 'Style modifier methods',
    name: 'styles',
    type: 'Object',
    typeDefinition: `type StyleObj = { [key: string]: any }
type State = {
  isDisabled: boolean,
  isFocused: boolean,
  isRtl: boolean,
  menuIsOpen: boolean
}

type StyleFn = (StyleObj, State) => StyleObj

{
  clearIndicator: StyleFn,
  container: StyleFn,
  control: StyleFn,
  dropdownIndicator: StyleFn,
  group: StyleFn,
  groupHeading: StyleFn,
  indicatorsContainer: StyleFn,
  indicatorSeparator: StyleFn,
  input: StyleFn,
  loadingIndicator: StyleFn,
  loadingMessageCSS: StyleFn,
  menu: StyleFn,
  menuList: StyleFn,
  multiValue: StyleFn,
  multiValueLabel: StyleFn,
  multiValueRemove: StyleFn,
  noOptionsMessageCSS: StyleFn,
  option: StyleFn,
  placeholder: StyleFn,
  singleValue: StyleFn,
  valueContaine: StyleFn,
}`,
  },
  {
    defaultValue: 'true',
    description:
      'Select the currently focused option when the user presses tab',
    name: 'tabSelectsValue',
    type: 'Boolean',
  },
  {
    defaultValue: null,
    description: 'The value of the select; reflected by the selected option',
    name: 'value',
    type: 'OptionType | OptionsType | null | void',
  },
];
