import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import NotificationCard from '../../Components/Profile/NotificationCard';

export default {
  title: 'ProfilePage/Notification Card',
  component: NotificationCard,
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryNotificationCard = {
  args: {
    notifications: [
      {
        created_at: '2024-03-18T13:15:42.235922Z',
        created_by: '4d44a45c-1336-40d0-99dc-57de2d6e0146',
        creator_name: 'xxArthur91',
        event_id: 'ec99319a-545b-4aa8-8974-7c06372056f1',
        id: 'd70e59d1-f0d6-4b5c-a52b-c864323dabee',
        is_resolved: false,
        is_viewed: true,
        title: 'Added milgronite for fertilizer purposes for native plants',
        updated_at: '2024-03-18T13:17:02.237585Z',
        updated_by: '4d44a45c-1336-40d0-99dc-57de2d6e0146',
        updater_name: 'xxArthur91',
      },
      {
        created_at: '2024-03-18T13:15:42.235922Z',
        created_by: '4d44a45c-1336-40d0-99dc-57de2d6e0146',
        creator_name: 'xxArthur91',
        event_id: 'ec99319a-545b-4aa8-8974-7c06372056f1',
        id: 'd70e59d1-f0d6-4b5c-a52b-c864323dabee',
        is_resolved: false,
        is_viewed: false,
        title: 'Added fish sticks for native plants',
        updated_at: '2024-04-18T13:17:02.237585Z',
        updated_by: '4d44a45c-1336-40d0-99dc-57de2d6e0146',
        updater_name: 'xxArthur91',
      },
    ],
    handleNotificationMenuSelect: () => {},
  },
};
