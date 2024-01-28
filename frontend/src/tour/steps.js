const LANDING_PAGE_TOUR_STEPS = [
  {
    title: 'Welcome to Mashed Application Tutorial. Learn how to navigate the application in thorough detail.',
  },
  {
    title: 'We aim to bring the community together by assisting them in simple auditory tasks.',
  },
  {
    title: 'Map displays the location of every event even if they are deactivated.',
  },
  {
    title: 'Create a new event for your local community.',
  },
  {
    title: 'You can even search any event through our quick sort and filter',
  },
  {
    title: 'View all existing events that are in active status regardless of who created the event',
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
      'Details about yourself and your interests. You can edit your profile details as well. Required to chat with other members of any community.',
  },
  {
    title:
      'Volunteering hours on required skills are displayed here. If you do not have any such event, feel feel to create one or volunteer on your local events nearby.',
  },
];

const SINGLE_EVENT_TOUR_STEPS = [
  {
    title:
      'The avatar for the selected event. Adding avatar to your project will help your readily label your project.',
  },
  {
    title: 'The title of the selected event. Hover over the event to view the approximate location of the event.',
  },
  {
    title: 'The description of the event.',
  },
  {
    title: 'Select option to join the event or leave the event',
  },
  {
    title:
      'Report any issues that occur with the event. Reporting an issue is a great way to let other users know about the problems that you encountered during that event. It is not meant to be used for emergency purposes nor it is used to bring down an event. All it does is register reports against said event.',
  },
  {
    title:
      'The number of people that have accepted to join the selected event and the number of people who have rsvp to the selected event.',
  },
  {
    title: 'Displays the required skills for each project if it exists.',
  },
  {
    title:
      'select option to add a new item to the inventory list. participant must join the event before adding items to the event.',
  },
  {
    title:
      'View list of the items that are stored against the selected event. To edit certain fields, hover over the fields to edit them. ',
  },
  {
    title:
      'Select options to volunteer, chat with online members, options for expense reports or view details about the selected event.',
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
