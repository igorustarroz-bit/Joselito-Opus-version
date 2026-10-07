import fs from 'node:fs';
import remarkGfm from 'remark-gfm';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-links',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  // public/ es opcional: si no existe, Storybook no debe fallar
  staticDirs: fs.existsSync(new URL('../public', import.meta.url)) ? ['../public'] : [],
};
export default config;
