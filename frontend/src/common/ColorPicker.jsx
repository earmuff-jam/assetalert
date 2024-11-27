import { Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

const ColorPicker = ({ label, value, handleChange }) => {
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <MuiColorInput size="small" fullWidth format="hex" value={value} onChange={handleChange} />
    </>
  );
};

export default ColorPicker;
