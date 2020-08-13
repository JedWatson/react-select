// @flow
/** @jsx jsx */
import { type Node } from 'react';
import { jsx } from '@emotion/core';

// const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const Wrapper = props => (
  <div
    css={{
      backgroundColor: '#FAFBFC',
      borderTop: '1px solid #EBECF0',
      color: '#7A869A',
      fontSize: '0.85em',
      zIndex: 1,
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
        display: 'flex',
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
      color: '#505F79',
      textDecoration: 'none',

      ':hover': {
        textDecoration: 'underline',
      },
    }}
    target="_blank"
  />
);

export default function Footer(): Node {
  return (
    <Wrapper>
      <Container>
        <p>Copyright © Jed Watson, 2019. MIT Licensed.</p>
        <p>
          Thanks to <A href="https://www.thinkmill.com.au">Thinkmill</A> and{' '}
          <A href="https://www.atlassian.com">Atlassian</A> for supporting this
          project.
        </p>
      </Container>
    </Wrapper>
  );
}
