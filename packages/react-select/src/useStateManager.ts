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

export type StateManagerProps<
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
>({
  defaultInputValue = '',
  defaultMenuIsOpen = false,
  defaultValue = null,
  inputValue: propsInputValue,
  menuIsOpen: propsMenuIsOpen,
  onChange: propsOnChange,
  onInputChange: propsOnInputChange,
  onMenuClose: propsOnMenuClose,
  onMenuOpen: propsOnMenuOpen,
  value: propsValue,
  ...restSelectProps
}: StateManagerProps<Option, IsMulti, Group> &
  AdditionalProps): BaseSelectProps<Option, IsMulti, Group> {
  const [stateInputValue, setStateInputValue] = useState(
    propsInputValue !== undefined ? propsInputValue : defaultInputValue
  );
  const [stateMenuIsOpen, setStateMenuIsOpen] = useState(
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen
  );
  const [stateValue, setStateValue] = useState(
    propsValue !== undefined ? propsValue : defaultValue
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
    propsInputValue !== undefined ? propsInputValue : stateInputValue;
  const menuIsOpen =
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  const value = propsValue !== undefined ? propsValue : stateValue;

  return {
    ...restSelectProps,
    inputValue,
    menuIsOpen,
    onChange,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    value,
  };
}
