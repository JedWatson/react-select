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
      <GithubCorner />
      <Container>
        <h1
          css={{
            fontSize: '2.4em',
            marginBottom: '0.4em',
            marginTop: 0,
            textShadow: '1px 1px 0 rgba(0, 82, 204, 0.33)',

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
                console.log(opt);
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

const GithubCorner = () => (
  <a
    className="github-corner"
    href="https://github.com/JedWatson/react-select"
    target="_blank"
    css={{
      border: 0,
      color: '#175BBB',
      fill: '#4C9AFF',
      opacity: 0.8,
      position: 'absolute',
      right: 0,
      top: 0,
      transition: 'opacity 200ms',

      ':hover': {
        opacity: 1,
      },
    }}
  >
    <svg width="100" height="100" viewBox="0 0 250 250" aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        style={{ transformOrigin: '130px 106px' }}
        className="octo-arm"
      />
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        className="octo-body"
      />
    </svg>
  </a>
);

export default withRouter(Header);
