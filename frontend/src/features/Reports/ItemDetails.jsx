import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

export default function ItemDetails({ loading, avatarValue, label, caption }) {
  if (loading) {
    return <Skeleton height="2rem" />;
  }
  return (
    <Stack direction="row" spacing="1rem" alignItems="center" marginTop="1rem">
      <Avatar>{avatarValue}</Avatar>
      <Stack>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="caption">{caption}</Typography>
      </Stack>
    </Stack>
  );
}
