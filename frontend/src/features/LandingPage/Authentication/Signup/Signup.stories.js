import Signup from '@features/LandingPage/Authentication/Signup/Signup';

export default {
  title: 'LandingPage/Authentication/Signup/Signup',
  component: Signup,
  tags: ['autodocs'],
};

const Template = (args) => <Signup {...args} />;

export const SignupDefault = Template.bind({});

SignupDefault.args = {
  handleClose: () => {},
};
