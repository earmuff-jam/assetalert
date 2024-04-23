import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import Drawer from '../../Components/DrawerListComponent/Drawer';

export default {
  title: 'DialogComponent/Drawer',
  component: Drawer,
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

export const PrimaryAddEventDrawerComponent = {
  args: {
    children: <span>Add event component goes here</span>,
    toggleDrawer: () => {},
    open: true,
  },
};

export const PrimaryAddExpenseDrawerComponent = {
  args: {
    children: <span>Add expense component goes here</span>,
    toggleDrawer: () => {},
    open: true,
  },
};

export const PrimaryAddReportDrawerComponent = {
  args: {
    children: <span>Add report component goes here</span>,
    toggleDrawer: () => {},
    open: true,
  },
};
