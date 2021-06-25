import React from 'react';
import ExampleWrapper from '../../ExampleWrapper';
import md from '../../markdown/renderer';
import {
  AsyncCallbacks,
  AsyncPromises,
  AnimatedMulti,
  BasicSingle,
  BasicGrouped,
  BasicMulti,
  CreatableSingle,
  FixedOptions,
  StyledMulti,
  StyledSingle,
} from '../../examples';

export default function Home() {
  return md`
  # Welcome

  Each of the examples below is an interactive example of react-select.

  See the source or open the examples on codesandbox using the buttons that appear when you hover over each select below.

  For complete docs, see the [Props API](/props) and [Advanced Usage](/advanced).

  If you're coming from react-select v1, check out the [Upgrade Guide](/upgrade-guide).

  To contribute, or open an issue, check out the [source code on GitHub](https://github.com/JedWatson/react-select).

  ${(
    <ExampleWrapper
      label="Single"
      urlPath="docs/examples/BasicSingle.tsx"
      raw={require('!!raw-loader!../../examples/BasicSingle.tsx')}
    >
      <BasicSingle />
    </ExampleWrapper>
  )}

  ${(
    <ExampleWrapper
      label="Multi"
      urlPath="docs/examples/BasicMulti.tsx"
      raw={require('!!raw-loader!../../examples/BasicMulti.tsx')}
    >
      <BasicMulti />
    </ExampleWrapper>
  )}

`;
}
