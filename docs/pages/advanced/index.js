// @flow
import React from 'react';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  OnSelectResetsInput,
  BasicGrouped,
  CreateFilter,
  CustomFilterOptions,
  CustomGetOptionLabel,
  CustomIsOptionDisabled,
  Experimental,
  MenuPortal,
} from '../../examples';

export default function Advanced() {
  return md`
    # Advanced

    ## Custom Filter logic
    While React-Select assumes a standard way of filtering the menu on search, our api allows you to customise that filtering logic in various ways.

    ### createFilter function
    React-Select exports a createFilter function that returns a filterOptions method. By using this, users can pick and choose bits of the filtration logic to customise,
    without having to rewrite the logic wholesale.

    Below is an example of how you could use the createFilter function to customise filtration logic in react-select.

    ${(
      <ExampleWrapper
        label="Custom filterOptions with createFilter"
        urlPath="docs/examples/CreateFilter.js"
        raw={require('!!raw-loader!../../examples/CreateFilter.js')}
      >
        <CreateFilter />
      </ExampleWrapper>
    )}

    ### filterOptions
    If you really would like to rewrite the filtration logic from the ground up, simply declare a new filterOptions function to be passed in as a prop to react-select.
    For details on the shape of the filterOptions prop, please see the proptypes in the api docs [here](/api#prop-types).

    ${(
      <ExampleWrapper
        label="Custom filterOptions with createFilter"
        urlPath="docs/examples/CreateFilter.js"
        raw={require('!!raw-loader!../../examples/CreateFilter.js')}
      >
        <CustomFilterOptions />
      </ExampleWrapper>
    )}

    ## Replacing builtins
    For a list of builtins that we expose, please see the API docs [here](/api#prop-types).

    ${(
      <ExampleWrapper
        label="custom formatGroupLabel function example"
        urlPath="docs/examples/BasicGrouped.js"
        raw={require('!!raw-loader!../../examples/BasicGrouped.js')}
      >
        <BasicGrouped />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper
        label="custom getOptionLabel function example"
        urlPath="docs/examples/CustomSingleValue.js"
        raw={require('!!raw-loader!../../examples/CustomSingleValue.js')}
      >
        <CustomGetOptionLabel />
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper label="custom getOptionValue function example">
        <div>Coming Soon!</div>
      </ExampleWrapper>
    )}

    ${(
      <ExampleWrapper label="custom isOptionDisabled function example">
        <CustomIsOptionDisabled />
      </ExampleWrapper>
    )}

    ## Action Meta
    React Select exposes a variety of eventListeners to you via props.
    The onchange function prop now has the following signature.
    (value: ValueType, action: ActionType) => undefined;

    The action argument is a string twith the following possible values

    'select-option'
    'deselect-option'
    'remove-value'
    'pop-value'
    'set-value'
    'clear'
    'create-option'

    By explicitly passing you what type of change event has been fired, we allow you to have more granular control
    over how the select behaves after an onChange even is fired.

    Below is an example of replicating the behaviour supported by the (deprecated) onSelectResetsInput and (deprecated) closeMenuOnSelect props in react-select v1

    ${(
      <ExampleWrapper
        label="onSelectResetsInput = false; closeMenuOnSelect = false"
        urlPath="docs/examples/OnSelectResetsInput.js"
        raw={require('!!raw-loader!../../examples/OnSelectResetsInput.js')}
      >
        <OnSelectResetsInput />
      </ExampleWrapper>
    )}

    ## Portaling
    React-select exposes a menuPortalTarget prop, that lets you portal the select menu to a dom node of your choosing.
    Additionally we expose the menuPortal styles for layering purposes.

    ${(
      <ExampleWrapper
        isEditable={false}
        label="Example of Portaling"
        urlPath="docs/examples/MenuPortal.js"
        raw={require('!!raw-loader!../../examples/MenuPortal.js')}
      >
        <MenuPortal />
      </ExampleWrapper>
    )}


    ## Experimental

    Wild experiments with react-select v2

    ${(
      <ExampleWrapper
        isEditable={false}
        label="Date Picker"
        urlPath="docs/examples/Experimental.js"
        raw={require('!!raw-loader!../../examples/Experimental.js')}
      >
        <Experimental />
      </ExampleWrapper>
    )}

    > This example uses a combination of custom components and functions to make react-select behave like a date picker.

    > Type a date like "25/8/18", "tomorrow", "next monday", or "6 weeks from now" into the field to get date suggestions.

  `;
}
