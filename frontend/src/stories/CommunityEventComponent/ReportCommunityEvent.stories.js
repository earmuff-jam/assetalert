import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import ReportCommunityEvent from '../../Components/CommunityEventComponent/ReportCommunityEvent';

export default {
  title: 'CommunityEventComponent/ReportCommunityEvent',
  component: ReportCommunityEvent,
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

export const PrimaryReportCommunityEvent = {
  args: {},
};
