import SelectedAssetMoreInformationCheckbox from '@features/SelectedAsset/SelectedAssetMoreInformationCheckbox';
import { CheckRounded } from '@mui/icons-material';

export default {
  title: 'AssetList/SelectedAsset/SelectedAssetMoreInformationCheckbox',
  component: SelectedAssetMoreInformationCheckbox,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetMoreInformationCheckbox {...args} />;

export const SelectedAssetMoreInformationCheckboxDefault = Template.bind({});
export const SelectedAssetMoreInformationCheckboxUncheckedStatus = Template.bind({});

SelectedAssetMoreInformationCheckboxDefault.args = {
  isChecked: true,
  handleCheckbox: () => {},
  target: 'test target',
  label: 'test label checkbox',
  icon: <CheckRounded />,
};

SelectedAssetMoreInformationCheckboxUncheckedStatus.args = {
  isChecked: false,
  handleCheckbox: () => {},
  target: 'test target',
  label: 'test label checkbox',
  icon: <CheckRounded />,
};
