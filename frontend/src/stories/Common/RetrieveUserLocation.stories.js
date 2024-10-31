import RetrieveUserLocation from '../../features/common/Location/RetrieveUserLocation';

export default {
  title: 'Common/RetrieveUserLocation',
  component: RetrieveUserLocation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const RetrieveUserLocationDefaultMode = {
  args: {
    setLocation: () => {},
  },
};
