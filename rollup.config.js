// @flow

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

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
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es',
    },
    external: [...external, 'raf'],
    plugins: [babel(babelOptions())],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions()), resolve(), commonjs()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.min.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions()), resolve(), commonjs(), uglify({}, minify)],
  },
];
