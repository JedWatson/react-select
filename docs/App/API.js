// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import routes from './routes';

const API = ({ match }: RouterProps) => {
  const { path, Component } = routes[match.params.section];
  return (
    <Switch>
      <Route exact path={path} component={Component} />
    </Switch>
  );
};

export default API;
