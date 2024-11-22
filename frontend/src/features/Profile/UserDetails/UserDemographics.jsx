import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { EditRounded } from '@mui/icons-material';

export const UserDemographicsSingleRow = ({ children }) => {
  return (
    <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'}>
      {children}
    </Stack>
  );
};

export default function UserDemographics({ data = {}, handleEditMode }) {
  return (
    <Paper sx={{ padding: '1rem' }}>
      <Stack alignItems={'center'}>
        <Avatar sx={{ width: 100, height: 100, marginBottom: '1rem' }} />
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton size="small" onClick={handleEditMode}>
            <EditRounded fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="h5" color="text.secondary">
            {data.full_name}
          </Typography>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">
          {data.email_address}
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Stack spacing={1}>
        <UserDemographicsSingleRow>
          <Typography variant="subtitle2" color="text.secondary">
            Username
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.username}
          </Typography>
        </UserDemographicsSingleRow>
        <UserDemographicsSingleRow>
          <Typography variant="subtitle2" color="text.secondary">
            Email Address
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.email_address}
          </Typography>
        </UserDemographicsSingleRow>
        <UserDemographicsSingleRow>
          <Typography variant="subtitle2" color="text.secondary">
            Phone number
          </Typography>
          <Box flexGrow={1} />
          <Typography variant="subtitle2" color="text.secondary">
            {data.phone_number}
          </Typography>
        </UserDemographicsSingleRow>
      </Stack>
    </Paper>
  );
}
