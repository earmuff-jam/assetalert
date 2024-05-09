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

const GENERIC_FORM_FIELDS_OUTLINED_VARIANT = {
  variant: 'outlined',
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
    placeholder: 'Enter item description in less than 500 characters',
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
    placeholder: 'Total price of each item',
    value: '',
    name: 'price',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
  barcode: {
    label: 'Item barcode',
    placeholder: 'Unique code to reference item',
    value: '',
    name: 'barcode',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 100,
        message: 'should be less than 100 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
  sku: {
    label: 'Item sku',
    placeholder: 'Unique SKU of the item',
    value: '',
    name: 'sku',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'sku should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  status: {
    label: 'Item Status',
    placeholder: 'Item Status',
    value: '',
    name: 'status',
    errorMsg: '',
    required: false,
  },
  is_returnable: {
    label: 'Is Returnable',
    value: '',
    name: 'is_returnable',
    errorMsg: '',
    required: false,
  },
  return_location: {
    label: 'Return location',
    placeholder: 'where to return the item',
    value: '',
    name: 'return_location',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Return location is required if intended to return items',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  min_weight: {
    label: 'Min Weight',
    placeholder: 'Minimum weight of item',
    value: '',
    name: 'min_weight',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  max_weight: {
    label: 'Max Weight',
    placeholder: 'Maximum weight of item',
    value: '',
    name: 'max_weight',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  min_height: {
    label: 'Min Height',
    placeholder: 'Minimum height of item',
    value: '',
    name: 'min_height',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  max_height: {
    label: 'Max Height',
    placeholder: 'Maximum height of item',
    value: '',
    name: 'max_height',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  quantity: {
    label: 'Quantity',
    placeholder: 'The total number of items',
    value: '',
    name: 'quantity',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
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
    placeholder: 'Walmart...',
    value: '',
    name: 'bought_at',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Place of purchase should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS_VARIANT,
  },
};

export const VIEW_PERSONAL_INVENTORY_LIST_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'Item name',
    modifier: (title) => `${title}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Item Description',
    displayName: 'Description',
  },
  price: {
    id: 3,
    colName: 'price',
    label: 'Cost',
    modifier: (title) => `${title}`,
  },
  status: {
    id: 4,
    colName: 'status',
    label: 'Status',
    modifier: (title) => `${title}`,
  },
  barcode: {
    id: 5,
    colName: 'barcode',
    label: 'Barcode',
    modifier: (title) => `${title}`,
  },
  sku: {
    id: 6,
    colName: 'sku',
    label: 'SKU',
    modifier: (title) => `${title}`,
  },
  quantity: {
    id: 7,
    colName: 'quantity',
    label: 'Quantity',
    modifier: (title) => `${title}`,
  },
  location: {
    id: 8,
    colName: 'location',
    label: 'Location',
    modifier: (title) => `${title}`,
  },
  is_returnable: {
    id: 9,
    colName: 'is_returnable',
    label: 'Returnable',
    modifier: (title) => `${title}`,
  },
  return_location: {
    id: 10,
    colName: 'return_location',
    label: 'Return Location',
    modifier: (title) => `${title}`,
  },
  max_weight: {
    id: 11,
    colName: 'max_weight',
    label: 'Max Weight',
    modifier: (title) => `${title}`,
  },
  min_weight: {
    id: 12,
    colName: 'min_weight',
    label: 'Min Weight',
    modifier: (title) => `${title}`,
  },
  max_height: {
    id: 13,
    colName: 'max_height',
    label: 'Max Height',
    modifier: (title) => `${title}`,
  },
  min_height: {
    id: 14,
    colName: 'min_height',
    label: 'Min Height',
    modifier: (title) => `${title}`,
  },
  updated_at: {
    id: 15,
    colName: 'updated_at',
    label: 'Updated At',
    modifier: (title) => `${title}`,
  },
  created_at: {
    id: 16,
    colName: 'created_at',
    label: 'Created At',
    modifier: (title) => `${title}`,
  },
  updater_name: {
    id: 17,
    colName: 'updater_name',
    label: 'Updated By',
    modifier: (title) => `${title}`,
  },
  bought_at: {
    id: 18,
    colName: 'bought_at',
    label: 'Purchase Location',
    modifier: (title) => `${title}`,
  },
};
