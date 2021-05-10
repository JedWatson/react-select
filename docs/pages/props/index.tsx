import React, { Fragment } from 'react';

import { Helmet } from 'react-helmet';
import type { MagicalNodeRecord } from '../../generate-magical-types/src/types';
import md from '../../markdown/renderer';

import { metadata, useMagicalNodes, getNodeType } from '../../utils';
import { PropTypes } from '@magical-types/pretty';

type ShowTypesProps = {
  getNode?: getNodeType;
  type?: MagicalNodeRecord;
};

const ShowTypes = ({ getNode, type }: ShowTypesProps) => {
  if (!type || !type.index) return null;
  if (!getNode) return <span>loading</span>;

  return <PropTypes node={getNode(type.index)} />;
};

export default function Api() {
  const getNode = useMagicalNodes();
  const stateManagerTypes = metadata['stateManager'];
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
        type={stateManagerTypes?.StateManagerProps}
      />
    )}

    ## Select Props

    These base props are those available to be passed to all select variants.

    ${(<ShowTypes getNode={getNode} type={selectTypes?.Props} />)}

    ## Async props

    These props are included with in both the Async and AsyncCreatable select. For
    more on using async selects, see the [async select documentation](/async)

    ${(<ShowTypes getNode={getNode} type={asyncTypes?.AsyncAdditionalProps} />)}

    ## Creatable props

    ${(
      <ShowTypes
        getNode={getNode}
        type={creatableTypes?.CreatableAdditionalProps}
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

    ${(<ShowTypes getNode={getNode} type={selectTypes?.ClearIndicatorProps} />)}

    ### Control

    ${(<ShowTypes getNode={getNode} type={selectTypes?.ControlProps} />)}
    ### DropdownIndicator

    ${(
      <ShowTypes getNode={getNode} type={selectTypes?.DropdownIndicatorProps} />
    )}

    ### Group

    ${(<ShowTypes getNode={getNode} type={selectTypes?.GroupProps} />)}

    ### GroupHeading

    Group Heading can be any component.

    ### IndicatorsContainer

    ${(
      <ShowTypes
        getNode={getNode}
        type={selectTypes?.IndicatorsContainerProps}
      />
    )}

    ### IndicatorSeparator

    ${(
      <ShowTypes
        getNode={getNode}
        type={selectTypes?.IndicatorSeparatorProps}
      />
    )}

    ### Input

    ${(<ShowTypes getNode={getNode} type={selectTypes?.InputProps} />)}

    ### LoadingIndicator

    ${(
      <ShowTypes getNode={getNode} type={selectTypes?.LoadingIndicatorProps} />
    )}

    ### Menu

    ${(<ShowTypes getNode={getNode} type={selectTypes?.MenuProps} />)}

    ### MenuList

    ${(<ShowTypes getNode={getNode} type={selectTypes?.MenuListProps} />)}

    ### LoadingMessage

    ${(<ShowTypes getNode={getNode} type={selectTypes?.NoticeProps} />)}

    ### NoOptionsMessage

    ${(<ShowTypes getNode={getNode} type={selectTypes?.NoticeProps} />)}

    ### MultiValue

    ${(<ShowTypes getNode={getNode} type={selectTypes?.MultiValueProps} />)}

    ### MultiValueContainer

    ${(
      <ShowTypes getNode={getNode} type={selectTypes?.MultiValueGenericProps} />
    )}

    ### MultiValueLabel

    ${(
      <ShowTypes getNode={getNode} type={selectTypes?.MultiValueGenericProps} />
    )}

    ### MultiValueRemove

    ${(
      <ShowTypes getNode={getNode} type={selectTypes?.MultiValueRemoveProps} />
    )}

    ### Option

    ${(<ShowTypes getNode={getNode} type={selectTypes?.OptionProps} />)}

    ### Placeholder

    ${(<ShowTypes getNode={getNode} type={selectTypes?.PlaceholderProps} />)}

    ### SelectContainer

    ${(<ShowTypes getNode={getNode} type={selectTypes?.ContainerProps} />)}

    ### SingleValue

    ${(<ShowTypes getNode={getNode} type={selectTypes?.SingleValueProps} />)}

    ### ValueContainer

    ${(<ShowTypes getNode={getNode} type={selectTypes?.ValueContainerProps} />)}


        `}
    </Fragment>
  );
}
