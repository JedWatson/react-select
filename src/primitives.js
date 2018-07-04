// @flow
import React from 'react';

import type { InnerRef } from './types';

export type Props = {
  /** css to be passed to the tag element. */
  css?: {},
  /** A reference to the inner element. */
  innerRef?: InnerRef,
};

const createPrimitive = (Tag: string) => ({
  css,
  innerRef,
  ...props
}: Props) => <Tag ref={innerRef} css={css} {...props} />;

export const Button = createPrimitive('button');
export const Div = createPrimitive('div');
export const Span = createPrimitive('span');
export const Input = createPrimitive('input');

// Assistive text to describe visual elements. Hidden for sighted users.
export const A11yText = (props: any) => (
  <span
    css={{
      zIndex: 9999,
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      width: 1,
      position: 'absolute',
      overflow: 'hidden',
      padding: 0,
      whiteSpace: 'nowrap',
      backgroundColor: 'red',
      color: 'blue',
    }}
    {...props}
  />
);
