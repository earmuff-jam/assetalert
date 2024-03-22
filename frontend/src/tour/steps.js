const LANDING_PAGE_TOUR_STEPS = [
  {
    title:
      'Welcome to Mashed Application Tutorial. Learn how to navigate the application in thorough detail. For better user experience, each page has their own respective tutorials. Be sure to check them all out for a full learning experience.',
  },
  {
    title:
      'We aim to bring the community together by assisting them in simple auditory tasks. Update your username in your profile section. View inventories, create new events or view your profile and make adjustments to your biography.',
  },
  {
    title:
      'Navigate various events with our interactive map. View all events and a short description about them. Activated events are marked with a red color for easy access to select event.',
  },
  {
    title: 'Create new events or edit your biography readily.',
  },
  {
    title:
      'View our list of all events or search for a specific event with keywords related to the event. Deactivated events are associated with a yellowish dot to allows users for easy access.',
  },
  {
    title:
      'View specific details such as event title, cause and brief description about active events. Event skills can be tagged as required help and such skills are displayed with our custom in-demand meter. View location and event start date on the fly as well. Jump in to view more details about each select event.',
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
