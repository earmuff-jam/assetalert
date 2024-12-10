import AssetListHeader from '@features/Assets/AssetListHeader/AssetListHeader';

export default {
  title: 'AssetList/AssetListHeader/AssetListHeader',
  component: AssetListHeader,
  tags: ['autodocs'],
};

const Template = (args) => <AssetListHeader {...args} />;

export const AssetListHeaderDefault = Template.bind({});
export const AssetListHeaderListMode = Template.bind({});
export const AssetListHeaderDisableDelete = Template.bind({});

AssetListHeaderDefault.args = {
  gridMode: false,
  setGridMode: () => {},
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 1,
    },
  ],
  setOptions: () => {},
  disableDelete: false,
  handleRemoveInventory: () => {},
};

AssetListHeaderListMode.args = {
  gridMode: true,
  setGridMode: () => {},
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 1,
    },
  ],
  setOptions: () => {},
  disableDelete: false,
  handleRemoveInventory: () => {},
};

AssetListHeaderDisableDelete.args = {
  gridMode: true,
  setGridMode: () => {},
  setModalState: () => {},
  inventories: [],
  options: [
    {
      id: 1,
    },
  ],
  setOptions: () => {},
  disableDelete: true,
  handleRemoveInventory: () => {},
};
