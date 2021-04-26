import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import md from '../../markdown/renderer';
import { PropTypes } from '@magical-types/macro';
import SelectBase from '../../PropTypes/Select';
import StateManagerProps from '../../PropTypes/stateManager';
import AsyncProps from '../../PropTypes/Async';
import CreatableProps from '../../PropTypes/Creatable';

import ClearIndicator from '../../PropTypes/components/ClearIndicator';
import Control from '../../PropTypes/components/Control';
import DropdownIndicator from '../../PropTypes/components/DropdownIndicator';
import Group from '../../PropTypes/components/Group';
import IndicatorsContainer from '../../PropTypes/components/IndicatorsContainer';
import IndicatorsSeparator from '../../PropTypes/components/IndicatorsSeparator';
import Input from '../../PropTypes/components/Input';
import LoadingIndicator from '../../PropTypes/components/LoadingIndicator';
import Menu from '../../PropTypes/components/Menu';
import MenuList from '../../PropTypes/components/MenuList';
import LoadingMessage from '../../PropTypes/components/LoadingMessage';
import NoOptionsMessage from '../../PropTypes/components/NoOptionsMessage';
import MultiValue from '../../PropTypes/components/MultiValue';
import MultiValueContainer from '../../PropTypes/components/MultiValueContainer';
import MultiValueLabel from '../../PropTypes/components/MultiValueLabel';
import MultiValueRemove from '../../PropTypes/components/MultiValueRemove';
import Option from '../../PropTypes/components/Option';
import Placeholder from '../../PropTypes/components/Placeholder';
import SelectContainer from '../../PropTypes/components/SelectContainer';
import SingleValue from '../../PropTypes/components/SingleValue';
import ValueContainer from '../../PropTypes/components/ValueContainer';

// interface PropsProps {
//   readonly overrides?: {
//     readonly [key: string]: React.ComponentType<CommonProps>;
//   };
//   readonly props: {
//     readonly component?: Obj | Inter;
//   };
// }

// const Props = (props: PropsProps) => (
//   <PrettyProps
//     heading=""
//     components={{
//       Button: ({ isCollapsed, ...rest }) => (
//         <button {...rest}>
//           {isCollapsed ? 'Hide Prop Shape' : 'Show Prop Shape'}
//         </button>
//       ),
//     }}
//     {...props}
//   />
// );

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

    ${(<PropTypes component={StateManagerProps} />)}

    ## Select Props

    These base props are those available to be passed to all select variants.

    ${(<PropTypes component={SelectBase} />)}

    ## Async props

    These props are included with in both the Async and AsyncCreatable select. For
    more on using async selects, see the [async select documentation](/async)

    ${(<PropTypes component={AsyncProps} />)}

    ## Creatable props

    These props are included with in both the Creatable and AsyncCreatable select. For
    more on using creatable selects, see the [creatable select documentation](/creatable)

    ${(<PropTypes component={CreatableProps} />)}

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

    ${(<PropTypes component={ClearIndicator} />)}

    ### Control

    ${(<PropTypes component={Control} />)}

    ### DropdownIndicator

    ${(<PropTypes component={DropdownIndicator} />)}

    ### Group

    ${(<PropTypes component={Group} />)}

    ### GroupHeading

    Group Heading can be any component.

    ### IndicatorsContainer

    ${(<PropTypes component={IndicatorsContainer} />)}

    ### IndicatorSeparator

    ${(<PropTypes component={IndicatorsSeparator} />)}

    ### Input

    ${(<PropTypes component={Input} />)}

    ### LoadingIndicator

    ${(<PropTypes component={LoadingIndicator} />)}

    ### Menu

    ${(<PropTypes component={Menu} />)}

    ### MenuList

    ${(<PropTypes component={MenuList} />)}

    ### LoadingMessage

    ${(<PropTypes component={LoadingMessage} />)}

    ### NoOptionsMessage

    ${(<PropTypes component={NoOptionsMessage} />)}

    ### MultiValue

    ${(<PropTypes component={MultiValue} />)}

    ### MultiValueContainer

    ${(<PropTypes component={MultiValueContainer} />)}

    ### MultiValueLabel

    ${(<PropTypes component={MultiValueLabel} />)}

    ### MultiValueRemove

    ${(<PropTypes component={MultiValueRemove} />)}

    ### Option

    ${(<PropTypes component={Option} />)}

    ### Placeholder

    ${(<PropTypes component={Placeholder} />)}

    ### SelectContainer

    ${(<PropTypes component={SelectContainer} />)}

    ### SingleValue

    ${(<PropTypes component={SingleValue} />)}

    ### ValueContainer

    ${(<PropTypes component={ValueContainer} />)}
      `}
    </Fragment>
  );
}
