import MaintenancePlanItemDetailsAddAsset from '@features/MaintenancePlanItemDetails/MaintenancePlanItemDetailsAddAsset/MaintenancePlanItemDetailsAddAsset';

export default {
  title: 'Maintenance/MaintenancePlanItem/MaintenancePlanItemDetailsAddAsset',
  component: MaintenancePlanItemDetailsAddAsset,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanItemDetailsAddAsset {...args} />;

export const MaintenancePlanItemDetailsAddAssetDefault = Template.bind({});

MaintenancePlanItemDetailsAddAssetDefault.args = {
  rowSelected: [],
  setRowSelected: () => {},
  itemsInMaintenancePlan: [],
};
