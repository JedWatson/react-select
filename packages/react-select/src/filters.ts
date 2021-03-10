import memoizeOne from 'memoize-one';
import { stripDiacritics } from './diacritics';
import { OptionBase } from './types';

export interface FilterOptionOption<Option extends OptionBase> {
  readonly label: string;
  readonly value: string;
  readonly data: Option;
}

interface Config<Option extends OptionBase> {
  readonly ignoreCase?: boolean;
  readonly ignoreAccents?: boolean;
  readonly stringify?: (option: FilterOptionOption<Option>) => string;
  readonly trim?: boolean;
  readonly matchFrom?: 'any' | 'start';
}

const memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);

const trimString = (str: string) => str.replace(/^\s+|\s+$/g, '');
const defaultStringify = <Option extends OptionBase>(
  option: FilterOptionOption<Option>
) => `${option.label} ${option.value}`;

export const createFilter = <Option extends OptionBase>(
  config?: Config<Option>
) => (option: FilterOptionOption<Option>, rawInput: string): boolean => {
  const { ignoreCase, ignoreAccents, stringify, trim, matchFrom } = {
    ignoreCase: true,
    ignoreAccents: true,
    stringify: defaultStringify,
    trim: true,
    matchFrom: 'any',
    ...config,
  };
  let input = trim ? trimString(rawInput) : rawInput;
  let candidate = trim ? trimString(stringify(option)) : stringify(option);
  if (ignoreCase) {
    input = input.toLowerCase();
    candidate = candidate.toLowerCase();
  }
  if (ignoreAccents) {
    input = memoizedStripDiacriticsForInput(input);
    candidate = stripDiacritics(candidate);
  }
  return matchFrom === 'start'
    ? candidate.substr(0, input.length) === input
    : candidate.indexOf(input) > -1;
};
