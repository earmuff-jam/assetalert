import dayjs from 'dayjs';
import { CakeRounded, EmailRounded, LockRounded } from '@mui/icons-material';

export const GENERIC_TEXTFIELD_VARIANT = {
  variant: 'outlined',
};

export const AUTOCOMPLETE_PASSWORD_PROPS = {
  autocomplete: 'true',
};

export const LOGIN_FORM_FIELDS = {
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
      {
        validate: (value) => {
          var re = /\S+@\S+\.\S+/;
          return !re.test(value);
        },
        message: 'Email is not in the correct form',
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
    ...GENERIC_TEXTFIELD_VARIANT,
    ...AUTOCOMPLETE_PASSWORD_PROPS,
  },
};

export const SIGN_UP_FORM_FIELDS = {
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
      {
        validate: (value) => {
          var re = /\S+@\S+\.\S+/;
          return !re.test(value);
        },
        message: 'Email is not in the correct form',
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
    ...GENERIC_TEXTFIELD_VARIANT,
    ...AUTOCOMPLETE_PASSWORD_PROPS,
  },
  birthday: {
    label: 'Date of Birth',
    placeholder: '',
    value: '',
    type: 'date',
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
    ...GENERIC_TEXTFIELD_VARIANT,
  },
};

// Forgot password form fields
export const FORGOT_PASSWORD_FORM_FIELDS = {
  question_01: {
    label: 'Security Question 01',
    placeholder: 'Answer for security question',
    value: '',
    name: 'question_01',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Value is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Value should be less than 50 characters',
      },
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
  question_02: {
    label: 'Security Question 02',
    placeholder: 'Answer for security question',
    value: '',
    name: 'question_02',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Value is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Value should be less than 50 characters',
      },
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
};

// user validation form fields
export const USER_VALIDATION_FORM_FIELDS = {
  email: {
    label: 'Email Address',
    placeholder: 'Unique email address of the user',
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
      {
        validate: (value) => {
          var re = /\S+@\S+\.\S+/;
          return !re.test(value);
        },
        message: 'Email is not in the correct form',
      },
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
  birthday: {
    label: '',
    placeholder: '',
    value: '',
    type: 'date',
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
        message: 'Incorrect selection of date of birth.',
      },
      {
        validate: (value) => value.trim().length <= 2,
        message: 'User must add birthday.',
      },
    ],
    ...GENERIC_TEXTFIELD_VARIANT,
  },
};
