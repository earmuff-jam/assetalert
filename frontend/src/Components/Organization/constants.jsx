import { AddCircleOutlineRounded, FlagRounded, RemoveCircleOutlineRounded } from '@material-ui/icons';

export const EXISTING_PROJECTS_MSG =
  'By deactivating the project, all associated content and features will be disabled. This action cannot be undone.';

export const EXISTING_PROJECTS_NOT_FOUND_MSG = 'Hmm.. Seems like you have no active events created.';

export const EVENT_TYPES = [
  {
    id: 1,
    name: 'Add',
    displayName: 'Add Event',
    icon: <AddCircleOutlineRounded />,
  },
  {
    id: 2,
    name: 'Report',
    displayName: 'Report Event',
    icon: <FlagRounded />,
  },
  {
    id: 3,
    name: 'Deactivate',
    displayName: 'Deactivate Event',
    icon: <RemoveCircleOutlineRounded />,
  },
];

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

export const BLANK_REPORT_FORM = {
  subject: '',
  description: '',
  id: '',
  event_location: '',
  organizer_name: '',
  is_checked: false,
};

export const BLANK_REPORT_FORM_ERROR = {
  subject: '',
  description: '',
  id: '',
  event_location: '',
  organizer_name: '',
  is_checked: '',
};

export const BLANK_REPORT_FORM_TOUCHED = {
  subject: false,
  description: false,
  id: false,
  event_location: false,
  organizer_name: false,
  is_checked: false,
};
