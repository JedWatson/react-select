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
        concurrent.nps('build.rollup', 'build.babel'),
        'nps build.flowtype',
        rimraf('lib/__tests__')
      ),
      rollup: 'rollup --config',
      babel: 'babel src -d lib',
      watch: 'babel src -d lib -w',
      flowtype: {
        description: 'make flow types available to consumers',
        default: concurrent.nps('build.flowtype.lib'),
        lib: 'echo "// @flow\n\nexport * from \'../src\';" > lib/index.js.flow',
      },
      docs: series(rimraf('docs/dist'), 'cross-env FORCE_EXTRACT_REACT_TYPES=true webpack --progress -p'),
    },
    publish: {
      default: series(
        'nps build.docs',
        'gh-pages -d docs/dist',
        rimraf('docs/dist')
      ),
    },
  },
};
