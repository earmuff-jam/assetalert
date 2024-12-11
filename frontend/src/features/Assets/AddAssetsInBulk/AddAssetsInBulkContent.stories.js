import AddAssetsInBulkContent from '@features/Assets/AddAssetsInBulk/AddAssetsInBulkContent';

export default {
  title: 'AssetList/AddAssetsInBulk/AddAssetsInBulkContent',
  component: AddAssetsInBulkContent,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetsInBulkContent {...args} />;

export const AddAssetsInBulkContentDefault = Template.bind({});

AddAssetsInBulkContentDefault.args = {
  handleClose: () => {},
};
