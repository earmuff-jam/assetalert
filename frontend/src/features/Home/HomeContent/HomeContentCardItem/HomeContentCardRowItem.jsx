import { Stack, Typography } from '@mui/material';

export default function HomeContentCardRowItem({ label, dataValue, color }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <Typography color={color}>{label}</Typography>
      <Typography color={color}>{dataValue}</Typography>
    </Stack>
  );
}
