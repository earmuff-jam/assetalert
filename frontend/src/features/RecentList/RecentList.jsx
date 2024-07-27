import { Stack, Typography } from '@mui/material';
import RecentActivities from './RecentActivities';

const RecentList = () => {
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Recent Activities
      </Typography>
      <RecentActivities />
    </Stack>
  );
};

export default RecentList;
