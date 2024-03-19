import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import RecentActivitiesListContainer from '../../Components/RecentActivitiesList/RecentActivitiesListContainer';

export default {
  title: 'ProfilePage/RecentActivitiesContainer',
  component: RecentActivitiesListContainer,
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

export const PrimaryRecentActivitiesContainer = {
  args: {},
};
