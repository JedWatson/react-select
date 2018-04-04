// @flow
import React, { type Node, type ComponentType } from 'react';
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import convert, { getKind } from 'kind2string';

import { H2 } from './Heading';
import Prop, { type CommonProps } from './Prop';
import allComponents, { type Components } from './Components';

const Wrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 1.5)}px;

  @media (min-width: 780px) {
    margin-bottom: ${math.multiply(gridSize, 3)}px;
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;

const PageWrapper = ({
  children,
  heading,
}: {
  children: Node,
  heading?: string,
}) => (
  <Wrapper>
    {typeof heading === 'string' && heading.length === 0 ? null : (
      <H2>{heading || 'Props'}</H2>
    )}
    {children}
  </Wrapper>
);

const reduceToObj = type => {
  if (type.kind === 'generic') {
    return reduceToObj(type.value);
  } else if (type.kind === 'object') {
    return type.members;
  } else if (type.kind === 'intersection') {
    return type.types.reduce((acc, i) => [...acc, ...reduceToObj(i)], []);
  }
  // eslint-disable-next-line no-console
  console.warn('was expecting to reduce to an object and could not', type);
  return [];
};

type Obj = {
  kind: 'object',
  members: Array<any>,
};

type Gen = {
  kind: 'generic',
  value: any,
};

type Inter = {
  kind: 'intersection',
  types: Array<Obj | Gen>,
};

type DynamicPropsProps = {
  components: Components,
  heading?: string,
  shouldCollapseProps?: boolean,
  overrides?: {
    [string]: ComponentType<CommonProps>
  },
  props: {
    classes?: Array<{
      kind: string,
      value: Obj | Inter,
    }>,
  },
};

const getPropTypes = propTypesObj => {
  let propTypes;
  if (propTypesObj.kind === 'object') {
    propTypes = propTypesObj.members;
  } else if (propTypesObj.kind === 'intersection') {
    propTypes = propTypesObj.types.reduce(
      (acc, type) => [...acc, ...reduceToObj(type)],
      [],
    );
  }
  return propTypes;
};

const renderPropType = (propType, { overrides = {}, shouldCollapseProps, components }) => {
  if (propType.kind === 'spread') {
    const furtherProps = reduceToObj(propType.value);
    return furtherProps.map(p => renderPropType(p, { overrides, shouldCollapseProps, components }));
  }

  let description;
  if (propType.leadingComments) {
    description = propType.leadingComments.reduce(
      (acc, { value }) => acc.concat(`\n${value}`),
      '',
    );
  }

  if (!propType.value) {
    // eslint-disable-next-line no-console
    console.error(
      `Prop ${
        propType.key
      } has no type; this usually indicates invalid propType or defaultProps config`,
    );
    return null;
  }

  const name = convert(propType.key);
  const OverrideComponent = overrides[name];
  const commonProps = {
    components,
    name,
    key: convert(propType.key),
    required: !propType.optional,
    type: getKind(propType.value),
    defaultValue: propType.default && convert(propType.default),
    description: description,
    shouldCollapse: shouldCollapseProps,
    typeValue: propType.value,
  };

  return (
    overrides[name] ? <OverrideComponent {...commonProps}/> : <Prop
      {...commonProps}
    />
  );
};

export default function DynamicProps(props: DynamicPropsProps) {
  let { props: propDefinitions, ...rest } = props;

  const classes = propDefinitions && propDefinitions.classes;
  if (!classes) return null;

  const propTypesObj = classes[0] && classes[0].value;
  if (!propTypesObj) return null;

  const propTypes = getPropTypes(propTypesObj);
  if (!propTypes) return null;

  if (!rest.components) {
    rest.components = allComponents;
  } else {
    rest.components = { ...allComponents, ...rest.components };
  }

  return (
    <PageWrapper heading={props.heading}>
      {propTypes.map(propType => renderPropType(propType, rest))}
    </PageWrapper>
  );
}
