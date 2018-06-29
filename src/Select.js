// @flow

import React, { Component, type ElementRef, type Node } from 'react';

import { createFilter } from './filters';
import { DummyInput, ScrollBlock, ScrollCaptor } from './internal/index';

import {
  classNames,
  cleanValue,
  isTouchCapable,
  isMobileDevice,
  noop,
  scrollIntoView,
} from './utils';

import {
  formatGroupLabel,
  getOptionLabel,
  getOptionValue,
  isOptionDisabled,
} from './builtins';

import {
  defaultComponents,
  type PlaceholderOrValue,
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
  InputActionMeta,
  KeyboardEventHandler,
  MenuPlacement,
  MenuPosition,
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
  /* className attribute applied to the outer component */
  className?: string,
  /* classNamePrefix attribute used as a base for inner component classNames */
  classNamePrefix?: string | null,
  /* Close the select menu when the user selects an option */
  closeMenuOnSelect: boolean,
  /*
    This complex object includes all the compositional components that are used
    in `react-select`. If you wish to overwrite a component, pass in an object
    with the appropriate namespace.

    If you only wish to restyle a component, we recommend using the `styles` prop
    instead. For a list of the components that can be passed in, and the shape
    that will be passed to them, see [the components docs](/api#components)
  */
  components: SelectComponentsConfig,
  /* Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
  controlShouldRenderValue: boolean,
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
  /* The id to set on the SelectContainer component. */
  id?: string,
  /* The value of the search input */
  inputValue: string,
  /* The id of the search input */
  inputId?: string,
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
  loadingMessage: ({ inputValue: string }) => (string | null),
  /* Minimum height of the menu before flipping */
  minMenuHeight: number,
  /* Maximum height of the menu before scrolling */
  maxMenuHeight: number,
  /* Whether the menu is open */
  menuIsOpen: boolean,
  /* Default placement of the menu in relation to the control. 'auto' will flip
     when there isn't enough space below the control. */
  menuPlacement: MenuPlacement,
  /* The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition: MenuPosition,
  /* Whether the menu should use a portal, and where it should attach */
  menuPortalTarget?: HTMLElement,
  /* Whether to block scroll events when the menu is open */
  menuShouldBlockScroll: boolean,
  /* Whether the menu should be scrolled into view when it opens */
  menuShouldScrollIntoView: boolean,
  /* Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string,
  /* Text to display when there are no options */
  noOptionsMessage: ({ inputValue: string }) => (string | null),
  /* Handle blur events on the control */
  onBlur?: FocusEventHandler,
  /* Handle change events on the select */
  onChange: (ValueType, ActionMeta) => void,
  /* Handle focus events on the control */
  onFocus?: FocusEventHandler,
  /* Handle change events on the input */
  onInputChange: (string, InputActionMeta) => void,
  /* Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler,
  /* Handle the menu opening */
  onMenuOpen: () => void,
  /* Handle the menu closing */
  onMenuClose: () => void,
  /* Fired when the user scrolls to the top of the menu */
  onMenuScrollToTop?: (SyntheticEvent<HTMLElement>) => void,
  /* Fired when the user scrolls to the bottom of the menu */
  onMenuScrollToBottom?: (SyntheticEvent<HTMLElement>) => void,
  /* Allows control of whether the menu is opened when the Select is focused */
  openMenuOnFocus: boolean,
  /* Allows control of whether the menu is opened when the Select is clicked */
  openMenuOnClick: boolean,
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
  /* Sets the tabIndex attribute on the input */
  tabIndex: string,
  /* Select the currently focused option when the user presses tab */
  tabSelectsValue: boolean,
  /* The value of the select; reflected by the selected option */
  value: ValueType,
};

export const defaultProps = {
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel,
  getOptionValue: getOptionValue,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: () => 'Loading...',
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: () => 'No options',
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: ({ count }: { count: number }) =>
    `${count} result${count !== 1 ? 's' : ''} available.`,
  styles: {},
  tabIndex: '0',
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
  focusedValue: OptionType | null,
  menuOptions: MenuOptions,
  selectValue: OptionsType,
};

