import HeroContent from '@features/LandingPage/HeroContent/HeroContent';

export default {
  title: 'LandingPage/HeroContent/HeroContent',
  component: HeroContent,
  tags: ['autodocs'],
};

const Template = (args) => <HeroContent {...args} />;

export const HeroContentDefault = Template.bind({});

HeroContentDefault.args = {
  openSignupModal: () => {},
  openLoginModal: () => {},
};
