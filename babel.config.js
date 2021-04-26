module.exports = {
  plugins: [
    '@emotion/babel-plugin',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    'babel-plugin-macros',
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
