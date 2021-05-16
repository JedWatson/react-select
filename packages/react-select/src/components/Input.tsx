/** @jsx jsx */
import { jsx } from '@emotion/react';
import AutosizeInput, { AutosizeInputProps } from 'react-input-autosize';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
  OptionBase,
} from '../types';
import { cleanCommonProps } from '../utils';

export interface InputSpecificProps<
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Reference to the internal element */
  innerRef?: (instance: HTMLInputElement | null) => void;
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** The ID of the form that the input belongs to */
  form?: string;
  /** The input is rendered in the menu */
  searchInMenu?: boolean;
  /** The menu is placed either at the top or at the bottom */
  menuPlacement?: string;
}

export type InputProps<
  Option extends OptionBase = OptionBase,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = InputSpecificProps<Option, IsMulti, Group> &
  Omit<AutosizeInputProps, 'ref'>;

export const inputCSS = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  isDisabled,
  searchInMenu,
  menuPlacement,
  theme: { spacing, colors },
}: InputProps<Option, IsMulti, Group>): CSSObjectWithLabel => ({
  borderTop:
    searchInMenu && menuPlacement === 'top'
      ? '1px solid hsla(0, 0%, 0%, 0.1)'
      : 0,
  borderBottom:
    searchInMenu && menuPlacement === 'bottom'
      ? '1px solid hsla(0, 0%, 0%, 0.1)'
      : 0,
  margin: searchInMenu ? `${spacing.baseUnit / 2}px 0` : spacing.baseUnit / 2,
  paddingBottom: searchInMenu ? spacing.baseUnit : spacing.baseUnit / 2,
  paddingTop: searchInMenu ? spacing.baseUnit : spacing.baseUnit / 2,
  visibility: isDisabled ? 'hidden' : 'visible',
  color: colors.neutral80,
});
const inputStyle = ({
  isHidden,
  searchInMenu,
}: {
  isHidden: boolean;
  searchInMenu?: boolean;
}) => ({
  label: 'input',
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: searchInMenu ? '0 0 0 8px' : 0,
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
  const {
    innerRef,
    isDisabled,
    isHidden,
    searchInMenu,
    menuPlacement,
    ...innerProps
  } = cleanCommonProps(props);

  return (
    <div css={getStyles('input', props)}>
      <AutosizeInput
        className={cx(
          { input: true },
          `${className || ''} search-in-${searchInMenu ? 'menu' : 'input'}`
        )}
        inputRef={innerRef}
        inputStyle={inputStyle({ isHidden, searchInMenu })}
        disabled={isDisabled}
        {...innerProps}
      />
    </div>
  );
};

export default Input;
