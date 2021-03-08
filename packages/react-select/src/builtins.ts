import { GroupBase, OptionBase } from './types';

export const formatGroupLabel = <
  Option extends OptionBase,
  Group extends GroupBase<Option>
>(
  group: Group
): string => group.label;

export const getOptionLabel = <Option extends OptionBase>(
  option: Option
): string => option.label;

export const getOptionValue = <Option extends OptionBase>(
  option: Option
): string => option.value;

export const isOptionDisabled = <Option extends OptionBase>(
  option: Option
): boolean => !!option.isDisabled;
