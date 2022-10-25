import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack4',
  },
  features: {
    postcss: false,
    /**
     * Enable code splitting
     * @see https://storybook.js.org/docs/react/builders/webpack#code-splitting
     */
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
};

export default config;
