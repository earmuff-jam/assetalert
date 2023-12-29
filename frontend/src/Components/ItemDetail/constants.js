const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'static',
};

export const ADD_ITEM_FORM_FIELDS = {
  name: {
    label: 'Item Name',
    placeholder: '',
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
    label: 'Brief Description of Item',
    placeholder: '',
    value: '',
    name: 'description',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [],
    ...GENERIC_FORM_FIELDS,
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

export const VIEW_ITEMS_COLUMN_HEADERS = {
  name: {
    key: 'item_detail',
    title: 'Item name',
    displayName: 'Item name',
  },
  location: {
    key: 'location',
    title: 'Storage Location',
    displayName: 'Location',
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
