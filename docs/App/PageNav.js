// @flow
/** @jsx jsx */
import { Component, type ElementRef } from 'react';
import { jsx } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import { animatedScrollTo } from 'react-select/src/utils';
import routes from './routes';
import ScrollSpy from './ScrollSpy';
import Sticky from './Sticky';
import store from '../markdown/store';

const navWidth = 180;
const appGutter = 20;
const contentGutter = 30;

const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const NavSection = () => {
  const routeKeys = Object.keys(routes);
  return (
    <Switch>
      {routeKeys.map(r => (
        <Route key={r} path={r} render={p => <PageNav {...p} />} />
      ))}
    </Switch>
  );
};

type NavState = { links: Array<Object>, activeId: string | null };

class PageNav extends Component<RouterProps, NavState> {
  scrollSpy: ElementRef<typeof ScrollSpy>;
  state = { activeId: null, links: [] };
  componentDidMount() {
    const { match } = this.props;

    // eslint-disable-next-line
    this.setState({ links: store.getPageHeadings(match.path) });
  }
  componentDidUpdate({ history, location }: RouterProps) {
    const { hash } = this.props.location; // old hash
    const shouldRefresh = location.hash !== hash && history.action !== 'POP';

    // this makes everything work, need those fresh nodes
    if (shouldRefresh && this.scrollSpy.buildNodeList) {
      this.scrollSpy.buildNodeList();
    }
  }
  getSelected = ids => {
    const activeId = ids[0];
    if (activeId !== this.state.activeId) {
      this.setState({ activeId });
    }
  };
  getScrollSpy = ref => {
    if (!ref) return;
    this.scrollSpy = ref;
  };
  handleItemClick = ({ event, hash }) => {
    event.preventDefault();
    const path = `#${hash}`;
    const el = document.querySelector(path);
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

const Nav = (props: any) => (
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
type NavItemProps = { level: 2 | 3, selected: boolean };

const NavItem = ({ level, selected, ...props }: NavItemProps) => (
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
        display: level === 3 ? 'none' : null,
        boxShadow: selected ? 'inset 0 -1px 0 black' : null,
        padding: `10px ${appGutter}px`,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        display: 'block',
        fontSize: level === 3 ? '0.9em' : null,
        fontWeight: selected ? 800 : 'inherit',
        padding: '10px 20px 10px 0',
        paddingLeft: level === 3 ? 10 : 0,
        transition: 'padding-left 150ms ease-out',
      },
    }}
    {...props}
  />
);
