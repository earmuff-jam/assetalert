import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import AuthHome from '../../Containers/Auth/AuthHome';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'LandingPage/AuthHome',
  component: AuthHome,
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

export const PrimaryAuthHome = {
  args: {},
};
