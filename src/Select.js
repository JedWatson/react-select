// @flow

import React, { Component, type ElementRef, type Node } from 'react';

import { createFilter } from './filters';
import { DummyInput, ScrollCaptor } from './internal/index';
import { cleanValue, isTouchCapable, noop, scrollIntoView } from './utils';
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
  MenuPlacement,
  OptionsType,
  OptionType,
  ValueType,
} from './types';

type MouseOrTouchEvent =
  | SyntheticMouseEvent<HTMLElement>
  | SyntheticTouchEvent<HTMLElement>;
type FormatOptionLabelContext = 'menu' | 'value';
type FormatOptionLabelMeta = {
  context: FormatOptionLabelContext,
  inputValue: string,
  selectValue: ValueType,
};

export type Props = {
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
  /* Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
  blurInputOnSelect: boolean,
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
  /* The value of the search input */
  inputValue: string,
  /* Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string,
  /* Is the select value clearable */
  isClearable?: boolean,
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
  /* Whether to enable search functionality */
  isSearchable: boolean,
  /* Async: Text to display when loading options */
  loadingMessage: ({ inputValue: string }) => string,
  /* Maximum height of the menu before scrolling */
  maxMenuHeight: number,
  /* Maximum height of the value container before scrolling */
  maxValueHeight: number,
  /* Whether the menu is open */
  menuIsOpen: boolean,
  /* Default placement of the menu in relation to the control */
  menuPlacement: MenuPlacement,
  /* Whether to employ edge detection for the menu, and flip when applicable */
  menuShouldFlip: boolean,
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  /* Text to display when there are no options */
  noOptionsMessage: ({ inputValue: string }) => string,
  /* Handle blur events on the control */
  onBlur?: FocusEventHandler,
  /* Handle change events on the select */
  onChange: (ValueType, ActionMeta) => void,
  /* Handle focus events on the control */
  onFocus?: FocusEventHandler,
  /* Handle change events on the input */
  onInputChange: string => void,
  /* Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler,
  /* Handle the menu opening */
  onMenuOpen: () => void,
  /* Handle the menu closing */
  onMenuClose: () => void,
  /* Array of options that populate the select menu */
  options: OptionsType,
  /* Number of options to jump in menu when page{up|down} keys are used */
  pageSize: number,
  /* Placeholder text for the select value */
  placeholder: string,
  /* Status to relay to screen readers */
  screenReaderStatus: ({ count: number }) => string,
  /* Style modifier methods */
  styles: StylesConfig,
  /* Select the currently focused option when the user presses tab */
  tabSelectsValue: boolean,
  /* The value of the select; reflected by the selected option */
  value: ValueType,
};

const defaultProps = {
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  components: {},
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  hideSelectedOptions: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: () => 'Loading...',
  maxMenuHeight: 300,
  maxValueHeight: 100,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuShouldFlip: true,
  noOptionsMessage: () => 'No options',
  options: [],
  pageSize: 5,
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
  inputIsHidden: boolean,
  isFocused: boolean,
  focusedOption: OptionType | null,
  menuOptions: MenuOptions,
  selectValue: OptionsType,
};

type ElRef = ElementRef<*>;

let instanceId = 1;

