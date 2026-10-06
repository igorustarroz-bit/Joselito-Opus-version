import remarkGfm from 'remark-gfm';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-links',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: ['../public'],
};
export default config;
