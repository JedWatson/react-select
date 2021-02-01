// @flow
/** @jsx jsx */
import React, { type Node, useState, useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import A11yText from '../internal/A11yText';
import { getAriaLiveMessages, type AriaSelectionType } from '../accessibility';

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
  // StateManager props
  inputValue: string,
  menuIsOpen: boolean,
  options: OptionsType,
};

const LiveRegion = (props: LiveRegionProps) => {
  const {
    inputValue,
    ariaSelection,
    focusedOption,
    focusedValue,
    focusableOptions,
    isFocused,
    menuIsOpen,
    selectValue,
    options,
    selectProps,
  } = props;

  const {
    ariaLiveMessages,
    getOptionLabel,
    isDisabled,
    isMulti,
    isOptionDisabled,
    isSearchable,
    screenReaderStatus,
    tabSelectsValue,
  } = selectProps;
  const ariaLabel = selectProps['aria-label'];

  const defaultMessages = useRef(getAriaLiveMessages()).current;

  const [ariaSelected, setAriaSelected] = useState('');
  const [ariaFocused, setAriaFocused] = useState('');
  const [ariaResults, setAriaResults] = useState('');
  const [ariaGuidance, setAriaGuidance] = useState('');
  const [messages, setMessages] = useState(defaultMessages);

  // Update aria live message configuration when prop changes
  useEffect(
    function updateAriaLiveMessages() {
      setMessages({
        ...defaultMessages,
        ...(ariaLiveMessages || {}),
      });
    },
    [ariaLiveMessages, defaultMessages]
  );

  // Update aria live selected option when prop changes
  useEffect(
    function updateAriaSelected() {
      let message = '';
      if (ariaSelection && messages.onChange) {
        const { value, ...context } = ariaSelection;
        message = messages.onChange(value, { ...context });
      }
      setAriaSelected(message);
    },
    [ariaSelection, messages]
  );

  // Formatting function for newly focused option/value
  useEffect(
    function updateAriaFocused() {
      let focusMsg = '';
      const focused = focusedOption || focusedValue;
      if (focused && messages.onFocus) {
        const context = {
          label: getOptionLabel(focused),
          isDisabled: isOptionDisabled(focused),
          options,
          type: focused === focusedOption ? 'option' : 'value',
          value: selectValue,
        };

        focusMsg = messages.onFocus(focused, { ...context });
      }
      setAriaFocused(focusMsg);
    },
    [
      focusedOption,
      focusedValue,
      getOptionLabel,
      isOptionDisabled,
      menuIsOpen,
      messages,
      options,
      selectValue,
    ]
  );

  useEffect(
    function updateFilteredOptions() {
      let resultsMsg = '';
      if (options.length && messages.onFilter) {
        const resultsMessage = screenReaderStatus({
          count: focusableOptions.length,
        });
        resultsMsg = messages.onFilter({ inputValue, resultsMessage });
      }
      setAriaResults(resultsMsg);
    },
    [
      focusableOptions,
      inputValue,
      menuIsOpen,
      messages,
      options,
      screenReaderStatus,
    ]
  );

  useEffect(
    function onContext() {
      let type = '',
        guidanceMsg = '';
      if (messages.guidance) {
        type = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
        guidanceMsg = messages.guidance(type, {
          isDisabled: focusedOption && isOptionDisabled(focusedOption),
          isMulti,
          isSearchable,
          label: ariaLabel,
          tabSelectsValue,
        });
      }
      setAriaGuidance(guidanceMsg);
    },
    [
      ariaLabel,
      focusedOption,
      focusedValue,
      isDisabled,
      isFocused,
      isMulti,
      isOptionDisabled,
      isSearchable,
      menuIsOpen,
      messages,
      tabSelectsValue,
    ]
  );

  // guidance context includes labeL: this.props.aria-laebl
  return (
    <A11yText aria-live="polite">
      {isFocused && (
        <React.Fragment>
          <span id="aria-selection-event">{ariaSelected}</span>
          <span id="aria-context">
            {ariaFocused} {ariaResults} {ariaGuidance}
          </span>
        </React.Fragment>
      )}
    </A11yText>
  );
};

export default LiveRegion;
