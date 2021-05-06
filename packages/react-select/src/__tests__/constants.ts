export interface Option {
  readonly label: string;
  readonly value: string;
}

export const OPTIONS: readonly Option[] = [
  { label: '0', value: 'zero' },
  { label: '1', value: 'one' },
  { label: '2', value: 'two' },
  { label: '3', value: 'three' },
  { label: '4', value: 'four' },
  { label: '5', value: 'five' },
  { label: '6', value: 'six' },
  { label: '7', value: 'seven' },
  { label: '8', value: 'eight' },
  { label: '9', value: 'nine' },
  { label: '10', value: 'ten' },
  { label: '11', value: 'eleven' },
  { label: '12', value: 'twelve' },
  { label: '13', value: 'thirteen' },
  { label: '14', value: 'fourteen' },
  { label: '15', value: 'fifteen' },
  { label: '16', value: 'sixteen' },
];

export interface OptionDisabled {
  readonly label: string;
  readonly value: string;
  readonly isDisabled?: boolean;
}

export const OPTIONS_DISABLED: readonly OptionDisabled[] = [
  { label: '0', value: 'zero' },
  { label: '1', value: 'one', isDisabled: true },
  { label: '2', value: 'two' },
  { label: '3', value: 'three' },
  { label: '4', value: 'four' },
  { label: '5', value: 'five' },
  { label: '6', value: 'six' },
  { label: '7', value: 'seven' },
  { label: '8', value: 'eight' },
  { label: '9', value: 'nine' },
  { label: '10', value: 'ten' },
  { label: '11', value: 'eleven' },
  { label: '12', value: 'twelve' },
  { label: '13', value: 'thirteen' },
  { label: '14', value: 'fourteen' },
  { label: '15', value: 'fifteen' },
  { label: '16', value: 'sixteen' },
];

export interface OptionNumberValue {
  readonly label: string;
  readonly value: number;
}

export const OPTIONS_NUMBER_VALUE: readonly OptionNumberValue[] = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
];

export interface OptionBooleanValue {
  readonly label: string;
  readonly value: boolean;
}

export const OPTIONS_BOOLEAN_VALUE: readonly OptionBooleanValue[] = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];

export interface OptionAccented {
  readonly label: string;
  readonly value: string;
}

export const OPTIONS_ACCENTED: readonly OptionAccented[] = [
  { label: 'school', value: 'en' },
  { label: 'école', value: 'fr' },
];
