// @flow

import React, { Component } from 'react';

import { Code, H1 } from '../styled-components';

export default class APIMethods extends Component<*> {
  render() {
    return (
      <div>
        <H1>Methods</H1>
        <p>
          <Code>focus()</Code> focused the control.
        </p>
      </div>
    );
  }
}
