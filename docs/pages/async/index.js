// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import Docs from './Docs';

export default function Async() {
  return (
    <Fragment>
      <Helmet>
        <title>Async - React Select</title>
        <meta
          name="description"
          content="The react-select Async Component."
        />
      </Helmet>
      {Docs}
    </Fragment>
  );
};
