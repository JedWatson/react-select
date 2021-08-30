/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';

export interface PlaceholderProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
  isDisabled: boolean;
  isFocused: boolean;
}

export const placeholderCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing, colors },
}: PlaceholderProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'placeholder',
  color: colors.neutral50,
  gridArea: '1 / 1 / 2 / 3',
  marginLeft: spacing.baseUnit / 2,
  marginRight: spacing.baseUnit / 2,
});

const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('placeholder', props)}
      className={cx(
        {
          placeholder: true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default Placeholder;
