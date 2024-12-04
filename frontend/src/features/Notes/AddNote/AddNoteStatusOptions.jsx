import { STATUS_OPTIONS } from '@common/StatusOptions/constants';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

export default function AddNoteStatusOptions({ label, value, name, handleStatus }) {
  return (
    <FormControl fullWidth>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Select
        size="small"
        labelId="status-selector-labelId"
        id="status-selector"
        variant="standard"
        name={name}
        value={value}
        onChange={handleStatus}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option.id} value={option.label}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
