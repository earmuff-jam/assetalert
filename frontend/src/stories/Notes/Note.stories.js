import { lightTheme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import Note from '../../features/Notes/Note';

export default {
  title: 'Notes/Note',
  component: Note,
  decorators: [
    withRouter,
    (Story) => (
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
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

export const EmptyNoteMode = {
  args: {},
};

export const LoadingNoteMode = {
  args: {
    notes: [
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy kitty litter for four of my kittens',
        description: 'Do not buy the brand from walmart, buy from a generic well known place',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-10-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-10-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
    ],
    loading: true,
    setEditMode: false,
    setSelectedNoteID: -1,
  },
};

export const SingleNoteMode = {
  args: {
    notes: [
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy kitty litter for four of my kittens',
        description: 'Do not buy the brand from walmart, buy from a generic well known place',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-10-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-10-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
    ],
    loading: false,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};

export const MultipleNotesMode = {
  args: {
    notes: [
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy kitten litter',
        description: 'Do not buy the brand from walmart, buy from a generic well known place',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-10-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-10-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy dog food',
        description: 'Buy from petsmart, the bigger pack',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-10-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-10-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
    ],
    loading: false,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};

export const MultipleNotesMultipleTimestampsMode = {
  args: {
    notes: [
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy kitten litter',
        description: 'Do not buy the brand from walmart, buy from a generic well known place',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-10-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-10-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
      {
        noteID: '12ee72f4-8021-4634-bb30-90f6babcf8db',
        title: 'Buy dog food',
        description: 'Buy from petsmart, the bigger pack',
        status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        color: '#2a6dbc',
        location: {
          lat: 42.203217,
          lon: -72.625481,
        },
        created_at: '2024-09-30T00:47:27.384177Z',
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        creator: 'John Doe',
        updated_at: '2024-09-30T00:47:27.384177Z',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updator: 'John Doe',
        sharable_groups: null,
      },
    ],
    loading: false,
    setEditMode: () => {},
    setSelectedNoteID: () => {},
  },
};