type ElRef = ElementRef<*>;

let instanceId = 1;

export default class Select extends Component<Props, State> {
  static defaultProps = defaultProps;
  state = {
    focusedOption: null,
    focusedValue: null,
    inputIsHidden: false,
    isFocused: false,
    menuOptions: { render: [], focusable: [] },
    selectValue: [],
  };

  // Misc. Instance Properties
  // ------------------------------

  blockOptionHover: boolean = false;
  clearFocusValueOnUpdate: boolean = false;
  commonProps: any; // TODO
  components: SelectComponents;
  hasGroups: boolean = false;
  initialTouchX: number = 0;
  initialTouchY: number = 0;
  inputIsHiddenAfterUpdate: ?boolean;
  instancePrefix: string = '';
  openAfterFocus: boolean = false;
  scrollToFocusedOptionOnUpdate: boolean = false;
  userIsDragging: ?boolean;

  // Refs
  // ------------------------------

  controlRef: ElRef = null;
  getControlRef = (ref: HTMLElement) => {
    this.controlRef = ref;
  };
  focusedOptionRef: ElRef = null;
  getFocusedOptionRef = (ref: HTMLElement) => {
    this.focusedOptionRef = ref;
  };
  menuListRef: ElRef = null;
  getMenuListRef = (ref: HTMLElement) => {
    this.menuListRef = ref;
  };
  inputRef: ElRef = null;
  getInputRef = (ref: HTMLElement) => {
    this.inputRef = ref;
  };

  // Lifecycle
  // ------------------------------

  constructor(props: Props) {
    super(props);
    const { value } = props;
    this.components = defaultComponents(props);
    this.instancePrefix =
      'react-select-' + (this.props.instanceId || ++instanceId);

    const selectValue = cleanValue(value);
    const menuOptions = this.buildMenuOptions(props, selectValue);

    this.state.menuOptions = menuOptions;
    this.state.selectValue = selectValue;
  }
  componentDidMount() {
    this.startListeningToTouch();

    if (this.props.autoFocus) {
      this.focusInput();
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
      const menuOptions = this.buildMenuOptions(nextProps, selectValue);
      const focusedValue = this.getNextFocusedValue(selectValue);
      const focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      this.setState({ menuOptions, selectValue, focusedOption, focusedValue });
    }
    // some updates should toggle the state of the input visibility
    if (this.inputIsHiddenAfterUpdate != null) {
      this.setState({
        inputIsHidden: this.inputIsHiddenAfterUpdate,
      });
      delete this.inputIsHiddenAfterUpdate;
    }
  }
  componentDidUpdate(prevProps: Props) {
    const { isDisabled, menuIsOpen } = this.props;
    const { isFocused } = this.state;

    if (
      // ensure focus is restored correctly when the control becomes enabled
      (isFocused && !isDisabled && prevProps.isDisabled) ||
      // ensure focus is on the Input when the menu opens
      (isFocused && menuIsOpen && !prevProps.menuIsOpen)
    ) {
      this.focusInput();
    }

    // scroll the focused option into view if necessary
    if (
      this.menuListRef &&
      this.focusedOptionRef &&
      this.scrollToFocusedOptionOnUpdate
    ) {
      scrollIntoView(this.menuListRef, this.focusedOptionRef);
    }
    this.scrollToFocusedOptionOnUpdate = false;
  }
  componentWillUnmount() {
    this.stopListeningToTouch();
  }

  // ==============================
  // Consumer Handlers
  // ==============================

  onMenuOpen() {
    this.props.onMenuOpen();
  }
  onMenuClose() {
    this.onInputChange('', { action: 'menu-close' });
    this.props.onMenuClose();
  }
  onInputChange(newValue: string, actionMeta: InputActionMeta) {
    this.props.onInputChange(newValue, actionMeta);
  }

