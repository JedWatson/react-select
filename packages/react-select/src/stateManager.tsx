import React, { MutableRefObject, ReactElement, RefAttributes } from 'react';

import { GroupBase, OptionBase } from './types';
import Select from './Select';
import useStateManager, { StateManagerProps } from './useStateManager';

type StateManagedSelect = <
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: StateManagerProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const StateManagedSelect = React.forwardRef(
  <
    Option extends OptionBase,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  >(
    props: StateManagerProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const baseSelectProps = useStateManager(props);

    return <Select ref={ref} {...baseSelectProps} />;
  }
) as StateManagedSelect;

export default StateManagedSelect;
