import ItemCard from '../../../features/common/ItemCard/ItemCard';

export default {
  title: 'Common/ItemCard',
  component: ItemCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const ItemCardDefaultMode = {
  args: {
    data: [],
    handleEdit: () => {},
    handleDelete: () => {},
    prefixURI: '',
  },
};

export const ItemCardEmptyDataMode = {
  args: {
    data: [],
    handleEdit: () => {},
    handleDelete: () => {},
    prefixURI: '',
  },
};

export const ItemCardCategoryMode = {
  args: {
    data: [
      {
        id: 'b517b0ea-2d4f-4d65-94e9-9b89ba6499aa',
        name: 'Von, Smitham and Torphy',
        description: 'Drinking occupy typewriter DIY.',
        color: '#bb5588',
        status: '97c0089a-8dfc-426b-bdad-6d2a70822255',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        min_items_limit: 9,
        max_items_limit: 34,
        location: {
          lat: 0,
          lon: 0,
        },
        created_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        created_at: '2024-10-15T01:42:32.643707Z',
        creator: 'John Doe',
        updated_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        updated_at: '2024-10-15T01:42:32.643708Z',
        updator: 'John Doe',
        sharable_groups: ['e09a085b-71c7-4a22-a5ff-aca26bfa01c6'],
      },
    ],
    handleEdit: () => {},
    handleDelete: () => {},
    prefixURI: '',
  },
};

export const ItemCardMaintenancePlanMode = {
  args: {
    data: [
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
    handleEdit: () => {},
    handleDelete: () => {},
    prefixURI: 'plan',
  },
};
