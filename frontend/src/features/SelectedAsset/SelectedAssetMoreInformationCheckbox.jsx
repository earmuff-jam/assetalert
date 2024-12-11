import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';

export default function SelectedAssetMoreInformationCheckbox({ isChecked, handleCheckbox, target, label, icon }) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={isChecked} onChange={(e) => handleCheckbox(target, e.target.checked)} color="primary" />
      }
      label={
        <Stack direction="row" alignItems="center">
          {icon}
          <Typography variant="caption">{label}</Typography>
        </Stack>
      }
    />
  );
}
