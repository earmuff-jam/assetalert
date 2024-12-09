import HeroContentCenterButton from '@features/LandingPage/HeroContent/HeroContentCenterButton';

export default {
  title: 'LandingPage/HeroContent/HeroContentCenterButton',
  component: HeroContentCenterButton,
  tags: ['autodocs'],
};

const Template = (args) => <HeroContentCenterButton {...args} />;

export const HeroContentCenterButtonDefault = Template.bind({});

HeroContentCenterButtonDefault.args = {
  openSignupModal: () => {},
  openLoginModal: () => {},
};
