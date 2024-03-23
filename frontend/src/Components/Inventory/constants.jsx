import { AllInboxRounded, DraftsRounded, LoyaltyRounded, VisibilityOffRounded } from '@material-ui/icons';

export const INVENTORY_TABS = [
    {
      id: 1,
      icon: <AllInboxRounded />,
      tootipTitle: 'Displays products that are not hidden',
      label: 'All products',
    },
    {
      id: 2,
      icon: <LoyaltyRounded />,
      tootipTitle: 'Displays products that were labelled as bought in sale',
      label: 'Coupons / Deals',
    },
    {
      id: 3,
      icon: <DraftsRounded />,
      tootipTitle: 'Displays all products labelled as draft / published',
      label: 'Draft / Published',
    },
    {
      id: 4,
      icon: <VisibilityOffRounded />,
      tootipTitle: 'Displays all products with hidden status',
      label: 'Hidden status',
    },
  ];


  export const VIEW_PERSONAL_INVENTORY_LIST_HEADERS = {
    name: {
      key: 'item_detail',
      title: 'Item name',
      displayName: 'Item name',
    },
    location: {
      key: 'location',
      title: 'Storage Location',
      displayName: 'Location',
    },
    item_detail: {
      key: 'item_detail',
      title: 'Item Detail',
      displayName: 'Item Details',
    },
    quantity: {
      key: 'quantity',
      title: 'Quantity',
      displayName: 'Item Quantity',
      modifier: (title) => `${title}`,
    },
    unit_price: {
      key: 'unit_price',
      title: 'Unit Price',
      displayName: 'Price Per Unit',
      modifier: (title) => `${title}`,
    },
    bought_at: {
      key: 'bought_at',
      title: 'Bought At',
      displayName: 'Purchase Location',
      modifier: (title) => `${title}`,
    },
    description: {
      key: 'item_description',
      title: 'Item Description',
      displayName: 'Description',
    },
    creator_name: {
      key: 'creator_name',
      title: 'Creator Name',
      displayName: 'Creator',
    },
    updater_name: {
      key: 'updater_name',
      title: 'Updator Name',
      displayName: 'Updater',
    },
    created_at: {
      key: 'created_at',
      title: 'Created At',
      displayName: 'Creation Date',
    },
    updated_at: {
      key: 'updated_at',
      title: 'Updated At',
      displayName: 'Update Date',
    },
    sharable_groups: {
      key: 'sharable_groups',
      title: 'Sharing with',
      display: 'Sharing with',
      modifier: (title) => `${title}`,
    },
  };
  