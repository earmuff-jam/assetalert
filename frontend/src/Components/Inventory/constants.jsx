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
    placeholder: 'Item barcode to reference item',
    value: '',
    name: 'barcode',
    errorMsg: '',
    required: false,
    fullWidth: true,
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
    placeholder: 'SKU of the item',
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
    ...GENERIC_FORM_FIELDS_OUTLINED_VARIANT,
  },
  status: {
    // status is hidden because its not a textfield. index === 4 is status
    // status column is skipped in AddInventoryDetails
    label: 'Item Status',
    placeholder: 'Item Status',
    value: '',
    name: 'status',
    errorMsg: '',
    required: true,
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
    placeholder: 'Walmart...',
    value: '',
    name: 'bought_at',
    errorMsg: '',
    required: false,
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
    key: 'name',
    title: 'Item name',
    modifier: (title) => `${title}`,
  },
  description: {
    key: 'item_description',
    title: 'Item Description',
    displayName: 'Description',
  },
  price: {
    key: 'price',
    title: 'Cost',
    modifier: (title) => `${title}`,
  },
  status: {
    key: 'status',
    title: 'Status',
    modifier: (title) => `${title}`,
  },
  barcode: {
    key: 'barcode',
    title: 'Barcode',
    modifier: (title) => `${title}`,
  },
  sku: {
    key: 'sku',
    title: 'SKU',
    modifier: (title) => `${title}`,
  },
  quantity: {
    key: 'quantity',
    title: 'Quantity',
    modifier: (title) => `${title}`,
  },
  location: {
    key: 'location',
    title: 'Location',
    modifier: (title) => `${title}`,
  },
  updated_at: {
    key: 'updated_at',
    title: 'Updated At',
    modifier: (title) => `${title}`,
  },
  created_at: {
    key: 'created_at',
    title: 'Created At',
    modifier: (title) => `${title}`,
  },
  updater_name: {
    key: 'updater_name',
    title: 'Updated By',
    modifier: (title) => `${title}`,
  },
  bought_at: {
    key: 'bought_at',
    title: 'Purchase Location',
    modifier: (title) => `${title}`,
  },
};
