import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { EmojiPeopleRounded } from '@mui/icons-material';
import Subtitle from '../../Components/TitleComponent/Subtitle';

export default {
  title: 'LandingPage/Subtitle',
  component: Subtitle,
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

export const PrimarySubtitleNoIcon = {
  args: {
    subtitle: 'Sign up to be updated with events around your community. You can lend a hand, or even ask for one.',
    showIcon: false,
    icon: <EmojiPeopleRounded />,
  },
};

export const PrimarySubtitleWithIcon = {
  args: {
    subtitle: 'Sign up to be updated with events around your community. You can lend a hand, or even ask for one.',
    showIcon: true,
    icon: <EmojiPeopleRounded />,
  },
};
