// @flow

import type { Location, Match, RouterHistory } from 'react-router-dom';

export type RouterProps = {
  history: RouterHistory,
  location: Location,
  match: Match,
};
