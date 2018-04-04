// @flow
import React, { Component, type ComponentType } from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';
import PrettyPropType from './PrettyPropType';
import Description from './Description';
import md from 'react-markings';

const PropTypeWrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 4)}px;
`;

const Heading = styled.h3`
  border-bottom: 2px solid ${themed({ light: colors.N20, dark: colors.DN40 })};
  font-size: 0.9rem;
  font-weight: normal;
  line-height: 1.4;
  margin: 0 0 ${gridSize}px 0;
  padding-bottom: ${gridSize}px;
`;

const HeadingDefault = styled.code`
  color: ${colors.subtleText};
`;

const HeadingRequired = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;

const HeadingType = styled.span`
  background: ${themed({ light: colors.N20, dark: colors.DN20 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.N300, dark: colors.DN300 })};
  display: inline-block;
  padding: 0 0.2em;
`;
const HeadingName = styled.span`
  background: ${themed({ light: colors.B50, dark: colors.B500 })};
  color: ${themed({ light: colors.B500, dark: colors.B50 })};
  border-radius: ${borderRadius}px;
  display: inline-block;
  margin-right: 0.8em;
  padding: 0 0.2em;
`;

type PropTypeHeadingProps = {
  name: any,
  required: boolean,
  type: any,
  // This is probably giving up
  defaultValue?: any,
};

function PropTypeHeading(props: PropTypeHeadingProps) {
  return (
    <Heading>
      <code>
        <HeadingName>{props.name}</HeadingName>
        <HeadingType>{props.type}</HeadingType>
        {props.defaultValue !== undefined && (
          <HeadingDefault> = {props.defaultValue}</HeadingDefault>
        )}
        {props.required && props.defaultValue === undefined ? (
          <HeadingRequired> required</HeadingRequired>
        ) : null}
      </code>
    </Heading>
  );
}

type Kind = any;

export type CommonProps = {
  defaultValue?: string,
  description?: string,
  required: boolean,
  name: string,
  typeValue: Kind,
  type: string,
  shouldCollapse?: boolean,
}

type PropProps = CommonProps & {
  shapeComponent: ComponentType<CommonProps>
}

export default class Prop extends Component<PropProps> {
  static defaultProps = {
    shapeComponent: (props: CommonProps) => <PrettyPropType {...props} />
  }

  render () {
    let { shapeComponent: ShapeComponent, ...commonProps } = this.props;

    let {
      defaultValue,
      description,
      name,
      required,
      type,
    } = commonProps;

    if (type === 'All Components Object') console.log(defaultValue);

    return (
      <PropTypeWrapper>
        <PropTypeHeading
          name={name}
          required={required}
          type={type}
          defaultValue={defaultValue}
        />
        {description && <Description>{md([description])}</Description>}
        <ShapeComponent {...commonProps} />
      </PropTypeWrapper>
    );
  }
}
