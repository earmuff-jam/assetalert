const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'standard',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

export const ADD_ITEM_FORM_FIELDS = {
  name: {
    label: 'Item Name',
    placeholder: 'Enter product name',
    value: '',
    name: 'name',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Name should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: 'Item description',
    placeholder: '',
    value: '',
    name: 'description',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Description should be less than 50 characters',
      },
    ],
    ...GENERIC_TEXTAREA_VARIANT,
  },
  quantity: {
    label: 'Quantity',
    placeholder: '',
    value: '',
    name: 'quantity',
    errorMsg: '',
    required: true,
    fullWidth: false,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected item is required',
      },
      {
        validate: (value) =>
          // test for number first, then
          !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
};

export const VIEW_CURRENT_SUPPLIES_COLUMNS = [
  {
    name: 'name',
    label: 'Item Name',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'description',
    label: 'Description',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'location',
    label: 'Location',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'quantity',
    label: 'Count',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'location',
    label: 'Location',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'created_at',
    label: 'Created At',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'creator_name',
    label: 'Creator',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'updated_at',
    label: 'Updated At',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'updater_name',
    label: 'Updator',
    options: {
      filter: true,
      sort: false,
    },
  },
];

export const VIEW_ITEMS_COLUMN_HEADERS = {
  name: {
    key: 'item_detail',
    title: 'Item name',
    displayName: 'Item name',
  },
  location: {
    key: 'location',
    title: 'Storage Location',
    displayName: 'Storage Location',
  },
  item_detail: {
    key: 'item_detail',
    title: 'Item Detail',
    displayName: 'Item Details',
  },
  quantity: {
    key: 'quantity',
    title: 'Quantity',
    displayName: 'Item Quantity',
    modifier: (title) => `${title}`,
  },
  unit_price: {
    key: 'unit_price',
    title: 'Unit Price',
    displayName: 'Price Per Unit',
    modifier: (title) => `${title}`,
  },
  bought_at: {
    key: 'bought_at',
    title: 'Bought At',
    displayName: 'Purchase Location',
    modifier: (title) => `${title}`,
  },
  description: {
    key: 'item_description',
    title: 'Item Description',
    displayName: 'Description',
  },
  creator_name: {
    key: 'creator_name',
    title: 'Creator Name',
    displayName: 'Creator',
  },
  updater_name: {
    key: 'updater_name',
    title: 'Updator Name',
    displayName: 'Updater',
  },
  created_at: {
    key: 'created_at',
    title: 'Created At',
    displayName: 'Creation Date',
  },
  updated_at: {
    key: 'updated_at',
    title: 'Updated At',
    displayName: 'Update Date',
  },
  sharable_groups: {
    key: 'sharable_groups',
    title: 'Sharing with',
    display: 'Sharing with',
    modifier: (title) => `${title}`,
  },
};
