declare module 'react-node-resolver' {
  import React, { RefCallback } from 'react';

  interface Props {
    innerRef: RefCallback<HTMLElement>;
    children: React.ReactElement;
  }

  export default class NodeResolver extends React.Component<Props> {}
}
