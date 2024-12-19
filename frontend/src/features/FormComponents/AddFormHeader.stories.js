import AddFormHeader from '@features/FormComponents/AddFormHeader';

export default {
  title: 'CommonFormComponents/AddFormHeader',
  component: AddFormHeader,
  tags: ['autodocs'],
};

const Template = (args) => <AddFormHeader {...args} />;

export const AddFormHeaderDefault = Template.bind({});

AddFormHeaderDefault.args = {
  formFields: {
    name: {
      value: '',
      name: 'name',
      label: 'Title',
      placeholder: 'Add a title to your maintenance plan',
      size: 'small',
      required: true,
      fullWidth: true,
      errorMsg: '',
      validators: [
        {
          message: 'Title is required',
        },
        {
          message: 'Title should be less than 50 characters',
        },
      ],
    },
    description: {
      value: '',
      name: 'description',
      label: 'Description',
      placeholder: 'Add a short descrption to your maintenance plan in less than 100 characters.',
      required: true,
      size: 'small',
      fullWidth: true,
      rows: 4,
      multiline: true,
      errorMsg: '',
      validators: [
        {
          message: 'Plan description is required',
        },
        {
          message: 'Plan description should be less than 500 characters',
        },
      ],
    },
  },
  handleInputChange: () => {},
  setLocation: () => {},
};
