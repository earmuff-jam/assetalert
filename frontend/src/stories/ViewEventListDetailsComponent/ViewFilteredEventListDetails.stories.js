import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import ViewFilteredEventList from '../../Components/ViewEventsListDetails/ViewFilteredEventList';

export default {
  title: 'HomePage/ViewFilteredEventList',
  component: ViewFilteredEventList,
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

export const PrimaryViewFilteredEventListEmptyEventList = {
  args: {
    handleNavigate: () => {},
    filteredOptions: [],
  },
};

export const PrimaryViewFilteredEventListEventList = {
  args: {
    handleNavigate: () => {},
    filteredOptions: [
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
