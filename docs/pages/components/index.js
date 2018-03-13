// @flow
import md from '../../markdown/renderer';

export default function Components() {
  return md`
    # Components

    The main feature of this library is providing consumers with the
    building blocks necessary to create _their_ component.

    The following components are customisable and switchable:

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

    ### Control


    The highest level wrapper around the components. It is responsible for the
    positioning of the \`ValueContainer\` and \`IndicatorsContainer\`.

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

    \`\`


    Wraps the indicators. This is one of the two components directly under the
    control. The indicators that \`react-select\` will check to render by are:

    * Clear Indicator
    * Loading Indicator
    * Dropdown Indicator

    ### IndicatorSeparator

    Component directly to the the inner side 

    ### Input
    ### LoadingIndicator
    ### Menu
    ### MenuList
    ### LoadingMessage
    ### NoOptionsMessage
    ### MultiValue
    ### MultiValueContainer
    ### MultiValueLabel
    ### MultiValueRemove
    ### Option
    ### Placeholder
    ### SelectContainer
    ### SingleValue
    ### ValueContainer



  `;
}


    //
