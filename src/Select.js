// @flow
// @jsx glam
import React, { Component, type ElementRef } from 'react';
import glam from 'glam';

import { defaultComponents, type SelectComponents } from './components/index';
import { AriaStatus } from './components/Aria';
import { defaultFormatters, type Formatters } from './formatters';

import type {
  ActionMeta,
  FocusDirection,
  OptionType,
  OptionsType,
  ValueType,
} from './types';

/*
// TODO: make sure these are implemented comprehensively
type Customisations = {
	formatters: {
		optionLabel: OptionType => Node,
		valueLabel: OptionType => Node,
		formData: ValueType => string | Array<string>,
	},
	logic: {
		filterOptions: OptionsType => OptionsType,
		isSelected: OptionType => boolean,
		isDisabled: OptionType => boolean,
	},
};
*/

type Props = {
  backspaceRemovesValue: boolean,
  closeMenuOnSelect: boolean,
  components: SelectComponents,
  deleteRemovesValue: boolean,
  disabledKey: string,
  escapeClearsValue: boolean,
  formatters: Formatters,
  hideSelectedOptions: boolean,
  instanceId?: number | string,
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isMulti: boolean,
  label: string,
  maxMenuHeight: number,
  maxValueHeight: number,
  onChange: (ValueType, ActionMeta) => void,
  onKeyDown: (SyntheticKeyboardEvent<HTMLElement>) => void,
  options: OptionsType,
  placeholder?: string,
  tabSelectsValue: boolean,
  value: ValueType,
};

const defaultProps = {
  backspaceRemovesValue: true,
  closeMenuOnSelect: true,
  deleteRemovesValue: true,
  disabledKey: 'disabled',
  escapeClearsValue: false,
  hideSelectedOptions: true,
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  maxMenuHeight: 300,
  maxValueHeight: 100,
  options: [],
  placeholder: 'Select...',
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

const inputStyle = {
  background: 'transparent',
  border: 0,
  fontSize: 'inherit',
  outline: 0,
};

const filterOption = (optionLabel: string, inputValue: string) => {
  return optionLabel.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
};

const cleanValue = (value: ValueType): OptionsType => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'object' && value !== null) return [value];
  return [];
};

const toKey = (str: string): string => {
  return str.replace(/\W/g, '-');
};

// TODO @jedwatson `findIndex` not used. Safe to remove?
// const findIndex = (arr: Array<*>, match: any): number => {
// 	let index = 0;
// 	while (index < arr.length) {
// 		if (arr[index] === match) return index;
// 	}
// 	return -1;
// };

const scrollIntoView = (menuEl: HTMLElement, focusedEl: HTMLElement): void => {
  // TODO: Is there a way to overscroll to group headings?
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTop = Math.min(
      focusedEl.offsetTop +
        focusedEl.clientHeight -
        menuEl.offsetHeight +
        overScroll,
      menuEl.scrollHeight
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
  }
};

// TODO: turn this into a prop or measure it when there's a menu ref
const PAGE_SIZE = 5;

