export const ITEMS_IN_CATEGORY_HEADER = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 2 },
  { field: 'price', headerName: 'Price', flex: 1 },
  { field: 'quantity', headerName: 'Quantity', flex: 1 },
  { field: 'location', headerName: 'Storage Location', flex: 1 },
  { field: 'updator', headerName: 'Last updated by', flex: 1 },
];

const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

export const ADD_CATEGORY_FORM_FIELDS = {
  name: {
    label: 'Category Title',
    placeholder: 'Short category title',
    value: '',
    name: 'name',
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
    label: 'Description',
    placeholder: 'Category description in less than 500 characters',
    value: '',
    name: 'description',
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
  min_items_limit: {
    label: 'Min items count',
    placeholder: 'Mininum count of items',
    value: '',
    name: 'min_items_limit',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => {
          const parsedValue = parseInt(value, 10);
          return isNaN(parsedValue) || parsedValue < 0;
        },
        message: 'Minimum threshold limit must be a positive integer',
      },
      {
        validate: (value) => !Number.isInteger(parseFloat(value)),
        message: 'Minimum threshold must be a number',
      },
      {
        validate: (value) => parseFloat(value) >= Number.MAX_SAFE_INTEGER,
        message: 'Minimum threshold number is too high',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  max_items_limit: {
    label: 'Max items count',
    placeholder: 'Maximum count of items',
    value: '',
    name: 'max_items_limit',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => {
          const parsedValue = parseInt(value, 10);
          return isNaN(parsedValue) || parsedValue < 0;
        },
        message: 'Maximum threshold limit must be a positive integer',
      },
      {
        validate: (value) => !Number.isInteger(parseFloat(value)),
        message: 'Maximum threshold must be a number',
      },
      {
        validate: (value) => parseFloat(value) >= Number.MAX_SAFE_INTEGER,
        message: 'Maximum threshold number is too high',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
};
