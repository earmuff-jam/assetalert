import OverviewContentAssetGraph from '@features/Home/OverviewContent/OverviewContentAssetGraph';

export default {
  title: 'Home/OverviewContent/OverviewContentAssetGraph',
  component: OverviewContentAssetGraph,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewContentAssetGraph {...args} />;

export const OverviewContentAssetGraphDefault = Template.bind({});
export const OverviewContentAssetGraphHigherAssetsCount = Template.bind({});

OverviewContentAssetGraphDefault.args = {
  assets: [
    {
      id: 1,
    },
  ],
  categories: [
    {
      id: 1,
    },
  ],
  maintenancePlans: [
    {
      id: 1,
    },
  ],
};

OverviewContentAssetGraphHigherAssetsCount.args = {
  assets: [{ id: 1 }, { id: 2 }, { id: 3 }],
  categories: [
    {
      id: 1,
    },
  ],
  maintenancePlans: [
    {
      id: 1,
    },
  ],
};
