const LANDING_PAGE_TOUR_STEPS = [
  {
    title:
      'Welcome to Mashed Application Tutorial. Learn how to navigate the application in thorough detail. For better user experience, each page has their own respective tutorials. Be sure to check them all out for a full learning experience.',
  },
  {
    title:
      'We aim to bring the community together by assisting them in simple auditory tasks. Update your username in your profile section. View inventories, create new events or view your profile and make adjustments to your biography. To access the chat service within any selected event, the user must have a valid profile.',
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
      'Search for events around your location. We do not store this user location data so signing out will remove the location in the map.',
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
      'Add details to your biography. Update your looks, your username and even write a short description about yourself. You can edit your bio as you would like. Without properly filling out this bio, the chat application will not work as expected. For our user and their safety, these fields are required to chat with other members.',
  },
  {
    title: 'Edit your profile bio with these action items. View current username and contact info.',
  },
  {
    title: 'Reshape the definition of yourself with short bio.',
  },
  {
    title:
      'View current events created by you, hours volunteered and / or count of total expenses accured relative to you as a user. Actions unrelated to activities other than volunteering or expenses will not be visible under recent activities tab. View your personalized inventory list and write notes for future ease of access.',
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
    title: 'Select option to join the event or leave the event.',
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
      'Select option to add a new item to the inventory list or view existing list. participant must join the event before adding items to the event. To edit certain fields, hover over the fields to edit them.',
  },
  {
    title: 'Displays how many open spots are available. There is currently no limit on the members of the event',
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
