import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import EventCardTitleWithAvatarComponent from '../../Components/CardComponent/EventCardTitleWithAvatarComponent';

export default {
  title: 'CardComponent/EventCardTitleWithAvatarComponent',
  component: EventCardTitleWithAvatarComponent,
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

export const PrimaryEventCardTitleWithAvatarComponent = {
  args: {
    userDetail: {
      userID: '5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d',
      imageUrl: '',
      title: 'Tryout for school cheerleering',
      userFullName: 'John Doe',
      userIsMember: true,
      deactivated: '',
      comments: 'small event to determine a cheerleading community for school children',
      requiredSkills: ['Marketing', 'Event Promotion', 'Social Media Management'],
      sharable_groups: ['5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d', '6616a951-1546-49fb-be9a-8faa0357a6bd'],
      totalAllocatedMembers: 20,
      attendees: ['6616a951-1546-49fb-be9a-8faa0357a6bd', '5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d'],
      location: {
        boundingbox: ['40.0743877', '40.115347', '-83.0552533', '-82.995636'],
        class: 'boundary',
        display_name: 'Worthington, Sharon Township, Franklin County, Ohio, 43085, United States',
        importance: '',
        lat: '40.0930945',
        lon: '-83.0179593',
        osm_type: 'relation',
        place_id: '',
        powered_by: '',
        type: 'administrative',
      },
      id: '37e7f588-67f3-41c3-9840-3434fb29f1d8',
    },
    isLoading: false,
  },
};

// only events and profile is loading controlled atm
export const PrimaryEventCardTitleWithAvatarComponentLoading = {
  args: {
    userDetail: {
      userID: '5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d',
      imageUrl: '',
      title: 'Tryout for school cheerleering',
      userFullName: 'John Doe',
      userIsMember: true,
      deactivated: '',
      comments: 'small event to determine a cheerleading community for school children',
      requiredSkills: ['Marketing', 'Event Promotion', 'Social Media Management'],
      sharable_groups: ['5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d', '6616a951-1546-49fb-be9a-8faa0357a6bd'],
      totalAllocatedMembers: 20,
      attendees: ['6616a951-1546-49fb-be9a-8faa0357a6bd', '5e4a0e11-be9f-45e3-a216-7ec6bc3ceb7d'],
      location: {
        boundingbox: ['40.0743877', '40.115347', '-83.0552533', '-82.995636'],
        class: 'boundary',
        display_name: 'Worthington, Sharon Township, Franklin County, Ohio, 43085, United States',
        importance: '',
        lat: '40.0930945',
        lon: '-83.0179593',
        osm_type: 'relation',
        place_id: '',
        powered_by: '',
        type: 'administrative',
      },
      id: '37e7f588-67f3-41c3-9840-3434fb29f1d8',
    },
    isLoading: true,
  },
};
