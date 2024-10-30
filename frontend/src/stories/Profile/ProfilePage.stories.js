import ProfilePage from '../../features/Profile/ProfilePage';

export default {
  title: 'Profile/Profile',
  component: ProfilePage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const EmptyProfilePageMode = {
  args: {},
};
