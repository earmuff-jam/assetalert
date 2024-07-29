import { Stack, Typography } from '@mui/material';
import RecentActivities from './RecentActivities';

const RecentList = () => {
  return (
    <Stack>
      <Typography variant="h5">
        Recent Activities
      </Typography>
      <Typography variant="caption" gutterBottom>
        View all of your recent activities here. You can view all created and / or updated asset(s). Track changes for
        the last ten assets.
      </Typography>
      <RecentActivities />
    </Stack>
  );
};

export default RecentList;
