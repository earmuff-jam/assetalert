import HomeHeader from './HomeHeader';

export default {
  title: 'Home/HomeHeader',
  component: HomeHeader,
};

export const HomeHeaderDefault = {
  args: {
    categories: [
      {
        id: '04799e99-30a3-4c70-abbd-13dd7ed950eb',
        name: 'Groceries',
        type: 'C',
        returntime: '0001-01-01T00:00:00Z',
        price: 0,
        items: ['Dog food', '4 pounds of kitty litter'],
        created_at: '2024-11-24T01:24:30.882278Z',
        updated_at: '2024-11-24T01:24:30.882278Z',
        sharable_groups: ['96cf5b68-fcda-422c-8d61-8f638e2803a5'],
      },
    ],
    maintenancePlans: [
      {
        id: 'f61f101a-d848-4c5d-972c-853e7ab16866',
        name: 'Comprehensive Overhaul',
        type: 'M',
        returntime: '0001-01-01T00:00:00Z',
        price: 0,
        items: ['Dog food', '4 pounds of kitty litter'],
        created_at: '2024-11-24T01:24:31.982518Z',
        updated_at: '2024-11-24T01:24:31.982518Z',
        sharable_groups: ['96cf5b68-fcda-422c-8d61-8f638e2803a5'],
      },
    ],
    assets: [
      {
        id: '',
        name: 'Dog food',
        description: '6 pounds of food bought from tractor supply',
        price: 96,
        status: '',
        barcode: '',
        sku: '',
        quantity: 1,
        location: '',
        storage_location_id: '',
        is_returnable: false,
        return_location: 'amazon',
        returntime: '2024-10-30T06:00:00Z',
        max_weight: '',
        min_weight: '',
        max_height: '',
        min_height: '',
        associated_image_url: '',
        created_at: '0001-01-01T00:00:00Z',
        created_by: '',
        creator_name: '',
        updated_at: '0001-01-01T00:00:00Z',
        updated_by: '',
        updator: '',
        bought_at: 'Walmart',
        sharable_groups: null,
      },
    ],
  },
};

export const HomeHeaderEmptyData = {
  args: {
    categories: [],
    maintenancePlans: [],
    assets: [],
  },
};
