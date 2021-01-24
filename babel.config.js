module.exports = {
  plugins: [
    '@emotion/babel-plugin',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  overrides: [
    {
      test: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@emotion/babel-plugin',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-transform-runtime',
      ],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
  ],
};
