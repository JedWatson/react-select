// @flow
// @jsx glam

import React from 'react';
import glam from 'glam';

import type { InnerRef } from './types';

type Props = {
  css?: {},
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
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    }}
    {...props}
  />
);
