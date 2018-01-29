// @flow
// @jsx glam

import React from 'react';
import glam from 'glam';

type Props = {
  css?: {},
  innerRef?: HTMLElement => void,
  tag: string,
};

export const Base = ({ css, innerRef, tag: Tag, ...props }: Props) => (
  <Tag ref={innerRef} css={{ boxSizing: 'border-box', ...css }} {...props} />
);

export const Button = (props: {}) => <Base tag="button" {...props} />;
export const Div = (props: {}) => <Base tag="div" {...props} />;
export const Span = (props: {}) => <Base tag="span" {...props} />;
export const Strong = (props: {}) => <Base tag="strong" {...props} />;
export const Em = (props: {}) => <Base tag="em" {...props} />;

export const Ul = ({ css, ...props }: { css?: {} }) => (
  <Base tag="ul" css={{ margin: 0, padding: 0, ...css }} {...props} />
);
export const Li = ({ css, ...props }: { css?: {} }) => (
  <Base tag="li" css={{ listStyle: 'none', ...css }} {...props} />
);

export const SROnly = ({ tag: Tag = 'div', ...props }: { tag?: string }) => (
  <Tag
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
