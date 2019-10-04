// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';

import PropChanges from './props';

export default function UpgradeGuide() {
  return (
    <Fragment>
      <Helmet>
        <title>React Select v1.x -> 2.x Upgrade Guide</title>
        <meta name="description" content="React-select v2 Upgrade Guide" />
      </Helmet>
      {md`
# Upgrade guide

> This guide is a work in progress. Please [open an issue](https://github.com/jedwatson/react-select/issues)
> if you need something clarified, or [submit a PR](https://github.com/jedwatson/react-select/pulls)
> if you have an improvement!

React-select v2 is a complete rewrite, and includes some major changes:

* The architecture has been cleaned up
* Many redundant props have been removed
* Several major features have been added (including option groups!)
* The custom component API has been reinvented and is much more consistent
* Styles are now implemented with css-in-js rather than less / scss stylesheets
* Support for option groups has been added 🎉
* You can use any shape of data in your options array, and control how they are
  handled by providing custom functions

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

~~~js
<Select
  value={this.state.value}
  onChange={value => this.setState({ value })}
  inputValue={this.state.inputValue}
  onInputChange={inputValue => this.setState({ inputValue })}
  menuIsOpen={this.state.menuIsOpen}
  onMenuOpen={() => this.setState({ menuIsOpen: true })}
  onMenuClose={() => this.setState({ menuIsOpen: false })}
/>
~~~

If you don't use the controlled props, react-select has props that let you
default their value when it mounts:

~~~js
<Select
  defaultValue={{ label: 'Default Option', value: 'default-value' }}
  defaultInputValue="Search Text"
  defaultMenuIsOpen={true}
/>
~~~

For more information, see
[controlled components](https://reactjs.org/docs/forms.html#controlled-components)
and [uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html)
in the React docs.

### Action Meta

The \`onChange\` prop is now passed a second argument, which contains meta about
why the event was called. For example:

~~~js
onChange = (newValue, actionMeta) => console.log(actionMeta);
// possible values:
{
  action: 'select-option' |
    'deselect-option' |
    'remove-value' |
    'pop-value' |
    'set-value' |
    'clear' |
    'create-option';
}
~~~

The new \`onInputChange\` prop also passes actionMeta:

~~~js
onInputChange = (newValue, actionMeta) => console.log(actionMeta);
// possible values:
{
  action: 'set-value' | 'input-change' | 'input-blur' | 'menu-close';
}
~~~

### Options Data

You can now provide option data in any shape you like, without conforming to the
expected \`{ label, value }\` keys.

This means the \`labelKey\` and \`valueKey\` props are no longer supported.

Instead, you can use the following props to customise how react-select deals
with your options:

~~~
<Select
  filterOption={(option: {}, inputValue: string) => boolean}
  formatOptionLabel={(option: {}, context: {} ) => Node}
  getOptionLabel={(option: {}) => string}
  getOptionValue={(option: {}) => string}
  isOptionDisabled={(option: {}, value: [{}]) => boolean}
  isOptionSelected?={(option: {}, value: [{}]) => boolean}
/>
~~~

## New Styles API

Where v1 included LESS / SCSS stylesheets and applied styles using classNames,
v2 uses css-in-js to apply styles. This gives you complete control over how
the control looks, but is a significant change.

Each component that react-select renders has a corresponding key that you can
specify in the \`styles\` prop. Each value you provide should be a function that
takes the default styles, and returns your customised style object.

For example, to give the control a white background:

~~~js
styles={{
  control: (base) => ({ ...base, color: 'white' })
}}
~~~

See the [Styles Documentation](/styles) for more details and examples.

This means the following props have been removed, and their use-cases should now
be handled with the new styles API:

* \`menuContainerStyle\`
* \`menuStyle\`
* \`optionClassName\`
* \`wrapperStyle\`

### Using classNames

If you provide the \`classNamePrefix\` prop to react-select, all inner elements will
be given a className based on the one you have provided.

For example, given \`classNamePrefix="react-select"\`, the DOM would roughly look
like this:

~~~html
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
~~~

## New Components API

React-select v1 had several props that would allow you to render specific parts
of the UI, or specify your own custom components.

In v2, we've doubled down on this approach and introduced a new \`components\`
prop that lets you replace any part of react-select.

For example, to render a custom \`Option\` component:

~~~js
components={{
  Option: ({ children, innerProps }) => (
    <div className="custom-option" ref={innerRef} {...innerProps}>
      {children}
    </div>
  )
}}
~~~

All components are passed a set of common props. The most important to
understand are:

* \`children\` - if the component should contain other components (for example,
  a menu contains options) they will be passed as children. This way you don't
  need to re-implement more than you absolutely need to.
* \`innerProps\` - a set of props that should be spread onto the DOM element
  your component returns. It wires up accessibility attributes and events.
* \`getStyles\` - a function that will return an object containing the styles
  for the component. If you have specified custom style modifiers, they will be
  executed by this function.
* \`innerRef\` - additional some components need to expose a ref to
  the base Select component, to facilitate internally managed behaviour.
  We specify this as innerRef to avoid collision with React's reserved \`ref\`
  keyword when we spread props.

Aside from innerRef (where applicable), you don't _have_ to use these props, and are free to implement whatever - but
they are intended to help make custom implementations easier to manage.

See the [Components Documentation](/components) for more details and
examples.

This means the following props have been removed, and their use-cases should now
be handled with the new components API:

* \`inputProps\`
* \`inputRenderer\`
* \`menuRenderer\`
* \`optionComponent\`
* \`optionRenderer\`
* \`valueComponent\`
* \`valueRenderer\`
* \`arrowRenderer\`
* \`clearRenderer\`

## Filtering

Where react-select v1 had several props for controlling how options are
filtered, v2 simply expects you to provide a function that tests each option
against the input value.

The new export \`createFilter\` allows you to easily create a filter function
that implements the same options previously available as props to react-select.

For example:

~~~js
import Select, { createFilter } from 'react-select';

const customFilter = createFilter({
  ignoreCase?: boolean,
  ignoreAccents?: boolean,
  stringify?: Object => string,
  trim?: boolean,
  matchFrom?: 'any' | 'start',
});

<Select filterOptions={customFilter} ... />
~~~

See the [Advanced Guide](/advanced) for more details and examples.

## Simple Value

React-select v1 allowed you to use strings for the \`value\` prop, but with v2 we've deprecated this behaviour
in favor of a value prop that is always either an array of Options objects or an Options object. 
If you still want to manage your selected values as a simple string you
can easily do so by applying a simple filter on your dataset as below.

~~~js
const options = [
  {name: 'John', id: 1},
  {name: 'Doe', id: 2},
]
return (
  <ReactSelect
    options={options}
    value={options.filter(({id}) => id === this.state.id)}
    getOptionLabel={({name}) => name}
    getOptionValue={({id}) => id}
    onChange={({value}) => this.setState({id: value})}
  />
)
~~~

Note that if you use the default react-select options schema (an array with
objects having \`label\` and \`value\` keys) you don't need to define
\`getOptionValue\` nor \`getOptionLabel\`.

## Prop Update Guide
      `}
      <PropChanges />
    </Fragment>
  );
}
