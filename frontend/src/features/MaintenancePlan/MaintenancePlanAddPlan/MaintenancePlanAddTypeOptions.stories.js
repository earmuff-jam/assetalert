import MaintenancePlanAddTypeOptions from '@features/MaintenancePlan/MaintenancePlanAddPlan/MaintenancePlanAddTypeOptions';

export default {
  title: 'Maintenance/MaintenancePlan/MaintenancePlanAddTypeOptions',
  component: MaintenancePlanAddTypeOptions,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanAddTypeOptions {...args} />;

export const MaintenancePlanAddTypeOptionsDefault = Template.bind({});

MaintenancePlanAddTypeOptionsDefault.args = {
  value: 'Daily',
  handleChange: () => {},
};
