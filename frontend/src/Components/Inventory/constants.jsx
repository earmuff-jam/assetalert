import { AllInboxRounded, DraftsRounded, LoyaltyRounded, VisibilityOffRounded } from '@material-ui/icons';

export const ADD_NEW_INVENTORY_SUBTITLE_TEXT =
  'Add items for your own inventory. Store items under here that are for your personal use. All Items stored with due process until the user profile is abandoned.';

export const INVENTORY_TABS = [
  {
    id: 1,
    icon: <AllInboxRounded />,
    tootipTitle: 'Displays inventory items',
    label: 'All products',
  },
  {
    id: 2,
    icon: <LoyaltyRounded />,
    tootipTitle: 'Displays inventory items that were labelled as bought in sale',
    label: 'Coupons / Deals',
  },
  {
    id: 3,
    icon: <DraftsRounded />,
    tootipTitle: 'Displays all inventory items labelled as draft',
    label: 'Draft',
  },
  {
    id: 4,
    icon: <VisibilityOffRounded />,
    tootipTitle: 'Displays all inventory items with hidden status',
    label: 'Hidden status',
  },
];

const GENERIC_FORM_FIELDS_VARIANT = {
  type: 'text',
  variant: 'standard',
};

export const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

/**
 * ADD ITEM PROFILE FORM. 
 * 
 * Used to add new item in user's personal profile.
 */
export const ADD_ITEM_PROFILE_FORM = {
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
    ...GENERIC_FORM_FIELDS_VARIANT,
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
  price: {
    label: 'Price',
    placeholder: '',
    value: '',
    name: 'price',
    errorMsg: '',
    required: true,
    fullWidth: false,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected item is required',
      },
      {
        validate: (value) =>
          // test for number first, then
          !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
  barcode: {
    label: 'Item barcode',
    placeholder: '',
    value: '',
    name: 'barcode',
    errorMsg: '',
    required: false,
    fullWidth: false,
    validators: [
      {
        validate: (value) => value.trim().length >= 100,
        message: 'barcode should be less than 100 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
  sku: {
    label: 'Item sku',
    placeholder: '',
    value: '',
    name: 'sku',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'sku should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
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
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
  bought_at: {
    label: 'Place of purchase',
    placeholder: '',
    value: '',
    name: 'bought_at',
    errorMsg: '',
    required: false,
    fullWidth: false,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Place of purchase should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
};

export const VIEW_PERSONAL_INVENTORY_COLUMNS = [
  {
    name: 'name',
    label: 'Name',
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
    name: 'price',
    label: 'Price',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'status',
    label: 'Status',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'barcode',
    label: 'BarCode',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'sku',
    label: 'SKU',
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
