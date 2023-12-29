import { FaceRounded, PermIdentityRounded, PhoneRounded } from '@material-ui/icons';

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
        validate: (value) => value.trim().length >= 100,
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
        message: 'User name is required',
      },
      {
        validate: (value) => value.trim().length < 3,
        message: 'User name cannot be less than three characters',
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
    validators: [],
    ...TEXTAREA_FORM_FIELDS,
  },
};
