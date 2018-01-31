// @flow
// @jsx glam

import './index.css';
import glam from 'glam';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import {
  Animated,
  Async,
  Experimental,
  Home,
  NoMatch,
  Styled,
  Tests,
} from './pages';

const borderColor = 'hsl(0, 0%, 88%)';
const navWidth = 180;
const appGutter = 20;
const contentGutter = 30;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const AppContainer = props => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 640,
      minHeight: '100vh',
      padding: `0 ${appGutter}px`,
    }}
    {...props}
  />
);
const PageContent = props => (
  <div
    css={{
      paddingBottom: contentGutter,
      paddingTop: contentGutter,

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
        '-webkit-overflow-scrolling': 'touch',
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
  <Link
    css={{
      color: selected ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 40%)',
      display: 'inline-block',
      padding: `15px ${appGutter}px`,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: selected ? 'hsl(0, 0%, 10%)' : '#2684FF',
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
const links = [
  { label: 'Home', value: '/' },
  { label: 'Animation', value: '/animated' },
  { label: 'Async Options', value: '/async' },
  { label: 'Custom Styles', value: '/styled' },
  { label: 'Experimental', value: '/experimental' },
];

export default class App extends Component<*> {
  render() {
    return (
      <BrowserRouter>
        <Route>
          <AppContainer>
            <Route
              render={({ location }) => (
                <Nav>
                  {links.map(l => {
                    const selected = location.pathname === l.value;
                    return (
                      <NavItem key={l.value} selected={selected} to={l.value}>
                        {l.label}
                      </NavItem>
                    );
                  })}
                </Nav>
              )}
            />
            <AppContent>
              <PageContent>
                <Switch>
                  <Route exact path="/" component={Home} />
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
