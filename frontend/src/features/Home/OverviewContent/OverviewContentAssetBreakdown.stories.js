import OverviewContentAssetBreakdown from '@features/Home/OverviewContent/OverviewContentAssetBreakdown';

export default {
  title: 'Home/OverviewContent/OverviewContentAssetBreakdown',
  component: OverviewContentAssetBreakdown,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewContentAssetBreakdown {...args} />;

export const OverviewContentAssetBreakdownDefault = Template.bind({});

OverviewContentAssetBreakdownDefault.args = {
  assets: [{ id: 1 }, { id: 2 }],
  categories: [{ id: 1 }],
  maintenancePlans: [],
};
