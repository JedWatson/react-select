import { GroupBase, OptionBase, PropsValue } from './types';
import { BaseSelectProps } from './Select';

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
  return {
    ...props,
    inputValue: 'test',
    menuIsOpen: true,
    onChange: props.onChange!,
    onInputChange: () => {},
    onMenuClose: () => {},
    onMenuOpen: () => {},
    value: null,
  };
}
