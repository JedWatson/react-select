// @flow

/*
NOTE: this example includes an async/await variant, which is transformed by
babel and requires babel-polyfill to be loaded. This adds 100k to the page
weight, so it's commented out for production.

If you are working on the Async component and want to test async/await make sure
you also uncomment the <script> tag in ../index.html that loads the polyfill.
*/

import React, { Component } from 'react';
import { Code, H1 } from '../../components';
import ExampleWrapper from '../../ExampleWrapper';
import UsingCallbacks from './UsingCallbacks';
import UsingPromises from './UsingPromises';

type State = {
  inputValue: string,
};

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//
// const asyncOptions = async inputValue => {
//   await delay(1000);
//   return filterColors(inputValue);
// };

export default class App extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <H1>Async Variant</H1>
        <p>
          Use the Async component to load options from a remote source as the
          user types.
        </p>
        <p>
          <Code>{"import { Async } from 'react-select'"}</Code>
        </p>

        <ExampleWrapper
          label="Using Callbacks"
          urlPath="/docs/pages/Async/UsingCallbacks.js"
        >
          <UsingCallbacks />
        </ExampleWrapper>
        {/* <div>
          <h4>Using Async / Await</h4>
          <SelectWithValue
            cacheOptions
            defaultOptions
            loadOptions={asyncOptions}
          />
        </div> */}
        <div>
          <ExampleWrapper
            label="Using Promises"
            urlPath="/docs/pages/Async/UsingPromises.js"
          >
            <UsingPromises />
          </ExampleWrapper>
        </div>
      </div>
    );
  }
}
