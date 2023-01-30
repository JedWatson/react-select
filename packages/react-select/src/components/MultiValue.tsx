/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CrossIcon } from './indicators';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { Props } from '../Select';
import { getStyleProps } from '../utils';

interface MultiValueComponents<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  Container: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
  Label: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
  Remove: ComponentType<MultiValueRemoveProps<Option, IsMulti, Group>>;
}

export interface MultiValueProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  children: ReactNode;
  components: MultiValueComponents<Option, IsMulti, Group>;
  cropWithEllipsis?: boolean;
  data: Option;
  innerProps: JSX.IntrinsicElements['div'];
  isFocused: boolean;
  isDisabled: boolean;
  removeProps: JSX.IntrinsicElements['div'];
  index: number;
}

export const multiValueCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    theme: { spacing, borderRadius, colors },
  }: MultiValueProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  label: 'multiValue',
  display: 'flex',
  minWidth: 0, // resolves flex/text-overflow bug
  ...(unstyled
    ? {}
    : {
        backgroundColor: colors.neutral10,
        borderRadius: borderRadius / 2,
        margin: spacing.baseUnit / 2,
      }),
});

export const multiValueLabelCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    theme: { borderRadius, colors },
    cropWithEllipsis,
  }: MultiValueProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  overflow: 'hidden',
  textOverflow:
    cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
  whiteSpace: 'nowrap',
  ...(unstyled
    ? {}
    : {
        borderRadius: borderRadius / 2,
        color: colors.neutral80,
        fontSize: '85%',
        padding: 3,
        paddingLeft: 6,
      }),
});

export const multiValueRemoveCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    theme: { spacing, borderRadius, colors },
    isFocused,
  }: MultiValueProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  alignItems: 'center',
  display: 'flex',
  ...(unstyled
    ? {}
    : {
        borderRadius: borderRadius / 2,
        backgroundColor: isFocused ? colors.dangerLight : undefined,
        paddingLeft: spacing.baseUnit,
        paddingRight: spacing.baseUnit,
        ':hover': {
          backgroundColor: colors.dangerLight,
          color: colors.danger,
        },
      }),
});

export interface MultiValueGenericProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  children: ReactNode;
  data: any;
  innerProps: { className?: string };
  selectProps: Props<Option, IsMulti, Group>;
}
export const MultiValueGeneric = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  children,
  innerProps,
}: MultiValueGenericProps<Option, IsMulti, Group>) => (
  <div {...innerProps}>{children}</div>
);

export const MultiValueContainer = MultiValueGeneric;
export const MultiValueLabel = MultiValueGeneric;
export interface MultiValueRemoveProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  children?: ReactNode;
  data: Option;
  innerProps: JSX.IntrinsicElements['div'];
  selectProps: Props<Option, IsMulti, Group>;
}
export function MultiValueRemove<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({ children, innerProps }: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return (
    <div role="button" {...innerProps}>
      {children || <CrossIcon size={14} />}
    </div>
  );
}

const MultiValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  const {
    children,
    components,
    data,
    innerProps,
    isDisabled,
    removeProps,
    selectProps,
  } = props;

  const { Container, Label, Remove } = components;

  return (
    <Container
      data={data}
      innerProps={{
        ...getStyleProps(props, 'multiValue', {
          'multi-value': true,
          'multi-value--is-disabled': isDisabled,
        }),
        ...innerProps,
      }}
      selectProps={selectProps}
    >
      <Label
        data={data}
        innerProps={{
          ...getStyleProps(props, 'multiValueLabel', {
            'multi-value__label': true,
          }),
        }}
        selectProps={selectProps}
      >
        {children}
      </Label>
      <Remove
        data={data}
        innerProps={{
          ...getStyleProps(props, 'multiValueRemove', {
            'multi-value__remove': true,
          }),
          'aria-label': `Remove ${children || 'option'}`,
          ...removeProps,
        }}
        selectProps={selectProps}
      />
    </Container>
  );
};

export default MultiValue;
