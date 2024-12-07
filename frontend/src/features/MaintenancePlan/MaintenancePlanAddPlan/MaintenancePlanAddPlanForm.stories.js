import MaintenancePlanAddPlanForm from '@features/MaintenancePlan/MaintenancePlanAddPlan/MaintenancePlanAddPlanForm';

export default {
  title: 'Maintenance/MaintenancePlan/MaintenancePlanAddPlanForm',
  component: MaintenancePlanAddPlanForm,
  tags: ['autodocs'],
};

const Template = (args) => <MaintenancePlanAddPlanForm {...args} />;

export const MaintenancePlanAddPlanFormDefault = Template.bind({});

MaintenancePlanAddPlanFormDefault.args = {
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
    min_items_limit: {
      label: 'Min items',
      placeholder: 'Mininum count of items',
      value: '',
      size: 'small',
      name: 'min_items_limit',
      fullWidth: true,
      errorMsg: '',
      required: true,
      validators: [
        {
          message: 'Minimum threshold limit must be a positive integer',
        },
        {
          message: 'Minimum threshold must be a number',
        },
        {
          message: 'Minimum threshold number is too high',
        },
      ],
      type: 'text',
      variant: 'outlined',
    },
    max_items_limit: {
      label: 'Max items',
      placeholder: 'Maximum count of items',
      value: '',
      size: 'small',
      name: 'max_items_limit',
      errorMsg: '',
      required: true,
      fullWidth: true,
      validators: [
        {
          message: 'Maximum threshold limit must be a positive integer',
        },
        {
          message: 'Maximum threshold must be a number',
        },
        {
          message: 'Maximum threshold number is too high',
        },
      ],
      type: 'text',
      variant: 'outlined',
    },
  },
  handleInputChange: () => {},
  setLocation: () => {},
};
