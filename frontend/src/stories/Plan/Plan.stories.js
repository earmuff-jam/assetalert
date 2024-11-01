import Plan from '../../features/Maintenance/Plan';

export default {
  title: 'Plan/Plan',
  component: Plan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const PlanDefaultMode = {
  args: {
    maintenancePlan: '',
    loading: false,
    displayModal: false,
    setDisplayModal: () => {},
    setSelectedMaintenancePlanID: () => {},
  },
};

export const PlanLoadingMode = {
  args: {
    maintenancePlan: '',
    loading: true,
    displayModal: false,
    setDisplayModal: () => {},
    setSelectedMaintenancePlanID: () => {},
  },
};

export const PlanViewSingleMode = {
  args: {
    maintenancePlan: [
      {
        id: 'bf1316fb-542a-40ff-b6bc-a4fcf51837c1',
        name: 'Kitten litter maintenenace plan',
        description: 'location to maintain kitten litters.',
        color: '#ffcc99',
        maintenance_status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        maintenance_status_name: 'draft',
        maintenance_status_description: 'items under this bucket are in draft state',
        min_items_limit: 5,
        max_items_limit: 34,
        plan_type: 'weekly',
        plan_due: '0001-01-01T00:00:00Z',
        location: {
          lat: 0,
          lon: 0,
        },
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        created_at: '2024-10-30T00:47:28.748935Z',
        creator: 'John Doe',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updated_at: '2024-10-30T00:47:28.748935Z',
        updator: 'John Doe',
        sharable_groups: ['a260f339-f918-4431-bfa6-4f36ba26c476'],
      },
    ],
    loading: false,
    displayModal: true,
    setDisplayModal: () => {},
    setSelectedMaintenancePlanID: () => {},
  },
};

export const PlanViewMultipleMode = {
  args: {
    maintenancePlan: [
      {
        id: 'bf1316fb-542a-40ff-b6bc-a4fcf51837c1',
        name: 'Kitten litter maintenenace plan',
        description: 'location to maintain kitten litters.',
        color: '#ffcc99',
        maintenance_status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        maintenance_status_name: 'draft',
        maintenance_status_description: 'items under this bucket are in draft state',
        min_items_limit: 5,
        max_items_limit: 34,
        plan_type: 'weekly',
        plan_due: '0001-01-01T00:00:00Z',
        location: {
          lat: 0,
          lon: 0,
        },
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        created_at: '2024-10-30T00:47:28.748935Z',
        creator: 'John Doe',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updated_at: '2024-10-30T00:47:28.748935Z',
        updator: 'John Doe',
        sharable_groups: ['a260f339-f918-4431-bfa6-4f36ba26c476'],
      },
      {
        id: '8a7a7ee4-c743-4853-b460-ac88eaa8247f',
        name: 'Officer plan ',
        description: 'Ugh leggings.',
        color: '#bb5588',
        maintenance_status: '6df043db-b211-4241-94a5-b2c8613a21c5',
        maintenance_status_name: 'draft',
        maintenance_status_description: 'items under this bucket are in draft state',
        min_items_limit: 10,
        max_items_limit: 31,
        plan_type: 'weekly',
        plan_due: '0001-01-01T00:00:00Z',
        location: {
          lat: 0,
          lon: 0,
        },
        created_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        created_at: '2024-10-30T00:47:28.730886Z',
        creator: 'John Doe',
        updated_by: 'a260f339-f918-4431-bfa6-4f36ba26c476',
        updated_at: '2024-10-30T00:47:28.730886Z',
        updator: 'John Doe',
        sharable_groups: ['a260f339-f918-4431-bfa6-4f36ba26c476'],
      },
    ],
    loading: false,
    displayModal: false,
    setDisplayModal: () => {},
    setSelectedMaintenancePlanID: () => {},
  },
};
