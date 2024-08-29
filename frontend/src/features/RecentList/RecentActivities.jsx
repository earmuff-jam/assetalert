import RecentActivity from './RecentActivity';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Stack, Typography } from '@mui/material';
import { capitalizeFirstLetter, EmptyComponent } from '../common/utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../Profile/profileSlice';
import { RECENT_ACTIVITY_TYPE_MAPPER } from './constants';

const RecentActivities = () => {
  const dispatch = useDispatch();
  const { recentActivities = [], loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!loading && recentActivities.length === 0) {
      dispatch(profileActions.getRecentActivities());
    }
  }, [loading, recentActivities.length]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }
  if (recentActivities.length <= 0) {
    return <EmptyComponent subtitle="Add assets to view details about them" />;
  }

  return (
    <Box>
      {recentActivities.map((activity, index) => (
        <Accordion key={index} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Stack>
              <Typography variant="h6">{activity.title}</Typography>
              <Typography variant="caption">
                {`${capitalizeFirstLetter(activity.custom_action)} ${
                  RECENT_ACTIVITY_TYPE_MAPPER[activity.type].display
                }`}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <RecentActivity key={index} index={index} activity={activity} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default RecentActivities;
