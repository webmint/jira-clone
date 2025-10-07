import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-design-token',
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  typescript: {
    check: true,
  },
};

export default config;
