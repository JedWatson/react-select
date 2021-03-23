/** @jsx jsx */
import { jsx } from '@emotion/react';
import AutosizeInput from 'react-input-autosize';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
  OptionBase,
} from '../types';
import { cleanCommonProps } from '../utils';

export interface InputProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Reference to the internal element */
  innerRef?: (instance: HTMLInputElement | null) => void;
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** The ID of the form that the input belongs to */
  form?: string;
}

export const inputCSS = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isDisabled,
  theme: { spacing, colors },
}: InputProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  margin: spacing.baseUnit / 2,
  paddingBottom: spacing.baseUnit / 2,
  paddingTop: spacing.baseUnit / 2,
  visibility: isDisabled ? 'hidden' : 'visible',
  color: colors.neutral80,
});
const inputStyle = (isHidden: boolean) => ({
  label: 'input',
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
  color: 'inherit',
});

const Input = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: InputProps<Option, IsMulti, Group>
) => {
  const { className, cx, getStyles } = props;
  const { innerRef, isDisabled, isHidden, ...innerProps } = cleanCommonProps(
    props
  );

  return (
    <div css={getStyles('input', props)}>
      <AutosizeInput
        className={cx({ input: true }, className)}
        inputRef={innerRef}
        inputStyle={inputStyle(isHidden)}
        disabled={isDisabled}
        {...innerProps}
      />
    </div>
  );
};

export default Input;