  // ==============================
  // Methods
  // ==============================

  focusInput() {
    if (!this.inputRef) return;
    this.inputRef.focus();
  }
  blurInput() {
    if (!this.inputRef) return;
    this.inputRef.blur();
  }

  // aliased for consumers
  focus = this.focusInput;
  blur = this.blurInput;

  openMenu(focusOption: 'first' | 'last') {
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
      focusedValue: null,
      focusedOption: menuOptions.focusable[openAtIndex],
    });
  }
  focusValue(direction: 'previous' | 'next') {
    const { isMulti } = this.props;
    const { selectValue, focusedValue } = this.state;

    // Only multiselects support value focusing
    if (!isMulti) return;

    this.setState({
      focusedOption: null,
    });

    const focusedIndex = focusedValue ? selectValue.indexOf(focusedValue) : -1;
    const lastIndex = selectValue.length - 1;
    let nextFocus = -1;
    if (!selectValue.length) return;

    switch (direction) {
      case 'previous':
        if (focusedIndex === 0) {
          // don't cycle from the start to the end
          nextFocus = 0;
        } else if (focusedIndex === -1) {
          // if nothing is focused, focus the last value first
          nextFocus = lastIndex;
        } else {
          nextFocus = focusedIndex - 1;
        }
        break;
      case 'next':
        if (focusedIndex > -1 && focusedIndex < lastIndex) {
          nextFocus = focusedIndex + 1;
        }
        break;
    }

    this.setState({
      inputIsHidden: nextFocus === -1 ? false : true,
      focusedValue: selectValue[nextFocus],
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
      focusedValue: null,
    });
  }
  setValue = (
    newValue: ValueType,
    action: ActionTypes = 'set-value',
    option?: OptionType
  ) => {
    const { closeMenuOnSelect, isMulti, onChange } = this.props;
    this.onInputChange('', { action: 'set-value' });
    if (closeMenuOnSelect) {
      this.inputIsHiddenAfterUpdate = !isMulti;
      this.onMenuClose();
    }
    // when the select value should change, we should reset focusedValue
    this.clearFocusValueOnUpdate = true;
    onChange(newValue, { action, option });
  };
  selectOption = (newValue: OptionType) => {
    const { blurInputOnSelect, isMulti } = this.props;

    if (isMulti) {
      const { selectValue } = this.state;
      if (this.isOptionSelected(newValue, selectValue)) {
        const candidate = this.getOptionValue(newValue);
        this.setValue(
          selectValue.filter(i => this.getOptionValue(i) !== candidate),
          'deselect-option',
          newValue
        );
      } else {
        this.setValue([...selectValue, newValue], 'select-option', newValue);
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
    const candidate = this.getOptionValue(removedValue);
    onChange(selectValue.filter(i => this.getOptionValue(i) !== candidate), {
      action: 'remove-value',
      removedValue,
    });
    this.focusInput();
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
      removedValue: selectValue[selectValue.length - 1],
    });
  };

  // ==============================
  // Getters
  // ==============================

  getCommonProps() {
    const { clearValue, getStyles, setValue, selectOption, props } = this;
    const { className, classNamePrefix, isMulti, isRtl, options } = props;
    const { selectValue } = this.state;
    const hasValue = this.hasValue();
    const getValue = () => selectValue;
    let cxPrefix = classNamePrefix;
    if (className && classNamePrefix === undefined) {
      console.warn(`
        Warning: the behaviour of 'className' has changed between 2.0.0-beta.2 and 2.0.0-beta.3.
        You can now use className to specify the class name of the outer container, and classNamePrefix to enable our provided BEM class names for internal elements.
        The className prop will have no effect on internal elements when 2.0.0 is released.
      `);
      cxPrefix = className;
    }

    const cx = classNames.bind(null, cxPrefix);
    return {
      cx,
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

  getNextFocusedValue(nextSelectValue: OptionsType) {
    if (this.clearFocusValueOnUpdate) {
      this.clearFocusValueOnUpdate = false;
      return null;
    }
    const { focusedValue, selectValue: lastSelectValue } = this.state;
    const lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
    if (lastFocusedIndex > -1) {
      const nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
      if (nextFocusedIndex > -1) {
        // the focused value is still in the selectValue, return it
        return focusedValue;
      } else if (lastFocusedIndex < nextSelectValue.length) {
        // the focusedValue is not present in the next selectValue array by
        // reference, so return the new value at the same index
        return nextSelectValue[lastFocusedIndex];
      }
    }
    return null;
  }

  getNextFocusedOption(options: OptionsType) {
    const { focusedOption: lastFocusedOption } = this.state;
    return lastFocusedOption && options.indexOf(lastFocusedOption) > -1
      ? lastFocusedOption
      : options[0];
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
  getElementId = (element: 'group' | 'input' | 'listbox' | 'option') => {
    return `${this.instancePrefix}-${element}`;
  };
  getActiveDescendentId = () => {
    const { menuIsOpen } = this.props;
    const { menuOptions, focusedOption } = this.state;

    if (!focusedOption || !menuIsOpen) return undefined;

    const index = menuOptions.focusable.indexOf(focusedOption);
    const option = menuOptions.render[index];

    return option && option.key;
  };

  // ==============================
  // Helpers
  // ==============================

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

  // ==============================
  // Mouse Handlers
  // ==============================

  onMenuMouseDown = (event: SyntheticMouseEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.focusInput();
  };
  onMenuMouseMove = (event: SyntheticMouseEvent<HTMLElement>) => {
    this.blockOptionHover = false;
  };
  onControlMouseDown = (event: MouseOrTouchEvent) => {
    const { openMenuOnClick } = this.props;
    if (!this.state.isFocused) {
      if (openMenuOnClick) {
        this.openAfterFocus = true;
      }
      this.focusInput();
    } else if (!this.props.menuIsOpen) {
      this.openMenu('first');
    } else {
      this.onMenuClose();
    }
    // $FlowFixMe HTMLElement type does not have tagName property
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };
  onDropdownIndicatorMouseDown = (event: MouseOrTouchEvent) => {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (this.props.isDisabled) return;
    const { isMulti, menuIsOpen } = this.props;
    this.focusInput();
    if (menuIsOpen) {
      this.inputIsHiddenAfterUpdate = !isMulti;
      this.onMenuClose();
    } else {
      this.openMenu('first');
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
    setTimeout(() => this.focusInput());
  };

  // ==============================
  // Touch Handlers
  // ==============================

  startListeningToTouch() {
    if (document && document.addEventListener) {
      document.addEventListener('touchstart', this.onTouchStart, false);
      document.addEventListener('touchmove', this.onTouchMove, false);
      document.addEventListener('touchend', this.onTouchEnd, false);
    }
  }
  stopListeningToTouch() {
    if (document && document.removeEventListener) {
      document.removeEventListener('touchstart', this.onTouchStart);
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    }
  }
  onTouchStart = ({ touches: [touch] }: TouchEvent) => {
    this.initialTouchX = touch.clientX;
    this.initialTouchY = touch.clientY;
    this.userIsDragging = false;
  };
  onTouchMove = ({ touches: [touch] }: TouchEvent) => {
    const deltaX = Math.abs(touch.clientX - this.initialTouchX);
    const deltaY = Math.abs(touch.clientY - this.initialTouchY);
    const moveThreshold = 5;

    this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
  };
  onTouchEnd = (event: TouchEvent) => {
    if (this.userIsDragging) return;

    // type cast the EventTarget
    const target = ((event.target: any): HTMLElement);

    // close the menu if the user taps outside
    if (
      this.controlRef &&
      !this.controlRef.contains(target) &&
      this.menuListRef &&
      !this.menuListRef.contains(target)
    ) {
      this.blurInput();
    }

    // reset move vars
    this.initialTouchX = 0;
    this.initialTouchY = 0;
  };
  onControlTouchEnd = (event: SyntheticTouchEvent<HTMLElement>) => {
    if (this.userIsDragging) return;

    this.onControlMouseDown(event);
  };
  onClearIndicatorTouchEnd = (event: SyntheticTouchEvent<HTMLElement>) => {
    if (this.userIsDragging) return;

    this.onClearIndicatorMouseDown(event);
  };
  onDropdownIndicatorTouchEnd = (event: SyntheticTouchEvent<HTMLElement>) => {
    if (this.userIsDragging) return;

    this.onDropdownIndicatorMouseDown(event);
  };

  // ==============================
  // Focus Handlers
  // ==============================

  handleInputChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    this.inputIsHiddenAfterUpdate = false;
    this.onInputChange(inputValue, { action: 'input-change' });
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
    if (this.openAfterFocus || this.props.openMenuOnFocus) {
      this.openMenu('first');
    }
    this.openAfterFocus = false;
  };
  onInputBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.onInputChange('', { action: 'input-blur' });
    this.onMenuClose();
    this.setState({
      focusedValue: null,
      isFocused: false,
    });
  };
  onOptionHover = (focusedOption: OptionType) => {
    if (this.blockOptionHover || this.state.focusedOption === focusedOption) {
      return;
    }
    this.setState({ focusedOption });
  };
  shouldHideSelectedOptions = () => {
    const { hideSelectedOptions, isMulti } = this.props;
    if (hideSelectedOptions === undefined) return isMulti;
    return hideSelectedOptions;
  };

  // ==============================
  // Keyboard Handlers
  // ==============================

  onKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const {
      isMulti,
      backspaceRemovesValue,
      escapeClearsValue,
      inputValue,
      isClearable,
      isDisabled,
      menuIsOpen,
      onKeyDown,
      tabSelectsValue,
      openMenuOnFocus,
    } = this.props;
    const { focusedOption, focusedValue, selectValue } = this.state;

    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    // Block option hover events when the user has just pressed a key
    this.blockOptionHover = true;
    switch (event.key) {
      case 'ArrowLeft':
        if (!isMulti || inputValue) return;
        this.focusValue('previous');
        break;
      case 'ArrowRight':
        if (!isMulti || inputValue) return;
        this.focusValue('next');
        break;
      case 'Backspace':
        if (inputValue) return;
        if (focusedValue) {
          this.removeValue(focusedValue);
        } else {
          if (!backspaceRemovesValue) return;
          this.popValue();
        }
        break;
      case 'Tab':
        if (
          event.shiftKey ||
          !menuIsOpen ||
          !tabSelectsValue ||
          !focusedOption ||
          // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          (openMenuOnFocus && this.isOptionSelected(focusedOption, selectValue))
        ) {
          return;
        }
        this.selectOption(focusedOption);
        break;
      case 'Enter':
        if (menuIsOpen) {
          if (!focusedOption) return;
          this.selectOption(focusedOption);
        } else {
          this.focusOption('first');
        }
        break;
      case 'Escape':
        if (menuIsOpen) {
          this.inputIsHiddenAfterUpdate = false;
          this.onInputChange('', { action: 'menu-close' });
          this.onMenuClose();
        } else if (isClearable && escapeClearsValue) {
          this.clearValue();
        }
        break;
      case ' ': // space
        if (inputValue) {
          return;
        }
        if (!menuIsOpen) {
          this.openMenu('first');
          break;
        }
        if (!focusedOption) return;
        this.selectOption(focusedOption);
        break;
      case 'ArrowUp':
        if (menuIsOpen) {
          this.focusOption('up');
        } else {
          this.openMenu('last');
        }
        break;
      case 'ArrowDown':
        if (menuIsOpen) {
          this.focusOption('down');
        } else {
          this.openMenu('first');
        }
        break;
      case 'PageUp':
        if (!menuIsOpen) return;
        this.focusOption('pageup');
        break;
      case 'PageDown':
        if (!menuIsOpen) return;
        this.focusOption('pagedown');
        break;
      case 'Home':
        if (!menuIsOpen) return;
        this.focusOption('first');
        break;
      case 'End':
        if (!menuIsOpen) return;
        this.focusOption('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  // ==============================
  // Menu Options
  // ==============================

  buildMenuOptions(props: Props, selectValue: OptionsType): MenuOptions {
    const { inputValue = '', options } = props;

    const toOption = (option, id) => {
      const isDisabled = this.isOptionDisabled(option);
      const isSelected = this.isOptionSelected(option, selectValue);
      const label = this.getOptionLabel(option);
      const value = this.getOptionValue(option);

      if (
        (this.shouldHideSelectedOptions() && isSelected) ||
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
          const option = toOption(item, `${itemIndex}`);
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

  // ==============================
  // Renderers
  // ==============================

  renderScreenReaderStatus() {
    const { screenReaderStatus } = this.props;
    return (
      <A11yText aria-atomic="true" aria-live="polite" role="status">
        {screenReaderStatus({ count: this.countOptions() })}
      </A11yText>
    );
  }
  renderInput() {
    const {
      isDisabled,
      isLoading,
      isSearchable,
      inputId,
      inputValue,
      menuIsOpen,
      tabIndex,
    } = this.props;
    const { Input } = this.components;
    const { inputIsHidden } = this.state;

    const id = inputId || this.getElementId('input');

    if (!isSearchable) {
      // use a dummy input to maintain focus/blur functionality
      return (
        <DummyInput
          id={id}
          innerRef={this.getInputRef}
          onBlur={this.onInputBlur}
          onChange={noop}
          onFocus={this.onInputFocus}
          readOnly
          tabIndex={tabIndex}
          value=""
        />
      );
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

    const { cx } = this.commonProps;

    return (
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        cx={cx}
        getStyles={this.getStyles}
        id={id}
        innerRef={this.getInputRef}
        isDisabled={isDisabled}
        isHidden={inputIsHidden}
        onBlur={this.onInputBlur}
        onChange={this.handleInputChange}
        onFocus={this.onInputFocus}
        spellCheck="false"
        tabIndex={tabIndex}
        type="text"
        value={inputValue}
        {...ariaAttributes}
      />
    );
  }
  renderPlaceholderOrValue(): ?PlaceholderOrValue {
    const {
      MultiValue,
      MultiValueContainer,
      MultiValueLabel,
      MultiValueRemove,
      SingleValue,
      Placeholder,
    } = this.components;
    const { commonProps } = this;
    const {
      controlShouldRenderValue,
      isDisabled,
      isMulti,
      inputValue,
      placeholder,
    } = this.props;
    const { selectValue, focusedValue } = this.state;

    if (!this.hasValue() || !controlShouldRenderValue) {
      return inputValue ? null : (
        <Placeholder {...commonProps} key="placeholder" isDisabled={isDisabled}>
          {placeholder}
        </Placeholder>
      );
    }

    if (isMulti) {
      const selectValues: Array<any> = selectValue.map(opt => {
        let isFocused = opt === focusedValue;
        return (
          <MultiValue
            {...commonProps}
            components={{
              Container: MultiValueContainer,
              Label: MultiValueLabel,
              Remove: MultiValueRemove,
            }}
            isFocused={isFocused}
            isDisabled={isDisabled}
            key={this.getOptionValue(opt)}
            removeProps={{
              onClick: () => this.removeValue(opt),
              onTouchEnd: () => this.removeValue(opt),
              onMouseDown: e => {
                e.preventDefault();
                e.stopPropagation();
              },
            }}
            data={opt}
          >
            {this.formatOptionLabel(opt, 'value')}
          </MultiValue>
        );
      });
      return selectValues;
    }

    if (inputValue) {
      return null;
    }

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

    // separator doesn't make sense without the dropdown indicator
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
      onTouchEnd: this.onDropdownIndicatorTouchEnd,
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
      MenuPortal,
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
      minMenuHeight,
      maxMenuHeight,
      menuIsOpen,
      menuPlacement,
      menuPosition,
      menuPortalTarget,
      menuShouldBlockScroll,
      menuShouldScrollIntoView,
      noOptionsMessage,
      onMenuScrollToTop,
      onMenuScrollToBottom,
    } = this.props;

    if (!menuIsOpen) return null;

    // TODO: Internal Option Type here
    const render = (props: OptionType) => {
      // for performance, the menu options in state aren't changed when the
      // focused option changes so we calculate additional props based on that
      const isFocused = focusedOption === props.data;
      props.innerProps.innerRef = isFocused
        ? this.getFocusedOptionRef
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
      const message = loadingMessage({ inputValue });
      if (message === null) return null;
      menuUI = (
        <LoadingMessage {...commonProps}>
          {message}
        </LoadingMessage>
      );
    } else {
      const message = noOptionsMessage({ inputValue });
      if (message === null) return null;
      menuUI = (
        <NoOptionsMessage {...commonProps}>
          {message}
        </NoOptionsMessage>
      );
    }

    const menuElement = (
      <div>
        <Menu
          {...commonProps}
          innerProps={{
            onMouseDown: this.onMenuMouseDown,
            onMouseMove: this.onMenuMouseMove,
          }}
          isLoading={isLoading}
          minMenuHeight={minMenuHeight}
          maxMenuHeight={maxMenuHeight}
          menuPlacement={menuPlacement}
          menuPosition={menuPosition}
          menuShouldScrollIntoView={menuShouldScrollIntoView}
        >
          <ScrollCaptor
            isEnabled={captureMenuScroll}
            onTopArrive={onMenuScrollToTop}
            onBottomArrive={onMenuScrollToBottom}
          >
            <ScrollBlock isEnabled={menuShouldBlockScroll}>
              <MenuList
                {...commonProps}
                innerProps={{
                  'aria-multiselectable': isMulti,
                  id: this.getElementId('listbox'),
                  innerRef: this.getMenuListRef,
                  role: 'listbox',
                }}
                isLoading={isLoading}
                maxHeight={maxMenuHeight}
              >
                {menuUI}
              </MenuList>
            </ScrollBlock>
          </ScrollCaptor>
        </Menu>
      </div>
    );

    // positioning behaviour is almost identical for portalled and fixed,
    // so we use the same component. the actual portalling logic is forked
    // within the component based on `menuPosition`
    return menuPortalTarget || menuPosition === 'fixed' ? (
      <MenuPortal
        {...commonProps}
        appendTo={menuPortalTarget}
        controlElement={this.controlRef}
        menuPlacement={menuPlacement}
        menuPosition={menuPosition}
      >
        {menuElement}
      </MenuPortal>
    ) : (
      menuElement
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

  render() {
    const {
      Control,
      IndicatorsContainer,
      SelectContainer,
      ValueContainer,
    } = this.components;

    const { className, id, isDisabled } = this.props;
    const { isFocused } = this.state;

    const commonProps = (this.commonProps = this.getCommonProps());

    return (
      <SelectContainer
        {...commonProps}
        className={className}
        innerProps={{
          id: id,
          onKeyDown: this.onKeyDown,
        }}
        isDisabled={isDisabled}
        isFocused={isFocused}
      >
        {this.renderScreenReaderStatus()}
        <Control
          {...commonProps}
          innerProps={{
            innerRef: this.getControlRef,
            onMouseDown: this.onControlMouseDown,
            onTouchEnd: this.onControlTouchEnd,
          }}
          isDisabled={isDisabled}
          isFocused={isFocused}
        >
          <ValueContainer {...commonProps} isDisabled={isDisabled}>
            {this.renderPlaceholderOrValue()}
            {this.renderInput()}
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
