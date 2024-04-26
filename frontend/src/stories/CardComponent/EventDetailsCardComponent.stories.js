import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import EventDetailsCardComponent from '../../Components/CardComponent/EventDetailsCardComponent';

export default {
  title: 'CardComponent/EventDetailsCardComponent',
  component: EventDetailsCardComponent,
  decorators: [
    withRouter,
    (Story) => (
      <Provider store={store}>
        <ThemeProvider theme={primary_theme}>
          <Story />
        </ThemeProvider>
      </Provider>
    ),
  ], // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryCardTitleComponentEventDetails = {
  args: {
    disabled: false,
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
    handleUserDetail: () => {},
    userDetailError: {},
    eventID: '',
    isLoading: false,
    isDeactivated: false,
    setIsDeactivated: () => {},
    selectedEvent: {},
    reports: [],
    onLeave: () => {},
    onJoin: () => {},
  },
};
