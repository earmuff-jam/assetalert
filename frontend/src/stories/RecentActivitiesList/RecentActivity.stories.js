import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import RecentActivity from '../../Components/RecentActivitiesList/RecentActivity';

export default {
  title: 'ProfilePage/RecentActivity',
  component: RecentActivity,
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryRecentActivity = {
  args: {
    activity: {
      expenseID: '',
      expense_amount: '29.99',
      expense_name: 'plant food for native plants',
      id: '5b463cf4-8d0c-4ba0-8691-10985d9aa926',
      title: 'Tiku dog fair',
      type: '',
      updated_at: '2024-03-17T13:52:03.771717Z',
      updated_by: '67814390-fc18-41d3-ad77-d645bbd36d2c',
      updator: 'xxArthur01',
      volunteering_hours: '2035',
      volunteering_id: '',
      volunteering_skill: ['Event Planning'],
    },
  },
};
