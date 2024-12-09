import dayjs from 'dayjs';

import { CakeRounded, EmailRounded, LockRounded, SupervisedUserCircleRounded } from '@mui/icons-material';

import SignupFormFields from '@features/LandingPage/Authentication/Signup/SignupFormFields';

export default {
  title: 'LandingPage/Authentication/Signup/SignupFormFields',
  component: SignupFormFields,
  tags: ['autodocs'],
};

const Template = (args) => <SignupFormFields {...args} />;

export const SignupFormFieldsDefault = Template.bind({});

SignupFormFieldsDefault.args = {
  formFields: {
    username: {
      label: 'Username',
      placeholder: 'Enter a username',
      value: '',
      name: 'username',
      size: 'small',
      errorMsg: '',
      required: true,
      type: 'text',
      icon: <SupervisedUserCircleRounded />,
      fullWidth: true,
      validators: [
        {
          validate: (value) => value.trim().length === 0,
          message: 'Username is required',
        },
        {
          validate: (value) => value.trim().length <= 3,
          message: 'Username cannot be less than 4 characters',
        },
        {
          validate: (value) => value.trim().length >= 50,
          message: 'Username should be less than 50 characters',
        },
      ],
    },
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
    birthday: {
      label: 'Date of Birth',
      placeholder: '',
      value: '',
      type: 'date',
      size: 'small',
      name: 'birthday',
      errorMsg: '',
      icon: <CakeRounded />,
      required: true,
      fullWidth: true,
      validators: [
        {
          validate: (birthdate) => {
            const currentYear = dayjs().year();
            const dob = dayjs(birthdate, 'YYYY-MM-DD');

            if (dob.isValid()) {
              const age = currentYear - dob.year() - dayjs().isBefore(dob, 'year');
              return age <= 13;
            }
            return false;
          },
          message: 'User must be above 13 years old to register.',
        },
        {
          validate: (value) => value.trim().length <= 2,
          message: 'User must add birthday.',
        },
      ],
    },
  },
  setFormFields: () => {},
  submit: () => {},
};
