/** @jsx jsx */
import { InputHTMLAttributes, Ref } from 'react';
import { jsx } from '@emotion/react';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { cleanCommonProps, removeProps } from '../utils';

export interface DummyInputProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends InputHTMLAttributes<HTMLInputElement>,
    CommonPropsAndClassName<Option, IsMulti, Group> {
  readonly innerRef: Ref<HTMLInputElement>;
}

export const dummyInputCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DummyInputProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => {
  void props;
  void unstyled;

  return {
    label: 'dummyInput',
    // get rid of any default styles
    background: 0,
    border: 0,
    // important! this hides the flashing cursor
    caretColor: 'transparent',
    fontSize: 'inherit',
    gridArea: '1 / 1 / 2 / 3',
    outline: 0,
    padding: 0,
    // important! without `width` browsers won't allow focus
    width: 1,

    // remove cursor on desktop
    color: 'transparent',

    // remove cursor on mobile whilst maintaining "scroll into view" behaviour
    left: -100,
    opacity: 0,
    position: 'relative',
    transform: 'scale(.01)',
  };
};

const DummyInput = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DummyInputProps<Option, IsMulti, Group>
) => {
  const { cx, getStyles, getClassNames, className } = props;
  const { innerRef, ...innerProps } = cleanCommonProps(props);

  // Remove animation props not meant for HTML elements
  const filteredProps = removeProps(
    innerProps,
    'onExited',
    'in',
    'enter',
    'exit',
    'appear'
  );

  return (
    <input
      ref={innerRef}
      {...filteredProps}
      css={getStyles('dummyInput', props)}
      className={cx(
        { 'dummy-input': true },
        getClassNames('dummyInput', props),
        className
      )}
    />
  );
};

export default DummyInput;
