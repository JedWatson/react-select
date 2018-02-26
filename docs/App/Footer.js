// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';

// const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const Wrapper = props => (
  <div
    css={{
      backgroundColor: '#fafafa',
      borderTop: '1px solid #f3f3f3',
      color: '#666',
      fontSize: '0.85em',
    }}
    {...props}
  />
);
const Container = props => (
  <div
    css={{
      boxSizing: 'border-box',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 20,
      paddingRight: 20,

      [largeDevice]: {
        alignItems: 'center',
        display: 'flex ',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 20,
      },
    }}
    {...props}
  />
);
const A = props => (
  <a
    {...props}
    css={{
      color: '#333',
    }}
    target="_blank"
  />
);

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <p>Copyright © Jed Watson, 2018. MIT Licensed.</p>
        <p>
          Thanks to <A href="https://www.thinkmill.com.au">Thinkmill</A> and{' '}
          <A href="https://www.atlassian.com">Atlassian</A> for supporting this
          project.
        </p>
      </Container>
    </Wrapper>
  );
}
