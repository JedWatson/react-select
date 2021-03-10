/** @jsx jsx */
import React, { ReactNode, useMemo } from 'react';
import { jsx } from '@emotion/react';
import A11yText from '../internal/A11yText';
import { defaultAriaLiveMessages, AriaSelection } from '../accessibility';

import { CommonProps, GroupBase, OptionBase, Options } from '../types';

// ==============================
// Root Container
// ==============================

export interface LiveRegionProps<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonProps<Option, IsMulti, Group> {
  children: ReactNode;
  innerProps: { className?: string };
  // Select state variables
  ariaSelection: AriaSelection<Option, IsMulti>;
  focusedOption: Option | null;
  focusedValue: Option | null;
  selectValue: Options<Option>;
  focusableOptions: Options<Option>;
  isFocused: boolean;
}

const LiveRegion = <
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: LiveRegionProps<Option, IsMulti, Group>
) => {
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
      const { option, removedValue, value } = ariaSelection;
      // select-option when !isMulti does not return option so we assume selected option is value
      const asOption = val => (!Array.isArray(val) ? val : null);
      const selected = removedValue || option || asOption(value);

      const onChangeProps = {
        isDisabled: selected && isOptionDisabled(selected),
        label: selected ? getOptionLabel(selected) : '',
        ...ariaSelection,
      };

      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, isOptionDisabled, getOptionLabel, messages]);

  const ariaFocused = useMemo(() => {
    let focusMsg = '';
    const focused = focusedOption || focusedValue;
    const isSelected = !!(
      focusedOption &&
      selectValue &&
      selectValue.includes(focusedOption)
    );

    if (focused && messages.onFocus) {
      const onFocusProps = {
        focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused),
        isSelected,
        options,
        context: focused === focusedOption ? 'menu' : 'value',
        selectValue,
      };

      focusMsg = messages.onFocus(onFocusProps);
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
      const context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption),
        isMulti,
        isSearchable,
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
