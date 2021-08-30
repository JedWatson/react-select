/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';

export interface SingleValueProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** The data of the selected option rendered in the Single Value component. */
  data: Option;
  /** Props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Whether this is disabled. */
  isDisabled: boolean;
}

export const css = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isDisabled,
  theme: { spacing, colors },
}: SingleValueProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'singleValue',
  color: isDisabled ? colors.neutral40 : colors.neutral80,
  gridArea: '1 / 1 / 2 / 3',
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SingleValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: SingleValueProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, getStyles, isDisabled, innerProps } = props;
  return (
    <div
      css={getStyles('singleValue', props)}
      className={cx(
        {
          'single-value': true,
          'single-value--is-disabled': isDisabled,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default SingleValue;
