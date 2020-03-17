module.exports = {
  plugins: [
    'emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
};
