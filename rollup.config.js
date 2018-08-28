// @flow

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
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
const babelOptions = () => {
  let result = {
    babelrc: false,
    presets: [['env', { modules: false }], 'react'],
    plugins: [
      'emotion',
      'transform-class-properties',
      'transform-object-rest-spread',
      'external-helpers',
    ],
  };
  return result;
};

export default [
  {
    input: './src/index.js',
    output: {
      file: pkg.module,
      format: 'esm',
    },
    external: (id/*: string*/) => !id.startsWith('.') && !id.startsWith('/'),
    plugins: [babel(babelOptions()), sizeSnapshot()],
  },

  {
    input: './src/index.umd.js',
    output: {
      name,
      file: path + '.js',
      format: 'umd',
      globals,
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs(), sizeSnapshot()],
  },

  {
    input: './src/index.umd.js',
    output: {
      name,
      file: path + '.min.js',
      format: 'umd',
      globals,
    },
    external,
    plugins: [babel(babelOptions()), resolve(), commonjs(), uglify()],
  },
];
