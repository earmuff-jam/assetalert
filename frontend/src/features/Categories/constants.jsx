const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
  size: 'small',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
  size: 'small',
};

export const ADD_CATEGORY_FORM_FIELDS = {
  name: {
    name: 'name',
    label: 'Category Title',
    placeholder: 'Short category title',
    value: '',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Category name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Category name should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Category description in less than 500 characters',
    value: '',
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
