// @flow

const npsUtils = require('nps-utils');
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const concurrent = npsUtils.concurrent;

module.exports = {
  scripts: {
    build: {
      description: 'clean dist directory and run all builds',
      default: series(
        rimraf('dist'),
        rimraf('lib'),
        concurrent.nps('build.rollup', 'build.babel', 'build.flowtype')
      ),
      rollup: 'rollup --config',
      babel: 'babel src -d lib',
      watch: 'babel src -d lib -w',
      flowtype: {
        description: 'make flow types available to consumers',
        default: concurrent.nps('build.flowtype.dist', 'build.flowtype.lib'),
        dist: "flow-copy-source -i '**/__tests__/**' src dist",
        lib: "flow-copy-source -i '**/__tests__/**' src lib",
      },
      examples: series(rimraf('examples/dist'), 'webpack --progress -p'),
    },
    publish: {
      default: series(
        'nps build.examples',
        'gh-pages -d examples/dist',
        rimraf('examples/dist')
      ),
    },
  },
};
