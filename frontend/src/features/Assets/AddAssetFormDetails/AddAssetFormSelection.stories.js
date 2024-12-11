import dayjs from 'dayjs';

import { ADD_ASSET_FORM } from '@features/Assets/AddAssetFormDetails/constants';
import AddAssetFormSelection from '@features/Assets/AddAssetFormDetails/AddAssetFormSelection';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetFormSelection',
  component: AddAssetFormSelection,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormSelection {...args} />;

export const AddAssetFormSelectionDefault = Template.bind({});
export const AddAssetFormSelectionSecondSelection = Template.bind({});
export const AddAssetFormSelectionThirdSelection = Template.bind({});

AddAssetFormSelectionDefault.args = {
  stepNumber: 1,
  formData: ADD_ASSET_FORM,
  storageLocation: {},
  setStorageLocation: () => {},
  handleInputChange: () => {},
  handleCheckbox: () => {},
  handleReset: () => {},
  handleSubmit: () => {},
  options: [],
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
};

AddAssetFormSelectionSecondSelection.args = {
  stepNumber: 2,
  formData: ADD_ASSET_FORM,
  storageLocation: {},
  setStorageLocation: () => {},
  handleInputChange: () => {},
  handleCheckbox: () => {},
  handleReset: () => {},
  handleSubmit: () => {},
  options: [],
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
};

AddAssetFormSelectionThirdSelection.args = {
  stepNumber: 3,
  formData: ADD_ASSET_FORM,
  storageLocation: {},
  setStorageLocation: () => {},
  handleInputChange: () => {},
  handleCheckbox: () => {},
  handleReset: () => {},
  handleSubmit: () => {},
  options: [],
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
};
