// @flow
import React, { type Node } from 'react';

import { className } from '../utils';
import { SROnly } from '../primitives';

type Props = {
  children: Node,
  htmlFor: string,
  id: string,
};

const Label = (props: Props) => (
  <SROnly className={className('label')} tag="label" {...props} />
);

export default Label;
