import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { ADD_ASSET_STEPS } from '@features/Assets/AddAssetFormDetails/constants';

export default function AddAssetSteps({ activeStep, isStepOptional, isStepSkipped }) {
  return (
    <Stepper activeStep={activeStep}>
      {ADD_ASSET_STEPS.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = <Typography variant="caption">Optional</Typography>;
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
