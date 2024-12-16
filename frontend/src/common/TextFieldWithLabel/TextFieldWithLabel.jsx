import { Stack, TextField, Typography } from '@mui/material';

export default function TextFieldWithLabel({
  label,
  caption,
  id,
  name,
  value,
  placeholder,
  handleChange,
  required,
  multiline = false,
  variant,
  size,
  rows = 0,
  error,
  helperText,
}) {
  return (
    <Stack spacing={1} sx={{ flexGrow: 1 }}>
      <Stack spacing={0}>
        <Typography variant="subtitle2" color="text.secondary">
          {label} {required && '*'}
        </Typography>
        <Typography variant="caption" color={'text.secondary'}>
          {caption}
        </Typography>
      </Stack>
      <TextField
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        variant={variant}
        required={required}
        size={size}
        multiline={multiline}
        error={error}
        rows={rows}
        fullWidth
        helperText={helperText}
      />
    </Stack>
  );
}
