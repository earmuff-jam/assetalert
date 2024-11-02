import { Typography, Stack, Divider, Paper } from '@mui/material';
import { CheckCircleOutlineRounded } from '@mui/icons-material';
import dayjs from 'dayjs';

const BIO_PLACEHOLDER = 'Add short bio about yourself to let others know details about you.';

export default function UserDetails({ data = {} }) {
  return (
    <Paper sx={{ padding: '1rem', flexGrow: 1 }}>
      <Typography variant="h5" color="text.secondary">
        User details
      </Typography>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Typography variant="caption" color="text.secondary">
        {data.about_me || BIO_PLACEHOLDER}
      </Typography>
      <Stack marginTop={'1rem'} spacing={1}>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <CheckCircleOutlineRounded color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Email Address : {data.email_address}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <CheckCircleOutlineRounded color="primary" />
          <Typography variant="subtitle2" color="text.secondary">
            Last updated at : {dayjs(data.updated_at).fromNow()}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
