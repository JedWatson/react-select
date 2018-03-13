import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  CustomClearIndicator
} from '../../examples';

export default function Components() {
  return (
    <Fragment>
      <Helmet>
        <title>Components - React Select</title>
        <meta
          name="description"
          content="The main feature of this library is providing consumers with the building blocks necessary to create their component."
        />
      </Helmet>
      {md`
        # Components

        The main feature of this library is providing consumers with the
        building blocks necessary to create _their_ component.

        The following components are customisable and switchable:

        ### ClearIndicator
        Indicator for clearing values in the control.


    ## Replacing Components

    React-Select allows you to augment layout and functionality by replacing
    the default components with your own, using the \`components\`
    property. These components are given all the current props and state
    letting you achieve anything you dream up.

    ### Inner Props

    All functional properties that the component needs are provided in
    \`innerProps\` which you must spread.

    ### Common Props

    Every component receives \`commonProps\` which are spread onto
    the component. These include:

    * \`clearValue\`
    * \`getStyles\`
    * \`getValue\`
    * \`hasValue\`
    * \`isMulti\`
    * \`isRtl\`
    * \`options\`
    * \`selectOption\`
    * \`setValue\`
    * \`selectProps\`

    ~~~jsx
    import React from 'react';
    import Select from 'react-select';

    const CustomOption = ({ innerProps, isDisabled }) =>
      !isDisabled ? (
        <div {...innerProps}>// your component internals</div>
      ) : null;

    class Component extends React.Component {
      render() {
        return <Select components={{ Option: CustomOption }} />;
      }
    }
    ~~~

    ## Adjusting the Styling

    The \`styles\` prop allows you to pass styles to a particular component, without
    replacing the entire component. If you only want to change styling, you should
    start by using the \`styles\` prop.

    ## Replaceable components

    ### ClearIndicator

    The indicator presented to clear the values from the component. The default
    component is a cross. The conditions under which the indicator will not be
    rendered when:

    * When \`isClearable\` is false, or when \`isMulti\` is false, and \`isClearable\` is undefined
    * When the select is disabled
    * When the select has no value
    * When the select is loading

    ${
      <ExampleWrapper
        label="CustomClearIndicator"
        urlPath="docs/examples/CustomClearIndicator.js">
        <CustomClearIndicator/>
      </ExampleWrapper>
    }

    ### Control

    The second highest level wrapper around the components. It is responsible for the
    positioning of the \`ValueContainer\` and \`IndicatorsContainer\`. It is followed
    by the Menu.

    ### Dropdown Indicator

    The indicator for opening the select, designed to indicate to users that
    this is a select. By default it is a chevron pointed down.

    ### Group

    The wrapper around each group if the Select has groups in its data. The default
    component is responsible both for mapping its options, as well as rendering
    its data into the GroupHeading.

    ### GroupHeading

    Component that renders the data of a group.

    ### IndicatorsContainer

    Wraps the indicators. This is one of the two components directly under the
    control. The indicators that \`react-select\` will check to render by are:

    * Clear Indicator
    * Loading Indicator
    * Dropdown Indicator

    ### IndicatorSeparator

    Component directly to the the inner side of the Dropdown Indicator. By default
    it is a line to act as a visual separator.

    ### Input

    Input to render when an input is required. If the select is not searchable,
    a dummy input is rendered instead. If the select is disabled, a div of the
    correct size and shape is rendered.

    All provided inputs are given aria attributes to ensure the input is accessible
    by default.

    ### LoadingIndicator

    Loading indicator to be displayed in the Indicators Container when \`isLoading]\`
    is true. By default it is three dots.

    ### Menu

    The wrapper for the dropdown menu in the select. It is responsible for wrapping
    the menu items. If you want to modify the options themselves, you should use
    the \`Option\` component.

    ### MenuList

    Inner wrapper for the menu. It directly wraps around the returned options.

    ### LoadingMessage

    Message to display in the menu when there are no options and \`isLoading\` is
    true. By default it is 'Loading...'

    ### NoOptionsMessage

    Message to be displayed in the menu if there are no options passed in.

    ### MultiValue

    Component used to display a selected option in the input when \`isMult\` is
    true. Takes responsibility for rendering the \`MultiValueContainer\`,
    \`MultiValueLabel\`, and \`MultiValueRemove\`.

    #### MultiValueContainer

    Wraps the Label and Remove in a Multi Value

    ### MultiValueLabel

    Receives the value of the option and is responsible for rendering it to the
    input.

    ### MultiValueRemove

    Receives an onClick to remove the selected item. By default it is a cross.

    ### Option

    Component responsible for displaying an option in the menu.

    ### Placeholder

    Component to be displayed in the input when nothing is selected. By default
    it is the text 'Select...'

    ### SelectContainer

    The wrapper around the entire select component.

    ### SingleValue

    The component that displays the selected value in the input for a single select.

    ### ValueContainer

    Container responsible for loading the placeholder value and the input.
    `}
  </Fragment>);
}
