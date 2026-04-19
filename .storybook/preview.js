import { withThemeByDataAttribute } from '@storybook/addon-themes';

export const decorators = [
  withThemeByDataAttribute({
    defaultTheme: 'light',
    themes: {
      light: 'light',
    },
    attributeName: 'data-theme',
  }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'beige',
    values: [
      { name: 'beige', value: '#faf8f5' },
      { name: 'surface', value: '#e9e5dd' },
      { name: 'dark', value: '#1a2e1a' },
    ],
  },
  docs: {
    autodocs: true,
  },
};