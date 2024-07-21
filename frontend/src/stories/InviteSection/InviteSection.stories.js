import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import InviteSection from '../../Components/InviteSectionComponent/InviteSection';

export default {
  title: 'LandingPage/InviteSection',
  component: InviteSection,
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

export const PrimaryInviteSection = {
  args: {},
};
