import SingupCheckboxField from '@features/LandingPage/Authentication/Signup/SignupCheckboxField';

export default {
  title: 'LandingPage/Authentication/Signup/SingupCheckboxField',
  component: SingupCheckboxField,
  tags: ['autodocs'],
};

const Template = (args) => <SingupCheckboxField {...args} />;

export const SingupCheckboxFieldDefault = Template.bind({});
export const SingupCheckboxFieldUnselected = Template.bind({});

SingupCheckboxFieldDefault.args = {
  isChecked: true,
  setIsChecked: () => {},
};

SingupCheckboxFieldUnselected.args = {
  isChecked: false,
  setIsChecked: () => {},
};
