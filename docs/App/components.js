// @flow
// @jsx glam

import glam from 'glam';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const navWidth = 180;
const appWidth = 800;
const appGutter = 20;
const contentGutter = 30;
const pagePadding = 140;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

export const AppContainer = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: appWidth,
      minHeight: '100vh',
      padding: `0 ${appGutter}px`,
    }}
    {...props}
  />
);
export const PageContent = (props: any) => (
  <div
    css={{
      paddingBottom: contentGutter,
      paddingTop: contentGutter,

      [smallDevice]: {
        paddingTop: contentGutter * 2,
      },
    }}
    {...props}
  />
);
export const AppContent = (props: any) => (
  <div
    css={{
      flex: '1 1 auto',
      marginLeft: 'auto',
      marginRight: 'auto',

      [largeDevice]: {
        paddingLeft: navWidth + contentGutter,
      },
    }}
    {...props}
  />
);

// ==============================
// Navigation
// ==============================

export const PrimaryNav = (props: any) => (
  <div
    css={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'inset 0 -px 0 rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: 13,
      fontWeight: 'bold',
      overflowX: 'auto',
      top: 0,
      width: '100%',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    <div
      css={{
        boxSizing: 'border-box',
        display: 'flex ',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      {...props}
    />
  </div>
);
type PrimaryNavItemProps = { selected: boolean };
export const PrimaryNavItem = ({ selected, ...props }: PrimaryNavItemProps) => (
  <Link
    css={{
      // boxShadow: selected ? 'inset 0 -3px 0 white' : null,
      color: selected ? 'white' : 'rgba(255, 255, 255, 0.6)',
      display: 'inline-block',
      padding: `15px ${appGutter}px`,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: selected ? 'white' : 'rgba(255, 255, 255, 0.8)',
      },

      [smallDevice]: {
        padding: `10px ${appGutter}px`,
      },
    }}
    {...props}
  />
);

// ==============================
// Scroll Restoration
// ==============================

// Return scroll to top on route change
class ScrollToTop extends Component<*> {
  componentDidUpdate(prevProps) {
    const { history, location } = this.props;

    // do not influence scroll on browser back/forward
    if (history.action === 'POP') return;

    // no scroll when extending the current path
    const pathArr = location.pathname.split('/');
    if (!prevProps.location.pathname.includes(pathArr[1])) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollRestoration = withRouter(ScrollToTop);
