// @flow
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';

const componentLink = '/components';
const advancedLink = '/advanced';
const asyncLink = '/async';
const stylesLink = '/styles';
const creatableLink = '/creatable';

export default function UpgradeGuide() {
  return (
    <Fragment>
      <Helmet>
        <title>API - React Select</title>
        <meta name="description" content="React-select v2 Upgrade Guide" />
      </Helmet>
      {md`
# Upgrade guide

React-select v2 is a complete rewrite, and includes some major changes:

* The architecture has been cleaned up
* Many redundant props have been removed
* Several major features have been added (including option groups!)
* The custom component API has been reinvented and is much more consistent
* Styles are now implemented with css-in-js rather than less / scss stylesheets

With that in mind, we've tried to make the upgrade as easy as possible. How
complex the upgrade is will depend on how much you have customised react-select.

We've also done our best to keep feature parity with v1, either through
continuing to support props or by providing another way to achieve the same
result.

## Concepts

### Controllable Props and defaults

In v2, there are three optional props you can use to control the state of the
component:

* \`value\` controls the select value
* \`inputValue\` controls the search input value
* \`menuIsOpen\` controls whether the menu is open

You can use none, any, or all of these depending on your requirements.

The props have associated events that are called when the value should change.
Here's an example implementation of all three:

\`\`\`js
<Select
  value={this.state.value}
  onChange={(value) => this.setState({ value })}
  inputValue={this.state.inputValue}
  onInputChange={(inputValue) => this.setState({ inputValue })}
  menuIsOpen={this.state.menuIsOpen}
  onMenuOpen={() => this.setState({ menuIsOpen: true })}
  onMenuClose={() => this.setState({ menuIsOpen: false })}
/>
\`\`\`

If you don't use the controlled props, react-select has props that let you
default their value when it mounts:

\`\`\`js
<Select
  defaultValue={{ label: 'Default Option', value: 'default-value' }}
  defaultInputValue="Search Text"
  defaultMenuIsOpen={true}
/>
\`\`\`

For more information, see
[controlled components](https://reactjs.org/docs/forms.html#controlled-components)
and [uncontrolled components] (https://reactjs.org/docs/uncontrolled-components.html)
in the React docs.

### Action Meta

The \`onChange\` prop is now passed a second argument, which contains meta about
why the event was called. For example:

\`\`\`js
onChange = (newValue, actionMeta) => console.log(actionMeta);
// possible values:
{ action: 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option' }
\`\`\`

The new \`onInputChange\` prop also passes actionMeta:

\`\`\`js
onInputChange = (newValue, actionMeta) => console.log(actionMeta);
// possible values:
{ action: 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close' }
\`\`\`

## New Styles API

Where v1 included LESS / SCSS stylesheets and applied styles using classNames,
v2 uses css-in-js to apply styles. This gives you complete control over how
the control looks, but is a significant change.

Each component that react-select renders has a corresponding key that you can
specify in the \`styles\` prop. Each value you provide should be a function that
takes the default styles, and returns your customised style object.

For example, to give the control a white background:

\`\`\`js
styles={{
  control: (base) => ({ ...base, color: 'white' })
}}
\`\`\`

See the [Styles Documentation](${stylesLink}) for more details and examples.

This means the following props have been removed, and their use-cases should now
be handled with the new styles API:

- \`menuContainerStyle\`
- \`menuStyle\`
- \`optionClassName\`
- \`wrapperStyle\`

### Using classNames

If you provide the \`className\` prop to react-select, all inner elements will
be given a className based on the one you have provided.

For example, given \`className="react-select"\`, the DOM would roughtly look
like this:

\`\`\`html
<div class="react-select">
  <div class="react-select__control">
    <div class="react-select__value-container">...</div>
    <div class="react-select__indicators">...</div>
  </div>
  <div class="react-select__menu">
    <div class="react-select__menu-list">
      <div class="react-select__option">...</div>
    </div>
  </div>
</div>
\`\`\`


### Custom Components and styling

Custom components have been baked into the very core of how to write
selects. This takes two parts. The first is expanding the \`styles\` prop,
which allows you to pass your styles through to our existing components,
while having the default behaviors. Information on using the new \`styles\`
prop can be found [here](${stylesLink}). The second is, if you want to opt
into completely controlling a part of the select, you can pass in a react
component on the \`components\` prop. For a full guide on how to do this,
you can see our [components](${componentLink}) guide.

This replaces the following props:

- \`inputProps\`
- \`inputRenderer\`
- \`menuBuffer\`

- \`menuRenderer\`


- \`optionComponent\`
- \`optionRenderer\`
- \`valueComponent\`
- \`valueKey\`
- \`valueRenderer\`

- \`arrowRenderer\`
- \`clearRenderer\`

## Prop Update Guide

### Unchanged

- \`aria-describedby\`
- \`aria-label\`
- \`aria-labelledby\`
- \`autoFocus\`
- \`className\`
- \`escapeClearsValue\`
- \`instanceId\`
- \`isLoading\`
- \`delimiter\`
- \`name\`
- \`onBlur\`
- \`onFocus\`
- \`onInputChange\`
- \`onMenuScrollToBottom\`
- \`options\`
- \`pageSize\`
- \`tabIndex\`
- \`tabSelectsValue\`
- \`value\`
- \`id\`

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

### Removed props

- \`clearAllText\`
- \`clearValueText\`
- \`deleteRemoves\`
- \`autoLoad\` - see our new [async select](${asyncLink})
component for a guide on how to implement async behavior in react-select v2.
- \`autosize\` has been deprecated. You can implement auto-sizing using
dynamic styling. See our [guide to styling](${stylesLink}) for more information
on how to do this.
- \`filterOptions\` has had its functionality merged with \`filterOption\`.
See our [advanced guide](${advancedLink}) on how best to implement filters.
- \`ignoreAccents\`
- \`ignoreCase\`
- 'joinValues' has been deprecated. Whether to join values is now
determined by whether there is a delimiter
- \`matchPos\` has been deprecated. See our [advanced guide](${advancedLink}) on how
best to implement filters.
- \`matchProp\` has been deprecated. See our [advanced guide](${advancedLink}) on how
best to implement filters.
- \`trimFilter\` has been deprecated. See our [advanced guide](${advancedLink}) on how
best to implement filters.
- \`noResultsText\` has been deprecated. The new
[noOptionsMessage](/props/#select-props/#noOptionsMessage) prop
fulfills the same function.
- \`onBlurResetsInput\`
- \`onCloseResetsInput\`
- \`onSelectResetsInput\`
- \`removeSelected\` has been deprecated // Jed: There should be a way to
resolve this but I don't know what it is BC
- \`searchPromptText\`
- \`simpleValue\`
- \`style\`
- \`inputProps\` has had its functionality subsumed into our [components API](${componentLink})
- \`inputRenderer\` has had its functionality subsumed into our [components API](${componentLink})
- \`menuBuffer\` has had its functionality subsumed into our [components API](${componentLink})
- \`menuContainerStyle\` has had its functionality subsumed into our [components API](${componentLink})
- \`menuRenderer\` has had its functionality subsumed into our [components API](${componentLink})
- \`menuStyle\` has had its functionality subsumed into our [components API](${componentLink})
- \`optionClassName\` has had its functionality subsumed into our [components API](${componentLink})
- \`optionComponent\` has had its functionality subsumed into our [components API](${componentLink})
- \`optionRenderer\` has had its functionality subsumed into our [components API](${componentLink})
- \`valueComponent\` has had its functionality subsumed into our [components API](${componentLink})
- \`valueKey\` has had its functionality subsumed into our [components API](${componentLink})
- \`valueRenderer\` has had its functionality subsumed into our [components API](${componentLink})
- \`wrapperStyle\` has had its functionality subsumed into our [components API](${componentLink})
- \`arrowRenderer\` has had its functionality subsumed into our [components API](${componentLink})
- \`clearRenderer\` has had its functionality subsumed into our [components API](${componentLink})

## WIP

- \`backspaceToRemoveMessage\`
- \`required\`

### Props you need to update

- \`filterOption\` now fulfills the role of \`filterOptions\` previously,
and takes advantage of \`createFilter\` helper function. See our
[advanced guide](${advancedLink}) on how best to implement filters.

- \`onChange\` is now called with much more complicated options. See above
for a guide on updating your onChange functions.
- \`placeholder\` previously accepted a node, and now only accepts string
- \`style\` now has a different shape. See the [styles](${stylesLink}) guide
for more information.

## TODO

- \`labelKey\` | string | 'label' | the option property to use for the label |
- \`onValueClick\` | function | undefined | onClick handler for value labels: \`function (value, event) {}\` |
- \`resetValue\` | any | null | value to set when the control is cleared |

## Async Components

Async components are handled by a new HoC around the new select, which
has a new API. You can find the documentation of this [here](${asyncLink}).

## Creatable Components

Creatable components are handled by a new HoC around the new select,
which has a new API. You can find the documentation of this [here](${creatableLink}).

    `}
    </Fragment>
  );
}
