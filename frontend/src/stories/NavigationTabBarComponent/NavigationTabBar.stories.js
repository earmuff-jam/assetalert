import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import { NavigationTabBar } from '../../Components/Event/EventDetailsDrawerComponent';
import { NAVIGATION_TABS } from '../../Components/Event/constants';
import { PROFILE_NAVIGATION_MENU_BAR } from '../../Components/ProfileNavigationMenu/constants';

export default {
  title: 'NavigationTabBarComponent/NavigationTabBar',
  component: NavigationTabBar,
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

export const PrimaryAppBarNavListItemSelectedEventPage = {
  args: {
    data: NAVIGATION_TABS,
    value: 1,
    handleChange: () => {},
    applyProfileVariation: true,
    extraRootStyle: '',
    iconStyle: '',
  },
};

export const PrimaryAppBarNavListItemProfilePage = {
  args: {
    data: PROFILE_NAVIGATION_MENU_BAR,
    value: 1,
    handleChange: () => {},
    applyProfileVariation: true,
    extraRootStyle: '',
    iconStyle: '',
  },
};
