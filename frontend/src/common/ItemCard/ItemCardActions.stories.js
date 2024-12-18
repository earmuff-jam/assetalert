import dayjs from 'dayjs';

import ItemCardActions from '@common/ItemCard/ItemCardActions';

export default {
  title: 'Common/ItemCard/ItemCardActions',
  component: ItemCardActions,
  tags: ['autodocs'],
};

const Template = (args) => <ItemCardActions {...args} />;

export const ItemCardActionsDefault = Template.bind({});
export const ItemCardActionsReallyLongName = Template.bind({});

ItemCardActionsDefault.args = {
  statusName: 'draft',
  updatedAtTimestamp: dayjs(),
  updator: 'Test user',
};

ItemCardActionsReallyLongName.args = {
  statusName: 'draft',
  updatedAtTimestamp: dayjs(),
  updator: 'Test user with a really long name',
};
