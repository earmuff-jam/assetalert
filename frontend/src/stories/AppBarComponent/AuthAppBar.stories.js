import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import AuthAppBar from '../../Components/AppBarComponent/AuthAppBar';

export default {
  title: 'LandingPage/AuthAppBar',
  component: AuthAppBar,
  decorators: [
    withRouter,
    (Story) => (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={primary_theme}>
          <Story />
        </ThemeProvider>
      </StyledEngineProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryAuthAppBar = {
  args: {
    title: '',
    titleVariant: 'h6',
  },
};
