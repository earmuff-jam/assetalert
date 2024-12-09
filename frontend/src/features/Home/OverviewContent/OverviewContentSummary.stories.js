import OverviewContentSummary from '@features/Home/OverviewContent/OverviewContentSummary';

export default {
  title: 'Home/OverviewContent/OverviewContentSummary',
  component: OverviewContentSummary,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewContentSummary {...args} />;

export const OverviewContentSummaryDefault = Template.bind({});
export const OverviewContentSummaryEmptyAssets = Template.bind({});
export const OverviewContentSummaryZeroCostItem = Template.bind({});

OverviewContentSummaryDefault.args = {
  assets: [
    {
      id: 1,
      price: 2,
    },
  ],
};

OverviewContentSummaryEmptyAssets.args = {
  assets: [],
};

OverviewContentSummaryZeroCostItem.args = {
  assets: [
    {
      id: 1,
      price: 0,
    },
  ],
};
