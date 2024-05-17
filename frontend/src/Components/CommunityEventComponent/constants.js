export const SKILLS_REQUIRED_OPTIONS = [
  'Event Planning',
  'Volunteer Coordination',
  'Fundraising',
  'Public Speaking',
  'Social Media Management',
  'Graphic Design',
  'Photography',
  'Videography',
  'Community Outreach',
  'Project Management',
  'Writing',
  'Marketing',
  'Event Promotion',
  'Logistics',
  'Catering',
  'Decorations',
  'Tech Support',
  'Sponsorship',
  'First Aid',
  'Education',
  'Entertainment',
  'Environmental Conservation',
  'Art and Crafts',
  'Music',
  'Dance',
  'Other',
];

export const BLANK_NEW_EVENT = {
  title: '',
  cause: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  max_attendees: '',
  attendees: [],
  project_type: '',
  comments: '',
  required_total_man_hours: '',
  skills_required: [],
  start_date: '',
  price: '',
};

export const BLANK_NEW_EVENT_ERROR = {
  title: '',
  cause: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  max_attendees: '',
  project_type: '',
  comments: '',
  required_total_man_hours: '',
  skills_required: '',
  start_date: '',
  price: '',
};

export const BLANK_NEW_EVENT_TOUCHED = {
  title: false,
  cause: false,
  street: false,
  city: false,
  state: false,
  zip: false,
  max_attendees: false,
  project_type: false,
  comments: false,
  required_total_man_hours: false,
  skills_required: false,
  start_date: false,
  price: false,
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
