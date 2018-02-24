// @flow
// @jsx glam

import './index.css';
import glam from 'glam';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  Animated,
  Async,
  Creatable,
  Experimental,
  Home,
  NoMatch,
  Styled,
  Tests,
} from '../examples';
import Header from '../examples/Home/Header';

import {
  AppContainer,
  AppContent,
  PageContent,
  Nav,
  NavItem,
  ScrollRestoration,
} from './components';
import Sticky from './Sticky';

const links = [
  { label: 'Intro', value: '/' },
  { label: 'Animation', value: '/animated' },
  { label: 'Async Options', value: '/async' },
  { label: 'Creatable Options', value: '/creatable' },
  { label: 'Custom Styles', value: '/styled' },
  { label: 'Experimental', value: '/experimental' },
];

export default class App extends Component<*> {
  render() {
    return (
      <BrowserRouter>
        <Route>
          <div>
            <Header />
            <ScrollRestoration>
              <AppContainer>
                <Sticky>
                  <Route
                    render={({ location }) => (
                      <Nav>
                        {links.map(l => {
                          const selected = location.pathname === l.value;
                          return (
                            <NavItem
                              key={l.value}
                              selected={selected}
                              to={l.value}
                            >
                              {l.label}
                            </NavItem>
                          );
                        })}
                      </Nav>
                    )}
                  />
                </Sticky>
                <AppContent>
                  <PageContent>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/animated" component={Animated} />
                      <Route exact path="/async" component={Async} />
                      <Route exact path="/creatable" component={Creatable} />
                      <Route exact path="/styled" component={Styled} />
                      <Route
                        exact
                        path="/experimental"
                        component={Experimental}
                      />
                      <Route exact path="/tests" component={Tests} />
                      <Route component={NoMatch} />
                    </Switch>
                  </PageContent>
                </AppContent>
              </AppContainer>
            </ScrollRestoration>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}
