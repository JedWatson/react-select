// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Select from '../../src';
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const changes = [
  {
    path: '/guides/styles',
    icon: '🎨',
    text: 'CSS-in-JS styling API',
  },
  {
    path: '/guides/components',
    icon: '🏗',
    text: 'Replacable component architecture',
  },
  {
    path: '/api',
    icon: '🤖',
    text: 'Simpler and more extensible',
  },
  { path: '/examples/animated', icon: '🚀', text: 'Animation built in' },
];

function getLabel({ icon, text }) {
  return (
    <div style={{ alignItems: 'center', display: 'flex ' }}>
      <span style={{ fontSize: 18, marginRight: '0.5em' }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{text}</span>
    </div>
  );
}

const Gradient = props => (
  <div
    css={{ backgroundColor: '#2684FF', color: 'white' }}
    style={{
      backgroundImage: 'linear-gradient(135deg, #2684FF 0%, #0747A6 100%)',
    }}
    {...props}
  />
);
const Container = ({ css, ...props }) => (
  <div
    css={{
      boxSizing: 'border-box',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
      ...css,
    }}
    {...props}
  />
);

function Header({ children, location, history }) {
  const isHome = location.pathname === '/' || location.pathname === '/examples';
  return !isHome ? (
    <Gradient>
      <Container
        css={{
          alignItems: 'center',
          display: 'flex ',
          justifyContent: 'space-between',
        }}
      >
        <div
          css={{
            fontSize: '1.4em',
            fontWeight: 'bold',
            margin: 0,
            textShadow: '1px 1px 0 rgba(0, 82, 204, 0.33)',
            color: 'inherit',

            [largeDevice]: {
              fontSize: '2em',
            },
          }}
        >
          React Select
          <small
            css={{
              color: '#B2D4FF',
              fontSize: '0.5em',
              position: 'relative',
              marginLeft: '0.25em',
            }}
          >
            v2
          </small>
        </div>
        <GithubButton />
      </Container>
      {children}
    </Gradient>
  ) : (
    <Gradient>
      <Container>
        <h1
          css={{
            fontSize: '2.4em',
            marginBottom: '0.4em',
            marginTop: 0,
            textShadow: '1px 1px 0 rgba(0, 82, 204, 0.33)',
            color: 'inherit',

            [largeDevice]: {
              fontSize: '3.6em',
            },
          }}
        >
          React Select
          <small
            css={{
              color: '#B2D4FF',
              fontSize: '0.5em',
              position: 'relative',
              marginLeft: '0.25em',
            }}
          >
            v2
          </small>
        </h1>
        <div css={{ [largeDevice]: { display: 'flex ' } }}>
          <div css={{ flex: 1, paddingRight: 30 }}>
            <p
              style={{
                fontSize: '1.25em',
                lineHeight: 1.4,
                marginTop: -5,
              }}
            >
              A flexible and beautiful Select Input control for ReactJS with
              multiselect, autocomplete, async and creatable support.
            </p>
            <GithubButton />
          </div>
          <div
            css={{
              color: 'black',
              flex: '0 1 320px',
              [smallDevice]: {
                paddingTop: 30,
              },
            }}
          >
            <Select
              getOptionLabel={getLabel}
              isSearchable={false}
              options={changes}
              onChange={opt => {
                history.push(opt.path);
              }}
              placeholder="🎉 What's new in V2"
              styles={{
                control: (css, { isFocused }) => ({
                  ...css,
                  backgroundClip: 'padding-box',
                  borderColor: 'rgba(0,0,0,0.1)',
                  boxShadow: isFocused ? '0 0 0 1px #4C9AFF' : null,

                  ':hover': {
                    borderColor: 'rgba(0,0,0,0.2)',
                  },
                }),
                option: css => ({
                  ...css,
                  padding: '4px 12px',
                }),
                placeholder: css => ({
                  ...css,
                  color: 'black',
                }),
              }}
            />
          </div>
        </div>
      </Container>
      {children}
    </Gradient>
  );
}

const GithubButton = () => (
  <a
    className="github-button"
    href="https://github.com/jedwatson/react-select"
    data-size="large"
    data-show-count="true"
    aria-label="Star jedwatson/react-select on GitHub"
  >
    Star
  </a>
);

export default withRouter(Header);
