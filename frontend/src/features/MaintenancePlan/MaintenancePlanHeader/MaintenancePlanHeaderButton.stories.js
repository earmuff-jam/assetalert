import PlanHeaderButton from '@features/MaintenancePlanList/MaintenancePlanHeader/MaintenancePlanHeaderButton';

export default {
  title: 'MaintenancePlan/PlanHeaderButton',
  component: PlanHeaderButton,
  tags: ['autodocs'],
};

const Template = (args) => <PlanHeaderButton {...args} />;

export const PlanHeaderButtonDefault = Template.bind({});

PlanHeaderButtonDefault.args = {
  handleButtonClick: () => {},
  handleIconButtonClick: () => {},
};
