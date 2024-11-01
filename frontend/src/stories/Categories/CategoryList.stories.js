import CategoryList from '../../features/Categories/CategoryList';

export default {
  title: 'Categories/CategoryList',
  component: CategoryList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const CategoryListDefaultMode = {
  args: {
    displayConcise: false,
  },
};

export const CategoryListDisplayConciseMode = {
  args: {
    displayConcise: true,
  },
};
