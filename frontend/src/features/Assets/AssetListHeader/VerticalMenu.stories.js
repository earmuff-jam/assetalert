import VerticalMenu from '@features/Assets/AssetListHeader/VerticalMenu';

export default {
  title: 'AssetList/AssetListHeader/VerticalMenu',
  component: VerticalMenu,
  tags: ['autodocs'],
};

const Template = (args) => <VerticalMenu {...args} />;

export const VerticalMenuDefault = Template.bind({});
export const VerticalMenuDeleteDisabled = Template.bind({});

VerticalMenuDefault.args = {
  disableDelete: false,
  handleAddInventory: () => {},
  handleBulkInventory: () => {},
  handleRemoveInventory: () => {},
};

VerticalMenuDeleteDisabled.args = {
  disableDelete: true,
  handleAddInventory: () => {},
  handleBulkInventory: () => {},
  handleRemoveInventory: () => {},
};
