// @flow
import React, { Component, type Node } from 'react';
import { gridSize } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import convert, { resolveFromGeneric } from 'kind2string';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import allComponents, { type Components } from './components';

const Wrapper = styled.code`
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: ${gridSize}px;
  margin-top: ${gridSize}px;
`;

const Block = styled.span`
  display: block;
`;

const TypeMinWidth = styled.span`
  display: inline-block;
  min-width: 60px;
`;

const Collapse = ({ height, isCollapsed, innerRef, ...props }) => {
  return (
    <div
      ref={innerRef}
      style={{
        height: isCollapsed ? 0 : height,
        overflow: isCollapsed ? 'hidden' : null,
        transition: 'height 260ms cubic-bezier(0.2, 0, 0, 1)',
      }}
      {...props}
    />
  );
};

type toggleProps = {
  beforeCollapse: (boolean, () => mixed) => Node,
  afterCollapse: (boolean, () => mixed) => Node,
  beginClosed: boolean,
  children: Node,
};

type toggleState = {
  isCollapsed: boolean,
  contentHeight: number,
};

class Toggle extends Component<toggleProps, toggleState> {
  static defaultProps = {
    beforeCollapse: () => null,
    afterCollapse: () => null,
    beginClosed: false,
    children: null,
  };

  content: ?HTMLElement;

  constructor(props: toggleProps) {
    super(props);

    this.state = {
      isCollapsed: this.props.beginClosed,
      contentHeight: 0,
    };
  }

  componentDidMount() {
    const contentHeight = this.content ? this.content.scrollHeight : 0;
    this.setState({ contentHeight });
  }

  componentWillReceiveProps() {
    const contentHeight = this.content ? this.content.scrollHeight : 0;
    if (contentHeight !== this.state.contentHeight) {
      this.setState({ contentHeight });
    }
  }

  getContent = ref => {
    if (!ref) return;
    this.content = ref;
  };

  toggleCollapse = () => {
    const contentHeight = this.content ? this.content.scrollHeight : 0;
    this.setState({ contentHeight, isCollapsed: !this.state.isCollapsed });
  };

  render() {
    let { beforeCollapse, children, afterCollapse } = this.props;
    let { isCollapsed, contentHeight } = this.state;

    return (
      <div>
        {beforeCollapse(isCollapsed, this.toggleCollapse)}
        <Collapse
          isCollapsed={isCollapsed}
          duration={500}
          height={contentHeight}
          innerRef={this.getContent}
        >
          {children}
        </Collapse>
        {afterCollapse(isCollapsed, this.toggleCollapse)}
      </div>
    );
  }
}

const SIMPLE_TYPES = [
  'array',
  'boolean',
  'number',
  'string',
  'symbol',
  'node',
  'element',
  'custom',
  'any',
  'void',
  'mixed',
];

/* eslint-disable no-use-before-define */
/* eslint-disable prefer-rest-params */
function printComplexType(type, components, depth) {
  if (typeof type === 'object' && !SIMPLE_TYPES.includes(type.kind)) {
    return prettyConvert(type, components, depth);
  }
  return null;
}
/* eslint-enable no-use-before-define */
/* eslint-enable prefer-rest-params */

// const printFunc = type => null;

type PrettyPropTypeProps = {
  typeValue: Object,
  shouldCollapse?: boolean,
  components: Components,
};

