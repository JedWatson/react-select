// @flow
import React from 'react';
import md from '../../markdown/renderer';
import { Props } from '@atlaskit/docs';

export default function Api() {
  return md`
    # API

    ## Methods

    ### \`focus()\`

    Focused the internal control input.

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
    }

    // passed as the second argument to \`onChange\`
    type ActionTypes = | 'clear' | 'create-option' | 'deselect-option' | 'pop-value' | 'remove-value' | 'select-option' | 'set-value'
    ~~~

    Even when commonProps are not listed in the prop types below, a custom component
    will still have access to them.

    ## Base Props

    These base props are those available to be passed to all select variants.

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/Select')} />}

    ## Async props

    These props are included with in both the Async and AsyncCreatable select. For
    more on using async selects, see the [async select documentation](/async)

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/Async')} />}

    ## Creatable props

    These props are included with in both the Creatable and AsyncCreatable select. For
    more on using creatable selects, see the [creatable select documentation](/creatable)

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/Creatable')} />}

    ## Replacing Components

    React-Select allows you to augment layout and functionality by replacing
    the default components with your own, using the \`components\`
    property. These components are given all the current props and state
    letting you achieve anything you dream up. For more information in replacing
    components see [the components documentation](/components)

    ### Inner Props

    All functional properties that the component needs are provided in
    \`innerProps\` which you must spread.

    ## Components

    **IMPORTANT NOTE** The below props are provided automatically by \`react-select\`
    when these components are passed into the \`components\` object above. Knowing
    their API is most necessary if you intend to provide your own components, to
    understand what information they will be handed.

    ### ClearIndicator

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/ClearIndicator')} />}

    ### Control

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Control')} />}

    ### DropdownIndicator

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/DropdownIndicator')} />}

    ### Group

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Group')} />}

    ### GroupHeading

    Group Heading can be any component.

    ### IndicatorsContainer

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/IndicatorsContainer')} />}

    ### IndicatorsSeparator

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/IndicatorsSeparator')} />}

    ### Input

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Input')} />}

    ### LoadingIndicator

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/LoadingIndicator')} />}

    ### Menu

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Menu')} />}

    ### MenuList

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/MenuList')} />}

    ### LoadingMessage

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/LoadingMessage')} />}

    ### NoOptionsMessage

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/NoOptionsMessage')} />}

    ### MultiValue

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValue')} />}

    ### MultiValueContainer

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueContainer')} />}

    ### MultiValueLabel

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueLabel')} />}

    ### MultiValueRemove

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/MultiValueRemove')} />}

    ### Option

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Option')} />}

    ### Placeholder

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/Placeholder')} />}

    ### SelectContainer

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/SelectContainer')} />}

    ### SingleValue

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/SingleValue')} />}

    ### ValueContainer

    ${<Props heading="" props={require('!!extract-react-types-loader!../../PropTypes/components/ValueContainer')} />}
  `;
}
