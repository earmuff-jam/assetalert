/** @type { import('@storybook/react').Preview } */

import { useMemo } from 'react';
import { darkTheme, lightTheme } from '../src/util/Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const THEMES = {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
};

export const decorators = [
  (story, context) => {
    const { theme: themeKey } = context.globals;
    const theme = useMemo(() => THEMES[themeKey] || THEMES['lightTheme'], [themeKey]);
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>{story()}</LocalizationProvider>
      </ThemeProvider>
    );
  },
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'theme',
    description: 'theme selection',
    toolbar: {
      icon: 'paintbrush',
      title: 'Select a theme',
      dynamicTitle: true,
      items: [
        {
          value: 'lightTheme',
          title: 'lightTheme',
        },
        {
          value: 'darkTheme',
          title: 'darkTheme',
        },
      ],
    },
  },
};

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
