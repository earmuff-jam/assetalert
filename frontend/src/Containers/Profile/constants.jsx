import { FaceRounded, PermIdentityRounded, PhoneRounded } from '@mui/icons-material';

export const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

export const TEXTAREA_FORM_FIELDS = {
  multiline: true,
  minRows: 4,
  variant: 'outlined',
};

export const USER_PROFILE_FORM_FIELDS = {
  name: {
    label: 'Name',
    placeholder: '',
    value: '',
    name: 'name',
    errorMsg: '',
    icon: <PermIdentityRounded />,
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Full Name is required',
      },
      {
        validate: (value) => value.trim().length >= 20,
        message: 'Full Name should be less than 100 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  username: {
    label: 'User name',
    placeholder: '',
    value: '',
    name: 'username',
    errorMsg: '',
    icon: <FaceRounded />,
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Username is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Username should be less than 50 characters',
      },
      {
        validate: (value) => value.trim().length < 3,
        message: 'Username cannot be less than three characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  phone: {
    label: 'Phone Number',
    placeholder: '',
    value: '',
    name: 'phone',
    errorMsg: '',
    icon: <PhoneRounded />,
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Phone Number is required',
      },
      {
        validate: (value) => value.trim().length < 9,
        message: 'Phone Number should be more than 9 characters',
      },
      {
        validate: (value) => value.trim().length > 15,
        message: 'Phone Number should be less than 15 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  objective: {
    label: 'Objective',
    placeholder: 'Any goals or accomplishments you wish to complete',
    value: '',
    name: 'objective',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [],
    ...TEXTAREA_FORM_FIELDS,
  },
  aboutMe: {
    label: 'About me',
    placeholder: 'Brief description of yourself 💟💟',
    value: '',
    name: 'aboutMe',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length > 50,
        message: 'should be less than 50 characters',
      },
    ],
    ...TEXTAREA_FORM_FIELDS,
  },
};
