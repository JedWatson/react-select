// @flow
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import routes from './routes';

const Section = () => {
  const routeKeys = Object.keys(routes);
  return (
    <Switch>
      {routeKeys.map(r => (
        <Route key={r} path={r} render={p => <Content {...p} />} />
      ))}
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

const Content = ({ location, match }: RouterProps) => {
  const page = routes[match.path];

  return (
    <Route
      path={match.path}
      render={() => (
        <Switch>
          <Route exact key={location.key} path={match.path} component={page} />
        </Switch>
      )}
    />
  );
};

export default Section;
