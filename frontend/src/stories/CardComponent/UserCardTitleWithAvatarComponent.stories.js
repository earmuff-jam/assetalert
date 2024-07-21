import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import UserCardTitleWithAvatarComponent from '../../Components/CardComponent/UserCardTitleWithAvatarComponent';

export default {
  title: 'CardComponent/UserCardTitleWithAvatarComponent',
  component: UserCardTitleWithAvatarComponent,
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
  ],
};

export const PrimaryUserCardTitleWithAvatarComponent = {
  args: {
    formFields: {
      name: {
        value: 'John Doe',
      },
      username: {
        value: 'xxjohnxx',
        icon: '',
      },
      phone: {
        value: '123456789',
        icon: '',
      },
      aboutMe: {
        value: 'I like to climb trees and hike with my friends.',
        icon: '',
      },
    },
    avatarUrl: '',
    profileID: '',
  },
};

export const PrimaryUserCardTitleWithAvatarComponentLongAboutMeText = {
  args: {
    formFields: {
      name: {
        value: 'John Doe',
      },
      username: {
        value: 'xxjohnxx',
        icon: '',
      },
      phone: {
        value: '123456789',
        icon: '',
      },
      aboutMe: {
        value:
          'I like to climb trees and hike with my friends. I have been told that there is a character limit here that is enforced during edit.',
        icon: '',
      },
    },
    avatarUrl: '',
    profileID: '',
  },
};
