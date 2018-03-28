// @flow

import React from 'react';
import { Props } from '@atlaskit/docs';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  AsyncCallbacks,
  AsyncMulti,
  AsyncPromises,
} from '../../examples';

export default md`
# Async

~~~jsx
import Async from 'react-select/lib/Async';
~~~

Use the Async component to load options asynchronously as the user searches.

## Usage

We can load options asynchronously by **returning the Promise** from loadOptions function prop or by **calling the callback argument with options** that is passed to loadOptions function prop.

First argument passed to the loadOptions function prop is the search string(**inputValue**) user has typed in Async select. Second argument is the callback we can call with options
to load, we can ignore the second argument if returning a Promise from loadOptions prop funciton.

${(
  <ExampleWrapper
    label="With Callbacks"
    urlPath="docs/examples/AsyncCallbacks.js"
    raw={require('!!raw-loader!../../examples/AsyncCallbacks.js')}
  >
    <AsyncCallbacks />
  </ExampleWrapper>
)}

TL;DR:

~~~jsx
<Async
  loadOptions={makeCallAndloadOptions}
/>

// In your component
makeCallAndloadOptions = (searchString, callback) => {
  fetch('myremoteURL')
    .then(options => options.filter(option => option.label.indexOf(searchString) > -1 ))
    .then(filteredOptions => callback(filteredOptions));
}
~~~

${(
  <ExampleWrapper
    label="With Promises"
    urlPath="docs/examples/AsyncPromises.js"
    raw={require('!!raw-loader!../../examples/AsyncPromises.js')}
  >
    <AsyncPromises />
  </ExampleWrapper>
)}

TL;DR:

~~~jsx
<Async
  loadOptions={makeCallAndloadOptions}
/>

// In your component
makeCallAndloadOptions = searchString => 
  new Promise(resolve => {
    fetch('myremoteURL')
    .then(options => options.filter(option => option.label.indexOf(searchString) > -1 ))
    .then(filteredOptions => resolve(filteredOptions));
  })
~~~

${(
  <ExampleWrapper
    label="Async MultiSelect"
    urlPath="docs/examples/AsyncMulti.js"
    raw={require('!!raw-loader!../../examples/AsyncMulti.js')}
  >
    <AsyncMulti/>
  </ExampleWrapper>
)}

## API

These props are included with in both the Async and AsyncCreatable select.

${<Props shouldCollapseProps heading="" props={require('!!extract-react-types-loader!../../PropTypes/Async')} />}
`;

