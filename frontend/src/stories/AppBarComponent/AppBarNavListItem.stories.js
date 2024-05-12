import { primary_theme } from '../../util/Theme';
import { ThemeProvider } from '@material-ui/core';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import AppBarNavListItem from '../../Components/AppBarComponent/AppBarNavListItem';
import { AssignmentIndRounded, ContactSupportRounded, HomeRounded, LockOpenRounded } from '@material-ui/icons';

export default {
  title: 'HomePage/AppBarNavListItem',
  component: AppBarNavListItem,
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

export const PrimaryAppBarNavListItemProfileComponent = {
  args: {
    key: '1',
    title: 'Profile',
    tooltipTitle: 'Profile Page Storybook',
    icon: <AssignmentIndRounded />,
    onClick: () => {},
  },
};

export const PrimaryAppBarNavListItemHomeComponent = {
  args: {
    key: '1',
    title: 'Home',
    tooltipTitle: 'Home Page',
    icon: <HomeRounded />,
    onClick: () => {},
  },
};

export const PrimaryAppBarNavListItemContactSupportComponent = {
  args: {
    key: '1',
    title: 'Profile',
    tooltipTitle: 'Profile Page Storybook',
    icon: <ContactSupportRounded />,
    onClick: () => {},
  },
};

export const PrimaryAppBarNavListItemLogoffComponent = {
  args: {
    key: '1',
    title: 'Profile',
    tooltipTitle: 'Profile Page Storybook',
    icon: <LockOpenRounded />,
    onClick: () => {},
  },
};
