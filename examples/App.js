// @flow
// @jsx glam

import './index.css';
import glam from 'glam';
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { Async, Home, NoMatch, Styled } from './pages';

const navWidth = 200;
const AppContainer = props => (
  <div
    css={{
      minHeight: '100vh',
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
      maxWidth: 400,
      paddingLeft: navWidth,
    }}
    {...props}
  />
);
const Nav = props => (
  <div
    css={{
      backgroundColor: 'hsl(0, 0%, 95%)',
      borderRight: '1px solid hsl(0, 0%, 90%)',
      bottom: 0,
      paddingBottom: 30,
      paddingTop: 30,
      position: 'fixed',
      top: 0,
      width: navWidth,
    }}
    {...props}
  />
);
const NavItem = ({ selected, ...props }) => (
  <Link
    css={{
      backgroundColor: selected ? 'white' : 'transparent',
      borderColor: selected ? 'hsl(0, 0%, 90%)' : 'transparent',
      borderStyle: 'solid',
      borderWidth: '1px 0',
      color: 'hsl(0, 0%, 30%)',
      display: 'block',
      padding: '10px 20px',
      position: 'relative',
      right: -1,
      textDecoration: 'none',

      ':hover': {
        backgroundColor: '#DEEBFF',
        color: '#2684FF',
      },
    }}
    {...props}
  />
);
const links = [
  { label: 'Home', value: '/' },
  { label: 'Async', value: '/async' },
  { label: 'Styled', value: '/styled' },
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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/async" component={Async} />
                <Route exact path="/styled" component={Styled} />
                <Route component={NoMatch} />
              </Switch>
            </AppContent>
          </AppContainer>
        </Route>
      </BrowserRouter>
    );
  }
}
