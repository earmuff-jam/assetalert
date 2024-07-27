/**
 * Item type mapper fn is used to map the maintenance item types to respective indices
 */
export const ITEM_TYPE_MAPPER = {
  1: {
    text: 'Daily',
    add: 1,
  },
  2: {
    text: 'Weekly',
    add: 7,
  },
  3: {
    text: 'Bi-Weekly',
    add: 15,
  },
  4: {
    text: 'Monthly',
    add: 30,
  },
  5: {
    text: 'Quaterly',
    add: 90,
  },
  6: {
    text: 'Semi-annually',
    add: 180,
  },
  7: {
    text: 'Annually',
    add: 360,
  },
};

export const BLANK_MAINTENANCE_PLAN = {
  plan: {
    id: 'plan',
    value: '',
    required: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Plan name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Plan name should be less than 50 characters',
      },
    ],
  },
  description: {
    id: 'description',
    value: '',
    required: true,
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Plan description is required',
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: 'Plan description should be less than 500 characters',
      },
    ],
  },
};
