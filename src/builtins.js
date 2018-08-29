// @flow

import type { GroupType, OptionType } from './types';

export const formatGroupLabel = (group: GroupType): Node => group.label;

export const getOptionLabel = (option: OptionType): string => option.label;

export const getOptionValue = (option: OptionType): string => option.value;

export const getOptionOnMouseEnterCallback = (option: OptionType): (data: OptionType) => void => option.onMouseEnter? option.onMouseEnter: () => {};

export const getOptionOnMouseLeaveCallback = (option: OptionType): (data: OptionType) => void => option.onMouseLeave? option.onMouseLeave: () => {};

export const isOptionDisabled = (option: OptionType): boolean =>
  !!option.isDisabled;
