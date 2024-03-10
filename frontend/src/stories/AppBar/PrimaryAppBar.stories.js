import { store } from '../../Store';
import { Provider } from 'react-redux';
import PrimaryAppBar from './PrimaryAppBar';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'HomePage/PrimaryAppBar',
  component: PrimaryAppBar,
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

export const PrimaryPrimaryAppBar = {
  args: {
    title: 'Mashed',
    titleVariant: 'h5',
    elevation: 0,
    selectedID: 1,
  },
};
