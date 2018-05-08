// @flow
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  AccessingInternals,
  ControlledMenu,
  OnSelectResetsInput,
  BasicGrouped,
  CreateFilter,
  CustomFilterOptions,
  CustomGetOptionLabel,
  CustomIsOptionDisabled,
  Experimental,
  MenuPortal,
} from '../../examples';

import AutoFocus from '../../examples/AutoFocus';
import ActionMeta from '../../examples/ActionMeta';
import PageSize from '../../examples/PageSize';

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

        ${(
          <ExampleWrapper
            isEditable={false}
            label="Example of controlled MenuIsOpen"
            urlPath="docs/examples/ControlledMenu.js"
            raw={require('!!raw-loader!../../examples/ControlledMenu.js')}
          >
            <ControlledMenu />
          </ExampleWrapper>
        )}

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

        ## Additional Usages

        The selected number will determine how many items will be navigated in the
        select on a page up or page down button press.

        ${
          <ExampleWrapper
            label="Page Size"
            urlPath="docs/examples/PageSize.js"
            raw={require('!!raw-loader!../../examples/PageSize.js')}
          >
            <PageSize />
          </ExampleWrapper>
        }

        ### ActionMeta

        The actionMeta allows you to respond to particular actions on the select.
        This more centralised control means you can switch on how you handle \`onInputChange\`
        events.

        Below is an example of implementing disabling clearing the select on blur,
        on select, and on menu close.

        Note that an \`onInputChange\` event is called for both \`'input-blur'\`
        and \`'set-value'\`, it will by default be followed by a \`'menu-close'\` event.
        For this reason, if the input is cleard on \`'menu-close'\`, it will effectively
        override leaving the input on the other two events.

        ${
          <ExampleWrapper
            label="Action Meta"
            urlPath="docs/examples/ActionMeta.js"
            raw={require('!!raw-loader!../../examples/ActionMeta.js')}
          >
            <ActionMeta />
          </ExampleWrapper>
        }

        ${
          <ExampleWrapper
            label="Demonstrate Autofocus Functionality"
            urlPath="docs/examples/AutoFocus.js"
            raw={require('!!raw-loader!../../examples/AutoFocus.js')}

          >
            <AutoFocus />
          </ExampleWrapper>
        }

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

    `}
  </Fragment>);
}
