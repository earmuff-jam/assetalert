import FilterAndSortMenu from '../../features/common/FilterAndSortMenu/FilterAndSortMenu';

export default {
  title: 'Common/FilterAndSortMenu',
  component: FilterAndSortMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const FilterAndSortMenuDefaultMode = {
  args: {
    sortingOrder: true,
    setSortingOrder: () => {},
    selectedFilter: [],
    setSelectedFilter: () => {},
  },
};

export const FilterAndSortMenuEmptySelectionMode = {
  args: {
    sortingOrder: true,
    setSortingOrder: () => {},
    selectedFilter: '',
    setSelectedFilter: () => {},
  },
};

export const FilterAndSortMenuAscOrderMode = {
  args: {
    sortingOrder: true,
    setSortingOrder: () => {},
    selectedFilter: [],
    setSelectedFilter: () => {},
  },
};

export const FilterAndSortMenuDescOrderMode = {
  args: {
    sortingOrder: false,
    setSortingOrder: () => {},
    selectedFilter: [],
    setSelectedFilter: () => {},
  },
};
