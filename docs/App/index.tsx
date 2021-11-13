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
import MenuTest1 from '../menu-tests/Test1';
import MenuTest2 from '../menu-tests/Test2';
import MenuTest3 from '../menu-tests/Test3';
import MenuTest4 from '../menu-tests/Test4';
import MenuTest5 from '../menu-tests/Test5';
import MenuTest6 from '../menu-tests/Test6';

const sections = [
  { label: 'Home', path: '/home' },
  { label: 'Props', path: '/props' },
  { label: 'Styles', path: '/styles' },
  { label: 'Components', path: '/components' },
  { label: 'Async', path: '/async' },
  { label: 'Creatable', path: '/creatable' },
  { label: 'Advanced', path: '/advanced' },
  { label: 'TypeScript', path: '/typescript' },
  { label: 'Upgrading', path: '/upgrade' },
];

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cypress-tests" component={Tests} />
          <Route exact path="/cypress-menu-test1" component={MenuTest1} />
          <Route exact path="/cypress-menu-test2" component={MenuTest2} />
          <Route exact path="/cypress-menu-test3" component={MenuTest3} />
          <Route exact path="/cypress-menu-test4" component={MenuTest4} />
          <Route exact path="/cypress-menu-test5" component={MenuTest5} />
          <Route exact path="/cypress-menu-test6" component={MenuTest6} />
          <Route>
            <div>
              <Header>
                <Route
                  render={({ location }) => (
                    <PrimaryNav>
                      {sections.map((l) => {
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
                    render={(props) => (
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
