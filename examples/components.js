// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';

const fontFamilyFixed =
  'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace';

export const Example = (props: {}) => (
  <div css={{ paddingRight: '100px' }} {...props} />
);

export const Code = (props: {}) => (
  <code
    css={{
      backgroundColor: '#eee',
      fontFamily: fontFamilyFixed,
      fontSize: '85%',
      padding: '2px 4px',
      borderRadius: 4,
    }}
    {...props}
  />
);

const linkCSS = {
  color: '#2684ff',
  textDecoration: 'none',
  borderBottom: '2px solid #deebff',
};
export const Link = (props: {}) => (
  <a
    css={{
      ...linkCSS,
      ':visited': linkCSS,
      ':hover': {
        borderBottomColor: '#2684ff',
      },
    }}
    {...props}
  />
);

export const Hr = () => (
  <div
    css={{
      backgroundColor: 'hsl(0, 0%, 90%)',
      height: 2,
      marginBottom: '2em',
      marginTop: '2em',
    }}
  />
);

export const Note = ({ Tag = 'div', ...props }: { Tag?: string }) => (
  <Tag
    css={{
      color: 'hsl(0, 0%, 40%)',
      display: 'inline-block',
      fontSize: 12,
      fontStyle: 'italic',
      marginTop: '0.5em',
    }}
    {...props}
  />
);

export const H1 = (props: any) => <h1 css={{ marginTop: 0 }} {...props} />;
