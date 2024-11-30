/** @type { import('@storybook/react').Preview } */

import { useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { darkTheme, lightTheme } from '../src/utils/Theme';
import { store } from '../src/Store';

const THEMES = {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
};

export const decorators = [
  (story, context) => {
    const { theme: themeKey } = context.globals;
    const theme = useMemo(() => THEMES[themeKey] || THEMES['lightTheme'], [themeKey]);
    return (
      <Box sx={{ padding: '2rem' }}>
        <MemoryRouter>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs}>{story()}</LocalizationProvider>
            </ThemeProvider>
          </Provider>
        </MemoryRouter>
      </Box>
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
      title: 'Light Theme',
      dynamicTitle: true,
      items: [
        {
          value: 'lightTheme',
          title: 'Light Theme',
        },
        {
          value: 'darkTheme',
          title: 'Dark Theme',
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
    layout: 'fullscreen',
  },
};

export default preview;
