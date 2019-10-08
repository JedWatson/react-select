module.exports = {
  plugins: [
    'emotion',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
};
