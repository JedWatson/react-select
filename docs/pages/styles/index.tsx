/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import {
  StyledSingle,
  StyledMulti,
  Theme,
  StyleCompositionExample,
} from '../../examples';
import { ColorSample } from '../../styled-components';
import { defaultTheme } from 'react-select';

export default function Styles() {
  return (
    <Fragment>
      <Helmet>
        <title>Styles - React Select</title>
        <meta
          name="description"
          content="React-Select offers a flexible, light-weight styling framework which is a thin abstraction over simple javascript objects"
        />
      </Helmet>
      {md`
    # Styles

    React Select offers 3 main APIs for styling:

    - [The styles prop](#the-styles-prop)
    - [The classNames prop](#the-classnames-prop)
    - [The classNamePrefix prop](#the-classnameprefix-prop)

    ## The styles prop

    The recommended way to provide custom styles to \`react-select\` is to use the \`styles\` prop.
    \`styles\` takes an object with keys to represent the various [inner components](#inner-components) that \`react-select\` is made up of.
    Each inner component takes a callback function with the following signature:

    ~~~jsx
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : 'red',
        }),
      }}
    />
    ~~~

    The first argument is an object with the base styles. Spreading the base styles into your returned object lets you extend it however you like while maintaining existing styles. Alternatively, you can omit the provided styles and completely take control of the component's styles.

    The second argument is the current state (features like \`isFocused\`, \`isSelected\` etc). This allows you to implement dynamic styles for each of the components.

    ## The classNames prop

    As of version \`5.7.0\` of \`react-select\` you can now use the \`classNames\` prop for styling. Note: this is not to be confused with the \`className\` prop, which will add a class to the component.

    \`classNames\` takes an object with keys to represent the various [inner components](#inner-components) that \`react-select\` is made up of.
    Each inner component takes a callback function with the following signature:

    ~~~jsx
    <Select
      classNames={{
        control: (state) =>
          state.isFocused ? 'border-red-600' : 'border-grey-300',
      }}
    />
    ~~~

    ### Note on CSS specificity

    If you are using the \`classNames\` API and you are trying to override some base styles with the same level of specificity, you must ensure that your provided styles are declared later than the styles from React Select (e.g. the \`link\` or \`style\` tag in the head of your HTML document) in order for them to take precedence.

    For an example on how you might want to do this, see the [Storybook example here](https://github.com/JedWatson/react-select/blob/master/storybook/stories/ClassNamesWithTailwind.stories.tsx).

    ## The unstyled prop

    If you are trying to style everything from scratch you can use the \`unstyled\` prop. This removes all the presentational styles from React Select (leaving some important functional styles, like those for menu positioning and input width in multi select).

    This will make it easier to completely specify your own \`styles\` _or_ \`classNames\` to control the look of React Select, without having to specifically override the default theme we apply.

    ## Inner components

    <details>
      <summary>See list of keys for all of React Select's inner components</summary>
      <ul>
        <li>clearIndicator</li>
        <li>container</li>
        <li>control</li>
        <li>dropdownIndicator</li>
        <li>group</li>
        <li>groupHeading</li>
        <li>indicatorsContainer</li>
        <li>indicatorSeparator</li>
        <li>input</li>
        <li>loadingIndicator</li>
        <li>loadingMessage</li>
        <li>menu</li>
        <li>menuList</li>
        <li>menuPortal</li>
        <li>multiValue</li>
        <li>multiValueLabel</li>
        <li>multiValueRemove</li>
        <li>noOptionsMessage</li>
        <li>option</li>
        <li>placeholder</li>
        <li>singleValue</li>
        <li>valueContainer</li>
      </ul>
    </details>

    ## The classNamePrefix prop

    If you provide the \`classNamePrefix\` prop to React Select, all inner elements will be given a className with the provided prefix.

    Given the following JSX:

    ~~~jsx
    <Select
      {...props}
      className="react-select-container"
      classNamePrefix="react-select"
    />
    ~~~

    ...the DOM structure is similar to this:

    ~~~html
    <div class="react-select-container">
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

    ## Select props

    In the \`state\` argument for both the \`styles\` and \`classNames\` API, you have access to \`selectProps\` which will allow you to gain access to your own arguments passed into the Select body.





    ## cx and custom Components

    In the event that you need to rewrite a particular component, you'll also have to compose together the styling functionality.
    Thankfully all the requisite parts are supplied to you via props as below:

    ### cx
    cx is an internal utility function that manages the composition of emotion style declarations, className/classNamePrefixes and
    additional BEM style modifiers into a selector value for each component.
    It has the following signature:

    ~~~
    (prefix ?: string,
      cssKey?: string,
      state?: {},
      className?: string) => string
    ~~~

    * prefix: is the value of the optional classNamePrefix,
    * cssKey: is the uid generated by the invocation of the css method imported from emotion
    * state: an object declaring state based modifiers to be applied to our selector
    * className: any className prop specified for custom components will also be composed into the selector string produced by the cx functions

    ### getStyles
    Each component gets passed a getStyles method which has the following signature:

    ~~~
    (key: string, props: Object) => stylesObject;
    ~~~

    The key is a lowercased string value corresponding to the component that the styles apply to,
    i.e. option for the Option component, menuplacer for the MenuPlacer component.

    The props argument is an object of relevant properties/ state values that are relevant to computing styles,
    i.e. isFocused or isSelected. Additional props can be added here for computation using the styles api.

    In the end configuring your custom component with the correct styling functionality should look like this
    ~~~
    import { css } from 'emotion';

    const CustomOption = ({ cx, children, getStyles, innerRef, ...props }) => (
      <div
        ref={innerRef}
        className={cx(
          css(getStyles('option', props)),
          {
            'option': true,
            'option--is-disabled': isDisabled,
            'option--is-focused': isFocused,
            'option--is-selected': isSelected,
          }
        )}
      >
        {children}
      </div>
    )
    ~~~

    ${(
      <ExampleWrapper
        label="Style composition for custom components"
        urlPath="docs/examples/StyleCompositionExample.tsx"
        raw={require('!!raw-loader!../../examples/StyleCompositionExample.tsx')}
      >
        <StyleCompositionExample />
      </ExampleWrapper>
    )}

    ## Overriding the theme

    The default styles are derived from a theme object, which you can mutate like \`styles\`.

    The \`theme\` object is available for the \`styles\` functions as well.

    ${(
      <ExampleWrapper
        label="Customised theme"
        urlPath="docs/examples/Theme.tsx"
        raw={require('!!raw-loader!../../examples/Theme.tsx')}
      >
        <Theme />
      </ExampleWrapper>
    )}

    ###### Theme colors

    ${(
      <div css={{ marginTop: '1em' }}>
        {Object.keys(defaultTheme.colors).map((key) => (
          <ColorSample
            key={key}
            name={key}
            color={defaultTheme.colors[key as keyof typeof defaultTheme.colors]}
          />
        ))}
      </div>
    )}

    ## Examples

      ${(
        <ExampleWrapper
          label="Customised Styles for Single Select"
          urlPath="docs/examples/StyledSingle.tsx"
          raw={require('!!raw-loader!../../examples/StyledSingle.tsx')}
        >
          <StyledSingle />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="Customised styles for Multi Select"
          urlPath="docs/examples/StyledMulti.tsx"
          raw={require('!!raw-loader!../../examples/StyledMulti.tsx')}
        >
          <StyledMulti />
        </ExampleWrapper>
      )}

    `}
    </Fragment>
  );
}
