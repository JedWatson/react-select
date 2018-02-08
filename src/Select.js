// @flow

import React, { Component, type ElementRef, type Node } from 'react';

import { createFilter } from './filters';
import { ScrollLock } from './internal';
import { cleanValue, handleInputChange, scrollIntoView } from './utils';
import {
  formatGroupLabel,
  getOptionLabel,
  getOptionValue,
  isOptionDisabled,
} from './builtins';

import {
  defaultComponents,
  type SelectComponents,
  type SelectComponentsConfig,
} from './components/index';
import { A11yText } from './primitives';
import { defaultStyles, type StylesConfig } from './styles';

import type {
  ActionMeta,
  ActionTypes,
  FocusDirection,
  FocusEventHandler,
  GroupType,
  KeyboardEventHandler,
  OptionsType,
  OptionType,
  ValueType,
} from './types';

type FormatOptionLabelContext = 'menu' | 'value';
type FormatOptionLabelMeta = {
  context: FormatOptionLabelContext,
  inputValue: string,
  selectValue: ValueType,
};

type Props = {
  /* HTML ID(s) of element(s) that should be used to describe this input (for assistive tech) */
  'aria-describedby'?: string,
  /* Aria label (for assistive tech) */
  'aria-label'?: string,
  /* HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: string,
  /* Focus the control when it is mounted */
  autoFocus?: boolean,
  /* Remove the currently focused option when the user presses backspace */
  backspaceRemovesValue: boolean,
  /* When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll: boolean,
  /* Close the select menu when the user selects an option */
  closeMenuOnSelect: boolean,
  /* Custom components to use */
  components: SelectComponentsConfig,
  /* Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string,
  /* Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue: boolean,
  /* Custom method to filter whether an option should be displayed in the menu */
  filterOption: ((Object, string) => boolean) | null,
  /* Formats group labels in the menu as React components */
  formatGroupLabel: typeof formatGroupLabel,
  /* Formats option labels in the menu and control as React components */
  formatOptionLabel?: (OptionType, FormatOptionLabelMeta) => Node,
  /* Resolves option data to a string to be displayed as the label by components */
  getOptionLabel: typeof getOptionLabel,
  /* Resolves option data to a string to compare options and specify value attributes */
  getOptionValue: typeof getOptionValue,
  /* Hide the selected option from the menu */
  hideSelectedOptions: boolean,
  /* Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string,
  /* Is the select value clearable */
  isClearable: boolean,
  /* Is the select disabled */
  isDisabled: boolean,
  /* Is the select in a state of loading (async) */
  isLoading: boolean,
  /* Override the built-in logic to detect whether an option is disabled */
  isOptionDisabled: typeof isOptionDisabled | false,
  /* Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (OptionType, OptionsType) => boolean,
  /* Support multiple selected options */
  isMulti: boolean,
  /* Is the select direction right-to-left */
  isRtl: boolean,
  /* Async: Text to display when loading options */
  loadingMessage: ({ inputValue: string }) => string,
  /* Maximum height of the menu before scrolling */
  maxMenuHeight: number,
  /* Maximum height of the value container before scrolling */
  maxValueHeight: number,
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  /* Text to display when there are no options */
  noOptionsMessage: ({ inputValue: string }) => string,
  /* Handle blur events on the control */
  onBlur?: FocusEventHandler,
  /* Handle change events on the select */
  onChange?: (ValueType, ActionMeta) => void,
  /* Handle focus events on the control */
  onFocus?: FocusEventHandler,
  /* Handle change events on the input; return a string to modify the value */
  onInputChange?: string => string | void,
  /* Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler,
  /* Array of options that populate the select menu */
  options: OptionsType,
  /* Placeholder text for the select value */
  placeholder: string,
  /* Status to relay to screen readers */
  screenReaderStatus: ({ count: number }) => string,
  /* Style modifier methods */
  styles: StylesConfig,
  /* Select the currently focused option when the user presses tab */
  tabSelectsValue: boolean,
  /* The value of the select; reflected by the selected option */
  value?: ValueType,
};

