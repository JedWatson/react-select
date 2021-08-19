import React, { ReactElement } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ValueContainerProps } from '../components/containers';
import { GroupBase } from '../types';

export type ValueContainerComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => ReactElement;

// make ValueContainer a transition group
const AnimatedValueContainer =
  (WrappedComponent: ValueContainerComponent) =>
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: ValueContainerProps<Option, IsMulti, Group>
  ) =>
    <TransitionGroup component={WrappedComponent} {...(props as any)} />;

export default AnimatedValueContainer;
