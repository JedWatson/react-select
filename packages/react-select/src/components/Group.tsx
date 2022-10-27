/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { cleanCommonProps, getStyleProps } from '../utils';

import {
  CommonProps,
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  CX,
  GetStyles,
  GroupBase,
  Options,
  Theme,
} from '../types';
import { Props } from '../Select';

export interface ForwardedHeadingProps<
  Option,
  Group extends GroupBase<Option>
> {
  id: string;
  data: Group;
}

export interface GroupProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Component to wrap the label, receives headingProps. */
  Heading: ComponentType<GroupHeadingProps<Option, IsMulti, Group>>;
  /** Props to pass to Heading. */
  headingProps: ForwardedHeadingProps<Option, Group>;
  /** Props to be passed to the group element. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Label to be displayed in the heading component. */
  label: ReactNode;
  /** The data of the group. */
  data: Group;
  options: Options<Option>;
}

export const groupCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing },
}: GroupProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  paddingBottom: spacing.baseUnit * 2,
  paddingTop: spacing.baseUnit * 2,
});

const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: GroupProps<Option, IsMulti, Group>
) => {
  const {
    children,
    cx,
    getStyles,
    getClassName,
    Heading,
    headingProps,
    innerProps,
    label,
    theme,
    selectProps,
  } = props;
  return (
    <div {...getStyleProps(props, 'group', { group: true })} {...innerProps}>
      <Heading
        {...headingProps}
        selectProps={selectProps}
        theme={theme}
        getStyles={getStyles}
        getClassName={getClassName}
        cx={cx}
      >
        {label}
      </Heading>
      <div>{children}</div>
    </div>
  );
};

interface GroupHeadingPropsDefinedProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends ForwardedHeadingProps<Option, Group> {
  className?: string | undefined;
  selectProps: Props<Option, IsMulti, Group>;
  theme: Theme;
  getStyles: GetStyles<Option, IsMulti, Group>;
  getClassName: CommonProps<Option, IsMulti, Group>['getClassName'];
  cx: CX;
}

export type GroupHeadingProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = GroupHeadingPropsDefinedProps<Option, IsMulti, Group> &
  JSX.IntrinsicElements['div'];

export const groupHeadingCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing },
}: GroupHeadingProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'group',
  color: '#999',
  cursor: 'default',
  display: 'block',
  fontSize: '75%',
  fontWeight: 500,
  marginBottom: '0.25em',
  paddingLeft: spacing.baseUnit * 3,
  paddingRight: spacing.baseUnit * 3,
  textTransform: 'uppercase',
});

export const GroupHeading = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: GroupHeadingProps<Option, IsMulti, Group>
) => {
  const { data, ...innerProps } = cleanCommonProps(props);
  return (
    <div
      {...getStyleProps(props, 'groupHeading', { 'group-heading': true })}
      {...innerProps}
    />
  );
};

export default Group;
