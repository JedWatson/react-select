// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import type { RouterProps } from '../types';
import routes from './routes';
import Sticky from './Sticky';

const navWidth = 180;
const appGutter = 20;
const contentGutter = 30;

const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

const NavSection = () => {
  return (
    <Switch>
      <Route path="/api" render={p => <PageNav {...p} />} />
      <Route path="/examples" render={p => <PageNav {...p} />} />
      <Route path="/guides" render={p => <PageNav {...p} />} />
    </Switch>
  );
};

const PageNav = ({ location, match }: RouterProps) => {
  const links = routes[match.path];
  const isSmallDevice = window.innerWidth <= 769;

  return (
    <Sticky preserveHeight={isSmallDevice}>
      <Nav>
        {links.map(l => {
          const selected = location.pathname === l.path;
          return (
            <NavItem key={l.path} selected={selected} to={l.path}>
              {l.label}
            </NavItem>
          );
        })}
      </Nav>
    </Sticky>
  );
};

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
        // width: '100%',
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
type NavItemProps = { selected: boolean };
const NavItem = ({ selected, ...props }: NavItemProps) => (
  <Link
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
        boxShadow: selected ? 'inset 0 -1px 0 black' : null,
        padding: `10px ${appGutter}px`,
      },

      [largeDevice]: {
        backgroundColor: selected ? 'white' : 'transparent',
        display: 'block',
        fontWeight: selected ? 800 : 'inherit',
        padding: '10px 20px 10px 0',
        right: -1,

        ':before': {
          content: ' ',
          // background: 'linear-gradient(90deg, fade(#e9e9e9, 0%) 94%, #e9e9e9)',
        },
      },
    }}
    {...props}
  />
);
