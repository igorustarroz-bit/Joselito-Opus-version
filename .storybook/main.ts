import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        // remark-gfm habilita tablas (GFM) en la documentación MDX
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: '@storybook/react-vite',
  // base relativa: permite servir Storybook desde un subpath (GitHub Pages)
  viteFinal: async (cfg) => {
    cfg.base = './';
    return cfg;
  },
};

export default config;
