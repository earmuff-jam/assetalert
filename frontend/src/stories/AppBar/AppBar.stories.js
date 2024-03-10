import AppBar from './AppBar';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'AppBar/AppBar',
  component: AppBar,
  decorators: [
    withRouter,
    (Story) => (
      <ThemeProvider theme={primary_theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryAppBar = {
  args: {
    title: 'Mashed',
    titleVariant: 'h6',
  },
};
