import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import AddCommunityEvent from '../../Components/CommunityEventComponent/AddCommunityEvent';

export default {
  title: 'CommunityEventComponent/AddCommunityEvent',
  component: AddCommunityEvent,
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

export const PrimaryAddCommunityEvent = {
  args: {},
};
