import { GroupBase, OptionBase } from './types';

export const formatGroupLabel = <
  Option extends OptionBase,
  Group extends GroupBase<Option>
>(
  group: Group
): string => group.label as string;

export const getOptionLabel = <Option extends OptionBase>(
  option: Option
): string => option.label as string;

export const getOptionValue = <Option extends OptionBase>(
  option: Option
): string => option.value as string;

export const isOptionDisabled = <Option extends OptionBase>(
  option: Option
): boolean => !!option.isDisabled;
