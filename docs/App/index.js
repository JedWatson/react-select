// @flow
// @jsx glam

import './index.css';
import glam from 'glam';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Tests from '../Tests';
// import NoMatch from '../NoMatch';

import {
  AppContainer,
  AppContent,
  PageContent,
  PrimaryNav,
  PrimaryNavItem,
  ScrollRestoration,
} from './components';
import Section from './Section';
import PageNav from './PageNav';

const sections = [
  { label: 'Home', path: '/home' },
  { label: 'API', path: '/api' },
  { label: 'Styles', path: '/styles' },
  { label: 'Components', path: '/components' },
  // { label: 'Async', path: '/async' },
  // { label: 'Creatable', path: '/creatable' },
  // { label: 'Advanced', path: '/advanced' },
];

export default class App extends Component<*> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/tests" component={Tests} />
            <Redirect from="/" to="/home" />
          </Switch>
          <Header>
            <Route
              render={({ location }) => (
                <PrimaryNav>
                  {sections.map(l => {
                    const selected = location.pathname.includes(l.path);

                    return (
                      <PrimaryNavItem
                        key={l.path}
                        selected={selected}
                        to={l.path}
                      >
                        {l.label}
                      </PrimaryNavItem>
                    );
                  })}
                </PrimaryNav>
              )}
            />
          </Header>

          <ScrollRestoration>
            <AppContainer>
              <Route
                render={props => (
                  <Fragment>
                    <PageNav {...props} />
                    <AppContent>
                      <PageContent>
                        <Section {...props} />
                      </PageContent>
                    </AppContent>
                  </Fragment>
                )}
              />
            </AppContainer>
          </ScrollRestoration>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
