import StyledAppBar from '@features/LandingPage/StyledAppBar/StyledAppBar';

export default {
  title: 'LandingPage/StyledAppBar/StyledAppBar',
  component: StyledAppBar,
  tags: ['autodocs'],
};

const Template = (args) => <StyledAppBar {...args} />;

export const StyledAppBarDefault = Template.bind({});
