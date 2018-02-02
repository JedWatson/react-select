// @flow

/*
NOTE: this example includes an async/await variant, which is transformed by
babel and requires babel-polyfill to be loaded. This adds 100k to the page
weight, so it's commented out for production.

If you are working on the Async component and want to test async/await make sure
you also uncomment the <script> tag in ../index.html that loads the polyfill.
*/

import React, { Component } from 'react';
import { withValue } from 'react-value';

import AsyncSelect from '../../src/Async';
import { Code, Link, H1 } from '../components';
import { colourOptions } from '../data';

const SelectWithValue = withValue(AsyncSelect);
type State = {
  inputValue: string,
};

const filterColors = (inputValue: string) =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//
// const asyncOptions = async inputValue => {
//   await delay(1000);
//   return filterColors(inputValue);
// };

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

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
          {' '}
          Use the Async component to load options from a remote source as the
          user types.{' '}
          <Link
            href="https://github.com/JedWatson/react-select/blob/v2/examples/pages/Async.js"
            target="_blank"
          >
            Source
          </Link>
        </p>
        <p>
          <Code>{"import { Async } from 'react-select'"}</Code>
        </p>

        <h2>Example</h2>
        <div>
          <h4>Using Callbacks</h4>
          <pre>inputValue: "{this.state.inputValue}"</pre>
          <SelectWithValue
            autoFocus
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onInputChange={this.handleInputChange}
          />
        </div>
        {/* <div>
          <h4>Using Async / Await</h4>
          <SelectWithValue
            cacheOptions
            defaultOptions
            loadOptions={asyncOptions}
          />
        </div> */}
        <div>
          <h4>Using Promises</h4>
          <SelectWithValue
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />
        </div>
      </div>
    );
  }
}
