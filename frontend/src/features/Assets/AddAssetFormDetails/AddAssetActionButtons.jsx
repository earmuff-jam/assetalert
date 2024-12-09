import { Box, Button } from '@mui/material';
import { ADD_ASSET_STEPS } from '@features/Assets/AddAssetFormDetails/constants';

export default function AddAssetActionButtons({
  activeStep,
  isBackDisabled,
  isNextDisabled,
  handleBack,
  handleSkip,
  handleNext,
  isStepOptional,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button color="inherit" disabled={isBackDisabled} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      {isStepOptional(activeStep) && (
        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
          Skip
        </Button>
      )}

      {activeStep !== ADD_ASSET_STEPS.length - 1 ? (
        <Button disabled={isNextDisabled} onClick={handleNext}>
          Next
        </Button>
      ) : null}
    </Box>
  );
}