export default class Select extends Component<Props, State> {
  static defaultProps = defaultProps;
  blockOptionHover: boolean = false;
  components: SelectComponents;
  commonProps: any; // TODO
  controlIsDragging: ?boolean;
  controlRef: ElRef;
  focusedOptionRef: ?HTMLElement;
  hasGroups: boolean = false;
  input: ?ElRef;
  inputHeight: ?number = 20;
  inputIsHiddenAfterUpdate: ?boolean;
  instancePrefix: string = '';
  menuRef: ?ElRef;
  openAfterFocus: boolean = false;
  scrollToFocusedOptionOnUpdate: boolean = false;
  state = {
    focusedOption: null,
    inputIsHidden: false,
    isFocused: false,
    menuOptions: { render: [], focusable: [] },
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
    const { components, options, value, inputValue } = this.props;
    // re-cache custom components
    if (nextProps.components !== components) {
      this.components = defaultComponents(nextProps);
    }
    // rebuild the menu options
    if (
      nextProps.value !== value ||
      nextProps.options !== options ||
      nextProps.inputValue !== inputValue
    ) {
      const selectValue = cleanValue(nextProps.value);
      const menuOptions = this.buildMenuOptions(
        nextProps.options,
        selectValue,
        nextProps.inputValue
      );
      const focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      this.setState({ menuOptions, selectValue, focusedOption });
    }
    // some updates should toggle the state of the input visibility
    if (this.inputIsHiddenAfterUpdate != null) {
      this.setState({
        inputIsHidden: this.inputIsHiddenAfterUpdate,
      });
      delete this.inputIsHiddenAfterUpdate;
    }
    // manage touch listeners
    if (nextProps.menuIsOpen && !this.props.menuIsOpen) {
      this.startListeningToTouch();
    } else if (!nextProps.menuIsOpen && this.props.menuIsOpen) {
      this.stopListeningToTouch();
    }
  }
  componentDidUpdate(prevProps: Props) {
    const { isDisabled } = this.props;
    const { isFocused } = this.state;
    // ensure focus is restored correctly when the control becomes enabled
    if (isFocused && !isDisabled && prevProps.isDisabled) {
      this.focus();
    }
    // scroll the focused option into view if necessary
    if (
      this.menuRef &&
      this.focusedOptionRef &&
      this.scrollToFocusedOptionOnUpdate
    ) {
      scrollIntoView(this.menuRef, this.focusedOptionRef);
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

    return options.reduce(
      (acc, item, itemIndex) => {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!this.hasGroups) this.hasGroups = true;

          const { options: items } = item;
          const children = items
            .map((child, i) => {
              const option = toOption(child, `${itemIndex}-${i}`);
              if (option && !option.isDisabled) acc.focusable.push(child);
              return option;
            })
            .filter(Boolean);
          if (children.length) {
            const groupId = `${this.getElementId('group')}-${itemIndex}`;
            acc.render.push({
              type: 'group',
              key: groupId,
              data: item,
              options: children,
            });
          }
        } else {
          const option = toOption(item, itemIndex);
          if (option) {
            acc.render.push(option);
            if (!option.isDisabled) acc.focusable.push(item);
          }
        }
        return acc;
      },
      { render: [], focusable: [] }
    );
  }
  filterOption(option: {}, inputValue: string) {
    return this.props.filterOption
      ? this.props.filterOption(option, inputValue)
      : true;
  }
  formatOptionLabel(data: OptionType, context: FormatOptionLabelContext): Node {
    if (typeof this.props.formatOptionLabel === 'function') {
      const { inputValue } = this.props;
      const { selectValue } = this.state;
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
    const { isClearable, isMulti } = this.props;

    // single select, by default, IS NOT clearable
    // multi select, by default, IS clearable
    if (isClearable === undefined) return isMulti;

    return isClearable;
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
  onMenuOpen() {
    this.props.onMenuOpen();
  }
  onMenuClose() {
    this.props.onMenuClose();
  }
  onInputChange(newValue: string) {
    this.props.onInputChange(newValue);
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
    this.inputIsHiddenAfterUpdate = false;
    this.onMenuOpen();
    this.setState({
      focusedOption: menuOptions.focusable[openAtIndex],
    });
  }
  focusOption(direction: FocusDirection = 'first') {
    const { pageSize } = this.props;
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
      nextFocus = focusedIndex - pageSize;
      if (nextFocus < 0) nextFocus = 0;
    } else if (direction === 'pagedown') {
      nextFocus = focusedIndex + pageSize;
      if (nextFocus > options.length - 1) nextFocus = options.length - 1;
    } else if (direction === 'last') {
      nextFocus = options.length - 1;
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
    this.onInputChange('');
    if (closeMenuOnSelect) {
      this.inputIsHiddenAfterUpdate = !isMulti;
      this.onMenuClose();
    }
    onChange(newValue, { action });
  };
  selectOption = (newValue: OptionType) => {
    const { blurInputOnSelect, isMulti } = this.props;

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

    if (blurInputOnSelect) {
      this.blurInput();
    }
  };
  removeValue = (removedValue: OptionType) => {
    const { onChange } = this.props;
    const { selectValue } = this.state;
    onChange(selectValue.filter(i => i !== removedValue), {
      action: 'remove-value',
    });
    this.focus();
  };
  clearValue = () => {
    const { isMulti, onChange } = this.props;
    onChange(isMulti ? [] : null, { action: 'clear' });
  };
  popValue = () => {
    const { onChange } = this.props;
    const { selectValue } = this.state;
    onChange(selectValue.slice(0, selectValue.length - 1), {
      action: 'pop-value',
    });
  };
  onControlRef = (ref: ElementRef<*>) => {
    this.controlRef = ref;
  };
  onControlMouseDown = (event: MouseOrTouchEvent) => {
    if (!this.state.isFocused) {
      this.openAfterFocus = true;
      this.focus();
    } else if (!this.state.menuIsOpen) {
      this.openMenu('first');
    } else {
      this.onMenuClose();
    }
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };
  onControlTouchStart = () => {
    this.controlIsDragging = false;
  };
  onControlTouchMove = () => {
    this.controlIsDragging = true;
  };
  onControlTouchEnd = (event: SyntheticTouchEvent<HTMLElement>) => {
    if (this.controlIsDragging) return; // Bail if the user is scrolling

    this.onControlMouseDown(event);
  };
  onClearIndicatorTouchEnd = (event: SyntheticTouchEvent<HTMLElement>) => {
    if (this.controlIsDragging) return; // Bail if the user is scrolling

    this.onClearIndicatorMouseDown(event);
  };
  onTouchStart = (event: TouchEvent) => {
    // close the menu if the user presses outside
    if (
      this.controlRef &&
      !this.controlRef.contains(event.target) &&
      this.menuRef &&
      !this.menuRef.contains(event.target)
    ) {
      this.blurInput();
    }
  };
  startListeningToTouch() {
    if (document && document.addEventListener) {
      document.addEventListener('touchstart', this.onTouchStart, false);
    }
  }
  stopListeningToTouch() {
    if (document && document.removeEventListener) {
      document.removeEventListener('touchstart', this.onTouchStart, false);
    }
  }
  onKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const {
      backspaceRemovesValue,
      escapeClearsValue,
      inputValue,
      isClearable,
      isDisabled,
      menuIsOpen,
      onKeyDown,
      tabSelectsValue,
    } = this.props;
    const { focusedOption } = this.state;

    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    // Block option hover events when the user has just pressed a key
    this.blockOptionHover = true;

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
          this.focusOption('first');
        }
        break;
      case 27: // escape
        if (menuIsOpen) {
          this.inputIsHiddenAfterUpdate = false;
          this.onInputChange('');
          this.onMenuClose();
        } else if (isClearable && escapeClearsValue) {
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
          this.focusOption('up');
        } else {
          this.openMenu('last');
        }
        break;
      case 40: // down
        if (menuIsOpen) {
          this.focusOption('down');
        } else {
          this.openMenu('first');
        }
        break;
      case 33: // page up
        if (!menuIsOpen) return;
        this.focusOption('pageup');
        break;
      case 34: // page down
        if (!menuIsOpen) return;
        this.focusOption('pagedown');
        break;
      case 36: // home key
        if (!menuIsOpen) return;
        this.focusOption('first');
        break;
      case 35: // end key
        if (!menuIsOpen) return;
        this.focusOption('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  // TODO: Review whether this is necessary
  onInputRef = (input: ElRef) => {
    this.input = input;

    // cache the input height to use when the select is disabled
    if (input) {
      this.inputHeight = input.clientHeight;
    }
  };
  handleInputChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    this.inputIsHiddenAfterUpdate = false;
    this.onInputChange(inputValue);
    this.onMenuOpen();
  };
  onInputFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.inputIsHiddenAfterUpdate = false;
    this.setState({
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
    this.onInputChange('');
    this.onMenuClose();
    this.setState({
      isFocused: false,
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
    const { isMulti, menuIsOpen } = this.props;
    if (!this.focused) {
      this.focus();
    }
    if (menuIsOpen) {
      this.inputIsHiddenAfterUpdate = !isMulti;
      this.onMenuClose();
    } else {
      this.openMenu();
    }
    event.preventDefault();
    event.stopPropagation();
  };
  onClearIndicatorMouseDown = (event: MouseOrTouchEvent) => {
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
    const { menuIsOpen } = this.props;
    const { focusedOption } = this.state;
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
    const {
      isDisabled,
      isLoading,
      isSearchable,
      inputValue,
      menuIsOpen,
    } = this.props;
    const { Input } = this.components;
    const { inputIsHidden } = this.state;

    if (!isSearchable) {
      // use a dummy input to maintain focus/blur functionality
      return (
        <DummyInput
          readOnly
          onBlur={this.onInputBlur}
          onChange={noop}
          onFocus={this.onInputFocus}
          innerRef={this.onInputRef}
          value=""
        />
      );
    } else if (isDisabled) {
      // maintain baseline alignment when the input is removed for disabled state
      return <div style={{ height: this.inputHeight }} />;
    }

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
        onChange={this.handleInputChange}
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
    const { isDisabled, isMulti, inputValue, placeholder } = this.props;
    const { selectValue } = this.state;

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
      onTouchEnd: this.onClearIndicatorTouchEnd,
      onTouchMove: this.onControlTouchMove,
      onTouchStart: this.onControlTouchStart,
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
    const { DropdownIndicator, IndicatorSeparator } = this.components;
    if (!DropdownIndicator || !IndicatorSeparator) return null;
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
    const { focusedOption, menuOptions } = this.state;
    const {
      captureMenuScroll,
      inputValue,
      isLoading,
      isMulti,
      loadingMessage,
      maxMenuHeight,
      menuIsOpen,
      menuPlacement,
      menuShouldFlip,
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
        menuPlacement={menuPlacement}
        menuShouldFlip={menuShouldFlip}
      >
        <ScrollCaptor isEnabled={captureMenuScroll}>
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
        </ScrollCaptor>
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
            innerRef: this.onControlRef,
            onMouseDown: this.onControlMouseDown,
            onTouchEnd: this.onControlTouchEnd,
            onTouchMove: this.onControlTouchMove,
            onTouchStart: this.onControlTouchStart,
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
