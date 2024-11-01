import PlanList from '../../features/Maintenance/PlanList';

export default {
  title: 'Plan/PlanList',
  component: PlanList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const EmptyPlan = {
  args: {},
};
