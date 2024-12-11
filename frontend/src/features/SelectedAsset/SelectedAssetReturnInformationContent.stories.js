import SelectedAssetReturnInformationContent from '@features/SelectedAsset/SelectedAssetReturnInformationContent';
import dayjs from 'dayjs';

export default {
  title: 'AssetList/SelectedAsset/SelectedAssetReturnInformationContent',
  component: SelectedAssetReturnInformationContent,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetReturnInformationContent {...args} />;

export const SelectedAssetReturnInformationContentDefault = Template.bind({});
export const SelectedAssetReturnInformationContentWithReturnNotes = Template.bind({});

SelectedAssetReturnInformationContentDefault.args = {
  formFields: {
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
  },
  handleInputChange: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
};

SelectedAssetReturnInformationContentWithReturnNotes.args = {
  formFields: {
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
  },
  handleInputChange: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: true,
  setOpenReturnNote: () => {},
};
