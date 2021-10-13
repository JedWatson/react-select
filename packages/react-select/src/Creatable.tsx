import React, { MutableRefObject, ReactElement, RefAttributes } from 'react';
import Select from './Select';
import { GroupBase } from './types';
import useStateManager, { StateManagerProps } from './useStateManager';
import useCreatable, { CreatableAdditionalProps } from './useCreatable';

export type CreatableProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = StateManagerProps<Option, IsMulti, Group> &
  CreatableAdditionalProps<Option, Group>;

type CreatableSelect = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const CreatableSelect = React.forwardRef(
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: CreatableProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const creatableProps = useStateManager(props);
    const selectProps = useCreatable(creatableProps);

    return <Select ref={ref} {...selectProps} />;
  }
) as CreatableSelect;

export default CreatableSelect;
