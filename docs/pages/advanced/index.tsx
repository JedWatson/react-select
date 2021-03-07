import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  AccessingInternals,
  BasicGrouped,
  CreateFilter,
  ControlledMenu,
  CustomAriaLive,
  CustomFilterOptions,
  CustomGetOptionLabel,
  CustomGetOptionValue,
  CustomIsOptionDisabled,
  Experimental,
  MenuBuffer,
  MenuPortal,
  MultiSelectSort,
  Popout,
  OnSelectResetsInput,
} from '../../examples';

export default function Advanced() {
  return (
    <Fragment>
      <Helmet>
        <title>Advanced - React Select</title>
        <meta
          name="description"
          content="The react-select property API documentation."
        />
      </Helmet>
      {md`
      # Advanced

      ## Accessibility
      Accessibility is important. React-select is committed to providing a custom experience to all users and relies heavily on the aria-live spec to provide 
      a custom experience for all users. As such, we also provide an api to address internationalization or further customization.

      ${(
        <ExampleWrapper
          label="Custom aria live example"
          urlPath="docs/examples/CustomAriaLive.js"
          raw={require('!!raw-loader!../../examples/CustomAriaLive.js')}
        >
          <CustomAriaLive />
        </ExampleWrapper>
      )}

      ## Sortable MultiSelect
      Using the [react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc) package we can easily allow sorting of MultiSelect values by drag and drop.

      ${(
        <ExampleWrapper
          label="Sortable MultiSelect example"
          urlPath="docs/examples/MultiSelectSort.tsx"
          raw={require('!!raw-loader!../../examples/MultiSelectSort.tsx')}
        >
          <MultiSelectSort />
        </ExampleWrapper>
      )}

      ## Custom Filter logic
      While React-Select assumes a standard way of filtering the menu on search, our api allows you to customise that filtering logic in various ways.

      ### createFilter function
      React-Select exports a createFilter function that returns a filterOption method. By using this, users can pick and choose bits of the filtration logic to customise,
      without having to rewrite the logic wholesale.

      ~~~jsx
      // default filter configuration
      ignoreCase: true,
      ignoreAccents: true,
      matchFrom: 'any',
      stringify: option => \`\${option.label} \${option.value}\`,
      trim: true,
      ~~~

      Below is an example of how you could use the createFilter function to customise filtration logic in react-select.

      ${(
        <ExampleWrapper
          label="Custom filterOption with createFilter"
          urlPath="docs/examples/CreateFilter.tsx"
          raw={require('!!raw-loader!../../examples/CreateFilter.tsx')}
        >
          <CreateFilter />
        </ExampleWrapper>
      )}

      ### filterOption
      If you really would like to rewrite the filtration logic from the ground up, simply declare a new filterOption function to be passed in as a prop to react-select.
      For details on the shape of the filterOption prop, please see the proptypes in the api docs [here](/props).

      ${(
        <ExampleWrapper
          label="Custom filterOption function"
          urlPath="docs/examples/CustomFilterOptions.tsx"
          raw={require('!!raw-loader!../../examples/CustomFilterOptions.tsx')}
        >
          <CustomFilterOptions />
        </ExampleWrapper>
      )}
      ~~~jsx
      ~~~
      > Please note that if you are using a Select that is creatable, you would also likey want to include the "Create" option.
      ~~~jsx
      const filterOption = (candidate, input) => {
        return candidate.data.__isNew__ || candidate.label.includes(input);
      };
      ~~~


      ## Replacing builtins
      For a list of builtins that we expose, please see the API docs [here](/props#prop-types).

      ${(
        <ExampleWrapper
          label="custom formatGroupLabel function example"
          urlPath="docs/examples/BasicGrouped.tsx"
          raw={require('!!raw-loader!../../examples/BasicGrouped.tsx')}
        >
          <BasicGrouped />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="custom getOptionLabel function example"
          urlPath="docs/examples/CustomGetOptionLabel.tsx"
          raw={require('!!raw-loader!../../examples/CustomGetOptionLabel.tsx')}
        >
          <CustomGetOptionLabel />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="custom getOptionValue function example"
          urlPath="docs/examples/CustomGetOptionValue.tsx"
          raw={require('!!raw-loader!../../examples/CustomGetOptionValue.tsx')}
        >
          <CustomGetOptionValue />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="custom isOptionDisabled function example"
          urlPath="docs/examples/CustomIsOptionDisabled.tsx"
          raw={require('!!raw-loader!../../examples/CustomIsOptionDisabled.tsx')}
        >
          <CustomIsOptionDisabled />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="Using the style API to replace `menuBuffer`"
          urlPath="docs/examples/MenuBuffer.tsx"
          raw={require('!!raw-loader!../../examples/MenuBuffer.tsx')}
        >
          <MenuBuffer />
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

      The action argument is a string with the following possible values

      * 'select-option': Selecting an option from the list
      * 'deselect-option': (Multiple) Deselecting an option from the list
      * 'remove-value': (Multiple) Removing a selected option with the remove button
      * 'pop-value': Removing options using backspace
      * 'set-value': Calling setValue from a component without an action
      * 'clear': Removing all selected options with the clear button
      * 'create-option': (Creatable) Creating a new option

      By explicitly passing you what type of change event has been fired, we allow you to have more granular control
      over how the select behaves after an onChange even is fired.

      Below is an example of replicating the behaviour of the deprecated props from react-select v1, onSelectResetsInput and closeOnSelect

      ${(
        <ExampleWrapper
          label="onSelectResetsInput = false; closeMenuOnSelect = false"
          urlPath="docs/examples/OnSelectResetsInput.tsx"
          raw={require('!!raw-loader!../../examples/OnSelectResetsInput.tsx')}
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
          urlPath="docs/examples/MenuPortal.tsx"
          raw={require('!!raw-loader!../../examples/MenuPortal.tsx')}
        >
          <MenuPortal />
        </ExampleWrapper>
      )}

      ## Controlled Props

      ${(
        <ExampleWrapper
          label="Example of controlled MenuIsOpen"
          urlPath="docs/examples/ControlledMenu.tsx"
          raw={require('!!raw-loader!../../examples/ControlledMenu.tsx')}
        >
          <ControlledMenu />
        </ExampleWrapper>
      )}

      ## Accessing Internals
      ${(
        <ExampleWrapper
          isEditable={false}
          label="Accessing Internals via ref"
          urlPath="docs/examples/AccessingInternals.tsx"
          raw={require('!!raw-loader!../../examples/AccessingInternals.tsx')}
        >
          <AccessingInternals />
        </ExampleWrapper>
      )}

      ## SSR / Universal Rendering

      React-Select uses Emotion for CSS which has zero-config server rendering. This means that all you need to do to server-render React-Select is call React's \`renderToString\` or use a framework like Next.js or Gatsby and it will work.

      ~~~jsx
      import { renderToString } from 'react-dom/server'
      import App from './App'

      const html = renderToString(<App />)
      ~~~

      ## Experimental

      Experimental recipes of prop combinations with react-select.

      ${(
        <ExampleWrapper
          isEditable={false}
          label="Popout"
          urlPath="docs/examples/Popout.tsx"
          raw={require('!!raw-loader!../../examples/Popout.tsx')}
        >
          <Popout />
        </ExampleWrapper>
      )}

      A popular recipe for using select when there's limited real estate.

      > When \`controlShouldRenderValue\` is disabled, it's recommended to also disable \`isClearable\` and \`backspaceRemovesValue\`.

      ${(
        <ExampleWrapper
          isEditable={false}
          label="Date Picker"
          urlPath="docs/examples/Experimental.tsx"
          raw={require('!!raw-loader!../../examples/Experimental.tsx')}
        >
          <Experimental />
        </ExampleWrapper>
      )}

      This example uses a combination of custom components and functions to make react-select behave like a date picker.

      > Type a date like "25/8/18", "tomorrow", "next monday", or "6 weeks from now" into the field to get date suggestions.

    `}
    </Fragment>
  );
}
