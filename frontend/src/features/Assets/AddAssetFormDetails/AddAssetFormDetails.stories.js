import AddAssetFormDetails from '@features/Assets/AddAssetFormDetails/AddAssetFormDetails';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetFormDetails',
  component: AddAssetFormDetails,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormDetails {...args} />;

export const AddAssetFormDetailsDefault = Template.bind({});

AddAssetFormDetailsDefault.args = {
  formData: {
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
  },
  options: [],
  storageLocation: 'Garage 001',
  setStorageLocation: () => {},
  handleInputChange: () => {},
  handleCheckbox: () => {},
};
