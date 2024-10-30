import RecentActivities from '../../features/Activities/RecentActivities';

export default {
  title: 'RecentActivity/RecentActivities',
  component: RecentActivities,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const RecentActivitiesLoadingMode = {
  args: {},
};
