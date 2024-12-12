import SelectedAssetFormFields from '@features/SelectedAsset/SelectedAssetFormFields';

export default {
  title: 'AssetList/SelectedAsset/SelectedAssetFormFields',
  component: SelectedAssetFormFields,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetFormFields {...args} />;

export const SelectedAssetFormFieldsDefault = Template.bind({});

SelectedAssetFormFieldsDefault.args = {
  formFields: {
    name: {
      id: 'name',
      label: 'Asset name',
      name: 'name',
      size: 'small',
      placeholder: 'Asset name',
      value: '',
      type: 'text',
      isRequired: true,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length === 0,
          message: 'Item name is required',
        },
        {
          validate: (value) => value.trim().length >= 200,
          message: 'Item name should be less than 50 characters',
        },
      ],
    },
    description: {
      id: 'description',
      label: 'Asset description',
      value: '',
      name: 'description',
      placeholder: 'Asset description in less than 500 characters',
      type: 'text',
      size: 'small',
      isRequired: true,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length === 0,
          message: 'Item description is required',
        },
        {
          validate: (value) => value.trim().length >= 500,
          message: 'Item description should be less than 50 characters',
        },
      ],
    },
    price: {
      id: 'price',
      label: 'Asset price (per unit)',
      value: '',
      name: 'price',
      size: 'small',
      placeholder: 'Asset price per unit',
      type: 'number',
      isRequired: false,
      errorMsg: '',
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
    },
    barcode: {
      id: 'barcode',
      name: 'barcode',
      label: 'Barcode',
      value: '',
      type: 'text',
      size: 'small',
      placeholder: 'Barcode of the selected asset',
      isRequired: false,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length >= 50,
          message: 'Item barcode should be less than 50 characters',
        },
      ],
    },
    sku: {
      id: 'sku',
      name: 'sku',
      label: 'SKU',
      value: '',
      type: 'text',
      size: 'small',
      placeholder: 'SKU of the selected asset',
      isRequired: false,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length >= 50,
          message: 'SKU of item should be less than 50 characters',
        },
      ],
    },
    quantity: {
      id: 'quantity',
      name: 'quantity',
      label: 'Asset quantity',
      value: '',
      type: 'number',
      placeholder: 'The quantity of the asset',
      size: 'small',
      isRequired: true,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length === 0,
          message: 'Quantity for the selected item is required',
        },
        {
          validate: (value) => isNaN(value) || parseInt(value) <= 0,
          message: 'A positive number is required',
        },
      ],
    },
    bought_at: {
      id: 'bought_at',
      name: 'bought_at',
      label: 'Place of purchase',
      placeholder: 'Where did you buy this item?',
      value: '',
      type: 'text',
      size: 'small',
      isRequired: false,
      errorMsg: '',
      validators: [],
    },
    location: {
      id: 'location',
      label: 'Storage location',
      placeholder: 'Where do you want to store the item',
      type: 'text',
      isRequired: false,
      errorMsg: '',
      validators: [],
    },
    is_bookmarked: {
      id: 'is_bookmarked',
      value: false,
      type: 'boolean',
      isRequired: false,
      errorMsg: '',
      validators: [],
    },
    is_returnable: {
      id: 'is_returnable',
      value: false,
      type: 'boolean',
      isRequired: false,
      errorMsg: '',
      validators: [],
    },
    return_location: {
      id: 'return_location',
      name: 'return_location',
      label: 'Return location',
      placeholder: 'Where to return the item',
      value: '',
      type: 'text',
      size: 'small',
      isRequired: false,
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length >= 50,
          message: 'Return location should be less than 50 characters',
        },
      ],
    },
    max_weight: {
      id: 'max_weight',
      name: 'max_weight',
      label: 'Maxmimum weight',
      placeholder: 'Maximum weight of the selected asset in kg',
      value: '',
      type: 'number',
      size: 'small',
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
      name: 'min_weight',
      label: 'Minimum Weight',
      placeholder: 'Minimum weight of the selected asset in kg',
      value: '',
      type: 'number',
      size: 'small',
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
      name: 'max_height',
      label: 'Maximum height',
      placeholder: 'Maximum height of selected asset in inches',
      value: '',
      type: 'number',
      size: 'small',
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
      name: 'min_height',
      label: 'Minimum height',
      placeholder: 'Minimum height of selected asset in inches',
      value: '',
      type: 'number',
      size: 'small',
      isRequired: false,
      errorMsg: '',
      validators: [
        {
          validate: (value) => isNaN(value) || parseInt(value) <= 0,
          message: 'A positive number is required',
        },
      ],
    },
    return_notes: {
      id: 'return_notes',
      name: 'return_notes',
      label: 'Return notes',
      placeholder: 'Add return notes in less than 500 characters',
      value: '',
      type: 'text',
      isRequired: false,
      size: 'small',
      errorMsg: '',
      validators: [
        {
          validate: (value) => value.trim().length >= 500,
          message: 'Return notes should be less than 500 characters',
        },
      ],
    },
    created_at: {
      id: 'created_at',
      errorMsg: '',
      validators: [],
    },
    created_by: {
      id: 'created_by',
      errorMsg: '',
      validators: [],
    },
    updated_at: {
      id: 'updated_at',
      errorMsg: '',
      validators: [],
    },
    updated_by: {
      id: 'updated_by',
      errorMsg: '',
      validators: [],
    },
    sharable_groups: {
      id: 'sharable_groups',
      errorMsg: '',
      validators: [],
    },
  },
  selectedImage: '',
  handleInputChange: () => {},
  options: [],
  storageLocation: {},
  setStorageLocation: () => {},
};
