import {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  OnChangeValue,
  OptionBase,
  PropsValue,
} from './types';
import { BaseSelectProps } from './Select';
import { useCallback, useState } from 'react';

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
> = Omit<BaseSelectProps<Option, IsMulti, Group>, StateManagedPropKeys> &
  Partial<BaseSelectProps<Option, IsMulti, Group>>;

interface StateMangerAdditionalProps<Option extends OptionBase> {
  defaultInputValue?: string;
  defaultMenuIsOpen?: boolean;
  defaultValue?: PropsValue<Option>;
}

export type StateManagedProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> &
  StateMangerAdditionalProps<Option>;

export default function useStateManager<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
  AdditionalProps
>(
  props: StateManagedProps<Option, IsMulti, Group> & AdditionalProps
): BaseSelectProps<Option, IsMulti, Group> & AdditionalProps {
  const {
    defaultInputValue = '',
    defaultMenuIsOpen = false,
    defaultValue = null,
    onChange: propsOnChange,
    onInputChange: propsOnInputChange,
    onMenuOpen: propsOnMenuOpen,
    onMenuClose: propsOnMenuClose,
  } = props;
  const [stateInputValue, setStateInputValue] = useState(
    props.inputValue !== undefined ? props.inputValue : defaultInputValue
  );
  const [stateMenuIsOpen, setStateMenuIsOpen] = useState(
    props.menuIsOpen !== undefined ? props.menuIsOpen : defaultMenuIsOpen
  );
  const [stateValue, setStateValue] = useState(
    props.value !== undefined ? props.value : defaultValue
  );

  const onChange = useCallback(
    (
      newValue: OnChangeValue<Option, IsMulti>,
      actionMeta: ActionMeta<Option>
    ) => {
      if (typeof propsOnChange === 'function') {
        propsOnChange(newValue, actionMeta);
      }
      setStateValue(newValue);
    },
    [propsOnChange]
  );
  const onInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      if (typeof propsOnInputChange === 'function') {
        propsOnInputChange(newValue, actionMeta);
      }
      setStateInputValue(newValue);
    },
    [propsOnInputChange]
  );
  const onMenuOpen = useCallback(() => {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  const onMenuClose = useCallback(() => {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);

  const inputValue =
    props.inputValue !== undefined ? props.inputValue : stateInputValue;
  const menuIsOpen =
    props.menuIsOpen !== undefined ? props.menuIsOpen : stateMenuIsOpen;
  const value = props.value !== undefined ? props.value : stateValue;
  return {
    ...props,
    inputValue,
    menuIsOpen,
    onChange,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    value,
  };
}
