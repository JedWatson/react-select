/** @jsx jsx */
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { jsx } from '@emotion/react';
import A11yText from '../internal/A11yText';
import { defaultAriaLiveMessages, AriaSelection } from '../accessibility';

import {
  CommonProps,
  GroupBase,
  OnChangeValue,
  OptionBase,
  Options,
} from '../types';

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
      const { option, removedValue, removedValues, value } = ariaSelection;
      // select-option when !isMulti does not return option so we assume selected option is value
      const asOption = (val: OnChangeValue<Option, IsMulti>): Option | null =>
        !Array.isArray(val) ? (val as Option) : null;

      // we can get an array of options, just a single option or a falsy option,
      // need to handle returning an Option shaped object or undefined
      const optionFromPossibleArray = (
        opt?: Option | Options<Option>
      ): Option | undefined => {
        // if falsy return early
        if (!opt) return;
        if (Array.isArray(opt)) {
          // if the array has no items then return early
          if (!opt.length) return;
          // take the array of options and reduce to one single option-like object with
          // the label/s concatenated for the screen reader
          return opt.reduce(
            (acc, optionItem: Option) => {
              const { value: optionVal, label } = optionItem;
              const sep = acc.label ? ', ' : '';
              acc.label = acc.label + sep + (label || optionVal);
              return acc;
            },
            // we only need the label for the returned object
            { label: '' }
          ) as Option;
        }
        // if just a single option then return it
        return opt as Option;
      };

      const selected =
        removedValue ||
        optionFromPossibleArray(removedValues) ||
        optionFromPossibleArray(option) ||
        asOption(value);

      const onChangeProps = {
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: selected ? getOptionLabel(selected) : '',
        ...ariaSelection,
      };

      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);

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
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected,
        options,
        context:
          focused === focusedOption ? ('menu' as const) : ('value' as const),
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
        isDisabled:
          focusedOption && isOptionDisabled(focusedOption, selectValue),
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
    selectValue,
    tabSelectsValue,
  ]);

  const ariaContext = `${ariaFocused} ${ariaResults} ${ariaGuidance}`;

  // This is to fix NVDA not announcing the live region when the Select is focussed.
  // It just delays the rendering of the live region a small amount so NVDA sees the
  // contents of the live region get mutated.
  const [reveal, setReveal] = useState(false);
  const timeoutRef = useRef<number | undefined>();
  useEffect(() => {
    if (!timeoutRef.current && isFocused) {
      // TS kept wanting this to be a NodeJS.Timeout type
      timeoutRef.current = (setTimeout(
        () => setReveal(true),
        50
      ) as unknown) as number;
    }
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
      setReveal(false);
    };
  }, [isFocused]);

  return (
    <A11yText
      aria-live={ariaLive}
      aria-atomic="false"
      aria-relevant="additions text"
      // This is to fix VoiceOver not announcing when focussing after Select
      // has already been focussed once
      style={{ display: isFocused ? 'block' : 'none' }}
    >
      {reveal && (
        <React.Fragment>
          <span id="aria-selection">{ariaSelected}</span>
          <span id="aria-context">{ariaContext}</span>
        </React.Fragment>
      )}
    </A11yText>
  );
};

export default LiveRegion;
