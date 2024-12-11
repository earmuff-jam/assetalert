import SelectedAssetMoreInformation from '@features/SelectedAsset/SelectedAssetMoreInformation';
import dayjs from 'dayjs';

export default {
  title: 'AssetList/SelectedAsset/SelectedAssetMoreInformation',
  component: SelectedAssetMoreInformation,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetMoreInformation {...args} />;

export const SelectedAssetMoreInformationDefault = Template.bind({});
export const SelectedAssetMoreInformationBookmarkSelected = Template.bind({});
export const SelectedAssetMoreInformationReturnableSelected = Template.bind({});
export const SelectedAssetMoreInformationReturnableSelectedWithReturnNotes = Template.bind({});

SelectedAssetMoreInformationDefault.args = {
  formFields: {
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
  },
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationBookmarkSelected.args = {
  formFields: {
    is_bookmarked: {
      id: 'is_bookmarked',
      value: true,
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
  },
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationReturnableSelected.args = {
  formFields: {
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
      value: true,
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
  },
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};

SelectedAssetMoreInformationReturnableSelectedWithReturnNotes.args = {
  formFields: {
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
      value: true,
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
  },
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: true,
  setOpenReturnNote: () => {},
  handleCheckbox: () => {},
  handleInputChange: () => {},
};
