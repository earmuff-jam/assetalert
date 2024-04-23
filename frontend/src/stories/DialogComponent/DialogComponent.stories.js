import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import Title from '../../Components/DialogComponent/Title';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'DialogComponent/Title',
  component: Title,
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

export const PrimaryEventTitleComponent = {
  args: {
    children: 'Add New Event',
    onClose: () => {},
  },
};

export const PrimaryReportTitleComponent = {
  args: {
    children: 'Add New Report',
    onClose: () => {},
  },
};
export const PrimaryExpenseTitleComponent = {
  args: {
    children: 'Add New Expense',
    onClose: () => {},
  },
};
