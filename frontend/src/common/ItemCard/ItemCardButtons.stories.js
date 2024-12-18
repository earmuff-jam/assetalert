import ItemCardButtons from '@common/ItemCard/ItemCardButtons';

export default {
  title: 'Common/ItemCard/ItemCardButtons',
  component: ItemCardButtons,
  tags: ['autodocs'],
};

const Template = (args) => <ItemCardButtons {...args} />;

export const ItemCardButtonsDefault = Template.bind({});

ItemCardButtonsDefault.args = {
  handleDelete: () => {},
  handleEdit: () => {},
  id: 'test user id that is useless',
};
