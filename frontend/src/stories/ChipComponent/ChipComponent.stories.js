import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import ChipComponent from '../../Components/ChipComponent/ChipComponent';
import { FaceRounded, NotesRounded, PersonAddRounded } from '@mui/icons-material';

export default {
  title: 'ChipComponent/ChipComponent',
  component: ChipComponent,
  decorators: [
    withRouter,
    (Story) => (
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={primary_theme}>
            <Story />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    ),
  ], // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryChipComponentLogin = {
  args: {
    variant: 'default',
    icon: <FaceRounded />,
    label: 'Login',
    size: 'small',
    disabled: false,
    onClick: () => {},
  },
};

export const PrimaryChipComponentSignup = {
  args: {
    variant: 'default',
    icon: <PersonAddRounded />,
    label: 'Create Account',
    size: 'small',
    disabled: false,
    onClick: () => {},
  },
};

export const PrimaryChipComponentAddRoughNotes = {
  args: {
    variant: 'default',
    icon: <NotesRounded />,
    label: 'Rough Notes',
    size: 'small',
    disabled: false,
    onClick: () => {},
  },
};
