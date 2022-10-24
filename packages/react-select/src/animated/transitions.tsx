import * as React from 'react';
import { useEffect, useState } from 'react';
import { ComponentType, CSSProperties, ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import {
  ExitHandler,
  TransitionStatus,
} from 'react-transition-group/Transition';

// ==============================
// Fade Transition
// ==============================

type FadeProps<ComponentProps> = {
  component: ComponentType<ComponentProps>;
  in?: boolean;
  onExited?: ExitHandler<undefined | HTMLElement>;
  duration?: number;
} & ComponentProps;
export const Fade = <ComponentProps extends {}>({
  component: Tag,
  duration = 1,
  in: inProp,
  onExited,
  ...props
}: FadeProps<ComponentProps>) => {
  const nodeRef = useRef<HTMLElement>(null);

  const transition: { [K in TransitionStatus]?: CSSProperties } = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: `opacity ${duration}ms` },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      mountOnEnter
      unmountOnExit
      in={inProp}
      timeout={duration}
      nodeRef={nodeRef}
    >
      {(state) => {
        const innerProps = {
          style: {
            ...transition[state],
          },
          ref: nodeRef,
        };
        return <Tag innerProps={innerProps} {...(props as any)} />;
      }}
    </Transition>
  );
};

// ==============================
// Collapse Transition
// ==============================

export const collapseDuration = 260;

type Width = number | 'auto';
interface CollapseProps {
  children: ReactNode;
  in?: boolean;
  onExited?: ExitHandler<undefined | HTMLElement>;
}

// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
export const Collapse = ({ children, in: _in, onExited }: CollapseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<Width>('auto');

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    /*
      Here we're invoking requestAnimationFrame with a callback invoking our
      call to getBoundingClientRect and setState in order to resolve an edge case
      around portalling. Certain portalling solutions briefly remove children from the DOM
      before appending them to the target node. This is to avoid us trying to call getBoundingClientrect
      while the Select component is in this state.
    */
    // cannot use `offsetWidth` because it is rounded
    const rafId = window.requestAnimationFrame(() =>
      setWidth(current.getBoundingClientRect().width)
    );

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <Transition
      enter={false}
      mountOnEnter
      unmountOnExit
      in={_in}
      onExited={() => {
        const { current } = ref;
        if (!current) return;
        onExited?.(current);
      }}
      timeout={collapseDuration}
      nodeRef={ref}
    >
      {(state) => (
        <div
          ref={ref}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            ...(state === 'exiting'
              ? { width: 0, transition: `width ${collapseDuration}ms ease-out` }
              : state === 'exited'
              ? { width: 0 }
              : { width }),
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
