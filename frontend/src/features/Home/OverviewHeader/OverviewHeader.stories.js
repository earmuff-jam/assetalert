import OverviewHeader from '@features/Home/OverviewHeader/OverviewHeader';

export default {
  title: 'Home/OverviewHeader/OverviewHeader',
  component: OverviewHeader,
  tags: ['autodocs'],
};

export const OverviewHeaderDefault = {
  args: {
    assetsUnderCategories: [
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
    assetsUnderMaintenancePlans: [
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
    assetsPastDue: ['Dog food'],
  },
};

export const OverviewHeaderEmptyData = {
  args: {
    assetsUnderCategories: [],
    assetsUnderMaintenancePlans: [],
    assetsPastDue: [],
  },
};
