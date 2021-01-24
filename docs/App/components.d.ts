import { Component } from 'react';

export interface PrimaryNavItemProps {
  selected: boolean;
  to: string;
}

export class AppContainer extends Component {}
export class AppContent extends Component {}
export class PageContent extends Component {}
export class PrimaryNav extends Component {}
export class PrimaryNavItem extends Component<PrimaryNavItemProps> {}
export class ScrollRestoration extends Component {}
