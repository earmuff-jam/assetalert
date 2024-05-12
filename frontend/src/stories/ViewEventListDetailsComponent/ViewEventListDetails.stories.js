import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import ViewEventListDetails from '../../Components/ViewEventsListDetails/ViewEventListDetails';

export default {
  title: 'HomePage/ViewEventListDetails',
  component: ViewEventListDetails,
  decorators: [
    withRouter,
    (Story) => (
      <ThemeProvider theme={primary_theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryViewEventListDetailsEmptyEventList = {
  args: {
    setLocation: () => {},
    currentEvents: [],
    isLoading: false,
  },
};

export const PrimaryViewEventListDetailsEventList = {
  args: {
    setLocation: () => {},
    currentEvents: [
      {
        id: '3fe49f43-fea2-4aaf-8132-98f8785fc912',
        title: 'Sherwood Forest Renfest - Camping and Festival - Spring Break',
        description: 'Sherwood Forest Renfest - Camping and Festival - Spring Break',
        cause: 'Community Cause',
        image_url: '',
        street: '2000 East Carter Road',
        city: 'Dolphine',
        state: 'Arkansas',
        zip: '99786',
        boundingbox: null,
        class: '',
        display_name: '',
        importance: '',
        lat: '30.26',
        license: '',
        lon: '-97.74',
        text: '',
        osm_type: '',
        place_id: '',
        powered_by: '',
        type: '',
        project_type: 'Community Development',
        skills_required: [''],
        comments: '',
        registration_link: '',
        max_attendees: 6,
        attendees: ['46d3da79-0bbc-419a-8310-d7e983211ce9'],
        required_total_man_hours: 250,
        deactivated: true,
        deactivated_reason: '',
        start_date: '2024-05-12T18:32:10.250173Z',
        created_at: '2024-05-12T18:32:10.250173Z',
        updated_at: '2024-05-12T19:26:25.93008Z',
        created_by: '46d3da79-0bbc-419a-8310-d7e983211ce9',
        creator_name: '',
        updated_by: '46d3da79-0bbc-419a-8310-d7e983211ce9',
        updator_name: '',
        sharable_groups: ['46d3da79-0bbc-419a-8310-d7e983211ce9'],
      },
      {
        id: 'f228c559-1bfd-48fb-b127-1e45f1ab64cf',
        title: 'North Carolina Football Team',
        description: 'North Carolina football team',
        cause: 'Environment Development',
        image_url: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        boundingbox: null,
        class: '',
        display_name: '',
        importance: '',
        lat: '35.12',
        license: '',
        lon: '-78.22',
        text: '',
        osm_type: '',
        place_id: '',
        powered_by: '',
        type: '',
        project_type: 'Test Project Type',
        skills_required: [''],
        comments: '',
        registration_link: '',
        max_attendees: 9,
        attendees: ['46d3da79-0bbc-419a-8310-d7e983211ce9'],
        required_total_man_hours: 250,
        deactivated: false,
        deactivated_reason: '',
        start_date: '2024-05-12T18:32:10.250173Z',
        created_at: '2024-05-12T18:32:10.250173Z',
        updated_at: '2024-05-12T18:32:10.250173Z',
        created_by: '46d3da79-0bbc-419a-8310-d7e983211ce9',
        creator_name: '',
        updated_by: '46d3da79-0bbc-419a-8310-d7e983211ce9',
        updator_name: '',
        sharable_groups: ['46d3da79-0bbc-419a-8310-d7e983211ce9'],
      },
    ],
    isLoading: false,
  },
};

export const PrimaryViewEventListDetailsLoading = {
  args: {
    setLocation: () => {},
    currentEvents: [],
    isLoading: true,
  },
};
