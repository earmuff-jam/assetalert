import AssetDetailsDrawerHeader from '@features/Assets/AssetDetailsDrawer/AssetDetailsDrawerHeader';

export default {
  title: 'AssetList/AssetDetailsDrawer/AssetDetailsDrawerHeader',
  component: AssetDetailsDrawerHeader,
  tags: ['autodocs'],
};

const Template = (args) => <AssetDetailsDrawerHeader {...args} />;

export const AssetDetailsDrawerHeaderDefault = Template.bind({});

AssetDetailsDrawerHeaderDefault.args = {
  resetSelection: () => {},
  title: 'Asset Details Drawer Title',
};
