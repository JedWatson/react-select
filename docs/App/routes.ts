import { ComponentType } from 'react';
import Home from '../pages/home';
import Props from '../pages/props';
import Styles from '../pages/styles';
import Components from '../pages/components';
import Async from '../pages/async';
import Creatable from '../pages/creatable';
import Advanced from '../pages/advanced';
import Upgrade from '../pages/upgrade';
import UpgradeToV2 from '../pages/upgrade-to-v2';

const routes: { readonly [key: string]: ComponentType } = {
  '/home': Home,
  '/props': Props,
  '/styles': Styles,
  '/components': Components,
  '/async': Async,
  '/creatable': Creatable,
  '/advanced': Advanced,
  '/upgrade': Upgrade,
  '/upgrade-to-v2': UpgradeToV2,
};

export default routes;
