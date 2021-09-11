import { ComponentType } from 'react';
import Home from '../pages/home';
import Props from '../pages/props';
import Styles from '../pages/styles';
import Components from '../pages/components';
import Async from '../pages/async';
import Creatable from '../pages/creatable';
import Advanced from '../pages/advanced';
import TypeScript from '../pages/typescript';
import UpgradeGuide from '../pages/upgradeGuide';

const routes: { readonly [key: string]: ComponentType } = {
  '/home': Home,
  '/props': Props,
  '/styles': Styles,
  '/components': Components,
  '/async': Async,
  '/creatable': Creatable,
  '/advanced': Advanced,
  '/typescript': TypeScript,
  '/upgrade-guide': UpgradeGuide,
};

export default routes;
