import AppToolbarActionButtons from '@features/Layout/AppToolbar/AppToolbarActionButtons';

export default {
  title: 'Layout/AppToolbar/AppToolbarActionButtons',
  component: AppToolbarActionButtons,
  tags: ['autodocs'],
};

const Template = (args) => <AppToolbarActionButtons {...args} />;

export const AppToolbarActionButtonsDefault = Template.bind({});
export const AppToolbarActionButtonsEmptyProfileDetails = Template.bind({});
export const AppToolbarActionButtonsSmallFormFactor = Template.bind({});

AppToolbarActionButtonsDefault.args = {
  profileDetails: {
    id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
    username: 'IngestSvcUser',
    full_name: 'John Doe',
    email_address: 'admin@gmail.com',
    phone_number: '1234567890',
    about_me:
      'I am an architect with a passion for creating functional and aesthetically pleasing spaces that inspire and serve their purpose. My approach to design is rooted in meticulous planning and a deep appreciation for organization.',
    online_status: false,
    appearance: false,
    grid_view: true,
    created_at: '0001-01-01T00:00:00Z',
    updated_at: '2024-11-29T13:19:16.723254Z',
  },
  smScreenSizeAndHigher: false,
};

AppToolbarActionButtonsSmallFormFactor.args = {
  profileDetails: {
    id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc',
    username: 'IngestSvcUser',
    full_name: 'John Doe',
    email_address: 'admin@gmail.com',
    phone_number: '1234567890',
    about_me:
      'I am an architect with a passion for creating functional and aesthetically pleasing spaces that inspire and serve their purpose. My approach to design is rooted in meticulous planning and a deep appreciation for organization.',
    online_status: false,
    appearance: false,
    grid_view: true,
    created_at: '0001-01-01T00:00:00Z',
    updated_at: '2024-11-29T13:19:16.723254Z',
  },
  smScreenSizeAndHigher: true,
};

AppToolbarActionButtonsEmptyProfileDetails.args = {
  profileDetails: {},
  smScreenSizeAndHigher: false,
};
