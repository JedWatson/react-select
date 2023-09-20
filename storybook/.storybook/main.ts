import type { StorybookConfig } from '@storybook/core-common';
import postcss from 'postcss';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
  ],
  core: {
    builder: 'webpack4',
  },
  features: {
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
