import { store } from '../../Store';
import { Provider } from 'react-redux';
import { primary_theme } from '../../util/Theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { withRouter } from 'storybook-addon-react-router-v6';
import { CardMembershipRounded, GroupRounded } from '@mui/icons-material';
import CardTitleComponent from '../../Components/CardComponent/CardTitleComponent';

export default {
  title: 'CardComponent/CardTitleComponent',
  component: CardTitleComponent,
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
  ], // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PrimaryCardTitleComponentEventDetails = {
  args: {
    firstLabel: '12',
    firstIcon: <CardMembershipRounded />,
    firstToolTipLabel: 'Current members',
    secondIcon: <GroupRounded />,
    secondLabel: 22,
    secondTooltipLabel: 'Anticipated members',
    titleText: 'Fall and shelter rescue center',
    titleTooltip: 'Fall and shelter rescue center',
    extraSubtitle: 'A small community group that loves to recsue dogs.',
    isLoading: false,
  },
};

export const PrimaryCardTitleComponentProfileDetails = {
  args: {
    firstLabel: 'johnny_cash',
    firstIcon: <CardMembershipRounded />,
    firstToolTipLabel: 'Current members',
    secondIcon: <GroupRounded />,
    secondLabel: 'phone number',
    secondTooltipLabel: 'Anticipated members',
    titleText: 'Arthur Morgan',
    titleTooltip: 'Username',
    extraSubtitle: 'Edit event details to add description',
    isLoading: false,
  },
};

export const PrimaryCardTitleComponentProfileDetailsLongTitleText = {
  args: {
    firstLabel: 'johnny_cash',
    firstIcon: <CardMembershipRounded />,
    firstToolTipLabel: 'Current members',
    secondIcon: <GroupRounded />,
    secondLabel: 'phone number',
    secondTooltipLabel: 'Anticipated members',
    titleText: 'Arthur Morgan from Red Dead Redemtion 2',
    titleTooltip: 'Username',
    extraSubtitle: 'Displays how the ellipsis works for long profile names or event names',
    isLoading: false,
  },
};

export const PrimaryCardTitleComponentProfileDetailsIsLoading = {
  args: {
    firstLabel: 'johnny_cash',
    firstIcon: <CardMembershipRounded />,
    firstToolTipLabel: 'Current members',
    secondIcon: <GroupRounded />,
    secondLabel: 'phone number',
    secondTooltipLabel: 'Anticipated members',
    titleText: 'Arthur Morgan from Red Dead Redemtion 2',
    titleTooltip: 'Username',
    extraSubtitle: 'Displays how the ellipsis works for long profile names or event names',
    isLoading: true,
  },
};
