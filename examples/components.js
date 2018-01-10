// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';

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

export const Note = ({ Tag = 'div', ...props }: { Tag: string }) => (
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
