import { darkTheme, lightTheme } from '@utils/Theme';
import MenuActionBarTitle from '@features/Layout/MenuActionBar/MenuActionBarTitle';

export default {
  title: 'Layout/MenuActionBar/MenuActionBarTitle',
  component: MenuActionBarTitle,
  tags: ['autodocs'],
};

const Template = (args) => <MenuActionBarTitle {...args} />;

export const MenuActionBarTitleDefault = Template.bind({});
export const MenuActionBarTitleDarkTheme = Template.bind({});

MenuActionBarTitleDefault.args = {
  theme: lightTheme,
  handleDrawerClose: () => {},
};

MenuActionBarTitleDarkTheme.args = {
  theme: darkTheme, // switch in the storybook to view dark theme
  handleDrawerClose: () => {},
};
