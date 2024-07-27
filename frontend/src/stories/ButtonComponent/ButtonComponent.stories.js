import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ArrowRightRounded, EmojiPeopleRounded } from '@mui/icons-material';
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent';

export default {
  title: 'ButtonComponent/ButtonComponent',
  component: ButtonComponent,
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

export const PrimaryButtonComponentNoRipple = {
  args: {
    text: 'Sign in',
    buttonVariant: 'outlined',
    showIcon: false,
    icon: <EmojiPeopleRounded />,
    disabled: false,
    disableRipple: true,
    disableFocusRipple: true,
    onClick: () => {},
  },
};

export const PrimaryButtonComponent = {
  args: {
    text: 'Sign in',
    buttonVariant: 'outlined',
    showIcon: false,
    icon: <EmojiPeopleRounded />,
    disabled: false,
    disableRipple: false,
    disableFocusRipple: false,
    onClick: () => {},
  },
};

export const PrimaryButtonComponentWithIcon = {
  args: {
    text: 'Submit',
    buttonVariant: 'standard',
    showIcon: true,
    icon: <ArrowRightRounded />,
    disabled: false,
    disableRipple: true,
    disableFocusRipple: true,
    onClick: () => {},
  },
};
