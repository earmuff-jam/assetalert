import AddTypeOptions from '@features/FormComponents/AddTypeOptions';

export default {
  title: 'FormComponents/AddTypeOptions',
  component: AddTypeOptions,
  tags: ['autodocs'],
};

const Template = (args) => <AddTypeOptions {...args} />;

export const AddTypeOptionsDefault = Template.bind({});

AddTypeOptionsDefault.args = {
  value: 'Daily',
  handleChange: () => {},
};
