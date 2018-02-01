// @flow
// @jsx glam

import './index.css';
import glam from 'glam';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollLink from 'react-scrollchor';

import {
  Animated,
  Async,
  Experimental,
  Basic,
  NoMatch,
  Styled,
  Tests,
} from './pages';
import { Code, H1, Link } from './components';

const borderColor = 'hsl(0, 0%, 88%)';
const appWidth = 640;
const appGutter = 20;
export const contentGutter = 30;
const navWidth = 180;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const AppContainer = props => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: appWidth + navWidth / 2,
      minHeight: '100vh',
      padding: `0 ${appGutter}px`,

      [smallDevice]: {
        maxWidth: appWidth,
      },
    }}
    {...props}
  />
);
const PageContent = props => (
  <div
    css={{
      paddingTop: contentGutter,
      paddingBottom: 300,

      [smallDevice]: {
        paddingTop: contentGutter * 2,
      },
    }}
    {...props}
  />
);
const AppContent = props => (
  <div
    css={{
      flex: '1 1 auto',
      marginLeft: 'auto',
      marginRight: 'auto',

      [largeDevice]: {
        paddingLeft: navWidth + contentGutter,

        ':before': {
          borderRight: `1px solid ${borderColor}`,
          content: ' ',
          marginLeft: -(navWidth + contentGutter),
          height: '100%',
          position: 'fixed',
          width: navWidth,
        },
      },
    }}
    {...props}
  />
);
const Nav = props => (
  <div
    css={{
      [smallDevice]: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex ',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        position: 'fixed',
        top: 0,
        width: '100%',
        WebkitOverflowScrolling: 'touch',
        zIndex: 1,
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingTop: contentGutter,
        position: 'fixed',
        width: navWidth,
        zIndex: 1,
      },
    }}
    {...props}
  />
);
const NavItem = ({ selected, ...props }) => (
  <ScrollLink
    css={{
      color: selected ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 40%)',
      display: 'inline-block',
      padding: `15px ${appGutter}px`,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover': {
        color: selected ? 'black' : '#2684FF',
      },
      ':active': {
        color: 'black',
      },

      [smallDevice]: {
        boxShadow: selected ? 'inset 0 -1px 0 black' : null,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        borderColor: selected ? borderColor : 'transparent',
        borderStyle: 'solid',
        borderWidth: '1px 0',
        display: 'block',
        padding: '10px 20px 10px 0',
        right: -1,

        ':before': {
          content: ' ',
          // background: 'linear-gradient(90deg, fade(#e9e9e9, 0%) 94%, #e9e9e9)',
        },
      },
    }}
    {...props}
  />
);

const changes = [
  { icon: '🎨', text: 'CSS-in-JS with a complete styling API' },
  {
    icon: '🏗',
    text: 'Replace any of the built-in rendering components',
  },
  {
    icon: '🤖',
    text: 'Simpler and more extensible; fewer properties',
  },
  { icon: '⚡️', text: 'Attention to detail and performance' },
];
const List = ({ items }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {items.map(({ icon, text }, j) => (
      <li key={j} style={{ alignItems: 'center', display: 'flex ' }}>
        <span style={{ fontSize: 24, marginRight: '0.5em' }}>{icon}</span>
        <span style={{ fontSize: 14 }}>{text}</span>
      </li>
    ))}
  </ul>
);

const Intro = () => (
  <div>
    <H1>
      React Select v2{' '}
      <small style={{ color: '#999', fontWeight: 500 }}>(alpha)</small>
    </H1>
    <h4>Areas of improvement on v1:</h4>
    <List items={changes} />
    <h4>Try it out:</h4>
    <p>
      <Code>yarn add react-select@next</Code>
    </p>
    <p style={{ color: '#999' }}>
      <Link
        href="https://github.com/JedWatson/react-select/tree/v2"
        target="_blank"
      >
        GitHub Project
      </Link>{' '}
      &middot;{' '}
      <Link
        href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Basic.js"
        target="_blank"
      >
        Examples Source
      </Link>
    </p>
  </div>
);

function upcase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const pages = [
  { label: 'Basic', id: 'basic', component: Basic },
  { label: 'Animation', id: 'animated', component: Animated },
  { label: 'Async Options', id: 'async', component: Async },
  { label: 'Custom Styles', id: 'styled', component: Styled },
  { label: 'Experimental', id: 'experimental', component: Experimental },
];
const OnePageScroller = () => (
  <div>
    <Intro />
    {pages.map(l => {
      const Page = l.component;
      return <Page key={l.id} id={l.id} />;
    })}
  </div>
);

export default class App extends Component<*> {
  render() {
    return (
      <BrowserRouter>
        <Route>
          <AppContainer>
            <Switch>
              <Route
                exact
                path="/"
                render={({ location }) => (
                  <Nav>
                    {pages.map(l => {
                      const selected = location.hash.substr(1) === l.id;
                      return (
                        <NavItem key={l.id} selected={selected} to={`#${l.id}`}>
                          {l.label}
                        </NavItem>
                      );
                    })}
                  </Nav>
                )}
              />
              <Route
                render={({ location }) => {
                  const page = upcase(location.pathname.substr(1));
                  const href = `https://github.com/JedWatson/react-select/blob/v2/examples/pages/${page}.js`;

                  return (
                    <Nav>
                      <Link href="/">Home</Link> &middot;{' '}
                      <Link href={href} target="_blank">
                        Source
                      </Link>
                    </Nav>
                  );
                }}
              />
            </Switch>
            <AppContent>
              <PageContent>
                <Switch>
                  <Route exact path="/" component={OnePageScroller} />
                  <Route exact path="/animated" component={Animated} />
                  <Route exact path="/async" component={Async} />
                  <Route exact path="/styled" component={Styled} />
                  <Route exact path="/experimental" component={Experimental} />
                  <Route exact path="/tests" component={Tests} />
                  <Route component={NoMatch} />
                </Switch>
              </PageContent>
            </AppContent>
          </AppContainer>
        </Route>
      </BrowserRouter>
    );
  }
}
