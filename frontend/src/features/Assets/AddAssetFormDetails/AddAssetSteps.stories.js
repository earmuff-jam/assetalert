import AddAssetSteps from '@features/Assets/AddAssetFormDetails/AddAssetSteps';

export default {
  title: 'AssetList/AddAssetFormDetails/AddAssetSteps',
  component: AddAssetSteps,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetSteps {...args} />;

export const AddAssetStepsDefault = Template.bind({});

AddAssetStepsDefault.args = {
  activeStep: 0,
  isStepOptional: () => {},
  isStepSkipped: () => {},
};
