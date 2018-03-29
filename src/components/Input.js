// @flow
import React, { type ElementRef } from 'react';
import AutosizeInput from 'react-input-autosize';

import { className } from '../utils';
import { spacing } from '../theme';
import { Div } from '../primitives';

import type { PropsWithStyles } from '../types';

export type InputProps = PropsWithStyles & {
  /** Reference to the internal element */
  innerRef: (ElementRef<*>) => void,
  /** Set whether the input should be visible. Does not affect input size. */
  isHidden: boolean,
  /** Whether the input is disabled */
  isDisabled?: boolean,
  /** The input height, used for rendering disabled inputs. */
  inputHeight?: ?number,
};

export const css = () => ({
  margin: spacing.baseUnit / 2,
  paddingBottom: spacing.baseUnit / 2,
  paddingTop: spacing.baseUnit / 2,
});
const inputStyle = isHidden => ({
  background: 0,
  border: 0,
  fontSize: 'inherit',
  opacity: isHidden ? 0 : 1,
  outline: 0,
  padding: 0,
});

const Input = ({ getStyles, innerRef, isHidden, isDisabled, inputHeight, ...props }: InputProps) =>
  isDisabled ? (
    // maintain baseline alignment when the input is removed for disabled state
    <div style={{ height: inputHeight }} />
  ) : (
    <Div css={getStyles('input', props)}>
      <AutosizeInput
        className={className('input')}
        inputRef={innerRef}
        inputStyle={inputStyle(isHidden)}
        {...props}
      />
    </Div>
  );
export default Input;
