// @flow

import React, { Component, type ComponentType, type ElementRef } from 'react';
import { Transition } from 'react-transition-group';

export type fn = () => void;
export type BaseTransition = { in: boolean, onExited: fn };

// ==============================
// Fade Transition
// ==============================

type FadeProps = BaseTransition & {
  component: ComponentType<any>,
  duration: number,
};
export const Fade = ({
  component: Tag,
  duration = 1,
  in: inProp,
  onExited, // eslint-disable-line no-unused-vars
  ...props
}: FadeProps) => {
  const transition = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: `opacity ${duration}ms` },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition mountOnEnter unmountOnExit in={inProp} timeout={duration}>
      {state => {
        const style = {
          ...transition[state],
        };
        return <Tag style={style} {...props} />;
      }}
    </Transition>
  );
};

// ==============================
// Collapse Transition
// ==============================

export const collapseDuration = 260;

type TransitionState = 'exiting' | 'exited';
type Width = number | 'auto';
type CollapseProps = { children: any, in: boolean };
type CollapseState = { width: Width };

// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
export class Collapse extends Component<CollapseProps, CollapseState> {
  duration = collapseDuration;
  state = { width: 'auto' };
  transition = {
    exiting: { width: 0, transition: `width ${this.duration}ms ease-out` },
    exited: { width: 0 },
  };
  getWidth = (ref: ElementRef<*>) => {
    if (ref && isNaN(this.state.width)) {
      this.setState({ width: ref.offsetWidth });
    }
  };
  getStyle = (width: Width) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width,
  });
  getTransition = (state: TransitionState) => this.transition[state];
  render() {
    const { children, in: inProp } = this.props;
    const { width } = this.state;

    return (
      <Transition
        enter={false}
        mountOnEnter
        unmountOnExit
        in={inProp}
        timeout={this.duration}
      >
        {state => {
          const style = {
            ...this.getStyle(width),
            ...this.getTransition(state),
          };
          return (
            <div ref={this.getWidth} style={style}>
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}
