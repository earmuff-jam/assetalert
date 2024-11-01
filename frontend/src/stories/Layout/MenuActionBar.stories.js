import MenuActionBar from '../../features/Layout/MenuActionBar';

export default {
  title: 'Layout/MenuActionBar',
  component: MenuActionBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const MenuActionBarDefaultMode = {
  args: {
    openDrawer: false,
    handleDrawerClose: () => {},
  },
};

export const MenuActionBarOpenMode = {
  args: {
    openDrawer: true,
    handleDrawerClose: () => {},
  },
};
