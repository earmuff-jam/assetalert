import dayjs from 'dayjs';
import ViewFileContent from '@features/Assets/AddAssetsInBulk/ViewFileContent';

export default {
  title: 'AssetList/AddAssetsInBulk/ViewFileContent',
  component: ViewFileContent,
  tags: ['autodocs'],
};

const Template = (args) => <ViewFileContent {...args} />;

export const ViewFileContentDefault = Template.bind({});
export const ViewFileContentHideContent = Template.bind({});
export const ViewFileContentLongFileName = Template.bind({});

ViewFileContentDefault.args = {
  showContent: true,
  name: 'Test file name default',
  lastModifiedDate: dayjs().toISOString(),
  size: '122333',
  handleRemove: () => {},
};

ViewFileContentHideContent.args = {
  showContent: false,
  name: 'Test file name default',
  lastModifiedDate: dayjs().toISOString(),
  size: '122333',
  handleRemove: () => {},
};

ViewFileContentLongFileName.args = {
  showContent: true,
  name: 'Test file name default with a really really long file name',
  lastModifiedDate: dayjs().toISOString(),
  size: '122333',
  handleRemove: () => {},
};
