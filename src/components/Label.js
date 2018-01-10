// @flow
import React, { type Node } from 'react';

import { SROnly } from '../primitives';

type Props = {
  children: Node,
  htmlFor: string,
  id: string,
};

const Label = (props: Props) => <SROnly tag="label" {...props} />;

export default Label;
