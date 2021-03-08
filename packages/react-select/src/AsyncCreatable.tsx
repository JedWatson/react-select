// import { AsyncProps, makeAsyncSelect } from './Async';
// import { makeCreatableSelect } from './Creatable';
// import manageState from './stateManager';
import Select from './Select';
import { GroupBase, OptionBase } from './types';
import React, { MutableRefObject, ReactElement, RefAttributes } from 'react';
import useAsync, { AsyncAdditionalProps } from './useAsync';
import useStateManager, { StateManagerProps } from './useStateManager';
import useCreatable, { CreatableAdditionalProps } from './useCreatable';

// const SelectCreatable = makeCreatableSelect(Select);
// const SelectCreatableState = manageState(SelectCreatable);
//
// export default makeAsyncSelect(SelectCreatableState);

type AsyncCreatableProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = StateManagerProps<Option, IsMulti, Group> &
  CreatableAdditionalProps<Option, Group> &
  AsyncAdditionalProps<Option, Group>;

type AsyncCreatableSelect = <
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AsyncCreatableProps<Option, IsMulti, Group> &
    RefAttributes<Select<Option, IsMulti, Group>>
) => ReactElement;

const AsyncCreatableSelect = React.forwardRef(
  <
    Option extends OptionBase,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  >(
    props: AsyncCreatableProps<Option, IsMulti, Group>,
    ref:
      | ((instance: Select<Option, IsMulti, Group> | null) => void)
      | MutableRefObject<Select<Option, IsMulti, Group> | null>
      | null
  ) => {
    const stateManagedProps = useAsync(props);
    const creatableProps = useStateManager(stateManagedProps);
    const selectProps = useCreatable(creatableProps);

    return <Select ref={ref} {...selectProps} />;
  }
) as AsyncCreatableSelect;

export default AsyncCreatableSelect;
