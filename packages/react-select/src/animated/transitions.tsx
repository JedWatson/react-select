import * as React from 'react';
import {
  Component,
  ComponentType,
  createRef,
  CSSProperties,
  ReactNode,
  useRef,
} from 'react';
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
interface CollapseState {
  width: Width;
}

// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
export class Collapse extends Component<CollapseProps, CollapseState> {
  duration = collapseDuration;
  rafID?: number | null;
  state: CollapseState = { width: 'auto' };
  transition: { [K in TransitionStatus]?: CSSProperties } = {
    exiting: { width: 0, transition: `width ${this.duration}ms ease-out` },
    exited: { width: 0 },
  };
  nodeRef = createRef<HTMLDivElement>();

  componentDidMount() {
    const { current: ref } = this.nodeRef;

    /*
      A check on existence of ref should not be necessary at this point,
      but TypeScript demands it.
    */
    if (ref) {
      /*
        Here we are setting default width as auto for selected option.
      */
      this.rafID = window.requestAnimationFrame(() => {
        this.setState({ width: 'auto' });
      });
    }
  }

  componentWillUnmount() {
    if (this.rafID) {
      window.cancelAnimationFrame(this.rafID);
    }
  }

  // get base styles
  getStyle = (width: Width): CSSProperties => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width,
  });

  // get transition styles
  getTransition = (state: TransitionStatus) => this.transition[state];

  render() {
    const { children, in: inProp, onExited } = this.props;
    const exitedProp = () => {
      if (this.nodeRef.current && onExited) {
        onExited(this.nodeRef.current);
      }
    };

    const { width } = this.state;

    return (
      <Transition
        enter={false}
        mountOnEnter
        unmountOnExit
        in={inProp}
        onExited={exitedProp}
        timeout={this.duration}
        nodeRef={this.nodeRef}
      >
        {(state) => {
          const style = {
            ...this.getStyle(width),
            ...this.getTransition(state),
          };
          return (
            <div ref={this.nodeRef} style={style}>
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
}