const converters = {
  intersection: (type, components) =>
    type.types.reduce(
      (acc, intersectionType, index) =>
        index < type.types.length - 1
          ? [
              ...acc,
              <span key={index}>{prettyConvert(intersectionType, components)}</span>,
              <div key={`divider-${index}`}>&</div>,
            ]
          : [...acc, <span key={index}>{prettyConvert(intersectionType, components)}</span>],
      [],
    ),
  string: (type, components) => {
    if (type.value != null) {
      return <components.StringType>{convert(type)}</components.StringType>;
    }
    return <components.Type>{convert(type)}</components.Type>;
  },
  nullable: (type, components, depth) => {
    return prettyConvert(type.arguments, components, depth);
  },
  generic: (type, components, depth) => {
    if (type.value && type.typeParams) {
      // As Flow does not know what the keyword Array<T> means, we're doing a check here for generic types with a nominal value of 'Array'
      // If a type meets this criteria, we print out its contents as per below.
      return (
        <span>
          <components.TypeMeta>
            {convert(type.value)} <components.Outline>{'<'}</components.Outline>
          </components.TypeMeta>
          <components.Indent>
            {type.typeParams.params.map((param, i) => (
              <span key={i}>{prettyConvert(param, components, depth)}</span>
            ))}
          </components.Indent>
          <components.TypeMeta>
            <components.Outline>{'>'}</components.Outline>
          </components.TypeMeta>
        </span>
      );
    }
    return prettyConvert(resolveFromGeneric(type), components);
  },
  object: (type, components, depth) => (
    <span>
      <components.TypeMeta>
        Shape <components.Outline>{'{'}</components.Outline>
      </components.TypeMeta>
      <components.Indent>
        {type.members.map(prop => {
          if (prop.kind === 'spread') {
            const nestedObj = resolveFromGeneric(prop.value);
            return nestedObj.members.map(newProp =>
              prettyConvert(newProp, components, depth),
            );
          }
          return prettyConvert(prop, components, depth);
        })}
      </components.Indent>
      <components.TypeMeta>
        <components.Outline>{'}'}</components.Outline>
      </components.TypeMeta>
    </span>
  ),
  property: (type, components, depth) => (
    <div key={convert(type.key)}>
      <TypeMinWidth>
        <components.Type>{convert(type.key)}</components.Type>
      </TypeMinWidth>{' '}
      {type.value.kind !== 'generic' ? type.value.kind : ''}
      {type.optional ? null : <components.Required> required</components.Required>}{' '}
      {printComplexType(type.value, components, depth)}
    </div>
  ),
  union: (type, components, depth) => (
    <span>
      <components.TypeMeta>
        One of <components.Outline>{'('}</components.Outline>
      </components.TypeMeta>
      <components.Indent>
        {type.types.map((t, i) => (
          <Block key={i}>{prettyConvert(t, components, depth + 1)}</Block>
        ))}
      </components.Indent>
      <components.TypeMeta>
        <components.Outline>{')'}</components.Outline>
      </components.TypeMeta>
    </span>
  ),
};

const prettyConvert = (type, components: Object, depth = 1) => {
  if (!type) {
    return '';
  }

  if (!components) console.log(type);

  const converter = converters[type.kind];
  if (!converter) {
    return <components.Type>{convert(type)}</components.Type>;
  }
  return converter(type, components, depth);
};

export default class PrettyPropType extends Component<PrettyPropTypeProps, *> {
  static defaultProps = {
    components: allComponents,
  }

  render() {
    let { shouldCollapse, typeValue: type, components } = this.props;
    // any instance of returning null means we are confident the information will
    // be displayed elsewhere so we do not need to also include it here
    if (type.kind === 'generic') {
      type = resolveFromGeneric(type);
    }
    if (SIMPLE_TYPES.includes(type.kind)) return null;
    if (
      type.kind === 'nullable' &&
      SIMPLE_TYPES.includes(type.arguments.kind)
    ) {
      return null;
    }
    return shouldCollapse ? (
      <Toggle
        beginClosed
        afterCollapse={(isCollapsed, toggleCollapse) => (
          <div>
            <Button
              iconBefore={
                isCollapsed ? (
                  <ChevronDownIcon label="expandIcon" />
                ) : (
                  <ChevronUpIcon label="collapseIcon" />
                )
              }
              onClick={toggleCollapse}
            >
              {isCollapsed ? 'Expand Prop Shape' : 'Hide Prop Shape'}
            </Button>
          </div>
        )}
      >
        <Wrapper>{prettyConvert(type, components)}</Wrapper>
      </Toggle>
    ) : (
      <Wrapper>{prettyConvert(type, components)}</Wrapper>
    );
  }
}
