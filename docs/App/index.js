if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// @flow
// @jsx glam


import glam from 'glam';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Footer from './Footer';
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
import Tests from '../Tests';

const sections = [
  { label: 'Home', path: '/home' },
  { label: 'Props', path: '/props' },
  { label: 'Styles', path: '/styles' },
  { label: 'Components', path: '/components' },
  { label: 'Async', path: '/async' },
  { label: 'Creatable', path: '/creatable' },
  { label: 'Advanced', path: '/advanced' },
];

export default class App extends Component<*> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cypress-tests" component={Tests} />
          <Route>
            <div>
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
                  <Helmet>
                    <title>React Select</title>
                    <meta
                      name="description"
                      content="A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support."
                    />
                  </Helmet>
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
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
