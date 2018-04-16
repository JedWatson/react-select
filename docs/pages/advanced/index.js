// @flow
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import SelectMsgTextDocs from './SelectMsgText';
import {
  AccessingInternals,
  BasicGrouped,
  ControlledDefaultValues,
  ControlledEventHooks,
  ControlledValues,
  CreateFilter,
  CustomFilterOptions,
  CustomGetOptionLabel,
  CustomIsOptionDisabled,
  Experimental,
  MenuPortal,
  OnSelectResetsInput,
} from '../../examples';

export default function Advanced () {
  return (
    <Fragment>
      <Helmet>
        <title>API - React Select</title>
        <meta
          name="description"
          content="The react-select property API documentation."
        />
      </Helmet>
      {md`
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
          urlPath="docs/examples/CustomFilterOptions.js"
          raw={require('!!raw-loader!../../examples/CustomFilterOptions.js')}
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
        <ExampleWrapper
          label="custom isOptionDisabled function example"
          raw={require('!!raw-loader!../../examples/CustomIsOptionDisabled.js')}
          >
          <CustomIsOptionDisabled />
        </ExampleWrapper>
      )}

      ## Methods

      These two methods sit as callable methods on the component. They are designed
      to be accessible to wrapping components.

      ### \`focus()\`

      Focused the internal control input.

      ### \`blur()\`

      Blur the internal control input.

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

      ## Controlled Props

      React-Select exposes a variety of props that you can either specify to explicitly control behaviour, or leave for react-select to manage.
      Each has a value, a default value and associated event props:

      #### Value
      + value: Object: The selected value
      + onchange
      + defaultValue

      #### Input Value
      + inputvalue - String: The input value
      + onInputChange
      + defaultInputValue

      #### Menu Is Open
      + menuIsOpen - Boolean: Whether or not the menuIsOpen
      + onMenuOpen
      + onMenuClose
      + defaultMenuIsOpen


      ### Controlled Default Values
      As documented above, we expose a variety of default values for you to configure.
      These values are:

      + defaultValue
      + defaultInputValue
      + defaultMenuIsOpen

      For example, if you decided you wanted the menu to be open on initial render, you would configure the select like so:

      ~~~js
      const MyComponent = () => (
        <Select
          defaultMenuIsOpen
          options={options}
        />
      )
      ~~~

      Note that after initial render, any additional interactions with the menu will fallback to using the internal state.
      For a way to explicitly take control of menu state please see the Controlled Values section below.

      ${(
        <ExampleWrapper
          label={'Example'}
          isEditable={false}
          urlPath="docs/examples/ControlledDefaultValues.js"
          raw={require('!!raw-loader!../../examples/ControlledDefaultValues.js')}
        >
          <ControlledDefaultValues />
        </ExampleWrapper>
      )}

      ### Controlled Values
      Along with controlled default values, we also support configuration of controlled values.
      Once these props are assigned values, the user has now opted into managing these values, and react-select no longer manages these values internally.

      For example, if you decided you wanted to take control of menuIsOpen, your base configuration would look something like this.


      ~~~jsx
      class MyControlledSelect extends Component {

        onMenuOpen = (event) => {
          this.setState({ menuIsOpen: true });
        }

        onMenuClose = (event) => {
          this.setState({ menuIsOpen: false });
        }

        doSomethingThenOpenTheMenu = (event) => {
          // DO SOMETHING
          this.onMenuOpen(event);
        }

        render() {
          return (
            <Fragment>
              <Select
                menuIsOpen={this.state.menuIsOpen}
                options={options}
                onMenuOpen={this.onMenuOpen}
                onMenuClose={this.onMenuClose}
              />
              <button
                onClick={this.doSomethingThenOpenTheMenu}
              >
                Do something then open the menu
              </button>
            </Fragment>
          )
        }
      }
      ~~~
      ${(
        <ExampleWrapper
          label={'Example'}
          isEditable={false}
          urlPath="docs/examples/ControlledValues.js"
          raw={require('!!raw-loader!../../examples/ControlledValues.js')}
        >
          <ControlledValues />
        </ExampleWrapper>
      )}


      ## Event Action Meta
      As touched on in the examples above, react-select also provides an assortment of event hooks as props.
      These hooks are designed to allow you to easily replicate default behaviour with controlled values (see above),
      as well as provide the opportunity to add custom behaviour to common select events (for example after an input change, or after a value selection).
      We cover this in more detail in the 'action meta' section.

      Below is an example of a controlled Select where we use a combination of controlled values and event hooks to replicate default behaviour, and provide additional useful
      functionality.

      ${(
        <ExampleWrapper
          label={'Example'}
          isEditable={false}
          urlPath="docs/examples/ControlledEventHooks.js"
          raw={require('!!raw-loader!../../examples/ControlledEventHooks.js')}
        >
          <ControlledEventHooks />
        </ExampleWrapper>
      )}
      
      ## Custom Select Messages
      ${<SelectMsgTextDocs />}

      ## Accessing Internals
      ${(
        <ExampleWrapper
          isEditable={false}
          label="Accessing Internals via ref"
          urlPath="docs/examples/Experimental.js"
          raw={require('!!raw-loader!../../examples/AccessingInternals.js')}
        >
          <AccessingInternals />
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

    `
    }

  </Fragment>);
}
