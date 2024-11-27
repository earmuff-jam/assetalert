import { Stack, TextField } from '@mui/material';

export default function EditInventoryWeightDimension({ formData, handleInputChange }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2}>
        {Object.values(formData)
          .filter((v, index) => index >= 11 && index < 13)
          .map((v) => (
            <TextField
              key={v.id}
              id={v.id}
              label={v.label}
              value={v.value}
              required={v.isRequired}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={!!v.errorMsg}
              helperText={v.errorMsg}
            />
          ))}
      </Stack>
      <Stack direction="row" spacing={2}>
        {Object.values(formData)
          .filter((v, index) => index >= 13 && index < 15)
          .map((v) => (
            <TextField
              key={v.id}
              id={v.id}
              label={v.label}
              value={v.value}
              required={v.isRequired}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={!!v.errorMsg}
              helperText={v.errorMsg}
            />
          ))}
      </Stack>
    </Stack>
  );
}
