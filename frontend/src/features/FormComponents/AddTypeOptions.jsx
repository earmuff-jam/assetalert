import { ITEM_TYPE_MAPPER } from '@features/MaintenancePlan/constants';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

export default function AddTypeOptions({ value, handleChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="simple-select-label">Frequency *</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        size="small"
        variant="standard"
        value={value}
        label="Frequency"
        onChange={handleChange}
      >
        {Object.values(ITEM_TYPE_MAPPER).map((v, index) => (
          <MenuItem key={index} value={v.value}>
            {v.display}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select the service frequency</FormHelperText>
    </FormControl>
  );
}
