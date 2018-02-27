import {
  Animated,
  Async,
  Creatable,
  Experimental,
  Intro,
  Styled,
} from '../home';
import { QuickStart } from '../guides';
import { Methods, PropTypes } from '../api';
import { StylesIntro } from '../styles';
import { ComponentsIntro } from '../components';
import { AsyncIntro } from '../async';
import { CreatableIntro } from '../creatable';
import { AdvancedIntro } from '../advanced';

export default {
  '/home': [
    { label: 'Intro', path: '/home', Component: Intro },
    { label: 'Animation', path: '/home/animated', Component: Animated },
    { label: 'Async Options', path: '/home/async', Component: Async },
    {
      label: 'Creatable Options',
      path: '/home/creatable',
      Component: Creatable,
    },
    { label: 'Custom Styles', path: '/home/styled', Component: Styled },
    {
      label: 'Experimental',
      path: '/home/experimental',
      Component: Experimental,
    },
  ],
  '/api': [
    { label: 'Prop Types', path: '/api', Component: PropTypes },
    { label: 'Methods', path: '/api/methods', Component: Methods },
  ],
  '/guides': [
    {
      label: 'Quick Start',
      path: '/guides',
      Component: QuickStart,
    },
  ],
  '/styles': [{ label: 'Intro', path: '/styles', Component: StylesIntro }],
  '/components': [
    { label: 'Intro', path: '/components', Component: ComponentsIntro },
  ],
  '/async': [{ label: 'Intro', path: '/async', Component: AsyncIntro }],
  '/creatable': [
    { label: 'Intro', path: '/creatable', Component: CreatableIntro },
  ],
  '/advanced': [
    { label: 'Intro', path: '/advanced', Component: AdvancedIntro },
  ],
};
