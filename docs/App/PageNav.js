// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import type { RouterProps } from '../types';
import routes from './routes';
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

type NavState = { links: Array<Object> };

class PageNav extends Component<RouterProps, NavState> {
  state = { links: [] };
  componentDidMount() {
    const { match } = this.props;

    // eslint-disable-next-line
    this.setState({ links: store.getPageHeadings(match.path) });
  }
  render() {
    // const { location } = this.props;
    const { links } = this.state;
    const isSmallDevice = window.innerWidth <= 769;

    return links && links.length ? (
      <Sticky preserveHeight={isSmallDevice}>
        <Nav>
          {links.map(l => {
            // const selected = location.hash === l.path;

            return l.level > 1 ? (
              <NavItem
                key={l.path}
                // selected={selected}
                level={l.level}
                to={l.path}
              >
                {l.label}
              </NavItem>
            ) : null;
          })}
        </Nav>
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
        display: 'flex ',
        fontSize: 13,
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingTop: contentGutter,
        width: navWidth,
        zIndex: 1,
      },
    }}
    {...props}
  />
);
type NavItemProps = { level: 2 | 3, selected: boolean };
const scrollFn = el =>
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
const NavItem = ({ level, selected, ...props }: NavItemProps) => (
  <HashLink
    scroll={scrollFn}
    css={{
      color: selected ? '#091e42' : '#7A869A',
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
