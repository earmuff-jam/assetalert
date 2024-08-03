import {
  AnnouncementRounded,
  ArchiveRounded,
  CancelRounded,
  CheckCircleRounded,
  DraftsRounded,
  NoteRounded,
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
export const NOTES_STATUS_OPTIONS = [
  {
    id: 1,
    label: 'draft',
    icon: <DraftsRounded fontSize="small" color="primary" />,
  },
  {
    id: 2,
    label: 'archived',
    icon: <ArchiveRounded fontSize="small" color="secondary" />,
  },
  {
    id: 3,
    label: 'completed',
    icon: <CheckCircleRounded fontSize="small" color="primary" />,
  },
  {
    id: 4,
    label: 'pending',
    icon: <PendingActionsRounded fontSize="small" color="secondary" />,
  },
  {
    id: 5,
    label: 'urgent',
    icon: <AnnouncementRounded fontSize="small" color="info" />,
  },
  {
    id: 6,
    label: 'general',
    icon: <NoteRounded fontSize="small" color="info" />,
  },
  {
    id: 7,
    label: 'cancelled',
    icon: <CancelRounded fontSize="small" color="error" />,
  },
];

export const ADD_NOTES_FORM_FIELDS = {
  title: {
    label: 'Title',
    placeholder: 'Short note title',
    value: '',
    name: 'title',
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
