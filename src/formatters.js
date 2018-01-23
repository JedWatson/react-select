// @flow
type OptionLabelFormatterArgs = { label: string };
type OptionValueFormatterArgs = { value: string };
type ValueLabelFormatterArgs = { label: string };

export type Formatters = {
  optionLabel: OptionLabelFormatterArgs => string,
  optionValue: OptionValueFormatterArgs => string,
  valueLabel: ValueLabelFormatterArgs => string,
};

export type FormattersConfig = $Shape<Formatters>;

export const formatters: Formatters = {
  optionLabel: ({ label }) => label,
  optionValue: ({ value }) => value,
  valueLabel: ({ label }) => label,
};

type Props = {
  formatters: Formatters,
};

export const defaultFormatters = (props: Props) => ({
  ...formatters,
  ...props.formatters,
});
