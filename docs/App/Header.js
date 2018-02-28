// @flow
// @jsx glam

import glam from 'glam';
import React, { Component, type ElementRef } from 'react';
import { withRouter } from 'react-router-dom';
import NodeResolver from 'react-node-resolver';

import Select from '../../src';
import type { RouterProps } from '../types';
import { GitHubButton } from './GitHubButton';

const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const changes = [
  {
    value: '/styles',
    icon: '🎨',
    label: 'CSS-in-JS styling API',
  },
  {
    value: '/components',
    icon: '🏗',
    label: 'Replacable component architecture',
  },
  {
    value: '/api',
    icon: '🤖',
    label: 'Simpler and more extensible',
  },
  { value: '#animated-components', icon: '🚀', label: 'Animation built in' },
];

function getLabel({ icon, label }) {
  return (
    <div style={{ alignItems: 'center', display: 'flex ' }}>
      <span style={{ fontSize: 18, marginRight: '0.5em' }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </div>
  );
}

const Gradient = ({ css, innerRef, style, ...props }) => (
  <div
    css={{
      backgroundColor: '#2684FF',
      color: 'white',
      position: 'relative',
      // transition: 'margin-top 220ms cubic-bezier(0.2, 0, 0, 1)',
      ...css,
    }}
    ref={innerRef}
    style={{
      backgroundImage: 'linear-gradient(135deg, #2684FF 0%, #0747A6 100%)',
      ...style,
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
type Height = number | 'auto';
type HeaderProps = RouterProps & { children: any };
type HeaderState = { height: Height };

class Header extends Component<HeaderProps, HeaderState> {
  nav: HTMLElement;
  wrapper: HTMLElement;
  getWrapper = (ref: ElementRef<*>) => {
    if (!ref) return;
    this.wrapper = ref;
  };
  getNav = (ref: ElementRef<*>) => {
    if (!ref) return;
    this.nav = ref;
  };
  getOffset = () => {
    if (!this.wrapper || !this.nav) return 0;
    const offset = (this.wrapper.offsetHeight - this.nav.offsetHeight) * -1;

    return this.isHome() ? 0 : offset;
  };
  isHome = (props = this.props) => {
    const valid = ['/', '/home'];
    return valid.includes(props.location.pathname);
  };
  render() {
    const { children, history } = this.props;

    return (
      <Gradient
        innerRef={this.getWrapper}
        // style={{ marginTop: this.getOffset() }}
      >
        <Container>
          <h1
            css={{
              fontSize: '2.4em',
              fontWeight: 'bold',
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
          <Columns
            onChange={opt => {
              history.push(opt.value);
            }}
          />
        </Container>
        <NodeResolver innerRef={this.getNav}>{children}</NodeResolver>
      </Gradient>
    );
  }
}

const Columns = ({ onChange }) => (
  <div css={{ [largeDevice]: { display: 'flex ' } }}>
    <div css={{ flex: 1, [largeDevice]: { paddingRight: 30 } }}>
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
      <StarButton />
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
        onChange={onChange}
        placeholder="🎉 What's new in V2"
        value={[]}
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
            position: 'static', // FF layout fix; this select never receives a value
          }),
        }}
      />
    </div>
  </div>
);

const StarButton = () => (
  <span
    style={{
      display: 'inline-block',
      display: 'inline-block',
      minHeight: 32,
    }}
  >
    <GitHubButton
      className="github-button"
      href="https://github.com/jedwatson/react-select"
      data-size="large"
      data-show-count="true"
      aria-label="Star jedwatson/react-select on GitHub"
    >
      Star
    </GitHubButton>
  </span>
);

export default withRouter(Header);
