import moment from 'moment';
import { CakeRounded, EmailRounded, VisibilityRounded } from '@material-ui/icons';

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
    icon: <VisibilityRounded />,
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
    icon: <VisibilityRounded />,
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
          const currentYear = moment().year();
          const birthdateMoment = moment(birthdate, 'YYYY-MM-DD');

          if (birthdateMoment.isValid()) {
            const age = currentYear - birthdateMoment.year() - moment().isBefore(birthdateMoment, 'year');
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
