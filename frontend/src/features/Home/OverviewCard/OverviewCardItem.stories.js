import { CategoryRounded } from '@mui/icons-material';
import OverviewCardItem from '@features/Home/OverviewCard/OverviewCardItem';

export default {
  title: 'Home/OverviewCard/OverviewCardItem',
  component: OverviewCardItem,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewCardItem {...args} />;

export const OverviewCardItemDefault = Template.bind({});

OverviewCardItemDefault.args = {
  tooltipTitle: ['Test item 1, Test item 2, Test item 3'],
  dataLabel: 12,
  icon: <CategoryRounded />,
  label: 'assigned categories',
  color: 'Test',
};
