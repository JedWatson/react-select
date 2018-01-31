// @flow

import { stripDiacritics } from './diacritics';

const trim = str => str.replace(/^\s+|\s+$/g, '');

export const createFilter = (
  toString: Object => string = option => `${option.label} ${option.value}`,
  ignoreCase: boolean = true,
  ignoreAccents: boolean = true,
  matchFrom: 'any' | 'start' = 'any'
) => (
  option: { label: string, value: string, data: any },
  rawInput: string
) => {
  let input = trim(rawInput);
  let candidate = trim(toString(option));
  if (ignoreCase) {
    input = input.toLowerCase();
    candidate = candidate.toLowerCase();
  }
  if (ignoreAccents) {
    input = stripDiacritics(input);
    candidate = stripDiacritics(candidate);
  }
  return matchFrom === 'start'
    ? candidate.substr(0, input.length) === input
    : candidate.indexOf(input) > -1;
};
