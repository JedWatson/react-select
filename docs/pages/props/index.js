// @flow
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import md from '../../markdown/renderer';
import PrettyProps, { Prop } from 'pretty-proptypes';

const Props = props => (
  <PrettyProps
    heading=""
    components={{
      Button: ({ isCollapsed, ...rest }) => (
        <button {...rest}>
          {isCollapsed ? 'Hide Prop Shape' : 'Show Prop Shape'}
        </button>
      ),
    }}
    {...props}
  />
);

export default function Api() {
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
    # API

    ## Prop Types

    ### Internal Types

    You'll see these in the public props below:

    ~~~js
    type OptionType = { [string]: any }
    type OptionsType = Array<OptionType>

    type GroupType = {
      [string]: any, // group label
      options: OptionsType,
    }

    type ValueType = OptionType | OptionsType | null | void

    type CommonProps = {
      clearValue: () => void,
      getStyles: (string, any) => {},
      getValue: () => ValueType,
      hasValue: boolean,
      isMulti: boolean,
      options: OptionsType,
      selectOption: OptionType => void,
      selectProps: any,
      setValue: (ValueType, ActionTypes) => void,
      emotion: any,
    }

    // passed as the second argument to \`onChange\`
    type ActionTypes = | 'clear' | 'create-option' | 'deselect-option' | 'pop-value' | 'remove-value' | 'select-option' | 'set-value'
    ~~~

    Even when commonProps are not listed in the prop types below, a custom component
    will still have access to them.

    ## StateManager Props

    The statemanager is a utility class that wraps around the base Select and each Select variant to
    expose inputValue and value as controllable props. For more detailed information on these props and their usage
    please see the [controlled props](/advanced#controlled-props) section of the advanced page.

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/stateManager')}
      />
    )}

    ## Select Props

    These base props are those available to be passed to all select variants.

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/Select')}
        overrides={{
          components: props => (
            <Prop
              {...props}
              shapeComponent={() => null}
              type="All Components Object"
            />
          ),
        }}
      />
    )}

    ## Async props

    These props are included with in both the Async and AsyncCreatable select. For
    more on using async selects, see the [async select documentation](/async)

    ${(<Props props={require('!!extract-react-types-loader!../../PropTypes/Async')} />)}

    ## Creatable props

    These props are included with in both the Creatable and AsyncCreatable select. For
    more on using creatable selects, see the [creatable select documentation](/creatable)

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/Creatable')}
      />
    )}

    ## Replacing Components

    React-Select allows you to augment layout and functionality by replacing
    the default components with your own, using the \`components\`
    property. These components are given all the current props and state
    letting you achieve anything you dream up. For more information in replacing
    components see [the components documentation](/components)

    ### Inner Ref
    Some components are passed an innerRef property to facilitate for internally
    managed behaviour within the base select. This should be assigned to the
    ref property of the relevant dom element.
    i.e.

    ~~~
    const CustomOptionComponent = ({ innerProps, innerRef }) =>
    (<div ref={innerRef} {...innerProps} />)
    ~~~

    ### Inner Props

    All functional properties that the component needs are provided in
    \`innerProps\` which you must spread.

    ## Components

    **IMPORTANT NOTE** The below props are provided automatically by \`react-select\`
    when these components are passed into the \`components\` object above. Knowing
    their API is most necessary if you intend to provide your own components, to
    understand what information they will be handed.

    ### ClearIndicator

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/ClearIndicator')}
      />
    )}

    ### Control

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Control')}
      />
    )}

    ### DropdownIndicator

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/DropdownIndicator')}
      />
    )}

    ### Group

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Group')}
      />
    )}

    ### GroupHeading

    Group Heading can be any component.

    ### IndicatorsContainer

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/IndicatorsContainer')}
      />
    )}

    ### IndicatorSeparator

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/IndicatorsSeparator')}
      />
    )}

    ### Input

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Input')}
      />
    )}

    ### LoadingIndicator

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/LoadingIndicator')}
      />
    )}

    ### Menu

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Menu')}
      />
    )}

    ### MenuList

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/MenuList')}
      />
    )}

    ### LoadingMessage

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/LoadingMessage')}
      />
    )}

    ### NoOptionsMessage

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/NoOptionsMessage')}
      />
    )}

    ### MultiValue

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValue')}
      />
    )}

    ### MultiValueContainer

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueContainer')}
      />
    )}

    ### MultiValueLabel

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueLabel')}
      />
    )}

    ### MultiValueRemove

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueRemove')}
      />
    )}

    ### Option

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Option')}
      />
    )}

    ### Placeholder

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/Placeholder')}
      />
    )}

    ### SelectContainer

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/SelectContainer')}
      />
    )}

    ### SingleValue

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/SingleValue')}
      />
    )}

    ### ValueContainer

    ${(
      <Props
        props={require('!!extract-react-types-loader!../../PropTypes/components/ValueContainer')}
      />
    )}
  `}
    </Fragment>
  );
}
