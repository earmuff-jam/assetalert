import MaintenancePlanHeaderButton from '@features/MaintenancePlan/MaintenancePlanHeader/MaintenancePlanHeaderButton';

export default {
  title: 'Maintenance/MaintenancePlan/MaintenancePlanHeaderButton',
  component: MaintenancePlanHeaderButton,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanHeaderButton {...args} />;

export const MaintenancePlanHeaderButtonDefault = Template.bind({});

MaintenancePlanHeaderButtonDefault.args = {
  handleButtonClick: () => {},
  handleIconButtonClick: () => {},
};
