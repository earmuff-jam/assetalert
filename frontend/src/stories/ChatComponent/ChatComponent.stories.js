import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import CommunityMsg from '../../Components/ChatComponent/CommunityMsg';

export default {
  title: 'ChatComponent/CommunityMsg',
  component: CommunityMsg,
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
    userFullName: 'John Doe',
    userID: 'test-user-id',
    eventID: 'test-event-id',
    isChecked: true,
    disabled: false,
  },
};
