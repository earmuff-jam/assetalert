import MaintenanceItem from '../../features/Maintenance/MaintenanceItem';

export default {
  title: 'Plan/MaintenanceItem',
  component: MaintenanceItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const MaintenanceItemDefaultMode = {
  args: {},
};
