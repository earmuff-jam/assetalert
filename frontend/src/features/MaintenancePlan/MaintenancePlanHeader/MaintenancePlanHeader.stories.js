import MaintenancePlanHeader from '@features/MaintenancePlan/MaintenancePlanHeader/MaintenancePlanHeader';

export default {
  title: 'Maintenance/MaintenancePlan/MaintenancePlanHeader',
  component: MaintenancePlanHeader,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanHeader {...args} />;

export const MaintenancePlanHeaderDefault = Template.bind({});
export const MaintenancePlanHeaderDraftStatus = Template.bind({});
export const MaintenancePlanHeaderASCSortingOrder = Template.bind({});

MaintenancePlanHeaderDefault.args = {
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
};

MaintenancePlanHeaderDraftStatus.args = {
  toggleModal: () => {},
  selectedFilter: 'draft',
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
};

MaintenancePlanHeaderASCSortingOrder.args = {
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: false,
  setSortingOrder: () => {},
};
