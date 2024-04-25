import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import ReportCommunityEvent from '../../Components/CommunityEventComponent/ReportCommunityEvent';

export default {
  title: 'CommunityEventComponent/ReportCommunityEvent',
  component: ReportCommunityEvent,
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

export const PrimaryReportCommunityEvent = {
  args: {},
};
