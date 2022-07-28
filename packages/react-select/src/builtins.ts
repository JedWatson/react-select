import { GroupBase } from './types';

export const formatGroupLabel = <Option, Group extends GroupBase<Option>>(
  group: Group
): string => group.label as string;

export const getOptionLabel = <Option>(option: Option): string =>
  (option as { label?: unknown }).label as string;

export const getOptionValue = <Option>(option: Option): string =>
  (option as { value?: unknown }).value as string;

export const isOptionDisabled = <Option>(option: Option): boolean =>
  !!(option as { isDisabled?: unknown }).isDisabled;
