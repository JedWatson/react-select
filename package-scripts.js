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
        concurrent.nps('build.rollup', 'build.babel')
      ),
      rollup: 'rollup --config',
      babel: 'babel src -d lib',
      watch: 'babel src -d lib -w',
      examples: series(
        rimraf('examples/dist'),
        'webpack --progress -p',
        'cp examples/favicon.ico examples/dist/favicon.ico',
        'cp examples/index.css examples/dist/index.css',
        "echo '/*    /index.html   200' >> examples/dist/_redirects"
      ),
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
