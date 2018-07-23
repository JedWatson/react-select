// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import routes from './routes';

const Guide = ({ match }: RouterProps) => {
  const { path, Component } = routes[match.params.guide];
  return (
    <Switch>
      <Route exact path={path} component={Component} />
    </Switch>
  );
};

export default Guide;
