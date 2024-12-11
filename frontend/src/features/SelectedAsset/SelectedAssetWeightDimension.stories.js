import SelectedAssetWeightDimension from '@features/SelectedAsset/SelectedAssetWeightDimension';

export default {
  title: 'AssetList/SelectedAsset/SelectedAssetWeightDimension',
  component: SelectedAssetWeightDimension,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetWeightDimension {...args} />;

export const SelectedAssetWeightDimensionDefault = Template.bind({});

SelectedAssetWeightDimensionDefault.args = {
  formFields: {
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
  },
  handleInputChange: () => {},
};
