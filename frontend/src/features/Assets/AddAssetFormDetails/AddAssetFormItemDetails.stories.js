import dayjs from 'dayjs';

import { ADD_ASSET_FORM } from '@features/Assets/AddAssetFormDetails/constants';
import AddAssetFormItemDetails from '@features/Assets/AddAssetFormDetails/AddAssetFormItemDetails';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetFormItemDetails',
  component: AddAssetFormItemDetails,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormItemDetails {...args} />;

export const AddAssetFormItemDetailsDefault = Template.bind({});

AddAssetFormItemDetailsDefault.args = {
  formData: ADD_ASSET_FORM,
  handleInputChange: () => {},
  handleCheckbox: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
};
