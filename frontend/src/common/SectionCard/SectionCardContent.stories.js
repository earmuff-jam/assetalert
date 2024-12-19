import SectionCardContent from '@common/SectionCard/SectionCardContent';

export default {
  title: 'Common/SectionCard/SectionCardContent',
  component: SectionCardContent,
  tags: ['autodocs'],
};

const Template = (args) => <SectionCardContent {...args} />;

export const SectionCardContentDefault = Template.bind({});
export const SectionCardContentLoading = Template.bind({});
export const SectionCardContentEmptyDetails = Template.bind({});
export const SectionCardContentModalSelection = Template.bind({});

SectionCardContentDefault.args = {
  content: [
    {
      id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
      name: 'Daily maintenance plan',
      description: 'A maintenance plan built for assets that require daily management.',
      color: '#d20a0a',
      maintenance_status: '',
      maintenance_status_name: 'draft',
      maintenance_status_description: 'items under this bucket are in draft state',
      plan_type: 'annual',
      plan_due: '0001-01-01T00:00:00Z',
      location: {
        lat: 0,
        lon: 0,
      },
      created_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      created_at: '2024-11-29T13:19:16.754332Z',
      creator: 'John Doe',
      updated_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      updated_at: '2024-11-29T13:19:16.754332Z',
      updator: 'John Doe',
      sharable_groups: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  loading: false,
  displayModal: false,
  prefixURI: 'plan',
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
};

SectionCardContentLoading.args = {
  content: [],
  loading: true,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};

SectionCardContentEmptyDetails.args = {
  content: [],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};

SectionCardContentModalSelection.args = {
  content: [
    {
      id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
      name: 'Daily maintenance plan',
      description: 'A maintenance plan built for assets that require daily management.',
      color: '#d20a0a',
      maintenance_status: '',
      maintenance_status_name: 'draft',
      maintenance_status_description: 'items under this bucket are in draft state',
      plan_type: 'annual',
      plan_due: '0001-01-01T00:00:00Z',
      location: {
        lat: 0,
        lon: 0,
      },
      created_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      created_at: '2024-11-29T13:19:16.754332Z',
      creator: 'John Doe',
      updated_by: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
      updated_at: '2024-11-29T13:19:16.754332Z',
      updator: 'John Doe',
      sharable_groups: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
    },
  ],
  loading: false,
  displayModal: true,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};