export default class Select extends Component<Props, State> {
  static defaultProps = defaultProps;
  components: SelectComponents;
  controlRef: ElRef;
  focusedOptionRef: ?HTMLElement;
  formatters: Formatters;
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
    this.formatters = defaultFormatters(props);
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
  componentDidUpdate() {
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
    const render = [];
    const focusable = [];

    const toOption = (option, i) => {
      const isDisabled = this.isDisabled(option);
      const isSelected = this.isSelected(option, selectValue);

      if (isMulti && hideSelectedOptions && isSelected) return;
      if (!filterOption(this.getOptionLabel(option), inputValue)) return;
      if (!isDisabled) {
        focusable.push(option);
      }

      return {
        type: 'option',
        label: this.getOptionLabel(option),
        key: `${i}-${this.getOptionValue(option)}`,
        isDisabled,
        isSelected,
        onMouseOver: isDisabled ? undefined : () => this.onOptionHover(option),
        onClick: isDisabled ? undefined : () => this.selectValue(option),
        data: option,
      };
    };

    options.forEach((item, itemIndex) => {
      if (item.options) {
        // TODO needs a tidier implementation
        if (!this.hasGroups) this.hasGroups = true;

        const { options: items } = item;
        const children = items.map(toOption).filter(Boolean);
        if (children.length) {
          const itemLabel = this.getOptionLabel(item);
          render.push({
            type: 'group',
            key: `${itemIndex}-${toKey(itemLabel)}`,
            label: itemLabel,
            children,
          });
        }
      } else {
        const option = toOption(item, itemIndex);
        if (option) render.push(option);
      }
    });
    return { render, focusable };
  }
  buildStateForInputValue(inputValue: string = '') {
    const { options } = this.props;
    const { selectValue } = this.state;
    const menuOptions = this.buildMenuOptions(options, selectValue, inputValue);
    const focusedOption = this.getNextFocusedOption(menuOptions.focusable);
    return { inputValue, menuOptions, focusedOption };
  }
  hasValue() {
    const { selectValue } = this.state;
    return selectValue.length > 0;
  }
  hasOptions(options?: { length: boolean }) {
    const length = options && options.length;
    const count = this.state.menuOptions.render.length;
    return length ? count : Boolean(count);
  }
  isDisabled = (option: OptionType): boolean => {
    const { disabledKey } = this.props;
    if (option[disabledKey]) return true;
    return false;
  };
  isSelected = (option: OptionType, selectValue: OptionsType): boolean => {
    if (selectValue.indexOf(option) > -1) return true;
    return selectValue.some(
      i => this.getOptionValue(i) === this.getOptionValue(option)
    );
  };
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
      menuIsOpen: true,
      focusedOption: menuOptions.focusable[openAtIndex],
      inputIsHidden: false,
    });
  }
  focusOption(direction: FocusDirection = 'first') {
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
    this.scrollToFocusedOptionOnUpdate = true;
    this.setState({
      focusedOption: options[nextFocus],
    });
  }
  selectValue = (newValue: OptionType) => {
    const { closeMenuOnSelect, isMulti, onChange } = this.props;
    // We update the state here because we should clear inputValue when an
    // option is selected; the onChange event fires when that's reconciled
    // otherwise the new menu items will be filtered with the old inputValue
    this.setState(
      closeMenuOnSelect
        ? {
            menuIsOpen: false,
            inputIsHidden: isMulti ? false : true,
            ...this.buildStateForInputValue(),
          }
        : this.buildStateForInputValue(),
      () => {
        if (onChange) {
          if (isMulti) {
            const { selectValue } = this.state;
            if (this.isSelected(newValue, selectValue)) {
              onChange(selectValue.filter(i => i !== newValue), {
                action: 'deselect-value',
              });
            } else {
              onChange([...selectValue, newValue], {
                action: 'select-option',
              });
            }
          } else {
            onChange(newValue, { action: 'select-option' });
          }
        }
      }
    );
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
  onControlRef = (ref: ElRef) => {
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
      isClearable,
      deleteRemovesValue,
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
      case 46: // delete
        if (inputValue || !deleteRemovesValue) return;
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
        this.selectValue(focusedOption);
        return;
      case 13: // enter
        if (menuIsOpen) {
          if (!focusedOption) return;
          this.selectValue(focusedOption);
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
        this.selectValue(focusedOption);
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
  onInputRef = (input: ElRef) => {
    this.input = input;

    // cache the input height to use when the select is disabled
    if (input && !this.inputHeight) {
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
    this.setState({
      isFocused: false,
      menuIsOpen: false,
      ...this.buildStateForInputValue(''),
    });
  };
  onMenuRef = (ref: ?HTMLElement) => {
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
  onFocusedOptionRef = (ref: ?HTMLElement) => {
    this.focusedOptionRef = ref;
  };
  onOptionHover = (data: OptionType) => {
    this.setState({
      focusedOption: data,
    });
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
  getElementId = (element: 'input' | 'label' | 'listbox' | 'option') => {
    return `${this.instancePrefix}-${element}`;
  };
  getActiveDescendentId = () => {
    const { focusedOption, menuIsOpen } = this.state;
    return menuIsOpen && focusedOption
      ? `${this.getElementId('option')}-${this.getOptionValue(focusedOption)}`
      : undefined;
  };
  renderInput(id: string) {
    const { isDisabled } = this.props;
    const { Input } = this.components;
    const { inputIsHidden, inputValue, menuIsOpen } = this.state;

    // maintain baseline alignment when the input is removed
    if (isDisabled) return <div style={{ height: this.inputHeight }} />;

    // aria properties makes the JSX "noisy", separated for clarity
    const ariaAttributes = {
      'aria-activedescendant': this.getActiveDescendentId(),
      'aria-autocomplete': 'list',
      'aria-expanded': menuIsOpen,
      'aria-haspopup': menuIsOpen,
      'aria-owns': menuIsOpen ? this.getElementId('listbox') : undefined,
      role: 'combobox',
    };

    return (
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        id={id}
        innerRef={this.onInputRef}
        inputStyle={{ ...inputStyle, opacity: inputIsHidden ? 0 : 1 }}
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
  getOptionLabel(data: OptionType) {
    return this.formatters.optionLabel(data);
  }
  getOptionValue(data: OptionType) {
    return this.formatters.optionValue(data);
  }
  getValueLabel(data: OptionType) {
    return this.formatters.valueLabel(data);
  }
  renderPlaceholderOrValue() {
    const { MultiValue, SingleValue, Placeholder } = this.components;
    const { isDisabled, isMulti, placeholder } = this.props;
    const { inputValue, selectValue } = this.state;

    if (!this.hasValue()) {
      return inputValue ? null : (
        <Placeholder
          key="placeholder"
          isDisabled={isDisabled}
          isMulti={isMulti}
        >
          {placeholder}
        </Placeholder>
      );
    }
    if (isMulti) {
      return selectValue.map(opt => (
        <MultiValue
          isDisabled={isDisabled}
          label={this.getValueLabel(opt)}
          key={this.getOptionValue(opt)}
          onRemove={this.removeValue}
          data={opt}
        />
      ));
    }
    if (inputValue) return null;
    const singleValue = selectValue[0];
    return (
      <SingleValue
        children={this.getValueLabel(singleValue)}
        data={singleValue}
        isDisabled={isDisabled}
      />
    );
  }
  renderClearIndicator() {
    const { ClearIndicator } = this.components;
    const { isClearable, isDisabled, isLoading } = this.props;
    const { isFocused } = this.state;

    if (
      !isClearable ||
      !ClearIndicator ||
      isDisabled ||
      !this.hasValue() ||
      isLoading
    ) {
      return null;
    }

    return (
      <ClearIndicator
        isFocused={isFocused}
        onMouseDown={this.onClearIndicatorMouseDown}
        role="button"
      />
    );
  }
  renderLoadingIndicator() {
    const { LoadingIndicator } = this.components;
    const { isLoading } = this.props;

    if (!LoadingIndicator || !isLoading) return null;

    return <LoadingIndicator />;
  }
  renderDropdownIndicator() {
    const { DropdownIndicator } = this.components;
    if (!DropdownIndicator) return null;
    const { isFocused } = this.state;

    return (
      <DropdownIndicator
        isFocused={isFocused}
        onMouseDown={this.onDropdownIndicatorMouseDown}
        role="button"
      />
    );
  }

  renderMenu() {
    const { Group, Menu, MenuList, Option, NoOptions } = this.components;
    const { focusedOption, menuIsOpen, menuOptions } = this.state;
    const { isMulti, maxMenuHeight } = this.props;

    if (!menuIsOpen) return null;

    // TODO: Internal Option Type here
    const render = (option: OptionType) => {
      const id = `${this.getElementId('option')}-${this.getOptionValue(
        option.data
      )}`;
      const isFocused = focusedOption === option.data;
      return (
        <Option
          {...option}
          aria-selected={option.isSelected}
          id={id}
          innerRef={isFocused ? this.onFocusedOptionRef : undefined}
          isFocused={isFocused}
          role={option.withinGroup ? 'treeitem' : 'option'}
          tabIndex="-1"
        >
          {option.label}
        </Option>
      );
    };

    let menuUI;

    if (this.hasOptions()) {
      menuUI = menuOptions.render.map(item => {
        if (item.type === 'group') {
          const { children, type, ...group } = item;
          return (
            <Group
              aria-label={group.label} // TODO @jedwatson need to define groupLabelKey
              aria-expanded="true"
              role="group"
              {...group}
            >
              {item.children.map(option => render(option))}
            </Group>
          );
        } else if (item.type === 'option') {
          return render(item);
        }
      });
    } else {
      menuUI = <NoOptions>No options...</NoOptions>;
    }

    return (
      <Menu onMouseDown={this.onMenuMouseDown}>
        <MenuList
          aria-labelledby={this.getElementId('label')}
          aria-multiselectable={isMulti}
          id={this.getElementId('listbox')}
          innerRef={this.onMenuRef}
          isMulti={isMulti}
          maxHeight={maxMenuHeight}
          role={this.hasGroups ? 'tree' : 'listbox'}
          tabIndex="-1"
        >
          {menuUI}
        </MenuList>
      </Menu>
    );
  }
  render() {
    const {
      Control,
      IndicatorsContainer,
      Label,
      SelectContainer,
      ValueContainer,
    } = this.components;

    const { isDisabled, isMulti, label, maxValueHeight } = this.props;
    const { isFocused } = this.state;
    const inputId = this.getElementId('input');
    const labelId = this.getElementId('label');

    // TODO
    // - return React.Fragment when v16
    // - add `aria-busy` to SelectContainer when loading async
    return (
      <div>
        {label ? (
          <Label htmlFor={inputId} id={labelId}>
            {label}
          </Label>
        ) : null}
        <SelectContainer isDisabled={isDisabled} onKeyDown={this.onKeyDown}>
          <AriaStatus aria-atomic="true" aria-live="polite" role="status">
            {this.hasOptions({ length: true })} results are available.
          </AriaStatus>
          <Control
            isDisabled={isDisabled}
            isFocused={isFocused}
            onMouseDown={this.onControlMouseDown}
            innerRef={this.onControlRef}
          >
            <ValueContainer
              isMulti={isMulti}
              hasValue={this.hasValue()}
              maxHeight={maxValueHeight}
            >
              {this.renderPlaceholderOrValue()}
              {this.renderInput(inputId)}
            </ValueContainer>
            <IndicatorsContainer>
              {this.renderClearIndicator()}
              {this.renderLoadingIndicator()}
              {this.renderDropdownIndicator()}
            </IndicatorsContainer>
          </Control>
          {this.renderMenu()}
        </SelectContainer>
      </div>
    );
  }
}
