import { store } from '../../Store';
import { Provider } from 'react-redux';
import ChipComponent from './ChipComponent';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'LandingPage/ChipComponent',
  component: ChipComponent,
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

export const PrimaryChipComponent = {
  args: {},
};
