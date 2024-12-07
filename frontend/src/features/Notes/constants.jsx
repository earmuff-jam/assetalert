const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
};

export const ADD_NOTES_FORM_FIELDS = {
  title: {
    label: 'Title',
    placeholder: 'Short note title',
    value: '',
    name: 'title',
    size: 'small',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Title is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Title should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: 'Description',
    placeholder: 'Note description in less than 500 characters',
    value: '',
    name: 'description',
    size: 'small',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Description should be less than 500 characters',
      },
    ],
    ...GENERIC_TEXTAREA_VARIANT,
  },
};
