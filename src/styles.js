// @flow
import { colors, spacing } from './theme';
import { marginHorizontal } from './mixins';

type Props = any;

export type Styles = {
  singleValue?: Props => {},
};
export type GetStyles = (string, Props) => {};

export const defaultStyles: Styles = {
  singleValue: ({ isDisabled }: { isDisabled: boolean }) => ({
    ...marginHorizontal(spacing.baseUnit / 2),
    color: isDisabled ? colors.neutral40 : colors.text,
    position: 'absolute',
  }),
};
