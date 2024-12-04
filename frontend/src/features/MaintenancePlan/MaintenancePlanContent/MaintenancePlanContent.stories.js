import MaintenancePlanContent from '@features/MaintenancePlan/MaintenancePlanContent/MaintenancePlanContent';

export default {
  title: 'MaintenancePlan/PlanContent',
  component: MaintenancePlanContent,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanContent {...args} />;

export const MaintenancePlanContentDefault = Template.bind({});
export const MaintenancePlanContentLoading = Template.bind({});
export const MaintenancePlanContentEmptyDetails = Template.bind({});
export const MaintenancePlanContentModalSelection = Template.bind({});

MaintenancePlanContentDefault.args = {
  maintenancePlan: [
    {
      id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
      name: 'Daily maintenance plan',
      description: 'A maintenance plan built for assets that require daily management.',
      color: '#d20a0a',
      maintenance_status: '',
      maintenance_status_name: 'draft',
      maintenance_status_description: 'items under this bucket are in draft state',
      min_items_limit: 1,
      max_items_limit: 100,
      plan_type: 'annual',
      plan_due: '0001-01-01T00:00:00Z',
      location: {
        lat: 0,
        lon: 0,
      },
      created_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      created_at: '2024-11-29T13:19:16.754332Z',
      creator: 'John Doe',
      updated_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      updated_at: '2024-11-29T13:19:16.754332Z',
      updator: 'John Doe',
      sharable_groups: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedMaintenancePlanID: () => {},
};

MaintenancePlanContentLoading.args = {
  maintenancePlan: [],
  loading: true,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedMaintenancePlanID: () => {},
};

MaintenancePlanContentEmptyDetails.args = {
  maintenancePlan: [],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedMaintenancePlanID: () => {},
};

MaintenancePlanContentModalSelection.args = {
  maintenancePlan: [
    {
      id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
      name: 'Daily maintenance plan',
      description: 'A maintenance plan built for assets that require daily management.',
      color: '#d20a0a',
      maintenance_status: '',
      maintenance_status_name: 'draft',
      maintenance_status_description: 'items under this bucket are in draft state',
      min_items_limit: 1,
      max_items_limit: 100,
      plan_type: 'annual',
      plan_due: '0001-01-01T00:00:00Z',
      location: {
        lat: 0,
        lon: 0,
      },
      created_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      created_at: '2024-11-29T13:19:16.754332Z',
      creator: 'John Doe',
      updated_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      updated_at: '2024-11-29T13:19:16.754332Z',
      updator: 'John Doe',
      sharable_groups: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  loading: false,
  displayModal: true,
  setDisplayModal: () => {},
  setSelectedMaintenancePlanID: () => {},
};
