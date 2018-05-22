import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import md from '../../markdown/renderer';
import ExampleWrapper from '../../ExampleWrapper';
import { StyledSingle, StyledMulti } from '../../examples';

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
     * @param {Object} base -- the component's default style
     * @param {Object} state -- the component's current state e.g. \`isFocused\`
     * @returns {Object}
     */
    function styleFn(base, state) {
      // optionally spread base styles
      return { ...base, color: state.isFocused ? 'blue' : 'red' };
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

    \`clearIndicator\` \`container\` \`control\` \`dropdownIndicator\` \`group\`
    \`groupHeading\` \`indicatorsContainer\` \`indicatorSeparator\` \`input\`
    \`loadingIndicator\` \`loadingMessage\` \`menu\` \`menuList\` \`multiValue\`
    \`multiValueLabel\` \`multiValueRemove\` \`noOptionsMessage\` \`option\`
    \`placeholder\` \`singleValue\` \`valueContainer\`

    ## Base and State

    Spreading the base styles into your returned object let's you extend it
    however you like while maintaining existing styles. Alternatively, you
    can omit the base and completely take control of the component's styles.

    ~~~jsx
    const customStyles = {
      option: (base, state) => ({
        ...base,
        borderBottom: '1px dotted pink',
        color: state.isFullscreen ? 'red' : 'blue',
        padding: 20,
      }),
      control: () => ({
        // none of react-selects styles are passed to <View />
        width: 200,
      })
      singleValue: (base, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...base, opacity, transition };
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

    If you provide the \`className\` prop to react-select, all inner elements will
    be given a className based on the one you have provided.

    For example, given \`className="react-select"\`, the DOM would roughtly look
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

    While we encourage you to use the new Styles API, it's good to know that you
    still have the option of adding class names to the components to style via CSS.

    `}
    </Fragment>
  );
}
