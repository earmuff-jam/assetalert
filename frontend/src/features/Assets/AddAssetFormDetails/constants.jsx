import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AllInboxRounded, DraftsRounded, LoyaltyRounded, VisibilityOffRounded } from '@mui/icons-material';

dayjs.extend(relativeTime);

export const ADD_NEW_INVENTORY_SUBTITLE_TEXT =
  'Add items for your own inventory. Store items under here that are for your personal use. All Items stored with due process until the user profile is abandoned.';

export const ADD_ASSET_STEPS = ['Add inventory', 'Add more details', 'Publish inventory'];

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

export const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

/**
 * ADD ITEM FORM.
 *
 * Used to add new asset.
 */
export const ADD_ASSET_FORM = {
  name: {
    id: 'name',
    label: 'Asset name',
    value: '',
    placeholder: 'The name of the asset',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Asset name is required',
      },
      {
        validate: (value) => value.trim().length >= 200,
        message: 'Asset name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    label: 'Asset description',
    placeholder: 'The detailed description of the asset',
    value: '',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Asset description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Asset description should be less than 50 characters',
      },
    ],
  },
  price: {
    id: 'price',
    label: 'Asset price (per unit)',
    placeholder: 'The per unit cost of the asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected Asset is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  barcode: {
    id: 'barcode',
    label: 'Barcode of item',
    placeholder: 'The unique identifier for the item',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Asset barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    id: 'sku',
    label: 'Sku of asset',
    placeholder: 'The SKU of the selected asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of Asset should be less than 50 characters',
      },
    ],
  },
  quantity: {
    id: 'quantity',
    label: 'Asset quantity',
    value: '',
    placeholder: 'Asset quantity',
    isRequired: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected Asset is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  bought_at: {
    id: 'bought_at',
    label: 'Where did you buy the item',
    placeholder: 'The purchase location of the asset',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  location: {
    id: 'location',
    label: 'Where do you want to store the item',
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  is_bookmarked: {
    id: 'is_bookmarked',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  is_returnable: {
    id: 'is_returnable',
    value: false,
    isRequired: false,
    errorMsg: '',
    validators: [],
  },
  return_location: {
    id: 'return_location',
    label: 'Where to return the item',
    placeholder: 'The return location of the item',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  return_datetime: {
    id: 'return_datetime',
    value: '',
    type: 'datetime',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value < new Date().toISOString(),
        message: 'Return datetime cannot be an eariler date or time',
      },
    ],
  },
  max_weight: {
    id: 'max_weight',
    label: 'Max weight in kg',
    placeholder: 'The maximum weight of the asset in kg',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_weight: {
    id: 'min_weight',
    label: 'Min weight in kg',
    placeholder: 'The minimum weight of asset in kg',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  max_height: {
    id: 'max_height',
    label: 'Max height in inches',
    placeholder: 'The maximum height of asset in inches',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_height: {
    id: 'min_height',
    label: 'Min height in inches',
    placeholder: 'The minimum height of the asset in inches',
    value: '',
    isRequired: false,
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
};

export const VIEW_PERSONAL_INVENTORY_LIST_HEADERS = {
  name: {
    id: 1,
    colName: 'name',
    label: 'Asset name',
    modifier: (title) => `${title}`,
  },
  description: {
    id: 2,
    colName: 'description',
    label: 'Asset Description',
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
    label: 'Storage location',
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
    modifier: (value) => `${dayjs(value).fromNow()}`,
  },
  created_at: {
    id: 16,
    colName: 'created_at',
    label: 'Created At',
    modifier: (value) => `${dayjs(value).fromNow()}`,
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
