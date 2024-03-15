import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import ProfileNavigationMenu from './ProfileNavigationMenu';

export default {
  title: 'ProfilePage/ProfileNavigation',
  component: ProfileNavigationMenu,
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

export const PrimaryProfileNavigationMenu = {
  args: {},
};
