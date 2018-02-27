// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { H1 } from './styled-components';

export default function NoMatch() {
  return (
    <div>
      <H1>Oops!</H1>
      <p>Couldn&apos;t find this page.</p>
      <Link to="/">Back home</Link>
    </div>
  );
}
