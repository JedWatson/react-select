// @flow
import React, { type Node } from 'react';

const style = {
  h1: {
    marginTop: 0,
  },
  h2: {
    marginTop: '1em',
  },
  h3: {
    marginTop: '1em',
  },
};

export type HeadingProps = {
  children: Node,
  level?: number, // eslint-disable-line react/require-default-props
};

export default function Heading({ children, level = 1 }: HeadingProps) {
  const Tag = `h${level}`;

  return <Tag style={style[Tag]}>{children}</Tag>;
}

export const H1 = (props: HeadingProps) => <Heading level={1} {...props} />;
export const H2 = (props: HeadingProps) => <Heading level={2} {...props} />;
export const H3 = (props: HeadingProps) => <Heading level={3} {...props} />;
