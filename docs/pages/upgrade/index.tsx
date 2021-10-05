import React from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import { Cell, Header, Table } from '../../Table';

export default function Upgrade() {
  return (
    <>
      <Helmet>
        <title>{'React Select Upgrade Guide'}</title>
        <meta name="description" content="React-select Upgrade Guide" />
      </Helmet>
      <>
        {md`
# Upgrade guide

## From v4 to v5

### Summary

- Convert to TypeScript - TypeScript types now come packaged with \`react-select\` so you no longer need to have \`@types/react-select\` installed; we no longer include Flow types
- Drop IE11 support - this allows us to make changes to our CSS that we've wanted to make for a long time as well as remove unnecessary JS solutions (those changes are noted below)
- Use \`forwardRef\` for all wrapped components - this means that if you were accessing anything on the \`Select\` instance using a \`ref\`, the \`ref\` will now reference the internal \`Select\` directly (see below for how to upgrade)
- Replace HOCs with hooks - if you were using our HOCs to create custom \`Select\`s (i.e., \`makeCreatableSelect\`, \`mangeState\`, \`makeAsyncSelect\`) these have now been replaced by hooks (i.e., \`useCreatable\`, \`useStateManager\`, \`useAsync\`)
- Remove dependency on [AutosizeInput](https://github.com/JedWatson/react-input-autosize) - our new solution uses CSS grid which IE11 does not fully support; also \`.prefix__input\` now targets the input and NOT the container
- Improve screen reader experience - this isn't a breaking change in the API but it does change the screen reader announcements
- Use CSS grid for single value layout - this also isn't a breaking change in the API but is it a change in the styles since it switches to using CSS grid (not fully supported by IE11) for single-value \`Select\`s
- Remove \`readonly\` attribute on our \`DummyInput\` - this results in better accessibility but uses \`caret-color\` which is not available on IE11

### Details

#### Convert to TypeScript

We've rewritten \`react-select\` in TypeScript which means you can remove any dependencies on \`@types/react-select\`. If you were using the Flow types than look into contributing types for v5 to \`flow-typed\`.

Here are the most notable changes when replacing \`@types/react-select\` with our packaged types:
        `}
        <TypesReplacementTable />
        <br />
        {md`
If you were previously importing a type from the \`src\` directory when using \`@types/react-select\`:

~~~jsx
import { ... } from 'react-select/src/...';
~~~

These should now be imported from the \`dist/declarations/src\` directory:

~~~jsx
import { ... } from 'react-select/dist/declarations/src/...';
~~~

We export any types from the main entry point that we think might be useful to the user. If you are using a type that is not exported from the main entry point please open a PR or issue so that we can add it.

#### Drop IE11 support

This allows us to use modern CSS in order to improve the quality of \`react-select\` and remove excessive JavaScript code to work around not having the ability to use modern CSS. If you need IE11 support either:

1.  Stay on v4.
2.  Attempt to use our [Styles API](./styles) and/or [Components API](./components) to override styles and/or components that don't support IE11. The only change that might be hard to override is "Remove \`readonly\` attribute on our \`DummyInput\`" since you can't override the \`DummyInput\` component with the Styles or Components API.
3.  If there are simple changes that make \`react-select\` compatible with IE11, open a PR. We are unlikely to provide official support for IE11 since supporting IE11 makes maintaining \`react-select\` a lot more difficult and holds us back from changes we want to make, but we also are glad to accept simple changes if they make your life easier.

#### Use \`forwardRef\` for all wrapped components

NOTE: Accessing any of the internals of the \`Select\` component using \`ref\`s is not part of our public API. The internals of the \`Select\` component can change at any time (including in minor and patch releases). The only methods on the \`Select\` component that are part of the public API are the \`focus()\` and \`blur()\` methods.

\`react-select\` exports five components: \`BaseSelect\`, \`CreatableSelect\`, \`Select\` (the default export), \`AsyncSelect\`, \`AsyncCreatableSelect\`. The last four components are wrappers around the \`BaseSelect\`. Previously the \`ref\` for each of these components was pointing to itself, but now we use \`forwardRef\` which means that the \`ref\`s for all five components now point to \`BaseSelect\`.

The \`focus()\` and \`blur()\` methods are untouched by this change. However if you were accessing the internals of the \`BaseSelect\` component, you will need to update how you were accessing the \`BaseSelect\`. Here is how to update access to the \`BaseSelect\` component:
        `}
        <RefReplacementTable />
        <br />
        {md`
#### Replace HOCs with hooks

The primary reason for this change is that hooks combined with generic components are easier to type in TypeScript than HOCs combined with generic components. These HOCs/hooks are considered advanced usage.

If you were using the HOCs, it shouldn't be too hard to replace them with its corresponding hook (i.e., \`useStateManager\`, \`useCreatable\`, or \`useAsync\`). As an example, here is how the state managed Select (the default export) used to be constructed with the \`mangeState\` HOC:

~~~jsx
const Select = manageState(SelectBase);
~~~

With hooks it is now constructed like this:

~~~jsx
const Select = (props) => {
  const baseSelectProps = useStateManager(props);
  return <SelectBase {...baseSelectProps} />;
};
~~~

Consult the source code for how the other components are constructed.

#### Remove dependency on AutosizeInput

This is an exciting change because we get to drop a dependency on \`react-input-autosize\`. We now use a pure CSS solution to auto-size the input, however this means that we have to drop support for IE11 since IE11 does not fully support CSS grid. As part of this refactor the \`.prefix__input\` CSS class now targets the input itself and NOT the container. See [#4625](https://github.com/JedWatson/react-select/pull/4625) for more details.

#### Improve screen reader experience

The following improvements have been made for screen reader users:

- NVDA now announces the context text when initially focused
- Selected option(s) (single and multi) are now announced when initially focused
- VoiceOver now announces the context text when re-focusing
- The clear action is now announced
- Placeholder text is now announced
- Mobile VoiceOver is now able to remove selected multi options

Also we've added the role of combobox and the required ARIA attributes to the \`Input\` and \`DummyInput\` components to allow JAWS support and a better screen reader experience overall. See [#4695](https://github.com/JedWatson/react-select/issues/4695) for more details.

#### Use CSS grid for single value layout

Previously the absolution positioning of both the value and the placeholder pulled them out of the flow, and thus the component itself collapsed down when used as a flex child. To solve this we are now using CSS grid for the single value layout.

<img width="593" alt="before-after" src="https://user-images.githubusercontent.com/157960/129303649-73afd0dc-5d11-4c7d-b39b-42fa18c1b1f9.png">

### Remove \`readonly\` attribute on our \`DummyInput\`

Previously we added the \`readonly\` attribute to the \`DummyInput\` (when \`isSearchable\` is set to \`false\`) in order to hide the flashing cursor and prevent devices from showing a virtual keyboard. However the \`readonly\` attribute causes the \`DummyInput\` to be removed from the tab order in iOS Safari. In order to solve this we're replacing the \`readonly\` attribute with setting the \`caret-color\` CSS prop (which IE11 does not support) to \`transparent\` and setting the \`inputMode\` attribute on the \`<input>\` to \`none\`.

## From v3 to v4

### Summary

- Standardize value passed to \`onChange\` - the \`onChange\` handler is now always passed an array of options if \`isMulti\` is set to \`true\`
- Emotion 11 - should only affect you if you're using the \`NonceProvider\` component
- Remove usage of UNSAFE React methods - shouldn't affect you except now you won't see those warning messages in the console anymore

### Details

#### Standardize value passed to \`onChange\`

This change makes it so that the first parameter passed to the \`onChange\` callback will now always be an array of options if \`isMulti\` is set to \`true\` and will always be a single option or \`null\` if \`isMulti\` is set to \`false\`. Previously the first parameter of \`onChange\` could be an array _or_ \`null\` when \`isMulti\` was set to \`true\`.

That means if you were previously using nullish coalescing in order to handle \`null\` for \`isMulti\` like this:

~~~jsx
<Select isMulti onChange={(newValues) => setValues(newValues ?? [])} />
~~~

You can now remove the nullish coalescing because \`onChange\` will always be an array when \`isMulti\` is set to \`true\`:

~~~jsx
<Select isMulti onChange={(newValues) => setValues(newValues)} />
~~~

#### Emotion 11

The \`NonceProvider\` component now requires a \`cacheKey\` prop that corresponds to the [newly required \`key\` prop](https://emotion.sh/docs/emotion-11#emotions-caches) for the Emotion cache. This won't affect you if you aren't using \`NonceProvider\`. See [#4283](https://github.com/JedWatson/react-select/pull/4283) for more details.

#### Remove usage of UNSAFE React methods

This isn't necessarily a breaking change, but it required a large refactor in order to accomplish so we released this in a major upgrade in case it has some unintended consequences.

## From v2 to v3

The core motivation behind 3.0.0 is to set us up to leverage new tools to make react-select better. As such we've made the following changes:

### Breaking Changes

- Upgrade from Emotion 9 to Emotion 10
- Multiple Entrypoints
- UMD builds deprecated
- React 16.8 required as peer dependencies
- Normalized Values [#3416](https://github.com/JedWatson/react-select/pull/3416)

### What this means for you

#### Emotion 10

Moving to the latest major version of emotion affords us zero-config SSR and enabling easier CSP support. Unfortunately this will be a breaking change for consumers who are currently leveraging emotion to build custom components for react-select. For example, you'd previously create an custom Option component with emotion like so:

~~~jsx
import { css } from 'emotion'

const customOption = ({ cx, className, getStyles, _ }) =>
  <div
     classNames={cx(
       css(getStyles('option', props)),
       {
         'option': true,
         'option--is-disabled': isDisabled,
         'option--is-focused': isFocused,
         'option--is-selected': isSelected,
        },
        className
     )}
     {...}
  >
~~~

With react-select 3.0.0, and emotion 10 it would be the following:

~~~jsx
/** @jsx jsx */
import { jsx } from '@emotion/core';

const customOption = ({ cx, className, getStyles, _ }) =>
  <div
    css={getStyles('option', props)}
    classNames={cx(
     {
       'option': true,
       'option--is-disabled': isDisabled,
       'option--is-focused': isFocused,
       'option--is-selected': isSelected,
      },
      className
    )}
    {...}
  >
~~~

#### Multiple Entrypoints:

v3.0.0 separates removes the following components from the main entry point, and instead exports them as separate entrypoints:

- Async (now exported from react-select/async)
- Creatable (now exported from react-select/creatable)
- Async Creatable (now exported from react-select/async-creatable)
- makeAnimated and default animated components (now exported from react-select/animated)

Where you’d previously import them as such

~~~jsx
\timport { Async } from 'react-select'
~~~

Or as:

~~~jsx
\timport Async from 'react-select/lib/Async'
~~~

Now imports look like this:

~~~jsx
\timport AsyncSelect from 'react-select/async'
~~~

This should have no bundle-size impact on react-select consumers currently leveraging tree-shaking. However for consumers who aren’t leveraging tree-shaking, this should help alleviate some of the bundle-weight.

#### UMD Builds

UMD builds have been removed as of react-select v3.

#### Peer dependency on React 16.8

We've decided on requiring 16.8 as a peer dependency for react-select 3.0.0. This is motivated by our commitment to leveraging the improvements in recent versions of React such as hooks to make react-select even better.

#### Normalized Values

At the moment, if no value is specified by the consumer, it's instantiated as a null value, regardless of whether the select isMulti or not.

When isMulti is false this is fine. On selection of an option, the value becomes an object, and on clearing of said value, it returns to being null. \`(null --> {} --> null)\`

However when isMulti is true, this becomes more inconsistent. On selection of options, the value becomes an array of options, removing values extricates them from this array, removing the last selected value results in an empty array, instead of the initial base state of null.
\`(null --> [{}] --> [])\`

We rectify this in 3.0.0, on removal of _all_ selected values in an isMulti Select, the value passed to onChange is \`null\` and not \`[]\`.
<img src="https://i.imgur.com/bPVpQjV.gif" alt="normalize-value" width="550" />

## From v1 to v2

You can find the v2 upgrade guide [here](./upgrade-to-v2).
        `}
      </>
    </>
  );
}

