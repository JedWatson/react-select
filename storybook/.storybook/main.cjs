module.exports = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    /**
     * Enable code splitting
     * @see https://storybook.js.org/docs/react/builders/webpack#code-splitting
     */
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
};
