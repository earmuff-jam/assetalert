import { Stack, Typography } from '@mui/material';

export default function AddAssetFormInstructions({ stepNumber }) {
  switch (stepNumber) {
    case 1:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Fill in the necessary details.</Typography>
          <Typography variant="caption">
            These details will help us quickly search for the items that you are looking for later on.
          </Typography>
        </Stack>
      );
    case 2:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Fill in the optional details.</Typography>
          <Typography variant="caption">
            Extra details helps you understand your product limitations, expiry dates and much more.
          </Typography>
        </Stack>
      );
    case 3:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Confirm your changes.</Typography>
          <Typography variant="caption">You can always edit your product later on.</Typography>
        </Stack>
      );
    default:
      return null;
  }
}
