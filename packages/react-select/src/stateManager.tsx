import React, { MutableRefObject, ReactElement, RefAttributes } from 'react';

import { GroupBase } from './types';
import Select from './Select';
import useStateManager from './useStateManager';
import type { StateManagerProps } from './useStateManager';
export type { StateManagerProps };

type StateManagedSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: StateManagerProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const StateManagedSelect = React.forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
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