const defaultProps = {
  backspaceRemovesValue: true,
  captureMenuScroll: true,
  closeMenuOnSelect: true,
  components: {},
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  hideSelectedOptions: true,
  isClearable: false,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: () => 'Loading...',
  maxMenuHeight: 300,
  maxValueHeight: 100,
  noOptionsMessage: () => 'No options',
  options: [],
  placeholder: 'Select...',
  screenReaderStatus: ({ count }: { count: number }) =>
    `${count} result${count !== 1 ? 's' : ''} available.`,
  styles: {},
  tabSelectsValue: true,
};

type MenuOptions = {
  render: Array<OptionType>,
  focusable: Array<OptionType>,
};

type State = {
  inputValue: string,
  inputIsHidden: boolean,
  isFocused: boolean,
  focusedOption: OptionType | null,
  menuIsOpen: boolean,
  menuOptions: MenuOptions,
  selectValue: OptionsType,
};

type ElRef = ElementRef<*>;

let instanceId = 1;

// TODO: turn this into a prop or measure it when there's a menu ref
const PAGE_SIZE = 5;

export default class Select extends Component<Props, State> {
  static defaultProps = defaultProps;
  blockOptionHover: boolean = false;
  components: SelectComponents;
  commonProps: any; // TODO
  controlRef: ElRef;
  focusedOptionRef: ?HTMLElement;
  hasGroups: boolean = false;
  input: ?ElRef;
  inputHeight: ?number = 20;
  instancePrefix: string = '';
  menuRef: ?HTMLElement;
  openAfterFocus: boolean = false;
  scrollToFocusedOptionOnUpdate: boolean = false;
  state = {
    inputIsHidden: false,
    inputValue: '',
    isFocused: false,
    menuIsOpen: false,
    menuOptions: { render: [], focusable: [] },
    focusedOption: null,
    selectValue: [],
  };
  constructor(props: Props) {
    super(props);
    const { options, value } = props;
    this.components = defaultComponents(props);
    this.instancePrefix =
      'react-select-' + (this.props.instanceId || ++instanceId) + '-';

    const selectValue = cleanValue(value);
    const menuOptions = this.buildMenuOptions(options, selectValue);

    this.state.menuOptions = menuOptions;
    this.state.selectValue = selectValue;
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    const { components, options, value } = this.props;
    const { inputValue } = this.state;
    if (nextProps.components !== components) {
      this.components = defaultComponents(nextProps);
    }
    if (nextProps.value !== value || nextProps.options !== options) {
      const selectValue = cleanValue(nextProps.value);
      const menuOptions = this.buildMenuOptions(
        nextProps.options,
        selectValue,
        inputValue
      );
      const focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      this.setState({ menuOptions, selectValue, focusedOption });
    }
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.menuRef &&
      this.focusedOptionRef &&
      this.scrollToFocusedOptionOnUpdate
    ) {
      scrollIntoView(this.menuRef, this.focusedOptionRef);
    }
    if (prevState.menuIsOpen !== this.state.menuIsOpen) {
      this.blockOptionHover = false;
    }
    this.scrollToFocusedOptionOnUpdate = false;
  }
  getNextFocusedOption(options: OptionsType) {
    const { focusedOption: lastFocusedOption } = this.state;
    return lastFocusedOption && options.indexOf(lastFocusedOption) > -1
      ? lastFocusedOption
      : options[0];
  }
  buildMenuOptions(
    options: OptionsType,
    selectValue: OptionsType,
    inputValue: string = ''
  ): MenuOptions {
    const { hideSelectedOptions, isMulti } = this.props;
    const render = [];
    const focusable = [];

    const toOption = (option, id) => {
      const isDisabled = this.isOptionDisabled(option);
      const isSelected = this.isOptionSelected(option, selectValue);
      const label = this.getOptionLabel(option);
      const value = this.getOptionValue(option);

      if (
        (isMulti && hideSelectedOptions && isSelected) ||
        !this.filterOption({ label, value, data: option }, inputValue)
      ) {
        return;
      }

      if (!isDisabled) {
        focusable.push(option);
      }

      const onHover = isDisabled ? undefined : () => this.onOptionHover(option);
      const onSelect = isDisabled ? undefined : () => this.selectOption(option);
      const optionId = `${this.getElementId('option')}-${id}`;

      return {
        innerProps: {
          'aria-selected': isSelected,
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          role: 'option',
          tabIndex: -1,
        },
        data: option,
        isDisabled,
        isSelected,
        key: optionId,
        label,
        type: 'option',
        value,
      };
    };

    options.forEach((item, itemIndex) => {
      if (item.options) {
        // TODO needs a tidier implementation
        if (!this.hasGroups) this.hasGroups = true;

        const { options: items } = item;
        const children = items
          .map((child, i) => toOption(child, `${itemIndex}-${i}`))
          .filter(Boolean);
        if (children.length) {
          const groupId = `${this.getElementId('group')}-${itemIndex}`;
          render.push({
            type: 'group',
            key: groupId,
            data: item,
            options: children,
          });
        }
      } else {
        const option = toOption(item, itemIndex);
        if (option) render.push(option);
      }
    });
    return { render, focusable };
  }
  filterOption(option: {}, inputValue: string) {
    return this.props.filterOption
      ? this.props.filterOption(option, inputValue)
      : true;
  }
  buildStateForInputValue(newValue: string = '') {
    const inputValue = handleInputChange(newValue, this.props.onInputChange);
    const { options } = this.props;
    const { selectValue } = this.state;
    const menuOptions = this.buildMenuOptions(options, selectValue, inputValue);
    const focusedOption = this.getNextFocusedOption(menuOptions.focusable);
    return { inputValue, menuOptions, focusedOption };
  }
  formatOptionLabel(data: OptionType, context: FormatOptionLabelContext): Node {
    if (typeof this.props.formatOptionLabel === 'function') {
      const { inputValue, selectValue } = this.state;
      return this.props.formatOptionLabel(data, {
        context,
        inputValue,
        selectValue,
      });
    } else {
      return this.getOptionLabel(data);
    }
  }
  formatGroupLabel(data: GroupType) {
    return this.props.formatGroupLabel(data);
  }
  getOptionLabel(data: OptionType): string {
    return this.props.getOptionLabel(data);
  }
  getOptionValue(data: OptionType): string {
    return this.props.getOptionValue(data);
  }
  getStyles = (key: string, props: {}): {} => {
    const base = defaultStyles[key](props);
    base.boxSizing = 'border-box';
    const custom = this.props.styles[key];
    return custom ? custom(base, props) : base;
  };
  hasValue() {
    const { selectValue } = this.state;
    return selectValue.length > 0;
  }
  hasOptions() {
    return !!this.state.menuOptions.render.length;
  }
  countOptions() {
    return this.state.menuOptions.focusable.length;
  }
  isClearable(): boolean {
    return this.props.isClearable || this.props.isMulti;
  }
  isOptionDisabled(option: OptionType): boolean {
    return typeof this.props.isOptionDisabled === 'function'
      ? this.props.isOptionDisabled(option)
      : false;
  }
  isOptionSelected(option: OptionType, selectValue: OptionsType): boolean {
    if (selectValue.indexOf(option) > -1) return true;
    if (typeof this.props.isOptionSelected === 'function') {
      return this.props.isOptionSelected(option, selectValue);
    }
    const candidate = this.getOptionValue(option);
    return selectValue.some(i => this.getOptionValue(i) === candidate);
  }
  focus() {
    if (!this.input) return;
    this.input.focus();
  }
  blurInput() {
    if (!this.input) return;
    this.input.blur();
  }
  openMenu(focusOption: 'first' | 'last' = 'first') {
    const { menuOptions, selectValue } = this.state;
    const { isMulti } = this.props;

    let openAtIndex =
      focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

    if (!isMulti) {
      const selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
      if (selectedIndex > -1) {
        openAtIndex = selectedIndex;
      }
    }

    this.scrollToFocusedOptionOnUpdate = true;
    this.setState({
      focusedOption: menuOptions.focusable[openAtIndex],
      inputIsHidden: false,
      menuIsOpen: true,
    });
  }
  focusOption(
    direction: FocusDirection = 'first',
    blockOptionHover: boolean = false
  ) {
    const { focusedOption, menuOptions } = this.state;
    const options = menuOptions.focusable;
    if (!options.length) return;
    let nextFocus = 0; // handles 'first'
    const focusedIndex = focusedOption ? options.indexOf(focusedOption) : -1;
    if (direction === 'up') {
      nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
    } else if (direction === 'down') {
      nextFocus = (focusedIndex + 1) % options.length;
    } else if (direction === 'pageup') {
      nextFocus = focusedIndex - PAGE_SIZE;
      if (nextFocus < 0) nextFocus = 0;
    } else if (direction === 'pagedown') {
      nextFocus = focusedIndex + PAGE_SIZE;
      if (nextFocus > options.length - 1) nextFocus = options.length - 1;
    } else if (direction === 'last') {
      nextFocus = options.length - 1;
    }
    if (blockOptionHover) {
      this.blockOptionHover = true;
    }
    this.scrollToFocusedOptionOnUpdate = true;
    this.setState({
      focusedOption: options[nextFocus],
    });
  }
  setValue = (newValue: ValueType, action: ActionTypes = 'set-value') => {
    const { closeMenuOnSelect, isMulti, onChange } = this.props;
    // We update the state first because we should clear inputValue when an
    // option is selected; the onChange event fires when that's reconciled
    // otherwise the new menu items will be filtered with the old inputValue
    const newState: any = this.buildStateForInputValue();
    if (closeMenuOnSelect) {
      newState.menuIsOpen = false;
      newState.inputIsHidden = isMulti ? false : true;
    }
    this.setState(
      newState,
      onChange ? () => onChange(newValue, { action }) : undefined
    );
  };
  selectOption = (newValue: OptionType) => {
    const { isMulti } = this.props;
    if (isMulti) {
      const { selectValue } = this.state;
      if (this.isOptionSelected(newValue, selectValue)) {
        this.setValue(
          selectValue.filter(i => i !== newValue),
          'deselect-option'
        );
      } else {
        this.setValue([...selectValue, newValue], 'select-option');
      }
    } else {
      this.setValue(newValue, 'select-option');
    }
  };
  removeValue = (removedValue: OptionType) => {
    const { onChange } = this.props;
    if (onChange) {
      const { selectValue } = this.state;
      onChange(selectValue.filter(i => i !== removedValue), {
        action: 'remove-value',
      });
    }
    this.focus();
  };
  clearValue = () => {
    const { isMulti, onChange } = this.props;
    if (onChange) {
      onChange(isMulti ? [] : null, { action: 'clear' });
    }
  };
  popValue = () => {
    const { onChange } = this.props;
    if (onChange) {
      const { selectValue } = this.state;
      onChange(selectValue.slice(0, selectValue.length - 1), {
        action: 'pop-value',
      });
    }
  };
  onControlRef = (ref: ElementRef<*>) => {
    this.controlRef = ref;
  };
  onControlMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    if (!this.state.isFocused) {
      this.openAfterFocus = true;
      this.focus();
    } else if (!this.state.menuIsOpen) {
      this.openMenu('first');
    } else {
      this.setState({
        menuIsOpen: false,
      });
    }
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };
  onKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const {
      backspaceRemovesValue,
      escapeClearsValue,
      isDisabled,
      onKeyDown,
      tabSelectsValue,
    } = this.props;
    const { focusedOption, inputValue, menuIsOpen } = this.state;

    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    switch (event.keyCode) {
      case 8: // backspace
        if (inputValue || !backspaceRemovesValue) return;
        this.popValue();
        break;
      case 9: // tab
        if (
          event.shiftKey ||
          !menuIsOpen ||
          !tabSelectsValue ||
          !focusedOption
        ) {
          return;
        }
        this.selectOption(focusedOption);
        return;
      case 13: // enter
        if (menuIsOpen) {
          if (!focusedOption) return;
          this.selectOption(focusedOption);
        } else {
          this.focusOption();
        }
        break;
      case 27: // escape
        if (menuIsOpen) {
          this.setState({
            menuIsOpen: false,
            ...this.buildStateForInputValue(),
          });
        } else if (this.isClearable() && escapeClearsValue) {
          this.clearValue();
        }
        break;
      case 32: // space
        if (inputValue) {
          return;
        }
        if (!menuIsOpen) {
          this.openMenu();
          break;
        }
        if (!focusedOption) return;
        this.selectOption(focusedOption);
        break;
      case 38: // up
        if (menuIsOpen) {
          this.focusOption('up', true);
        } else {
          this.openMenu('last');
        }
        break;
      case 40: // down
        if (menuIsOpen) {
          this.focusOption('down', true);
        } else {
          this.openMenu('first');
        }
        break;
      case 33: // page up
        if (!menuIsOpen) return;
        this.focusOption('pageup', true);
        break;
      case 34: // page down
        if (!menuIsOpen) return;
        this.focusOption('pagedown', true);
        break;
      case 36: // home key
        if (!menuIsOpen) return;
        this.focusOption('first', true);
        break;
      case 35: // end key
        if (!menuIsOpen) return;
        this.focusOption('last', true);
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  onInputRef = (input: ElRef) => {
    this.input = input;

    // cache the input height to use when the select is disabled
    if (input) {
      this.inputHeight = input.clientHeight;
    }
  };
  onInputChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    this.setState({
      inputIsHidden: false,
      menuIsOpen: true,
      ...this.buildStateForInputValue(inputValue),
    });
  };
  onInputFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({
      inputIsHidden: false,
      isFocused: true,
    });
    if (this.openAfterFocus) {
      this.openMenu('first');
    }
    this.openAfterFocus = false;
  };
  onInputBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      isFocused: false,
      menuIsOpen: false,
      ...this.buildStateForInputValue(''),
    });
  };
  onMenuRef = (ref: ElementRef<*>) => {
    this.menuRef = ref;
  };
  onMenuMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.focus();
  };
  onMenuMouseMove = (event: SyntheticMouseEvent<HTMLElement>) => {
    this.blockOptionHover = false;
  };
  onFocusedOptionRef = (ref: ElementRef<*>) => {
    this.focusedOptionRef = ref;
  };
  onOptionHover = (focusedOption: OptionType) => {
    if (this.blockOptionHover || this.state.focusedOption === focusedOption) {
      return;
    }
    this.setState({ focusedOption });
  };
  onDropdownIndicatorMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (this.props.isDisabled) return;
    const { isMulti } = this.props;
    const { menuIsOpen } = this.state;
    if (!this.focused) {
      this.focus();
    }
    if (menuIsOpen) {
      this.setState({
        menuIsOpen: false,
        inputIsHidden: isMulti ? false : true,
      });
    } else {
      this.openMenu();
    }
    event.preventDefault();
    event.stopPropagation();
  };
  onClearIndicatorMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    this.clearValue();
    event.stopPropagation();
    this.openAfterFocus = false;
    setTimeout(() => this.focus());
  };
  getElementId = (element: 'group' | 'input' | 'listbox' | 'option') => {
    return `${this.instancePrefix}-${element}`;
  };
  getActiveDescendentId = () => {
    const { focusedOption, menuIsOpen } = this.state;
    return focusedOption && menuIsOpen ? focusedOption.key : undefined;
  };
  renderScreenReaderStatus() {
    const { screenReaderStatus } = this.props;
    return (
      <A11yText aria-atomic="true" aria-live="polite" role="status">
        {screenReaderStatus({ count: this.countOptions() })}
      </A11yText>
    );
  }
  renderInput(id: string) {
    const { isDisabled, isLoading } = this.props;
    const { Input } = this.components;
    const { inputIsHidden, inputValue, menuIsOpen } = this.state;

    // maintain baseline alignment when the input is removed for disabled state
    if (isDisabled) return <div style={{ height: this.inputHeight }} />;

    // aria attributes makes the JSX "noisy", separated for clarity
    const ariaAttributes = {
      'aria-activedescendant': this.getActiveDescendentId(),
      'aria-autocomplete': 'list',
      'aria-busy': isLoading,
      'aria-describedby': this.props['aria-describedby'],
      'aria-expanded': menuIsOpen,
      'aria-haspopup': menuIsOpen,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-owns': menuIsOpen ? this.getElementId('listbox') : undefined,
      role: 'combobox',
    };

    return (
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        getStyles={this.getStyles}
        id={id}
        innerRef={this.onInputRef}
        isHidden={inputIsHidden}
        onBlur={this.onInputBlur}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        spellCheck="false"
        tabIndex="0"
        type="text"
        value={inputValue}
        {...ariaAttributes}
      />
    );
  }
  renderPlaceholderOrValue() {
    const {
      MultiValue,
      MultiValueContainer,
      MultiValueLabel,
      MultiValueRemove,
      SingleValue,
      Placeholder,
    } = this.components;
    const { commonProps } = this;
    const { isDisabled, isMulti, placeholder } = this.props;
    const { inputValue, selectValue } = this.state;

    if (!this.hasValue()) {
      return inputValue ? null : (
        <Placeholder {...commonProps} key="placeholder" isDisabled={isDisabled}>
          {placeholder}
        </Placeholder>
      );
    }
    if (isMulti) {
      return selectValue.map(opt => (
        <MultiValue
          {...commonProps}
          components={{
            Container: MultiValueContainer,
            Label: MultiValueLabel,
            Remove: MultiValueRemove,
          }}
          isDisabled={isDisabled}
          key={this.getOptionValue(opt)}
          removeProps={{
            onClick: () => this.removeValue(opt),
            onMouseDown: e => {
              e.preventDefault();
              e.stopPropagation();
            },
          }}
          data={opt}
        >
          {this.formatOptionLabel(opt, 'value')}
        </MultiValue>
      ));
    }
    if (inputValue) return null;
    const singleValue = selectValue[0];
    return (
      <SingleValue {...commonProps} data={singleValue} isDisabled={isDisabled}>
        {this.formatOptionLabel(singleValue, 'value')}
      </SingleValue>
    );
  }
  renderClearIndicator() {
    const { ClearIndicator } = this.components;
    const { commonProps } = this;
    const { isDisabled, isLoading } = this.props;
    const { isFocused } = this.state;

    if (
      !this.isClearable() ||
      !ClearIndicator ||
      isDisabled ||
      !this.hasValue() ||
      isLoading
    ) {
      return null;
    }

    const innerProps = {
      onMouseDown: this.onClearIndicatorMouseDown,
      role: 'button',
    };

    return (
      <ClearIndicator
        {...commonProps}
        innerProps={innerProps}
        isFocused={isFocused}
      />
    );
  }
  renderLoadingIndicator() {
    const { LoadingIndicator } = this.components;
    const { commonProps } = this;
    const { isDisabled, isLoading } = this.props;
    const { isFocused } = this.state;

    if (!LoadingIndicator || !isLoading) return null;

    const innerProps = {
      role: 'presentation',
    };

    return (
      <LoadingIndicator
        {...commonProps}
        innerProps={innerProps}
        isDisabled={isDisabled}
        isFocused={isFocused}
      />
    );
  }
  renderIndicatorSeparator() {
    const { IndicatorSeparator } = this.components;
    if (!IndicatorSeparator) return null;
    const { commonProps } = this;
    const { isDisabled } = this.props;
    const { isFocused } = this.state;

    const innerProps = { role: 'presentation' };

    return (
      <IndicatorSeparator
        {...commonProps}
        innerProps={innerProps}
        isDisabled={isDisabled}
        isFocused={isFocused}
      />
    );
  }
  renderDropdownIndicator() {
    const { DropdownIndicator } = this.components;
    if (!DropdownIndicator) return null;
    const { commonProps } = this;
    const { isDisabled } = this.props;
    const { isFocused } = this.state;

    const innerProps = {
      onMouseDown: this.onDropdownIndicatorMouseDown,
      role: 'button',
    };

    return (
      <DropdownIndicator
        {...commonProps}
        innerProps={innerProps}
        isDisabled={isDisabled}
        isFocused={isFocused}
      />
    );
  }
  renderMenu() {
    const {
      Group,
      GroupHeading,
      Menu,
      MenuList,
      LoadingMessage,
      NoOptionsMessage,
      Option,
    } = this.components;
    const { commonProps } = this;
    const { inputValue, focusedOption, menuIsOpen, menuOptions } = this.state;
    const {
      captureMenuScroll,
      isLoading,
      isMulti,
      maxMenuHeight,
      loadingMessage,
      noOptionsMessage,
    } = this.props;

    if (!menuIsOpen) return null;

    // TODO: Internal Option Type here
    const render = (props: OptionType) => {
      // for performance, the menu options in state aren't changed when the
      // focused option changes so we calculate additional props based on that
      const isFocused = focusedOption === props.data;
      props.innerProps.innerRef = isFocused
        ? this.onFocusedOptionRef
        : undefined;

      return (
        <Option {...commonProps} {...props} isFocused={isFocused}>
          {this.formatOptionLabel(props.data, 'menu')}
        </Option>
      );
    };

    let menuUI;

    if (this.hasOptions()) {
      menuUI = menuOptions.render.map(item => {
        if (item.type === 'group') {
          const { type, ...group } = item;
          const headingId = `${item.key}-heading`;

          return (
            <Group
              {...commonProps}
              {...group}
              Heading={GroupHeading}
              innerProps={{
                'aria-expanded': true,
                'aria-labelledby': headingId,
                role: 'group',
              }}
              headingProps={{
                id: headingId,
              }}
              label={this.formatGroupLabel(item.data)}
            >
              {item.options.map(option => render(option))}
            </Group>
          );
        } else if (item.type === 'option') {
          return render(item);
        }
      });
    } else if (isLoading) {
      menuUI = (
        <LoadingMessage {...commonProps}>
          {loadingMessage({ inputValue })}
        </LoadingMessage>
      );
    } else {
      menuUI = (
        <NoOptionsMessage {...commonProps}>
          {noOptionsMessage({ inputValue })}
        </NoOptionsMessage>
      );
    }

    return (
      <Menu
        {...commonProps}
        innerProps={{
          onMouseDown: this.onMenuMouseDown,
          onMouseMove: this.onMenuMouseMove,
        }}
        isLoading={isLoading}
      >
        <ScrollLock enabled={captureMenuScroll}>
          <MenuList
            {...commonProps}
            innerProps={{
              'aria-multiselectable': isMulti,
              id: this.getElementId('listbox'),
              innerRef: this.onMenuRef,
              role: 'listbox',
            }}
            isLoading={isLoading}
            maxHeight={maxMenuHeight}
          >
            {menuUI}
          </MenuList>
        </ScrollLock>
      </Menu>
    );
  }
  renderFormField() {
    const { delimiter, isDisabled, isMulti, name } = this.props;
    const { selectValue } = this.state;

    if (!name || isDisabled) return;

    if (isMulti) {
      if (delimiter) {
        const value = selectValue
          .map(opt => this.getOptionValue(opt))
          .join(delimiter);
        return <input name={name} type="hidden" value={value} />;
      } else {
        return (
          <div>
            {selectValue.map((opt, i) => (
              <input
                key={`i-${i}`}
                name={name}
                type="hidden"
                value={this.getOptionValue(opt)}
              />
            ))}
          </div>
        );
      }
    } else {
      const value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
      return <input name={name} type="hidden" value={value} />;
    }
  }
  getCommonProps() {
    const { clearValue, getStyles, setValue, selectOption, props } = this;
    const { isMulti, isRtl, options } = props;
    const { selectValue } = this.state;
    const hasValue = this.hasValue();
    const getValue = () => selectValue;
    return {
      clearValue,
      getStyles,
      getValue,
      hasValue,
      isMulti,
      isRtl,
      options,
      selectOption,
      setValue,
      selectProps: props,
    };
  }
  render() {
    const {
      Control,
      IndicatorsContainer,
      SelectContainer,
      ValueContainer,
    } = this.components;

    const { isDisabled, maxValueHeight } = this.props;
    const { isFocused } = this.state;
    const inputId = this.getElementId('input');

    const commonProps = (this.commonProps = this.getCommonProps());

    return (
      <SelectContainer
        {...commonProps}
        innerProps={{
          onKeyDown: this.onKeyDown,
        }}
        isDisabled={isDisabled}
        isFocused={isFocused}
      >
        {this.renderScreenReaderStatus()}
        <Control
          {...commonProps}
          innerProps={{
            onMouseDown: this.onControlMouseDown,
            innerRef: this.onControlRef,
          }}
          isDisabled={isDisabled}
          isFocused={isFocused}
        >
          <ValueContainer
            {...commonProps}
            isDisabled={isDisabled}
            maxHeight={maxValueHeight}
          >
            {this.renderPlaceholderOrValue()}
            {this.renderInput(inputId)}
          </ValueContainer>
          <IndicatorsContainer {...commonProps} isDisabled={isDisabled}>
            {this.renderClearIndicator()}
            {this.renderLoadingIndicator()}
            {this.renderIndicatorSeparator()}
            {this.renderDropdownIndicator()}
          </IndicatorsContainer>
        </Control>
        {this.renderMenu()}
        {this.renderFormField()}
      </SelectContainer>
    );
  }
}
