// @flow

import type { OptionType } from './types';

export const getOptionLabel = (option: OptionType): string => {
  return option.label;
};

export const getOptionValue = (option: OptionType): string => {
  return option.value;
};

export const isOptionDisabled = (option: OptionType): boolean => {
  return !!option.isDisabled;
};
