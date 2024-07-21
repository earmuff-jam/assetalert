import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import Title from '../../Components/TitleComponent/Title';

export default {
  title: 'LandingPage/Title',
  component: Title,
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

export const PrimaryTitleWithSubtitle = {
  args: {
    title: 'Find meaning to volunteer',
    displaySubtitle: true,
    headingVariant: 'error',
    titleStyle: {},
  },
};

export const PrimaryTitleWithNoSubtitle = {
  args: {
    title: 'Find meaning to volunteer',
    displaySubtitle: false,
    headingVariant: 'error',
    titleStyle: {},
  },
};

export const GeneralTitleWithNoSubtitle = {
  args: {
    title: 'Do not have an account?',
    displaySubtitle: false,
    headingVariant: 'general',
    titleStyle: {},
  },
};
