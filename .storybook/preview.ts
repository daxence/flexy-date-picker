import type { Preview } from '@storybook/react';
import '../src/shared/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|Color|foreground|primary|border|muted|surface|accent|today)/i,
        date: /Date$/i,
      },
      sort: 'requiredFirst',
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
        { name: 'slate', value: '#334155' },
      ],
    },
  },
};

export default preview;
