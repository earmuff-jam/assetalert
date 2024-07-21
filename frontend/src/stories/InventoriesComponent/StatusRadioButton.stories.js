import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import StatusRadioButtons from '../../Components/Inventory/StatusRadioButtons';

export default {
  title: 'ProfilePage/StatusRadioButtons',
  component: StatusRadioButtons,
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

export const PrimaryDraftStatusRadioButtons = {
  args: {
    statusSelection: 'draft',
    handleChange: () => {},
  },
};

export const PrimaryAllStatusRadioButtons = {
  args: {
    statusSelection: 'all',
    handleChange: () => {},
  },
};

export const PrimaryDealsStatusRadioButtons = {
  args: {
    statusSelection: 'deals',
    handleChange: () => {},
  },
};

export const PrimaryHiddenStatusRadioButtons = {
  args: {
    statusSelection: 'hidden',
    handleChange: () => {},
  },
};
