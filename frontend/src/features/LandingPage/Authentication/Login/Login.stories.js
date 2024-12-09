import Login from '@features/LandingPage/Authentication/Login/Login';

export default {
  title: 'LandingPage/Authentication/Login/Login',
  component: Login,
  tags: ['autodocs'],
};

const Template = (args) => <Login {...args} />;

export const LoginDefault = Template.bind({});
