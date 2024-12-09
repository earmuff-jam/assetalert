import LoginFormFields from '@features/LandingPage/Authentication/Login/LoginFormFields';
import { EmailRounded, LockRounded } from '@mui/icons-material';

export default {
  title: 'LandingPage/Authentication/Login/LoginFormFields',
  component: LoginFormFields,
  tags: ['autodocs'],
};

const Template = (args) => <LoginFormFields {...args} />;

export const LoginFormFieldsDefault = Template.bind({});

LoginFormFieldsDefault.args = {
  formFields: {
    email: {
      label: 'Email Address',
      placeholder: '',
      value: '',
      name: 'email',
      size: 'small',
      errorMsg: '',
      required: true,
      type: 'email',
      icon: <EmailRounded />,
      fullWidth: true,
      validators: [
        {
          validate: (value) => value.trim().length === 0,
          message: 'Email is required',
        },
        {
          validate: (value) => value.trim().length >= 50,
          message: 'Email should be less than 50 characters',
        },
        {
          validate: (value) => {
            var re = /\S+@\S+\.\S+/;
            return !re.test(value);
          },
          message: 'Email is not in the correct form',
        },
      ],
    },
    password: {
      label: 'Password',
      placeholder: '',
      value: '',
      type: 'password',
      name: 'password',
      size: 'small',
      errorMsg: '',
      icon: <LockRounded />,
      required: true,
      fullWidth: true,
      validators: [
        {
          validate: (value) => value.trim().length <= 6,
          message: 'Password is not strong enough.',
        },
        {
          validate: (value) => value.trim().length >= 50,
          message: 'Password should be less than 50 characters',
        },
      ],
    },
  },
  handleInput: () => {},
  submit: () => {},
};
