import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

export default function SingupCheckboxField({ isChecked, setIsChecked }) {
  return (
    <FormControl fullWidth>
      <FormControlLabel
        slotProps={{ typography: { variant: 'caption' } }}
        control={
          <Checkbox size="small" checked={isChecked} onChange={() => setIsChecked(!isChecked)} color="primary" />
        }
        label="Accept terms and conditions."
      />
    </FormControl>
  );
}
