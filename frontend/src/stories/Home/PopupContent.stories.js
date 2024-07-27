import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import PopupContent from '../../Components/Home/PopupContent';

export default {
  title: 'HomePage/PopupContent',
  component: PopupContent,
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

export const PopupContentShortTitle = {
  args: {
    selectedEvent: {
      id: 'project_id',
      title: 'kitten rave party',
      cause: 'celebration',
      attendees: ['test_user_id_one', 'test_user_id_two'],
      sharable_groups: ['test_user_id_one'],
      comments: 'kitten rave party for all lost kittens',
      display_name: 'somewhere in the lost land of forbidden west',
      project_type: 'education',
      updated_at: '2024-05-12 13:32:10.242 -0500',
      created_at: '2024-05-12 13:32:10.242 -0500',
    },
  },
};

export const PopupContentLongTitle = {
  args: {
    selectedEvent: {
      id: 'project_id',
      title: 'kitten rave party for newly wed kittens',
      cause: 'celebration',
      attendees: ['test_user_id_one'],
      sharable_groups: ['test_user_id_one', 'test_user_id_two'],
      comments: 'kitten rave party for all lost kittens',
      display_name: 'somewhere in the lost land of forbidden west',
      project_type: 'education',
      updated_at: '2024-05-12 13:32:10.242 -0500',
      created_at: '2024-05-12 13:32:10.242 -0500',
    },
  },
};
