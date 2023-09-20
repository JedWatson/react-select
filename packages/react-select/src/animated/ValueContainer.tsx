import * as React from 'react';
import { useEffect, useState, ReactElement, ReactNode } from 'react';
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

interface IsMultiValueContainerProps extends ValueContainerProps {
  component: ValueContainerComponent;
}

// make ValueContainer a transition group
const AnimatedValueContainer =
  (WrappedComponent: ValueContainerComponent) =>
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: ValueContainerProps<Option, IsMulti, Group>
  ) =>
    props.isMulti ? (
      <IsMultiValueContainer component={WrappedComponent} {...(props as any)} />
    ) : (
      <TransitionGroup component={WrappedComponent} {...(props as any)} />
    );

const IsMultiValueContainer = ({
  component,
  ...restProps
}: IsMultiValueContainerProps) => {
  const multiProps = useIsMultiValueContainer(restProps);

  return <TransitionGroup component={component} {...(multiProps as any)} />;
};

const useIsMultiValueContainer = ({
  children,
  ...props
}: ValueContainerProps) => {
  const {
    isMulti,
    hasValue,
    innerProps,
    selectProps: { components, controlShouldRenderValue },
  } = props;

  const [cssDisplayFlex, setCssDisplayFlex] = useState(
    isMulti && controlShouldRenderValue && hasValue
  );
  const [removingValue, setRemovingValue] = useState(false);

  useEffect(() => {
    if (hasValue && !cssDisplayFlex) {
      setCssDisplayFlex(true);
    }
  }, [hasValue, cssDisplayFlex]);

  useEffect(() => {
    if (removingValue && !hasValue && cssDisplayFlex) {
      setCssDisplayFlex(false);
    }
    setRemovingValue(false);
  }, [removingValue, hasValue, cssDisplayFlex]);

  const onExited = () => setRemovingValue(true);

  const childMapper = (child: ReactNode) => {
    if (isMulti && React.isValidElement(child)) {
      // Add onExited callback to MultiValues
      if (child.type === components.MultiValue) {
        return React.cloneElement(child, { onExited });
      }
      // While container flexed, Input cursor is shown after Placeholder text,
      // so remove Placeholder until display is set back to grid
      if (child.type === components.Placeholder && cssDisplayFlex) {
        return null;
      }
    }
    return child;
  };

  const newInnerProps = {
    ...innerProps,
    style: {
      ...innerProps?.style,
      display: (isMulti && hasValue) || cssDisplayFlex ? 'flex' : 'grid',
    },
  };

  const newProps = {
    ...props,
    innerProps: newInnerProps,
    children: React.Children.toArray(children).map(childMapper),
  };

  return newProps;
};

export default AnimatedValueContainer;
