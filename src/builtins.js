// @flow

import type { OptionType } from './types';

export const getOptionLabel = (option: OptionType): string => option.label;

export const getOptionValue = (option: OptionType): string => option.value;

export const isOptionDisabled = (option: OptionType): boolean =>
  !!option.isDisabled;
