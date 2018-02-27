// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import routes from './routes';

const Section = () => {
  const routeKeys = Object.keys(routes);
  return (
    <Switch>
      {routeKeys.map(r => (
        <Route key={r} path={r} render={p => <Content {...p} />} />
      ))}
    </Switch>
  );
};

const Content = ({ location, match }: RouterProps) => {
  const pages = routes[match.path];

  return (
    <Route
      path={match.path}
      render={() => (
        <Switch>
          {pages.map(e => (
            <Route
              exact
              key={location.key}
              path={e.path}
              component={e.Component}
            />
          ))}
        </Switch>
      )}
    />
  );
};

export default Section;
