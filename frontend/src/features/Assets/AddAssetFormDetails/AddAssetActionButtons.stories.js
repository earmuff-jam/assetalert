import AddAssetActionButtons from '@features/Assets/AddAssetFormDetails/AddAssetActionButtons';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetActionButtons',
  component: AddAssetActionButtons,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetActionButtons {...args} />;

export const AddAssetActionButtonsDefault = Template.bind({});
export const AddAssetActionButtonsDisabledBack = Template.bind({});
export const AddAssetActionButtonsDisabledNext = Template.bind({});

AddAssetActionButtonsDefault.args = {
  activeStep: 1,
  isBackDisabled: false,
  isNextDisabled: false,
  handleBack: () => {},
  handleSkip: () => {},
  handleNext: () => {},
  isStepOptional: () => {},
};

AddAssetActionButtonsDisabledBack.args = {
  activeStep: 1,
  isBackDisabled: true,
  isNextDisabled: false,
  handleBack: () => {},
  handleSkip: () => {},
  handleNext: () => {},
  isStepOptional: () => {},
};

AddAssetActionButtonsDisabledNext.args = {
  activeStep: 1,
  isBackDisabled: false,
  isNextDisabled: true,
  handleBack: () => {},
  handleSkip: () => {},
  handleNext: () => {},
  isStepOptional: () => {},
};
