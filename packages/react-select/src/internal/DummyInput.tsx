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
        width: '1px',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: '0',
      }}
    />
  );
}
