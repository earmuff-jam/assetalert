import dayjs from 'dayjs';
import { Chip, Tooltip } from '@material-ui/core';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AssignmentTurnedInRounded, GroupWorkRounded } from '@material-ui/icons';

dayjs.extend(relativeTime);

export const ADD_NEW_EVENT_ITEM_SUBTITLE_TEXT =
  'Add item that are required for this event. These items can be shared with other members of the group. Such shared items are stored with due process until the group is abandoned or until the creator removes the ability to share the items with other members.';

export const EXISTING_PROJECTS_MSG =
  'By deactivating the project, all associated content and features will be disabled. This action cannot be undone.';

export const EXISTING_PROJECTS_NOT_FOUND_MSG = 'Hmm.. Seems like you have no active events created.';

export const EVENT_FORM = {
  eventID: '',
  reason: '',
};

export const EVENT_FORM_ERROR = {
  eventID: '',
  reason: '',
};

export const EVENT_FORM_TOUCHED = {
  eventID: false,
  reason: false,
};

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
    modifier: (value) => value || 'Unknown location',
  },
  {
    id: 8,
    label: 'Updator',
    colName: 'updator_name',
    modifier: (value) => value || 'N/A',
  },
];

const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'standard',
};

/**
 * ADD ITEM EVENT FORM.
 *
 * Used to add new item in events personal profile.
 */
export const ADD_ITEMS_EVENT_FORM = {
  name: {
    label: 'Item Name',
    placeholder: 'Enter product name',
    value: '',
    name: 'name',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Name should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: 'Item description',
    placeholder: '',
    value: '',
    name: 'description',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Description should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  quantity: {
    label: 'Quantity',
    placeholder: '',
    value: '',
    name: 'quantity',
    errorMsg: '',
    required: true,
    fullWidth: false,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected item is required',
      },
      {
        validate: (value) =>
          // test for number first, then
          !(/^\d+$/.test(value) && parseInt(value) > 0),
        message: 'A positive number is required',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
};

/**
 * Navigation tabs for EventDetailsDrawerComponent
 */
export const NAVIGATION_TABS = [
  {
    id: 1,
    displayName: 'Volunteering',
    subtitle: 'Volunteering details',
  },
  {
    id: 2,
    displayName: 'Message',
    subtitle: 'Message online members',
  },
  {
    id: 3,
    displayName: 'Expenses',
    subtitle: 'Expenses tab and settings',
  },
  {
    id: 4,
    displayName: 'Shared items',
    subtitle: 'Items shared from users',
  },
  {
    id: 5,
    displayName: 'Details',
    subtitle: 'Event details and settings',
  },
];

/**
 * combines the config for host details based on the eventObj parameter. returns a
 * list of tableRows derieved from the eventObj object. If modifier function is passed
 * in, we build the table in accordance to it as well.
 * @param {Object} eventObj - the current selected event to build the table for
 * @returns {Array} tableRows - the combined row with modifiers applied if passed in.
 */
export const BUILD_TABLE_CONSTANTS = (columnLabels) => (eventObj) => {
  if (!eventObj) {
    return [];
  }
  const tableRows = columnLabels.map(({ id, colName, label, modifier }) => {
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
