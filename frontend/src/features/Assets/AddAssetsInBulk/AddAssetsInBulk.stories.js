import AddAssetsInBulk from '@features/Assets/AddAssetsInBulk/AddAssetsInBulk';

export default {
  title: 'AssetList/AddAssetsInBulk/AddAssetsInBulk',
  component: AddAssetsInBulk,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetsInBulk {...args} />;

export const AddAssetsInBulkDefault = Template.bind({});

AddAssetsInBulkDefault.args = {
  handleClose: () => {},
};
