import OverviewCardWrapper from '@features/Home/OverviewCard/OverviewCardWrapper';
import { Typography } from '@mui/material';

export default {
  title: 'Home/OverviewCard/OverviewCardWrapper',
  component: OverviewCardWrapper,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewCardWrapper {...args} />;

export const OverviewCardWrapperDefault = Template.bind({});

OverviewCardWrapperDefault.args = {
  children: <Typography> Children </Typography>,
};
