import ItemCardTextContent from '@common/ItemCard/ItemCardTextContent';

export default {
  title: 'Common/ItemCard/ItemCardTextContent',
  component: ItemCardTextContent,
  tags: ['autodocs'],
};

const Template = (args) => <ItemCardTextContent {...args} />;

export const ItemCardTextContentDefault = Template.bind({});

ItemCardTextContentDefault.args = {
  uri: 'test uri',
  name: 'test name',
  description: 'test description',
};
