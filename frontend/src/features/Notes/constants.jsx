import {
  AnnouncementRounded,
  ArchiveRounded,
  CancelRounded,
  CheckCircleRounded,
  DraftsRounded,
  NoteRounded,
  PauseRounded,
  PendingActionsRounded,
} from '@mui/icons-material';

const GENERIC_FORM_FIELDS = {
  type: 'text',
  variant: 'outlined',
};

const GENERIC_TEXTAREA_VARIANT = {
  type: 'text',
  multiline: true,
  rows: 4,
  variant: 'outlined',
  fullWidth: true,
};

// these options are as enum in db
export const STATUS_OPTIONS = [
  {
    id: 1,
    label: 'draft',
    display: 'Draft Status',
    icon: <DraftsRounded fontSize="small" color="primary" />,
  },
  {
    id: 2,
    label: 'archived',
    display: 'Archived Status',
    icon: <ArchiveRounded fontSize="small" color="secondary" />,
  },
  {
    id: 3,
    label: 'completed',
    display: 'Completed Status',
    icon: <CheckCircleRounded fontSize="small" color="primary" />,
  },
  {
    id: 4,
    label: 'pending',
    display: 'Pending Status',
    icon: <PendingActionsRounded fontSize="small" color="secondary" />,
  },
  {
    id: 5,
    label: 'urgent',
    display: 'Urgent Status',
    icon: <AnnouncementRounded fontSize="small" color="info" />,
  },
  {
    id: 6,
    label: 'general',
    display: 'General Status',
    icon: <NoteRounded fontSize="small" color="info" />,
  },
  {
    id: 7,
    label: 'on_hold',
    display: 'On Hold Status',
    icon: <PauseRounded fontSize="small" color="warning" />,
  },
  {
    id: 8,
    label: 'cancelled',
    display: 'Cancelled Status',
    icon: <CancelRounded fontSize="small" color="error" />,
  },
];

export const ADD_NOTES_FORM_FIELDS = {
  title: {
    label: 'Title',
    placeholder: 'Short note title',
    value: '',
    name: 'title',
    size: 'small',
    errorMsg: '',
    required: true,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Title is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Title should be less than 50 characters',
      },
    ],
    ...GENERIC_FORM_FIELDS,
  },
  description: {
    label: 'Description',
    placeholder: 'Note description in less than 500 characters',
    value: '',
    name: 'description',
    size: 'small',
    errorMsg: '',
    required: false,
    fullWidth: true,
    validators: [
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Description should be less than 500 characters',
      },
    ],
    ...GENERIC_TEXTAREA_VARIANT,
  },
};
