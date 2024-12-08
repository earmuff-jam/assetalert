import MenuActionBarListItem from '@features/Layout/MenuActionBar/MenuActionBarListItem';
import { MenuRounded } from '@mui/icons-material';

export default {
  title: 'Layout/MenuActionBar/MenuActionBarListItem',
  component: MenuActionBarListItem,
  tags: ['autodocs'],
};

const Template = (args) => <MenuActionBarListItem {...args} />;

export const MenuActionBarListItemDefault = Template.bind({});
export const MenuActionBarListItemSelectedView = Template.bind({});

MenuActionBarListItemDefault.args = {
  label: 'Menu Action Bar Item Row',
  icon: <MenuRounded />,
  isSelected: false,
  handleClick: () => {},
};

MenuActionBarListItemSelectedView.args = {
  label: 'Menu Action Bar Item Row',
  icon: <MenuRounded />,
  isSelected: true,
  handleClick: () => {},
};
