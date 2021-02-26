// @flow
/** @jsx jsx */
import React, { type Node, useMemo } from 'react';
import { jsx } from '@emotion/react';
import A11yText from '../internal/A11yText';
import {
  defaultAriaLiveMessages,
  type AriaSelectionType,
} from '../accessibility';

import type { CommonProps, OptionType, OptionsType, ValueType } from '../types';

// ==============================
// Root Container
// ==============================

export type LiveRegionProps = CommonProps & {
  children: Node,
  innerProps: { className?: string },
  // Select state variables
  ariaSelection: AriaSelectionType,
  focusedOption: OptionType,
  focusedValue: ValueType,
  selectValue?: ValueType,
  focusableOptions: OptionsType,
  isFocused: boolean,
};

const LiveRegion = (props: LiveRegionProps) => {
  const {
    ariaSelection,
    focusedOption,
    focusedValue,
    focusableOptions,
    isFocused,
    selectValue,
    selectProps,
  } = props;

  const {
    ariaLiveMessages,
    getOptionLabel,
    inputValue,
    isMulti,
    isOptionDisabled,
    isSearchable,
    menuIsOpen,
    options,
    screenReaderStatus,
    tabSelectsValue,
  } = selectProps;
  const ariaLabel = selectProps['aria-label'];
  const ariaLive = selectProps['aria-live'];

  // Update aria live message configuration when prop changes
  const messages = useMemo(
    () => ({
      ...defaultAriaLiveMessages,
      ...(ariaLiveMessages || {}),
    }),
    [ariaLiveMessages]
  );

  // Update aria live selected option when prop changes
  const ariaSelected = useMemo(() => {
    let message = '';
    if (ariaSelection && messages.onChange) {
      const { value, ...context } = ariaSelection;
      message = messages.onChange(value, { ...context });
    }
    return message;
  }, [ariaSelection, messages]);

  const ariaFocused = useMemo(() => {
    let focusMsg = '';
    const focused = focusedOption || focusedValue;
    const isSelected = !!(
      focusedOption &&
      selectValue &&
      selectValue.includes(focusedOption)
    );

    if (focused && messages.onFocus) {
      const context = {
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused),
        isSelected,
        options,
        type: focused === focusedOption ? 'option' : 'value',
        value: selectValue,
      };

      focusMsg = messages.onFocus(focused, { ...context });
    }
    return focusMsg;
  }, [
    focusedOption,
    focusedValue,
    getOptionLabel,
    isOptionDisabled,
    messages,
    options,
    selectValue,
  ]);

  const ariaResults = useMemo(() => {
    let resultsMsg = '';
    if (menuIsOpen && options.length && messages.onFilter) {
      const resultsMessage = screenReaderStatus({
        count: focusableOptions.length,
      });
      resultsMsg = messages.onFilter({ inputValue, resultsMessage });
    }
    return resultsMsg;
  }, [
    focusableOptions,
    inputValue,
    menuIsOpen,
    messages,
    options,
    screenReaderStatus,
  ]);

  const ariaGuidance = useMemo(() => {
    let guidanceMsg = '';
    if (messages.guidance) {
      const type = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance(type, {
        isDisabled: focusedOption && isOptionDisabled(focusedOption),
        isMulti,
        isSearchable,
        label: ariaLabel,
        tabSelectsValue,
      });
    }
    return guidanceMsg;
  }, [
    ariaLabel,
    focusedOption,
    focusedValue,
    isMulti,
    isOptionDisabled,
    isSearchable,
    menuIsOpen,
    messages,
    tabSelectsValue,
  ]);

  const ariaContext = `${ariaFocused} ${ariaResults} ${ariaGuidance}`;

  return (
    <A11yText
      aria-live={ariaLive}
      aria-atomic="false"
      aria-relevant="additions text"
    >
      {isFocused && (
        <React.Fragment>
          <span id="aria-selection">{ariaSelected}</span>
          <span id="aria-context">{ariaContext}</span>
        </React.Fragment>
      )}
    </A11yText>
  );
};

export default LiveRegion;
