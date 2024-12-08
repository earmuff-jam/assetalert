import AppToolbarTitle from '@features/Layout/AppToolbar/AppToolbarTitle';

export default {
  title: 'Layout/AppToolbar/AppToolbarTitle',
  component: AppToolbarTitle,
  tags: ['autodocs'],
};

const Template = (args) => <AppToolbarTitle {...args} />;

export const AppToolbarTitleDefault = Template.bind({});

AppToolbarTitleDefault.args = {
  onclick: () => {},
};
