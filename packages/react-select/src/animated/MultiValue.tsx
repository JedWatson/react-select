import React, { ReactElement } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { MultiValueProps } from '../components/MultiValue';
import { Collapse } from './transitions';
import { GroupBase } from '../types';

export type MultiValueComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MultiValueProps<Option, IsMulti, Group>
) => ReactElement;

export type AnimatedMultiValueProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = MultiValueProps<Option, IsMulti, Group> & Partial<TransitionProps>;

// strip transition props off before spreading onto actual component

const AnimatedMultiValue = (WrappedComponent: MultiValueComponent) => {
  return <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
    in: inProp,
    onExited,
    ...props
  }: AnimatedMultiValueProps<Option, IsMulti, Group>) => (
    <Collapse in={inProp} onExited={onExited}>
      <WrappedComponent cropWithEllipsis={inProp} {...props} />
    </Collapse>
  );
};

export default AnimatedMultiValue;
