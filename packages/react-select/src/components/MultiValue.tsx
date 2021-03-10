/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx, ClassNames } from '@emotion/react';
import { CrossIcon } from './indicators';
import { CommonPropsAndClassName, GroupBase, OptionBase } from '../types';
import { Props } from '../Select';

interface MultiValueComponents<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  Container: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
  Label: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
  Remove: ComponentType<MultiValueRemoveProps<Option, IsMulti, Group>>;
}

export interface MultiValueProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
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
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing, borderRadius, colors },
}: MultiValueProps<Option, IsMulti, Group>) => ({
  label: 'multiValue',
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});

export const multiValueLabelCSS = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { borderRadius, colors },
  cropWithEllipsis,
}: MultiValueProps<Option, IsMulti, Group>) => ({
  borderRadius: borderRadius / 2,
  color: colors.neutral80,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : null,
  whiteSpace: 'nowrap',
});

export const multiValueRemoveCSS = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  theme: { spacing, borderRadius, colors },
  isFocused,
}: MultiValueProps<Option, IsMulti, Group>) => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  backgroundColor: isFocused && colors.dangerLight,
  display: 'flex',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,
  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export interface MultiValueGenericProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  children: ReactNode;
  data: any;
  innerProps: { className?: string };
  selectProps: Props<Option, IsMulti, Group>;
}
export const MultiValueGeneric = <
  Option extends OptionBase,
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
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  children?: ReactNode;
  data: Option;
  innerProps: JSX.IntrinsicElements['div'];
  selectProps: Props<Option, IsMulti, Group>;
}
export function MultiValueRemove<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({ children, innerProps }: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return <div {...innerProps}>{children || <CrossIcon size={14} />}</div>;
}

const MultiValue = <
  Option extends OptionBase,
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
              ...removeProps,
            }}
            selectProps={selectProps}
          />
        </Container>
      )}
    </ClassNames>
  );
};

MultiValue.defaultProps = {
  cropWithEllipsis: true,
};

export default MultiValue;
