import { Chip } from '@material-ui/core';
import { GroupWorkRounded } from '@material-ui/icons';
import moment from 'moment/moment';

export const LABELS = [
  {
    id: 1,
    label: 'Organizer',
    colName: 'creator_name',
    modifier: (value) => value || 'N/A',
  },
  {
    id: 2,
    label: 'Cause',
    colName: 'cause',
    modifier: (value) => value || 'N/A',
  },
  {
    id: 3,
    label: 'City',
    colName: 'city',
    modifier: (value) => value || 'N/A',
  },
  {
    id: 4,
    label: 'Description',
    colName: 'comments',
    modifier: (value) => value || 'N/A',
  },
  {
    id: 5,
    label: 'Requested help on',
    colName: 'skills_required',
    modifier: (value) => {
      return value
        .join(', ')
        .split(',')
        .map((v) => <Chip size="small" key={v} icon={<GroupWorkRounded />} label={v} />);
    },
  },
  {
    id: 6,
    label: 'Start Date',
    colName: 'start_date',
    modifier: (value) => moment(value).fromNow() || 'N/A',
  },
  {
    id: 7,
    label: 'Street',
    colName: 'street',
    modifier: (value) => value || 'N/A',
  },
  {
    id: 8,
    label: 'Updator',
    colName: 'updator_name',
    modifier: (value) => value || 'N/A',
  },
];

export const BUILD_TABLE_CONSTANTS = (eventDetail) => {
  if (!eventDetail) {
    return [];
  }
  const tableRows = LABELS.map(({ colName, label, modifier }) => {
    let value = eventDetail[colName];
    if (modifier) {
      value = modifier(value, { colName, label });
    } else {
      value = value || 'N/A';
    }
    return {
      label,
      value,
    };
  });

  return tableRows;
};
