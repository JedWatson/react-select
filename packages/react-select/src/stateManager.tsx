import React, { Component } from 'react';

import {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  OnChangeValue,
  OptionBase,
  PropsValue,
} from './types';
import Select, { BaseSelectProps } from './Select';

type BaseComponentProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = JSX.LibraryManagedAttributes<
  typeof Select,
  BaseSelectProps<Option, IsMulti, Group>
>;
declare class BaseComponent<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends Component<BaseComponentProps<Option, IsMulti, Group>, unknown> {
  focus(): void;
  blur(): void;
}

type StateManagedPropKeys =
  | 'inputValue'
  | 'menuIsOpen'
  | 'onChange'
  | 'onInputChange'
  | 'onMenuClose'
  | 'onMenuOpen'
  | 'value';

type SelectPropsWithOptionalStateManagedProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = Omit<BaseComponentProps<Option, IsMulti, Group>, StateManagedPropKeys> &
  Partial<BaseComponentProps<Option, IsMulti, Group>>;

export interface StateMangerProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> {
  defaultInputValue: string;
  defaultMenuIsOpen: boolean;
  defaultValue: PropsValue<Option>;
}

export interface State<Option extends OptionBase> {
  inputValue: string;
  menuIsOpen: boolean;
  value: PropsValue<Option>;
}

export const defaultProps = {
  defaultInputValue: '',
  defaultMenuIsOpen: false,
  defaultValue: null,
};

// export class SelectComponentType<
//   Option extends OptionBase,
//   IsMulti extends boolean,
//   Group extends GroupBase<Option>
// > extends Component<
//   Omit<
//     JSX.LibraryManagedAttributes<
//       typeof Select,
//       SelectBaseProps<Option, IsMulti, Group>
//     >,
//     StateManagedProps
//   > &
//     Partial<
//       JSX.LibraryManagedAttributes<
//         typeof Select,
//         SelectBaseProps<Option, IsMulti, Group>
//       >
//     > &
//     StateMangerProps<Option>,
//   State<Option>
// > {
//   static defaultProps = defaultProps;
//   focus() {}
//   blur() {}
//   render() {
//     return null;
//   }
// }
//
// export class CreatableComponentType<
//   Option extends OptionBase,
//   IsMulti extends boolean,
//   Group extends GroupBase<Option>
// > extends Component<
//   Omit<
//     JSX.LibraryManagedAttributes<
//       ReturnType<typeof makeCreatableSelect>,
//       CreatableProps<Option, IsMulti, Group>
//     >,
//     StateManagedProps
//   > &
//     Partial<
//       JSX.LibraryManagedAttributes<
//         ReturnType<typeof makeCreatableSelect>,
//         CreatableProps<Option, IsMulti, Group>
//       >
//     > &
//     StateMangerProps<Option>,
//   State<Option>
// > {
//   static defaultProps = defaultProps;
//   focus() {}
//   blur() {}
// }
//
// type ReturnComponentType<
//   BaseComponentType extends
//     | typeof Select
//     | ReturnType<typeof makeCreatableSelect>
// > = BaseComponentType extends typeof Select
//   ? typeof SelectComponentType
//   : typeof CreatableComponentType;

const manageState = (SelectComponent: typeof BaseComponent) =>
  class StateManager<
    Option extends OptionBase,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > extends Component<StateMangerProps<Option, IsMulti, Group>, State<Option>> {
    static defaultProps = defaultProps;

    select?: BaseComponent<Option, IsMulti, Group> | null;

    state: State<Option> = {
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
      this.select!.focus();
    }
    blur() {
      this.select!.blur();
    }
    getProp<K extends keyof State<Option>>(key: K): State<Option>[K] {
      return this.props[key] !== undefined
        ? (this.props[key] as State<Option>[K])
        : this.state[key];
    }
    callProp<
      K extends 'onChange' | 'onInputChange' | 'onMenuClose' | 'onMenuOpen'
    >(
      name: K,
      ...args: Parameters<
        Exclude<StateMangerProps<Option, IsMulti, Group>[K], undefined>
      >
    ):
      | ReturnType<
          Exclude<StateMangerProps<Option, IsMulti, Group>[K], undefined>
        >
      | undefined {
      if (typeof this.props[name] === 'function') {
        // TypeScript limitation: https://stackoverflow.com/a/60196073/5327429
        return (this.props[name] as any)(...args);
      }
    }
    onChange = (
      value: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>
    ) => {
      this.callProp('onChange', value, actionMeta);
      this.setState({ value });
    };
    onInputChange = (value: any, actionMeta: InputActionMeta) => {
      // TODO: for backwards compatibility, we allow the prop to return a new
      // value, but now inputValue is a controllable prop we probably shouldn't
      const newValue = this.callProp('onInputChange', value, actionMeta);
      this.setState({
        inputValue: newValue !== undefined ? newValue : value,
      });
    };
    onMenuOpen = () => {
      this.callProp('onMenuOpen');
      this.setState({ menuIsOpen: true });
    };
    onMenuClose = () => {
      this.callProp('onMenuClose');
      this.setState({ menuIsOpen: false });
    };
    render() {
      const {
        defaultInputValue,
        defaultMenuIsOpen,
        defaultValue,
        ...props
      } = this.props;
      return (
        <SelectComponent
          {...props}
          ref={ref => {
            this.select = ref;
          }}
          inputValue={this.getProp('inputValue')}
          menuIsOpen={this.getProp('menuIsOpen')}
          onChange={this.onChange}
          onInputChange={this.onInputChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          value={this.getProp('value')}
        />
      );
    }
  };

export default manageState;
