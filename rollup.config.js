// @flow

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import pkg from './package.json';

const name = 'Select';
const path = 'dist/react-select';
const globals = {
  classnames: 'classNames',
  emotion: 'emotion',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-input-autosize': 'AutosizeInput',
  react: 'React',
};
// $FlowFixMe This should be inferred by Flow and manual casting does not work inside of this config.
const external = Object.keys(globals);

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: [...external, 'raf'],
    plugins: [babel()],
  },

  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: path + '.js',
      format: 'umd',
      globals,
    },
    external,
    plugins: [babel(), resolve(), commonjs()],
  },

  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: path + '.min.js',
      format: 'umd',
      globals,
    },
    external,
    plugins: [babel(), resolve(), commonjs(), uglify({}, minify)],
  },
];
