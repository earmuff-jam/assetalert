import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import UserProfile from '../../Components/ViewProfileDetails/UserProfile';

export default {
  title: 'ProfilePage/UserProfile',
  component: UserProfile,
  decorators: [
    withRouter,
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={primary_theme}>
          <Story />
        </ThemeProvider>
      </Provider>
    ),
  ],
};

export const PrimaryUserProfile = {
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

export const PrimaryUserProfileLongAboutMeText = {
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
