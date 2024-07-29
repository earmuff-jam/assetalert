export const BLANK_CATEGORY_DETAILS = {
  category_name: '',
  category_description: '',
};

export const BLANK_CATEGORY_DETAILS_TOUCHED = {
  category_name: false,
  category_description: false,
};

export const BLANK_CATEGORY_DETAILS_ERROR = {
  category_name: {
    errorMsg: '',
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
  },
  category_description: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Category description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Category description should be less than 500 characters',
      },
    ],
  },
};
