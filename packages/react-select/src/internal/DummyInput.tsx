/** @jsx jsx */
import { Ref } from 'react';
import { jsx } from '@emotion/react';
import { removeProps } from '../utils';

export default function DummyInput({
  innerRef,
  ...props
}: JSX.IntrinsicElements['input'] & {
  readonly innerRef: Ref<HTMLInputElement>;
}) {
  // Remove animation props not meant for HTML elements
  const filteredProps = removeProps(
    props,
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
      css={{
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
      }}
    />
  );
}
