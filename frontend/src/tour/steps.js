const LANDING_PAGE_TOUR_STEPS = [
  {
    title:
      'Welcome to Community Care Application Tutorial. Learn how to navigate the application in thorough detail.',
  },
  {
    title:
      'We aim to bring the community together by assisting them in simple auditory tasks',
  },
  {
    title:
      'Map displays the location of every event even if they are deactivated.',
  },
  {
    title: 'Buttons help you create, deactivate or even report an event.',
  },
  {
    title: 'You can even search any event through our quick sort and filter',
  },
  {
    title:
      'View all existing events that are in active status regardless of who created the event',
  },
];

const ADD_FORM_TOUR_STEPS = [
  {
    title:
      'Ready to create your first event ? Press on the add form to continue.',
  },
  {
    title:
      'The details about your event that you would like to create. Filling out all the information helps you better manage your event in the long run.',
  },
  {
    title: 'Press the close button to move on to the next step',
  },
];

const ABOUT_US_TOUR_STEPS = [
  {
    title: 'Our company statement and information about what we believe in.',
  },
  {
    title: 'Value statement for the company and all within.',
  },
];

const PROFILE_TOUR_STEPS = [
  {
    title:
      'A brief description and your avatar. This is required to chat during an event.',
  },
  {
    title:
      'Skills and volunteering hours that you have spent on any project regardless of the status of the event.',
  },
  {
    title:
      'A list of all the events that you have created regardless of the status of the project.',
  },
];

const SINGLE_EVENT_TOUR_STEPS = [
  {
    title:
      'The avatar for the selected event. Adding avatar to your project will help your readily label your project.',
  },
  {
    title:
      'The title of the selected event. Hovering over the event allows you to view the approximate location of the event.',
  },
  {
    title:
      'The number of people that have accepted to join the selected event and the number of people who have rsvp to the selected event.',
  },
  {
    title:
      'Button allows you to leave the event. Leaving the event will result in loss of participation within the event.',
  },
  {
    title:
      'Report any issues that occur with the event. Reporting an issue is a great way to let other users know about the problems that you encountered during that event. It is not meant to be used for emergency purposes nor it is used to bring down an event. All it does is register reports against said event.',
  },
  {
    title:
      'Add items to the selected event. Certain names and elements can be altered once entered in the system, however we advise to only do such to log changes since it changes the audit logs as well.',
  },
  {
    title:
      'View list of the items that are stored against the selected event. To edit certain fields, hover over the fields to edit them. ',
  },
  {
    title:
      'Add volunteering hours against the selected event. Added volunteering hours are displayed in your profile page.',
  },
  {
    title:
      'View the pie chart details of each skill that people have volunteered against. An empty chart suggests that no one has volunteered in any activity. ',
  },
  {
    title:
      'A zoomed in telescopic map of the location. Data is generated from Openlayers and geocoding API is provided to the public, for free, as a community service by Map Maker. ',
  },
  {
    title:
      'The details of the selected event including the organizer and skills that are required as presented by the creator of the event.',
  },
  {
    title:
      'Chat with the team members within the selected event. All messages and history persists, please refrain from using inappropriate speech as it will have you possibly removed from the system.',
  },
  {
    title:
      'Checkbox to allow users to RSVP to any event. In order to chat with other members, users are required to RSVP on the event.',
  },
];

const derieveLandingPageTourSteps = (preprendIndex = 0) => {
  return LANDING_PAGE_TOUR_STEPS.map((skeleton, index) => ({
    id: index + preprendIndex,
    selector: `[data-tour="${index + preprendIndex}"]`,
    content: skeleton.title,
  }));
};

const derieveAboutUsTourSteps = (preprendIndex = 0) => {
  return ABOUT_US_TOUR_STEPS.map((skeleton, index) => ({
    id: index + preprendIndex,
    selector: `[data-tour="${index + preprendIndex}"]`,
    content: skeleton.title,
  }));
};
const derieveProfileTourSteps = (preprendIndex = 0) => {
  return PROFILE_TOUR_STEPS.map((skeleton, index) => ({
    id: index + preprendIndex,
    selector: `[data-tour="${index + preprendIndex}"]`,
    content: skeleton.title,
  }));
};

// ADD FORM STEPS
// eslint-disable-next-line
const derieveAddFormTourSteps = (preprendIndex = 0) => {
  return ADD_FORM_TOUR_STEPS.map((skeleton, index) => ({
    id: index + preprendIndex,
    selector: `[data-tour="${index + preprendIndex}"]`,
    content: skeleton.title,
  }));
};

// SINGLE EVENT STEPS
const derieveSingleEventTourSteps = (preprendIndex = 0) => {
  return SINGLE_EVENT_TOUR_STEPS.map((skeleton, index) => ({
    id: index + preprendIndex,
    selector: `[data-tour="${index + preprendIndex}"]`,
    content: skeleton.title,
  }));
};

const steps = [
  ...derieveLandingPageTourSteps(),
  ...derieveAboutUsTourSteps(),
  ...derieveProfileTourSteps(),
  ...derieveSingleEventTourSteps(),
];

export default steps;
