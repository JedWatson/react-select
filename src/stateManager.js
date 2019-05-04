// @flow

import React, {
  Component,
  type ElementRef,
  type AbstractComponent,
  type Config,
} from 'react';

import { type Props, defaultProps as SelectDefaultProps } from './Select';
import type { ActionMeta, InputActionMeta, ValueType } from './types';

export type SelectProps = Config<Props, typeof SelectDefaultProps>;

type State = {
  inputValue: string,
  menuIsOpen: boolean,
  value: ValueType,
};

type StateProps = {
  onMenuOpen: () => void,
  onMenuClose: () => void,
  onInputChange: (string, InputActionMeta) => void,
  onChange: (ValueType, ActionMeta) => void,
  inputValue: string,
  menuIsOpen: boolean,
  value: ValueType,
};

type OwnProps = {
  defaultInputValue: string,
  defaultMenuIsOpen: boolean,
  defaultValue: ValueType,
};

export const defaultProps = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null,
};

const manageState = <C: {}>(
  SelectComponent: AbstractComponent<C>
): AbstractComponent<
  Config<SelectProps & C, StateProps> & Config<OwnProps, typeof defaultProps>
> =>
  class StateManager extends Component<
    Config<SelectProps, StateProps> & C & OwnProps,
    State
  > {
    select: ElementRef<*>;
    static defaultProps = defaultProps;

    state = {
      inputValue:
        this.props.inputValue !== undefined
          ? this.props.inputValue
          : this.props.defaultInputValue,
      menuIsOpen:
        this.props.menuIsOpen !== undefined
          ? this.props.menuIsOpen
          : this.props.defaultMenuIsOpen,
      value:
        this.props.value !== undefined
          ? this.props.value
          : this.props.defaultValue,
    };
    focus() {
      this.select.focus();
    }
    blur() {
      this.select.blur();
    }
    onChange = (value: ValueType, actionMeta: ActionMeta) => {
      if (this.props.onChange) {
        this.props.onChange(value, actionMeta);
      }
      this.setState({ value });
    };
    onInputChange = (value: string, actionMeta: InputActionMeta) => {
      let newValue;
      if (this.props.onInputChange) {
        newValue = this.props.onInputChange(value, actionMeta);
      }
      this.setState({
        inputValue: newValue !== undefined ? newValue : value,
      });
    };
    onMenuOpen = () => {
      if (this.props.onMenuOpen) {
        this.props.onMenuOpen();
      }
      this.setState({ menuIsOpen: true });
    };
    onMenuClose = () => {
      if (this.props.onMenuClose) {
        this.props.onMenuClose();
      }
      this.setState({ menuIsOpen: false });
    };
    render() {
      const {
        defaultInputValue,
        defaultMenuIsOpen,
        defaultValue,
        inputValue,
        menuIsOpen,
        value,
        ...props
      } = this.props;

      return (
        <SelectComponent
          {...props}
          ref={ref => {
            this.select = ref;
          }}
          inputValue={inputValue || this.state.inputValue}
          menuIsOpen={menuIsOpen || this.state.menuIsOpen}
          onChange={this.onChange}
          onInputChange={this.onInputChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          value={value || this.state.value}
        />
      );
    }
  };

export default manageState;
