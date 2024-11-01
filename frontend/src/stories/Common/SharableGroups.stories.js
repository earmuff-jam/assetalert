import SharableGroups from '../../features/common/SharableGroups';

export default {
  title: 'Common/SharableGroups',
  component: SharableGroups,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const SharableGroupsDefaultMode = {
  args: {
    handleSubmit: () => {},
    existingGroups: [],
    creator: 'e09a085b-71c7-4a22-a5ff-aca26bfa01c6',
  },
};
