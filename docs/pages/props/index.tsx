import React, { Fragment } from 'react';

import { Helmet } from 'react-helmet';
import md from '../../markdown/renderer';

import { metadata, useMagicalNodes } from '../../utils';
import { PropTypes } from '@magical-types/pretty';

type ShowTypesProps = {
  getNode?: (index: any) => any;
  index: any;
};

const ShowTypes = ({ getNode, index }: ShowTypesProps) => {
  if (!getNode) return <span>loading</span>;
  return <PropTypes node={getNode(index)} />;
};

export default function Api() {
  const getNode = useMagicalNodes();
  const selectTypes = metadata['react-select'];
  const asyncTypes = metadata['Async'];
  const creatableTypes = metadata['Creatable'];
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
      <ShowTypes
        getNode={getNode}
        index={selectTypes['SelectInstance'].index}
      />
    )}

    ## Select Props

    These base props are those available to be passed to all select variants.

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['SelectInstance'].index}
      />
    )}

    ## Async props

    These props are included with in both the Async and AsyncCreatable select. For
    more on using async selects, see the [async select documentation](/async)

    ${(
      <ShowTypes
        getNode={getNode}
        index={asyncTypes['AsyncAdditionalProps'].index}
      />
    )}

    ## Creatable props

    ${(
      <ShowTypes
        getNode={getNode}
        index={creatableTypes['CreatableAdditionalProps'].index}
      />
    )}

    These props are included with in both the Creatable and AsyncCreatable select. For
    more on using creatable selects, see the [creatable select documentation](/creatable)


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
      <ShowTypes
        getNode={getNode}
        index={selectTypes['ClearIndicatorProps'].index}
      />
    )}

    ### Control

    ${(
      <ShowTypes getNode={getNode} index={selectTypes['ControlProps'].index} />
    )}
    ### DropdownIndicator

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['DropdownIndicatorProps'].index}
      />
    )}

    ### Group

    ${(<ShowTypes getNode={getNode} index={selectTypes['GroupProps'].index} />)}

    ### GroupHeading

    Group Heading can be any component.

    ### IndicatorsContainer

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['IndicatorsContainerProps'].index}
      />
    )}

    ### IndicatorSeparator

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['IndicatorSeparatorProps'].index}
      />
    )}

    ### Input

    ${(<ShowTypes getNode={getNode} index={selectTypes['InputProps'].index} />)}

    ### LoadingIndicator

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['LoadingIndicatorProps'].index}
      />
    )}

    ### Menu

    ${(<ShowTypes getNode={getNode} index={selectTypes['MenuProps'].index} />)}

    ### MenuList

    ${(
      <ShowTypes getNode={getNode} index={selectTypes['MenuListProps'].index} />
    )}

    ### LoadingMessage

    ${(
      <ShowTypes getNode={getNode} index={selectTypes['NoticeProps'].index} />
    )}

    ### NoOptionsMessage

    ${(
      <ShowTypes getNode={getNode} index={selectTypes['NoticeProps'].index} />
    )}

    ### MultiValue

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['MultiValueProps'].index}
      />
    )}

    ### MultiValueContainer

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['MultiValueGenericProps'].index}
      />
    )}

    ### MultiValueLabel

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['MultiValueGenericProps'].index}
      />
    )}

    ### MultiValueRemove

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['MultiValueRemoveProps'].index}
      />
    )}

    ### Option

    ${(
      <ShowTypes getNode={getNode} index={selectTypes['OptionProps'].index} />
    )}

    ### Placeholder

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['PlaceholderProps'].index}
      />
    )}

    ### SelectContainer

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['ContainerProps'].index}
      />
    )}

    ### SingleValue

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['SingleValueProps'].index}
      />
    )}

    ### ValueContainer

    ${(
      <ShowTypes
        getNode={getNode}
        index={selectTypes['ValueContainerProps'].index}
      />
    )}


        `}
    </Fragment>
  );
}
