import Home from '../home';
import Api from '../api';
import Styles from '../styles';
import Components from '../components';
import Async from '../async';
import Creatable from '../creatable';
import Advanced from '../advanced';
import Tests from '../Tests';

export default {
  '/home': Home,
  '/api': Api,
  '/styles': Styles,
  '/components': Components,
  '/async': Async,
  '/creatable': Creatable,
  '/advanced': Advanced,

  // cypress
  '/tests': Tests,
};
