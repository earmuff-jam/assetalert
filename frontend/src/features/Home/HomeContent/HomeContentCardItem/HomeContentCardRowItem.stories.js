import HomeContentCardRowItem from './HomeContentCardRowItem';

export default {
  title: 'Home/HomeContent/HomeContentCardRowItem',
  component: HomeContentCardRowItem,
};

export const HomeHeaderDefault = {
  args: {
    label: 'Cost Summary',
    dataValue: '591.23',
    color: 'text.secondary',
  },
};

export const HomeHeaderEmptyData = {
  args: {
    label: '',
    dataValue: '',
    color: '',
  },
};
