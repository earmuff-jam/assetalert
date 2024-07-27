import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import { EmojiEventsRounded, TrackChangesRounded } from '@mui/icons-material';
import RecentItemTabs from '../../Components/RecentActivitiesList/RecentItemTabs';

export default {
  title: 'ProfilePage/RecentItemTab',
  component: RecentItemTabs,
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

export const PrimaryRecentActivitiesEmptyRowData = {
  args: {
    rowData: [],
  },
};

export const PrimaryRecentActivitiesTestRowData = {
  args: {
    rowData: [
      {
        id: 1,
        title: 'Created Events',
        icon: <EmojiEventsRounded color="primary" />,
        tooltipPlacement: 'left-start',
        count: 10,
      },
      {
        id: 2,
        title: 'Volunteered Events',
        icon: <TrackChangesRounded color="error" />,
        tooltipPlacement: 'left-start',
        count: 2,
      },
    ],
  },
};
