import PlanHeader from '@features/MaintenancePlan/MaintenancePlanHeader/MaintenancePlanHeader';

export default {
  title: 'MaintenancePlan/PlanHeader',
  component: PlanHeader,
  tags: ['autodocs'],
};

const Template = (args) => <PlanHeader {...args} />;

export const PlanHeaderDefault = Template.bind({});
export const PlanHeaderDraftStatus = Template.bind({});
export const PlanHeaderASCSortingOrder = Template.bind({});

PlanHeaderDefault.args = {
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
};

PlanHeaderDraftStatus.args = {
  toggleModal: () => {},
  selectedFilter: 'draft',
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
};

PlanHeaderASCSortingOrder.args = {
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: false,
  setSortingOrder: () => {},
};
