/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx, ClassNames } from '@emotion/react';
import { CrossIcon } from './indicators';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { Props } from '../Select';

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
}

export const multiValueCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing, borderRadius, colors },
}: MultiValueProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  label: 'multiValue',
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});

export const multiValueLabelCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { borderRadius, colors },
  cropWithEllipsis,
}: MultiValueProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  borderRadius: borderRadius / 2,
  color: colors.neutral80,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow:
    cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
  whiteSpace: 'nowrap',
});

export const multiValueRemoveCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing, borderRadius, colors },
  isFocused,
}: MultiValueProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  backgroundColor: isFocused ? colors.dangerLight : undefined,
  display: 'flex',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,
  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
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
    className,
    components,
    cx,
    data,
    getStyles,
    innerProps,
    isDisabled,
    removeProps,
    selectProps,
  } = props;

  const { Container, Label, Remove } = components;

  return (
    <ClassNames>
      {({ css, cx: emotionCx }) => (
        <Container
          data={data}
          innerProps={{
            className: emotionCx(
              css(getStyles('multiValue', props)),
              cx(
                {
                  'multi-value': true,
                  'multi-value--is-disabled': isDisabled,
                },
                className
              )
            ),
            ...innerProps,
          }}
          selectProps={selectProps}
        >
          <Label
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles('multiValueLabel', props)),
                cx(
                  {
                    'multi-value__label': true,
                  },
                  className
                )
              ),
            }}
            selectProps={selectProps}
          >
            {children}
          </Label>
          <Remove
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles('multiValueRemove', props)),
                cx(
                  {
                    'multi-value__remove': true,
                  },
                  className
                )
              ),
              'aria-label': `Remove ${children || 'option'}`,
              ...removeProps,
            }}
            selectProps={selectProps}
          />
        </Container>
      )}
    </ClassNames>
  );
};

export default MultiValue;