const TypesReplacementTable = () => (
  <Table>
    <thead>
      <tr>
        <Header>@types/react-select</Header>
        <Header>react-select</Header>
        <Header>Notes</Header>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Cell>{md`
\`OptionTypeBase\`
        `}</Cell>
        <Cell>no replacement</Cell>
        <Cell>{md`
Options can be any type (if using \`getOptionValue\` and \`getOptionLabel\`) so there's no longer a base type for options
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`OptionsType\`
        `}</Cell>
        <Cell>{md`
\`Options\`
        `}</Cell>
        <Cell />
      </tr>
      <tr>
        <Cell>{md`
\`GroupTypeBase\`
        `}</Cell>
        <Cell>{md`
\`GroupBase\`
        `}</Cell>
        <Cell />
      </tr>
      <tr>
        <Cell>{md`
\`GroupedOptionsType\`
        `}</Cell>
        <Cell>no replacement</Cell>
        <Cell>{md`
This is equivalent to \`ReadonlyArray<Group>\`
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`ValueType\`
        `}</Cell>
        <Cell>{md`
\`OnChangeValue\`
        `}</Cell>
        <Cell />
      </tr>
      <tr>
        <Cell>{md`
\`InputActionTypes\`
        `}</Cell>
        <Cell>{md`
\`InputAction\`
        `}</Cell>
        <Cell />
      </tr>
      <tr>
        <Cell>{md`
\`NamedProps\`
        `}</Cell>
        <Cell>{md`
\`Props\`
        `}</Cell>
        <Cell />
      </tr>
      <tr>
        <Cell>{md`
\`Select\` (the \`ref\` type)
        `}</Cell>
        <Cell>{md`
\`SelectInstance\`
        `}</Cell>
        <Cell>{md`
See "Use \`forwardRef\` for all wrapped components" for more details
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`AsyncSelect\` (the \`ref\` type)
        `}</Cell>
        <Cell>{md`
\`SelectInstance\`
        `}</Cell>
        <Cell>{md`
See "Use \`forwardRef\` for all wrapped components" for more details
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`CreatableSelect\` (the \`ref\` type)
        `}</Cell>
        <Cell>{md`
\`SelectInstance\`
        `}</Cell>
        <Cell>{md`
See "Use \`forwardRef\` for all wrapped components" for more details
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`AsyncCreatableSelect\` (the \`ref\` type)
        `}</Cell>
        <Cell>{md`
\`SelectInstance\`
        `}</Cell>
        <Cell>{md`
See "Use \`forwardRef\` for all wrapped components" for more details
        `}</Cell>
      </tr>
    </tbody>
  </Table>
);

const RefReplacementTable = () => (
  <Table>
    <thead>
      <tr>
        <Header>Component</Header>
        <Header>v4</Header>
        <Header>v5</Header>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Cell>{md`
\`BaseSelect\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`CreatableSelect\`
        `}</Cell>
        <Cell>{md`
\`ref.select.select\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`Select\`
        `}</Cell>
        <Cell>{md`
\`ref.select\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`AsyncSelect\`
        `}</Cell>
        <Cell>{md`
\`ref.select.select\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
      </tr>
      <tr>
        <Cell>{md`
\`AsyncCreatableSelect\`
        `}</Cell>
        <Cell>{md`
\`ref.select.select.select\`
        `}</Cell>
        <Cell>{md`
\`ref\`
        `}</Cell>
      </tr>
    </tbody>
  </Table>
);
