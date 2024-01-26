import { Chip, Tooltip } from '@material-ui/core';
import { AssignmentTurnedInRounded, GroupWorkRounded } from '@material-ui/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const UNKNOWN_LABEL = 'Unknown';
export const LABELS = [
  {
    id: 1,
    label: 'Organizer',
    colName: 'creator_name',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 2,
    label: 'Cause',
    colName: 'cause',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 3,
    label: 'City',
    colName: 'city',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 4,
    label: 'Description',
    colName: 'comments',
    modifier: (value) => value || UNKNOWN_LABEL,
  },
  {
    id: 5,
    label: 'Requested help on',
    colName: 'skills_required',
    modifier: (value) => {
      // the array should not also have empty string
      return value.length > 0 && value[0] !== '' ? (
        value
          .join(', ')
          .split(',')
          .map((v) => <Chip size="small" key={v} icon={<GroupWorkRounded />} label={v} />)
      ) : (
        <Tooltip title="No assistance was requested">
          <Chip size="small" icon={<AssignmentTurnedInRounded />} label={'No Assistance'} />
        </Tooltip>
      );
    },
  },
  {
    id: 6,
    label: 'Start Date',
    colName: 'start_date',
    modifier: (value) => dayjs(value).fromNow() || 'N/A',
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

/**
 * combines the config for host details based on the eventObj parameter. returns a
 * list of tableRows derieved from the eventObj object. If modifier function is passed
 * in, we build the table in accordance to it as well.
 * @param {Object} eventObj - the current selected event to build the table for
 * @returns {Array} tableRows - the combined row with modifiers applied if passed in.
 */
export const BUILD_TABLE_CONSTANTS = (eventObj) => {
  if (!eventObj) {
    return [];
  }
  const tableRows = LABELS.map(({ id, colName, label, modifier }) => {
    let value = eventObj[colName];
    if (modifier) {
      value = modifier(value, { colName, label });
    } else {
      value = value || 'N/A';
    }
    return {
      id,
      colName,
      label,
      value,
    };
  });

  return tableRows;
};

/**
 * validates if the user is allowed to add item and edit the event
 * @param {boolean} disabled
 * @param {object} userDetail
 * @returns
 */
export const isEditingAllowed = (disabled, userDetail) => {
  if (disabled) {
    return true;
  }
  const user = userDetail?.userID;
  const sharableGroups = userDetail?.sharable_groups || [];
  if (sharableGroups.includes(user)) {
    return false;
  }
  return true;
};
