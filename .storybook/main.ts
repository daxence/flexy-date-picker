import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        // Storybook 10 generates a `file://./` URL for the MDX React shim which
        // Rollup cannot resolve. Override with the underlying package directly.
        mdxPluginOptions: {
          mdxCompileOptions: {
            providerImportSource: '@mdx-js/react',
          },
        },
      },
    },
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal(config) {
    // vite-plugin-dts is only for the library build — remove it from Storybook.
    config.plugins = (config.plugins ?? [])
      .flat()
      .filter((p: unknown) => (p as { name?: string })?.name !== 'vite:dts');
    return config;
  },
};

export default config;
