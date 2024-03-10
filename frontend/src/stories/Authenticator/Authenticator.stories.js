import { store } from '../../Store';
import { Provider } from 'react-redux';
import Authenticator from './Authenticator';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'LandingPage/Authenticator',
  component: Authenticator,
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

export const PrimaryAuthenticator = {
  args: {},
};
