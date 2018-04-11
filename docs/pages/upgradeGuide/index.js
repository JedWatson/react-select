// @flow
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';

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
        # Upgrade Guide

        With v2, we have opted to not focus on backwards compatibility as a primary concern, to allow us to bring you a more modern architecture, and rethink how to implement features. As such, v2 is unlikely to work out of the box with components written for v1.

        Below we look at first the conceptual differences to keep in mind while updating components, followed by a detailed list of how to upgrade your props for v2.

        ## Concept Shifts

        ### Rendering a hidden input

        Previously, \`react-select\` always rendered a hidden input. In this update, the hidden input is only rendered if the \`name\` prop is passed in, and will otherwise not render this.

        ### Custom Components and styling props

        Custom components have been baked into the very core of how to write selects. This takes two parts. The first is expanding the \`styles\` prop, which allows you to pass your styles through to our existing components, while having the default behaviors. The second is, if you want to opt into completely controlling a part of the select, you can pass in a react component on the \`components\` prop. For a full guide on how to do this, you can see our [components]() guide.

        This replaces the following props:

        - \`inputProps\`
        - \`inputRenderer\`
        - \`menuBuffer\`
        - \`menuContainerStyle\`
        - \`menuRenderer\`
        - \`menuStyle\`
        - \`optionClassName\`
        - \`optionComponent\`
        - \`optionRenderer\`
        - \`valueComponent\`
        - \`valueKey\`
        - \`valueRenderer\`
        - \`wrapperStyle\`
        - \`arrowRenderer\`
        - \`clearRenderer\`

        ## Prop Update Guide

        ### Unchanged

        - \`aria-describedby\`
        - \`aria-label\`
        - \`aria-labelledby\`
        - \`autoFocus\`
        - \`escapeClearsValue\`
        - \`instanceId\` - now also accepts numbers
        - \`isLoading\`
        - \`delimiter\`
        - \`onBlur\`
        - \`onFocus\`
        - \`onInputChange\` - now has a second argument return an object with the kind of action
        - \`onMenuScrollToBottom\`
        - \`options\` // Jed, is this true? BC
        - \`pageSize\`
        - \`tabSelectsValue\`
        - \`value\`

        ### Renamed props

        - \`multi\` prop has been renamed to \`isMulti\`
        - \`autoBlur\` has been renamed to \`blurInputOnSelect\`
        - \`backspaceRemoves\` renamed to \`backspaceRemovesValue\`
        - \`clearable\` has been renamed to \`isClearable\`
        - \`closeOnSelect\` has been renamed to \`closeMenuOnSelect\`
        - \`disabled\` has been renamed to \`isDisabled\`
        - \`onClose\` has been renamed to \`onMenuClose\`
        - \`onInputKeyDown\` has been renamed to \`onKeyDown\`
        - \`onOpen\` has been renamed to \`onMenuOpen\`
        - \`openOnClick\` has been renamed to \`openMenuOnFocus\`
        - \`openOnFocus\` has been renamed to \`openMenuOnClick\`
        - \`rtl\` has been renamed to \`isRtl\`
        - \`scrollMenuIntoView\` has been renamed to \`menuShouldScrollIntoView\`
        - \`searchable\` has been renamed to \`isSearchable\`

        ### Deprecated props

        - backspaceToRemoveMessage
        - clearAllText
        - clearValueText
        - \`deleteRemoves\`
        - \`autoLoad\` has been deprecated. See our new [async select]() component for a guide on how to implement async behavior in react-select v2.
        - \`autosize\` has been deprecated. You can implement auto-sizing using dynamic styling. See our [guide to styling]() for more information on how to do this.
        - \`filterOptions\` has had its functionality merged with \`filterOption\`. See our [advanced guide]() on how best to implement filters.
        - \`ignoreAccents\`
        - \`ignoreCase\`
        - 'joinValues' has been deprecated. Whether to join values is now determined by whether there is a delimiter
        - \`matchPos\` has been deprecated. See our [advanced guide]() on how best to implement filters.
        - \`matchProp\` has been deprecated. See our [advanced guide]() on how best to implement filters.
        - \`trimFilter\` has been deprecated. See our [advanced guide]() on how best to implement filters.
        - \`noResultsText\` has been deprecated. The new [noOptionsMessage]() fulfills the same function.
        - \`onBlurResetsInput\`
        - \`onCloseResetsInput\`
        - \`onSelectResetsInput\`
        - \`removeSelected\` has been deprecated // There should be a way to resolve this but I don't know what it is BC
        - \`required\`
        - \`searchPromptText\`
        - \`simpleValue\`
        - \`tabIndex\`
        - \`inputProps\` has had its functionality subsumed into our [components API]()
        - \`inputRenderer\` has had its functionality subsumed into our [components API]()
        - \`menuBuffer\` has had its functionality subsumed into our [components API]()
        - \`menuContainerStyle\` has had its functionality subsumed into our [components API]()
        - \`menuRenderer\` has had its functionality subsumed into our [components API]()
        - \`menuStyle\` has had its functionality subsumed into our [components API]()
        - \`optionClassName\` has had its functionality subsumed into our [components API]()
        - \`optionComponent\` has had its functionality subsumed into our [components API]()
        - \`optionRenderer\` has had its functionality subsumed into our [components API]()
        - \`valueComponent\` has had its functionality subsumed into our [components API]()
        - \`valueKey\` has had its functionality subsumed into our [components API]()
        - \`valueRenderer\` has had its functionality subsumed into our [components API]()
        - \`wrapperStyle\` has had its functionality subsumed into our [components API]()
        - \`arrowRenderer\` has had its functionality subsumed into our [components API]()
        - \`clearRenderer\` has had its functionality subsumed into our [components API]()

        ### Props you need to update

        - \`filterOption\` now fulfills the role of \`filterOptions\` previously, and takes advantage of \`createFilter\` helper function. See our [advanced guide]() on how best to implement filters.
        - \`name\` Set the name of a hidden \`input\` field. If no value is passed to name, the hidden input will no longer be rendered.
        - \`onChange\` | function | undefined | onChange handler: \`function(newOption) {}\` |
        - \`placeholder\` previously accepted a node, and now only accepts string


        ## I still don't know what to do with these - BC


        - className
        | \`id\` | string | undefined | html id to set on the input element for accessibility or tests
        | \`labelKey\` | string | 'label' | the option property to use for the label |
        | \`onValueClick\` | function | undefined | onClick handler for value labels: \`function (value, event) {}\` |
        | \`resetValue\` | any | null | value to set when the control is cleared |
        | \`style\` | object | undefined | optional styles to apply to the control |


        # Questions I now have
        Why is autoBlur now \`blurInputOnSelect\`, but \`autoFocus\` remains the same?
        We should have an example of implementing autosize?
        WHY ARE ALL THE PROPS SHOWN AS REQUIRED DEAR GOD RESOLVE THIS (probably on me)
        id and inputValue have the same description tsk tsk


        ### Async Components

        Async components are handled by a new HoC around the new select, which has a new API. You can find the documentation of this [here]().

        #### Creatable properties

        Creatable components are handled by a new HoC around the new select, which has a new API. You can find the documentation of this [here]().

    `}
  </Fragment>);
}
