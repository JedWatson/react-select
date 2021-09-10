import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';

export default function Upgrade() {
  return (
    <Fragment>
      <Helmet>
        <title>{'React Select Upgrade Guide'}</title>
        <meta name="description" content="React-select Upgrade Guide" />
      </Helmet>
      {md`
# Upgrade guide

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
    </Fragment>
  );
}
