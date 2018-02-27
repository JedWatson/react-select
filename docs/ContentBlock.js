// @jsx glam

import glam from 'glam';
import React from 'react';

export default function ContentBlock(props) {
  return (
    <div
      css={{
        // inline code
        '& p > code': {
          backgroundColor: 'rgba(38, 132, 255, 0.08)',
          color: '#172B4D',
          fontSize: '85%',
          fontStyle: 'normal',
          padding: '1px 5px 2px',
          borderRadius: 4,
        },

        // make some space
        '& h2': {
          marginTop: '2em',
        },

        // blockquotes are used as notes for an example
        '& blockquote': {
          color: '#7A869A',
          fontSize: '0.9em',
          fontStyle: 'italic',
          marginLeft: 0,
        },
      }}
      {...props}
    />
  );
}
