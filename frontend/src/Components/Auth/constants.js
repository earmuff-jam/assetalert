import { EmailRounded, VisibilityRounded } from '@material-ui/icons';

export const GENERIC_TEXTFIELD_VARIANT = {
  variant: 'outlined',
};

export const LOGIN_SIGN_UP_FORM_FIELDS = {
  email: {
    label: 'Email Address',
    placeholder: '',
    value: '',
    name: 'email',
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
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
  password: {
    label: 'Password',
    placeholder: '',
    value: '',
    type: 'password',
    name: 'password',
    errorMsg: '',
    icon: <VisibilityRounded />,
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Password is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Password should be less than 50 characters',
      },
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
};
