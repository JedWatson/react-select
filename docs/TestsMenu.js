// @flow

import * as React from 'react';
import Select from 'react-select';
import { stateOptions } from './data';
import { H1, H2, Note, ScrollContainer } from './styled-components';

const defaultSelectProps = {
  maxMenuHeight: 250,
  classNamePrefix: 'react-select',
  placeholder: 'Choose a state…',
  options: stateOptions,
};

export default function TestsMenu() {
  return (
    <div
      style={{
        margin: 'auto',
        maxWidth: 440,
        padding: 20,
      }}
    >
      <H1>Test Page for React-Select Menus</H1>
      <H2>Inside scroll containers</H2>

      <div data-cy="case-default">
        <h3>Default, plenty of height</h3>
        <ScrollContainer height={defaultSelectProps.maxMenuHeight + 100}>
          <Select {...defaultSelectProps} />
        </ScrollContainer>
        <Note>
          Nothing special going on here, just the base case of opening a menu in
          a scroll container
        </Note>
      </div>

      <div data-cy="case-expand-down">
        <h3>Expand and Scroll Down</h3>
        <ScrollContainer height={400}>
          <div style={{ height: 300 }} />
          <Select {...defaultSelectProps} />
        </ScrollContainer>
        <Note>
          If the menu doesn’t have enough room to open down, by default the
          container should expand down
        </Note>
      </div>
    </div>
  );
}
