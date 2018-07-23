const { BABEL_ENV, NODE_ENV } = process.env;
const test = NODE_ENV === 'test';
const cjs = BABEL_ENV === 'cjs' || test;

module.exports = {
  plugins: [
    'emotion',
    'transform-class-properties',
    'transform-object-rest-spread',
    test && 'istanbul',
  ].filter(Boolean),
  presets: [
    ['env', {
      modules: cjs ? 'commonjs' : false,
      loose: true,
    }],
    'react',
  ],
  ignore: ['node_modules'],
};
