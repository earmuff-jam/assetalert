import DataTable from '../../features/common/DataTable/DataTable';

export default {
  title: 'Common/DataTable',
  component: DataTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const DataTableDefaultMode = {
  args: {
    rows: [
      {
        id: 'efd6b441-4b16-472d-8520-6ef07139d25c',
        category_id: 'dab24172-5882-4774-b1a2-ac6651cf6917',
        item_id: '5e85412e-921d-4783-84ca-8e3212db730d',
        name: 'Dog food',
        description: '6 pounds of food bought from tractor supply',
        price: '96.0000',
        quantity: '1',
        location: 'Utility Closet',
        created_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        created_at: '2024-11-01T20:08:57.939952Z',
        creator: 'IngestSvcUser',
        updated_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        updated_at: '2024-11-01T20:08:57.939952Z',
        updator: 'IngestSvcUser',
        sharable_groups: ['e09a085b-71c7-4a22-a5ff-aca26bfa01c6'],
      },
      {
        id: 'c6f75bb5-6a6d-4867-9343-36582d5760d5',
        category_id: 'dab24172-5882-4774-b1a2-ac6651cf6917',
        item_id: '01f0480e-8d7d-4067-b098-5ab7a98b026a',
        name: '4 pounds of kitty litter',
        description: 'Bought from tractor supply in fm969',
        price: '12.0000',
        quantity: '12',
        location: 'Kitchen Pantry',
        created_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        created_at: '2024-11-01T20:08:57.939952Z',
        creator: 'IngestSvcUser',
        updated_by: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
        updated_at: '2024-11-01T20:08:57.939952Z',
        updator: 'IngestSvcUser',
        sharable_groups: ['e09a085b-71c7-4a22-a5ff-aca26bfa01c6'],
      },
    ],
    columns: [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 2 },
      { field: 'price', headerName: 'Price', flex: 1 },
      { field: 'quantity', headerName: 'Quantity', flex: 1 },
      { field: 'location', headerName: 'Storage Location', flex: 1 },
      { field: 'updator', headerName: 'Last updated by', flex: 1 },
    ],
    isEmpty: false,
    subtitle: '',
  },
};

export const DataTableIsEmptyMode = {
  args: {
    rows: [],
    columns: [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 2 },
      { field: 'price', headerName: 'Price', flex: 1 },
      { field: 'quantity', headerName: 'Quantity', flex: 1 },
      { field: 'location', headerName: 'Storage Location', flex: 1 },
      { field: 'updator', headerName: 'Last updated by', flex: 1 },
    ],
    isEmpty: true,
    subtitle: '',
  },
};

export const DataTableSubtitleMode = {
  args: {
    rows: [],
    columns: [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 2 },
      { field: 'price', headerName: 'Price', flex: 1 },
      { field: 'quantity', headerName: 'Quantity', flex: 1 },
      { field: 'location', headerName: 'Storage Location', flex: 1 },
      { field: 'updator', headerName: 'Last updated by', flex: 1 },
    ],
    isEmpty: false,
    subtitle: 'Data table subtitle',
  },
};
