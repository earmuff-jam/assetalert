import OverviewContent from '@features/Home/OverviewContent/OverviewContent';

export default {
  title: 'Home/OverviewContent/OverviewContent',
  component: OverviewContent,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewContent {...args} />;

export const OverviewContentDefault = Template.bind({});

OverviewContentDefault.args = {
  assets: [{ id: 1 }, { id: 2 }],
  categories: [{ id: 1 }],
  maintenancePlans: [],
};
