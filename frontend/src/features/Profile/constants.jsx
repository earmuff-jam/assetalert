
export const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

export const TEXTAREA_FORM_FIELDS = {
  multiline: true,
  minRows: 4,
  variant: 'outlined',
};

/**
 * Blank profile details to update user information
 */
export const BLANK_PROFILE_DETAILS = {
  username: {
    id: 'username',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 3,
        message: 'Username is required and must be more than characters',
      },
    ],
  },
  full_name: {
    id: 'full_name',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Full Name is required',
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: 'Full name should be less than 150 characters',
      },
    ],
  },
  email_address: {
    id: 'email_address',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Email address is required',
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: 'Email address should be less than 150 characters',
      },
    ],
  },
  phone_number: {
    id: 'phone_number',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: 'Phone Number is required',
      },
      {
        validate: (value) => value.trim().length >= 15,
        message: 'Phone Number should be less than 15 characters',
      },
    ],
  },
  about_me: {
    id: 'about_me',
    value: '',
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Bio should be less than 500 characters',
      },
    ],
  },
};
