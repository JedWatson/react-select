/** @jsx jsx */
import { Component, FunctionComponent, MouseEvent, RefCallback } from 'react';
import { jsx } from '@emotion/react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { animatedScrollTo } from 'react-select/src/utils';
import routes from './routes';
import ScrollSpy from './ScrollSpy';
import Sticky from './Sticky';
import store, { Data } from '../markdown/store';

const navWidth = 180;
const appGutter = 20;
const contentGutter = 30;

const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const NavSection: FunctionComponent<RouteComponentProps> = () => {
  const routeKeys = Object.keys(routes);
  return (
    <Switch>
      {routeKeys.map(r => (
        <Route key={r} path={r} render={p => <PageNav {...p} />} />
      ))}
    </Switch>
  );
};

interface NavState {
  readonly links: readonly Data[];
  readonly activeId: string | null;
}

class PageNav extends Component<RouteComponentProps, NavState> {
  scrollSpy!: ScrollSpy;
  state: NavState = { activeId: null, links: [] };
  componentDidMount() {
    const { match } = this.props;

    // eslint-disable-next-line
    this.setState({ links: store.getPageHeadings(match.path) });
  }
  componentDidUpdate({ history, location }: RouteComponentProps) {
    const { hash } = this.props.location; // old hash
    const shouldRefresh = location.hash !== hash && history.action !== 'POP';

    // this makes everything work, need those fresh nodes
    if (shouldRefresh && this.scrollSpy.buildNodeList) {
      this.scrollSpy.buildNodeList();
    }
  }
  getSelected = (ids: readonly (string | null)[]) => {
    const activeId = ids[0];
    if (activeId !== this.state.activeId) {
      this.setState({ activeId });
    }
  };
  getScrollSpy: RefCallback<ScrollSpy> = ref => {
    if (!ref) return;
    this.scrollSpy = ref;
  };
  handleItemClick = ({
    event,
    hash,
  }: {
    readonly event: MouseEvent<HTMLDivElement>;
    readonly hash: string;
  }) => {
    event.preventDefault();
    const path = `#${hash}`;
    const el = document.querySelector<HTMLElement>(path);
    const { history } = this.props;

    if (el && el.offsetTop) {
      history.replace(path);
      animatedScrollTo(window, el.offsetTop);
    }
  };
  render() {
    const { activeId, links } = this.state;
    const isSmallDevice = window.innerWidth <= 769;

    return links && links.length ? (
      <Sticky preserveHeight={isSmallDevice}>
        <ScrollSpy ref={this.getScrollSpy} onChange={this.getSelected}>
          <Nav>
            {links.map(l => {
              const hash = l.path.slice(1);
              const selected = hash === activeId;

              return l.level > 0 ? (
                <NavItem
                  data-hash={hash}
                  key={hash}
                  selected={selected}
                  level={l.level}
                  onClick={event => {
                    this.handleItemClick({ event, hash });
                  }}
                >
                  {l.label}
                </NavItem>
              ) : null;
            })}
          </Nav>
        </ScrollSpy>
      </Sticky>
    ) : null;
  }
}

export default NavSection;

const Nav = (props: JSX.IntrinsicElements['div']) => (
  <div
    css={{
      [smallDevice]: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        fontSize: 13,
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingBottom: contentGutter,
        paddingTop: contentGutter,
        width: navWidth,
        zIndex: 1,
      },
    }}
    {...props}
  />
);

interface NavItemProps {
  readonly level: number;
  readonly selected: boolean;
}

const NavItem = ({
  level,
  selected,
  ...props
}: NavItemProps & JSX.IntrinsicElements['div']) => (
  <div
    role="button"
    css={{
      color: selected ? '#091e42' : '#7A869A',
      cursor: 'pointer',
      display: 'inline-block',
      padding: `15px ${appGutter}px`,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: selected ? 'hsl(0, 0%, 10%)' : '#2684FF',
      },

      [smallDevice]: {
        display: level === 3 ? 'none' : undefined,
        boxShadow: selected ? 'inset 0 -1px 0 black' : undefined,
        padding: `10px ${appGutter}px`,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        display: 'block',
        fontSize: level === 3 ? '0.9em' : undefined,
        fontWeight: selected ? 800 : 'inherit',
        padding: '10px 20px 10px 0',
        paddingLeft: level === 3 ? 10 : 0,
        transition: 'padding-left 150ms ease-out',
      },
    }}
    {...props}
  />
);
