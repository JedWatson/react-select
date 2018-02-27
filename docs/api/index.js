// @flow

import React from 'react';
import md from 'react-markings';

import ContentBlock from '../ContentBlock';
// import Experimental from './Experimental';

import { InternalTypes, PropTypes } from './examples';

export default function Api() {
  return (
    <ContentBlock>{md`
      # API

      ## Methods

      ### \`focus()\`

      Focused the internal control input.

      ## Prop Types

      ### Internal Types

      You'll see these in the public props below:

      ${<InternalTypes />}

      ### Public Props

      ${<PropTypes />}

    `}</ContentBlock>
  );
}
