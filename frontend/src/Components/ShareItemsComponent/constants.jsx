import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const UNKNOWN_LABEL = 'Unknown';
export const SHARED_INVENTORY_ITEMS = [
  {
    id: 1,
    label: 'Name',
    colName: 'name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 2,
    label: 'Description',
    colName: 'description',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 3,
    label: 'Price',
    colName: 'price',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 4,
    label: 'Quantity',
    colName: 'quantity',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 5,
    label: 'Location',
    colName: 'location',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 6,
    label: 'Barcode',
    colName: 'barcode',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 7,
    label: 'SKU',
    colName: 'sku',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 8,
    label: 'Last modified',
    colName: 'updated_at',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 9,
    label: 'Updator',
    colName: 'updater_name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
];

/**
 * Headers for table component that is used to share items between user and a selected event
 */
export const SHARE_ITEM_COMPONENT_TABLE_HEADERS = [
  {
    id: 1,
    label: 'Serial No',
    colName: '',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 2,
    label: 'Name',
    colName: 'name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 3,
    label: 'Description',
    colName: 'description',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 4,
    label: 'Price',
    colName: 'price',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 5,
    label: 'Quantity',
    colName: 'quantity',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 6,
    label: 'Location',
    colName: 'location',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 7,
    label: 'Last modified',
    colName: 'updated_at',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 8,
    label: 'Updator',
    colName: 'updater_name',
    modifier: (value) => dayjs(value).fromNow() || UNKNOWN_LABEL,
  },
];

/**
 * Headers for table component to view reports made against a selected event
 * used to view all reports in bulk
 */
export const VIEW_REPORT_EVENT_TABLE_HEADERS = [
  {
    id: 1,
    label: 'Serial No',
    colName: '',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 2,
    label: 'Subject',
    colName: 'subject',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 3,
    label: 'Description',
    colName: 'description',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 4,
    label: 'Last updated at',
    colName: 'updated_at',
    modifier: (value) => dayjs(value).fromNow() || UNKNOWN_LABEL,
  },
  {
    id: 5,
    label: 'Reporter',
    colName: 'updator_name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
];

/**
 * Headers for table component to view reports made against a selected event
 * used to view a single report
 */
export const SELECTED_REPORT_DETAILED_ITEM = [
  {
    id: 1,
    label: 'Subject',
    colName: 'subject',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 2,
    label: 'Description',
    colName: 'description',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 3,
    label: 'Last updated at',
    colName: 'updated_at',
    modifier: (value) => dayjs(value).fromNow() || UNKNOWN_LABEL,
  },
  {
    id: 4,
    label: 'Reporter',
    colName: 'updator_name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
];
