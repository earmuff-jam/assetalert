import AddAssetFormReview from '@features/Assets/AddAssetFormDetails/AddAssetFormReview';
import { ADD_ASSET_FORM } from '@features/Assets/AddAssetFormDetails/constants';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetFormReview',
  component: AddAssetFormReview,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormReview {...args} />;

export const AddAssetFormReviewDefault = Template.bind({});

AddAssetFormReviewDefault.args = {
  formData: ADD_ASSET_FORM,
  handleReset: () => {},
  handleSubmit: () => {},
};
