import Category from '../../features/Categories/Category';

export default {
  title: 'Categories/Category',
  component: Category,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const CategoryDefaultMode = {
  args: {
    categories: [],
    loading: false,
    setSelectedCategoryID: () => {},
    setDisplayModal: () => {},
  },
};

export const CategoryLoadingMode = {
  args: {
    categories: [],
    loading: true,
    setSelectedCategoryID: () => {},
    setDisplayModal: () => {},
  },
};

export const CategorySingleMode = {
  args: {
    categories: [
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
    loading: false,
    setSelectedCategoryID: () => {},
    setDisplayModal: () => {},
  },
};

export const CategoryMultipleMode = {
  args: {
    categories: [
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
      {
        id: 'e143d1e5-01b7-4058-b76d-9afc3ccd17a2',
        name: 'Schuster-Upton',
        description: 'Thundercats food truck cred jean shorts.',
        color: '#ffcc99',
        status: '97c0089a-8dfc-426b-bdad-6d2a70822255',
        status_name: 'draft',
        status_description: 'items under this bucket are in draft state',
        min_items_limit: 7,
        max_items_limit: 75,
        location: {
          lat: 0,
          lon: 0,
        },
        created_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        created_at: '2024-10-15T01:42:32.618703Z',
        creator: 'John Doe',
        updated_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        updated_at: '2024-10-15T01:42:32.618704Z',
        updator: 'John Doe',
        sharable_groups: ['e09a085b-71c7-4a22-a5ff-aca26bfa01c6'],
      },
    ],
    loading: false,
    setSelectedCategoryID: () => {},
    setDisplayModal: () => {},
  },
};
