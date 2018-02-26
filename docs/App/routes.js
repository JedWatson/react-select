import {
  Animated,
  Async,
  Creatable,
  Experimental,
  Home,
  Styled,
} from '../examples';
import { Components, Styles, QuickStart } from '../guides';
import { Methods, PropTypes } from '../api';

export default {
  '/examples': [
    { label: 'Intro', path: '/examples', Component: Home },
    { label: 'Animation', path: '/examples/animated', Component: Animated },
    { label: 'Async Options', path: '/examples/async', Component: Async },
    {
      label: 'Creatable Options',
      path: '/examples/creatable',
      Component: Creatable,
    },
    { label: 'Custom Styles', path: '/examples/styled', Component: Styled },
    {
      label: 'Experimental',
      path: '/examples/experimental',
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
    { label: 'Components', path: '/guides/components', Component: Components },
    { label: 'Styles', path: '/guides/styles', Component: Styles },
  ],
};
