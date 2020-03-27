import React, { Fragment } from 'react';
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
    - \`menuPortal\`
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

    
    ## Select Props
    In the second argument \`state\`, you have access to \`selectProps\` which will allow you to gain access to
    your own arguments passed into the \`Select\` body.

    ~~~jsx
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
      }),

      control: (_, { selectProps: { width }}) => ({
        width: width
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
          width='200px'
          menuColor='red'
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
        urlPath="docs/examples/StyleCompositionExample.js"
        raw={require('!!raw-loader!../../examples/StyleCompositionExample.js')}
      >
        <StyleCompositionExample />
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
        {Object.keys(defaultTheme.colors).map(key => (
          <ColorSample key={key} name={key} color={defaultTheme.colors[key]} />
        ))}
      </div>
    )}

    `}
    </Fragment>
  );
}
