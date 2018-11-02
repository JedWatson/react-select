import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import { StyledSingle, StyledMulti, Theme } from '../../examples';
import { ColorSample } from '../../styled-components';
import { defaultTheme } from '../../../src/theme';

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

    React-Select offers a flexible, light-weight styling framework which is
    a thin abstraction over simple javascript objects using
    [emotion](https://emotion.sh/).

    ~~~jsx
    /**
     * @param {Object} provided -- the component's default styles
     * @param {Object} state -- the component's current state e.g. \`isFocused\`
     * @returns {Object}
     */
    function styleFn(provided, state) {
      return { ...provided, color: state.isFocused ? 'blue' : 'red' };
    }
    ~~~

    ## Style Object

    Each component is keyed, and ships with default styles. The component's
    default style object is passed as the first argument to the function
    when it's resolved.

    The second argument is the current state of the select, features like
    \`isFocused\`, \`isSelected\` etc. allowing you to
    implement dynamic styles for each of the components.

    ###### Style Keys

    - \`clearIndicator\`
    - \`container\`
    - \`control\`
    - \`dropdownIndicator\`
    - \`group\`
    - \`groupHeading\`
    - \`indicatorsContainer\`
    - \`indicatorSeparator\`
    - \`input\`
    - \`loadingIndicator\`
    - \`loadingMessage\`
    - \`menu\`
    - \`menuList\`
    - \`multiValue\`
    - \`multiValueLabel\`
    - \`multiValueRemove\`
    - \`noOptionsMessage\`
    - \`option\`
    - \`placeholder\`
    - \`singleValue\`
    - \`valueContainer\`

    ## Provided Styles and State

    Spreading the provided styles into your returned object lets you extend it
    however you like while maintaining existing styles. Alternatively, you
    can omit the provided styles and completely take control of the component's styles.

    ~~~jsx
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
      }
    }

      const App = () => (
        <Select
          styles={customStyles}
          options={...}
        />
      );
      ~~~

      ${(
        <ExampleWrapper
          label="Customised Styles for Single Select"
          urlPath="docs/examples/StyledSingle.js"
          raw={require('!!raw-loader!../../examples/StyledSingle.js')}
        >
          <StyledSingle />
        </ExampleWrapper>
      )}

      ${(
        <ExampleWrapper
          label="Customised styles for Multi Select"
          urlPath="docs/examples/StyledMulti.js"
          raw={require('!!raw-loader!../../examples/StyledMulti.js')}
        >
          <StyledMulti />
        </ExampleWrapper>
      )}

    ## Using classNames

    If you provide the \`className\` prop to react-select, the SelectContainer will be given a className based on the provided value.

    If you provide the \`classNamePrefix\` prop to react-select, all inner elements will be given a className
    with the provided prefix.

    For example, given \`className='react-select-container'\` and \`classNamePrefix="react-select"\`,
    the DOM structure is similar to this:

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

    While we encourage you to use the new Styles API, you still have the option of styling via CSS classes.
    This ensures compatibility with [styled components](https://www.styled-components.com/),
    [CSS modules](https://github.com/css-modules/css-modules) and other libraries.

    ## Overriding the theme

    The default styles are derived from a theme object, which you can mutate like \`styles\`.

    The \`theme\` object is available for the \`styles\` functions as well.

    ${(
      <ExampleWrapper
        label="Customised theme"
        urlPath="docs/examples/Theme.js"
        raw={require('!!raw-loader!../../examples/Theme.js')}
      >
        <Theme />
      </ExampleWrapper>
    )}

    ###### Theme colors

    ${(
      <div css={{ marginTop: '1em' }}>
        {Object.keys(defaultTheme.colors).map(key => <ColorSample key={key} name={key} color={defaultTheme.colors[key]} />)}
      </div>
    )}

    `}
    </Fragment>
  );
}
