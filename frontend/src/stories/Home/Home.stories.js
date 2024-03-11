import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import HomePage from '../../Containers/Home/HomePage';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'HomePage/Home',
  component: HomePage,
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

export const PrimaryHome = {
  args: {},
};
